FROM php:7.4.3-apache

RUN apt-get update && \
  apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    libpng-dev \
    libonig-dev

RUN docker-php-ext-install \
  gd \
  mbstring \
  mysqli

RUN a2enmod rewrite
