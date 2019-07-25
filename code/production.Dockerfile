FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
# RUN apt-get update -y
# RUN apt-get install software-properties-common -y
# RUN add-apt-repository ppa:git-core/ppa -y
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    maria-client \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents
COPY . /var/www
COPY .env.production /var/www/.env

RUN mkdir -p /var/www/vendor
RUN rm /var/www/bootstrap/cache/* || true

RUN composer install \
    --optimize-autoloader \
    --no-dev \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist

# Expose port 9000 and start php-fpm server
EXPOSE 9000

ENTRYPOINT ["/var/www/entrypoint.sh"]
