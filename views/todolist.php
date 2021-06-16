<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="../css/style.css">
    <title>Document</title>
</head>

<body>
    <header class="header-todo">
        <div> My ToDoList</div>  
        <a href="../api/deconnexion.php">Déconnexion</a>    
    </header>
    <main class="todo">
        <section class="entete">
            <h1>Ecran des listes</h1>
            <button type="button" id="fini-entete">Taches finies</button>
        </section>
        <section class="listes">
        </section>
    </main>
    <footer>
    &#169 Emmanuel CABASSOT
    </footer>
    <input type="text" id="session" value="<?= $_SESSION['user']['id'] ?>">
    <script src="../api/todolist.js"></script>
</body>

</html>