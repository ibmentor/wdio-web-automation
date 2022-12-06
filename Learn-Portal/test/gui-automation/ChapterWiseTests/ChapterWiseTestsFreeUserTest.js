import { AllureUtil as allure } from "../../../utils/util.allure"
import { chapterWiseTestsData } from "../../../Data/ChapterWiseTestsData";
import LoginPage from "../../../Pages/LoginPage";
import ProfilePage from "../../../Pages/ProfilePage";
import ChapterWiseTestsPage from "../../../Pages/ChapterWiseTestsPage"

describe("Learn Portal -Chapeter Wise Test cases for free user", async () => {
    it("306512 TC_01-Free User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort", async () => {
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


    it("306513 TC_02- Free User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort- Bread crumb  navigation", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject", true)
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Validate All subjects of explore more section", true)
        let noOfSubject = await $$("//div[@class='img-text-container']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let testName = await ChapterWiseTestsPage.sidebarOtherSubjects(i).getText()
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).click()
            let subjectBreadcrumb = await ChapterWiseTestsPage.subjectNameBreadCrumb.getText()
            allure.startStep("Validate subject name and bread crumb", true)
            expect(subjectBreadcrumb).toEqual(testName)
        }
        allure.endStep();
    })

    it("306514 TC_03- Free User-Validation of Retake a test flow", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("Start the test", true)
        await ChapterWiseTestsPage.questionSection.waitForDisplayed({ timeout: 35000 })
        await ChapterWiseTestsPage.questionsHandling()
        await expect(await ChapterWiseTestsPage.labelPerformanceSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();
    })

    it("306515 TC_04 - Free User-Validation of Exit Assessment flow", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
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
    it("306516 TC_05 Free User-Verify analysis button and redirection to analysis page through analysis button", async () => {

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
    it("306517 TC_06 Free User-Verify if analysis button is displayed then redirection to take a test page through retake test button", async () => {

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
    it("306518 TC_07 Free User-verify total number of question should be equal to total number of question in summary page", async () => {

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
        if(await ChapterWiseTestsPage.btnTakeATest.isDisplayed()){
        await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnTakeATest.click()
        }
        else{
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({timeout:25000})
            await ChapterWiseTestsPage.retakeTest(1).click()
        }
        let input = await $("//span[text()='Number of Questions :']/parent::p").getText()
        let questions=(parseInt(input.slice(22).trim()))
            await ChapterWiseTestsPage.btnStartTest.waitForDisplayed({timeout:5000})
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.btnExitTest.click()    
            await ChapterWiseTestsPage.btnEndTestInExitAssessmentPopup.click()
        await browser.pause(10000)
        let numberOfQues = await $$("//*[@class='test_heading__1TVPT' and contains(text(),'QUESTION')]").length
        expect(questions).toEqual(numberOfQues);
        allure.endStep();

    })
    it('306519 TC_08 Free User-Verify total number of tests in objective and Subjective Tests', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on first subject card", true)
        await ChapterWiseTestsPage.subjectCard.waitForDisplayed({ timeout: 3000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Click on test drop down", true)
        await ChapterWiseTestsPage.selectTestDropDown(1).waitForDisplayed({ timeout: 15000 })
        await ChapterWiseTestsPage.selectTestDropDown(1).click()
        let input = await $("(//p[@class='total-tests'])[1]").getText()
        let totalTest = (parseInt(input.slice(0, 2).trim()))
        let countOfTest = await ChapterWiseTestsPage.objectiveTestCount.length
        allure.startStep("Click on subjective test tab", true)
        await ChapterWiseTestsPage.subjectiveTest(1).waitForDisplayed({ timeout: 3000 })
        await ChapterWiseTestsPage.subjectiveTest(1).click()
        let countOfTestInSubjective = await $$('//div[contains(text(),"Integers Subjective Test")]').length
        allure.startStep("Verify total test count with objective and subjective test count", true)
        expect(await countOfTestInSubjective + countOfTest).toEqual(totalTest)
    });

    it('306520 TC_09 Free User-Verify add question feedback option ', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
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

    it('306521 TC_10 Free User-Verify Bookmark question option', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("click on bookmark question", true)
        for (let i = 0; i <= 5; i++) {
            try {
                await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({ timeout: 3000 })
                await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 3000 })
            } catch { }
            if (await ChapterWiseTestsPage.btnBookmark.isDisplayed()) {
                allure.startStep("Click on bookmark", true)
                await ChapterWiseTestsPage.btnBookmark.click()
                allure.startStep("Verify bookmark", true)
                expect(await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 5000 })).toEqual(true)

            }
            else if (await ChapterWiseTestsPage.btnBookmarked.isDisplayed()) {
                allure.startStep("Click on bookmark", true)
                await ChapterWiseTestsPage.btnBookmarked.click()
                await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({ timeout: 5000 })
                await ChapterWiseTestsPage.btnBookmark.click()
                allure.startStep("Verify bookmark", true)
                expect(await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 5000 })).toEqual(true)
                allure.startStep("Click on next button", true)
                await ChapterWiseTestsPage.btnNext.click()
            }
        }
    });
    it('306522 TC_11 Free User-Verify view solution pop up', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("go to Bookmarked Question ", true)
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({ timeout: 2000 })
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()
        await ChapterWiseTestsPage.viewSolutionPopUp.waitForDisplayed({ timeout: 3000 })
        let questionCount = await $$("//div[@class='recently-practised-body p-2 mb-2 card']").length
        if (questionCount < 3) {
            allure.startStep("Click on Retake", true)
            await ChapterWiseTestsPage.tabRecentlySubmitted.click()
            allure.startStep("Click on Retake test button", true)
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.retakeTest(1).moveTo()
            await ChapterWiseTestsPage.retakeTest(1).click()
            allure.startStep("Click on start a test", true)
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            allure.startStep("click on bookmark questions", true)
            await ChapterWiseTestsPage.bookmarkQuestionHandling()
        } else { }
        let subName = await $('//p[@class="subj-txt mb-0 py-1"][1]').getText()
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
    it('306523 TC_12 Free User-Verify Subjective Test retake error', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on subjective retake test button", true)
        if(await ChapterWiseTestsPage.subjectiveRetakeTest(1).isDisplayed()){
        await ChapterWiseTestsPage.subjectiveRetakeTest(1).waitForDisplayed({ timeout: 15000 })
        let countOfRetake = await $$("(//p[contains(text(),'Subjective Test')]/ancestor::div/div/button[text()='Retake Test'])").length
        for (let i = 1; i <= countOfRetake; i++) {
            allure.startStep("Click on subjective retake test button", true)
            await ChapterWiseTestsPage.subjectiveRetakeTest(i).click()
            allure.startStep("Verify retake error msg should display")
            expect(await ChapterWiseTestsPage.retakeErrorText.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        }
    }
    });

    it('306524 TC_13 Free User-Verify subjective analysis page', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("click on analysis", true)
        if(await ChapterWiseTestsPage.btnSubjectiveAnalysis.isDisplayed()){
        await ChapterWiseTestsPage.btnSubjectiveAnalysis.waitForDisplayed({ timeout: 5000 })
        await ChapterWiseTestsPage.btnSubjectiveAnalysis.click()
        await browser.pause(2000)
        let analysisPage = await $("//p[@class='performance-txt py-3 m-0']").isDisplayed()
        if (analysisPage)
            await expect(await ChapterWiseTestsPage.labelAnalysisSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        else {
            allure.startStep("Verify msg should display - Analysis is not generated yet")
            await expect(await ChapterWiseTestsPage.labelAnalysisIsNotGenerated.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
    }
    });
})