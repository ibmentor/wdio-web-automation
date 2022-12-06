const { IncomingWebhook } = require('@slack/webhook');
const webhookURL = 'https://hooks.slack.com/services/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'
const webhook = new IncomingWebhook(webhookURL);
var fs = require('fs');
var SLACK_TOKEN = "xoxb-553199885814-3856271585729-eRnLcfj3yYAZ8U24WPxXC0Hw";
var SLACK_CHANNEL = "#webtech_lp_wdio_jenkins_pipeline";
const axios = require('axios');
const FormData = require('form-data');
const env = process.env.ENV

class SlackReporter {   
   
  async sendTestRunScreenshotToSlack(results) { 
    let runId = require('../Testrail/suitDetails.json') 
    let currentRunName= require('../Testrail/testRunNameDetails.json')
    runId = parseInt(runId)
    const testRunLink = `https://tnl.testrail.io/index.php?/runs/view/${runId}`
    const postMsg = `TestRun Name: ${currentRunName}\nTestRun Link: ${testRunLink}`;
    try {
      const form = new FormData()
      const url = 'https://slack.com/api/files.upload'
      form.append('token', SLACK_TOKEN)
      form.append('channels', SLACK_CHANNEL)
      form.append('file', fs.createReadStream('./testRunScreenshot/ExecutionReport.png'))
      form.append('filepath', './testRunScreenshot/ExecutionReport.png')
      form.append('initial_comment',postMsg)
      var response = await axios({
        method: 'POST',url,
        headers: {
          'authorization': `Bearer ${SLACK_TOKEN}`,
        },
        'data': form
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = SlackReporter;