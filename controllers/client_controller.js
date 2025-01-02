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
            return res.status(404).json({ message: 'Client not found' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching client:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}




//Get All Client having the name in the param
exports.getAllClientsByName = async (req, res) => {
    try {
        const { nom } = req.params;
       
        const sqlSearching = `SELECT * FROM Client WHERE nom LIKE ?`;
      
        const [searchResults] = await pool.query(sqlSearching, [`%${nom}%`]);
      

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Client not found'});

        }

        res.status(200).json({ Client : searchResults});
       

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Client
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, adresse, ville, code_postal, pays } = req.body;
        const sqlCheckExistence = "SELECT * FROM Client WHERE id = ?";
        const sqlUpdate = "UPDATE Client SET nom = ?, prenom = ?,  adresse = ?, ville = ?,  code_postal = ?, pays = ? WHERE id = ?";
        
       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

       
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
    
        const [updateResults] = await pool.query(sqlUpdate, [nom, prenom, adresse, ville, code_postal, pays, id]);
    
        res.status(200).json({ message: 'Client has been updated' });

    }catch(err) {
        console.error('Error during updating :client:', err.message);
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
