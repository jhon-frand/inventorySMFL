-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-06-2024 a las 23:23:28
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
(14, '2024-04-26', 'cambio de playlist por bronco broonco', 23, 8);

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
(50, 'categoria jwt');

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
(37, 'asss', 'assdf', 'sdsdhg', 'asff', '2024-04-08', 'prueba alertas después del register', 'dfdffs', 'activo', 48, 49),
(38, '9834ff', 'PORATTIL', 'ASUS', 'AXM3', '2024-04-11', 'portatil para el manejo del software', 'Manual', 'activo', 49, 51),
(39, '123ndhd', 'equipment jwt', 'asd', 'dsfg', '2024-04-04', 'prueba de registro con token', 'sadfds', 'activo', 50, 51),
(40, '34f4f3', 'adminis', 'adminsi', 'adnin', '2024-04-19', 'administrador equipo en tics', 'electrico', 'inactivo', 39, 28),
(41, 'jh45b', 'equipo miguelon', 'marca miguel', 'model miguel', '2024-04-20', 'prueba de registro con tokenn y rol', 'electrico', 'activo', 39, 58),
(42, 'sdssd3', 'bunbury', 'bunbury ma', 'model bunbury', '2024-04-19', 'prueba de get equipos por unidad', 'mnual', 'activo', 38, 58);

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
(3, 'tecnico', '2024-02-25', 'fallo en el funcionamiento interno', 'equipo reparado', 9, 25),
(14, 'preventivo', '2024-03-09', 'sddsfdsfdsfdsfdsfdsfsssssssss', 'equipo reparado correctamente', 4, 30),
(18, 'tecnico', '2024-03-14', 's mantenimientoasasassd', 'necezxcdfdf', 14, 36),
(19, 'preventivo', '2024-04-06', 'Fallos en el teclado ay en el mosue', 'necesita cambio de fallas', 16, 38),
(20, 'preventivo', '2024-04-05', 'prueba de mantenimiento co njwt', 'jwt funcionando', 16, 39),
(21, 'tecnico', '2024-04-26', 'user encargado register manteinment', 'esperando el result', 16, 39),
(22, 'preventivo', '2024-04-18', 'mary luna de mi amor como una ensoñación', 'clásicos del ayer y del hoy', 16, 38),
(23, 'preventivo', '2024-04-26', 'prueba de listas de mantenimientosss', 'resultado esperado', 14, 42),
(24, 'preventivo', '2024-04-12', 'description proyecto uno equipo', 'necesita mantenimiento técnico', 4, 42);

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
(14, 1230949887, 'proyecto', 'uno', 'uno@gmail.com', '3213456765');

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
(58, 34, 'ambiente miguelon', 'sitio miguelon');

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
(34, 'PruebaProyecto'),
(42, 'por fin'),
(43, 'FRANDCHESCO');

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
(3, 1004233, 'Santiago', 'Motato', 'jhonfrand72@gmail.com', '3223306193', 'password123', 'activo', 1, 12),
(4, 100426, 'Frand', 'Lebaza', 'frand@gmail.com', '3213570619', 'eee', 'activo', 1, 15),
(9, 1111, 'Juanete', 'cervantes', 'cervantes@gmail.com', '434343', 'juan', 'activo', 1, 15),
(13, 123443, 'ybers', 'yber', 'yber@gmail.com', '1234232323', 'yberer', 'inactivo', 2, 15),
(14, 10029448, 'Miguelon', 'Serrano', 'miguelon@gmail.com', '3213213214', 'miguel', 'activo', 2, 34),
(15, 222222, 'sdsd', 'sda', 'a@gmail.com', '2234433443', 'sdfvdsv', 'activo', 2, 42),
(16, 1002355, 'Daniel', 'Maldini', 'daniel@gmail.com', '3214560923', 'daniele', 'activo', 2, 43),
(20, 707070, 'bbb', 'bbb', 'bbb@gmail.com', '8787877883', '707070', 'activo', 2, 15),
(21, 404040, 'joselo', 'lopez', 'joselopez@gmail.com', '2323232334', '404040', 'activo', 2, 15);

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
  MODIFY `id_actividad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `mantenimientos`
--
ALTER TABLE `mantenimientos`
  MODIFY `id_mantenimiento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id_ubicacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `id_unidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
