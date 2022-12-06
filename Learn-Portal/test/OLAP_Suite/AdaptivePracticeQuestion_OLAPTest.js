import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import LoginPage from "../../Pages/LoginPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { loginData } from "../../Data/LoginData"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/APQ_OLAP_Data.json')
let userID


describe("OLAP - Adaptive Practice Question ", async () => {

    it("320398 TC_01 Validate the U_event_id 9200700 m_desc click to go to APQs on burger menu", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Click to go to APQs on burger menu event triggered - 9200700", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200700", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320399 TC_02 Validate the U_event_id 9200701 m_desc view APQs home page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("View APQs home page event triggered - 9200701", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200701", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320403 TC_03 Validate the U_event_id 9200705 m_desc click on subject ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnThirdSubjectCard.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnThirdSubjectCard.click()
        allure.startStep("Click on subject event triggered - 9200705", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200705", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320415 TC_04 Validate the U_event_id 9200711 m_desc view subject APQs", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        allure.startStep("View subject APQs event triggered - 9200711", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200711", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320416 TC_05 Validate the U_event_id 9200182 m_desc click on start practice ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        allure.startStep("Click on start practice event triggered - 9200182", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200182", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320417 TC_06 Validate the U_event_id 9200712 m_desc view test start pop_up", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        allure.startStep("View test start pop_up event triggered - 9200712", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200712", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320418 TC_07 Validate the U_event_id 9200183 m_desc click start test instructions pop_up ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        allure.startStep("Click on start test event triggered - 9200183", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200183", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320420 TC_08 Validate the U_event_id 9200714 m_desc select option", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        await AdaptivePracticeQuestionsPage.btnBookMark.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnBookMark.click()
        await AdaptivePracticeQuestionsPage.btnRadioOption.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnRadioOption.click()
        allure.startStep("Select option event triggered - 9200714", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200714", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320422 TC_09 Validate the U_event_id 9200716 m_desc click on submit", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        await AdaptivePracticeQuestionsPage.btnBookMark.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnBookMark.click()
        await AdaptivePracticeQuestionsPage.btnRadioOption.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnRadioOption.click()
        await AdaptivePracticeQuestionsPage.btnSubmit.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnSubmit.click()
        allure.startStep("Click on submit event triggered - 9200716", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200716", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320424 TC_10 Validate the U_event_id 9200718 m_desc click view solution", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        await AdaptivePracticeQuestionsPage.btnRadioOption.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnRadioOption.click()
        await AdaptivePracticeQuestionsPage.btnSubmit.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnSubmit.click()
        await AdaptivePracticeQuestionsPage.btnViewSolution.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnViewSolution.click()
        allure.startStep("Click view solution event triggered - 9200718", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200718", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320421 TC_11 Validate the U_event_id 9200715 m_desc click on next question", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        await AdaptivePracticeQuestionsPage.btnRadioOption.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnRadioOption.click()
        await AdaptivePracticeQuestionsPage.btnSubmit.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnSubmit.click()
        await AdaptivePracticeQuestionsPage.btnNextQuestion.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnNextQuestion.click()
        await AdaptivePracticeQuestionsPage.btnBookMark.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnBookMark.click()
        allure.startStep("Click on next question event triggered - 9200715", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200715", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320425 TC_12 Validate the U_event_id 9200719 m_desc click end practice", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        await AdaptivePracticeQuestionsPage.btnStartPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartPractice.click()
        await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        await AdaptivePracticeQuestionsPage.btnEndPractice.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnEndPractice.click()
        allure.startStep("Click end practice event triggered - 9200719", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200719", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320406 TC_13 Validate the U_event_id 9200708 m_desc click on resume", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let Resume = await AdaptivePracticeQuestionsPage.resumeButton.isDisplayed()
        if (Resume) {
            await AdaptivePracticeQuestionsPage.resumeButton.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.resumeButton.click()
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.resumeButton.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.resumeButton.click()
        }
        allure.startStep("Click on resume event triggered - 9200708", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200708", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320405 TC_14 Validate the U_event_id 9200707 m_desc click on analyse", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let Resume = await AdaptivePracticeQuestionsPage.resumeButton.isDisplayed()
        if (Resume) {
            await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        }
        allure.startStep("Click on analayse event triggered - 9200707", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200707", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320419 TC_15 Validate the U_event_id 9200713 m_desc view analysis screen", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let Resume = await AdaptivePracticeQuestionsPage.resumeButton.isDisplayed()
        if (Resume) {
            await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        }
        allure.startStep("View analysis screen event triggered - 9200713", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200713", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320404 TC_16 Validate the U_event_id 9200706 m_desc Click on option tab ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.tabBookMark.click()
        allure.startStep("Click on option tab event triggered - 9200706", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200706", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320408 TC_17 Validate the U_event_id 9200710 m_desc click on view solution", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let viewSoluionButton = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (viewSoluionButton) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewSolution.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewSolution.click()
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewSolution.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewSolution.click()
        }
        allure.startStep("Click on view solution event triggered - 9200710", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200710", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("320407 TC_18 Validate the U_event_id 9200709 m_desc click on bookmark", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let bookMarkTab = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (bookMarkTab) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            let bookMarkButton = await AdaptivePracticeQuestionsPage.btnBookmarksIcon.isDisplayed()
            if (bookMarkButton) {
                await AdaptivePracticeQuestionsPage.btnBookmarksIcon.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnBookmarksIcon.click()
            }
            else {
                await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
                await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
                await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.tabBookMark.click()
                await AdaptivePracticeQuestionsPage.btnBookmarksIcon.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnBookmarksIcon.click()
            }
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnBookmarksIcon.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnBookmarksIcon.click()
        }
        allure.startStep("Click on Bookmark event triggered -9200709", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200709", userID, localData)).toEqual(true)
        allure.endStep()
    })
    it("320401 TC_19 First time user - Validate the U_event_id 9200703 m_desc select subject to get started", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnThirdSubjectCard.waitForClickable({ timeout: 5000 })
        await AdaptivePracticeQuestionsPage.btnThirdSubjectCard.click()
        allure.startStep("select subject to get started event triggered - 9200703", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200703", userID, localData)).toEqual(true)
        allure.endStep()
    })
    it("320409 TC_20 Validate the U_event_id 9200167, m_desc click on recent/old filter", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let bookMarkTab = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (bookMarkTab) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            let bookMarkButton = await AdaptivePracticeQuestionsPage.btnBookmarksIcon.isDisplayed()
            if (bookMarkButton) {
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
            }
            else {
                await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
                await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
                await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.tabBookMark.click()
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
            }
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewAll.click()
            await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
        }
        allure.startStep("click on recent/old filter event triggered - 9200167", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200167", userID, localData)).toEqual(true)
        allure.endStep()

    })
    it("320410 TC_21 Validate the U_event_id 9200168, m_desc click on recent/old", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let bookMarkTab = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (bookMarkTab) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            let bookMarkButton = await AdaptivePracticeQuestionsPage.btnBookmarksIcon.isDisplayed()
            if (bookMarkButton) {
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
                await browser.keys(["Old", "Tab"])
            }
            else {
                await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
                await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
                await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.tabBookMark.click()
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
                await browser.keys(["Old", "Tab"])
            }
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewAll.click()
            await AdaptivePracticeQuestionsPage.ddrecentOldFilter.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddrecentOldFilter.click()
            await browser.keys(["Old", "Tab"])
        }
        allure.startStep("click on recent/old option event triggered - 9200168", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200168", userID, localData)).toEqual(true)
        allure.endStep()

    })
    it("320411 TC_22 Validate the U_event_id 9200169 m_desc click on subject filter on question tab bookmark page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let bookMarkTab = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (bookMarkTab) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            let bookMarkButton = await AdaptivePracticeQuestionsPage.btnBookmarksIcon.isDisplayed()
            if (bookMarkButton) {
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
            }
            else {
                await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
                await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
                await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.tabBookMark.click()
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
            }
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewAll.click()
            await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
        }
        allure.startStep("click on subject filter event triggered - 9200169", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200169", userID, localData)).toEqual(true)

    })
    it("320412 TC_23 Validate the U_event_id 9200170 m_desc select subject on question tab boomark page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let bookMarkTab = await AdaptivePracticeQuestionsPage.tabBookMark.isDisplayed()
        if (bookMarkTab) {
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            let bookMarkButton = await AdaptivePracticeQuestionsPage.btnBookmarksIcon.isDisplayed()
            if (bookMarkButton) {
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
            }
            else {
                await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
                await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
                await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.tabBookMark.click()
                await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.btnViewAll.click()
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
                await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
            }
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.tabBookMark.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.tabBookMark.click()
            await AdaptivePracticeQuestionsPage.btnViewAll.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.btnViewAll.click()
            await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
        }
        await browser.keys(["Biology", "Tab"])
        allure.startStep("click on select event triggered - 9200170", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9200170", userID, localData)).toEqual(true)
    })

    it("320413 TC_24 Validate the U_event_id 9201054 m_desc click on subject filter on recent practised tab ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let analyseButton = await AdaptivePracticeQuestionsPage.btnAnalyse.isDisplayed()
        if (analyseButton) {
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.click()
        }
        else {

            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.click()
        }
        allure.startStep("click on subject filter event triggered - 9201054", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9201054", userID, localData)).toEqual(true)

    })

    it("320414 TC_25 Validate the U_event_id 9201055 m_desc select subject on recent practised tab ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        let analyseButton = await AdaptivePracticeQuestionsPage.btnAnalyse.isDisplayed()
        if (analyseButton) {
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.click()
        }
        else {
            await AdaptivePracticeQuestionsPage.startTestAndBookMArkQuestion()
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.waitForClickable({ timeout: 5000 })
            await AdaptivePracticeQuestionsPage.ddsubjectFilterAPQPage.click()
        }
        await browser.keys(["Biology", "Tab"])
        allure.startStep("click on select event triggered - 9201055", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAPQ("9201055", userID, localData)).toEqual(true)
    })
})