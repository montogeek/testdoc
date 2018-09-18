# Test

Requisites:

- Docker

Instructions:

## Backend

- `git clone https://github.com/montogeek/testdoc.git --recursive`
- `cd testdoc/laradock`
- `docker-compose up -d ngnix mysql`
- Wait ~10 mins.
- `docker-compose exec workspace composer install`
- `docker-compose exec workspace php artisan key:generate`
- Create `events` database.
- `docker-compose exec workspace php artisan migrate:refresh --seed`
- `docker-compose exec workspace php passport:install`
- Copy both keys to `code/.env` file under `PERSONAL_CLIENT_SECRET` and `PERSONAL_CLIENT_SECRET` respectively.

## Frontend

- `cd client`
- `yarn install`
- `yarn start`
- Open [http://localhost:3000](http://localhost:3000)
- Profit!
