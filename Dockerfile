FROM node:18-alpine

ARG GITHUB_TOKEN
WORKDIR /data/app
ADD . /data/app

RUN \
    apk add --no-cache --virtual=build-dependencies git && \
    echo "@deeepvision:registry=https://npm.pkg.github.com" >> .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    npm install && \
    npm run build && \
    npm cache clean --force && \
    apk del --no-cache build-dependencies

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start:prod"]
