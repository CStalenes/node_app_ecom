INSERT INTO User(email, mdp, role_user)
VALUES
('jean.dupont@gmail.com', 'acid123','user'),
('lea.doumbe@yahoo.fr', 'mera456','user');


INSERT INTO Client (nom, prenom, adresse, ville, code_postal, pays) 
VALUES
('Dupont', 'Jean', '12 rue de la République', 'Paris', '75001', 'France'),
('Doumbe', 'Lea', '45 avenue Champsigny', 'Paris', '93100', 'France');


INSERT INTO Categorie (nom_categorie, description_categorie)
VALUES 
('Smartphones', 'Téléphones portables de différentes marques et modèles'),
('Accessoires', 'Accessoires pour téléphones mobiles'),
('Tablettes', 'Tablettes tactiles de différentes tailles et spécifications');


INSERT INTO Article (nom_article, designation, prix, quantite_stock, id_categorie)
VALUES
('iPhone 13', 'Smartphone Apple 128Go', 799.99, 50, 1),
('Samsung Galaxy S21', 'Smartphone Samsung 128Go', 699.99, 30, 1),
('Casque Bluetooth', 'Casque sans fil compatible tous appareils', 99.99, 150, 2),
('Tablette Samsung Tab S7', 'Tablette Samsung 11 pouces 128Go', 649.99, 40, 3);


INSERT INTO Commande (montant_total, statut, date_commande, date_livraison, id_client)
VALUES 
(899.98, 'en traitement', '2024-11-01 10:00:00', '2024-11-05', 1), 
(799.99, 'expédiée', '2024-11-02 14:30:00', '2024-11-06', 2), 
(649.99, 'livrée', '2024-11-03 09:15:00', '2024-11-07', 3); 


INSERT INTO Panier (id_client, id_article)
VALUES
(1, 1),  
(1, 2),  
(2, 3), 
(3, 4); 


INSERT INTO Paiement (montant, mode_paiement, statut, id_commande)
VALUES 
(899.98, 'carte bancaire', 'réussi', 1), 
(799.99, 'PayPal', 'réussi', 2),  
(649.99, 'virement', 'réussi', 3); 


INSERT INTO Contenir (id_commande, id_article, quantite, prix_unitaire)
VALUES 
(1, 1, 1, 799.99), 
(1, 2, 1, 699.99),  
(2, 3, 1, 99.99),  
(3, 4, 1, 649.99);  



INSERT INTO Ajouter(id_article, id_panier, prix_article, quantite_article)
VALUES
(1, 1, 799.99, 1),
(3, 2, 99.99, 2);