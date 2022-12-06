import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import { loginData } from "../../Data/LoginData"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
import ByjusClassesPage from "../../Pages/ByjusClassesPage"
let localData = require('../../Data/OLAP_data/Allsubjects_OLAP_Data.json')
let userID 
describe("OLAP - All subjects flow", async () => {

    it("320436 TC_01 Validate the U_event_id 9200120, m_desc view my subjects home page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("View my subjects home page event triggered- 9200120", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200120",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320440 TC_02 Validate the U_event_id 9200121, m_desc click on a subject", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnBiology.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnBiology.click()
        allure.startStep("click on a subject event triggered- 9200121", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200121",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
    it("320441 TC_03 Validate the U_event_id 9200176, m_desc click on a subject (explore other subjects)" , async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.exploreOtherSubjects.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.exploreOtherSubjects.click()
        allure.startStep("click on a subject (explore other subjects)  event triggered - 9200176", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200176",userID,localData)).toEqual(true)
        allure.endStep() 
    }) 
    it("320444 TC_04 Validate the U_event_id 9200124, m_desc click view concepts" , async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await browser.pause(3000)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 45000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        allure.startStep("click view concepts event triggered - 9200124", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200124",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
    it("320447 TC_05 Validate the U_event_id 9200127 m_desc click next chapter" , async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnNextChapter.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnNextChapter.click()
        allure.startStep("click view concepts event triggered - 9200127", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200127",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
    it("320446 TC_06 Validate the U_event_id 9200126, m_desc click start learning", async () => {
        
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnStartLearning.click()
        allure.startStep("click view concepts event triggered - 9200126", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200126",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
    it("320443 TC_07 Validate the U_event_id 9200123, m_desc click on filter", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnStartLearning.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnStartLearning.click()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.ddfilterSubjects.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.ddfilterSubjects.click()
        await browser.keys(["Mathematics", "Tab"])
        allure.startStep("click on filter event triggered - 9200123", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200123",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
    it("320448 TC_08 Validate the U_event_id 9200177, m_desc click on recommended videos", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnPlayRecomendedVideos.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.btnPlayRecomendedVideos.scrollIntoView()
        await AllSubjectsPage.btnPlayRecomendedVideos.click()
        allure.startStep("click on recommended videos event triggered - 9200177", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200177",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320449 TC_09 Validate the U_event_id 9200178, m_desc click join now class", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnJoinNow.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.btnJoinNow.scrollIntoView()
        await AllSubjectsPage.btnJoinNow.click()
        allure.startStep("click join now class event triggered - 9200178", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200178",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320450 TC_10 Validate the U_event_id 9200179, m_desc click remind me whatsapp", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        if(await AllSubjectsPage.btnRemindmeWhatsapp.isDisplayed() == true){
        await AllSubjectsPage.btnRemindmeWhatsapp.scrollIntoView()
        await AllSubjectsPage.btnRemindmeWhatsapp.click()
        allure.startStep("click remind me whatsapp event triggered - 9200179", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200179",userID,localData)).toEqual(true)
    }else{
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
        allure.endStep()

    })


    it("320438 TC_11 Validate the U_event_id 9200174, m_desc click to take test", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnTakeTest.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnTakeTest.click()
        allure.startStep("click to take test event triggered - 9200174", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200174",userID,localData)).toEqual(true)

    })    
        
    it("320439 TC_12 Validate the U_event_id 9200175, m_desc click to practice" , async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnPractice.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnPractice.click()
        allure.startStep("Click to Practice triggered - 9200175", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200175",userID,localData)).toEqual(true)
        allure.endStep()
    })    
    it("320437 TC_13 Validate the U_event_id 9200173, m_desc ask a doubt"  , async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 35000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({ timeout: 25000 })
        await AllSubjectsPage.btnaskADoubtSideBar.click()
        allure.startStep("Ask a doubt triggered - 9200173", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200173",userID,localData)).toEqual(true)
        allure.endStep()
    })

    it('322409 TC_14 validate the U_events_id 9201048 m_desc click my subjects home page',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("click on homepage dashboard burger menu triggered - 9201048", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201048",userID,localData)).toEqual(true)
        allure.endStep()
    });
       
})