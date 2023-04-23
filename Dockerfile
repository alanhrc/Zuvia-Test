FROM node:16.13.2-alpine

ARG DK_UID=1000

ARG DK_GID=1000

RUN apk --no-cache add shadow && \
    usermod -u ${DK_UID:-1000} node && \
    groupmod -g ${DK_GID:-1000} node

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
