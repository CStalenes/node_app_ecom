const pool = require('../config/database');


exports.addArticle = async (req, res) => {
    try {
        const { nom_article, designation, prix, quantite_stock, id_categorie } = req.body;
        const sql = 'INSERT INTO Article (nom_article, designation, prix, quantite_stock, id_categorie) VALUES (?, ?, ?, ?, ?)';
        const results = await pool.query(sql, [nom_article, designation, prix, quantite_stock, id_categorie]);
        res.status(200).json({ message: 'article created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Articles
exports.getAllArticles = async (req, res) => {
    try {
        const sql = "SELECT * FROM Article";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Article not found' }); 
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching article:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}


//Get All Article having the name in the param
exports.getAllArticlesByName = async (req, res) => {
    try {

        // Récupérer le paramètre 'nom_article' de l'URL
        const {nom_article} = req.params;
        

        // Créer la requête SQL pour rechercher l'article par nom
        const sqlSearching = `SELECT * FROM Article WHERE nom_article LIKE ?`;

        
        // Exécuter la requête avec le nom de l'article recherché
        const [searchResults] = await pool.query(sqlSearching, [`%${nom_article}%`]);
        //const [searchResults] = await pool.query(sqlSearching, parameters);

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Article not found'});

        }

        res.status(200).json({ Article : searchResults});
       

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Update a Article
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_article, designation, prix, quantite_stock, id_categorie } = req.body;
        const sqlCheckExistence = "SELECT * FROM Article WHERE id = ?";
        const sqlUpdate = "UPDATE Article SET nom_article = ?, designation = ?, prix = ?, quantite_stock = ?, id_categorie = ?  WHERE id = ?";

        
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

    
        const [updateResults] = await pool.query(sqlUpdate, [nom_article, designation, prix, quantite_stock, id_categorie, id]);

    
        res.status(200).json({ message: 'Article has been updated' });
    } catch (err) {
        console.error('Error during updating article:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a article
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Article WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Article WHERE id = ${id}`;

        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

        if(existingRows.length === 0){
            return res.status(404).json({message : "Article not found"});
        }

        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({message:" Article has been deleted"});


    } catch (err) {
        console.error('Error during deleting article:',err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
