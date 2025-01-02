DROP DATABASE IF EXISTS app_phone;
CREATE DATABASE app_phone;
USE app_phone;




DROP TABLE IF EXISTS User;

CREATE TABLE IF NOT EXISTS User(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    mdp VARCHAR(50),
    role_user ENUM('admin','user') NOT NULL
);



CREATE TABLE Client (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nom VARCHAR(50) NOT NULL,
	prenom VARCHAR(50) NOT NULL,
	adresse VARCHAR(100) NOT NULL,
    ville VARCHAR(50),
    code_postal VARCHAR(10),
    pays VARCHAR(50) NOT NULL
);


CREATE TABLE Categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(50),
    description_categorie VARCHAR(100) 

);

CREATE TABLE Article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_article VARCHAR(50) NOT NULL,
    designation VARCHAR(100) ,
    prix DECIMAL(10, 2) NOT NULL,
    quantite_stock INT,
    id_categorie INT,
    FOREIGN KEY (id_categorie) REFERENCES Categorie(id)
);

CREATE TABLE Commande (
	id INT AUTO_INCREMENT PRIMARY KEY,
    montant_total DECIMAL(10, 2) NOT NULL,
    statut ENUM('en traitement', 'expédiée', 'livrée', 'annulée') DEFAULT 'en traitement',
	date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	date_livraison DATE,
	id_client INT,
	FOREIGN KEY (id_client) REFERENCES Client(id)
);


CREATE TABLE Panier(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_client INT,
	FOREIGN KEY (id_client) REFERENCES Client(id)

);

CREATE TABLE Paiement(
    id INT AUTO_INCREMENT PRIMARY KEY,
    montant DECIMAL(10, 2) NOT NULL,
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mode_paiement ENUM('carte bancaire', 'PayPal', 'virement') NOT NULL,
    statut ENUM('réussi','echoué','en attente') DEFAULT 'en attente',
    id_commande INT,
    FOREIGN KEY (id_commande) REFERENCES Commande(id)

);

CREATE TABLE Contenir(
    id_contenir INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT,
    id_article INT,
    quantite INT,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES Commande(id),
    FOREIGN KEY (id_article) REFERENCES Article(id)
);

CREATE TABLE Ajouter(
    id_ajouter INT AUTO_INCREMENT PRIMARY KEY,
    id_article INT,
    id_panier INT,
    prix_article  DECIMAL(10, 2) NOT NULL,
    quantite_article INT,
    FOREIGN KEY (id_article) REFERENCES Article(id),
    FOREIGN KEY (id_panier)  REFERENCES Panier(id)

);


