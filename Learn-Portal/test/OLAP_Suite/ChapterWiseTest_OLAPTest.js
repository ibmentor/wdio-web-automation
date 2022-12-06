import { AllureUtil as allure } from "../../utils/util.allure"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import LoginPage from "../../Pages/LoginPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/chapterWiseTest_OLAP_Data.json')
let userID


describe("OLAP - Chapter Wise Test", async () => {

    it("319838 TC_01 Validate the U_event_id 9200062, m_desc click to go to chapterwise test on burger menu ", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("click to go to chapterwise test on burger menu event triggered - 9200062", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200062", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319839 TC_02 Validate the U_event_id 9200063, m_desc view chapterwise test home page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("View chapterwise test home page event triggered - 9200063", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200063", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319840 TC_03 Validate the U_event_id 9200164, m_desc explore_other_subjects", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.subjectCard.click()
        await ChapterWiseTestsPage.sidebarOtherSubjects(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.sidebarOtherSubjects(1).click()
        allure.startStep("Explore_other_subjects event triggered - 9200164")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200164", userID, localData)).toEqual(true)
        allure.endStep()
    })


    it("319842 TC_04 Validate the U_event_id 9200065, m_desc click on subject", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Click on subject event triggered - 9200065")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200065", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319845 TC_05 Validate the U_event_id 9200068, m_desc click on take/retake test", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        allure.startStep("Click on take test event triggered - 9200068")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200068", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319855 TC_06 Validate the U_event_id 9200078, m_desc view instructions popup", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        allure.startStep("View instructions popup event triggered - 9200078")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200078", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319856 TC_07 Validate the U_event_id 9200079, m_desc click start test ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        allure.startStep("Click start test event triggered - 9200079")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200079", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319862 TC_08 Validate the U_event_id 9200085 m_desc view question", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        allure.startStep("View question event triggered - 9200085")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200085", userID, localData)).toEqual(true)
        allure.endStep()
    })


    it("319857 TC_09 Validate the U_event_id 9200080 m_desc select option", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        await ChapterWiseTestsPage.btnRadioOption.click()
        allure.startStep("Select option event triggered - 9200080")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200080", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319858 TC_10 Validate the U_event_id 9200081 m_desc click next", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        await ChapterWiseTestsPage.btnNext.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnNext.click()
        allure.startStep("Click next event triggered - 9200081")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200081", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319859 TC_11 Validate the U_event_id 9200082 m_desc click previous ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        await ChapterWiseTestsPage.btnNext.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnNext.click()
        await ChapterWiseTestsPage.btnPrevious.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnPrevious.click()
        allure.startStep("Click previous event triggered - 9200082")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200082", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319861 TC_12 Validate the U_event_id 9200084 m_desc click on a question to jump to that question", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        await ChapterWiseTestsPage.listOfQuestionInTestPage.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.listOfQuestionInTestPage.click()
        allure.startStep("Click on a question to jump to that question event triggered - 9200084")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200084", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319849 TC_13 Validate the U_event_id 9200072, m_desc click to add / remove bookmark", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()
        await browser.pause(2000)
        let viewAllButton = await ChapterWiseTestsPage.btnViewAll.isDisplayed()
        if (viewAllButton) {
            await ChapterWiseTestsPage.btnUnbookMark.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.btnUnbookMark.click()
        }
        else {
            await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.subjectCard.click()
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            if (await ChapterWiseTestsPage.btnAnalysis.isClickable()) {
                await ChapterWiseTestsPage.retakeTest(1).click()
            } else {
                await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 45000 })
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.bookmarkQuestionHandling()
            await ChapterWiseTestsPage.btnUnbookMark.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.btnUnbookMark.click()
        }
        allure.startStep("click to add / remove bookmark event triggered - 9200072")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200072", userID, localData)).toEqual(true)
        allure.endStep()
    })


    it("319863 TC_14 Validate the U_event_id 9200086 m_desc click to add question feedback", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({ timeout: 25000 })
        await ChapterWiseTestsPage.btnFeedback.click()
        allure.startStep("Click to add question feedback event triggered - 9200086")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200086", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319864 TC_15 Validate the U_event_id 9200087 m_desc select feedback", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({ timeout: 25000 })
        await ChapterWiseTestsPage.btnFeedback.click()
        await ChapterWiseTestsPage.selectFeedbackOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.selectFeedbackOption.click()
        await browser.keys(['ArrowDown', 'Tab'])
        allure.startStep("Select feedback event triggered - 9200087")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200087", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319866 TC_16 Validate the U_event_id 9200089 m_desc click cancel", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({ timeout: 25000 })
        await ChapterWiseTestsPage.btnFeedback.click()
        await ChapterWiseTestsPage.selectFeedbackOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.selectFeedbackOption.click()
        await browser.keys(['ArrowDown', 'Tab'])
        await ChapterWiseTestsPage.btnCancelFeedback.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.btnCancelFeedback.click()
        allure.startStep("Click cancel event triggered - 9200089")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200089", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319865 TC_17 Validate the U_event_id 9200088 m_desc click submit feeback", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({ timeout: 25000 })
        await ChapterWiseTestsPage.btnFeedback.click()
        await ChapterWiseTestsPage.selectFeedbackOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.selectFeedbackOption.click()
        await browser.keys(['ArrowDown', 'Tab'])
        await ChapterWiseTestsPage.btnSubmitFeedback.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.btnSubmitFeedback.click()
        allure.startStep("Click submit feeback event triggered - 9200088")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200088", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319867 TC_18 Validate the U_event_id 9200090 m_desc click finish", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
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
        allure.startStep("Click finish event triggered - 9200090")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200090", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319860 TC_19 Validate the U_event_id 9200083 m_desc click exit assessment", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
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
        await ChapterWiseTestsPage.btnExitTest.click()
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.waitForClickable({ time: 5000 })
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.click()
        allure.startStep("Click exit assessment event triggered - 9200083")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200083", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319846 TC_20 Validate the U_event_id 9200069, m_desc click on analysis ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.subjectCard.click()
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        await ChapterWiseTestsPage.btnAnalysis.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.btnAnalysis.click()
        allure.startStep("Click on analysis event triggered - 9200069")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200069", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319843 TC_21 Validate the U_event_id 9200066, m_desc select recently submitted", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.tabRecentlySubmitted.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.tabRecentlySubmitted.click()
        allure.startStep("Click on recently submitted event triggered - 9200066")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200066", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319844 TC_22 Validate the U_event_id 9200067, m_desc select bookmarked questions", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()
        allure.startStep("Click on bookmark questions event triggered - 9200067")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200067", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319847 TC_23 Validate the U_event_id 9200070, m_desc click on view solution", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()

        await browser.pause(2000)
        let viewSolutionButton = await ChapterWiseTestsPage.viewSolutionPopUp.isDisplayed()
        if (viewSolutionButton) {
            await ChapterWiseTestsPage.viewSolutionPopUp.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.viewSolutionPopUp.click()

        }
        else {
            await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.subjectCard.click()
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            if (await ChapterWiseTestsPage.btnAnalysis.isClickable()) {
                await ChapterWiseTestsPage.retakeTest(1).click()

            } else {
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.bookmarkQuestionHandling()
            await ChapterWiseTestsPage.viewSolutionPopUp.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.viewSolutionPopUp.click()
        }

        allure.startStep("Click on view solution event triggered - 9200070")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200070", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("319848 TC_24 Validate the U_event_id 9200071, m_desc click view all", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()

        await browser.pause(2000)
        let viewAllButton = await ChapterWiseTestsPage.btnViewAll.isDisplayed()
        if (viewAllButton) {
            await ChapterWiseTestsPage.btnViewAll.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.btnViewAll.click()

        }
        else {
            await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.subjectCard.click()
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            if (await ChapterWiseTestsPage.btnAnalysis.isClickable()) {
                await ChapterWiseTestsPage.retakeTest(1).click()
            } else {
                await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 45000 })
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.bookmarkQuestionHandling()
            await ChapterWiseTestsPage.btnViewAll.waitForDisplayed({ timeout: 45000 })
            await ChapterWiseTestsPage.btnViewAll.click()
        }
        allure.startStep("Click on view all event triggered - 9200071")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataCWT("9200071", userID, localData)).toEqual(true)
        allure.endStep()
    })
})