FROM nginx:alpine

COPY . /var/www
COPY ./nginx/conf.d/ /etc/nginx/conf.d/

CMD nginx -g "daemon off;"
