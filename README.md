# Test

Requisites:

- Docker

Instructions:

1. `git clone https://github.com/montogeek/testdoc.git --recursive`
2. `cd testdoc/laradock`
3. `docker-compose up -d ngnix mysql`
4. Wait ~10 mins.
5. `docker-compose exec workspace composer install`
6. `docker-compose exec workspace php artisan key:generate`
7. Create `events` database.
8. `docker-compose exec workspace php artisan migrate:refresh --seed`
9. Open [http://localhost](http://localhost)
10. Profit!