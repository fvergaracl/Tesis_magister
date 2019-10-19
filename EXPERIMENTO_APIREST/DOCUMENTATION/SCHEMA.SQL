CREATE TABLE `users` (
  `nickname` varchar(100) NOT NULL,
  `password` varchar(80) NOT NULL,
  `salt` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `nombre` varchar(254) NOT NULL,
  PRIMARY KEY(email),
  UNIQUE(nickname)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`nickname`, `password`, `salt`, `email`, `nombre`) VALUES
('usuario1', '924c3e107882ec413a5d52c84d3763d828f58cf11359a596d6739567f9d4ba7c', '$2b$12$awABuYqShBoaOlOGfYofBe', 'test@test.com','nombre usuario1');




