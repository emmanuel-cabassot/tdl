<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$nom = $data['nom'];
$user = $data['userId'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost:3306;dbname=emmanuel-cabassot_todolist;charset=utf8', 'manu', '2C5XMrdj', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Requête qui va créer une nouvelle liste
$insert = $bdd->prepare("INSERT INTO liste (nom) VALUES (:nom)");
$insert->execute(array(
    'nom' => $nom
));

// On va chercher l'id de la nouvelle liste
$select = $bdd->query("SELECT * FROM liste ORDER BY id DESC")->fetch(PDO::FETCH_ASSOC);
$liste_id = $select['id'];

// On créer les droits qui lient l'utilisateur à la liste
$inserte = $bdd->prepare("INSERT INTO droits (liste_id, user_id) VALUES (:liste, :user)");
$inserte->execute(array(
    'liste' => $liste_id,
    'user' => $user
));

echo json_encode($select);




