FROM node:18.15.0-alpine

COPY docker/start-script.sh /start-script.sh
RUN chmod +x start-script.sh

CMD ["/start-script.sh"]