import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import MockTestPage from "../../Pages/MockTestPage";
import CloudWatchPage from "../../Pages/CloudWatchPage";
import LoginPage from "../../Pages/LoginPage";
import localData from "../../Data/OLAP_data/mockTest_OLAP_Data.json"
import { getUserId } from "../../utils/function"
let userID 


describe("OLAP - Mock test flow", async () => {

    it("320724 TC_01 Validate the U_event_id 9200052, m_desc click on mock aits on the burger menu", async () => {
        allure.startStep("Login to learn portal", true)
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        allure.startStep("Click on mock aits on the burger menu event triggered - 9200052",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200052",userID,localData)).toEqual(true)
    })
    
    it("320725 TC_02 Validate the U_event_id 9200053, m_desc land on mock aits home page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        allure.startStep("Land on mock aits home page event triggered - 9200053",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200053",userID,localData)).toEqual(true)
      
    })
    it("320726 TC_03 VValidate the U_event_id 9200161 m_desc ask a doubt", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        if(await MockTestPage.btnMockTestAskADoubt.isDisplayed() == true){
        await MockTestPage.btnMockTestAskADoubt.click()
        allure.startStep("button ask a doubt event triggered - 9200161",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200161",userID,localData)).toEqual(true)
    }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
      
    })
    it("320727 TC_04 Validate the U_event_id 9200162, m_desc click concept videos", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnViewConceptVideos.waitForClickable({timeout:15000})
        await MockTestPage.btnViewConceptVideos.click()
        allure.startStep("click concept videos event triggered - 92000162",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200162",userID,localData)).toEqual(true)
    })
    
    it("320728 TC_05 Validate the U_event_id 9200163, m_desc click to go to bookmarks", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnMockTestBookMarks.waitForClickable({timeout:15000})
        await MockTestPage.btnMockTestBookMarks.click()
        allure.startStep("click on bookmark button  event triggered- 9200163",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200163",userID,localData)).toEqual(true)
    })

    it("320729 TC_06 Validate the U_event_id 9200054, m_desc click on take test", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await browser.pause(3000)
        if(await MockTestPage.btnTakeTest.isDisplayed() == true){
        await MockTestPage.btnTakeTest.waitForClickable({timeout:15000})
        await MockTestPage.btnTakeTest.click()
        allure.startStep("click on take test event triggered- 9200054",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200054",userID,localData)).toEqual(true)
        }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
    })
    it("320730 TC_07 alidate the U_event_id 9200055, m_desc view instructions", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await browser.pause(3000)
        if(await MockTestPage.btnTakeTest.isDisplayed() == true){
        await MockTestPage.btnTakeTest.waitForClickable({timeout:15000})
        await MockTestPage.btnTakeTest.click()
        allure.startStep("view instructions event triggered- 9200055",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200055",userID,localData)).toEqual(true)
     }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
    })
    it("320731 TC_08 Validate the U_event_id 9200056, m_desc start test from instructions popup", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await browser.pause(3000)
        if(await MockTestPage.btnTakeTest.isDisplayed() == true){
        await MockTestPage.btnTakeTest.waitForClickable({timeout:15000})
        await MockTestPage.btnTakeTest.click()
        await MockTestPage.btnStartTest.waitForClickable({timeout:15000})
        await MockTestPage.btnStartTest.click()
        allure.startStep("start test from instructions popup event triggered- 9200056",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200056",userID,localData)).toEqual(true)
     }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
    })
    it("320732 TC_09 Validate the U_event_id 9200057, m_desc click on syllabus", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnCompleted.waitForClickable({timeout:15000})
        await MockTestPage.btnCompleted.click()
        allure.startStep("click on syllabus event triggered- 9200057",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200057",userID,localData)).toEqual(true)
    })

    it("320733 TC_10 Validate the U_event_id 9200058, m_desc view syllabus", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnCompleted.waitForClickable({timeout:15000})
        await MockTestPage.btnCompleted.click()
        if(await MockTestPage.btnViewSyllabus.isDisplayed() == true){
        await MockTestPage.btnViewSyllabus.waitForClickable({timeout:3000})
        await MockTestPage.btnViewSyllabus.click()
        allure.startStep("view syllabus event triggered  - 9200058",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200058",userID,localData)).toEqual(true)
    }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
    })
    it("320734 TC_11 Validate the U_event_id 9200059, m_desc click on completed", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnCompleted.waitForClickable({timeout:15000})
        await MockTestPage.btnCompleted.click()
        allure.startStep("click Completed event triggered  - 9200059",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200059",userID,localData)).toEqual(true)
    })
    
    it("320735 TC_12 Validate the U_event_id 9200060, m_desc click on analyse", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnCompleted.waitForClickable({timeout:15000})
        await MockTestPage.btnCompleted.click()
        await MockTestPage.btnAnalysis.waitForClickable({timeout:15000})
        await MockTestPage.btnAnalysis.click()
        allure.startStep("click analysis event triggered  - 9200060",true) 
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200060",userID,localData)).toEqual(true)
       
    })
    
    it("320736 TC_13 Validate the U_event_id 9200061, m_desc click on skipped", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnSkipped.waitForClickable({timeout:15000})
        await MockTestPage.btnSkipped.click()
        allure.startStep("click skipped event triggered - 9200061",true)   
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200061",userID,localData)).toEqual(true)
    })
    
    it("320737 TC_14 Validate the U_event_id 9201024, m_desc click on upcoming", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13],'premium')
        userID = await getUserId()
        await MockTestPage.navigateToMockTestselectSubject('JEE Main')
        await MockTestPage.btnUpcoming.waitForClickable({timeout:35000 })
        await MockTestPage.btnUpcoming.click()
        allure.startStep("Click upcoming event triggered  - 9201024",true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201024",userID,localData)).toEqual(true)
    })
  })