<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
$data = json_decode(file_get_contents('php://input'), true);

$email = strip_tags($data['email']);
$password = $data['password'];

// On vérifie que le mail soit au format correct
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
} else {
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

// Requête qui va chercher un user par rapport a son email
$reponse = $bdd->prepare("SELECT * FROM user WHERE email = :email");
$reponse->execute(array(
    'email' => $email
));
$result = $reponse->fetch();

// On vérifie que l'email existe
if (!isset($result['id']) AND empty($result['id'])) {
    echo json_encode("email et/ou mot de passe incorrect(s)");
    die;
}

// On vérifie que le mot de passe est bon
if (password_verify( $password, $result['password']) == false) {
    echo json_encode("email et/ou mot de passe incorrect(s)");
    die;
}

// On met en $_SESSION l'id et le nom de l'utilisateur
$_SESSION['user']['id'] = $result['id'];
$_SESSION['user']['nom'] = $result['nom'];
$_SESSION['user']['prenom'] = $result['prenom'];
$_SESSION['message_ok'] = 'Bonjour '.$_SESSION['user']['prenom'].', vous êtes connecté.';
echo json_encode('vous êtes connecté', JSON_UNESCAPED_UNICODE);
die;


