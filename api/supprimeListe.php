<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$liste = $data['liste'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
 
// Requête qui va supprimer la tache
$req = $bdd->prepare('DELETE FROM liste WHERE id = :id');
$req->execute(array(
       'id' => $liste
       ));

echo json_encode($liste);