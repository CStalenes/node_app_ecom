const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('../node_app_ecom/config/database');
//const PORT = process.env.PORT || 3000;
const port = 4000;

const routeClient = require("../node_app_ecom/routes/client_route");
const routeCategorie = require("../node_app_ecom/routes/categorie_route");
const routeArticle = require('../node_app_ecom/routes/article_route');
const routeCommande = require('../node_app_ecom/routes/commande_route');
const routePaiement = require('../node_app_ecom/routes/paiement_route');
const routePanier = require('../node_app_ecom/routes/panier_route');
const routeContenir = require('../node_app_ecom/routes/contenir_route');
const routeAjouter = require("../node_app_ecom/routes/ajouter_route");
const userRoute = require("../node_app_ecom/routes/user_route");


// Middleware pour analyser le corps de la requête en JSON
app.use(express.json());


app.post('/api/auth/register', async(req,res) =>{
    try{
        const{ nom, prenom, email, mdp, role_user} = req.body;
        if(!nom || !prenom || !email || !mdp || !role_user){
            return res.status(422).json({ message: 'Fill in all field'});
        }
    }catch(error){
        res.status(500).json({ message: 'Internal server error' })
    }
})


app.use("/api/users", userRoute);

app.use(routeClient);
app.use(routeCategorie);
app.use(routeArticle);
app.use(routeCommande);
app.use(routePaiement);
app.use(routePanier);
app.use(routeContenir);
app.use(routeAjouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});