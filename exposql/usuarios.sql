/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/* 
CREATE TABLE `usuarios` (
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `google` bit(1) DEFAULT b'0',
  `password` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email_unico` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`) VALUES
('guido', 'guido@guido.com', 0, '2023-03-29 13:01:09', '2023-03-29 11:01:09', 14, 0, '$2b$10$4AO7zOtPE31jmRmu6hQjmOqfnDd2N041SQVrBdAGqbbJoUNGQr9yO');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`) VALUES
('guido2', 'guido2@guido.com', 1, '2023-03-29 11:34:36', '2023-03-29 09:34:36', 15, 0, '$2b$10$GZjf.JAO6iN9GbulVtHk4.Qr3HfQUgG2uQYbqE97fT6CBjN/cZop2');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`) VALUES
('guido3', 'guido3@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:34:44', 16, 0, '$2b$10$N7ib9LnIN7X06jEzMRRyAeorCxDqoWncQb9rMIFL3AGjXddDTrqLO');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`) VALUES
('guido4', 'guido4@guido.com', 1, '2023-03-29 11:34:52', '2023-03-29 09:34:52', 17, 0, '$2b$10$sOu66jyyMbASv.Rhq94QuOzXJqfVOuFASsVaCUpUu3IFRrrDtn3VO'),
('guido5', 'guido5@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:35:11', 18, 0, '$2b$10$5pxOriwYXILNnSVmDC1OyejWBWSZRoumJGGCfd7xdKk495AOePfT.'),
('guido6', 'guido6@guido.com', 1, '2023-03-29 11:35:25', '2023-03-29 09:35:25', 19, 0, '$2b$10$fx4U8vVgdgHmsMJg1dqV4evo2kI0uZs5uyKmg3vhfAJe4ATSu00Sq'),
('guido7', 'guido7@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:35:36', 20, 0, '$2b$10$EC/Dpy3RRyjuKnAGx3NNMO8RqiW/Pa..EqQ.PQ.J0xuOiRK9f44ny'),
('guido8', 'guido8@guido.com', 1, '2023-03-29 11:35:47', '2023-03-29 09:35:47', 21, 0, '$2b$10$nAwhRpIV.zMmiwxrw041J.Z7mUjMw59Z0HrTKE/sul1HAmcTex/em'),
('guido9', 'guido9@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:35:56', 22, 0, '$2b$10$eagNCsCck.DnpWOSy6YNGeK5m3SB4KLqWD/lB2.UTBSo9xSrJrYii'),
('guido10', 'guido10@guido.com', 1, '2023-03-29 11:36:09', '2023-03-29 09:36:09', 23, 0, '$2b$10$nkvu5wORg2jU8TEtpPvAuu9sbfue1pnZ9KQFHjSM70WtgGphR0oia'),
('guido11', 'guido11@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:36:17', 24, 0, '$2b$10$h5BFyyzbcrsrueFftCZt7..o7A6EN9RwfgWJZkm8EGoMP/jOpqbja'),
('guido12', 'guido12@guido.com', 1, '2023-03-29 11:36:29', '2023-03-29 09:36:29', 25, 0, '$2b$10$S1wvYd9ZXRJzX1.3VcaSCuG5IcjDZNLSAZsKp.EiNLh8iHVYC8Lvy'),
('guido13', 'guido13@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:36:39', 26, 0, '$2b$10$yYp2n5RNttlpQy3xUlojBu43rEDOdaBNPHCxDh3McWgHpp42Y4o.6'),
('guido14', 'guido14@guido.com', 1, '2023-03-29 11:36:48', '2023-03-29 09:36:48', 27, 0, '$2b$10$YMSJUVYGTk8OxKc1f3igx.W/rhs/kXCFsRM6QAmRGz.VTUUBdO9pm'),
('guido15', 'guido15@guido.com', 0, '2023-03-29 12:49:20', '2023-03-29 09:36:58', 28, 0, '$2b$10$s7eg5ikCS/gHvdgvvHQbWuDx9AvatoOvKqByZbHDMGUpFcpd6Q.ku'),
('pepe', 'pepe@pepe.com', 1, '2023-03-29 15:48:24', '2023-03-29 13:48:24', 29, 0, '$2b$10$ElKlMKMIFzwRFYAXi7u8/ebyvZYQiPxe1gXDxnRV5V.5Tffgphxda');
 */
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;