CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Packages


INTRODUCTION
---------------------
---------------------

This Project contains the automation code for Learn Portal Project.

Current Maintainer:<gauri.gupta2@byjus.com> <prasanna.hr@byjus.com> <sowmya.chandrasekaran@byjus.com>


INSTALLATION
-------------------------
-------------------------
WDIO Config helper :

Where do you want to execute your tests? Local
What is the IP or URI to your selenium standalone server ? IP config
What is the port which your selenium standalone server is running on ? Skip this question
Which framework do you want to use? Mocha
which browser you want to use? Chrome
Which reporter do you want to use? Allure
What is the base url? Skip this question

***BASIC COMMANDS - NPM and GIT***

NPM Commands
-----------------------------
-----------------------------
npm i	                                                      -- Alias for npm install
npm install	                                                -- Install everything in package.json

Git Commands
----------------------------
----------------------------
Config commands
git config                                                  -- To set the git config.

git config --global user.name “prabhu”                      --  Configures user name
git config --global user.email “prabhu.sites@gmail.com”     --  Configures email id

git init{repo-name}                                         -- To start a new repository.
git clone {repo-url}                                        -- To clone the git repo
git branch                                                  -- List down all the branches
git status                                                  -- List down all the untracked changes

git add *                                                   -- To add all the modified files
gt add filename                                             -- To add the specified file
git commit -m “{commit message}”                            -- To commit the changes
git push --set-upstream origin feature_branch               -- To push the changes to master branch
git pull origin feature_branch                              -- Merges the change from master to loacal branch                        


PACKAGES
-----------------------------------
-----------------------------------
This repository contains some of the core packages of the WebdriverIO project.

CORE

[webdriver](https://github.com/webdriverio/webdriverio/tree/main/packages/webdriver)     - A Node.js bindings implementation for the W3C WebDriver and Mobile JSONWire Protocol
[devtools](https://github.com/webdriverio/webdriverio/tree/main/packages/devtools)       - A Chrome DevTools protocol binding that maps WebDriver commands into Chrome DevTools commands using Puppeteer
[webdriverio](https://github.com/webdriverio/webdriverio/tree/main/packages/webdriverio) - Next-gen browser and mobile automation test framework for Node.js
[@wdio/cli](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cli)      - A WebdriverIO testrunner command line interface


Helper

[@wdio/config](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-config)      - A helper utility to parse and validate WebdriverIO options
[@wdio/logger](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-logger)      - A helper utility for logging of WebdriverIO packages
[@wdio/reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-reporter)  - A WebdriverIO utility to help reporting all events
[@wdio/runne](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-runner)       - A WebdriverIO service that runs tests in arbitrary environments
[@wdio/sync](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sync)          - A WebdriverIO plugin. Helper module to run WebdriverIO commands synchronously
[@wdio/utils](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-utils)        - A WDIO helper utility to provide several utility functions used across the project

Reporter

[@wdio/allure-reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-allure-reporter) - A WebdriverIO reporter plugin to create Allure Test Reports

Services

[@wdio/devtools-service](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-devtools-service) - A WebdriverIO service that allows you to run Chrome DevTools commands in your tests
[@wdio/selenium-standalone-service](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-selenium-standalone-service) - A WebdriverIO service that automatically sets up a selenium standalone server

Runner

[@wdio/local-runner](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-local-runner) - A WebdriverIO runner to run tests locally

Framework Adapters

[@wdio/mocha-framework](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-mocha-framework) - Adapter for Mocha testing framework

