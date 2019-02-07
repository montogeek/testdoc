#!/bin/sh
set -e

php artisan migrate --force
php artisan db:seed --force
php artisan passport:keys
php artisan passport:client --password --name="Frontend"

php-fpm
