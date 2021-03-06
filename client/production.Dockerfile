FROM node:10-alpine as build-deps

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn --production

# Bundle app source
COPY . /usr/src/app

RUN GENERATE_SOURCEMAP=false node --max-old-space-size=4000  ./node_modules/.bin/react-scripts build

FROM nginx:1.12-alpine
RUN rm -rf /etc/nginx/conf.d/
COPY config/default.conf /etc/nginx/conf.d/
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]