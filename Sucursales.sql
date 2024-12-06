-- Base de Datos Sucursales (actualizada)
CREATE DATABASE `Sucursales`;
USE `Sucursales`;

-- Tabla Articulos
CREATE TABLE `articulos` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) DEFAULT NULL,
  `precio` DECIMAL(10, 2) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `articulos` (`codigo`, `descripcion`, `precio`) VALUES
(1, 'papas fritas', 2300.00),
(2, 'Naranjas', 450.00),
(3, 'Manzanas', 100.00),
(4, 'Palitos', 1500.00),
(19, 'Mandarinas', 1010.00);

-- Tabla Clientes
CREATE TABLE `clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `apellido` VARCHAR(50) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `saldo` DECIMAL(10, 2) NOT NULL,
  `estado` TINYINT(1) NOT NULL COMMENT '0 = Inactivo, 1 = Activo',
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `clientes` (`apellido`, `nombre`, `saldo`, `estado`) VALUES
('Aguirre', 'Nicolas Elias', 87000.00, 0),
('Bianchi', 'Germán', 92000.00, 1),
('Costa', 'María Laura', 45000.00, 1),
('Donzelli', 'Nicolas Emanuel', 92000.00, 0),
('Giavedoni', 'Augusto', 82000.00, 0),
('Girod', 'Ignacio', 82000.00, 0),
('Imhoff', 'Marianela', 80000.00, 0),
('Kouefati', 'Jacques', 80000.00, 1),
('Pallavidini', 'Nahuel', 80000.00, 1);

-- Tabla Meses (Referencia)
CREATE TABLE `meses` (
  `nro` TINYINT(2) NOT NULL,
  `mes` VARCHAR(50) NOT NULL,
  `cdias` TINYINT(2) NOT NULL,
  PRIMARY KEY (`nro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `meses` (`nro`, `mes`, `cdias`) VALUES
(1, 'Enero', 31),
(2, 'Febrero', 28),
(3, 'Marzo', 31),
(4, 'Abril', 30),
(5, 'Mayo', 31),
(6, 'Junio', 30),
(7, 'Julio', 31),
(8, 'Agosto', 31),
(9, 'Septiembre', 30),
(10, 'Octubre', 31),
(11, 'Noviembre', 30),
(12, 'Diciembre', 31);

-- Tabla Sucursales
CREATE TABLE `sucursales` (
  `id_sucursal` INT NOT NULL AUTO_INCREMENT,
  `nombre_suc` VARCHAR(50) NOT NULL,
  `dir_suc` VARCHAR(50) NOT NULL,
  `cant_emp_suc` INT(11) NOT NULL,
  PRIMARY KEY (`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `sucursales` (`id_sucursal`, `nombre_suc`, `dir_suc`, `cant_emp_suc`) VALUES
(1, 'Santa Fe', 'San Martin 1111', 11),
(2, 'Rosario', 'Belgrano 2222', 22),
(3, 'Santo Tome', '9 de Julio 3333', 16),
(4, 'Rafaela', 'Roca 4444', 4),
(5, 'Parana', 'Tunel 555', 15);

-- Tabla Ventas
CREATE TABLE `ventas` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `id_sucursal` INT NOT NULL,
  `monto` DECIMAL(10, 2) NOT NULL,
  `mes_id` TINYINT(2) NOT NULL,
  PRIMARY KEY (`id_venta`),
  FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales`(`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ventas` (`id_sucursal`, `monto`, `mes_id`) VALUES
(1, 8386.00, 1), (2, 8679.00, 1), (3, 6853.00, 1), (4, 5111.00, 1), (5, 8019.00, 1),
(1, 7024.00, 2), (2, 9289.00, 2), (3, 7299.00, 2), (4, 5612.00, 2), (5, 7721.00, 2),
(1, 5329.00, 3), (2, 7019.00, 3), (3, 5203.00, 3), (4, 9400.00, 3), (5, 9291.00, 3),
(1, 9718.00, 4), (2, 9151.00, 4), (3, 6667.00, 4), (4, 9836.00, 4), (5, 8054.00, 4),
(1, 5154.00, 5), (2, 9487.00, 5), (3, 6084.00, 5), (4, 8365.00, 5), (5, 9942.00, 5),
(1, 8528.00, 6), (2, 5101.00, 6), (3, 8775.00, 6), (4, 9921.00, 6), (5, 7077.00, 6),
(1, 6603.00, 7), (2, 5962.00, 7), (3, 9845.00, 7), (4, 6703.00, 7), (5, 5561.00, 7),
(1, 5881.00, 8), (2, 7857.00, 8), (3, 6640.00, 8), (4, 9669.00, 8), (5, 6169.00, 8),
(1, 7952.00, 9), (2, 8372.00, 9), (3, 5312.00, 9), (4, 6248.00, 9), (5, 6714.00, 9),
(1, 7249.00, 10), (2, 5031.00, 10), (3, 9476.00, 10), (4, 9434.00, 10), (5, 6759.00, 10),
(1, 5393.00, 11), (2, 7977.00, 11), (3, 6925.00, 11), (4, 7619.00, 11), (5, 8966.00, 11),
(1, 8366.00, 12), (2, 5008.00, 12), (3, 5193.00, 12), (4, 8093.00, 12), (5, 7039.00, 12);

-- Crear la tabla Usuarios
CREATE TABLE `Usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'vista') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Primero crear la base más todo lo anterior
-- Luego ejecutar esto
ALTER TABLE ventas ADD CONSTRAINT fk_mes
FOREIGN KEY (mes_id) REFERENCES meses(nro);




