const pool = require('../config/database');


exports.addPanier = async (req, res) => {
    try {
        const { date_creation, id_client } = req.body;
        const sql = 'INSERT INTO Panier (date_creation, id_client) VALUES (?, ?)';
        const results = await pool.query(sql, [date_creation, id_client]);
        res.status(200).json({ message: 'Panier created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error('Error during updating panier :',err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Panier
exports.getAllPaniers = async (req, res) => {
    try {
        const sql = "SELECT * FROM Panier";
        const [results] = await pool.query(sql); 
        if (results.length === 0) {
            return res.status(404).json({ message: 'Panier not found' });  
        }
        res.status(200).json({ results }); 
    } catch (err) {
        console.error('Error during fetching panier:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' }); 
        }
    }
}




//Get All Panier having the name in the param
exports.getAllPaniersByName = async (req, res) => {
    try {
        const { date_creation } = req.params;
       
        const sqlSearching = `SELECT * FROM Panier WHERE date_creation LIKE ?;`;

        const [searchResults] = await pool.query(sqlSearching, [`%${date_creation}%`]);
      

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Panier not found'});

        }

        res.status(200).json({Panier : searchResults});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Panier
exports.updatePanier = async(req, res) => {
    try {
        const { id } = req.params;
        const {  date_creation, id_client } = req.body;
        const sqlCheckExistence = "SELECT * FROM Panier WHERE id = ?";
        const sqlUpdate = "UPDATE Panier SET date_creation = ?,  id_client = ? WHERE id = ?";

       
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);

        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Panier not found' });
        }
    
        const [updateResults] = await pool.query(sqlUpdate, [date_creation, id_client , id]);
        res.status(200).json({message: 'panier has been created'});
        
    } catch (err) {
        console.error('Error during updating panier :',err.message);
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
