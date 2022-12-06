import Testrail from 'testrail-api'
import supertest from 'supertest'
import { loginProdData } from '../Data/LoginProdData'
const AWS = require('aws-sdk')

export function get33PercentageOfYoutubeVideo(videoTime) {  
    const splittime = videoTime.split('/')
    let totalTime = splittime[1].split(':')
    let popUpTimeSecond = (parseInt(totalTime[0]) * 60 + parseInt(totalTime[1])) * .33
    let popUpTime =
        Math.floor(popUpTimeSecond / 60) + ":" + Math.ceil(popUpTimeSecond % 60 ? popUpTimeSecond % 60 : '00')
    popUpTime = popUpTime + " "
    let tenSecondsButtomPressCount = parseInt(Math.floor(popUpTimeSecond / 10))
    return tenSecondsButtomPressCount
}
export function get33PercentageOfYoutubeVideoForOlap(videoTime) {  
    const splittime = videoTime.split('/')
    let totalTime = splittime[1].split(':')
    let popUpTimeSecond = (parseInt(totalTime[0]) * 60 + parseInt(totalTime[1])) * .99
    let popUpTime =
        Math.floor(popUpTimeSecond / 60) + ":" + Math.ceil(popUpTimeSecond % 60 ? popUpTimeSecond % 60 : '00')
    popUpTime = popUpTime + " "
    let tenSecondsButtomPressCount = parseInt(Math.floor(popUpTimeSecond / 10))
    return tenSecondsButtomPressCount
}
export function stringToChar(input) {
    var arr = []
    for (var i = 0; i < input.length; i++) {
        arr.push(input.charAt(i))
    }
    return arr
}
export async function updateTestrail(caseId, status, error) {
    let runId = require('./Testrail/suitDetails.json')
    runId = parseInt(runId)
    try { error = error.toString() }
    catch { }
    caseId = parseInt(caseId)
    var testrail = new Testrail({
        host: "https://tnl.testrail.io",
        user: "sowmya.chandrasekaran@byjus.com",
        password: "Testrail@123",
    });
    let resultId
    if (status == 5) {
        await testrail.addResultForCase(runId, caseId, { status_id: 5, comment: error })
            .then(function (result) {
                resultId = result.body['id']
            }).catch(function (error) {
                console.log('error', error.message);
            });
        const request = supertest("https://tnl.testrail.io/index.php?/api/v2")
        await request
            .post(`/add_attachment_to_result/${resultId}`)
            .set("Authorization", "Basic " + ("dGhhbGVzaC5rYXNoeWFwQGJ5anVzLmNvbTpUZXN0cmFpbEAxMjM="))
            .set("Content-Type", "application/json")
            .attach("attachment", process.cwd() + '/utils/ss.png')
            .then(async (response) => {
                console.log(response.body);
            })
    }
    else if (status == 2) {
        await testrail.addResultForCase(runId, caseId, { status_id: 2, comment: error })
            .then(function (result) {
                resultId = result.body['id']
            }).catch(function (error) {
                console.log('error', error.message);
            });
        const request = supertest("https://tnl.testrail.io/index.php?/api/v2")
        await request
            .post(`/add_attachment_to_result/${resultId}`)
            .set("Authorization", "Basic " + ("dGhhbGVzaC5rYXNoeWFwQGJ5anVzLmNvbTpUZXN0cmFpbEAxMjM="))
            .set("Content-Type", "application/json")
            .attach("attachment", process.cwd() + '/utils/ss.png')
            .then(async (response) => {
                console.log(response.body);
            })
    }
    else if (status == 1) {
        await testrail.addResultForCase(runId, caseId, { status_id: 1, comment: "Passed" })

    }
}

export async function createRun(suiteId,case_id, runName,env) {

    var testrail = new Testrail({
        host: "https://tnl.testrail.io",
        user: "sowmya.chandrasekaran@byjus.com",
        password: "Testrail@123",
    });
    let currentRunId  
    let data
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
    if(case_id.length>1)
    {
        data = { suite_id: suiteId, name: "Learn Portal 2.0_"+runName+"_"+env+"_"+date, include_all: false,case_ids:case_id}
    } 
    else
    {
        data = { suite_id: suiteId, name: "Learn Portal 2.0_"+runName+"_"+env+"_"+date, include_all: true}
    
    }      
        await testrail.addRun('39',data)
    .then(function (result) {
      console.log("#####################################")
       currentRunId = (result.body['id'])      
     console.log("$$$$$$$",currentRunId)
     });
    const fs = require('fs')    
    fs.writeFile('./utils/Testrail/suitDetails.json', currentRunId.toString(), (err) => {    
        // In case of a error throw err.
        if (err) throw err;
    }) 
}
export async function compareOlapID(eventID,localData,cloudWatchData) {
    // let cloudWatchData = cloudWatchData
    // let localData =localData
    let keysOfLocalData = Object.keys(localData[eventID])
    let keysOfClowdwatchData = Object.keys(cloudWatchData[eventID])
    keysOfLocalData = keysOfLocalData.sort()
    keysOfClowdwatchData = keysOfClowdwatchData.sort()
    let failedKey
    for (let i = 0; i < keysOfLocalData.length; i++) {
        if (localData[eventID][keysOfLocalData[i]] == cloudWatchData[eventID][keysOfLocalData[i]]) {
            console.log("Key matched for '" + keysOfLocalData[i] + "'")
        }
        else {
            var x = JSON.stringify(localData[eventID][keysOfLocalData[i]])
            var y = JSON.stringify(cloudWatchData[eventID][keysOfLocalData[i]])
            try{
                x = x.replace(" ", "")
                y = y.replace(" ", "")
            }
            catch{}
            if (x == y) {
                console.log("Key matched for '" + keysOfLocalData[i] + "'")
            }
            else {
                failedKey = keysOfLocalData[i]
                console.log("Key didn't matched for '" + keysOfLocalData[i] + "'")
                try{x = x.replace('"','')
                x = x.replace('"','')
                y = y.replace('"','')
                y = y.replace('"','')}catch{}
                let receivedData = `${keysOfLocalData[i]} key --> Local Data - ${x} == Cloudwatch Data - ${y}`
                let expectedData = `${keysOfLocalData[i]} key --> Local Data - ${x} == Cloudwatch Data - ${x}`
                expect(receivedData).toEqual(expectedData)
            }
        }
    }
    if (failedKey == null) {
        // console.log("Everything matched")
        return [true, failedKey]
    }
    else if (failedKey != null) {
        // console.log(failedKey)
        return [false, failedKey]
    }
    
}

export async function getSections(project_id, suite_id) {

    let resultId
    var testrail = new Testrail({
        host: "https://tnl.testrail.io",
        user: "sowmya.chandrasekaran@byjus.com",
        password: "Testrail@123",
    });
    testrail.getSections(39, { suite_id: 352 },).then(function (result) {
        console.log("#######################3")
        console.log(result.body['sections'])
    }).catch(function (error) {
        console.log('error', error.message);
    });
}

export async function getCaseType() {

    var testrail = new Testrail({
        host: "https://tnl.testrail.io",
        user: "sowmya.chandrasekaran@byjus.com",
        password: "Testrail@123",
    });
    console.log(await testrail.getCaseTypes())
}

export async function getCases(suiteId, sectionId, typeId, runName, env) {
    var testrail = new Testrail({
        host: "https://tnl.testrail.io",
        user: "sowmya.chandrasekaran@byjus.com",
        password: "Testrail@123",
    });
    let caseIdArr = []
    let filters
    // function for getting the Case Id and push that to an array to create a run
    async function getCaseIdArray(filters){
        let x = (await testrail.getCases('39', filters)).body['cases']
            console.log(x.length,"|||||||||||||||||||||||||||||||") 
            for (let i = 0; i < x.length; i++) {
                if(typeId == 11){   //Smoke Suit=11
                    if (x[i].custom_merged_case == 1 || x[i].custom_merged_case == 2){
                        let caseId = x[i].id
                        caseIdArr.push(caseId)
                        // console.log("??",caseIdArr,"??")
                    }
                }
                else if(typeId == 9 || typeId == 18){   //Regression suit=9, Olap Suit=18
                    if (x[i].custom_merged_case == 1){
                        let caseId = x[i].id
                        caseIdArr.push(caseId)
                        // console.log("??",caseIdArr,"??")
                    }
                }
            } 
    }

    if (typeof sectionId == "undefined"){
        let sectionId = require('./Testrail/SectionIdMapping.json')
        let sectionIDName = Object.keys(sectionId)
        for (let i=0; i<sectionIDName.length;i++){
            console.log(sectionIDName[i]," = ",sectionId[sectionIDName[i]],"---------------------")
            filters = { suite_id: suiteId, section_id: sectionId[sectionIDName[i]], type_id: typeId}
            await getCaseIdArray(filters)
        }
    }
    else if (typeof sectionId != "undefined"){
        filters = { suite_id: suiteId, section_id: sectionId, type_id: typeId }
        await getCaseIdArray(filters)
    }

    console.log(caseIdArr.length,"===========================")
    await createRun(suiteId, caseIdArr, runName, env)
}

export function getRandomNum(lengthOfString=10) {
    let date = new Date();
    let currentTime = date.getTime();
    currentTime=currentTime.toString();
    let len = currentTime.length;
    len = len-lengthOfString;
    currentTime = parseInt( '3'+currentTime.slice(len+1));
    return currentTime;
    }

export async function updateNumberInProdData(freeNumber){
    const fs = require('fs')
    fs.writeFile('loginProdFreeNumber.json', freeNumber.toString(), (err) => {    
        // In case of a error throw err.
        if (err) throw err;
    }) 
    console.log(loginProdData.validData.validPhoneNumber)
}
export async function getClowdwatchData(eventId, min, family=null,userId=null) {
   
    let appId
    var params
    if (process.env.ENV == "prod"){
        appId = 23
    }
    else{
        appId = 123
    }
    const cloudwatchlogs = new AWS.CloudWatchLogs({
        accessKeyId: "AKIAY7P2CE2WD6PURJXK",
        secretAccessKey: "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",
        region: "ap-southeast-1"
    });
    var currentdate = new Date()
    let currentTime = currentdate.getTime() 
    if(min < 0.3){
        await browser.pause(min * 60000)
    }
    if (userId != null){
        if (family != null){
        params = {
            logGroupName: '/ecs/tnlstats',
            filterPattern: `{$.app_id=${appId} && $.u_event_id=${eventId.slice(0,7)} && $.family=${family} && $.user_id=${userId}}`,
            limit: 1,
            startTime: (currentTime - min * 60000)
        }; 
        }
        else{
            params = {
                logGroupName: '/ecs/tnlstats',
                filterPattern: `{$.app_id=${appId} && $.u_event_id=${eventId.slice(0,7)} && $.user_id=${userId}}`,
                limit: 1,
                startTime: (currentTime - min * 60000)
            };
        }
    }
    else{
        if (family != null){
            params = {
                logGroupName: '/ecs/tnlstats',
                filterPattern: `{$.app_id=${appId} && $.u_event_id=${eventId.slice(0,7)} && $.family=${family}}`,
                limit: 1,
                startTime: (currentTime - min * 60000)
            }; 
            }
            else{
                params = {
                    logGroupName: '/ecs/tnlstats',
                    filterPattern: `{$.app_id=${appId} && $.u_event_id=${eventId.slice(0,7)}}`,
                    limit: 1,
                    startTime: (currentTime - min * 60000)
                };
            }
    }
    cloudwatchlogs.filterLogEvents(params, function (err, data) {
        if (err) {
        console.log(err, err.stack);
        }
        else {
            if (data['events'][0]!= null){
                data = data['events'][0]['message'];
                data = data.substring(data.indexOf('{'))
                console.log(data)
                // data = (data[1])
                const fs = require('fs')
                fs.writeFile(`olapDataCloudwatch/olapClowdwatchData${eventId}.json`, `{"${eventId}":${data.toString()}}`, (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
            }
            else{
                console.error(`***************No data available for ${eventId} id.***************`);
                const fs = require('fs')
                fs.writeFile(`olapDataCloudwatch/olapClowdwatchData${eventId}.json`, ' ', (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
                expect(``).toEqual(`No data available for ${eventId} id.`)
            }
        }
    });
}

export async function compareOlapKeys(eventID,localData,cloudWatchData) {
    let keysOfLocalData = Object.keys(localData[eventID])
    let keysOfClowdwatchData = Object.keys(cloudWatchData[eventID])
    let comparisionResult = []
    let additionalKeyCloudwatchData = []
    keysOfLocalData = keysOfLocalData.sort()
    keysOfClowdwatchData = keysOfClowdwatchData.sort()
    console.log("Local Data - ",keysOfLocalData.length,' == ',"Clowdwatch Data - ",keysOfClowdwatchData.length)
    if (keysOfLocalData.length == keysOfClowdwatchData.length){
        for(let i=0;i<keysOfLocalData.length;i++){
            if(keysOfClowdwatchData.includes(keysOfLocalData[i])){
            }
            else{
                comparisionResult.push(keysOfLocalData[i])
                console.log("*****Key ",keysOfLocalData[i]," is not present in Cloudwatch data*****")
            }
            if(keysOfLocalData.includes(keysOfClowdwatchData[i])){
            }
            else{
                additionalKeyCloudwatchData.push(keysOfClowdwatchData[i])
                console.log("*****Key ",keysOfClowdwatchData[i]," is not present in Local data*****")
            }
        }
    }
    else{
        console.error("*******Key mismatched*******")
        // let receivedData = `Local Data - ${keysOfLocalData.length} == Clowdwatch Data - ${keysOfClowdwatchData.length}`
        // let expectedData = `Local Data - ${keysOfLocalData.length} == Clowdwatch Data - ${keysOfLocalData.length}`
        if(keysOfClowdwatchData.length>keysOfLocalData.length){
            for(let i=0;i<keysOfClowdwatchData.length;i++){
                if(keysOfLocalData.includes(keysOfClowdwatchData[i])){
                }
                else{
                    comparisionResult.push(keysOfClowdwatchData[i])
                    console.log("*****Key ",keysOfClowdwatchData[i]," is not present in Local data*****")
                }
            }
            if (comparisionResult.length != 0){
                expect("Additional keys present in cloudwatch data - "+comparisionResult).toEqual('')
            }
        }
        else{
            for(let i=0;i<keysOfLocalData.length;i++){
                if(keysOfClowdwatchData.includes(keysOfLocalData[i])){
                }
                else{
                    comparisionResult.push(keysOfLocalData[i])
                    console.log("*****Key ",keysOfLocalData[i]," is not present in Cloudwatch data*****")
                }
            }
            if (comparisionResult.length != 0){
                expect("List of key not present in Cloudwatch data - "+comparisionResult).toEqual('')
            }
        }
        
        // expect(receivedData).toEqual(expectedData)
    }
    if (comparisionResult.length != 0){
        expect("1.List of key not present in cloudwatch data - "+comparisionResult+"\n2.List of key not present in local data - "+additionalKeyCloudwatchData).toEqual('')
    }
}
export async function deleteFile() {
    const fs = require('fs');
  
    var folder = './olapDataCloudwatch/';
    
    fs.readdir(folder, (err, files) => {
    if (err) throw err;
    
    for (const file of files) {
        console.log(file + ' : File Deleted Successfully.');
        fs.unlinkSync(folder+file);
    }
  
});
}

export async function getUserId(){
    
    let currentPageUrl=await browser.getUrl()
    
    const output = await browser.mock('**/centers', { method: 'get'})
    await browser.url(currentPageUrl)
    await browser.pause(5000)
    var json_data = output.calls[0].headers;
    var result = [];
    
    for (var i in json_data)
    result.push([i, json_data[i]]);
    let userID =result[9].toString().replace("x-tnl-user-id,","")
    console.log(userID)
    return userID;
}
export async function waitFunction(time) {
    
    await browser.pause(time)
    
  }
  
export async function checkLazyLoadingImgCount(url){
    await browser.navigateTo(url)
    await browser.pause(2000)
    let ImgCountAtStartingOfPage=await $$("//img").length
    await browser.pause(2000)
    await browser.keys(["End"])
    await browser.pause(5000)
    let ImgCountAtEndOfPage=await $$("//img").length
    expect(ImgCountAtEndOfPage).toBeGreaterThan(ImgCountAtStartingOfPage)  
    
    
}

export async function checkLazyLoadingImgCountEqualValue(url){
    await browser.navigateTo(url)
    await browser.pause(2000)
    let ImgCountAtStartingOfPage=await $$("//img").length
    await browser.pause(2000)
    await browser.keys(["End"])
    await browser.pause(5000)
    let ImgCountAtEndOfPage=await $$("//img").length
    console.log("ImgCountAtStartingOfPage - ",ImgCountAtStartingOfPage,"ImgCountAtEndOfPage = ",ImgCountAtEndOfPage)
    expect(ImgCountAtEndOfPage).toBeGreaterThanOrEqual(ImgCountAtStartingOfPage)
}

export async function ConceptVideoBanner(){
    const ConceptVideoTitle =  $("//p[contains(text(),'Watch & learn from')]")
    const ConceptVideoDescription = $("//p[normalize-space()='Learn the concepts from our expert teachers']")
    const ConceptVideoBtnTxt = $("//button[normalize-space()='View Concept Videos']")
    await ConceptVideoTitle.waitForDisplayed({timeout:5000})
    await expect(ConceptVideoTitle).toHaveText("Watch & learn from video lessons")
    await expect(ConceptVideoDescription).toHaveText("Learn the concepts from our expert teachers")
    await expect(ConceptVideoBtnTxt).toHaveText("View Concept Videos")
}

export async function AskADoubtBanner(){
    const AskADoubtTitle =  $("//p[normalize-space()='Find answers to your questions']")
    const AskADoubtDescription = $("//p[normalize-space()='View FAQs & clarify your doubts']")
    const AskADoubtBtnTxt = $("//button[normalize-space()='Ask a Doubt']")
    await AskADoubtTitle.waitForDisplayed({timeout:5000})
    await expect(AskADoubtTitle).toHaveText("Find answers to your questions")
    await expect(AskADoubtDescription).toHaveText("View FAQs & clarify your doubts")
    await expect(AskADoubtBtnTxt).toHaveText("Ask a Doubt")
}

export async function DashboardGreetTxt(){
    const txtGreet = $("//p[contains(text(),'Let’s get started with BYJU’S Learning Experience')]")
    await txtGreet.waitForDisplayed({timeout:50000})
    await expect(txtGreet).toHaveText("Let’s get started with BYJU’S Learning Experience")
}
export async function getHeaders(){

    let currentPageUrl=await browser.getUrl()
    const output = await browser.mock('**/centers', { method: 'get'})
    await browser.url(currentPageUrl)
    await browser.pause(5000)
    var json_data = output.calls[0].headers;
    var result = [];
    for (var i in json_data)
    result.push([i, json_data[i]]);
    let userID =result[9].toString().replace("x-tnl-user-id,","")
    let appID =result[4].toString().replace("X-TNL-APPID,","")
    let tnlToken =result[5].toString().replace("X-TNL-TOKEN,","")
    var headers = [userID,appID,tnlToken]
    console.log("headers",headers)
    return headers;
}