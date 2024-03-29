-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-03-2024 a las 14:24:47
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
-- Base de datos: `inventoryfrand`
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
(1, '2024-03-30', 'Se cambió el motor', 3, 1),
(2, '2024-03-31', 'Se cambiaron poleas', 3, 2),
(3, '2024-03-14', 'ddddd', 6, 2);

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
(39, 'Maquinaria');

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
(25, 111, 'Molino', 'MWQ', 'A2023L', '2024-02-13', 'molino triturador', 'eléctrico', 'activo', 38, 14),
(26, 222, 'Microscopio', 'MCC', 'CC023L', '2024-04-13', 'detector de bacterias', 'manual', 'inactivo', 39, 15),
(27, 123, 'bb', 'bb', 'dafvdf', '2024-03-28', 'jjjjjj', 'd', 'inactivo', 38, 16),
(28, 555, 'hhh', 'hhh', 'hhhh', '2024-03-22', 'hhhhhhh', 'hhhh', 'activo', 38, 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimientos`
--

CREATE TABLE `mantenimientos` (
  `id_mantenimiento` int NOT NULL,
  `tipo_mantenimiento` enum('preventivo','tecnico') NOT NULL,
  `fecha_mantenimiento` date NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `resultado` varchar(250) NOT NULL,
  `fk_user_responsable` int NOT NULL,
  `fk_equipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mantenimientos`
--

INSERT INTO `mantenimientos` (`id_mantenimiento`, `tipo_mantenimiento`, `fecha_mantenimiento`, `descripcion`, `resultado`, `fk_user_responsable`, `fk_equipo`) VALUES
(2, 'preventivo', '2024-02-21', 'fallo en el funcionamiento interno', 'necesita mantenimiento técnico', 3, 25),
(3, 'tecnico', '2024-02-25', 'fallo en el funcionamiento interno', 'equipo reparado', 3, 25),
(4, 'preventivo', '2024-03-27', 'fffff', 'fffff', 3, 26),
(5, 'preventivo', '2024-03-27', 'fffff', 'fffff', 3, 26),
(6, 'preventivo', '2024-03-28', 'dddddd', 'ddd', 4, 28),
(7, 'tecnico', '2024-03-16', 'www', 'www', 3, 25);

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
(1, 123456, 'Juan', 'Cuellar', 'cuellar@gmail.com', '32134566'),
(2, 909090, 'Fredd', 'Castro', 'castror@gmail.com', '3212236');

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
(15, 13, 'F-12', 'Mesa-4'),
(16, 12, 'Frand', '3'),
(17, 13, 'qq', 'qq'),
(18, 12, 'ee', 'ee'),
(19, 12, 'ff', 'ff'),
(20, 13, 'yy', 'yy'),
(21, 12, 'vv', 'vvv'),
(22, 13, 'mm', 'mm'),
(23, 12, 'bb', 'bb'),
(24, 13, 'tt', 'tt'),
(25, 13, 'cc', 'cc'),
(26, 13, 'rtrt', 'rtrt'),
(27, 12, 'juan', 'juan'),
(28, 13, 'motato', 'motato'),
(29, 13, 'cara', 'cara'),
(30, 12, 'www', 'www'),
(31, 13, 'kk', 'kk'),
(32, 12, 'wer', 'wer'),
(33, 13, 'fff', 'ff'),
(34, 21, 'Four', 'Piso');

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
(13, 'Gastronomía'),
(14, 'TICS'),
(15, 'TICS'),
(16, 'TICS'),
(17, 'Café'),
(18, 'frand'),
(19, 'miller'),
(20, 'motato'),
(21, 'PAE'),
(22, 'sadfsaddfd'),
(23, 'frand'),
(24, 'centro de acopio');

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
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'activo',
  `fk_tipo_usuario` int NOT NULL,
  `fk_unidad_productiva` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `email`, `telefono`, `password`, `estado`, `fk_tipo_usuario`, `fk_unidad_productiva`) VALUES
(3, 10042, 'Santiago', 'Motato', 'motato@gmail.com', '322330619', 'putin', 'inactivo', 1, 12),
(4, 333, 'cvc', 'ccc', 'cc@gmail.com', '3333', 'eee', 'activo', 2, 12),
(5, 333, 'cvc', 'ccc', 'cc@gmail.com', '3333', 'eee', 'activo', 2, 12),
(6, 333, 'cvc', 'ccc', 'cc@gmail.com', '3333', 'eee', 'activo', 2, 12),
(7, 333, 'gggg', 'ccc', 'cc@gmail.com', '3333', 'eee', 'activo', 2, 12);

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
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `id_tecnico` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
