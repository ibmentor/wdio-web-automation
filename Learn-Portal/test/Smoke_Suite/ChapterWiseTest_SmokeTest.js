import { AllureUtil as allure } from "../../utils/util.allure"
import { chapterWiseTestsData } from "../../Data/ChapterWiseTestsData";
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import TouchPointPage from "../../Pages/TouchPointPage";
import { loginData } from "../../Data/LoginData";
import { touchPointData} from "../../Data/TouchPointData";
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]
describe("Learn Portal -Chapeter Wise Test cases for free user", async () => {
    it("315666 TC_01-Free User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort", async () => {
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1])
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject", true)
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Validate all the sujects in side bar of Explore other subjects", true)
        let noOfSubject = await $$("//div[@class='img-text-container']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).click()
            allure.startStep("Validate CWT should display in bread crumb", true)
            expect(await ChapterWiseTestsPage.breadCrumbCWT.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })

    it("315668 TC_02- Free User-Validation of Retake a test flow", async () => {

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
        if (await ChapterWiseTestsPage.retakeTest(1).isDisplayed({timeout:3500}) == false){
            await ChapterWiseTestsPage.btnTakeATest.click()
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.btnExitTest.click()    
            await ChapterWiseTestsPage.btnEndTestInExitAssessmentPopup.click()
            allure.startStep("Navigate to CWT Module", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        }
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
        await browser.pause(4000)
        if(await ChapterWiseTestsPage.errorMessage.isDisplayed())
        {
            await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[0], 'free')
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            allure.startStep("Click on First subject card", true)
            await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnSubjectCard.click()
            allure.startStep("Click on First first drop down of test", true)
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            if (await ChapterWiseTestsPage.retakeTest(1).isDisplayed({timeout:3500}) == false){
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            else{
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.retakeTest(1).moveTo()
            await ChapterWiseTestsPage.retakeTest(1).click()
            }
        }
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("Start the test", true)
        await ChapterWiseTestsPage.questionSection.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.questionsHandling()
        await expect(await ChapterWiseTestsPage.labelPerformanceSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();
    })

    it("315669 TC_03 - Free User-Validation of Exit Assessment flow", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await browser.pause(4000)
        if (await ChapterWiseTestsPage.retakeTest(1).isDisplayed({timeout:3500}) == false){
            allure.startStep("Click on First subject card", true)
            await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnSubjectCard.click()
            allure.startStep("Click on First first drop down of test", true)
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            await ChapterWiseTestsPage.btnTakeATest.click()
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnStartTest.click()
        }
        else{
            allure.startStep("Click on Retake", true)
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.retakeTest(1).moveTo()
            await ChapterWiseTestsPage.retakeTest(1).click()
            allure.startStep("Click on start a test", true)
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnStartTest.click()
        }
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

    it('315674 TC_04 Free User-Verify add question feedback option ', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await browser.pause(4000)
        if (await ChapterWiseTestsPage.retakeTest(1).isDisplayed({timeout:3500}) == false){
                allure.startStep("Click on First subject card", true)
                await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
                await ChapterWiseTestsPage.btnSubjectCard.click()
                allure.startStep("Click on First first drop down of test", true)
                await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
                await ChapterWiseTestsPage.ddTestOne.click()
                await ChapterWiseTestsPage.btnTakeATest.click()
                await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
                await ChapterWiseTestsPage.btnStartTest.click()
        }
        else{
            allure.startStep("Click on Retake", true)
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.retakeTest(1).moveTo()
            await ChapterWiseTestsPage.retakeTest(1).click()
            allure.startStep("Click on start a test", true)
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnStartTest.click()
        }
        allure.startStep("Click to add question feedback ", true)
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({ timeout: 25000 })
        await ChapterWiseTestsPage.btnFeedback.click()
        allure.startStep("Select feedback ", true)
        await ChapterWiseTestsPage.selectFeedbackOption.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.selectFeedbackOption.click()
        await browser.keys(['ArrowDown', 'Tab'])
        allure.startStep("Click submit feeback ", true)
        await ChapterWiseTestsPage.btnSubmitFeedback.waitForDisplayed({ timeout: 45000 })
        await ChapterWiseTestsPage.btnSubmitFeedback.click()
        allure.startStep("verifying feedback submitted successfully or not", true)
        let submitFeedbackText = await $("//*[text()='Feedback submitted successfully']")
        submitFeedbackText.waitForDisplayed({ timeout: 2000 })
        allure.startStep("Verify feed back submition note should display", true)
        expect(await submitFeedbackText.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep()
    });

    it('315676 TC_05 Free User-Verify view solution pop up', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        await ConceptVideoPage.navigateToConceptVideo()
        let subjectNameVideoPlayButton = $("(//*[@class='video-sub-title' and text()='Mathematics']/../../../..//*[@class='play-icon'])[1]")
        for (let i=0;i<35;i++){
            await browser.keys(["PageDown"])
            try{await subjectNameVideoPlayButton.waitForDisplayed({timeout:2000})}catch{}
            if(await subjectNameVideoPlayButton.isDisplayed()){
                break
            }
        }
        await subjectNameVideoPlayButton.click()
        try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})
            await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})
        }catch{}
        let bookmarkedCount = await $$("//*[@class='mdi mdi-bookmark']").length
        let bookamrk = 3-bookmarkedCount
        if (bookmarkedCount != 3 && bookmarkedCount<4){
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
                await browser.pause(1500)
            }
        }
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("go to Bookmarked Question ", true)
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 2000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.scrollIntoView({block:"center"})
        await browser.pause(3000)
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()
        await browser.pause(3000)
        let subName = await $(`(//*[contains(@class,'bookmarkStyles_question')]/../..//p)[1]`).getText() 
        allure.startStep("click on view solution", true)
        await ChapterWiseTestsPage.viewSolutionPopUp.waitForDisplayed({ timeout: 5000 })
        await ChapterWiseTestsPage.viewSolutionPopUp.click()
        allure.startStep("Verify view solution pop up")
        expect(await ChapterWiseTestsPage.bookmarkSubName.waitForDisplayed({ timeout: 5000 })).toHaveText(subName)
        allure.startStep("Verify Right navigation button  ")
        expect(await ChapterWiseTestsPage.btnRightNavigation.isExisting()).toEqual(true)
        allure.startStep("click on Right navigation button on solution popup window", true)
        await ChapterWiseTestsPage.btnRightNavigation.click()
        allure.startStep("Verify left navigation button  ")
        expect(await ChapterWiseTestsPage.btnLeftNavigation.isExisting()).toEqual(true)
        allure.startStep("click on left navigation button on solution popup window", true)
        await ChapterWiseTestsPage.btnLeftNavigation.click()
        await browser.pause(2000)
        allure.startStep("Verify next question button")
        expect(await ChapterWiseTestsPage.nextQuestion.isExisting()).toEqual(true)
        allure.startStep("click on next question button", true)
        await ChapterWiseTestsPage.nextQuestion.click()
        allure.startStep("Verify previous question button")
        expect(await ChapterWiseTestsPage.prevQuestion.isExisting()).toEqual(true)
        allure.startStep("click on previous question button", true)
        await ChapterWiseTestsPage.prevQuestion.click()

    });
    it("331730 TC_06- Neo Paid User - Verify based on subjects selected in CWT it should navigate to set of similar questions on 'have a doubt' page as well ", async () => {
            await browser.reloadSession()
            allure.startStep("Login to Learn Portal", true)
            await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
            await TouchPointPage.preConnectwithTutorValidation()
            await browser.pause(5000)
            if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
            {
            allure.startStep("Navigate to CWT Module", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            await browser.pause(3000)
            allure.startStep("Click on First subject", true)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isClickable()
            if (retakeTest) {
                await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnAnalysis.click()
    
                let qustionLenght = $("//div[@class='test_fibOption__1C536']").length
                let questionArrayAanalysisPage = []
                for (let i = 1; i <= qustionLenght; i++) {
                    questionArrayAanalysisPage.push(await TouchPointPage.getTextOfQuestions(i).getText())
                }
    
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
    
                let questionsInPopUPConncetToTutor = $("//div[@class='questionTitle']").length
                for (let i = 1; i <= questionsInPopUPConncetToTutor; i++) {
    
                    expect(questionArrayAanalysisPage.includes(await TouchPointPage.getTextOfQuestionsConnectToTutorPopup(i).getText())).toEqual(true)
                }
    
            }
            else {
                await TouchPointPage.subjectSubjectCard(2).waitForClickable({ timeout: 35000 })
                await TouchPointPage.subjectSubjectCard(2).click()
                await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.ddTestOne.click()
                let takeTest = await ChapterWiseTestsPage.btnTakeATest.isClickable()
                if (takeTest) {
                    await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 35000 })
                    await ChapterWiseTestsPage.btnTakeATest.click()
                }
                else {
                    await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
                    await ChapterWiseTestsPage.retakeTest(1).click()
                }
                await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnStartTest.click()
                await ChapterWiseTestsPage.questionsHandling()
    
                let qustionLenght = $("//div[@class='test_fibOption__1C536']").length
                let questionArrayAanalysisPage = []
                for (let i = 1; i <= qustionLenght; i++) {
                    questionArrayAanalysisPage.push(await TouchPointPage.getTextOfQuestions(i).getText())
                }
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                let questionsInPopUPConncetToTutor = $("//div[@class='questionTitle']").length
                for (let i = 1; i <= questionsInPopUPConncetToTutor; i++) {
                    expect(questionArrayAanalysisPage.includes(await TouchPointPage.getTextOfQuestionsConnectToTutorPopup(i).getText())).toEqual(true)
                }
            }
        }else{
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
})