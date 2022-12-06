import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import MockTestPage from "../../Pages/MockTestPage";
import AITSPage from '../../Pages/AITSPage';
import { loginData } from "../../Data/LoginData"

describe("Learn Portal - Sanity test cases for Premium user", async () => {

it("TC_01 Sanity - Premium user - Page loading testing for AITS module", async () => {
    
    for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Validate AITS module for cohort "+cohortDetail,true)
        await AITSPage.navigateToAITSAndVerifyPageLoad(cohortDetail,'paid')
        }
        allure.endStep()

})

it("TC_02 Sanity - Premium user - Page loading testing for Mock Test module", async () => {

    for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application Mock Test module test for "+cohortDetail,true)
        await MockTestPage.navigateMockTestAndVerifyPageLoad(cohortDetail,'paid')
        }
        allure.endStep()
    
})

})