-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 22. 22:52
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `hegycsucsok`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csucs`
--

CREATE TABLE `csucs` (
  `az` int(2) NOT NULL,
  `nev` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `magassag` int(4) DEFAULT NULL,
  `edatum` date DEFAULT NULL,
  `orszag` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mazon` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `csucs`
--

INSERT INTO `csucs` (`az`, `nev`, `magassag`, `edatum`, `orszag`, `mazon`) VALUES
(1, 'Csomolungma', 8848, '1953-05-29', 'Kína, Nepál', 8),
(2, 'K2', 8611, '1954-07-31', 'Kína, Pakisztán', NULL),
(3, 'Kancsendzönga', 8586, '1955-05-25', 'India, Nepál', 8),
(4, 'Lhoce', 8516, '1956-05-18', 'Kína, Nepál', 8),
(5, 'Makalu', 8463, '1955-05-15', 'Kína, Nepál', 8),
(6, 'Cso-Oju', 8201, '1954-10-19', 'Kína, Nepál', 1),
(7, 'Dhaulagiri', 8167, '1960-05-13', 'Nepál', 8),
(8, 'Manaszlu', 8163, '1956-05-09', 'Nepál', 3),
(9, 'Nanga Parbat', 8126, '1953-07-03', 'Pakisztán', 8),
(10, 'Annapurna', 8091, '1950-06-03', 'Nepál', NULL),
(11, 'Gasherbrum I.', 8068, '1958-07-05', 'Kína, Pakisztán', 5),
(12, 'Broad Peak', 8047, '1957-06-09', 'Kína, Pakisztán', 1),
(13, 'Gasherbrum II.', 8035, '1956-07-08', 'Kína, Pakisztán', 1),
(14, 'Sisapangma', 8027, '1964-05-02', 'Kína', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `maszo`
--

CREATE TABLE `maszo` (
  `az` int(11) NOT NULL,
  `nev` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ferfi` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2 COLLATE=latin2_hungarian_ci;

--
-- A tábla adatainak kiíratása `maszo`
--

INSERT INTO `maszo` (`az`, `nev`, `ferfi`) VALUES
(1, 'Ács Zoltán', 1),
(3, 'Barna Dániel', 1),
(5, 'Csizmadia Péter', 1),
(8, 'Erőss Zsolt', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `csucs`
--
ALTER TABLE `csucs`
  ADD PRIMARY KEY (`az`),
  ADD KEY `mazon` (`mazon`);

--
-- A tábla indexei `maszo`
--
ALTER TABLE `maszo`
  ADD PRIMARY KEY (`az`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `csucs`
--
ALTER TABLE `csucs`
  MODIFY `az` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `maszo`
--
ALTER TABLE `maszo`
  MODIFY `az` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `csucs`
--
ALTER TABLE `csucs`
  ADD CONSTRAINT `csucs_ibfk_1` FOREIGN KEY (`mazon`) REFERENCES `maszo` (`az`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
