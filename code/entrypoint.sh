#!/bin/sh
set -e

php artisan migrate:refresh --seed --force -v
php artisan passport:client --password --name="Frontend"

php-fpm
