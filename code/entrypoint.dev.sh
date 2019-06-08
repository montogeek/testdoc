#!/bin/sh
set -e
php artisan migrate --force
php artisan db:seed --force
php artisan passport:keys
php artisan passport:client --password --name="Frontend"

php artisan serve --host 0.0.0.0 --port=9000
