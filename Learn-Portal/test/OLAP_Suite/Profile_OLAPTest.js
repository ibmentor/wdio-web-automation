import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage"
import CloudWatchPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
let profileOLAPdata = require('../../Data/OLAP_data/profile_OLAP_Data.json')
let userID 

describe("OLAP - Profile Module", async () => {
    it("320697 TC_01 Validate the U_event_id 9110405, m_desc view profile landing page", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        allure.startStep("View profile landing page event triggred - 9110405", true)
        await ProfilePage.btnProfile.click()
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9110405",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })
    it("320699 Validate the U_event_id 9200027, m_desc click on subscriptions", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnSubscriptions.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnSubscriptions.click()
        allure.startStep("Click on subscriptions event triggred - 9200027", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200027",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })


    it("320698 TC_03 Validate the U_event_id 9200025, m_desc click on personal details", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnSubscriptions.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnSubscriptions.click()
        await ProfilePage.btnPersonalDetails.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnPersonalDetails.click()
        allure.startStep("Click on personal details event triggred - 9200025", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200025",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })
    it("320700 TC_04 Validate the U_event_id 9200028, m_desc click to edit DoB", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnSubscriptions.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnSubscriptions.click()
        await ProfilePage.btnPersonalDetails.click()
        await ProfilePage.tfDob.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.tfDob.click()
        allure.startStep("Click to edit DOB event triggred - 9200028", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200028",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })

    it("320702 TC_05 Validate the U_event_id 9200030, m_desc click on save", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await browser.keys(["11/12/2021"])
        await browser.keys(["Enter"])
        allure.startStep("Click on save button event triggred - 9200030", true)
        await ProfilePage.tfname.setValue("abcd")
        await ProfilePage.btnSave.click()
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200030",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })
    it("320703 TC_06 Validate the U_event_id 9200031, m_desc click on grade drop down", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        allure.startStep("Click on grade drop down event triggred - 9200031", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200031",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })

    it("320704 TC_07 Validate the U_event_id 9110406, m_desc click / select grade", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        allure.startStep("Click / select grade event triggred - 9110406", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9110406",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })

    it("320701 TC_08 Validate the U_event_id 9200029, m_desc click on request a call back", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBack.click()
        allure.startStep("Click on request a call back event triggred - 9200029", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200029",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })

    it("320705 TC_09 Validate the U_event_id 9110406, m_desc View request call back", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBack.click()
        allure.startStep("View request call back event triggred - 9200033", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200033",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()
    })

    it("320706 TC_10 Validate the U_event_id 9110406, m_desc Click submit after filling details for request call back", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBack.click()
        await ProfilePage.btnRequestCallBackSubmit.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBackSubmit.click()
        allure.startStep("Click submit after filling details for request call back event triggred - 9200034", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200034",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()

    })

    it("320707 TC_11 Validate the U_event_id 9200035, m_desc click cancel in request call back", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBack.click()
        await ProfilePage.btnRequestCallBackSubmit.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBackSubmit.click()
        await ProfilePage.btnBackToProfile.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnBackToProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBack.click()
        await ProfilePage.btnRequestCallBackCancel.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnRequestCallBackCancel.click()
        allure.startStep("Click cancel in request call back event triggred - 9200035", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200035",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()

    })
    it("320708  TC_12 Validate the U_event_id 9200036, m_desc click to edit profile picture", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        userID = await getUserId()
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()
        await ProfilePage.btnEditProfilePicture.waitForDisplayed({ timeout: 3000 })
        await ProfilePage.btnEditProfilePicture.click()
        allure.startStep("Click to edit profile picture event triggred - 9200036", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200036",userID,profileOLAPdata)).toEqual(true)
        allure.endStep()

    })
})