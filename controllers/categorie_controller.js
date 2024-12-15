const pool = require('../config/database');


exports.addCategorie = async (req, res) => {
    try {
        const { nom_categorie, description_categorie } = req.body;
        const sql = 'INSERT INTO Categorie (nom_categorie, description_categorie) VALUES (?, ?)';
        const results = await pool.query(sql, [nom_categorie, description_categorie]);
        res.status(200).json({ message: 'categorie created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Categorie
exports.getAllCategories = async (req, res) => {
    /*try {
        const sql = "SELECT * FROM Categorie";
        await connection.query(sql, (error, results, fields) => {
            res.status(200).json({ results });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }*/
    try {
        const sql = "SELECT * FROM Categorie";
        const [results] = await pool.query(sql); // Utilisation de `mysql2/promise`
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée' });  // Première réponse
        }
        res.status(200).json({ results });  // Seconde réponse envoyée seulement si les résultats existent
    } catch (err) {
        console.error('Error during fetching categories:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur interne du serveur' });  // Vérifie que les headers n'ont pas déjà été envoyés
        }
    }
}




//Get All Categorie having the name in the param
exports.getAllCategoriesByName = async (req, res) => {
    try {
        const { nom_categorie } = req.params;
        const searchString = "'" + '%' + nom_categorie + '%' + "'";
        const sql = `SELECT * FROM Categorie WHERE nom_categorie LIKE ${searchString};`

        await pool.query(sql, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Categorie name not found' });
            }

            res.status(200).json({ Categorie: rows });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Categorie
exports.updateCategorie = (req, res) => {
    try {
        const { id } = req.params;
        const { nom_categorie, description_categorie } = req.body;
        const sqlCheckExistence = "SELECT * FROM Categorie WHERE id = ?";
        const sqlUpdate = "UPDATE Categorie SET nom_categorie = ?, description_categorie = ? WHERE id = ?";

       
        pool.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'article not found' });
            }

            
            pool.query(sqlUpdate, [ nom_categorie, description_categorie, id], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'categorie has been updated' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a Categorie
exports.deleteCategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Categorie WHERE id = ?`;
        const sqlDelete = `DELETE FROM Categorie WHERE id = ?`;

       
        // Vérifier si la catégorie existe
        const [existingRows] = await pool.query(sqlCheckExistence, [id]);
        
        if (existingRows.length === 0) {
            return res.status(404).json({ message: 'Categorie not found' });
        }
 
        // Supprimer la catégorie
        const [deleteResults] = await pool.query(sqlDelete, [id]);
 
        res.status(200).json({ message: 'Categorie has been deleted' });
 
    }catch(err) {
        console.error('Error during deleting category:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
