<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$user = $data['user'];

// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost:3306;dbname=emmanuel-cabassot_todolist;charset=utf8', 'manu', '2C5XMrdj', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// On va chercher l'id dans la BDD
$select = $bdd->prepare("SELECT 
liste.id AS id_liste, liste.nom AS nomListe, liste.create_at AS create_liste, liste.finished_at AS finished_list 
FROM droits 
INNER JOIN liste 
ON droits.liste_id = liste.id
WHERE user_id = :user");
$select->execute(array(
    'user' => $user
));

$result = $select->fetchAll(PDO::FETCH_ASSOC);
$compte = 0;
// on boucle dans $result
foreach ($result as $value) { 
    
    $select = $bdd->prepare("SELECT * FROM tache WHERE liste_id = :liste and finish != :finish");
    $select->execute(array(
        'liste' => $value['id_liste'],
       'finish' => '2000-01-01 00:00:00'
    ));
    $tache = $select->fetchAll(PDO::FETCH_ASSOC);

    $result[$compte]['taches'] = $tache;
    $compte++;
}

echo json_encode($result); 



