<?php
$host = 'localhost';
$db = 'Sucursales';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $username = 'vista';
    $password = password_hash('123', PASSWORD_DEFAULT);
    $role = 'vista';

    $sql = "INSERT INTO usuarios (username, password, role) VALUES (:username, :password, :role)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username, 'password' => $password, 'role' => $role]);

    echo "Usuario creado exitosamente.";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
