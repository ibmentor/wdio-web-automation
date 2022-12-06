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
# RUN mkdir Learn-Portal-Sample
WORKDIR /Learn-Portal
COPY package.json /Learn-Portal

COPY package-lock.json /Learn-Portal
# COPY . /package.json 
# The RUN instruction will execute any commands in a new layer on top of the current image and commit the results
# apk is the package manager for alpine based images
# using that installing necessary packages
# RUN npm cache clean --force \
#     rm -rf ./node_modules \
#     rm -rf ./package-lock.json \
#     npm install 
# Installing all the dependecies present in the package.json file
RUN cd /Learn-Portal
RUN npm install \
    # Clean up obsolete files:
    && rm -rf \
    /tmp/* \
    /root/.npm
    
RUN node -v && npm -v
RUN npm install wdio-docker-service --save-dev  
COPY . /Learn-Portal

# ENTRYPOINT [ "npm", "run","tests"]
# ENTRYPOINT ["/bin/bash"]
# The main purpose of a CMD is to provide default commands to an executing container
# CMD ['bin/sh']
# CMD ["bash","entrypoint.sh"]
# CMD ["/bin/sh"]


# The main purpose of a CMD is to provide default commands to an executing container

