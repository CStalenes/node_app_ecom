const pool = require('../config/database');


exports.addCommande = async (req, res) => {
    try {
        const { montant_total, statut, date_commande, date_livraison, id_client } = req.body;
        const sql = 'INSERT INTO Commande (montant_total, statut, date_commande, date_livraison, id_client) VALUES (?, ?, ?, ?, ?)';
        const results = await pool.query(sql, [montant_total, statut, date_commande, date_livraison, id_client]);
        res.status(200).json({ message: 'Commande created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Commande
exports.getAllCommandes = async (req, res) => {
    try {
        const sql = "SELECT * FROM Commande";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'commande not found' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching commande:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}
   




//Get All Commande having the name in the param
exports.getAllCommandesByName = async (req, res) => {
    try {
        const { statut } = req.params;
        const sqlSearching = `SELECT * FROM Commande WHERE statut LIKE ?`;
      
        const [searchResults] = await pool.query(sqlSearching, [`%${statut}%`]);
      

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Commande not found'});

        }

        res.status(200).json({ Commande : searchResults});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Commande
exports.updateCommande = async (req, res) => {
    try {
        const { id } = req.params;
        const { montant_total, statut, date_commande, date_livraison, id_client } = req.body;
        const sqlCheckExistence = "SELECT * FROM Commande WHERE id = ?";
        const sqlUpdate = "UPDATE Commande SET montant_total = ?, statut = ?,  date_commande = ?, date_livraison = ?,  id_client = ? WHERE id = ?";

        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Commande not found' });
        }
    
        
        const [updateResults] = await pool.query(sqlUpdate, [montant_total, statut, date_commande, date_livraison, id_client, id]);

        res.status(200).json({message: 'Commande has been updated'})

    } catch (err) {
        console.error('Error during updating commande :',err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a Commande
exports.deleteCommande = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Commande WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Commande WHERE id = ${id}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Commande not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({ message: 'Commande has been deleted' });

    }catch(err) {
        console.error('Error during deleting commande:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
