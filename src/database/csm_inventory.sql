-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 18, 2019 at 03:51 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `csm_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
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
  `notes` varchar(255),
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `manufacturer`, `model`, `owner`, `serial_number`, `type`, `asset_tag`, `purchase_price`, `purchase_date`, `location`, `team`, `job_number`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(2, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(3, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(4, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(5, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(6, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(7, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(8, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(9, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(10, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(11, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(12, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(13, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(14, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(15, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(16, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(17, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(18, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(19, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(20, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26'),
(21, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '', '2019-08-19 02:21:26', '', '2019-08-19 02:21:26');

-- --------------------------------------------------------

--
-- Table structure for table `asset_types`
--

CREATE TABLE `asset_types` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `rate` decimal(13,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `asset_types`
--

INSERT INTO `asset_types` (`id`, `name`, `rate`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Computers', '1000.00', 0, '1', '2019-11-10 23:39:22', '1', '2019-08-19 02:12:53'),
(2, 'Monitors', '10.00', 0, '', '2019-08-19 02:12:53', '', '2019-08-19 02:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `login_photos`
--

CREATE TABLE `login_photos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` int(8) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(8) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login_photos`
--

INSERT INTO `login_photos` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'images.jpg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40'),
(2, 'information-technology.jpg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40'),
(3, 'pexels-photo-546819.jpeg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Dell', 0, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06'),
(2, 'Planar', 0, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06'),
(3, 'ASUS', 0, '', '2019-08-19 02:10:06', '', '2019-08-19 02:10:06');

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `manufacturer` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`id`, `name`, `manufacturer`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'XPS 15', 1, 0, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(2, 'PXL2451MW', 2, 0, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(3, 'PXL2470MW', 2, 0, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(4, 'Strix-I Gaming', 3, 0, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13'),
(5, 'WD15', 1, 0, '', '2019-08-19 01:10:29', '', '2019-08-19 01:11:13');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dashboard` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `asset_manager` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `reports` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `asset_groups` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `users` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `roles` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `login_photos` tinyint(1) NOT NULL DEFAULT '0' COMMENT '2=write; 4=read; 6=read write',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `last_modified_by` int(11) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `dashboard`, `asset_manager`, `reports`, `asset_groups`, `users`, `roles`, `login_photos`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Administrator', 6, 6, 6, 6, 6, 6, 6, 0, 1, '2019-11-18 02:07:57', 1, '2019-11-18 02:07:57');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` varchar(255) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Zulu', 0, '', '2019-08-19 02:12:40', '', '2019-08-19 02:12:40'),
(2, 'SPARK', 0, '', '2019-08-19 02:12:40', '', '2019-08-19 02:12:40');
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 deleted; 0 not deleted',
  `last_modified_by` tinyint(1) NOT NULL,
  `last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` tinyint(1) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `role`, `password`, `session_token`, `last_login`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Super', 'User', 'administrator@csmgroup.com', 1, '$2y$10$e9LFqB0jKJnQnkwxlKWWyuaCU6pA/R0rcyO7mnSPXdqWJV5SHiB0K', '$2y$10$Mu2rQiXy49WwHBJV8qsGBel0R/yh5DNmmmnyyV3Ptt9DM.YEZ8l9q', '2019-11-18 01:29:11', 0, 1, '2019-11-10 22:32:09', 1, '2019-08-19 02:19:39'),
(2, 'Kalem', 'Pulliam', 'kalem.pulliam@csmgroup.com', 1, '$2y$10$0OENbB0zml9KeBlCMqluQurim0RJ7I5gjUanKKgLQG9SUdtfQ5yY.', '$2y$10$47hsS9eSC6DOzd5zxjoRvug6ZhaW5343tycphiqrcmd4.01Z.Wha2', '2019-10-24 03:02:39', 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(3, 'Ben', 'Stieber', 'ben.stieber@csmgroup.com', 1, '$2y$10$RU2YYI8r9avLIG8zGAml.eHQe/M5VbSGz2HtoqbI52Ardk7uti6/G', '', NULL, 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(4, 'Derrick', 'Quintanilla', 'derrick.quintanilla@csmgroup.com', 1, '$2y$10$nas7DlXu3hPbb0K7BUTCgerEGNT1wVRJ/CqZNxYo14JULu9plSZr.', '', NULL, 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(5, 'Noah', 'Jahn', 'noah.jahn@sparkbusinessworks.com', 1, '$2y$10$pveOWgoX.aE1DuvWny5g2.6jXVaA/FAui41Z7pBfgIryhgRcntqFy', '', NULL, 0, 1, '2019-11-18 03:05:31', 1, '2019-11-18 03:05:31');

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
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `login_photos`
--
ALTER TABLE `login_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
