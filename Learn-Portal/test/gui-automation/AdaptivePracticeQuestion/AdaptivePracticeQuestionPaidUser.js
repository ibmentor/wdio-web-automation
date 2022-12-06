import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import { loginData } from "../../../Data/LoginData"
import ProfilePage from "../../../Pages/ProfilePage"
import AdaptivePracticeQuestionsPage from "../../../Pages/AdaptivePracticeQuestionsPage"
import { adaptivePracticeQuestionData } from "../../../Data/AdaptivePracticeQuestionData"
import DashboardPage from "../../../Pages/DashboardPage"

describe("Learn Portal - Adaptive Practice Question test - Paid user flow", async () => {

    
    it("306345 TC_01 Paid user - Validate user is able to complete test flow for warm up section", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6])
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate warm up test flow",true)
        await AdaptivePracticeQuestionsPage.singleTestFlow()        
        allure.endStep();
    })

    it("306346 TC_02 Paid user - Validate user is able to take all the 6 test ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the complete test flow of 6 tests",true)
        await AdaptivePracticeQuestionsPage.completeTestFlow()        
        allure.endStep();
    })

    it("306347 TC_03 Paid user - Validate the book marked question is getting displayed under book mark tab", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the book marked question is getting displayed under book mark tab",true)
        await AdaptivePracticeQuestionsPage.bookMarkFlow()        
        allure.endStep();
    })

    it("306348 TC_04 Paid user - Validate View solution pop up of bookmarked questions", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate View solution pop up of bookmarked questions",true)
        await AdaptivePracticeQuestionsPage.viewSolutionPopupValidation()        
        allure.endStep();
    })

    it("306349 TC_05 Paid user - Validate instruction pop up before starting the test", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Instruction pop up validation",true)
        await AdaptivePracticeQuestionsPage.instructionPopupValidation()        
        allure.endStep();
    })

    it("306350 TC_06 Paid user - Validate resume test flow and continue to finish the test", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Instruction pop up validation",true)
        await AdaptivePracticeQuestionsPage.resumeTestFlow()      
        allure.endStep();
    })

    it("306351 TC_07 Paid user - Validate resume test - end practice flow", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("End Practice flow validation",true)
        await AdaptivePracticeQuestionsPage.resumeTestEndPracticeFlow()      
        allure.endStep();
    })

    it("306352 TC_08 Paid user - Analysis page- validation of al the section header", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
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
        allure.startStep("Validate Important Questions section Heading",true)
        expect(await $("//*[@class='swiper-title pe-2']").getText()).toHaveTextContaining("Important Questions")
        allure.endStep();   
    })

    it("306353 TC_09 Paid user - Perfomance statistics section validation", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Perfomance statistics percentage validation",true)
        expect(await $("//*[@class='percentage']").getText()).toHaveTextContaining("%")
        allure.startStep("Performance Statistics Helper text validation",true)
        expect(await $("//*[@class='performance-hepler-text']").getText()).toHaveTextContaining(adaptivePracticeQuestionData.performance_Statistics)
        allure.endStep();
    })

    it("306354 TC_10 Paid user - Analysis- Validate No of questions gets increase after taking the test each time ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'paid')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Retrieve the initial value of Question attempted",true)
        let initialValue = await $("(//*[@class='count'])[4]").getText()
        allure.startStep("Resume the test again",true)
        await DashboardPage.menuOption.click()
        await DashboardPage.btnAdaptivePracticeQuestions.click()
        await AdaptivePracticeQuestionsPage.resumeButton.click()
        await browser.pause(3000)
        await AdaptivePracticeQuestionsPage.questionsHandling()        
        allure.startStep("Retrieve the final value of Question attempted",true)
        let finalValue = await $("(//*[@class='count'])[4]").getText()
        initialValue = parseInt(initialValue.trim())
        finalValue = parseInt(finalValue.trim())
        let flag
        if(initialValue <  finalValue)
        { flag = true  
        }        
        else 
        { flag = false }
        
        expect(flag).toEqual(true)
        allure.endStep();
    })

    it("306355 TC_11 Paid user - Analysis - Accuracy Chart toottip validation ", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'paid')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        await AdaptivePracticeQuestionsPage.accuracyChart.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.accuracyChart.scrollIntoView()
        await AdaptivePracticeQuestionsPage.toolTipValidation('Accuracy', 2, 'hidden')
        await AdaptivePracticeQuestionsPage.accuracyChart.click()
        await AdaptivePracticeQuestionsPage.toolTipValidation('Accuracy', 3, 'visible')
        allure.endStep();


    })

    it("306356TC_12 Paid user - Analysis - Time Spent Chart toottip validation ", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'paid')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        await AdaptivePracticeQuestionsPage.timeSpentChart.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.timeSpentChart.scrollIntoView()
        await browser.pause(3000)
        await AdaptivePracticeQuestionsPage.toolTipValidation('Time Spent', 3, 'hidden')
        await AdaptivePracticeQuestionsPage.timeSpentChart.click()
        await AdaptivePracticeQuestionsPage.toolTipValidation('Time Spent', 4, 'visible')
        allure.endStep();

    })
})