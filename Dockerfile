FROM node:20-alpine

ARG GITHUB_TOKEN
ARG NPM_TOKEN
WORKDIR /data/app
ADD . /data/app

RUN \
    apk add --no-cache --virtual=build-dependencies git && \
    # @deeepvision registry
    echo "@deeepvision:registry=https://npm.pkg.github.com" >> .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    # @deep registry
    echo "@deep:registry=https://us-npm.pkg.dev/deepops/deep/" >> .npmrc && \
    echo "//us-npm.pkg.dev/deepops/deep/:always-auth=true" >> .npmrc && \
    echo "//us-npm.pkg.dev/deepops/deep/:_authToken=${NPM_TOKEN}" >> .npmrc && \
    npm install && \
    npm run build && \
    npm cache clean --force && \
    apk del --no-cache build-dependencies

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start:prod"]
