-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2023 at 04:24 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `parent_category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `parent_category`) VALUES
(5, 'sdf', '[{\"value\":4,\"label\":\"asda\"}]'),
(6, 'asdasd', '[{\"value\":4,\"label\":\"asda\"}]'),
(7, 'ad', '[{\"value\":4,\"label\":\"asda\"}]'),
(8, 'asdasd', '[{\"value\":5,\"label\":\"sdf\"}]'),
(9, 'asdas', '[{\"value\":6,\"label\":\"asdasd\"}]'),
(10, 'asdsa', '[{\"value\":6,\"label\":\"asdasd\"}]'),
(11, 'asdsa', '[{\"value\":7,\"label\":\"ad\"}]'),
(12, 'asd', '[{\"value\":7,\"label\":\"ad\"}]'),
(13, 'adcasd', '[{\"value\":9,\"label\":\"asdas\"}]'),
(14, 'asda', '[{\"value\":9,\"label\":\"asdas\"}]'),
(15, 'wdfwe', '[{\"value\":6,\"label\":\"asdasd\"}]'),
(16, 'asds', '[{\"value\":8,\"label\":\"asdasd\"},{\"value\":10,\"label\":\"asdsa\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `categories` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `image`, `categories`) VALUES
(2, 'xcasd', '5656', '', ''),
(3, 'test', '543453', '', '[{\"value\":5,\"label\":\"sdf\"},{\"value\":11,\"label\":\"asdsa\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` int(11) DEFAULT NULL,
  `profileImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `profileImage`) VALUES
(7, 'Piyush', 'Prajapati', 'piyush.jenya@gmail.com', '$2b$10$YiW9RcI5LpschxYuYTcQYeCStJ5sDPkGS.aECekmN3gNJmIdTq0d.', 2147483647, 'download (1).jpg'),
(8, 'sdf', NULL, 'piyush.jenyawdw@gmail.com', '$2b$10$tJ0vYaJ4YHfWAuuK6um1v./C5hcIIpjHL51F6rfBkU6Y7LZXlv6gC', 0, 'download (1).jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
