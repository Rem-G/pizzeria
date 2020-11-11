function createClient(req, res) {
    let Client = require('../models/client');
    let newClient = Client ({
        nom: req.body.nom,
        mdp: req.body.mdp,
        email: req.body.email,
        adresse: req.body.adresse,
        pizzas: req.body.pizzas,
    });

    newClient.save()
    .then((savedClient) => {

        //send back the created Pizza
        res.json(savedClient);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

//PUT
function updateClient(req, res) {

    let Client = require("../models/client");

    Client.findByIdAndUpdate({_id: req.params.id}, 
        {
            nom: req.body.nom,
            mdp: req.body.mdp,
            email: req.body.email,
            adresse: req.body.adresse,
            pizzas: req.body.pizzas,
        }, 
        {new : true})
    .then((updatedPizza) => {
        res.status(200).json(updatedPizza);
    }, (err) => {
        res.status(500).json(err);
    });
}

module.exports.createClient = createClient;
module.exports.updateClient = updateClient;

