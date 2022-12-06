import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import MockTestPage from "../../Pages/MockTestPage";
import AITSPage from '../../Pages/AITSPage';
import DownloadsPage from "../../Pages/DownloadsPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import MonthlyTestPage from "../../Pages/MonthlyTestPage";
import DashboardPage from "../../Pages/DashboardPage"
import { loginData } from "../../Data/LoginData"
import { mockTestData } from "../../Data/MockTestData"
import { aitsData } from "../../Data/AITSData"
import { chapterWiseTestsData } from "../../Data/ChapterWiseTestsData"
import { monthlyExamData } from "../../Data/MonthlyExamData";




describe("Learn Portal - Smoke suite for Login, Concept video,Download and Ask a doubt modules", async () => {


    it("315081 TC_03 Validate AITS module is available for Premium user/Not", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Validate the AITS Module",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("validate Jee advance is displaying",true)
        await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnJeeAdvance.isDisplayed()).toEqual(true)
        allure.startStep("validate Jee mains is displaying",true)
        await AITSPage.btnJeeMain.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnJeeMain.isDisplayed()).toEqual(true)
        allure.startStep("validate NEET is displaying",true)
        await AITSPage.btnNeet.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnNeet.isDisplayed()).toEqual(true)
        await AITSPage.menuOption.click()
        allure.endStep()

    })   
    it("315082 TC_01- Validate JEE Advanced, JEE mains, NEET and BISAT should be visible in MOCK TEST  for Premium", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3])
        allure.startStep("Validate MOCK TEST Module", true)
        await MockTestPage.navigateToMockTestModule()
        allure.startStep("Validate JEE Amin, JEE Advanced, NEET, BITSAT", true)
        for (let i = 1; i <= 3; i++) {
            let testName = mockTestData.subTest[i - 1]
            let result = await $("//*[@data-menu-key='" + testName + "-mock-test']").isDisplayed()
            expect(result).toEqual(true)
        }
        await DashboardPage.menuOption.click()
        allure.endStep();
    })

    it("315083 TC_01 Validate user is able to take all the 6 test ", async () => {        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the complete test flow of 6 tests",true)
        await AdaptivePracticeQuestionsPage.completeTestFlow()        
        allure.endStep();
    })

    it("315084 TC_05 Verify if analysis button is displayed then redirection to take a test page through retake test button", async () => {

        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject card", true)
        await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnSubjectCard.click()
        allure.startStep("Click on First first drop down of test", true)
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        allure.startStep("Click on analysis button", true)
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.retakeTest(1).click()
        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        await expect(await ChapterWiseTestsPage.startTestPopUpInstructions.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Click on start a test button", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.questionsHandling()
        allure.endStep();

    })

it("315085 TC_08 Downloads - Free user - Click on download button and verify the download url", async () => {
    
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(cohortDetail, 'free')
    allure.startStep("Navigate to Download Module", true)
    await DownloadsPage.navigateToDownloadsModule()
    allure.startStep("Wait for Popular Download label to appear", true)
    await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
    allure.startStep("Validate Popular Download label to is displayed", true)
    expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
    allure.startStep("Get the card count for Popular Download block", true)
    let cardCount = await DownloadsPage.downloadPoularDownloadsPdf()
    for (let i = 1; i <= cardCount; i++) {
        allure.startStep("Click on Download button", true)
        await DownloadsPage.downloadBtnPopularDownloadsCards(i).click()
        await browser.pause(1500)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl()
        let flag = url.includes("downloads/staging")
        if (flag == false){
           flag = url.includes("downloads/production") //check for production
        }
        allure.startStep("Validate the URL of Downloaded pdf", true)
        expect(flag).toEqual(true)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }
    allure.endStep();
})

it("315087 TC_01 Free user - Check the three sections of the Bookmarks landing page.", async () =>{
    await browser.reloadSession()
    allure.startStep("Login to Learn Portal", true);
    await LoginPage.loginToLearnPortal('free')
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(cohortDetail, 'free')
    allure.startStep("Navigate to Bookmarks Page",true)
    await BookMarksPage.navigateToBookMarksPage()
    allure.startStep("Wait for Subject Bookmarks Label to be displayed",true)
    await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout : 3500})
    allure.startStep("Validate Subject Bookmarks Label on Bookmarks Landing Page",true)
    expect(await BookMarksPage.labelSubjectBookmarks.isDisplayed()).toEqual(true)
    allure.startStep("Validate Bookmarks Categories on Bookmarks Landing Page",true)
    expect(await BookMarksPage.labelBookmarkedCategories.isDisplayed()).toEqual(true)
    allure.startStep("Validate Recent Bookmarks on Bookmarks Landing Page",true)
    expect(await BookMarksPage.labelRecentBookmarks.isDisplayed()).toEqual(true)
    allure.endStep();
})

it('315088 TC_03 Validate "Upcoming, completed and skipped" CTA', async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(monthlyExamData.smokeData[0],'premium')
    allure.startStep("Check the Monthly Test Module in the menu bar", true)
    await MonthlyTestPage.navigateToMonthlyTestModule()
    try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
    catch{}
    allure.startStep("Wait for Upcoming Tab to be displayed", true)
    await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({timeout:5000})
    allure.startStep("Validate Upcoming Tab Parameters",true)
    if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
        expect(await MonthlyTestPage.labelValidDateAndTime.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.btnStartTest.isExisting()).toEqual(true)
    }else{
        expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
    }

    allure.startStep("click on completed tab", true)
    await MonthlyTestPage.btnCompletedTab.click()
    try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
    catch{}
    allure.startStep("Validate Completed Tab Parameters",true)
    if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
        expect(await MonthlyTestPage.labelValidDateAndTime.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.btnDetailedAnalysis.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.labelOfTimeAndQuestion1.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.labelResultAvaialble.isExisting()).toEqual(true)
    }else{
        await MonthlyTestPage.labelNoTest.waitForDisplayed({timeout:3000})
        expect(await MonthlyTestPage.labelNoTest.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.labelSubHeadingCompletedTest.isExisting()).toEqual(true)
    }

    allure.startStep("click on skipped tab", true)
    await MonthlyTestPage.btnSkippedTab.click()
    try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
    catch{}
    allure.startStep("Validate skipped Tab Parameters",true)
    if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
        expect(await MonthlyTestPage.labelSkipValidDateAndTime.isExisting()).toEqual(true)
    }
    allure.endStep();
})



})
