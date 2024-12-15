const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('../node_app_ecom/config/database');
//const PORT = process.env.PORT || 3000;
const port = 4000;
//const routeArticle = require("../node_app_ecom/routes/article_route");

const routeClient = require("../node_app_ecom/routes/client_route");
const routeCategorie = require("../node_app_ecom/routes/categorie_route");

// Middleware pour analyser le corps de la requête en JSON
app.use(express.json());

/*
app.get("/api", (req, res) =>{
    res.json({
        "status": 200,
        "message": "This res api work"
    });
});
*/

app.use(routeClient);
app.use(routeCategorie);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});