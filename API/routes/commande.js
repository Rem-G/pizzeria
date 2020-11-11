//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/commande');

//CREATE
router.post("/createCommande", (req, res) => {
    controller.createCommande(req, res);
});

//GET
router.get("/readCommandes", (req, res) => {
    controller.readCommandes(req, res);
});

module.exports = router;