-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-07-2024 a las 02:39:15
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
-- Base de datos: `inventory`
--

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
(17, '2024-07-05', 'cambio del display de la pantalla', 41, 15),
(18, '2024-07-06', 'cambio de eje rotador de manila', 42, 15);

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
(51, 'Maquinaria'),
(52, 'Laboratorio'),
(53, 'computador');

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
(47, 'ASW321', 'portatil', 'ASUS', 'MOD2020', '2024-07-03', 'portátil asus mini', 'eléctrico', 'activo', 53, 61),
(48, '123as2', 'molino', 'Pm2', 'Mod212', '2024-07-03', 'molino triturador de hierbas', 'eléctrico', 'mantenimiento', 51, 65),
(49, '098WER', 'tostador', 'Caf23', 'MOD2021', '2024-07-03', 'tostadora de cafe ', 'eléctrico', 'inactivo', 51, 64),
(50, 'QWE321', 'Horno', 'HJ21', 'MOD212', '2024-07-05', 'horno para carnes rojas', 'eléctrico', 'mantenimiento', 51, 63),
(51, '1234535', 'Nevera', 'HACEB', 'HC21', '2024-07-04', 'nevera para productos lácteos', 'eléctrico', 'mantenimiento', 51, 62),
(52, 'JGHJ45', 'Tetera', 'Valdez', 'MOD234', '2024-07-03', 'maquina para hacer cafe', 'eléctrico', 'activo', 51, 64),
(53, 'BEJE4', 'Despulpadora', 'Bellota', 'MOD23', '2024-07-03', 'despulpadora de cafe especial', 'eléctrico', 'mantenimiento', 51, 64),
(54, 'AW4I', 'Portatil asus', 'ASUS', 'XAM23', '2024-07-04', 'portatil de software inventory', 'manual', 'mantenimiento', 53, 64);

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
(41, 'preventivo', '2024-07-04', 'fallo en la pantalla', 25, 47),
(42, 'tecnico', '2024-07-06', 'fallo en el eje de rotación centrall', 25, 48),
(43, 'tecnico', '2024-07-04', 'fallo en el sistema de calor', 26, 49),
(44, 'tecnico', '2024-07-03', 'falla en la polea central', 29, 48),
(45, 'tecnico', '2024-07-03', 'fallas en los botones de marchas', 28, 50),
(46, 'tecnico', '2024-07-03', 'fallos en el refrigerador', 27, 51),
(47, 'preventivo', '2024-07-05', 'Revisión de equipo', 26, 54);

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
(15, 1002343567, 'Dario', 'Guaca', 'dario@gmail.com', '3213456543');

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
(61, 48, 'Y-12', 'mesa 1'),
(62, 52, 'A-3', 'meson'),
(63, 51, 'G-1', 'mesa 1'),
(64, 50, 'C-3', 'mesa 1'),
(65, 49, 'P-2', 'mesa 3');

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
(48, 'tics'),
(49, 'pae'),
(50, 'cafe'),
(51, 'gastronomia'),
(52, 'agroindustria');

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
(25, 1004268668, 'Frand', 'Lebaza', 'frandlebaza@gmail.com', '3213570619', '$2b$10$J.W2IQUc6YQhH05OxRV4du8E7K99NxnFshEouo1ftji9O2MUqE6JS', 'activo', 1, 48),
(26, 1007520867, 'Santiago', 'Motato', 'santsaintcode@gmail.com', '3113880114', '$2b$10$teHM8NBAhZQtucd9GF8TxeTkaL0eTfznoXEHJ1.MeylEIyMuMBGte', 'activo', 2, 50),
(27, 123456789, 'Julian', 'Alvarez', 'julian@gmail.com', '3103234765', '$2b$10$uxu88NjY0fejkQE1UBsAqOG426c7GNSBHgqXxiCb.su7m8oaOZvg.', 'activo', 2, 52),
(28, 830286458, 'Jorge', 'Sanchez', 'jorge@gmail.com', '3213450798', '$2b$10$S/QHtu0rTRTUJL/cwfwPhuM7JxjF.XC32C4Deahw.67jsrHLys49K', 'activo', 2, 51),
(29, 260983645, 'Daniel', 'Lopez', 'daniel@gmail.com', '3203459812', '$2b$10$ifLjA6diMY7MQ9QWzpgj3.gGxzN7.K.V6BCblZF4X/N7lNLPLTUGO', 'activo', 2, 49);

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
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
