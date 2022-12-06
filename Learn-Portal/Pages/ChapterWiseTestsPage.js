import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";
import { loginData } from "../Data/LoginData"

class ChapterWiseTestsPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get pageTitle() { return $("//*[@class='css-17wwswp']") }

    get subjectCard() { return $("(//div[@class='subject-name'])[1]") }

    get subjectNameBreadCrumb() { return $("(//li[@class='breadcrumb-item active'])[1]") }

    sidebarOtherSubjects(subjects) { return $(`(//div[@class='img-text-container'])[${subjects}]`) }

    get ddTestOne() { return $("(//i[@class='mdi mdi-chevron-down font-22 chapter-card-arrow'])[1]") }

    get breadCrumbCWT() { return $("//*[@class='breadcrumb-item']") }

    get labelTestCard() { return $("//*[@class='subjects-section rounded']") }

    get btnSubjectCard(){return $('(//div[contains(@class,"subjects-card")])[1]')}

    get btnTestCard() { return $('(//div[@class="card-header"])[1]') }

    retakeTest(count) { return $(`(//button[normalize-space()='Retake Test'])[${count}]`) }

    get btnCloseTest(){return $('.mdi.mdi-close')}

    get startTestPopUpInstructions() { return $("//*[@class='instruction-title mb-0 modal-title h4']") }

    get popUptimeLimit() { return $("//div[@class='instruction_info-container__3mI_N']//div[2]//p[1]") }

    get btnTakeATest() { return $("(//button[contains(text(),'Take Test')])[1]") }

    get btnStartTest() { return $("//button[contains(text(),'Start Test')]") }

    get btnNext() { return $("//button[contains(text(),'Next')]") }

    get btnBookmark() { return $("//*[@class='mdi mdi-bookmark-outline bookmarked me-2']") }

    get testCompletionMsg() { return $("//*[@class='d-flex align-items-center my-2']") }

    get btnViewResult() { return $("//button[@class='btn btn btn-primary']") }

    get labelPerformanceSummary() { return $("//*[@class='heading m-0']") }

    get btnFinish() { return $("//button[contains(text(),'Finish')]") }

    get textbox() { return $("//*[@id='fib.ControlTextarea']") }

    get btnRadioOption() { return $("(//*[@name='radio-group'])[1]") }

    get btnCheckBox() { return $("(//*[@type='checkbox'])[1]") }

    get questionSection() { return $("//*[@class='test_questionHeader__saJoF']") }

    get btnExitTest() { return $("//span[@class='practicetest_exitAssessmentText__9Noow']") }

    get btnCancelInExitAssessmentPopup() { return $("//button[contains(text(),'Cancel')]") }

    get btnEndTestInExitAssessmentPopup() { return $("//button[contains(text(),'End Test')]") }

    get btnAnalysis() { return $("(//button[contains(text(),'Analysis')])[1]") }

    get labelBreadCrumbAnalysis() { return $("//li[contains(text(),'Analysis')]") }

    get labelObjectiveTests() { return $("//span[@class='test-heading text-capitalize']") }

    get labelAnalysisSummary() { return $("//p[@class='heading m-0']") }

    get btnPrevious() { return $("//button[contains(text(),'Previous')]") }

    get listOfQuestionInTestPage() { return $("(//div[@class='question-item questions-display'])[1]") }

    get btnFeedback() { return $("//i[@class=' mdi mdi-clipboard-text cwt-feedback']") }

    get selectFeedbackOption() { return $(`//*[contains(@class,'css-8mmkcg')]`) }

    get btnSubmitFeedback() { return $("//button[contains(text(),'Submit')]") }

    get btnCancelFeedback() { return $("//button[contains(text(),'Cancel')]") }

    get tabRecentlySubmitted() { return $("//*[@data-rb-event-key='recently_submitted']") }

    get btnBookmarked() { return $('//*[@class="mdi mdi-bookmark not-bookmarked me-2"]') }

    get bookmarkQuestionOption() { return $("//*[text()='Bookmarked Questions']") }

    get viewSolutionPopUp() { return $("//*[text()='View Solution'][1]") }

    get bookmarkSubName() { return $('//div[@class="bookmark_subHeader__3vi-N d-none d-sm-block"]') }

    get btnRightNavigation() { return $('//*[@class="uil-angle-right fs-4"]') }

    get btnLeftNavigation() { return $('//*[@class="uil-angle-left fs-4"]') }

    get nextQuestion() { return $("//*[@class='bookmark_nextBtn__HTdb8 btn btn-link']") }

    get prevQuestion() { return $("//*[@class='bookmark_prevBtn__25kot btn btn-link']") }

    get tfQuestion() { return $('//div[@class="test_fibOption__1C536"]/p') }

    get selectSubject() { return $("(//p[@class='subject-name'])[1]") }

    selectTestDropDown(count) { return $(`(//i[@class="mdi mdi-chevron-down font-22 chapter-card-arrow"])[${count}]`) }

    subjectiveTest(count) { return $(`(//a[text()='Subjective Tests'])[${count}]`) }

    get retakeErrorText() { return $('//div[@class="tooltip-inner"]') }

    get objectiveTestCount() { return $$("//div[contains(text(),'Integers 0')]") }

    get btnSubjectiveAnalysis() { return $("(//p[contains(text(),'Subjective Test')]/ancestor::div/div/button[text()='Analysis'])[1]") }

    subjectiveRetakeTest(count) { return $(`(//p[contains(text(),'Subjective Test')]/ancestor::div/div/button[text()='Retake Test'])[${count}]`) }

    get labelAnalysisIsNotGenerated() { return $("//p[@class='d-flex align-items-center my-2']") }

    get btnRetakeTest() { return $("(//button[@class='sc-hKwDye FXTKi btn btn-purple btn-sm'])[1]") }

   retakeTest(testCount) {return $(`(//button[normalize-space()='Retake Test'])[${testCount}]`)}

   get btnClosePopup() {return $("//*[@class= 'mdi mdi-close']")}

   get testQuestionDescription() {return $("//*[@class='bookmarkStyles_question__3dU81']/p")}

   get btnViewAll() {return $("//*[@class='font-14 view-all-text']")}

   get btnAddClose() {return $("//*[@class='mdi mdi-bookmark ']")}

   get errorMessage() {return $("//*[contains(text(),'Cannot take more than 1 attempt')]")}

   get btnUnbookMark() {return $("(//img[@alt='unbkmkimg'])[1]")}

   get tabBookMark(){return $('(//a[@role="tab"])[2]')}

   btnFilterDropDown(count){return $(`(//*[contains(@class,'dropdown-indicator')])[${count}]`)}

   get selectedFilter(){return $("(//i[contains(@class,'mdi-filter-variant')]/following-sibling::div)[1]")}

   get ChapterNameOnFirstCard(){return $('(//div[contains(@class,"bookmarkStyles_question__")])[1]')}

   subjectNameOnCard(count){$(`(//div[contains(@class,'bookmarkStyles_question')]/parent::div/following-sibling::div/p)[${count}]`)}
   

    //Compering the time and Question for testcard here
    async timeAndQuestions(input) {
        if (parseInt(input.slice(0, 2).trim()) >= 15 && parseInt(input.slice(13, 15)) >= 10) {
        } else {
            return false
        }
    }
    async timeAndQuestionsForStartTestPopup(input) {
        if (parseInt(input.slice(17, 20).trim()) > 9 && parseInt(input.slice(33, 36)) > 14) {
        } else {
            return false
        }
    }

    async navigateToCWTAndPageLoad(cohortDetail) {
        // await browser.pause(2000)
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        await browser.pause(1000)

        if (loginData.cwtNotApplicable.includes(cohortDetail)) {

            expect(await DashboardPage.btnChapterWiseTests.isDisplayed({ timeout: 1000 })).toEqual(false)
        }

        else {
            await DashboardPage.btnChapterWiseTests.waitForClickable({ timeout: 1500 })
            await DashboardPage.btnChapterWiseTests.click()
            expect(await this.pageTitle.waitForDisplayed({ timeout: 15000 }))
            expect(await this.labelTestCard.waitForDisplayed({ timeout: 1500 }))

        }

    }
    async questionsHandling() {
        for (let i = 1; i <= 9; i++) {
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.scrollIntoView({block:"center"})
                await browser.pause(2000)
                await this.btnCheckBox.click()
            }

            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.scrollIntoView({block:"center"})
                await browser.pause(2000)
                await this.btnRadioOption.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
            }
            await this.btnNext.waitForClickable({ timeout: 25000 })
            await this.btnNext.click()
            await browser.pause(2000)
        }
        await this.btnFinish.moveTo()
        await this.btnFinish.click()
        await this.testCompletionMsg.waitForDisplayed({ timeout: 20000 })
        await this.btnViewResult.click()
        await this.labelPerformanceSummary.waitForDisplayed({ timeout: 40000 })

    }
    async bookmarkQuestionHandling() {
        for (let i = 1; i <= 4; i++) {
            try {
                await this.btnBookmark.waitForDisplayed({ timeout: 3000 })
                await this.btnBookmarked.waitForDisplayed({ timeout: 3000 })
            } catch { }
            if (await this.btnBookmark.isDisplayed()) {
                await this.btnBookmark.click()

            }
            else if (await this.btnBookmarked.isDisplayed()) {
                await this.btnBookmarked.click()
                await this.btnBookmark.waitForDisplayed({ timeout: 5000 })
                await this.btnBookmark.waitForClickable({ timeout: 2000 })
                await this.btnBookmark.click()
            }
            await this.btnNext.waitForClickable({ timeout: 2000 })
            await this.btnNext.click()

        }
        await browser.pause(3000)
        await browser.keys(["PageUp", "PageUp"])
        await this.btnExitTest.waitForDisplayed({ timeout: 4500 })
        await this.btnExitTest.click()
        await this.btnEndTestInExitAssessmentPopup.waitForDisplayed({ timeout: 5000 })
        await this.btnEndTestInExitAssessmentPopup.click()
        await this.navigateToCWTAndPageLoad()
        await this.bookmarkQuestionOption.click()

    }
}

export default new ChapterWiseTestsPage();