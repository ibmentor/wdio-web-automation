# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions
# alpine will serve as the base image
FROM node:alpine
# The LABEL instruction adds metadata to an image
LABEL maintainer="Sowmya Chandrasekaran"
RUN apk --no-cache add \
    build-base \
    python3 \
    nodejs \
    npm \
    ffmpeg \
    && npm install -g n\
    npm stable \
    # Clean up obsolete files:
    && rm -rf \
    /tmp/* \
    /root/.npm
# RUN mkdir Learn-Portal


WORKDIR /Learn-Portal
COPY Learn-Portal/package.json /Learn-Portal
# COPY Learn-Portal/package-lock.json /Learn-Portal
# COPY . /package.json 
# The RUN instruction will execute any commands in a new layer on top of the current image and commit the results
# apk is the package manager for alpine based images
# using that installing necessary packages
# RUN npm cache clean --force \
#     rm -rf ./node_modules \
#     rm -rf ./package-lock.json \
#     npm install 
# Installing all the dependecies present in the package.json file
# RUN cd /Learn-Portal
RUN npm install \
    # Clean up obsolete files:
    && rm -rf /tmp/* /root/.npm \
    && node -v && npm -v \
    && npm install wdio-docker-service --save-dev  
COPY Learn-Portal /Learn-Portal
RUN ls -al
ENTRYPOINT ["/bin/sh", "-c", "/Learn-Portal/entrypoint.sh"]
