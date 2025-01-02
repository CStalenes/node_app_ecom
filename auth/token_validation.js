require('dotenv').config();

const {verify} = require("jsonwebtoken");

function checkToken(req, res, next){
    let token = req.get("authorization");
    if(token){
        token = token.slice(7);
        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                res.status(401).json({
                    success: 0,
                    message: "Invalid token"
                });
            } else{
                // Si le token est valide, ajouter les données décodées à la requête
                req.user = decoded; // Vous pouvez maintenant accéder à `req.user` dans vos routes protégées
                console.log(decoded);
                next();// Passer au middleware suivant
            }
        });
    } else{
        res.status(401).json({
            success: 0,
            message: "Access denied! unautorized user"
        });
    }
}

module.exports = {checkToken};