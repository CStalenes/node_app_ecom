-- REQUETE SELECT 

-- sélectionner les articles dont la quantité en stock est supérieure à zéro
SELECT nom_article, designation, prix, quantite_stock
FROM Article
WHERE quantite_stock > 0;

SELECT id, montant_total, statut, date_commande
FROM Commande
WHERE id_client = 2;

--  calculer le montant total des commandes d'un client spécifique
SELECT SUM(montant_total) AS total_commandes
FROM Commande
WHERE id_client = 3;

-- REQUETE GROUP BY 

--  compter le nombre de commandes pour chaque statut de commande
SELECT c.statut, COUNT(c.id) AS nombre_commandes
FROM Commande c
GROUP BY c.statut;

--  calculer le prix moyen des articles dans chaque catégorie
SELECT c.nom_categorie, AVG(a.prix) AS prix_moyen
FROM Article a
JOIN Categorie c ON a.id_categorie = c.id
GROUP BY a.id_categorie;

-- calculer le montant total des commandes pour chaque client
SELECT id_client, SUM(montant_total) AS total_achats
FROM Commande
GROUP BY id_client;

-- REQUETE JOIN

-- calculer le montant total des commandes par client
SELECT cl.nom, cl.prenom, SUM(co.montant_total) AS total_commande
FROM Client cl
JOIN Commande co ON cl.id = co.id_client
GROUP BY cl.id;


-- afficher l'historique des paiements pour un client spécifique, en listant 
-- la commande, le montant payé, le mode de paiement et le statut du paiement
SELECT 
    c.id AS commande_id,
    c.date_commande, 
    p.montant, 
    p.mode_paiement, 
    p.statut AS statut_paiement
FROM Paiement p
JOIN Commande c ON p.id_commande = c.id
WHERE c.id_client = 1
ORDER BY c.date_commande DESC;


-- afficher les articles les plus vendus, en fonction du nombre de fois où 
-- ils apparaissent dans les commandes, en les regroupant par article
SELECT 
    a.nom_article, 
    COUNT(c.id) AS nombre_commandes,
    SUM(c.quantite) AS quantite_vendue
FROM Article a
JOIN Contenir c ON a.id = c.id_article
GROUP BY a.id
ORDER BY quantite_vendue DESC
LIMIT 10;
