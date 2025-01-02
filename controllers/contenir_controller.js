const pool = require('../config/database');


exports.addContenir = async (req, res) => {
    try {
        const { id_commande, id_article, quantite, prix_unitaire } = req.body;
        const sql = 'INSERT INTO Contenir (id_commande, id_article, quantite, prix_unitaire) VALUES (?, ?, ?, ?)';
        const results = await pool.query(sql, [id_commande, id_article, quantite, prix_unitaire]);
        res.status(200).json({ message: 'Contenir created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Contenir
exports.getAllContenirs = async (req, res) => {
    try {
        const sql = "SELECT * FROM Contenir";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Contenir not found' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching contenir:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}
   




//Get All Contenir having the name in the param
exports.getAllContenirsByName = async (req, res) => {
    try {
        const { statut } = req.params;
        const sqlSearching = `SELECT * FROM Contenir WHERE statut LIKE ?`;
      
        const [searchResults] = await pool.query(sqlSearching, [`%${statut}%`]);
      

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Contenir not found'});

        }

        res.status(200).json({ Contenir : searchResults});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update Contenir
exports.updateContenir = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_commande, id_article, quantite, prix_unitaire } = req.body;
        const sqlCheckExistence = "SELECT * FROM Contenir WHERE id = ?";
        const sqlUpdate = "UPDATE Contenir SET id_commande = ?, id_article = ?,  quantite = ?, prix_unitaire = ? WHERE id = ?";

        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Contenir not found' });
        }
    
        
        const [updateResults] = await pool.query(sqlUpdate, [id_commande, id_article, quantite, prix_unitaire, id]);

        res.status(200).json({message: 'Contenir has been updated'})

    } catch (err) {
        console.error('Error during updating Contenir :',err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete contenir
exports.deleteContenir = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Contenir WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Contenir WHERE id = ${id}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Contenir not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({ message: 'Contenir has been deleted' });

    }catch(err) {
        console.error('Error during deleting Contenir:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
