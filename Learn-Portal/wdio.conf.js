const { updateTestrail, createRun, getRunUrl,getSections,getCaseType,getCases,getRunResult, deleteFile,waitFunction} = require("./utils/function");
import screenshotPage from './utils/screenshotPage.js'
import EmailReporter from './utils/Notifiers/EmailReporter.js'
const SlackReporter=require('./utils/Notifiers/slackReporter.js')
const slackReporter = new SlackReporter();
const logging = process.env.DEBUG ? 'debug' : 'error';
require('dotenv').config()
const baseUrl = require('./Config/Config')
const ENV = process.env.ENV
const PORT= process.env.PORT
// const PORTNumber = parseInt(PORT)
const testrailStatus = process.env.testrail
const runEnv = process.env.runEnv
const slackNotification = process.env.slackNotification
const emailNotification = process.env.emailNotification
const module = process.env.module
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
let testCount
let testCaseCount = 0
let runName=null
const fs = require('fs')
// console.log("################",require('./TotalTestCount.json'))
console.log(baseUrl[ENV],"**********Base URL***********")
if (!ENV || !['qa','uat','prod'].includes(ENV)){
    console.log("Please enter a valid ENV value : ENV = qa|uat|prod")
    process.exit()
}
let runId
if(runEnv == "local"){
    exports.config = {
        //
        // ====================
        // Runner Configuration
        // ====================
        //
        //
        // ==================
        // Specify Test Files
        // ==================
        // Define which test specs should run. The pattern is relative to the directory
        // from which `wdio` was called.
        //
        // The specs are defined as an array of spec files (optionally using wildcards
        // that will be expanded). The test for each spec file will be run in a separate
        // worker process. In order to have a group of spec files run in the same worker
        // process simply enclose them in an array within the specs array.
        //
        // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
        // then the current working directory is where your `package.json` resides, so `wdio`
        // will be called from there.
        //
        specs: [
            './test/*.js'
        ],
        // Patterns to exclude.
        exclude: [
            // 'path/to/excluded/files'
        ],
        //
        // ============
        // Capabilities
        // ============
        // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
        // time. Depending on the number of capabilities, WebdriverIO launches several test
        // sessions. Within your capabilities you can overwrite the spec and exclude options in
        // order to group specific specs to a specific capability.
        //
        // First, you can define how many instances should be started at the same time. Let's
        // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
        // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
        // files and you set maxInstances to 10, all spec files will get tested at the same time
        // and 30 processes will get spawned. The property handles how many capabilities
        // from the same test should run tests.
        //
        maxInstances: 1,
        //
        // If you have trouble getting all important capabilities together, check out the
        // Sauce Labs platform configurator - a great tool to configure your capabilities:
        // https://saucelabs.com/platform/platform-configurator
        //
        capabilities: [{
    
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
            //
            browserName: 'chrome',
            acceptInsecureCerts: true
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
        }],
        //
        // ===================
        // Test Configurations
        // ===================
        // Define all options that are relevant for the WebdriverIO instance here
        //
        // Level of logging verbosity: trace | debug | info | warn | error | silent
        logLevel: 'error',
        //
        // Set specific log levels per logger
        // loggers:
        // - webdriver, webdriverio
        // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
        // - @wdio/mocha-framework, @wdio/jasmine-framework
        // - @wdio/local-runner
        // - @wdio/sumologic-reporter
        // - @wdio/cli, @wdio/config, @wdio/utils
        // Level of logging verbosity: trace | debug | info | warn | error | silent
        // logLevels: {
        //     webdriver: 'info',
        //     '@wdio/appium-service': 'info'
        // },
        //
        // If you only want to run your tests until a specific amount of tests have failed use
        // bail (default is 0 - don't bail, run all tests).
        bail: 0,
        //
        // Set a base URL in order to shorten url command calls. If your `url` parameter starts
        // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
        // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
        // gets prepended directly.
        baseUrl: baseUrl[ENV],
        //
        // Default timeout for all waitFor* commands.
        waitforTimeout: 30000,
        //
        // Default timeout in milliseconds for request
        // if browser driver or grid doesn't send response
        connectionRetryTimeout: 120000,
        //
        // Default request retries count
        // connectionRetryCount: 0,
        //
        // Test runner services
        // Services take over a specific job you don't want to take care of. They enhance
        // your test setup with almost no effort. Unlike plugins, they don't add new
        // commands. Instead, they hook themselves up into the test process.
       services: 
        ['selenium-standalone'],
    
        // Framework you want to run your specs with.
        // The following are supported: Mocha, Jasmine, and Cucumber
        // see also: https://webdriver.io/docs/frameworks
        //
        // Make sure you have the wdio adapter package for the specific framework installed
        // before running any tests.
        framework: 'mocha',
        //
        // The number of times to retry the entire specfile when it fails as a whole
        // specFileRetries: 1,
        //
        // Delay in seconds between the spec file retry attempts
        // specFileRetriesDelay: 0,
        //
        // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
        // specFileRetriesDeferred: false,
        //
        // Test reporter for stdout.
        // The only one supported by default is 'dot'
        // see also: https://webdriver.io/docs/dot-reporter
    
    
    
        reporters: [['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            disableMochaHooks: true
        }],],
        
                
    
        
        //
        // Options to be passed to Mocha.
        // See the full list at http://mochajs.org/
        mochaOpts: {
            ui: 'bdd',
            timeout: 12000000000
        },
        //
        // =====
        // Hooks
        // =====
        // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
        // it and to build services around it. You can either apply a single function or an array of
        // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
        // resolved to continue.
        /**
         * Gets executed once before all workers get launched.
         * @param {Object} config wdio configuration object
         * @param {Array.<Object>} capabilities list of capabilities details
         */
         onPrepare:  async function (config, capabilities) {
            let suiteId = 352
            
            
            //Below methods are required to retrive the section and type id
            //await getSections('39',352)
            //await getCaseType()
    
            let sectionKeys
            let caseTypeKeys
            let section_id
            let type_id
    
            if(config.specs.length>1)
            {
    
                 sectionKeys = config.spec[0].split('\\')
                 console.log(config.spec[0])
                 caseTypeKeys = sectionKeys[sectionKeys.length-2]  
                 console.log("!!!!!!!!!!!",caseTypeKeys)
                 let caseTypeFileName = require('./utils/Testrail/TypeIdMapping.json')
                 type_id=caseTypeFileName[caseTypeKeys]
                 runName = caseTypeKeys                 
    
            }
            else{
                let sectionKeys = config.spec[0].split('\\')
                let caseTypeKeys = sectionKeys[sectionKeys.length -2]
                console.log(caseTypeKeys,"ttttttttttttttttttttttttttttttt")
                sectionKeys=sectionKeys[sectionKeys.length -1]
                sectionKeys = sectionKeys.split('_')
                sectionKeys = sectionKeys[0]
                console.log(sectionKeys)
        
                let sectionFileName = require('./utils/Testrail/SectionIdMapping.json')
                section_id=sectionFileName[sectionKeys]
        
                let caseTypeFileName = require('./utils/Testrail/TypeIdMapping.json')
                console.log("@@@@@@@@@@@@",caseTypeFileName[caseTypeKeys])
                type_id=caseTypeFileName[caseTypeKeys]
                runName = caseTypeKeys+'_'+sectionKeys
            }     
           console.log(runName,"<<<<<<<<<<<<<<<<<<<<<<")
            fs.writeFile('./utils/Notifiers/slackReporterName.json', `"${runName}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
                })
              if (testrailStatus == "y" || testrailStatus == "yes"){
                await getCases(suiteId,section_id,type_id,runName,ENV)
            }
              // await createRun(suiteId,runName,ENV)
        },
        /**
         * Gets executed before a worker process is spawned and can be used to initialise specific service
         * for that worker as well as modify runtime environments in an async fashion.
         * @param  {String} cid      capability id (e.g 0-0)
         * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
         * @param  {[type]} specs    specs to be run in the worker process
         * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
         * @param  {[type]} execArgv list of string arguments passed to the worker process
         */
        // onWorkerStart: function (cid, caps, specs, args, execArgv) {
        // },
        /**
         * Gets executed just before initialising the webdriver session and test framework. It allows you
         * to manipulate configurations depending on the capability or spec.
         * @param {Object} config wdio configuration object
         * @param {Array.<Object>} capabilities list of capabilities details
         * @param {Array.<String>} specs List of spec file paths that are to be run
         * @param {String} cid worker id (e.g. 0-0)
         */
        // beforeSession: function (config, capabilities, specs, cid) {
        // },
        /**
         * Gets executed before test execution begins. At this point you can access to all global
         * variables like `browser`. It is the perfect place to define custom commands.
         * @param {Array.<Object>} capabilities list of capabilities details
         * @param {Array.<String>} specs        List of spec file paths that are to be run
         * @param {Object}         browser      instance of created browser/device session
         */
        // before: function (capabilities, specs) {
        // },
        /**
         * Runs before a WebdriverIO command gets executed.
         * @param {String} commandName hook command name
         * @param {Array} args arguments that command would receive
         */
        // beforeCommand: function (commandName, args) {
        // },
        /**
         * Hook that gets executed before the suite starts
         * @param {Object} suite suite details
         */
        // beforeSuite: function (suite) {
        // },
        /**
         * Function to be executed before a test (in Mocha/Jasmine) starts.
         */
        // beforeTest: function (test, context) {
        // },
        /**
         * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
         * beforeEach in Mocha)
         */
        // beforeHook: function (test, context) {
        // },
        /**
         * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
         * afterEach in Mocha)
         */
        // afterHook: function (test, context, { error, result, duration, passed, retries }) {
        // },
        /**
         * Function to be executed after a test (in Mocha/Jasmine only)
         * @param {Objectf}  test             test object
         * @param {Object}  context          scope object the test was executed with
         * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
         * @param {Any}     result.result    return object of test function
         * @param {Number}  result.duration  duration of test
         * @param {Boolean} result.passed    true if test has passed, otherwise false
         * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
         */
        afterTest: async function (test, context, { error, result, duration, passed, retries }) {
            testCaseCount = testCaseCount+1
            console.log(testCaseCount,"RRRRRRRRRRRRRRRRRRRRRRRR")
            
            // fs.writeFile('./TotalTestCount.json', testCaseCount.toString(), (err) => {
            //     // In case of a error throw err.
            //     if (err) throw err;
            //     })
            let caseId = ((test.title).toString()).split(' ')
            console.log(caseId[0])
             if (!passed) {
                await browser.takeScreenshot()
                try { await browser.saveScreenshot('./utils/ss.png') } catch { }
                let completeError = error.stack
                completeError = completeError.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
                fs.readFile('./utils/Testrail/blockedScenario.json', 'utf8', function (err, data) {
                    const content = data;
                    processFile(content);
                });
                async function processFile(content) {
                    if (content.includes("blocked")) {
                        await updateTestrail(caseId[0], 2, completeError)
                    }
                    else {
                        await updateTestrail(caseId[0], 5, completeError)
                    }
                }
            }
            else if (passed) {
                await updateTestrail(caseId[0], 1)
            }
            const status = 'failed'
            await waitFunction(2000)
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })

        },
    
        /**
         * Hook that gets executed after the suite has ended
         * @param {Object} suite suite details
         */
        // afterSuite: function (suite) {
        // },
        /**
         * Runs after a WebdriverIO command gets executed
         * @param {String} commandName hook command name
         * @param {Array} args arguments that command would receive
         * @param {Number} result 0 - command success, 1 - command error
         * @param {Object} error error object if any
         *////
        // afterCommand: function (commandName, args, result, error) {
        // },
        /**
         * Gets executed after all tests are done. You still have access to all global variables from
         * the test.
         * @param {Number} result 0 - test pass, 1 - test fail
         * @param {Array.<Object>} capabilities list of capabilities details
         * @param {Array.<String>} specs List of spec file paths that ran
         */
        // after: function (result, capabilities, specs) {
        // },
        /**
         * Gets executed right after terminating the webdriver session.
         * @param {Object} config wdio configuration object
         * @param {Array.<Object>} capabilities list of capabilities details
         * @param {Array.<String>} specs List of spec file paths that ran
         */
        // afterSession: function (config, capabilities, specs) {
        // },
        /**
         * Gets executed after all workers got shut down and the process is about to exit. An error
         * thrown in the onComplete hook will result in the test run failing.
         * @param {Object} exitCode 0 - success, 1 - fail
         * @param {Object} config wdio configuration object
         * @param {Array.<Object>} capabilities list of capabilities details
         * @param {<Object>} results object containing test results
         */
         onComplete:async function(exitCode, config, capabilities, results) {
         
         },
        /**
        * Gets executed when a refresh happens
        * @param {String} oldSessionId session ID of the old session
        * @param {String} newSessionId session ID of the new session
        */
        //onReload: function(oldSessionId, newSessionId) {
        //}
    }
}
else if(runEnv == "jenkins"){
    exports.config = {
//         user: 'sowmyac_O3csFC',
//         key: 'BF3qwK3nfNn4WbyKUDvd',
//         host: 'hub.browserstack.com',
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [
        './test/Login/LoginFreeUserTest.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances:3,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
    
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 3,
        //
        browserName: 'chrome',
        // acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    // capabilities: [
    //     {
    //         browserName: 'chrome',
    //         'goog:chromeOptions': {
    //             args: [
    //                 '--no-sandbox',
    //                 '--start-fullscreen',
    //                 '--disable-infobars',
    //                 '--disable-notifications',
    //             ].concat(
    //                 process.env.SELENOID === 'true' ? [
    //                     // When debugging with Selenoid support headless mode is not enabled
    //                     // to allow viewing actions in the browser.
    //                 ] : [
    //                     '--headless',
    //                     '--disable-gpu',
    //                 ],
    //             ),
    //             prefs: {
    //                 'directory_upgrade': true,
    //                 'prompt_for_download': false,
    //             }
    //         },
    //         'selenoid:options': {
    //             enableLog: true,
    //             ...(
    //                 process.env.SELENOID === 'true' ? {
    //                     enableVNC: true,
    //                     enableVideo: true,
    //                 } : {}
    //             )
    //         }
    //     },
    // ],
//     capabilities: [{
//         maxInstances: 5,
//         'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
//         'browserstack.debug': true,
//         'browserstack.video': true,
//         'browserstack.networkLogs': true,
//         os: "Windows",
//         os_version: "11",
//         browserName: 'Chrome',
//         browser_version: "latest",
//         acceptInsecureCerts: true,
//         local:true,
//         project: "Learn Portal",
//         sessionName:'Jenkins',
//         build:process.env.BROWSERSTACK_BUILD_NAME
//       }],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: logging,
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: baseUrl[ENV],
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 300000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 1,
    
    hostname:PORT,
    port: 4444,
    path: "/",
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
//     services: [
//         ['browserstack', {
//                 browserstackLocal: true
//             }]
//         ],
     services: [
            ['Docker']
        ],
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
     specFileRetries: 0,
    //
    // Delay in seconds between the spec file retry attempts
    specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }],],

         
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 6000000000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare:  async function (config, capabilities) {
        let suiteId = 352
        
        
        //Below methods are required to retrive the section and type id
        //await getSections('39',352)
        //await getCaseType()

        let sectionKeys
        let caseTypeKeys
        let section_id
        let type_id

        if(config.specs.length>1)
        {
             sectionKeys = config.spec[0].split('\/')
             console.log(config.spec[0])
             caseTypeKeys = sectionKeys[sectionKeys.length-2] 
             console.log("!!!!!!!!!!!",caseTypeKeys)
             let caseTypeFileName = require('./utils/Testrail/TypeIdMapping.json')
             type_id=caseTypeFileName[caseTypeKeys]
             runName = caseTypeKeys                 

        }
        else{
            let sectionKeys = config.spec[0].split('\/')
            let caseTypeKeys = sectionKeys[1]
            sectionKeys=sectionKeys[sectionKeys.length -1]
            sectionKeys = sectionKeys.split('_')
            sectionKeys = sectionKeys[0]
            console.log(sectionKeys)
    
            let sectionFileName = require('./utils/Testrail/SectionIdMapping.json')
            console.log("##########")
            section_id=sectionFileName[sectionKeys]
    
            let caseTypeFileName = require('./utils/Testrail/TypeIdMapping.json')
            console.log("@@@@@@@@@@@@",caseTypeFileName[caseTypeKeys])
            type_id=caseTypeFileName[caseTypeKeys]
            runName = caseTypeKeys+'_'+sectionKeys
        }     
       
        fs.writeFile('./utils/Notifiers/slackReporterName.json', `"${runName}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
            })
          if (testrailStatus == "y" || testrailStatus == "yes"){
            await getCases(suiteId,section_id,type_id,runName,ENV)
        }
          // await createRun(suiteId,runName,ENV)
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        let caseId = ((test.title).toString()).split(' ')        
        console.log(caseId[0])      
        if (!passed) {
            await browser.takeScreenshot()
            try{await browser.saveScreenshot('./utils/ss.png')}catch{}
            let completeError = error.stack
            completeError = completeError.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'')
                fs.readFile('./utils/Testrail/blockedScenario.json', 'utf8', function (err, data) {
                    const content = data;
                    processFile(content);
                });
                async function processFile(content) {
                    if (content.includes("blocked")) {
                        await updateTestrail(caseId[0], 2, completeError)
                    }
                    else {
                        await updateTestrail(caseId[0], 5, completeError)
                    }
                }
            }
            else if (passed) {
                await updateTestrail(caseId[0], 1)
            }
            const status = 'failed'
            await waitFunction(2000)
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })

        },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
       //afterSuite: async function(test, context, { error, result, duration, passed, retries }) {

   // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
        after: async function () {
         let testRunName=await screenshotPage.takeTestRunStatusScreenshot()
         const fs=require('fs')
         fs.writeFile('./utils/Testrail/testRunNameDetails.json', `"${testRunName}"`, (err) => {
               // In case of a error throw err.
               if (err) throw err;
               })
        },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete:async function(exitCode, config, capabilities, results) {
        
        if(slackNotification=="yes")
            {
                await slackReporter.sendTestRunScreenshotToSlack(results)
            }
       if(emailNotification=="yes")
            {
                await EmailReporter.emailReporter()
            }
    },

    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
}
