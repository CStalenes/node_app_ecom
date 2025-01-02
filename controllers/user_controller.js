const pool = require('../config/database');
//const { create, getUsers, getUsersById } = require('../model/user_model');

//const {genSaltSync, hashSync} = require("bcrypt");
const bcrypt = require("bcrypt");
//const compareSync = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();




exports.createUser = async (req, res) => {
    try {
        const { username, email, mdp, role_user } = req.body;  // Récupérer les données du corps de la requête

        // Vérifier si toutes les données nécessaires sont présentes
        if (!username || !email || !mdp || !role_user) {
            return res.status(400).json({ message: 'Missing required fields' });  // Retourner une erreur 400 si des champs sont manquants
        }

        // Générer un "salt" de manière synchrone pour le mot de passe
        const saltRounds = 10;
        // Le nombre de tours pour le hachage
        
        const salt = bcrypt.genSaltSync(saltRounds);
        // Générer le salt de manière synchrone

        // Hacher le mot de passe avec le "salt" de manière synchrone
        const hashedPassword = bcrypt.hashSync(mdp, salt);  // Hachage du mot de passe de manière synchrone

        // Requête pour insérer un nouvel utilisateur dans la base de données avec le mot de passe haché
        const sql = `INSERT INTO User (username, email, mdp, role_user) VALUES (?, ?, ?, ?)`;
        
        const results = await pool.query(sql,[username, email, hashedPassword, role_user]);
        res.status(200).json({
            message: 'User created successfully',
            "Record inserted": results.values
        });

    } catch (err) {
        // Gestion des erreurs (par exemple, base de données, ou autre)
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getUser = async (req, res) =>{
    try{
        const sql = `SELECT * FROM user`; 
        const [results] = await pool.query(sql);  // Exécution de la requête SQL

        // Vérification si des utilisateurs ont été trouvés
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found' });  // Si aucun utilisateur n'est trouvé
        }

        // Si des utilisateurs sont trouvés, renvoyer les résultats
        res.status(200).json({
            message: "Users found",
            data: results  // Renvoyer tous les utilisateurs
        });

    }catch(err){
        console.log('Error fetching',err);
        return res.status(500).json({
            message: "Internal server error"
        });

    }
};


exports.getUserById = async(req, res) => {
    
    try {
        const {id}  = req.params; // Récupérer l'ID depuis l'URL (ex: /api/users/:id)
       
        
        if (!id) {
            return res.status(404).json({
                message: "User id is required"
            });
        }

       
        const sql = `SELECT * FROM User WHERE id = ?`;

        //Nous attendons la réponse de la base de données et récupérons les résultats dans results
        const [results] = await pool.query(sql, [id]);

        // Vérifier si l'utilisateur existe
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });  // Si aucun utilisateur n'est trouvé, retourner une erreur 404
        }

        // Si l'utilisateur est trouvé, retourner les données
        res.status(200).json({
            message: 'User found',
            data: results[0]  // Retourner le premier utilisateur (puisque l'ID est unique)
        });

    } catch (err) {
        // Si une erreur se produit, on la capture ici
        console.error('Error fetching user by ID:', err);
        return res.status(500).json({
            success: 0,
            message: "Internal Server Error"
        });
    }
}

exports.updateUser = async(req, res) =>{
    try{
        const {id}  = req.params;
        const {username, email, mdp, role_user} = req.body;

        if(!id){
            return res.status(404).json({
                message: "User id is required"
            });
        }

        const sqlExist = `SELECT * FROM User WHERE id =?`;
        const sql = `UPDATE User SET username = ?, email = ?, mdp = ?, role_user = ? WHERE id =?`;

        const [ExistingRows] = await pool.query(sqlExist, [id]);
        if(ExistingRows.length === 0){
            return res.status(404).json({ message: 'User not found' });
        }

        const [updateRows] = await pool.query(sql, [username, email, mdp, role_user,id]);
        res.status(200).json({
            message: 'User has been updated',
            data: updateRows[0]
        })

    }catch(err){
        console.error('Error during updating article:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUser = async (req, res) =>{
    try{
        const {id}  = req.params; 
        if(!id){
            return res.status(404).json({
                message: "User id is required"
            });
        }

        const sqlExist = `SELECT * FROM User WHERE id =?`;
        const sql = `DELETE FROM User WHERE id =?`;

        const [ExistingRows] = await pool.query(sqlExist, [id]);
        if(ExistingRows.length === 0){
            return res.status(404).json({ message: 'User not found' });
        }

        const [deleteRows] = await pool.query(sql, [id]);
        res.status(200).json({
            message: 'User has been deleted',
            data: deleteRows[0]
        })


    }catch(err){

    }
}


function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM USER WHERE email = ?`, [email], (error, results) => {
            if (error) {
                return reject(error);  // Rejeter la promesse en cas d'erreur
            }
            resolve(results[0]);  // Résoudre la promesse avec le premier utilisateur trouvé
        });
    });
}


async function getUserByEmail (email){
    try{

        const sql = 'SELECT * FROM User WHERE email = ?';

        const [results] = await pool.query(sql, [email]);

        if(results.length === 0){
            //return res.status(404).json({ message: 'User not found' });
            return null;
        }

       return results[0];
    }catch(err){
        
        console.error('Error fetching user by email:', err);

        throw new Error('Internal Server Error');

    }
}

exports.login = async (req, res) => {
    try {
        const body = req.body;
        console.log('Email envoyé:', body.email);
        
        // Utilisation de la fonction avec await pour récupérer l'utilisateur par email
        const user = await getUserByEmail(body.email);

        console.log('Utilisateur trouvé:', user);


        if (!user) {
            return res.status(404).json({
                success: 0,
                message: 'Invalid email'
            });
        }

     
        console.log('Mot de passe envoyé:', body.mdp);
        console.log('Mot de passe stocké:', user.mdp);

        // Comparaison des mots de passe
        const isMatch = bcrypt.compare(body.mdp, user.mdp);
        console.log(isMatch);

        if (isMatch) {
            // Créer un token JWT si la comparaison réussit
            user.password = undefined;  // Supprimer le mot de passe du retour
            const jsontoken = jwt.sign(
                { id: user.id, username: user.username, email: user.email, role_user: user.role_user },
                process.env.SECRET_KEY,  // Clé secrète
                { expiresIn: '24h' }  // Durée de validité du token
            );

            return res.status(200).json({
                success: 1,
                message: 'Login successful',
                token: jsontoken
            });
        } else {
            return res.status(401).json({
                success: 0,
                message: 'Invalid email or password'
            });
        }

    } catch (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({
            success: 0,
            message: 'Internal Server Error'
        });
    }
};

