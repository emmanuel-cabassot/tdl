<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$nom = $data['nom'];
$liste_id = $data['liste'];
$user_id = $data['userId'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Requête qui va créer une nouvelle tache
$insert = $bdd->prepare("INSERT INTO tache (nom, liste_id, user_id) VALUES (:nom, :liste, :user)");
$insert->execute(array(
    'nom' => $nom,
    'liste' => $liste_id,
    'user' => $user_id,
));

// On va chercher l'id de la nouvelle tache
$select = $bdd->query("SELECT * FROM tache ORDER BY id DESC")->fetch(PDO::FETCH_ASSOC);

echo json_encode($select);




