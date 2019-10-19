DROP TABLE IF EXISTS usuario_tipo, usuario, logs, challenge, r_usuario_challenge;
CREATE TABLE `usuario_tipo` (
  `tipo_usuario` varchar(20) NOT NULL,
  PRIMARY KEY (`tipo_usuario`)
);

INSERT INTO `usuario_tipo` (`tipo_usuario`) VALUES('GRUPO A');
INSERT INTO `usuario_tipo` (`tipo_usuario`) VALUES('GRUPO B');
INSERT INTO `usuario_tipo` (`tipo_usuario`) VALUES('GRUPO C');
INSERT INTO `usuario_tipo` (`tipo_usuario`) VALUES('GRUPO D');

CREATE TABLE `usuario` (
  `nickname` varchar(20) NOT NULL,
  `password` varchar(80) NOT NULL,
  `FK_USUARIO_TIPO_tipo_usuario` varchar(20) NOT NULL,
  FOREIGN KEY (`FK_USUARIO_TIPO_tipo_usuario`) REFERENCES usuario_tipo(tipo_usuario),
  PRIMARY KEY (`nickname`)
);


CREATE TABLE `logs` (
  `id_number` INT NOT NULL AUTO_INCREMENT,
  `log_type` varchar(100) NOT NULL, -- ACTIVIDAD
  `data` MEDIUMTEXT NOT NULL,
  `server_datetime` DATETIME NOT NULL,
  `FK_USUARIO_nickname` varchar(20) NOT NULL,
  PRIMARY KEY (`id_number`)
);

CREATE TABLE `challenge` (
  `id_number` INT NOT NULL AUTO_INCREMENT,
  `titulo` varchar(1000) NOT NULL, -- ACTIVIDAD
  `objetivos` varchar(1000) NOT NULL, -- ACTIVIDAD
  `photo` varchar(1000) NOT NULL, -- ACTIVIDAD
  `descripcion` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id_number`)
);

CREATE TABLE `query_result` (
  `id_result` INT NOT NULL AUTO_INCREMENT,
  `titulo` varchar(5000) NOT NULL,º
  `snippet` varchar(10000) NOT NULL,
  `url` varchar(20000) NOT NULL,
  `FK_CHALLENGE_id_number` INT NOT NULL,
  FOREIGN KEY (`FK_CHALLENGE_id_number`) REFERENCES challenge(id_number),
  PRIMARY KEY (`id_result`)
);


CREATE TABLE `r_usuario_challenge` (
  `id_number` INT NOT NULL AUTO_INCREMENT,
  `FK_USUARIO_nickname` varchar(20) NOT NULL,
  `FK_CHALLENGE_id_number` INT NOT NULL,
  FOREIGN KEY (`FK_USUARIO_nickname`) REFERENCES usuario(nickname),
  FOREIGN KEY (`FK_CHALLENGE_id_number`) REFERENCES challenge(id_number),
  PRIMARY KEY (`id_number`)
);

/*
CONTADOR id_number	FK_challenge_id_number	query 	
11 			601 			3 				crimen en chile
9 			670 			3 				como reducir el crimen en chile
9 			497 			3 				como reducir el crimen
6 			663 			3 				reducir el crimen en chile
4 			1208 			3 				crimen en chile actualidad

SELECT COUNT(*) AS CONTADOR, Students_query.id_number , FK_challenge_id_number, query FROM `Students_query` WHERE FK_challenge_id_number=4 GROUP BY query ORDER BY `CONTADOR` DESC LIMIT 5 ; -- construir un vehiculo

CONTADOR id_number	FK_challenge_id_number	query 	
34 			82 				4 				como construir un automovil
20 			474 			4 				como hacer un auto
13 			227 			4 				como construir un automovil de carreras
10 			286 			4 				construir un automóvil
10 			519 			4 				soapbox vehiculo

SELECT COUNT(*) AS CONTADOR, Students_query.id_number , FK_challenge_id_number, query FROM `Students_query` WHERE FK_challenge_id_number=5 GROUP BY query ORDER BY `CONTADOR` DESC LIMIT 5  ; -- profundidad de mar

CONTADOR id_number	FK_challenge_id_number	query 	
12 			137 			5 				nombre del punto mas profundo del oceano
9 			164 			5 				punto mas profundo del oceano
9 			144 			5 				FOSA DE LAS MARIANAS
8 			207 			5 				cuanta profundidad tiene el mar
8 			951 			5 				abismo de challenge profundidad

*/

