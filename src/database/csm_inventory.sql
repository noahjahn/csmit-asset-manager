INSERT INTO `assets` (`id`, `manufacturer_id`, `model_id`, `owner`, `serial_number`, `type_id`, `asset_tag`, `purchase_price`, `purchase_date`, `location`, `team_id`, `job_number`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(2, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(3, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(4, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(5, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(6, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(7, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(8, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(9, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(10, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(11, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(12, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(13, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(14, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(15, 1, 1, 'IT Department', '2WZRNF2', 1, 3349, '1574.60', '2019-03-21', 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(16, 2, 2, 'Noah Jahn', 'PEWPD6JA00946', 2, 1373, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(17, 2, 2, 'Noah Jahn', 'PEWPD8JA00341', 2, 2622, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(18, 2, 3, 'Noah Jahn', 'PL751NSS03674', 2, 2977, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(19, 2, 3, 'Noah Jahn', 'PL751NSS03465', 2, 2935, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(20, 3, 4, 'Noah Jahn', '171115234500327', 1, 3100, NULL, NULL, 'Kalamazoo', 1, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26'),
(21, 1, 5, 'Noah Jahn', 'auto-1550095609.740821-1bc35', 3, 6548, NULL, NULL, 'Kalamazoo', 2, NULL, 0, '1', '2019-08-19 02:21:26', '1', '2019-08-19 02:21:26');

INSERT INTO `asset_types` (`id`, `name`, `rate`, `lifespan`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Computers', '100.00', NULL, 0, '1', '2019-11-10 23:39:22', '1', '2019-08-19 02:12:53'),
(2, 'Monitors', '10.00', NULL, 0, '1', '2019-08-19 02:12:53', '1', '2019-08-19 02:12:53');

INSERT INTO `login_photos` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'images.jpg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40'),
(2, 'information-technology.jpg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40'),
(3, 'pexels-photo-546819.jpeg', 0, 0, '2019-11-11 23:34:40', 0, '2019-11-11 23:34:40');

INSERT INTO `manufacturers` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Dell', 0, '1', '2019-08-19 02:10:06', '1', '2019-08-19 02:10:06'),
(2, 'Planar', 0, '1', '2019-08-19 02:10:06', '1', '2019-08-19 02:10:06'),
(3, 'ASUS', 0, '1', '2019-08-19 02:10:06', '1', '2019-08-19 02:10:06');

INSERT INTO `models` (`id`, `name`, `manufacturer_id`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'XPS 15', 1, 0, '0', '2019-08-19 01:10:29', '0', '2019-08-19 01:11:13'),
(2, 'PXL2451MW', 2, 0, '0', '2019-08-19 01:10:29', '0', '2019-08-19 01:11:13'),
(3, 'PXL2470MW', 2, 0, '0', '2019-08-19 01:10:29', '0', '2019-08-19 01:11:13'),
(4, 'Strix-I Gaming', 3, 0, '0', '2019-08-19 01:10:29', '0', '2019-08-19 01:11:13'),
(5, 'WD15', 1, 0, '0', '2019-08-19 01:10:29', '0', '2019-08-19 01:11:13');

INSERT INTO `roles` (`id`, `name`, `dashboard`, `asset_manager`, `reports`, `asset_groups`, `users`, `roles`, `login_photos`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Administrator', 6, 6, 6, 6, 6, 6, 6, 0, 1, '2019-11-18 02:07:57', 1, '2019-11-18 02:07:57');

INSERT INTO `teams` (`id`, `name`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Zulu', 0, '0', '2019-08-19 02:12:40', '0', '2019-08-19 02:12:40'),
(2, 'SPARK', 0, '0', '2019-08-19 02:12:40', '0', '2019-08-19 02:12:40');

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `role_id`, `password`, `session_token`, `last_login`, `is_deleted`, `last_modified_by`, `last_modified_time`, `created_by`, `created_time`) VALUES
(1, 'Super', 'User', 'administrator@csmgroup.com', 1, '$2y$10$e9LFqB0jKJnQnkwxlKWWyuaCU6pA/R0rcyO7mnSPXdqWJV5SHiB0K', '$2y$10$Mu2rQiXy49WwHBJV8qsGBel0R/yh5DNmmmnyyV3Ptt9DM.YEZ8l9q', '2019-11-18 01:29:11', 0, 1, '2019-11-10 22:32:09', 1, '2019-08-19 02:19:39'),
(2, 'Kalem', 'Pulliam', 'kalem.pulliam@csmgroup.com', 1, '$2y$10$0OENbB0zml9KeBlCMqluQurim0RJ7I5gjUanKKgLQG9SUdtfQ5yY.', '$2y$10$47hsS9eSC6DOzd5zxjoRvug6ZhaW5343tycphiqrcmd4.01Z.Wha2', '2019-10-24 03:02:39', 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(3, 'Ben', 'Stieber', 'ben.stieber@csmgroup.com', 1, '$2y$10$RU2YYI8r9avLIG8zGAml.eHQe/M5VbSGz2HtoqbI52Ardk7uti6/G', '', NULL, 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(4, 'Derrick', 'Quintanilla', 'derrick.quintanilla@csmgroup.com', 1, '$2y$10$nas7DlXu3hPbb0K7BUTCgerEGNT1wVRJ/CqZNxYo14JULu9plSZr.', '', NULL, 0, 1, '2019-10-24 03:01:55', 1, '2019-10-24 03:01:55'),
(5, 'Noah', 'Jahn', 'noah.jahn@sparkbusinessworks.com', 1, '$2y$10$pveOWgoX.aE1DuvWny5g2.6jXVaA/FAui41Z7pBfgIryhgRcntqFy', '', NULL, 0, 1, '2019-11-18 03:05:31', 1, '2019-11-18 03:05:31');
