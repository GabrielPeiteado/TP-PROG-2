<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function db_connect() {
    $mysql_username = "root";
    $mysql_password = "";
    $server_name = "localhost";
    $basededatos = "Sucursales";
    
    $conn = mysqli_connect($server_name, $mysql_username, $mysql_password) or die("No se ha podido conectar al servidor de Base de datos");
    $db = mysqli_select_db($conn, $basededatos) or die("No se ha podido conectar con la base de datos '$basededatos'");
    
    return $conn;
}

function login($username, $password) {
    $conn = db_connect();
    $sql = "SELECT * FROM Usuarios WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die("Error en la consulta: " . mysqli_error($conn));
    }
    
    $user = mysqli_fetch_assoc($result);
    if ($user && password_verify($password, $user['password'])) {
        return [
            'id' => $user['id'],
            'role' => $user['role'],
        ];
    } else {
        return null;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/sucursales/backend/server.php/api/auth/login') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];
    
    $user = login($username, $password);
    if ($user) {
        http_response_code(200);
        echo json_encode([
            'id' => $user['id'],
            'role' => $user['role'],
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Credenciales inválidas"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/sucursales/backend/server.php/api/articulos') {
    $articulos = consultaSQL('codigo, descripcion, precio', 'articulos', '');
    echo json_encode($articulos);
}


function consultaSQL($campos, $tabla, $condicion) {
    $conn = db_connect();
    if ($condicion == "") {
        $sql = "SELECT $campos FROM $tabla";
    } else {
        $sql = "SELECT $campos FROM $tabla WHERE $condicion";
    }

    $stmt = mysqli_query($conn, $sql);
    if ($stmt === false) {
        die(print_r(mysqli_error($conn), true));
    }

    $datos = [];
    while ($fila = mysqli_fetch_array($stmt, MYSQLI_ASSOC)) {
        $datos[] = $fila;
    }

    mysqli_close($conn);
    return $datos;
}



if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/sucursales/backend/server.php/api/sucursales') {
    $sucursales = consultaSQL('id_sucursal, nombre_suc, dir_suc, cant_emp_suc', 'sucursales', '');
    echo json_encode($sucursales);
} else {
    $clientes = consultaSQL('id_cliente, apellido, nombre, saldo, estado', 'clientes', '');
    echo json_encode($clientes);
}


if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/sucursales/backend/server.php/api/ventas-mensuales') {
    $conn = db_connect();
    $sql = "SELECT m.mes, s.nombre_suc, v.monto 
            FROM ventas v 
            JOIN sucursales s ON v.id_sucursal = s.id_sucursal 
            JOIN meses m ON v.mes_id = m.nro 
            ORDER BY m.nro, s.nombre_suc";
    $resultado = mysqli_query($conn, $sql);

    $ventas = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $ventas[] = $fila;
    }

    echo json_encode($ventas);
    mysqli_close($conn);
}

?>
