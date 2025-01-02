const pool = require('../config/database');


exports.addAjouter = async (req, res) => {
    try {
        const { id_article, id_panier, prix_article, quantite_article } = req.body;
        const sql = 'INSERT INTO Ajouter (id_article, id_panier, prix_article, quantite_article) VALUES (?, ?, ?, ?)';
        const results = await pool.query(sql, [id_article, id_panier, prix_article, quantite_article]);
        res.status(200).json({ message: 'Ajouter created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Ajouter
exports.getAllAjouters = async (req, res) => {
    try {
        const sql = "SELECT * FROM Ajouter";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Ajouter not found' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching Ajouter:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}
   




//Get All Ajouter having the name in the param
exports.getAllAjoutersByName = async (req, res) => {
    try {
        const { prix_article } = req.params;
        const sqlSearching = `SELECT * FROM Ajouter WHERE prix_article LIKE ?`;
      
        const [searchResults] = await pool.query(sqlSearching, [`%${prix_article}%`]);
      

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Ajouter not found'});

        }

        res.status(200).json({ Ajouter : searchResults});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update Ajouter
exports.updateAjouter = async (req, res) => {
    try {
        const { id_ajouter } = req.params;
        const { id_article, id_panier, prix_article, quantite_article} = req.body;
        const sqlCheckExistence = "SELECT * FROM Ajouter WHERE id_ajouter = ?";
        const sqlUpdate = "UPDATE Ajouter SET id_article = ?, id_panier = ?, prix_article = ?, quantite_article = ? WHERE id_ajouter = ?";

        const [existingRows] = await pool.query(sqlCheckExistence, [id_ajouter]);

        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Ajouter not found' });
        }
    
        
        const [updateResults] = await pool.query(sqlUpdate, [id_article, id_panier, prix_article, quantite_article, id_ajouter]);

        res.status(200).json({message: 'Ajouter has been updated'})

    } catch (err) {
        console.error('Error during updating Ajouter :',err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete Ajouter
exports.deleteAjouter = async (req, res) => {
    try {
        const { id_ajouter } = req.params;
        const sqlCheckExistence = `SELECT * FROM Ajouter WHERE id_ajouter = ${id_ajouter}`;
        const sqlDelete = `DELETE FROM Ajouter WHERE id_ajouter = ${id_ajouter}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id_ajouter]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Ajouter not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id_ajouter]);

        res.status(200).json({ message: 'Ajouter has been deleted' });

    }catch(err) {
        console.error('Error during deleting Ajouter:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
