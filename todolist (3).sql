-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 16, 2021 at 06:12 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--
CREATE DATABASE IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `todolist`;

-- --------------------------------------------------------

--
-- Table structure for table `droits`
--

DROP TABLE IF EXISTS `droits`;
CREATE TABLE IF NOT EXISTS `droits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `liste_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `droits`
--

INSERT INTO `droits` (`id`, `liste_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2),
(4, 4, 3),
(5, 5, 3),
(6, 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `liste`
--

DROP TABLE IF EXISTS `liste`;
CREATE TABLE IF NOT EXISTS `liste` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finished_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `liste`
--

INSERT INTO `liste` (`id`, `nom`, `create_at`, `finished_at`) VALUES
(1, 'Apprendre à s\'organiser', '2021-04-28 10:19:28', NULL),
(3, 'en cours', '2021-05-03 08:16:15', NULL),
(4, 'jskdfmsdmjf', '2021-05-03 08:22:13', NULL),
(6, 'klkùmqs', '2021-05-03 10:50:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tache`
--

DROP TABLE IF EXISTS `tache`;
CREATE TABLE IF NOT EXISTS `tache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `liste_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finish` datetime DEFAULT '2000-01-01 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tache`
--

INSERT INTO `tache` (`id`, `nom`, `description`, `liste_id`, `user_id`, `create_at`, `finish`) VALUES
(1, 'Avoir une todolist', NULL, 1, 1, '2021-04-28 10:19:53', '2000-01-01 00:00:00'),
(2, 'Avoir une todolist', NULL, 1, 1, '2021-04-28 10:20:27', '2021-04-28 10:20:44'),
(3, 'faire qqc', 'pas mal', 2, 2, '2021-05-03 08:14:28', '2021-05-03 08:15:53'),
(4, 'faire qqc', NULL, 2, 2, '2021-05-03 08:15:40', '2000-01-01 00:00:00'),
(5, 'faire', NULL, 3, 2, '2021-05-03 08:16:46', '2021-05-03 08:16:53'),
(6, 'ihmohiomjom', 'dsfjkfùlzerùfaez', 4, 3, '2021-05-03 08:22:20', '2021-05-11 12:50:11'),
(7, 'ihmohiomjomgtzz', NULL, 4, 3, '2021-05-03 08:23:20', '2000-01-01 00:00:00'),
(8, 'dkljdkljmlqs', 'djfdjfkjsmq', 4, 3, '2021-05-03 10:50:08', '2021-05-03 10:50:28'),
(9, 'jioojomfjr', NULL, 4, 3, '2021-05-11 12:49:38', '2000-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(120) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `nom`, `prenom`, `password`) VALUES
(1, 'emmanuel.cabassot@hotmail.fr', 'Cabassot', 'Emmanuel', '$argon2i$v=19$m=65536,t=4,p=1$L0Q2TUJ0ei5nN1pWT09idQ$lg7JUWOOYfCIjw0NK0DMXf2qddlaPzlRC3XHkNdXhvw'),
(2, 'fabio@tdl.br', 'fabio', 'fabio', '$argon2i$v=19$m=65536,t=4,p=1$MFIycG9tWW1qYldHRG1aYQ$6fELvPO2y0lP9xM7kPN+KG18yE6ey2HMiwDYBP7V3w0'),
(3, 'emmanuel.cabassot@laplateforme.io', 'Cabassot', 'Emmanuel', '$argon2i$v=19$m=65536,t=4,p=1$NXRZcHptTHp3cjJtc1hqTg$CXOfYqCdekiQdwHMcNaYzI4yF408wEkk4NKWBr1ALBk');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
