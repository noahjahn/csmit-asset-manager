FROM php:7.2-apache-stretch

RUN ["apt-get", "update"]

RUN ["apt-get", "install", "-y", "libpng-dev"]

RUN ["docker-php-ext-install", "gd", "mbstring", "mysqli"]

RUN ["a2enmod", "rewrite"]
