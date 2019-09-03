-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 21, 2019 at 02:07 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csm_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `manufacturer` int(11) NOT NULL,
  `model` int(11) NOT NULL,
  `owner` varchar(128) NOT NULL,
  `serial_number` varchar(128) NOT NULL,
  `type` int(11) NOT NULL,
  `asset_tag` int(11) NOT NULL,
  `purchase_price` decimal(13,2) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `location` varchar(128) NOT NULL,
  `team` int(11) NOT NULL,
  `job_number` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `name`, `manufacturer`, `model`, `owner`, `serial_number`, `type`, `asset_tag`, `purchase_price`, `purchase_date`, `location`, `team`, `job_number`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, '1', 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(2, '2', 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(3, '2', 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(4, '3', 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(5, '3', 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(6, '4', 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(7, '5', 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(8, '1', 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(9, '2', 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(10, '2', 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(11, '3', 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(12, '3', 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(13, '4', 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(14, '5', 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(15, '1', 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(16, '2', 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(17, '2', 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(18, '3', 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(19, '3', 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(20, '4', 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(21, '5', 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 1, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `asset_types`
--

CREATE TABLE `asset_types` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `rate` decimal(13,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `asset_types`
--

INSERT INTO `asset_types` (`id`, `name`, `rate`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Computers', '100.00', 1, '', '2019-08-19 02:12:53', '', '2019-08-19 02:12:53'),
(2, 'Monitors', '10.00', 1, '', '2019-08-19 02:12:53', '', '2019-08-19 02:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `login_photos`
--

CREATE TABLE `login_photos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `uploaded_by` varchar(255) NOT NULL,
  `date_uploaded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_photos`
--

INSERT INTO `login_photos` (`id`, `name`, `path`, `uploaded_by`, `date_uploaded`) VALUES
(1, 'images.jpg', 'images.jpg', 'administrator@csmgroup.com', '2019-06-10 12:11:59'),
(2, 'information-technology.jpg', 'information-technology.jpg', 'administrator@csmgroup.com', '2019-06-10 12:11:59'),
(3, 'pexels-photo-546819.jpeg', 'pexels-photo-546819.jpeg', 'administrator@csmgroup.com', '2019-06-10 12:12:23');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Dell', 1, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06'),
(2, 'Planar', 1, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06'),
(3, 'ASUS', 1, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06');

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `manufacturer` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`id`, `name`, `manufacturer`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'XPS 15', 1, 1, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(2, 'PXL2451MW', 2, 1, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(3, 'PXL2470MW', 2, 1, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(4, 'Strix-I Gaming', 3, 1, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(5, 'WD15', 1, 1, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Zulu', 1, '', '2019-08-19 02:12:40', '', '2019-08-19 02:12:40'),
(2, 'SPARK', 1, '', '2019-08-19 02:12:40', '', '2019-08-19 02:12:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 active; 0 inactive',
  `last_modified_by` varchar(255) COLLATE utf8_bin NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `last_login`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Super', 'User', 'administrator@csmgroup.com', '$2y$10$e9LFqB0jKJnQnkwxlKWWyuaCU6pA/R0rcyO7mnSPXdqWJV5SHiB0K', NULL, 1, '', '2019-08-19 02:19:39', '', '2019-08-19 02:19:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `team` (`team`),
  ADD KEY `manufacturer` (`manufacturer`,`model`),
  ADD KEY `model` (`model`);

--
-- Indexes for table `asset_types`
--
ALTER TABLE `asset_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `login_photos`
--
ALTER TABLE `login_photos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manufacturer` (`manufacturer`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `asset_types`
--
ALTER TABLE `asset_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_photos`
--
ALTER TABLE `login_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`model`) REFERENCES `models` (`id`);

--
-- Constraints for table `asset_types`
--
ALTER TABLE `asset_types`
  ADD CONSTRAINT `asset_types_ibfk_1` FOREIGN KEY (`id`) REFERENCES `assets` (`type`);

--
-- Constraints for table `models`
--
ALTER TABLE `models`
  ADD CONSTRAINT `manufacturer` FOREIGN KEY (`manufacturer`) REFERENCES `manufacturers` (`id`);

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`id`) REFERENCES `assets` (`team`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
