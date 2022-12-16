
import JiraApi from 'jira-client';
class JiraReporter{

    async createJiraTicket() {
        var jira = new JiraApi({
            protocol: 'https',
            host:'xxxx.atlassian.net/',
            username: 'xxxx@infobeans.com',
            password: 'password',
            apiVersion: '2',
            strictSSL: true
        });

        var fs = require('fs');
        fs.readFile('./Results/results.json', 'utf8', async function (err, data) {
            if (err) throw err; // we'll not consider error handling for now
            var jsonData = JSON.parse(data);
            let tests = jsonData.suites[0].tests
            var finalResult = {};
            for (var i = 0; i < tests.length; i++) {
                var obj = tests[i];
                if (obj['error']) {
        
                    var exists = Object.values(finalResult).includes(obj['error'])
                    if (!exists) {
                        finalResult[obj['name']] = obj['error']
                       
                    }
                }
            }
        
            Object.keys(finalResult).forEach(async function(key) {
        
                 var options = {
                    "fields": {
                        "project": {
                            "key": "SAM"  //We need to give only key name of the project 
                        },
                        "summary": key,  //Test Case Name
                        "description": finalResult[key], //Error Message
                        "issuetype": {
                            "name": "Bug"
                        }
                    }

                }
                 await jira.addNewIssue(options);
    
            })

        })
         
    
    }
}


export default new JiraReporter();