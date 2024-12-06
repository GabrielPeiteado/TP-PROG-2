<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function db_connect() {
    $mysql_username = "root";
    $mysql_password = "";
    $server_name = "localhost";
    $basededatos = "Sucursales";
    $conn = mysqli_connect($server_name, $mysql_username, $mysql_password, $basededatos);
    if (!$conn) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    return $conn;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/sucursales/backend/server.php/api/ventas-mensuales') {
    $conn = db_connect();
    $sql = "SELECT m.mes, s.nombre_suc, v.monto
            FROM ventas v
            JOIN sucursales s ON v.id_sucursal = s.id_sucursal
            JOIN meses m ON v.mes_id = m.nro
            ORDER BY m.nro, s.nombre_suc";
    
    $resultado = mysqli_query($conn, $sql);
    $data = [];

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $data[] = $fila;
    }

    echo json_encode($data);
    mysqli_close($conn);
}
?>
