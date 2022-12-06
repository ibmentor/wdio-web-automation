import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import { adaptivePracticeQuestionData } from "../../Data/AdaptivePracticeQuestionData"
import DashboardPage from "../../Pages/DashboardPage"
import TouchPointPage from "../../Pages/TouchPointPage";
import { touchPointData} from "../../Data/TouchPointData";
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]

describe("Learn Portal - Adaptive Practice Question test - Free user flow", async () => {

    
    it("315651 TC_01 Free user- Validate user is able to complete test flow for warm up section", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6])
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate warm up test flow",true)
        await AdaptivePracticeQuestionsPage.singleTestFlow()        
        allure.endStep();
    })

    it("315652 TC_02 Free user- Validate user is able to take all the 6 test ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the complete test flow of 6 tests",true)
        await AdaptivePracticeQuestionsPage.completeTestFlow()        
        allure.endStep();
    })

    it("315655 TC_05 Free user- Validate instruction pop up before starting the test", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Instruction pop up validation",true)
        await AdaptivePracticeQuestionsPage.instructionPopupValidation()
        allure.endStep();
    })

    it("315656 TC_06 Validate resume test flow and continue to finish the test", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to concept video menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Instruction pop up validation",true)
        await AdaptivePracticeQuestionsPage.resumeTestFlow()      
        allure.endStep();
    })

    it("331749 TC_01 - Paid User - Verify the touchpoint feature for APQ module", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        allure.startStep("Navigate to APQ Module", true)
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.startAndEndPracticeForTouchPoint()
        await TouchPointPage.btnConnectToTutorAPQ.waitForDisplayed({timeout:4500})
        // await browser.keys(["PageDown","PageDown","PageDown"])
        await TouchPointPage.btnConnectToTutorAPQ.scrollIntoView({block:"center"})
        await browser.pause(3000)
        await TouchPointPage.btnConnectToTutorAPQ.click()
        expect(await TouchPointPage.popupTouchPointAPQ.isDisplayed()).toEqual(true)
        await TouchPointPage.popupTouchPointQuestionAPQ.waitForDisplayed({timeout:4500})
        await TouchPointPage.popupTouchPointQuestionAPQ.click()
        await TouchPointPage.popupBtnConnectToTutorAPQ.click()
        await TouchPointPage.popupConnectToTutorViaAPQ.waitForDisplayed({timeout:35000})
        expect(await TouchPointPage.popupConnectToTutorViaAPQ.isDisplayed()).toEqual(true)
        allure.endStep();
    }
    else{
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