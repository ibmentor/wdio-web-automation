import { AllureUtil as allure } from "../../utils/util.allure"
import AITSPage from '../../Pages/AITSPage';
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage";
import CloudWatchPage from "../../Pages/CloudWatchPage";
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/AITS_OLAP_Data.json')
let userID 

describe("OLAP - AITS flow", async () => {
    it("320709 TC_01 Validate the U_event_id 9200042, m_desc click on aits on the burger menu", async () => {
        allure.startStep("Login to learn portal", true)
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.menuOption.waitForClickable({ timeout: 15000 })
        await AITSPage.menuOption.click()
        await AITSPage.btnAITS.waitForClickable({ timeout: 15000 })
        await AITSPage.btnAITS.click()
        allure.startStep("click on aits on the burger menu event triggerd - 9200042", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200042",userID,localData)).toEqual(true)
    })

    it("320714 TC_02 Validate the U_event_id 9200043, m_desc land on aits home page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSModule()
        await AITSPage.btnJeeMain.waitForClickable({ timeout: 35000 })
        await AITSPage.btnJeeMain.click()
        allure.startStep("land on aits home page event triggerd - 9200043", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200043",userID,localData)).toEqual(true)
    })

    it("320711 TC_03 Validate the U_event_id 9200158, m_desc ask a doubt", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSModule()
        await AITSPage.btnJeeMain.waitForClickable({ timeout: 35000 })
        await AITSPage.btnJeeMain.click()
        await AITSPage.btnAITSAskADoubt.waitForClickable({ timeout: 15000 })
        await AITSPage.btnAITSAskADoubt.click()
        allure.startStep("click on ask a doubt button event triggered- 9200158", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200158",userID,localData)).toEqual(true)
    })

    it("320712 TC_04 Validate the U_event_id 9200159 m_desc click concept videos", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnAITSConceptVideo.waitForClickable({ timeout: 15000 })
        await AITSPage.btnAITSConceptVideo.click()
        allure.startStep("click on concept video button - 9200159", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200159",userID,localData)).toEqual(true)

    })

    it("320713 TC_05 Validate the U_event_id 9200160, m_desc click to go to bookmarks", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnAITSBookMark.waitForClickable({ timeout: 15000 })
        await AITSPage.btnAITSBookMark.click()
        allure.startStep("click bookmarks button event triggered - 9200160", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200160",userID,localData)).toEqual(true)
    })

    it("320715 TC_06 Validate the U_event_id 9200044, m_desc click on start test", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await AITSPage.btnStartTest.click()
        allure.startStep("click on start test event triggered - 9200044", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200044",userID,localData)).toEqual(true)
    })

    it("320716 TC_07 Validate the U_event_id 9200045, m_desc view instructions", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await AITSPage.btnStartTest.click()
        allure.startStep("View instructions event triggered - 9200045", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200045",userID,localData)).toEqual(true)

    })

    it("320717 TC_08 Validate the U_event_id 9200046, m_desc start test from instructions popup", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await AITSPage.btnStartTest.click()
        await AITSPage.btnPopupStartTest.waitForClickable({ timeout: 25000 })
        await AITSPage.btnPopupStartTest.click()
        allure.startStep("start test from instructions popup event triggered - 9200046", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200046",userID,localData)).toEqual(true)
    })

    it("320718 TC_09 Validate the U_event_id 9200047, m_desc click on syllabus", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnViewSyllabus.waitForClickable({ timeout: 25000 })
        await AITSPage.btnViewSyllabus.click()
        allure.startStep("click on syllabus event triggered - 9200047", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200047",userID,localData)).toEqual(true)
    })
    it("320719 TC_10 Validate the U_event_id 9200048, m_desc view syllabus", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnViewSyllabus.waitForClickable({ timeout: 25000 })
        await AITSPage.btnViewSyllabus.click()
        allure.startStep("view syllabus event triggered - 9200048", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200048",userID,localData)).toEqual(true)
    })
    it("320720 TC_11 Validate the U_event_id 9200049, m_desc click on completed", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnCompleted.waitForClickable({ timeout: 15000 })
        await AITSPage.btnCompleted.click()
        allure.startStep("click Completed event triggered - 9200049", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200049",userID,localData)).toEqual(true)
    })

    it("320721 TC_12 Validate the U_event_id 9200050, m_desc click on view analysis", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnCompleted.waitForClickable({ timeout: 15000 })
        await AITSPage.btnCompleted.click()
        await AITSPage.btnViewAnalysis.waitForDisplayed({ timeout: 15000 })
        await AITSPage.btnViewAnalysis.click()
        allure.startStep("click View Analysis event triggered - 9200050", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200050",userID,localData)).toEqual(true)
    })

    it("320722 TC_13 Validate the U_event_id 9200051, m_desc click on skipped", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnSkipped.waitForClickable({ timeout: 15000 })
        await AITSPage.btnSkipped.click()
        allure.startStep("click skipped event triggered - 9200051", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200051",userID,localData)).toEqual(true)
    })

    it("320723 TC_14 Validate the U_event_id 9201023, m_desc click on upcoming", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[13], 'premium')
        userID = await getUserId()
        await AITSPage.navigateToAITSselectSubject('JEE Main')
        await AITSPage.btnUpcoming.waitForClickable({ timeout: 35000 })
        await AITSPage.btnUpcoming.click()
        allure.startStep("Click upcoming event triggered  - 9201023", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201023",userID,localData)).toEqual(true)
    })
})