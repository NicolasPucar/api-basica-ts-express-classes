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
  `rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email_unico` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`, `rol`) VALUES
('Nico7@Nico.com', 'Nico7@Nico.com', 1, '2023-04-03 20:45:42', '2023-04-03 18:45:42', 31, 0, '$2b$10$BdKc4qWrz4ZT1y4D24O8SuRt02TanbL4hsES8ewRb.GBpRhxvsbOq', 'USER_ROLE');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`, `rol`) VALUES
('Nico3', 'Nico3@Nico.com', 1, '2023-04-03 20:01:51', '2023-04-03 18:01:51', 32, 0, '$2b$10$KsWVHtC3j3YakYbX/1rzHeDWpKNbv4MjCydpGdNFGInJIPtAfSMum', 'USER_ROLE');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`, `rol`) VALUES
('Nico3', 'Nico4@Nico.com', 1, '2023-04-03 20:06:31', '2023-04-03 18:06:31', 33, 0, '$2b$10$CKmIn0tWfpR5f39J7fCtguKs4g7ZEMHgPw01oaKJUxzpjJPSAQPHW', 'ADMIN_ROLE');
INSERT INTO `usuarios` (`nombre`, `email`, `estado`, `createdAt`, `updatedAt`, `id`, `google`, `password`, `rol`) VALUES
('Nico5@Nico.com', 'Nico5@Nico.com', 1, '2023-04-03 20:07:22', '2023-04-03 18:07:22', 34, 0, '$2b$10$LWD56tDOfcaTIKXkN71cxe.j1RXhPf3ltb6hrYgg1RRjBJdqQj1ba', 'USER_ROLE'),
('Nico6@Nico.com', 'Nico6@Nico.com', 1, '2023-04-03 20:33:30', '2023-04-03 18:33:30', 35, 0, '$2b$10$mxaO3.nxQUCyFwM4LRkhVeIIyRkQFpb9TX88ls5GpubSiz7OignoK', 'USER_ROLE');
 */
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;