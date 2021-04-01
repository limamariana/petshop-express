const express = require("express");
const petshop = require("./petshop");
//const {uuid} = require("uuidv4");
const app = express();

app.use(express.json())

app.listen(3000, () => {
console.log("Servidor rodando");
});

//console.log(petshop.listarPets());

app.get("/pets", (request, response) =>{
    
    return response.send(petshop.listarPets());
})

app.get("/pets/:nome", (request, response) =>{
    const {nome} = request.params;

    const petIndex = petshop.buscarPet(nome);
 
    if(!petIndex) {
    return response.status(400).send({error: "Pet não encontrado"})

}
    return response.status(200).send(petIndex);
});
app.post("/pets", (request, response) => {
    const {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos} = request.body;

    const pet = {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos};

   
    petshop.adicionarPet(pet);
    return response.json(pet);
})
