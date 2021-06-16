<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$id_tache = $data['id_tache'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// Requête qui va ajouter la date de fin
$req = $bdd->prepare('UPDATE tache SET finish = :finish WHERE id = :id');
$req->execute(array(
       'finish' => date("Y-m-d H:i:s"),
       'id' => $id_tache
       ));

//echo json_encode($select);