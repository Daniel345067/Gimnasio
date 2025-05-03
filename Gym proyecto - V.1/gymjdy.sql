-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2025 a las 20:36:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gymjdy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `id` int(11) NOT NULL,
  `usuario_correo` varchar(60) NOT NULL,
  `fecha_sus` date DEFAULT NULL,
  `tipo_plan` enum('P hierro','P acero','P platino','P titaneo','P titanio') NOT NULL,
  `tiempo_suscripcion` int(11) DEFAULT NULL,
  `valor_pago` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`id`, `usuario_correo`, `fecha_sus`, `tipo_plan`, `tiempo_suscripcion`, `valor_pago`) VALUES
(32, 'lindabecerra@gmail.com', '2025-04-30', 'P titanio', 4, 408000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(60) NOT NULL,
  `t_documento` enum('Cédula de ciudadanía','Tarjeta de identidad','Cédula de extranjería') NOT NULL,
  `documento` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `edad` int(4) DEFAULT NULL,
  `sexo` enum('Masculino','Femenino') NOT NULL,
  `ciudad` enum('Bogota','Medellin','Cartagena') DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  `permisos` enum('Si','No') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `t_documento`, `documento`, `nombre`, `fecha_nacimiento`, `edad`, `sexo`, `ciudad`, `telefono`, `password`, `permisos`) VALUES
('guadalupe@hotmail.com', 'Tarjeta de identidad', 2105621, 'Guadalupe Molina Castañeda', '2009-10-23', 15, 'Femenino', 'Bogota', 2147483647, '1234', 'Si'),
('leonardoabril@google.com', 'Cédula de extranjería', 1581613, 'Leonardo Abril Zualuaga', '2000-11-05', 24, 'Masculino', 'Medellin', 2147483647, 'leo12', 'Si'),
('lindabecerra@gmail.com', '', 15616842, 'Linda Becerra Barreto', '2000-10-19', 24, 'Femenino', NULL, 2147483647, 'linda123', 'Si'),
('mario.mar@hotmail.com', 'Cédula de ciudadanía', 14562312, 'Mario Martinez Buitrago', '1987-05-14', 37, 'Masculino', 'Medellin', 2147483647, '1200', 'Si'),
('santiago01@gmail.com', 'Cédula de ciudadanía', 12454784, 'Santiago Avila Silva', '2000-12-28', 24, 'Masculino', 'Bogota', 2147483647, '00000', 'Si');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_correo` (`usuario_correo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `suscripcion_ibfk_1` FOREIGN KEY (`usuario_correo`) REFERENCES `usuarios` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
