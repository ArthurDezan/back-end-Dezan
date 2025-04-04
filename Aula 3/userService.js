const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs");//modulo p manipular arquivos
const { json } = require("express");
const bcrypt = require("bcryptjs");
const { error } = require("console");

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json');    
        this.users = this.loadUsers(); // esse array é pra armazenar o user
        this.nextID = this.getNextId(); //contador para gerar id
    }

    loadUsers(){
        try{ // tenta executar o codigo
        if (fs.existsSync(this.filePath)){ //verfica se o arquivo existe
            const data = fs.readFileSync(this.filePath); //le o arqv
            return JSON.parse(data); // transforma o json em objeto
        }
    }catch(erro){ //caso ocorra um erro
        console.log("erro ao carregar arquivo", erro)
    }
        return[]; //quebra de codigos
    }

    getNextId(){
        try{
        if(this.users.length===-0) return 1; 
        return Math.max(...this.users.map(user => user.id))+1;
        }
        catch (erro) {
          console.log("erro ao buscar o id");
        }
    }

saveUsers(){
    try{
    fs.writeFileSync(this.filePath, JSON.stringify(this.users));
}catch(erro){
    console.log('erro ao salvar arquivo');
}
}

    
    async addUser(nome,email,senha,endereço,telefone,cpf){
        try{
            const cpfExistente = this.users.some(user => user.cpf === cpf);
            if(cpfExistente){
                console.log ("CPF já cadastrado")
                throw new Error("CPF já cadastrado")
            } 
            const senhaCripto = await bcrypt.hash(senha, 10);
            const user = new User(this.nextID++, nome, email,senhaCripto,endereço,telefone,cpf);// nextID++ é pra toda vez aumentar um no id
            this.users.push(user);
            this.saveUsers();
            return user;
        }catch(erro){
            console.log("erro ao adicionar usuário", erro);
            throw erro;
        }
    }
    getUsers(){
        try{
        return this.users;
        }catch(erro){
            console.log("erro ao buscar usuário");
        }
    }
    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        }catch{
            console.log("erro ao deletar usuário");
        }
    }
    async putUser(id, nome, email, senha, endereço, telefone, cpf){
        try{
           const cpfExistente = this.users.some(u=> u.cpf === cpf && u.id !== id);
           if(cpfExistente){
               console.log("CPF já cadastrado");
               throw new Error("CPF já cadastrado");
            }
            const senhaCripto = await bcrypt.hash(senha, 10);
            const user = this.users.find(user => user.id === id);
            if(!user) throw new Error("Usuário não encontrado");
            user.nome = nome;
            user.email = email;
            user.senha = senhaCripto;
            user.endereço = endereço;
            user.telefone = telefone;
            user.cpf = cpf;
            this.saveUsers();
            return user;
        }catch(erro){
            console.log("Erro ao editar usuário", erro);
            throw erro;
        }
    }
}

module.exports = new userService;