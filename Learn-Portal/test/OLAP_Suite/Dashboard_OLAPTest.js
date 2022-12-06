import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import LoginPage from "../../Pages/LoginPage"
import DashboardPage from "../../Pages/DashboardPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { loginData } from "../../Data/LoginData"
import { deleteFile, getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/dashboard_OLAP_Data.json')
let userID


describe("OLAP - Dashboard Module", async () => {

    it('320489 TC_01 Validate the U_event_id 9200013, m_desc Land on homepage dashboard', async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        userID = await getUserId()
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200013", userID, localData)).toEqual(true)
    });

    it("320491 TC_03 Validate the U_event_id 9200015, m_desc Click on active buttons in marketing banner", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep("Click active button in the marketing banner event triggred - 9200015", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataDashboard("9200015", userID, localData)).toEqual(true)

    })

    it('320495 TC_05 Validate the U_event_id 9200017, m_desc click on video to play', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await DashboardPage.videoCardUnderwatchVideoSection.waitForDisplayed({ timeout: 85000 })
        await DashboardPage.videoCardUnderwatchVideoSection.scrollIntoView(true)
        await DashboardPage.videoCardUnderwatchVideoSection.click()
        allure.startStep("click on video to play event triggred - 9200017", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200017", userID, localData)).toEqual(true)

    });

    it('320496 TC_06 Validate the U_event_id 9200018, m_desc click on view all for videos', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await DashboardPage.btnConceptVideosViewAll.waitForDisplayed({ timeout: 85000 })
        await DashboardPage.btnConceptVideosViewAll.click()
        allure.startStep("click on view all for videos event triggred - 9200018", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200018", userID, localData)).toEqual(true)

    });

    it('334202 TC_07 Validate the U_event_id 9110408, m_desc click on download app', async () => {
        allure.startStep("Change the cohort", true)
        await LoginPage.loginToLearnPortal("free")
        userID = await getUserId()
        await DashboardPage.btnDownloadApp.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("click on download app on navigation bar event triggred - 9110408a", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataDashboard("9110408a", userID, localData)).toEqual(true)
        await deleteFile();
        allure.endStep();

        await browser.reloadSession()
        allure.startStep("Change the cohort", true)
        await LoginPage.loginToLearnPortal("free")
        userID = await getUserId()
        await DashboardPage.btnDownloadAppBTC.click()
        allure.startStep("Click on download app event triggred - 9110408b", true)
        await deleteFile()
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataDashboard("9110408b", userID, localData)).toEqual(true)

    });

    it('330422 TC_10 Validate the U_event_id 9201046, m_desc click on homepage dashboard burger menu', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'free')
        userID = await getUserId()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        allure.startStep("click on homepage dashboard burger menu event triggred - 9201046", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201046", userID, localData)).toEqual(true)
    });

    it('320494 TC_11 Validate the U_event_id 9200999, m_desc view concept Videos [ cohort 1 - 3]', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[1], 'free')
        userID = await getUserId()
        await DashboardPage.btnconceptVideos.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnconceptVideos.click()
        allure.startStep("Click view concept Videos event triggred - 9200999", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200999", userID, localData)).toEqual(true)
    });

    it('334200 TC_17 Validate the U_event_id 9201052, m_desc Click to view centres for BTC - free ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await DashboardPage.btnViewAllCentre.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("Click to view centres for BTC event triggred - 9201052", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201052", userID, localData)).toEqual(true)

    });

    it('334199 TC_18 Validate the U_event_id 9201051, m_desc Click to request call back for BTC - free ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await DashboardPage.btnRequestACallBackOnMainPage.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnRequestACallBackOnMainPage.click()
        allure.startStep("Click to request call back for BTC event triggred - 9201051", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201051", userID, localData)).toEqual(true)

    });
    
    it('334201 TC_19 Validate the U_event_id 9201053, m_desc Click to view more free trial class slots - free ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await DashboardPage.btnViewMoreSlots.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnViewMoreSlots.click()
        allure.startStep("Click to view more free trial class slots event triggred - 9201053", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataDashboard("9201053", userID, localData)).toEqual(true)

    });

    it('334257 TC_20 Validate the U_event_id 9200142, m_desc Click book class - free ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await DashboardPage.btnbookaFreeTrialCTA.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep("Click book class event triggered- 9200142", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataDashboard("9200142", userID, localData)).toEqual(true)

    });

    it("320490 TC_02 Validate the U_event_id 9200014, m_desc Click active button in the greetings Banner", async () => {
        await browser.reloadSession()
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
        userID = await getUserId()
        await DashboardPage.btnJoinNow.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnJoinNow.click()
        allure.startStep("Click active button in the greetings banner event triggred - 9200014", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200014", userID, localData)).toEqual(true)

    })

    it('320493 TC_04 Validate the U_event_id 9200998, m_desc ask a doubt', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await DashboardPage.btnAskADoubtOnDashboard.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnAskADoubtOnDashboard.click()
        allure.startStep("Click to view all subject progress event triggred - 9200998", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200998", userID, localData)).toEqual(true)

    });    

    it('320501 TC_08 Validate the U_event_id 9200023, m_desc Click on bookmark to show bookmarks', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await DashboardPage.btnBookmarkOnDashboard.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnBookmarkOnDashboard.click()
        allure.startStep("Click on take test event triggred - 9200023", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200023", userID, localData)).toEqual(true)
    });

    it('320502 TC_09 Validate the U_event_id 9200024, m_desc Click on take test', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await DashboardPage.btnTakeTestOnDashboard.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnTakeTestOnDashboard.click()
        allure.startStep("Click on take test event triggred - 9200024", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200024", userID, localData)).toEqual(true)
    });  

    it('320505 TC_12 Validate the U_event_id 9200148, m_desc Click on analyse - Premium', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.subjectCard.click()
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.retakeTest(1).click()

        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.questionsHandling()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        await DashboardPage.btnAnalysis.waitForClickable({ timeout: 8000 })
        await DashboardPage.btnAnalysis.click()
        allure.startStep("Click on analyse event triggred - 9200148", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200148", userID, localData)).toEqual(true)
    });

    it('320503 TC_13 Validate the U_event_id 9200146, m_desc Select tabs - Premium ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
        userID = await getUserId()
        await DashboardPage.TopicCoveredTab.waitForClickable({ timeout: 45000 })
        await DashboardPage.TopicCoveredTab.click()
        allure.startStep("Click on take test event triggred - 9200146", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200146", userID, localData)).toEqual(true)
    });

    it('320500 TC_14 Validate the U_event_id 9200022, m_desc Click on active buttons next to topic - Premium ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.subjectCard.click()
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.retakeTest(1).click()

        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.questionsHandling()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        await DashboardPage.btnRetakeTestOnDashboard.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnRetakeTestOnDashboard.click()
        allure.startStep("Click on analyse event triggred - 9200022", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200022", userID, localData)).toEqual(true)
    });

    it('320493 TC_15 Validate the U_event_id 9200149, m_desc Click Practice - Premium ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[4], 'premium')
        userID = await getUserId()
        await DashboardPage.btnPracticeOnDashboard.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnPracticeOnDashboard.click()
        allure.startStep("Click Practice event triggred - 9200149", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200149", userID, localData)).toEqual(true)

    });   
})
