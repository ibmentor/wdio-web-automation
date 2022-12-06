import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import DashboardPage from "../../Pages/DashboardPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import { loginData } from "../../Data/LoginData"
import { chapterWiseTestsData } from "../../Data/ChapterWiseTestsData"
import { allSubjectsData } from "../../Data/AllSubjectsData"


describe("Learn Portal - Smoke suite for APQ,CWT,All Subject,Profile", async () => {

    it.only("308937 TC_01 Validate user is able to take all the 6 test ", async () => {        
        // allure.startStep("Change cohort Details",true)
        // await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        // allure.startStep("Navigate to APQ module", true)
        // await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        // allure.startStep("Validate the complete test flow of 6 tests",true)
        // await AdaptivePracticeQuestionsPage.completeTestFlow()        
        // allure.endStep();
    })
    

    it("308938 TC_02 Validate the book marked question is getting displayed under book mark tab", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the book marked question is getting displayed under book mark tab",true)
        await AdaptivePracticeQuestionsPage.bookMarkFlow()        
        allure.endStep();
    })

    it("308939 TC_03 Validate resume test flow and continue to finish the test", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Instruction pop up validation",true)
        await AdaptivePracticeQuestionsPage.resumeTestFlow()      
        allure.endStep();
    })

    it("3089340 TC_04 Analysis page- validation of analysis the section header", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Validate Performance Statistics section Heading",true)
        expect(await $("(//*[@class='performance-stats g-0 row']//p)[1]").getText()).toEqual("Performance Statistics")
        allure.startStep("Validate Summary section Heading",true)
        expect(await $("//*[@class='heading summary-heading']").getText()).toEqual("Summary")
        allure.startStep("Validate Accuracy section Heading",true)
        expect(await $("(//*[@class='graph-heading'])[1]").getText()).toEqual("Accuracy")
        allure.startStep("Validate Time Spent section Heading",true)
        expect(await $("(//*[@class='graph-heading'])[2]").getText()).toEqual("Time Spent")
        allure.startStep("Validate Remarks section Heading",true)
        expect(await $("((//*[@class='remarks'])//p)[1]").getText()).toEqual("Remarks")
        allure.startStep("Validate Watch Concepts related section Heading",true)
        expect(await $("//*[@class='dashboard_dashboardTitle__3RniS']").getText()).toHaveTextContaining("Watch Concepts related to")
        allure.startStep("Validate Bookmarked Questions section Heading",true)
        expect(await $("(//*[@class='swiper-title'])[1]").getText()).toHaveTextContaining("Bookmarked Questions")
        try{
        allure.startStep("Validate Important Questions section Heading",true)
        expect(await $("(//*[@class='swiper-title'])[2]").getText()).toHaveTextContaining("Important Questions")
        }
        catch{

        }
        allure.endStep();
    })


    it("308941 TC_05 Verify if analysis button is displayed then redirection to take a test page through retake test button", async () => {

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
            await ChapterWiseTestsPage.btnRetakeTest.click()
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

    it("308942 TC_06 - Validation of Retake a test flow", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.btnRetakeTest.waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.btnRetakeTest.moveTo()
        await ChapterWiseTestsPage.btnRetakeTest.click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("Start the test", true)
        await ChapterWiseTestsPage.questionSection.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.questionsHandling()
        await expect(await ChapterWiseTestsPage.labelPerformanceSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();

    })

    it("308943 TC_07 Verify analysis button and redirection to analysis page through analysis button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First test analysis button", true)
        await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnAnalysis.click()
        allure.startStep("Verify analysis page through bread crumb ", true)
        await expect(await ChapterWiseTestsPage.labelBreadCrumbAnalysis.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelObjectiveTests.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelAnalysisSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();


    })

    it("308944 TC_08 - Validation of Exit Assessment flow", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.btnRetakeTest.waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.btnRetakeTest.moveTo()
        await ChapterWiseTestsPage.btnRetakeTest.click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("Exit the test", true)
        await ChapterWiseTestsPage.btnExitTest.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.btnExitTest.click()
        allure.startStep("Click on cance", true)
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.click()
        allure.startStep("Exit the test", true)
        await ChapterWiseTestsPage.btnExitTest.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.btnExitTest.click()
        allure.startStep("Click on end test", true)
        await ChapterWiseTestsPage.btnEndTestInExitAssessmentPopup.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.btnEndTestInExitAssessmentPopup.click()
        allure.startStep("Application lands on analysis summary page", true)
        await ChapterWiseTestsPage.labelPerformanceSummary.waitForDisplayed({ timeout: 40000 })
        allure.endStep();

    })

    it("308945 TC_09 To verify if all the chapters are available from each subjects", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        let sujectText = await AllSubjectsPage.firstSubjectCard.getText()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let breadcrumbText = await AllSubjectsPage.subjectBreadCrumb.getText()
        allure.startStep("Verify the bread crumb heading of subject", true)
        expect(sujectText).toEqual(breadcrumbText)
        allure.endStep();

    })

    it("308946 TC_10 Number of practice tests under each topic names should be visible", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("Validate number of each test is visible", true)
        await browser.pause(5000)
        let numberOfTest = await $$("//div[@class='video-author']")
        for (let i = 1; i <= numberOfTest.length; i++) {
            allure.startStep("Verify number of subject is displaying", true)
            expect(await AllSubjectsPage.numberOfTest(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })

    it("308947 TC_11 To verify if the title, topic name, decription are visible in each topics", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("Validate video subtitle , title, and description are displayed as expected", true)
        await browser.pause(5000)
        let numberOfCards = await $$("//div[@class='video-card']")
        for (let i = 1; i <= numberOfCards.length; i++) {
            allure.startStep("Verify video sub-title is displayed", true)
            expect(await AllSubjectsPage.videoSubTitle(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
            allure.startStep("Verify video title is displayed", true)
            expect(await AllSubjectsPage.videoTitle(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
            allure.startStep("Verify video discription is displayed", true)
            expect(await AllSubjectsPage.videoDescription(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })

    
    it("308948 TC_12 To verify if BYJU'S Class of the selected Subject appears in the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[2], 'free')
        allure.startStep("Click button byjus classes", true)
        await ByjusClassesPage.btnByjusClassPage.waitForClickable({ timeout: 15000 })
        await ByjusClassesPage.btnByjusClassPage.click()
        await AllSubjectsPage.subjectLabelRecomendedclasses.waitForDisplayed({ timeout: 15000 })
        let subjectTextbyjusClasses = await AllSubjectsPage.subjectLabelRecomendedclasses.getText()
        let slotTimeText = await AllSubjectsPage.btnRecomendedSlotTime.getText()
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.subjectLabelRecomendedclasses.waitForDisplayed({ timeout: 15000 })
        let subjectTextAllsubject = await AllSubjectsPage.subjectLabelRecomendedclasses.getText()
        let slotTimeTextInAllSubject = await AllSubjectsPage.btnRecomendedSlotTime.getText()
        allure.startStep("Verify subject text of recomended classes form byjus class to Allsubjects", true)
        expect(subjectTextbyjusClasses).toEqual(subjectTextAllsubject)
        allure.startStep("Verify slot time of recomended byjus classes is similar to Allsubjects recomended classes", true)
        expect(slotTimeText).toEqual(slotTimeTextInAllSubject)
        allure.endStep();

})
it("308949 TC_13 To verify if the user is able to switch to different chapters", async () => {

    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
    allure.startStep("Navigate to all subjects menu from dashboard", true)
    await AllSubjectsPage.navigateToAllSubjects()
    allure.startStep("Navigate to concept videos from all subjects", true)
    allure.startStep("Click on first subjects", true)
    await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
    await AllSubjectsPage.firstSubjectCard.click()
    let videoTitle = await AllSubjectsPage.firstVideoTitle.getText()
    await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
    await AllSubjectsPage.btnViewConcepts.click()
    let chapterTitle = await AllSubjectsPage.chapterTitle.getText()
    expect(videoTitle).toEqual(chapterTitle)
    await AllSubjectsPage.btnNextChapter.waitForClickable({ timeout: 15000 })
    await AllSubjectsPage.btnNextChapter.click()
    await AllSubjectsPage.btnPreviousChapter.waitForClickable({ timeout: 15000 })
    await AllSubjectsPage.btnPreviousChapter.click()
    expect(await AllSubjectsPage.chapterTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
    allure.endStep();
})

it("308950 TC_14 Verify Changing the avatar and comparing in 3 places", async () => {
    await browser.reloadSession()
    await LoginPage.loginToLearnPortal('free')
    allure.startStep("Select profile", true);
    await ProfilePage.navigatetToProfilePage()
    allure.startStep("Click on edit profile picture", true);
    await ProfilePage.btnEditProfilePicture.waitForClickable({ timeout: 25000 })
    await ProfilePage.btnEditProfilePicture.click()
    allure.startStep("Select profile image", true);
    await ProfilePage.profileImage.waitForClickable({ timeout: 25000 })
    await ProfilePage.profileImage.click()
    allure.startStep("Verify drop down image should be changed", true);
    await expect(await ProfilePage.ddAvatarImage.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    allure.startStep("Verify personal details image should be changed", true);
    expect(await ProfilePage.personalDetailsImage.isDisplayed()).toEqual(true)
    allure.startStep("Click on menu option", true);
    await DashboardPage.menuOption.click()
    allure.startStep("Click on home button", true);
    await DashboardPage.btnHome.click()
    allure.startStep("Verify drop down image should be changed at dashboard page", true);
    expect(await ProfilePage.ddAvatarImage.isDisplayed()).toEqual(true)
    allure.endStep();
})

it("308951 TC_15 verify cancelling and submitting request a call back from personal details section ", async () => {

     await ProfilePage.navigatetToProfilePage()
    allure.startStep("Click on request a call back button", true);
    await ProfilePage.btnRequestCallBack.click()
    let requestCallBack = await $("//*[@class='request-header']").isDisplayed()
    allure.startStep("Verify request a call back page should be visible", true);
    await expect(requestCallBack).toEqual(true)
    allure.startStep("Click on cancel request a call back button", true);
    await ProfilePage.btnRequestCallBackCancel.click()
    let profileHeading = await $("//*[@class='css-17wwswp']").isDisplayed()
    allure.startStep("Verify profile page heading after clicking on cancel request a call back button", true);
    await expect(profileHeading).toEqual(true)
    allure.startStep("Click on request a call back button", true);
    await ProfilePage.btnRequestCallBack.click()
    allure.startStep("Click on request a call back submit button", true);
    await ProfilePage.btnRequestCallBackSubmit.click()
    await browser.pause(3000)//waiting for page to load
    let requestSubmitted = await $("(//*[normalize-space()='Request submitted!'])[1]").isDisplayed()
    allure.startStep("Verify request submitted successfully", true);
    await expect(requestSubmitted).toEqual(true)
    allure.endStep();
})

it("308952 TC_16 Verify name and email empty error msg validation",async() => {
     await ProfilePage.navigatetToProfilePage()
    allure.startStep("Clear the name input values", true);
    await ProfilePage.tfname.clearValue()
    allure.startStep("Set invalid name values", true);
    await ProfilePage.tfname.setValue("t")
    allure.startStep("Clear the Email input values", true);
    await ProfilePage.tfEmail.clearValue()
    allure.startStep("Set invalid Email Email values", true);
    await ProfilePage.tfEmail.setValue("t")
    allure.startStep("Click on save button", true);
    await ProfilePage.btnSave.click()
    let errorMsgName = await $("//div[contains(text(),'Enter a valid name')]").isDisplayed()
    let errorMsgEmail = await $("//div[contains(text(),'Enter a valid email')]").isDisplayed()
    allure.startStep("Verify Error msg for empty name", true);
    await expect(errorMsgName).toEqual(true)
    allure.startStep("Verify Error msg for empty Email", true);
    await expect(errorMsgEmail).toEqual(true)
    allure.endStep();
})


})