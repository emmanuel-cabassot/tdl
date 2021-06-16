<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$id_tache = $data['idTache'];
$description = $data['description'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Requête qui va ajouter la date de fin
$req = $bdd->prepare('UPDATE tache SET description = :description WHERE id = :id');
$req->execute(array(
       'description' => $description,
       'id' => $id_tache
       ));

$select = $bdd->prepare('SELECT description FROM tache WHERE id = :id');
$select->execute(array(
    'id' => $id_tache
));
$select = $select->fetch(PDO::FETCH_ASSOC);
echo json_encode($select);