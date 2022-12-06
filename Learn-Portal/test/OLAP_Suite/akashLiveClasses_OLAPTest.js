import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/akashLiveClasses_OLAP_Data.json')
let userID 



describe("OLAP - Aakash Live Classes flows", async () => {

    it("TC_01 Validate the U_event_id 9200181, m_desc Select aaksh classes from burger menu", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14]) 
        userID = await getUserId()
        await ByjusClassesPage.navigateToAakashLiveClassesAndPageLoad(loginData.sanityData.cohortDetails[14])
        allure.startStep("Click on Aakash Live Class event triggered - 9200181",true)  
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200181",userID,localData)).toEqual(true)
        allure.endStep()
    })
  it("TC_02 Validate the U_event_id 9200180, m_desc Click on Book a free trial from akash banner", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14]) 
        userID = await getUserId()
        await ByjusClassesPage.navigateToAakashLiveClassesAndPageLoad(loginData.sanityData.cohortDetails[14])
        await ByjusClassesPage.labelAakashLiveClass.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.labelAakashLiveClass.click()
        allure.startStep("Click on Book a Free Class botton event triggered - 9201033",true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201033",userID,localData)).toEqual(true)
        allure.endStep()
     
    })
})