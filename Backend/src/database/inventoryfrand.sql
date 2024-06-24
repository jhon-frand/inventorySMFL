-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-06-2024 a las 03:40:27
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apinodejs_example`
--
CREATE DATABASE IF NOT EXISTS `apinodejs_example` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `apinodejs_example`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `languages`
--

CREATE TABLE `languages` (
  `id` tinyint UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `programmers` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `languages`
--

INSERT INTO `languages` (`id`, `name`, `programmers`) VALUES
(11, 'qqqqq', 32),
(12, 'appppq', 32);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `languages`
--
ALTER TABLE `languages`
  MODIFY `id` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Base de datos: `appmascotas`
--
CREATE DATABASE IF NOT EXISTS `appmascotas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `appmascotas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'rabioso'),
(3, 'amigable');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gender`
--

CREATE TABLE `gender` (
  `id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gender`
--

INSERT INTO `gender` (`id`, `name`) VALUES
(2, 'macho'),
(3, 'hembra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `id` int NOT NULL,
  `race_id` int NOT NULL,
  `category_id` int NOT NULL,
  `photo` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender_id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`id`, `race_id`, `category_id`, `photo`, `gender_id`, `name`) VALUES
(23, 1, 3, 'p3.jpeg', 2, 'Chuchin'),
(24, 1, 2, 'p4.jpeg', 3, 'El David'),
(26, 3, 3, 'p6.jpeg', 3, 'Jose'),
(37, 3, 2, 'p7.jpeg', 2, 'asdd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `race`
--

CREATE TABLE `race` (
  `id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `race`
--

INSERT INTO `race` (`id`, `name`) VALUES
(1, 'rootweiller'),
(3, 'bulldog');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(3, 'Frand', 'frand@gmail.com', 'frand'),
(5, 'user', 'user@gmail.com', '$2b$10$ZioeCBeRC7bjDqNGPlQfkOeBuihF8FOkU4hNcrKkOFsfOkNhMnoJS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('425126a6-6399-4b76-9378-1969f980949c', '51c393b1c7b4ae8e90e82dcc07db41f2f02fd8690b1a05efd4d8eb6133e4c9e5', '2024-05-26 23:27:05.689', '20240526232705_name_pet', NULL, NULL, '2024-05-26 23:27:05.446', 1),
('70d831a9-971e-40a0-9f95-00eb259adca0', 'cac9687c2ce73e35a6f9c6ed1f36aed478026bd00b27531e17750c58a9bb3261', '2024-05-26 20:06:59.268', '20240526200659_tables', NULL, NULL, '2024-05-26 20:06:59.146', 1),
('8916a65a-aabe-4a76-8d01-6ba3fb76b0c0', 'cb4abe4067c3a702ed0a2f9a33943d8879b110dec4a973fab9cc30950d62a194', '2024-05-26 20:12:31.645', '20240526201231_relations', NULL, NULL, '2024-05-26 20:12:31.411', 1),
('ee17e91f-62ef-48c4-ae67-4ce8369ccf87', '181c0a9e5be788ff3933a86d387439043325d5404e8058bf914a1fd73460fb66', '2024-05-26 19:57:34.704', '20240526195734_init', NULL, NULL, '2024-05-26 19:57:34.607', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Mascota_race_id_fkey` (`race_id`),
  ADD KEY `Mascota_category_id_fkey` (`category_id`),
  ADD KEY `Mascota_gender_id_fkey` (`gender_id`);

--
-- Indices de la tabla `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `race`
--
ALTER TABLE `race`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `Mascota_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Mascota_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Mascota_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
--
-- Base de datos: `consultasmysql`
--
CREATE DATABASE IF NOT EXISTS `consultasmysql` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `consultasmysql`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `n1` float NOT NULL,
  `n2` float NOT NULL,
  `n3` float NOT NULL,
  `materia` int NOT NULL,
  `maestro` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombres`, `n1`, `n2`, `n3`, `materia`, `maestro`) VALUES
(2, 'Frand', 3.5, 3.2, 3.2, 1, 1),
(3, 'Motato', 2.5, 4.2, 3.2, 1, 1),
(4, 'Motato', 2.5, 4.2, 3.2, 2, 1),
(5, 'Luis', 2.5, 4.2, 3.2, 2, 2),
(6, 'Yber', 3.8, 2.2, 4.2, 2, 2),
(7, 'Juan', 3.8, 4.2, 4.2, 2, 2),
(8, 'Jose', 3.8, 4.2, 4.2, 2, 2),
(9, 'Putin', 2.8, 2.2, 2.2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestros`
--

CREATE TABLE `maestros` (
  `id` int NOT NULL,
  `nombres` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `maestros`
--

INSERT INTO `maestros` (`id`, `nombres`) VALUES
(1, 'will'),
(2, 'Diego');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id` int NOT NULL,
  `nombres` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `nombres`) VALUES
(1, 'php'),
(2, 'java');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estar` (`materia`),
  ADD KEY `maestro` (`maestro`);

--
-- Indices de la tabla `maestros`
--
ALTER TABLE `maestros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `maestros`
--
ALTER TABLE `maestros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estar` FOREIGN KEY (`materia`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `tener` FOREIGN KEY (`maestro`) REFERENCES `maestros` (`id`);
--
-- Base de datos: `db_inout`
--
CREATE DATABASE IF NOT EXISTS `db_inout` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_inout`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodega`
--

CREATE TABLE `bodega` (
  `codigo_Bodega` int NOT NULL,
  `ubicacion` varchar(50) NOT NULL,
  `Nombre_bodega` varchar(50) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bodega`
--

INSERT INTO `bodega` (`codigo_Bodega`, `ubicacion`, `Nombre_bodega`, `Estado`) VALUES
(1, 'Calle 1, Ciudad X', 'Bodega Principal', 'Activo'),
(2, 'Avenida 2, Ciudad Y', 'Almacén Secundario', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_elemento`
--

CREATE TABLE `categoria_elemento` (
  `codigo_Categoria` int NOT NULL,
  `Nombre_Categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria_elemento`
--

INSERT INTO `categoria_elemento` (`codigo_Categoria`, `Nombre_Categoria`) VALUES
(1, 'Informática'),
(2, 'Mobiliario'),
(3, 'Electrónica'),
(4, 'Accesorios'),
(5, 'Material de Oficina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_movimiento`
--

CREATE TABLE `detalle_movimiento` (
  `codigo_detalle` int NOT NULL,
  `fk_movimiento` int DEFAULT NULL,
  `fk_elemento` int DEFAULT NULL,
  `estado` enum('Confirmada','En espera','Cancelada','En Prestamo','Finalizada') DEFAULT 'En espera',
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `Usuario_recibe` int DEFAULT NULL,
  `Usuario_entrega` int DEFAULT NULL,
  `Observaciones` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_movimiento`
--

INSERT INTO `detalle_movimiento` (`codigo_detalle`, `fk_movimiento`, `fk_elemento`, `estado`, `fecha_vencimiento`, `cantidad`, `Usuario_recibe`, `Usuario_entrega`, `Observaciones`) VALUES
(1, 1, 1, NULL, '2024-03-15', 10, 2, 1, 'Entrega'),
(2, 2, 2, NULL, '2024-03-16', 5, 3, 2, ''),
(3, 3, 3, 'Cancelada', NULL, 0, NULL, NULL, 'Cancelado por falta de stock'),
(4, 4, 1, NULL, '2024-03-17', 3, 4, 5, 'Mas elementos'),
(5, 5, 2, NULL, '2024-03-18', 8, 5, 1, 'Se despacharon correctamente los elementos'),
(6, 7, 1, NULL, '2024-03-15', 5, 1, 2, 'Ninguna'),
(7, 7, 2, NULL, '2024-03-15', 5, 1, 2, 'Ninguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ubicacion`
--

CREATE TABLE `detalle_ubicacion` (
  `codigo_Detalle` int NOT NULL,
  `Nombre_ubicacion` varchar(50) NOT NULL,
  `fk_bodega` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_ubicacion`
--

INSERT INTO `detalle_ubicacion` (`codigo_Detalle`, `Nombre_ubicacion`, `fk_bodega`) VALUES
(1, 'Estantería A', 1),
(2, 'Almacén B', 2),
(3, 'Oficina Principal', 1),
(4, 'Almacén C', 2),
(5, 'Estantería B', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elemento`
--

CREATE TABLE `elemento` (
  `Codigo_elemento` int NOT NULL,
  `Nombre_elemento` varchar(50) NOT NULL,
  `stock` int DEFAULT NULL,
  `fk_tipoElemento` int DEFAULT NULL,
  `fk_unidadMedida` int DEFAULT NULL,
  `fk_categoria` int DEFAULT NULL,
  `fk_tipoEmpaque` int DEFAULT NULL,
  `fk_detalleUbicacion` int DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `elemento`
--

INSERT INTO `elemento` (`Codigo_elemento`, `Nombre_elemento`, `stock`, `fk_tipoElemento`, `fk_unidadMedida`, `fk_categoria`, `fk_tipoEmpaque`, `fk_detalleUbicacion`, `Estado`) VALUES
(1, 'Computadora', 20, 1, 1, 1, 1, 1, 'Activo'),
(2, 'Impresora', 15, 2, 2, 2, 2, 2, 'Activo'),
(3, 'Teléfono', 30, 1, 1, 1, 1, 3, 'Inactivo'),
(4, 'Escritorio', 10, 2, 2, 2, 2, 4, 'Inactivo'),
(5, 'Silla', 25, 1, 1, 1, 1, 5, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `Codigo_movimiento` int NOT NULL,
  `fecha_movimiento` date DEFAULT NULL,
  `Usuario_solicitud` int DEFAULT NULL,
  `fk_movimiento` int DEFAULT NULL,
  `Estado` enum('Confirmada','En espera','Cancelada','En Prestamo','Finalizada') DEFAULT 'En espera'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`Codigo_movimiento`, `fecha_movimiento`, `Usuario_solicitud`, `fk_movimiento`, `Estado`) VALUES
(1, '2024-03-10', 1, 1, NULL),
(2, '2024-03-11', 2, 2, NULL),
(3, '2024-03-12', 3, 3, 'Cancelada'),
(4, '2024-03-13', 4, 1, NULL),
(5, '2024-03-14', 5, 2, NULL),
(7, NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_elemento`
--

CREATE TABLE `tipo_elemento` (
  `codigo_Tipo` int NOT NULL,
  `nombre_tipoElemento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_elemento`
--

INSERT INTO `tipo_elemento` (`codigo_Tipo`, `nombre_tipoElemento`) VALUES
(1, 'Devolutivo'),
(2, 'Consumible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_empaque`
--

CREATE TABLE `tipo_empaque` (
  `codigo_Empaque` int NOT NULL,
  `Nombre_Empaque` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_empaque`
--

INSERT INTO `tipo_empaque` (`codigo_Empaque`, `Nombre_Empaque`) VALUES
(1, 'Caja'),
(2, 'Bolsa'),
(3, 'Paquete'),
(4, 'Contenedor'),
(5, 'Sobre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_movimiento`
--

CREATE TABLE `tipo_movimiento` (
  `codigo_tipo` int NOT NULL,
  `Nombre_movimiento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_movimiento`
--

INSERT INTO `tipo_movimiento` (`codigo_tipo`, `Nombre_movimiento`) VALUES
(1, 'Ingreso'),
(2, 'Egreso'),
(3, 'Prestamo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `codigo_medida` int NOT NULL,
  `Nombre_Medida` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`codigo_medida`, `Nombre_Medida`) VALUES
(1, 'Gramo'),
(2, 'Kilogramo'),
(3, 'Metro Cubico'),
(4, 'Centimetro Cubico'),
(5, 'Litro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `apellido_usuario` varchar(50) DEFAULT NULL,
  `email_usuario` varchar(100) DEFAULT NULL,
  `rol` enum('administrador','Encargado','Usuario') DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `contraseña_usuario` varchar(255) DEFAULT NULL,
  `Id_ficha` int DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email_usuario`, `rol`, `numero`, `contraseña_usuario`, `Id_ficha`, `Estado`) VALUES
(1, 'Juan', 'Perez', 'juan@example.com', 'administrador', '123456789', 'hashed_password_1', 1, 'Activo'),
(2, 'Maria', 'Gomez', 'maria@example.com', 'Encargado', '987654321', 'hashed_password_2', 2, 'Activo'),
(3, 'Pedro', 'Rodriguez', 'pedro@example.com', 'Usuario', '456789123', 'hashed_password_3', 3, 'Inactivo'),
(4, 'Ana', 'Lopez', 'ana@example.com', 'Usuario', '789123456', 'hashed_password_4', 4, 'Activo'),
(5, 'Laura', 'Martinez', 'laura@example.com', 'Usuario', '321654987', 'hashed_password_5', 5, 'Activo');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_stock`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_stock` (
`Codigo_elemento` int
,`Nombre_elemento` varchar(50)
,`stock` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_stock`
--
DROP TABLE IF EXISTS `vista_stock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_stock`  AS SELECT `e`.`Codigo_elemento` AS `Codigo_elemento`, `e`.`Nombre_elemento` AS `Nombre_elemento`, coalesce(sum((case when (`m`.`fk_movimiento` = 1) then `dm`.`cantidad` when (`m`.`fk_movimiento` = 2) then -(`dm`.`cantidad`) when ((`m`.`fk_movimiento` = 3) and (`dm`.`estado` = 'En Prestamo')) then -(`dm`.`cantidad`) else 0 end)),0) AS `stock` FROM ((`elemento` `e` left join `detalle_movimiento` `dm` on((`e`.`Codigo_elemento` = `dm`.`fk_elemento`))) left join `movimiento` `m` on((`dm`.`fk_movimiento` = `m`.`Codigo_movimiento`))) GROUP BY `e`.`Codigo_elemento`, `e`.`Nombre_elemento` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD PRIMARY KEY (`codigo_Bodega`);

--
-- Indices de la tabla `categoria_elemento`
--
ALTER TABLE `categoria_elemento`
  ADD PRIMARY KEY (`codigo_Categoria`);

--
-- Indices de la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  ADD PRIMARY KEY (`codigo_detalle`),
  ADD KEY `fk_elemento_detalle` (`fk_elemento`),
  ADD KEY `fk_usuario_entrega_detalle` (`Usuario_entrega`);

--
-- Indices de la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  ADD PRIMARY KEY (`codigo_Detalle`),
  ADD KEY `fk_bodega_detalleUbicacion` (`fk_bodega`);

--
-- Indices de la tabla `elemento`
--
ALTER TABLE `elemento`
  ADD PRIMARY KEY (`Codigo_elemento`),
  ADD KEY `fk_tipoElemento_elemento` (`fk_tipoElemento`),
  ADD KEY `fk_unidadMedida_elemento` (`fk_unidadMedida`),
  ADD KEY `fk_categoria_elemento` (`fk_categoria`),
  ADD KEY `fk_tipoEmpaque_elemento` (`fk_tipoEmpaque`),
  ADD KEY `fk_detalleUbicacion_elemento` (`fk_detalleUbicacion`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`Codigo_movimiento`),
  ADD KEY `fk_usuario_movimiento` (`Usuario_solicitud`),
  ADD KEY `fk_tipo_movimiento` (`fk_movimiento`);

--
-- Indices de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  ADD PRIMARY KEY (`codigo_Tipo`);

--
-- Indices de la tabla `tipo_empaque`
--
ALTER TABLE `tipo_empaque`
  ADD PRIMARY KEY (`codigo_Empaque`);

--
-- Indices de la tabla `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  ADD PRIMARY KEY (`codigo_tipo`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`codigo_medida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodega`
--
ALTER TABLE `bodega`
  MODIFY `codigo_Bodega` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria_elemento`
--
ALTER TABLE `categoria_elemento`
  MODIFY `codigo_Categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  MODIFY `codigo_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  MODIFY `codigo_Detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `elemento`
--
ALTER TABLE `elemento`
  MODIFY `Codigo_elemento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `Codigo_movimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  MODIFY `codigo_Tipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_empaque`
--
ALTER TABLE `tipo_empaque`
  MODIFY `codigo_Empaque` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_movimiento`
--
ALTER TABLE `tipo_movimiento`
  MODIFY `codigo_tipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `codigo_medida` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_movimiento`
--
ALTER TABLE `detalle_movimiento`
  ADD CONSTRAINT `fk_elemento_detalle` FOREIGN KEY (`fk_elemento`) REFERENCES `elemento` (`Codigo_elemento`),
  ADD CONSTRAINT `fk_usuario_entrega_detalle` FOREIGN KEY (`Usuario_entrega`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_ubicacion`
--
ALTER TABLE `detalle_ubicacion`
  ADD CONSTRAINT `fk_bodega_detalleUbicacion` FOREIGN KEY (`fk_bodega`) REFERENCES `bodega` (`codigo_Bodega`);

--
-- Filtros para la tabla `elemento`
--
ALTER TABLE `elemento`
  ADD CONSTRAINT `fk_categoria_elemento` FOREIGN KEY (`fk_categoria`) REFERENCES `categoria_elemento` (`codigo_Categoria`),
  ADD CONSTRAINT `fk_detalleUbicacion_elemento` FOREIGN KEY (`fk_detalleUbicacion`) REFERENCES `detalle_ubicacion` (`codigo_Detalle`),
  ADD CONSTRAINT `fk_tipoElemento_elemento` FOREIGN KEY (`fk_tipoElemento`) REFERENCES `tipo_elemento` (`codigo_Tipo`),
  ADD CONSTRAINT `fk_tipoEmpaque_elemento` FOREIGN KEY (`fk_tipoEmpaque`) REFERENCES `tipo_empaque` (`codigo_Empaque`),
  ADD CONSTRAINT `fk_unidadMedida_elemento` FOREIGN KEY (`fk_unidadMedida`) REFERENCES `unidad_medida` (`codigo_medida`);

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `fk_tipo_movimiento` FOREIGN KEY (`fk_movimiento`) REFERENCES `tipo_movimiento` (`codigo_tipo`),
  ADD CONSTRAINT `fk_usuario_movimiento` FOREIGN KEY (`Usuario_solicitud`) REFERENCES `usuario` (`id_usuario`);
--
-- Base de datos: `inventory`
--
CREATE DATABASE IF NOT EXISTS `inventory` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `inventory`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL,
  `fecha_realizacion_actividad` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fk_mantenimiento` int NOT NULL,
  `fk_tecnico` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`) VALUES
(22, 'Maquinaria'),
(30, 'laboratorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int NOT NULL,
  `serial` int NOT NULL,
  `nombre_equipo` varchar(50) NOT NULL,
  `marca_equipo` varchar(50) NOT NULL,
  `modelo_equipo` varchar(50) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_equipo` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo','mantenimiento','excluido') NOT NULL,
  `fk_categoria` int NOT NULL,
  `fk_ubicacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `serial`, `nombre_equipo`, `marca_equipo`, `modelo_equipo`, `fecha_ingreso`, `descripcion`, `tipo_equipo`, `estado`, `fk_categoria`, `fk_ubicacion`) VALUES
(19, 111, 'Molino', 'MJK', '20LT5', '2024-03-14', 'Molino carnes rojas', 'eléctrico', 'inactivo', 22, 8),
(20, 123, 'microscopio', 'a', 'a', '2024-03-13', 'a', 'a', 'activo', 30, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `id_mantenimiento` int NOT NULL,
  `tipo_mantenimiento` enum('preventivo','tecnico') NOT NULL,
  `fecha_realizacion_mantenimiento` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `resultado` varchar(250) NOT NULL,
  `fk_user_responsable` int NOT NULL,
  `fk_equipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mantenimientos`
--

INSERT INTO `mantenimientos` (`id_mantenimiento`, `tipo_mantenimiento`, `fecha_realizacion_mantenimiento`, `descripcion`, `resultado`, `fk_user_responsable`, `fk_equipo`) VALUES
(1, 'preventivo', '2023-01-22', 'detección de fallas', 'necesita mantenimiento técnico', 1, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `id_tecnico` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL,
  `rol` enum('administrador','encargado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `rol`) VALUES
(1, 'administrador'),
(2, 'encargado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id_ubicacion` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL,
  `ambiente` varchar(50) NOT NULL,
  `sitio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`id_ubicacion`, `fk_unidad_productiva`, `ambiente`, `sitio`) VALUES
(8, 2, 'H-13', 'mesa 2'),
(11, 3, 'A-1', 'Piso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_productivas`
--

CREATE TABLE `unidades_productivas` (
  `id_unidad` int NOT NULL,
  `nombre_unidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `unidades_productivas`
--

INSERT INTO `unidades_productivas` (`id_unidad`, `nombre_unidad`) VALUES
(2, 'Gastronomía'),
(3, 'Agroindustria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fk_tipo_usuario` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `email`, `telefono`, `password`, `fk_tipo_usuario`, `fk_unidad_productiva`) VALUES
(1, 1004268668, 'Frand', 'Lebaza', 'frand@gmail.com', '32132134', 'frand', 1, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `efectuar` (`fk_mantenimiento`),
  ADD KEY `ejecutar` (`fk_tecnico`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `formar` (`fk_categoria`),
  ADD KEY `estar` (`fk_ubicacion`);

--
-- Indices de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `asignar` (`fk_user_responsable`),
  ADD KEY `realizar` (`fk_equipo`);

--
-- Indices de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`id_tecnico`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `contener` (`fk_unidad_productiva`);

--
-- Indices de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  ADD PRIMARY KEY (`id_unidad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `ser` (`fk_tipo_usuario`),
  ADD KEY `pertenecer` (`fk_unidad_productiva`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `efectuar` FOREIGN KEY (`fk_mantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`),
  ADD CONSTRAINT `ejecutar` FOREIGN KEY (`fk_tecnico`) REFERENCES `tecnicos` (`id_tecnico`);

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `estar` FOREIGN KEY (`fk_ubicacion`) REFERENCES `ubicaciones` (`id_ubicacion`),
  ADD CONSTRAINT `formar` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD CONSTRAINT `asignar` FOREIGN KEY (`fk_user_responsable`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `realizar` FOREIGN KEY (`fk_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD CONSTRAINT `contener` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`),
  ADD CONSTRAINT `ser` FOREIGN KEY (`fk_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);
--
-- Base de datos: `inventoryfrand`
--
CREATE DATABASE IF NOT EXISTS `inventoryfrand` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `inventoryfrand`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL,
  `fecha_actividad` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fk_mantenimiento` int NOT NULL,
  `fk_tecnico` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `fecha_actividad`, `descripcion`, `fk_mantenimiento`, `fk_tecnico`) VALUES
(1, '2024-03-30', 'Se cambió el motor', 3, 1),
(2, '2024-03-31', 'Se cambiaron poleass', 14, 4),
(4, '2024-03-27', 'prueba actividad tecnico descricpcion', 18, 7),
(5, '2024-03-02', 'se cambio en la pagina actividades el formulario', 18, 4),
(6, '2024-04-11', 'el equipo preseenta fallas en la parte superior ede la ', 18, 4),
(7, '2024-04-19', 'el equipo preseenta fallas en la parte superior ede la ', 18, 4),
(8, '2024-04-05', 'fallas einternas en la cpuu del motoe', 3, 7),
(9, '2024-04-04', 'fallas del motor en la fncinonalidad', 14, 1),
(10, '2024-05-10', 'sdds prueba de page ', 18, 10),
(11, '2024-04-26', 'se le cambió el teclado y la pantalla', 19, 11),
(12, '2024-05-04', 'cambio de dispensador de a', 19, 11),
(13, '2024-04-03', 'cambio de rutas y demás cosas para el jwt', 19, 12),
(14, '2024-04-26', 'cambio de playlist por bronco broonco', 23, 10),
(15, '2024-06-20', 'prueba actividad en manteinmenteee', 28, 8),
(16, '2024-06-23', 'prueba actividad register', 36, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`) VALUES
(38, 'Laboratorio'),
(39, 'Maquinaria'),
(44, 'PruebaCategory'),
(45, 'ghllcc'),
(46, 'dadada'),
(47, 'aaaag'),
(48, 'prueba alerta'),
(49, 'MAnuales'),
(50, 'categoria mara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int NOT NULL,
  `serial` varchar(20) NOT NULL,
  `nombre_equipo` varchar(50) NOT NULL,
  `marca_equipo` varchar(50) NOT NULL,
  `modelo_equipo` varchar(50) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_equipo` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo','mantenimiento','excluido') NOT NULL,
  `fk_categoria` int NOT NULL,
  `fk_ubicacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `serial`, `nombre_equipo`, `marca_equipo`, `modelo_equipo`, `fecha_ingreso`, `descripcion`, `tipo_equipo`, `estado`, `fk_categoria`, `fk_ubicacion`) VALUES
(25, '111', 'Molino', 'MWQ', 'A2023L', '2024-02-13', 'molino triturador', 'eléctrico', 'activo', 38, 14),
(30, '23233', 'bb', 'bb', 'v', '2024-03-08', '2222', '222', 'inactivo', 39, 14),
(36, '12gh3g', 'pruebaequipo', 'pruebamarca', 'pruebamodelo', '2024-03-15', 'minimo 20 caracteres paradescripcion', 'manual', 'activo', 44, 46),
(37, 'asss', 'monitor', 'sdsdhg', 'asff', '2024-04-08', 'prueba alertas después del register', 'dfdffs', 'activo', 48, 49),
(38, '9834ff', 'PORATTIL', 'ASUS', 'AXM3', '2024-04-11', 'portatil para el manejo del software', 'Manual', 'activo', 49, 51),
(39, '123ndhd', 'equipment jwt', 'asd', 'dsfg', '2024-04-04', 'prueba de registro con token', 'sadfds', 'activo', 50, 51),
(40, '34f4f3', 'adminis', 'adminsi', 'adnin', '2024-04-19', 'administrador equipo en tics', 'electrico', 'inactivo', 39, 28),
(41, 'jh45b', 'equipo miguelon', 'marca miguel', 'model miguel', '2024-04-20', 'prueba de registro con tokenn y rol', 'electrico', 'activo', 39, 58),
(42, 'sdssd3', 'bunbury', 'bunbury ma', 'model bunbury', '2024-04-19', 'prueba de get equipos por unidad', 'mnual', 'excluido', 46, 58),
(43, '223344', 'Taladro', 'CEMEX', '2024', '2024-06-18', 'equipo registrado en unidad productiva', 'eléctrico', 'activo', 39, 60),
(44, '1234535', 'aaaaa', 'aaaa', 'aaaa', '2024-06-20', 'asdasder ff al menos 20 caracerer', 'eléctrico', 'mantenimiento', 39, 49),
(45, 'bbb44', 'bbbbc', 'bbc', 'bbb', '2024-06-27', 'prueba estado por default', 'manual', 'activo', 39, 53),
(46, '1233aaa', 'aaaas', 'aaa', 'aaa', '2024-06-20', 'aaaaaaa cdsprueba registro ', 'waass', 'activo', 47, 51);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `id_mantenimiento` int NOT NULL,
  `tipo_mantenimiento` enum('preventivo','tecnico') NOT NULL,
  `fecha_mantenimiento` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fk_user_responsable` int NOT NULL,
  `fk_equipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mantenimientos`
--

INSERT INTO `mantenimientos` (`id_mantenimiento`, `tipo_mantenimiento`, `fecha_mantenimiento`, `descripcion`, `fk_user_responsable`, `fk_equipo`) VALUES
(3, 'tecnico', '2024-02-25', 'fallo en el funcionamiento interno', 9, 25),
(14, 'preventivo', '2024-03-09', 'sddsfdsfdsfdsfdsfdsfsssssssss', 4, 30),
(18, 'tecnico', '2024-03-14', 's mantenimientoasasassd', 14, 36),
(19, 'preventivo', '2024-04-06', 'Fallos en el teclado ay en el mosue', 16, 38),
(20, 'preventivo', '2024-04-05', 'prueba de mantenimiento co njwt', 16, 39),
(21, 'tecnico', '2024-04-26', 'user encargado register manteinment', 16, 39),
(22, 'preventivo', '2024-04-18', 'mary luna de mi amor como una ensoñación', 16, 38),
(23, 'preventivo', '2024-04-26', 'prueba de listas de mantenimientosss', 14, 42),
(24, 'preventivo', '2024-04-12', 'description proyecto uno equipo', 4, 42),
(25, 'preventivo', '2024-06-12', 'fallo en la funcionalidad del eje central', 9, 25),
(26, 'tecnico', '2024-06-15', 'fallas solucionadas en el ejec central ', 9, 25),
(27, 'preventivo', '2024-06-13', 'fallo en el caon central del eje', 3, 25),
(28, 'preventivo', '2024-06-17', 'prueba descripción', 4, 42),
(29, 'preventivo', '2024-06-18', 'grafica mantenimiento cafe', 15, 37),
(30, 'preventivo', '2024-06-21', 'mantenimiento de bioconstruccion', 21, 43),
(31, 'preventivo', '2024-06-20', 'prueba manteinment', 4, 43),
(32, 'tecnico', '2024-06-21', 'prueba manteinment register', 4, 43),
(33, 'preventivo', '2024-06-21', 'prueba registro', 3, 42),
(34, 'tecnico', '2024-06-20', 'mantenimiento registro de', 14, 42),
(35, 'preventivo', '2024-06-21', 'una año sin tu amoor', 14, 42),
(36, 'preventivo', '2024-06-14', 'prueba admin register', 4, 43);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `id_tecnico` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tecnicos`
--

INSERT INTO `tecnicos` (`id_tecnico`, `identificacion`, `nombres`, `apellidos`, `correo`, `telefono`) VALUES
(1, 123456, 'Juanete', 'Cuellar', 'cuellar@gmail.com', '32134566'),
(4, 1004268668, 'Juan Frand', 'lebaza', 'frad@gmail.com', '3213570619'),
(7, 6754232, 'prdfdf', 'ksdsd', 'tecniupdate@gmail.com', '3212312222'),
(8, 233333, 'william', 'ramon', 'd@gmail.com', '3232332323'),
(10, 100426845, 'jhonfrand', 'lebaza', 'leb@gmail.com', '3213570619'),
(11, 756302, 'TECNISO', 'MATERIAl', 'tecnicho@gmail.com', '3456729084'),
(12, 1212121, 'tecnico jwt', 'ape jwt', 'jwttec@gmail.com', '3241231234'),
(13, 1234560, 'Johan', 'Perdomo', 'fgf@gmail.com', '1234567232'),
(14, 1230949800, 'proyecto', 'uno', 'unojjh@gmail.com', '3213456765');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL,
  `rol` enum('administrador','encargado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `rol`) VALUES
(1, 'administrador'),
(2, 'encargado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id_ubicacion` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL,
  `ambiente` varchar(50) NOT NULL,
  `sitio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`id_ubicacion`, `fk_unidad_productiva`, `ambiente`, `sitio`) VALUES
(14, 12, 'G-12', 'Mesón'),
(28, 15, 'motato', 'motato'),
(46, 34, 'pruebaproyect', 'prueba'),
(49, 42, 'dss', 'aaaa'),
(51, 43, 'FL-6', 'Olympo'),
(53, 43, 'g-12', 'mesa 12'),
(55, 43, 'sateee', 'sate'),
(58, 34, 'ambiente miguelon', 'sitio miguelon'),
(60, 47, 'A-3', 'mesa-2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_productivas`
--

CREATE TABLE `unidades_productivas` (
  `id_unidad` int NOT NULL,
  `nombre_unidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `unidades_productivas`
--

INSERT INTO `unidades_productivas` (`id_unidad`, `nombre_unidad`) VALUES
(12, 'Agroindustria'),
(15, 'TICS'),
(34, 'Gastronomia'),
(42, 'Cafe'),
(43, 'PAE'),
(47, 'Bioconstrucción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'activo',
  `fk_tipo_usuario` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `email`, `telefono`, `password`, `estado`, `fk_tipo_usuario`, `fk_unidad_productiva`) VALUES
(3, 1004233, 'Santiago', 'Motato', 'xiomaracamacho0526@gmail.com', '3223306193', 'frandfrand', 'activo', 1, 12),
(4, 100426866, 'Frand', 'Lebaza', 'frand@gmail.com', '3213570610', '12345678', 'activo', 1, 15),
(9, 1111, 'Juanete', 'cervantes', 'cervantes@gmail.com', '434343', 'juan', 'activo', 1, 15),
(13, 123443, 'ybers', 'yber', 'yber@gmail.com', '1234232323', 'yberer', 'inactivo', 2, 15),
(14, 10029448, 'Miguelon', 'Serrano', 'miguelon@gmail.com', '3213213214', 'miguel', 'activo', 2, 34),
(15, 222222, 'carlos', 'Gomez', 'a@gmail.com', '2234433443', 'sdfvdsv', 'activo', 2, 42),
(16, 1002355, 'Daniel', 'Maldini', 'daniel@gmail.com', '3214560923', 'daniele', 'activo', 2, 43),
(20, 707070, 'bbb', 'bbb', 'bbb@gmail.com', '8787877883', '707070', 'inactivo', 2, 15),
(21, 404040, 'joselo', 'lopez', 'joselopez@gmail.com', '2323232334', '404040', 'inactivo', 2, 47),
(22, 6060634, 'Maria', 'Magg', 'prueba0526@gmail.com', '3213213456', '6060634', 'activo', 1, 15),
(23, 12343367, 'Frand', 'Lebaza', 'jhonfrand72@gmail.com', '3213456754', '$2b$10$EqTo3s4pbDzOHbmdMCGS8ug5sClbdmggBJrMBeO5tRKNLsQwuzs8u', 'activo', 1, 34),
(24, 1002356889, 'Dario', 'Guaca', 'dario@gmail.com', '3103458976', '$2b$10$hgk3Q82jDoJkibfZZwVp5.DLXStznwPBYjWO7mJxDwjS707Fl6.9q', 'activo', 2, 43);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `efectuar` (`fk_mantenimiento`),
  ADD KEY `ejecutar` (`fk_tecnico`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `formar` (`fk_categoria`),
  ADD KEY `estar` (`fk_ubicacion`);

--
-- Indices de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `asignar` (`fk_user_responsable`),
  ADD KEY `realizar` (`fk_equipo`);

--
-- Indices de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`id_tecnico`),
  ADD UNIQUE KEY `identificacion` (`identificacion`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `contener` (`fk_unidad_productiva`);

--
-- Indices de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  ADD PRIMARY KEY (`id_unidad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password` (`password`),
  ADD KEY `ser` (`fk_tipo_usuario`),
  ADD KEY `pertenecer` (`fk_unidad_productiva`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `efectuar` FOREIGN KEY (`fk_mantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`),
  ADD CONSTRAINT `ejecutar` FOREIGN KEY (`fk_tecnico`) REFERENCES `tecnicos` (`id_tecnico`);

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `estar` FOREIGN KEY (`fk_ubicacion`) REFERENCES `ubicaciones` (`id_ubicacion`),
  ADD CONSTRAINT `formar` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD CONSTRAINT `asignar` FOREIGN KEY (`fk_user_responsable`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `realizar` FOREIGN KEY (`fk_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD CONSTRAINT `contener` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_unidad_productiva`) REFERENCES `unidades_productivas` (`id_unidad`),
  ADD CONSTRAINT `ser` FOREIGN KEY (`fk_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);
--
-- Base de datos: `proyecto_agrovida`
--
CREATE DATABASE IF NOT EXISTS `proyecto_agrovida` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `proyecto_agrovida`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL,
  `detalles_actividad` varchar(250) NOT NULL,
  `fecha_actividad` date NOT NULL,
  `fk_mantenimiento` int NOT NULL,
  `fk_tecnico` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL,
  `categoria` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `categoria`) VALUES
(1, 'maquinaria'),
(2, 'laboratorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int NOT NULL,
  `serial` int NOT NULL,
  `nombre_equipo` varchar(20) NOT NULL,
  `modelo_equipo` varchar(20) NOT NULL,
  `marca_equipo` varchar(20) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_equipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estado_equipo` enum('activo','inactivo','mantenimiento','excluido') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fk_ubicacion` int NOT NULL,
  `fk_categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `serial`, `nombre_equipo`, `modelo_equipo`, `marca_equipo`, `fecha_ingreso`, `descripcion`, `tipo_equipo`, `estado_equipo`, `fk_ubicacion`, `fk_categoria`) VALUES
(1, 12345, 'molino', '2024', 'MOLED', '2024-02-12', 'Molino triturador', 'eléctrico', 'activo', 1, 1),
(2, 123245, 'telescopio', '2024', 'COpid', '2023-03-14', 'telescopio lácteos', 'manual', 'activo', 2, 2),
(4, 122345, 'Triturador', '2024', 'COpid', '2023-03-14', 'catador lácteos', 'manual', 'activo', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `id_mantenimiento` int NOT NULL,
  `tipo_mantenimiento` enum('tecnico','preventivo') NOT NULL,
  `fecha_realizacion_mantenimiento` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `resultado` varchar(250) NOT NULL,
  `fk_user_responsable` int NOT NULL,
  `fk_equipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `id_tecnico` int NOT NULL,
  `nombres` varchar(20) NOT NULL,
  `apellidos` varchar(20) NOT NULL,
  `correo` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tecnicos`
--

INSERT INTO `tecnicos` (`id_tecnico`, `nombres`, `apellidos`, `correo`, `telefono`) VALUES
(1, 'frand', 'lebaza', 'frand@gmail.com', '3213424'),
(3, 'miller', 'muhamed', 'miller@gmail.com', '3213424'),
(4, 'aD', 'SAD', 'SAD@HJSAD.CPM', '24235'),
(5, 'gfbfdg', 'fdg', 'gfdfdg@hss.com', '3435');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL,
  `rol` enum('administrador','encargado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id_ubicacion` int NOT NULL,
  `unidad_productiva` varchar(50) NOT NULL,
  `ambiente` varchar(30) NOT NULL,
  `sitio` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`id_ubicacion`, `unidad_productiva`, `ambiente`, `sitio`) VALUES
(1, '', '', 'ambiente y1'),
(2, '', '', 'ambiente y2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `fk_tipo_usuario` int NOT NULL,
  `unidad_productiva` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `hacer` (`fk_mantenimiento`),
  ADD KEY `ejecutar` (`fk_tecnico`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `ubicar` (`fk_categoria`),
  ADD KEY `posicionarse` (`fk_ubicacion`);

--
-- Indices de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `registrar` (`fk_equipo`),
  ADD KEY `realizar` (`fk_user_responsable`);

--
-- Indices de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`id_tecnico`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `estar` (`fk_tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `ejecutar` FOREIGN KEY (`fk_tecnico`) REFERENCES `tecnicos` (`id_tecnico`),
  ADD CONSTRAINT `hacer` FOREIGN KEY (`fk_mantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`);

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `posicionarse` FOREIGN KEY (`fk_ubicacion`) REFERENCES `ubicacion` (`id_ubicacion`),
  ADD CONSTRAINT `ubicar` FOREIGN KEY (`fk_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  ADD CONSTRAINT `realizar` FOREIGN KEY (`fk_user_responsable`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `registrar` FOREIGN KEY (`fk_equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `estar` FOREIGN KEY (`fk_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`);
--
-- Base de datos: `videojuegos`
--
CREATE DATABASE IF NOT EXISTS `videojuegos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `videojuegos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE `alquiler` (
  `idalquiler` int NOT NULL,
  `fecha_alquiler` date NOT NULL,
  `fecha_devolucion` date NOT NULL,
  `cantidad` int NOT NULL,
  `usuario` int NOT NULL,
  `juego` int NOT NULL,
  `estado` enum('reserva','prestamo','devolucion') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idjuego` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `precio` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idjuego`, `nombre`, `descripcion`, `imagen`, `precio`) VALUES
(33, 'Call of Duty', 'Acción', 'ssss', 500),
(50, 'FIFA', 'Deporte', 'eee', 200),
(80, 'GTA', 'Acción', 'eee', 400),
(100, 'Cyberpunk', 'Acción', 'ssss', 700);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `rol` enum('administrador','usuario') NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombres`, `direccion`, `telefono`, `correo`, `rol`, `password`) VALUES
(1, 'prueba', 'Saladoblanco', '222', 'frand@gmail.com', 'administrador', 'frand'),
(2, 'prueba2', 'Saladoblanco', '222', 'frand@gmail.com', 'administrador', 'frand'),
(3, 'prueba 4', 'Saladoblanco', '222', 'frand@gmail.com', 'administrador', 'frand'),
(8, 'frand', 'Saladoblanco', '222', 'frand@gmail.com', 'administrador', 'frand'),
(9, 'motato', 'pitalito', '232323', 'motato@gmail.com', 'usuario', 'motato'),
(100, 'xiomara', 'pitalito', '523', 'xiomi@gmail.com', 'usuario', '696'),
(666, 'Juan', 'Pitalito', '311283', 'juan@gmail.com', 'usuario', '12356');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`idalquiler`),
  ADD KEY `give` (`usuario`),
  ADD KEY `have` (`juego`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idjuego`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `give` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`idusuario`),
  ADD CONSTRAINT `have` FOREIGN KEY (`juego`) REFERENCES `juegos` (`idjuego`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
