echo "npx cross-env ENV=${ENV} testrail=${TESTRAIL} runEnv=${RUN_ENV} slackNotification=${SLACK_NOTIFICATION} wdio run ./wdio.conf.js --spec test/${SUITE}/*.js"
npx cross-env ENV=${ENV} PORT='selenium-hub.qa-automation.svc.cluster.local' testrail=${TESTRAIL} runEnv=${RUN_ENV} slackNotification=${SLACK_NOTIFICATION} wdio run ./wdio.conf.js --spec test/${SUITE}/*.js
