import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import DashboardPage from "../../Pages/DashboardPage"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/Downloads_OLAP_Data.json')
let userID


describe("OLAP - Download Module", async () => {

    it("320451 TC_01 Validate the U_event_id 9200103, m_desc Click to go to Downloads on burger Menu", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Click to go to Downloads on burger menu event triggred - 9200103", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200103",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320452 TC_02 Validate the U_event_id 9200104, m_desc view Downloads home page", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("View Downloads home page event triggred - 9200104", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200104",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320455 TC_03 Validate the U_event_id 9200105, m_desc Click on subject", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByCount(1).click()
        allure.startStep("Click on subject event triggred - 9200105", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200105",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320457 TC_04 Validate the U_event_id 9200107, m_desc Select papers", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.ddPapers.click()
        await browser.keys(["pre","Tab"])
        allure.startStep("Select Papers event triggred - 9200107", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200107",userID,localData)).toEqual(true)
        allure.endStep()
    })
        
    it("320458 TC_05 Validate the U_event_id 9200108, m_desc Click on search button", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByCount(1).click()
        await DownloadsPage.btnSearch.click()
        allure.startStep("Click on search button event triggred - 9200108", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200108",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320463 TC_06 Validate the U_event_id 9200113, m_desc view search results", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByCount(1).click()
        await DownloadsPage.btnSearch.click()
        allure.startStep("View search results event triggred - 9200113", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200113",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320459 TC_07 Validate the U_event_id 9200109, m_desc Click on download", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.downloadBtnPopularDownloadsCards("1").click()
        allure.startStep("Click on download event triggred - 9200109", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200109",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320460 TC_08 Validate the U_event_id 9200110, m_desc Click on bookmark", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.btnBookmarkPopularDownloads.scrollIntoView()
        await DownloadsPage.btnBookmarkPopularDownloads.click()
        allure.startStep("Click on bookmark event triggred - 9200110", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200110",userID,localData)).toEqual(true)
        allure.endStep()
    })    

    it("320454 TC_09 Validate the U_event_id 9200166, m_desc Click concept Videos", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.btnConceptVideo.waitForClickable({ timeout: 3000 })
        await DownloadsPage.btnConceptVideo.click()
        allure.startStep("Click concept videos event triggred - 9200166", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200166",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320453 TC_10 Validate the U_event_id 9200165, m_desc ask a doubt", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        userID = await getUserId()
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.btnAskaDoubt.waitForDisplayed({ timeout: 7000 })
        await DownloadsPage.btnAskaDoubt.click()
        allure.startStep("Ask a doubt event triggred - 9200165", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200165",userID,localData)).toEqual(true)
        allure.endStep()
    })

})