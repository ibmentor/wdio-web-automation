import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage"
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import CloudWatchPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/byjusClasses_OLAP_Data.json')
let userID

describe("OLAP - Byju's Classes flows", async () => {

    it("320679 TC_01 Validate the U_event_id 9200134, m_desc click on byjus classes in burger menu", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200134", userID, localData)).toEqual(true)

    })

    it("320680 TC_02 Validate the U_event_id 9201021, m_desc view default classes landing page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("view default Classes event triggered - 9201021", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9201021", userID, localData)).toEqual(true)


    })
    it.skip("320681 TC_03 Validate the U_event_id 9200180 m_desc ask a doubt", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab event triggered - 9200180", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200180", userID, localData)).toEqual(true)


    })

    it("320685 TC_04 Validate the U_event_id 9200138 m_desc click remind me on whatsapp ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        await ByjusClassesPage.btnRmaindMe.waitForClickable({ timeout: 45000 })
        await ByjusClassesPage.btnRmaindMe.click()
        allure.startStep("Click on Remaind me button - 9200138", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200138", userID, localData)).toEqual(true)


    })

    it("320686 TC_05 Validate the U_event_id 9200139 m_desc click submit phone number", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        await ByjusClassesPage.btnRmaindMe.waitForClickable({ timeout: 45000 })
        await ByjusClassesPage.btnRmaindMe.click()
        expect(await ByjusClassesPage.labelRemaindMePopupHeader.isDisplayed({ timeout: 15000 })).toEqual(true)
        await ByjusClassesPage.btnRemaindMeSubmit.click()
        allure.startStep("Click submit phone number - 9200139", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200139", userID, localData)).toEqual(true)


    })

    it("320687 TC_06 Validate the U_event_id 9200140 m_desc click to swap", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Rebook Class event triggered - 9200140", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200140", userID, localData)).toEqual(true)


    })
    it("320688 TC_07 Validate the U_event_id 9200141 m_desc click timeslot", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnslotstime.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnslotstime.click()
        allure.startStep("Select the TimeSlot event triggered - 9200141", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200141", userID, localData)).toEqual(true)


    })
    it("320689 TC_08 Validate the U_event_id 9200142 m_desc click book class", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        allure.startStep("book Class event triggered - 9200142", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200142", userID, localData)).toEqual(true)


    })
    it("320690 TC_09 Validate the U_event_id 9201022 m_desc class successfully booked trigger ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        allure.startStep("book Class event triggered - 9201022", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9201022", userID, localData)).toEqual(true)


    })
    it("320691 TC_10 Click on Back to Byjus Class event triggered - 9200143", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout: 25000 })
        await ByjusClassesPage.btnBookClass.click()
        await ByjusClassesPage.btnBackToByjusClass.waitForClickable({ timeout: 35000 })
        await ByjusClassesPage.btnBackToByjusClass.click()
        allure.startStep("Click on Back to Byjus Class event triggered - 9200143", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200143", userID, localData)).toEqual(true)


    })
    it("320692 TC_11 Click on For You Tab event triggered - 9200144", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnForYouTab.waitForClickable({ timeout: 15000 })
        await ByjusClassesPage.btnForYouTab.click()
        allure.startStep("Click on For You Tab event triggered - 9200144", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200144", userID, localData)).toEqual(true)

    })

    it("320693 TC_12 Click on Completed Tab event triggered - 9200145", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.isClickable({ timeout: 45000 })
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("Click on Completed Tab event triggered - 9200145", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9200145", userID, localData)).toEqual(true)

    })
    it("320694 TC_13 Validate the U_event_id 9201016 m_desc view upcoming/for_you screen", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnForYouTab.waitForClickable({ timeout: 15000 })
        await ByjusClassesPage.btnForYouTab.click()
        allure.startStep("Click on For You Tab event triggered - 9201016", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9201016", userID, localData)).toEqual(true)

    })
    it("320695 TC_14 Validate the U_event_id 9201017 m_desc view completed screen", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForClickable({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("view completed screen event triggered - 9201017", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("9201017", userID, localData)).toEqual(true)

    })

    it("320696 TC_15 Validate the U_event_id 6000001 m_desc Click on join now", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnJoinNow.waitForClickable({ timeout: 15000 })
        await ByjusClassesPage.btnJoinNow.click()
        allure.startStep("Click on join now event triggered - 6000001", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataForByjusClasses("6000001", userID, localData)).toEqual(true)

    })
})