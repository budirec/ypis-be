FROM node:18.15.0-alpine

COPY docker/start-script.sh /start-script.sh
RUN chmod -v +x /start-script.sh
WORKDIR /var/www


CMD ["/start-script.sh"]