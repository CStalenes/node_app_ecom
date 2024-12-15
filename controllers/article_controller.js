const pool = require('../config/database');
//import {Request, Response} from 'express';


//Create article
/*exports.getAllArticle = async (req, res)=>{
    pool.query('select * from Article', (err, data)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                data
            })
        }
    });

}*/

exports.addArticle = async (req, res) => {
    try {
        const { nom_article, designation, prix, quantite_stock, id_categorie } = req.body;
        const sql = 'INSERT INTO Article (nom_article, designation, prix, quantite_stock, id_categorie) VALUES (?, ?, ?, ?, ?)';
        const results = await pool.query(sql, [nom_article, designation, prix, quantite_stock, id_categorie]);
        res.status(200).json({ message: 'article created successfully', "Record inserted": results.values });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get all Articles
exports.getAllArticles = async (req, res) => {
    try {
        const sql = "SELECT * FROM Article";
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


/*
exports.getOneItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM Article WHERE id = ?";

        await mysqlpool.query(sql, id, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'article not found' });
            }

            res.status(200).json({ rows});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}*/


//Get All Article having the name in the param
exports.getAllArticlesByName = async (req, res) => {
    try {
        const { nom_article } = req.params;
        const searchString = "'" + '%' + nom_article + '%' + "'";
        const sql = `SELECT * FROM Article WHERE nom_article LIKE ${searchString};`

        await pool.query(sql, (error, rows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Article name not found' });
            }

            res.status(200).json({ Articles: rows });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//Update a Article
exports.updateArticle = (req, res) => {
    try {
        const { id } = req.params;
        const { nom_article, designation, prix, quantite_stock, id_categorie } = req.body;
        const sqlCheckExistence = "SELECT * FROM Article WHERE id = ?";
        const sqlUpdate = "UPDATE Article SET nom_article = ?, designation = ?, prix = ?, quantite_stock = ?, id_categorie = ?,  WHERE id = ?";

        // Check if the artcle exists
        pool.query(sqlCheckExistence, id, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'article not found' });
            }

            // Update the article
            pool.query(sqlUpdate, [nom_article, designation, prix, quantite_stock, id_categorie, id], (updateError, updateResults) => {
                if (updateError) {
                    console.error(updateError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(200).json({ message: 'article has been updated' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Delete a article
exports.deleteArticle = (req, res) => {
    try {
        const { id } = req.params;
        const sqlCheckExistence = `SELECT * FROM Article WHERE id = ${id}`;
        const sqlDelete = `DELETE FROM Article WHERE id = ${id}`;

        // Check if the article exists
        pool.query(sqlCheckExistence, (error, existingRows) => {
            if (error) {
                console.error(error.message);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (existingRows.length === 0) {
                return res.status(404).json({ message: 'article not found' });
            }

            // Delete the article
            pool.query(sqlDelete, (deleteError, deleteResults) => {
                if (deleteError) {
                    console.error(deleteError.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(200).json({ message: 'article has been deleted' });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
