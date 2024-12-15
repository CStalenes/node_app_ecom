const pool = require('../config/database');


exports.addPanier = async (req, res) => {
    try {
        const { date_creation, id_client } = req.body;
        const sql = 'INSERT INTO Panier (date_creation, id_client) VALUES (?, ?)';
        const results = await pool.query(sql, [date_creation, id_client]);
        res.status(200).json({ message: 'Panier created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Panier
exports.getAllPaniers = async (req, res) => {
    try {
        const sql = "SELECT * FROM Panier";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aucune panier trouvée' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching panier:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur interne du serveur' }); 
        }
    }
}




//Get All Panier having the name in the param
exports.getAllPaniersByName = async (req, res) => {
    try {
        const { date_creation } = req.params;
        const searchString = "'" + '%' + date_creation + '%' + "'";
        const sql = `SELECT * FROM Panier WHERE date_creation LIKE ${searchString};`

        await connection.query(sql, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Panier name not found' });
            }

            res.status(200).json({ Panier: rows });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Panier
exports.updatePanier = (req, res) => {
    try {
        const { id } = req.params;
        const {  date_creation, id_client } = req.body;
        const sqlCheckExistence = "SELECT * FROM Panier WHERE id = ?";
        const sqlUpdate = "UPDATE Panier SET date_creation = ?,  id_client = ? WHERE id = ?";

       
        connection.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Panier not found' });
            }

            
            connection.query(sqlUpdate, [ date_creation, id_client], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'Panier has been updated' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a Panier
exports.deletePanier = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Panier WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Panier WHERE id = ${id}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Panier not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({ message: 'panier has been deleted' });

    }catch(err) {
        console.error('Error during deleting panier:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
