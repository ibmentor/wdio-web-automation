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





describe("Learn Portal - Sanity test cases for Paid user", async () => {

    it("TC_01 Sanity - Paid user - Page loading testing for all subject module", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to All sunject module and page loaded successfully for "+cohortDetail,true)     
        await AllSubjectsPage.navigateToAllSubjectAndVerifyPageLoad(cohortDetail)
        }
        allure.endStep();

    })  

    it("TC_02 Sanity - Paid user - Page loading testing for Concept video", async () => {

        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to concept Video module and page loaded successfully for "+cohortDetail,true)     
        await ConceptVideoPage.navigateToConceptVideoAndVerifyPageLoad(cohortDetail,'paid')
        }
        allure.endStep();

    })

    it("TC_03 Sanity - Paid user - Page loading testing for Byju's Classes module", async () => {

        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to Byjus classes and the page loaded succesfully for "+cohortDetail,true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad(cohortDetail)
        }
    allure.endStep();

    })

    it("TC_04  Sanity - Paid user - Page loading testing for APQ module", async () => {

        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to APQ and page loaded successfully for "+cohortDetail,true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad(cohortDetail)
        }
        allure.endStep();


    })

    it("TC_05 Sanity - Paid user - Page loading testing for CWT module", async () => {

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

    
       it("TC_06 Sanity - Paid user - Page loading testing for Ask a Doubt module", async () => {

        let cohortDetail1 = loginData.sanityData.cohortDetailsSanitySuite[9] 
        let cohortDetail2 = loginData.sanityData.cohortDetailsSanitySuite[23]           
         
        allure.startStep("Application navigates to Profile page and changes the  cohort > 5",true)
        await ProfilePage.changeCohortDetail(cohortDetail1,'paid')
        allure.startStep("Application navigates to Ask a Doubt and page loaded successfully",true)
        await AskADoubtPage.navigateToAskADoubtAndPageLoad(cohortDetail1)
        allure.startStep("Application navigates to Profile page and changes the  cohort <= 3",true)
        await ProfilePage.changeCohortDetail(cohortDetail2)
        allure.startStep("Validates Ask a doubt is not displayed in menu option")
        await AskADoubtPage.navigateToAskADoubtAndPageLoad(cohortDetail2)
        allure.endStep();

    })

    it("TC_07 Sanity - Paid user - Page loading testing for Download module", async () => {

        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to Downloads module and page loaded successfully for "+cohortDetail,true)
        await DownloadsPage.navigateToDownloadsAndPageLoad(cohortDetail,'paid')
        }
        allure.endStep();
    })

    it("TC_08 Sanity - Paid user - Page loading testing for DownloadApp module", async () => {

        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to Downloads APP module and page loaded successfully for "+cohortDetail,true)
        await DashboardPage.navigateToDownloadApp(cohortDetail)
        }
        allure.endStep();
    })

    it("TC_09 - Paid user Sanity- Aaksah live is loading for user with cohort > 10th and not for cohort <=10th", async () => {
        
        for(let i=0;i<loginData.sanityData.cohortDetailsSanitySuite.length;i++)
        {
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and change cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetail(cohortDetail,'paid')
        allure.startStep("Application navigates to Aaksah Live module and page loaded succesfully for "+cohortDetail,true)
        await ByjusClassesPage.navigateToAakashLiveClassesAndPageLoad(cohortDetail)
        }
        allure.endStep()

    })

    it("TC_10 Sanity - Paid user - Page loading testing for AITS module", async () => {
        
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

    it("TC_11 Sanity - Free user - Page loading testing for Mock Test module", async () => {

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
