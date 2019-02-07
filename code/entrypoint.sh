#!/bin/sh
set -e

php artisan migrate
php artisan db:seed
php artisan passport:keys
php artisan passport:client --password --name="Frontend"

php-fpm
