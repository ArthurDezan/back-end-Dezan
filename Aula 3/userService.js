const User = require("./user")
const path = require("path") //modulo p manipular caminhos
const fs = require("fs");//modulo p manipular arquivos
const { json } = require("express");

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

    
    addUser(nome,email,senha,endereço,telefone,cpf){
        try{
        const user = new User(this.nextID++, nome, email,senha,endereço,telefone,cpf);// novoid++ é pra toda vez aumentar um no id
        this.users.push(user);
        this.saveUsers();
        return user;
        }catch(erro){
            console.log("erro ao adicionar usuário", erro);
        }
    }
    getUsers(){
        try{
        return this.users;
        }catch(erro){
            console.log("erro ao buscar usuário");
        }
    }
}

module.exports = new userService;