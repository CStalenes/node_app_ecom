const pool = require('../config/database');


exports.addClient = async (req, res) => {
    try {
        const { nom, prenom, adresse, ville, code_postal, pays } = req.body;
        const sql = 'INSERT INTO Client (nom, prenom, adresse, ville, code_postal, pays) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await pool.query(sql, [nom, prenom, adresse, ville, code_postal, pays]);
        res.status(200).json({ message: 'Client created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Client
exports.getAllClients = async (req, res) => {
    try {
        const sql = "SELECT * FROM Client";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching categories:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur interne du serveur' }); 
        }
    }
}




//Get All Client having the name in the param
exports.getAllClientsByName = async (req, res) => {
    try {
        const { nom_client } = req.params;
        const searchString = "'" + '%' + nom_client + '%' + "'";
        const sql = `SELECT * FROM Client WHERE nom LIKE ${searchString};`

        await pool.query(sql, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Client name not found' });
            }

            res.status(200).json({ Client: rows });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Client
exports.updateClient = (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse, ville, code_postal, pays } = req.body;
        const sqlCheckExistence = "SELECT * FROM Client WHERE id = ?";
        const sqlUpdate = "UPDATE Client SET nom = ?, prenom = ?,  adresse = ?, ville = ?,  code_postal = ?, pays = ? WHERE id = ?";

       
        pool.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }

            
            pool.query(sqlUpdate, [ nom, prenom, adresse, ville, code_postal, pays], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'Client has been updated' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a Client
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Client WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Client WHERE id = ${id}`;

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
    
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }

        
        const [deleteResults] = await pool.query(sqlDelete, [id]);

        res.status(200).json({ message: 'Client has been deleted' });

    }catch(err) {
        console.error('Error during deleting client:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
