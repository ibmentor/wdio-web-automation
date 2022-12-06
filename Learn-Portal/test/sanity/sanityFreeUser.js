import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import MockTestPage from "../../Pages/MockTestPage";
import AITSPage from '../../Pages/AITSPage';
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import DashboardPage from "../../Pages/DashboardPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import { loginData } from "../../Data/LoginData"





describe("Learn Portal - Sanity test cases for Free user", async () => {

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("308231 TC_01 Sanity - Free user - Page loading testing for all subject module", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to All sunject module and page loaded successfully for "+cohortDetail,true)     
        await AllSubjectsPage.navigateToAllSubjectAndVerifyPageLoad(cohortDetail)
        }
        allure.endStep();
    }) 
    
    it("308232 TC_02 Sanity - Free user - Page loading testing for Concept video", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to concept Video module and page loaded successfully for "+cohortDetail,true)     
        await ConceptVideoPage.navigateToConceptVideoAndVerifyPageLoad(cohortDetail,'free')
        }
        allure.endStep();
    })
    
    it("308233 TC_03 Sanity - Free user - Page loading testing for Byju's Classes module", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to Byjus classes and the page loaded succesfully for "+cohortDetail,true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad(cohortDetail)
        }
        allure.endStep();
    })
    
    it("308234 TC_04  Sanity - Free user - Page loading testing for APQ module", async () => { 
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to APQ and page loaded successfully for "+cohortDetail,true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad(cohortDetail)
        }
        allure.endStep();
    })
    
    it("308235 TC_05 Sanity - Free user - Page loading testing for CWT module", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to CWT and page loaded successfully for "+cohortDetail,true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad(cohortDetail)
        }
        allure.endStep();
    })
    
    // module has been changes
    it.skip("308236 TC_06 Sanity - Free user - Page loading testing for Ask a Doubt module", async () => {           
         
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to Ask a Doubt and page loaded successfully for "+cohortDetail,true)
        await AskADoubtPage.navigateToAskADoubtAndPageLoad(cohortDetail)
        }
        allure.endStep();  
    })
    
    it("308237 TC_07 Sanity - Free user - Page loading testing for Download module", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to Downloads module and page loaded successfully for "+cohortDetail,true)
        await DownloadsPage.navigateToDownloadsAndPageLoad(cohortDetail,'free')
        }
        allure.endStep();
    })
    
    it("308238 TC_08 Sanity - Free user - Page loading testing for DownloadApp module", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to Downloads APP module and page loaded successfully for "+cohortDetail,true)
        await DashboardPage.navigateToDownloadApp(cohortDetail)
        }
        allure.endStep();
    })
    
    
    it("308239 TC_09 Sanity - Free user - Aaksah live is loading for user with cohort > 10th and not for cohort <=10th", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort Details to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application navigates to Aaksah Live module and page loaded succesfully for "+cohortDetail,true)
        await ByjusClassesPage.navigateToAakashLiveClassesAndPageLoad(cohortDetail)
        }
        allure.endStep();
    })

    it("308240 TC_10 Sanity - Free user - Page loading testing for AITS module", async () => {     
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Validate AITS module for cohort "+cohortDetail,true)
        await AITSPage.navigateToAITSAndVerifyPageLoad(cohortDetail,'free')
        }
        allure.endStep();
    })

    it("308241 TC_11 Sanity - Free user - Page loading testing for Mock Test module", async () => {     
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Application Mock Test module test for "+cohortDetail,true)
        await MockTestPage.navigateMockTestAndVerifyPageLoad(cohortDetail,'free')
        }
        allure.endStep();
    })

})