<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$email = strip_tags($data['email']);
$nom = strip_tags($data['nom']);
$prenom = strip_tags($data['prenom']);
$password = $data['password'];

// On vérifie que le mail soit au format correct
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
} else {
    echo json_encode("Arrêtez de chercher les problèmes : pas de failles!", JSON_UNESCAPED_UNICODE);
    die;
}

// On vérifie que le nom et le prénon ne soit pas vide
if (strlen($nom) === 0 or strlen($prenom) === 0) {
    echo json_encode("Arrêtez de chercher les problèmes : pas de failles!", JSON_UNESCAPED_UNICODE);
    die;
}

// On vérifie le format du mot de passe
if (preg_match('#^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)#', $password)) {
    if (strlen($password) < 6 or strlen($password) > 30) {
        echo json_encode("Arrêtez de chercher les problèmes : pas de failles!", JSON_UNESCAPED_UNICODE);
        die;
    }
} else {
    echo json_encode("Arrêtez de chercher les problèmes : pas de failles!", JSON_UNESCAPED_UNICODE);
    die;
}


// Connexion à la BDD
try {
    $bdd = new PDO('mysql:host=localhost:3306;dbname=emmanuel-cabassot_todolist;charset=utf8', 'manu', '2C5XMrdj', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}

// En cas d'erreur, on affiche un message et on arrête tout
catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

// On vérifie que l'email n'est pas déjà enregistré en BDD
$verif = $bdd->prepare("SELECT * FROM user WHERE email = :email");
$verif->execute(array(
    'email' => $email
));
$verif = $verif->rowCount();
if ($verif == 1) {
    echo json_encode('Cette email est déjà utilisé', JSON_UNESCAPED_UNICODE);
    die;
}

// Encodage du mot de passe
$password = password_hash($password, PASSWORD_ARGON2I);

// Requete d'insertion en BDD
$insert = $bdd->prepare("INSERT INTO `user`(`email`, `nom`, `prenom`, `password`) VALUES (:email ,:nom , :prenom, :pass) ");
$insert->execute([
    'email' => $email,
    'nom' => $nom,
    'prenom' => $prenom,
    'pass' => $password
]);

// On va chercher l'id dans la BDD
$select = $bdd->prepare("SELECT `id` FROM user WHERE email = :email");
$select->execute(array(
    'email' => $email
));
$result = $select->fetch(PDO::FETCH_ASSOC);

// On verifie que tout a fonctionné
if (isset($result) and !empty($result['id'])) {
    $_SESSION['user']['prenom'] = $prenom;
    $_SESSION['user']['id'] = $result['id'];
    $_SESSION['message_ok'] = "Bonjour $prenom, votre compte à bien été créé";
    echo json_encode("Votre compte à bien été crée", JSON_UNESCAPED_UNICODE);
} else {
    $_SESSION['message_erreur'] = "Il y a eu un problème lors de la création de votre compte";
    echo json_encode($_SESSION['message_erreur'], JSON_UNESCAPED_UNICODE);
}
