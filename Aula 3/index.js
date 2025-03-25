const express = require('express')
const userService = require ('./userService')

const app = express() 
app.use(express.json()) //ativa o json no express


//rota para usuario ser criado
app.post("/users", async (req, res) =>{
    const {nome, email, senha, endereço, telefone, cpf} = req.body //passa um arquivo 
     if(!nome || !email || !senha || !endereço || !telefone || !cpf){ //caso o nome e o email sejam diferentes vai dar erro
        return res.status(400).json ({error: "Todos os campos são obrigatórios"}) //mensagem caso dê erro
     }
     const user = await userService.addUser(nome, email, senha, endereço, telefone, cpf)
     res.status(200).json({user})
})

//rota pra listar todos os usuarios
app.get("/users", (req, res)=>{
    res.json(userService.getUsers())
})

app.delete("/users/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    try{
        const resultado = userService.deleteUser(id)
        res.status(200).json({resultado})
    }catch(erro){
        res.status(404).json({error: erro.message})
    }
})

app.put("/users/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const {nome, email, senha, endereço, telefone, cpf} = req.body
    try{
        const resultado = userService.putUser(id, nome, email, senha, endereço, telefone, cpf)
        res.status(200).json({resultado})
    }catch(erro){
        res.status(404).json({error: erro.message})
    }
})

const port = 3000
app.listen (port, () =>{
    console.log("O servidor está rodando na porta: ", port)
})