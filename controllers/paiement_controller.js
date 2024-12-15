const pool = require('../config/database');


exports.addPaiement = async (req, res) => {
    try {
        const { montant, date_paiement, mode_paiement, statut, id_commande } = req.body;
        const sql = 'INSERT INTO Paiement (montant, date_paiement, mode_paiement, statut, id_commande) VALUES (?, ?, ?, ?, ?)';
        const results = await pool.query(sql, [montant, date_paiement, mode_paiement, statut, id_commande]);
        res.status(200).json({ message: 'Paiement created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Paiement
exports.getAllPaiements = async (req, res) => {
    try {
        const sql = "SELECT * FROM Paiement";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aucune paiement trouvée' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching paiement:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur interne du serveur' }); 
        }
    }
}




//Get All Paiement having the name in the param
exports.getAllPaiementsByName = async (req, res) => {
    try {
        const { mode_paiement } = req.params;
        const searchString = "'" + '%' + mode_paiement + '%' + "'";
        const sql = `SELECT * FROM Paiement WHERE mode_paiement LIKE ${searchString};`

        await pool.query(sql, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Paiement name not found' });
            }

            res.status(200).json({ Paiement: rows });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Paiement
exports.updatePaiement = (req, res) => {
    try {
        const { id } = req.params;
        const {montant, date_paiement, mode_paiement, statut, id_commande } = req.body;
        const sqlCheckExistence = "SELECT * FROM Paiement WHERE id = ?";
        const sqlUpdate = "UPDATE Paiement SET montant = ?, mode_paiement = ?, date_paiement = ?, statut = ?, id_commande = ? WHERE id = ?";

       
        pool.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Paiement not found' });
            }

            
            pool.query(sqlUpdate, [ montant, date_paiement, mode_paiement, statut, id_commande], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'Paiement has been updated' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a Paiement
exports.deletePaiement = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Paiement WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Paiement WHERE id = ${id}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Paiement not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({ message: 'paiement has been deleted' });

    }catch(err) {
        console.error('Error during deleting paiement:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
