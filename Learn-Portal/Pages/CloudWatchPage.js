import { compareOlapID, compareOlapKeys, getClowdwatchData } from "../utils/function";
import BasePage from "./BasePage";
var localData = require('../Data/OLAP_data/MonthlyExm_OLAP_Data.json')
var LearnJourneyData = require('../Data/OLAP_data/learnJourney_OLAP_Data.json')
var guidedTourData = require('../Data/OLAP_data/guidedTour_OLAP_Data.json')
var profileOLAPData = require('../Data/OLAP_data/profile_OLAP_Data.json')
var loginOLAPData = require('../Data/OLAP_data/Login_OLAP_Data.json')
var byjusClassesData = require('../Data/OLAP_data/byjusClasses_OLAP_Data.json')
var AITSData = require('../Data/OLAP_data/AITS_OLAP_Data.json')
var mockTestData = require('../Data/OLAP_data/mockTest_OLAP_Data.json')
var akashLiveClasses = require('../Data/OLAP_data/akashLiveClasses_OLAP_Data.json')
const _ = require('lodash');



class CloudWatchPage extends BasePage {

    get tfUserName() { return $("//input[@id='username']") }

    get tfPassword() { return $("//input[@id='password']") }

    get btnSignIn() { return $("//a[@class='css3button']") }



    async getAndCompareCloudwatchData(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.2,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData;
        for(let i=0;i<1000;i++){
           try{  cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        }catch{}
        }
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value2']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

    async getAndCompareCloudwatchDataPasscode(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.2,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData;
        for(let i=0;i<1000;i++){
           try{  cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        }catch{}
        }
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('string')
            delete localData[eventId]['family']
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value2']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

    async getAndCompareCloudwatchDataDashboard(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.18,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])


        if (keysOfClowdwatchData.includes('family')){
            if(typeof cloudwatchData[eventId]['family'] == 'object'){
                expect(typeof cloudwatchData[eventId]['family']).toEqual('object')
                delete localData[eventId]['family']
            }
           else{
            expect(typeof cloudwatchData[eventId]['family']).toEqual('string')
           }
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

    async getAndCompareCloudwatchDataLearnJourney(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.2,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('param6')){
            if (eventId=="9202022")
                expect (cloudwatchData[eventId]['param6']).toEqual('revisit')
            else
                expect(typeof cloudwatchData[eventId]['param6']).toEqual('number')
            delete localData[eventId]['param6']
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

    async getAndCompareCloudwatchDataAPQ(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.18,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        await compareOlapKeys(eventId,localData,cloudwatchData)
        
        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])

        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('genus')){
            expect(typeof cloudwatchData[eventId]['genus']).toEqual('number')
            delete localData[eventId]['genus']
        }
        if (keysOfClowdwatchData.includes('tribe')){
            expect(typeof cloudwatchData[eventId]['tribe']).toEqual('number')
            delete localData[eventId]['tribe']
        }

        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

    async getAndCompareCloudwatchDataCWT(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.18,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        await compareOlapKeys(eventId,localData,cloudwatchData)
        
        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('genus')){
            expect(typeof cloudwatchData[eventId]['genus']).toEqual('number')
            delete localData[eventId]['genus']
        }
        if (keysOfClowdwatchData.includes('tribe')){
            expect(typeof cloudwatchData[eventId]['tribe']).toEqual('number')
            delete localData[eventId]['tribe']
        }
        if (keysOfClowdwatchData.includes('value3')){
            expect(typeof cloudwatchData[eventId]['value3']).toEqual('number')
            delete localData[eventId]['value3']
        }
        if (keysOfClowdwatchData.includes('param1')){
            if(typeof cloudwatchData[eventId]['param1'] == 'object'){
                expect(typeof cloudwatchData[eventId]['param1']).toEqual('object')
            }
           else{
            expect(typeof cloudwatchData[eventId]['param1']).toEqual('number')
           }
        }
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param1']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }
    
    async getAndCompareCloudwatchDataConceptVideo(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.18,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)
        
        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])

        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('genus')){
            expect(typeof cloudwatchData[eventId]['genus']).toEqual('number')
            delete localData[eventId]['genus']
        }
        if (keysOfClowdwatchData.includes('tribe')){
            expect(typeof cloudwatchData[eventId]['tribe']).toEqual('number')
            delete localData[eventId]['tribe']
        }
        if (keysOfClowdwatchData.includes('counter')){
            expect(typeof cloudwatchData[eventId]['counter']).toEqual('string')
            delete localData[eventId]['counter']
        }

        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }
    async getAndCompareCloudwatchDataPrePost(eventId,user_Id,localData,family) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.2,family,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)
        
        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])

        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('string')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('genus')){
            expect(typeof cloudwatchData[eventId]['genus']).toEqual('object')
            delete localData[eventId]['genus']
        }
        if (keysOfClowdwatchData.includes('counter')){
            expect(typeof cloudwatchData[eventId]['counter']).toEqual('string')
            delete localData[eventId]['counter']
        }
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']
        delete localData[eventId]['value5']
        delete localData[eventId]['param1']


        await compareOlapID(eventId, localData, cloudwatchData)
        .then(value => {
            comparasionStatus = value[0]
            failedKey = value[1]
        })
    console.log(`All the keys matched for ${eventId}` )
    return comparasionStatus

    }
    async getAndCompareCloudwatchDataForByjusClasses(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,30,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        let typeOfFamily = typeof cloudwatchData[eventId]['family']
        if (keysOfClowdwatchData.includes('family')){
            if(typeOfFamily == 'object'){
                expect(typeof cloudwatchData[eventId]['family']).toEqual('object')
            }
           else{
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
           }
            delete localData[eventId]['family'] 
        }

        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value5']
        delete localData[eventId]['value4']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }

 async getAndCompareCloudwatchDataNudges(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,10,null,user_Id)
        await browser.pause(10000)
        let cloudwatchData = await require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes("form")) {
            expect(typeof cloudwatchData[eventId]['form']).toEqual('string')
            delete localData[eventId]['form']
        }
        if (keysOfClowdwatchData.includes("family")) {
        if (eventId == 9202128 || eventId == 9202134) {
            if (cloudwatchData[eventId]["family"] == "yes" || cloudwatchData[eventId]["family"] == "no") {
            } else {
            expect("<yes/no>").toEqual(cloudwatchData[eventId]["family"]);
            }
        }
        if (eventId == 9202129) {
            if (cloudwatchData[eventId]["family"] == "0" || cloudwatchData[eventId]["family"] == "15" || cloudwatchData[eventId]["family"] == "30" ) {
            } else {
            expect("<0/15/30>").toEqual(cloudwatchData[eventId]["family"]);
            }
        }
        if (eventId == 9202131) {
            if (cloudwatchData[eventId]["family"] == "0mins" || cloudwatchData[eventId]["family"] == "15mins" || cloudwatchData[eventId]["family"] == "30mins" ) {
            } else {
            expect("<0/15/30>").toEqual(cloudwatchData[eventId]["family"]);
            }
        }
        delete localData[eventId]["family"];
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }
    
    async getAndCompareCloudwatchDataAlertPopup(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,30,null,user_Id)
        await browser.pause(5000)
        for(let i=0;i<10000;i++){
        i=i
        }
        let cloudwatchData = await require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        console.log("*********************************************",cloudwatchData,"******&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param1']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value5']
        delete localData[eventId]['value4']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }
    async getAndCompareCloudwatchDataMonthlyExam(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.2,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData;
        for(let i=0;i<1000;i++){
           try{  cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        }catch{}
        }
        delete localData[eventId]['param8']
        delete cloudwatchData[eventId]['param8']
        await compareOlapKeys(eventId,localData,cloudwatchData)

        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])
        
        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('number')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('variety')){
            if (cloudwatchData[eventId]['variety'] == "premium_byjus_class_active_user" || cloudwatchData[eventId]['variety'] == "premium_byjus_class_expired_user" || cloudwatchData[eventId]['variety'] == "parity_active_user" || cloudwatchData[eventId]['variety'] == "parity_expired_user" || cloudwatchData[eventId]['variety'] == "free_user")
            {expect(typeof cloudwatchData[eventId]['variety']).toEqual('string')
            delete localData[eventId]['variety']
        }
            else{
                expect("Variety mismatched").toEqual()
            }
        }
        
        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }async getAndCompareCloudwatchDataCalendar(eventId,user_Id,localData) {
        let comparasionStatus
        let failedKey
        await getClowdwatchData(eventId,0.18,null,user_Id)
        await browser.pause(5000)
        let cloudwatchData = require(`../olapDataCloudwatch/olapClowdwatchData${eventId}.json`)
        await compareOlapKeys(eventId,localData,cloudwatchData)
        
        let keysOfClowdwatchData = Object.keys(cloudwatchData[eventId])

        if (keysOfClowdwatchData.includes('family')){
            expect(typeof cloudwatchData[eventId]['family']).toEqual('string')
            delete localData[eventId]['family']
        }
        if (keysOfClowdwatchData.includes('genus')){
            if(typeOfGenus == 'object'){
                expect(typeof cloudwatchData[eventId]['genus']).toEqual('object')
            }
           else{
            expect(typeof cloudwatchData[eventId]['genus']).toEqual('number')
           }
            delete localData[eventId]['genus'] 
        }
        if (keysOfClowdwatchData.includes('tribe')){
            expect(typeof cloudwatchData[eventId]['tribe']).toEqual('string')
            delete localData[eventId]['tribe']
        }

        delete localData[eventId]['user_id']
        delete localData[eventId]['date']
        delete localData[eventId]['session_id']
        delete localData[eventId]['param7']
        delete localData[eventId]['param8']
        delete localData[eventId]['record']
        delete localData[eventId]['device_id']
        delete localData[eventId]['genus']
        delete localData[eventId]['tribe']
        delete localData[eventId]['species']
        delete localData[eventId]['value3']
        delete localData[eventId]['value1']
        delete localData[eventId]['app_id']

        await compareOlapID(eventId, localData, cloudwatchData)
            .then(value => {
                comparasionStatus = value[0]
                failedKey = value[1]
            })
        console.log(`All the keys matched for ${eventId}` )
        return comparasionStatus

    }


}
export default new CloudWatchPage();
