#!/bin/bash
set -e

php artisan migrate:refresh --seed --force -v
php artisan passport:client --password --name="Frontend"
