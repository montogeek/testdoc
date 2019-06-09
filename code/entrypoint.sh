#!/bin/sh
set -e
php artisan migrate --force
php artisan db:seed --force
php artisan passport:keys
php artisan passport:client --password --name="Frontend"

php artisan config:cache

chmod 777 -R bootstrap/cache
chmod 777 -R storage/*

php-fpm
