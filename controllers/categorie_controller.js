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

    try {
        const sql = "SELECT * FROM Categorie";
        const [results] = await pool.query(sql); // pool car utilisation de `mysql2/promise`
        if (results.length === 0) {
            return res.status(404).json({ message: 'Categorie not found' });  // Première réponse
        }
        res.status(200).json({ results });  // Seconde réponse envoyée seulement si les résultats existent
    } catch (err) {
        console.error('Error during fetching categories:', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' });  // Vérifie que les headers n'ont pas déjà été envoyés
        }
    }
}




//Get All Categorie having the name in the param
exports.getAllCategoriesByName = async (req, res) => {
    try {
        //const {id } = req.params;
        
        const { nom_categorie, description_categorie} = req.body; 
        const searchString = `%${nom_categorie}%`;
        const sqlByname = `SELECT * FROM Categorie WHERE nom_categorie LIKE ?`;
        
    
        // Exécution de la requête avec les paramètres
        const [searchResults] = await pool.query(sqlByname, [searchString, `%${description_categorie}%`]);
        //on affichera dans la res json id, nom_cat, desc_cat via le select * de la requete et grace à [ searchStr, %${description_categorie}% (pour recup chaque val du str ) ]

        if(searchResults.length === 0){
            return res.status(404).json({message: 'Categorie not found'});
        }

        // Retourner les résultats trouvés
        res.status(200).json({ Categorie: searchResults });
        //le resultat de notre req json aura ce format 

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Categorie
exports.updateCategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_categorie, description_categorie } = req.body;
        const sqlCheckExistence = "SELECT * FROM Categorie WHERE id = ?";
        const sqlUpdate = "UPDATE Categorie SET nom_categorie = ?, description_categorie = ? WHERE id = ?";


    // Vérifie si la catégorie existe
    const [existingRows] = await pool.query(sqlCheckExistence, [id]);

    if (existingRows.length === 0) {
        return res.status(404).json({ message: 'Category not found' });
    }

    // Si la catégorie existe, mets à jour les données
    const [updateResults] = await pool.query(sqlUpdate, [nom_categorie, description_categorie, id]);

    // Si la mise à jour est réussie
    res.status(200).json({ message: 'Category has been updated' });

    } catch (err) {
        console.error('Error during updating category:', err.message);
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
        console.error('Error during deleting categorie:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
