import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import LoginPage from "../../Pages/LoginPage"
import SignUpPage from "../../Pages/SignUpPage"
import CloudWatchPage from "../../Pages/CloudWatchPage"
import { signUpData } from "../../Data/SignUpData"
import { loginData } from "../../Data/LoginData"
let loginOLAPData = require('../../Data/OLAP_data/Login_OLAP_Data.json')



describe("OLAP - Login", async () => {

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("322486 TC_01 Validate the U_event_id 9200094, m_desc click on signup (don't have an account)", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        allure.startStep("click on signup (don't have an account) event triggred - 9200094", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200094",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322477 TC_02 Validate the U_event_id 9200091, m_desc view signup page", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        allure.startStep("View signup page event triggred - 9200091", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200091",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322481 TC_03 Validate the U_event_id 9200093, m_desc click on login after entering OTP", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("click on login after entering OTP event triggred - 9200093", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200093",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322482 TC_04 Validate the U_event_id 9201026, m_desc select account if multiple accounts", async () => {

        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("select account if multiple accounts event triggred - 9201026", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201026",null,loginOLAPData)).toEqual(true)
        allure.endStep()

    })
    it("322485 TC_05 Validate the U_event_id 9200092, m_desc click get OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        allure.startStep("Click get OTP event triggred - 9200092", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200092",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322478  TC_06 Validate the U_event_id 9201031, m_desc view login page", async () => {

        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await LoginPage.btnLogIn.waitForDisplayed({ timeout: 3000 })
        await LoginPage.btnLogIn.click()
        allure.startStep("view login page event triggred - 9201031", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201031",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322479 TC_07 Validate the U_event_id 9201032, m_desc click next to get OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        allure.startStep("click next to get OTP event triggred - 9201032", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201032",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })



    it("322492 TC_08 Validate the U_event_id 9200100, m_desc click resend OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await browser.pause(11000)
        await LoginPage.resendOtpLink.waitForDisplayed({ timeout: 37000 })
        await LoginPage.resendOtpLink.waitForClickable({ timeout: 37000 })
        await LoginPage.resendOtpLink.click()
        allure.startStep("Click resent OTP event triggred - 9200100", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200100",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322480 TC_09 Validate the U_event_id 9201025, m_desc click resend OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        let otp = signUpData.validData.validotp
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await browser.pause(32000)
        await LoginPage.resendOtpLink.waitForDisplayed({ timeout: 37000 })
        await LoginPage.resendOtpLink.waitForClickable({ timeout: 37000 })
        await LoginPage.resendOtpLink.click()
        allure.startStep(" click resend OTP event triggred - 9201025", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201025",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322493 TC_10 Validate the U_event_id 9200101, m_desc Incorrect OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await SignUpPage.enterOtp(['1', '0', '1', '1'])
        await SignUpPage.btnNext.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnNext.click()
        allure.startStep("Incorrect OTP triggred - 9200101", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200101",null,loginOLAPData)).toEqual(true)
        allure.endStep()

    })
    it("322494 TC_11 Validate the U_event_id 9201030, m_desc trigger incorrect OTP", async () => {
       
        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await SignUpPage.enterOtp(['1', '0', '1', '1'])
        await LoginPage.btnLogIn.waitForDisplayed({ timeout: 3000 })
        await LoginPage.btnLogIn.click()
        allure.startStep("Incorrect OTP triggred - 9201030", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201030",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322488 TC_12 Validate the U_event_id 9200095, m_desc view fill profile details page", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("view fill profile details page event triggred - 9200095", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200095",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("322489 TC_13 Validate the U_event_id 9200096, m_desc click next after OTP", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await SignUpPage.enterOtp(['1', '0', '1', '1'])
        await SignUpPage.btnNext.click()
        allure.startStep("click next after OTP- 9200096", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200096",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322490 TC_14 Validate the U_event_id 9200098, m_desc click back", async () => {

        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        let otp = signUpData.validData.validotp
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await SignUpPage.btnBack.waitForClickable({ timeout: 8000 })
        await SignUpPage.btnBack.click()
        allure.startStep("Click back event triggred - 9200098", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200098",null,loginOLAPData)).toEqual(true)
        allure.endStep()

    })

    it("322491 TC_15 Validate the U_event_id 9200099, m_desc click final login after entering details", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("click final login after entering details event triggred - 9200099", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200099",null,loginOLAPData)).toEqual(true)
        allure.endStep()

    })

    it("322483 TC_16 Validate the U_event_id 9201027, m_desc login successful (land on next screen)", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        allure.startStep("login successfull(Land on next page) event - 9201027", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201027",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322484 TC_17 Validate the U_event_id 9201028, m_desc user created and logged in", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("user created and logged in page event triggred - 9201028", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201028",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("322487 TC_18 Validate the U_event_id 9201029, m_desc click on login (already have an account)", async () => {

        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnSignUp.waitForClickable({ timeout: 3000 })
        await SignUpPage.btnSignUp.click()
        await SignUpPage.btnLoginSignupPage.waitForDisplayed({ timeout: 3000 })
        await SignUpPage.btnLoginSignupPage.click()
        allure.startStep(" click on login (already have an account) event triggred - 9201029", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201029",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })

    it("323312 TC_19 Validate the U_event_id 9201035, m_desc Click to go back to old dashboard", async () => {

        await ProfilePage.openByjusLearnPage()
        await LoginPage.btnClickHere.waitForDisplayed({ timeout: 3000 })
        await LoginPage.btnClickHere.waitForClickable({ timeout: 3000 })
        await LoginPage.btnClickHere.click()
        allure.startStep("Click to go back to old dashboard event triggred - 9201035", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201035",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
    it("323313 TC_20 Validate the U_event_id 9201036, m_desc Click to login using password", async () => {

        await ProfilePage.openByjusLearnPage()
        let phoneNumber = signUpData.validData.validPhoneNumber
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        await LoginPage.btnClickHere.waitForDisplayed({ timeout: 3000 })
        await LoginPage.btnClickHere.waitForClickable({ timeout: 3000 })
        await LoginPage.btnClickHere.click()
        allure.startStep("Click to login using password event triggred - 9201036", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9201036",null,loginOLAPData)).toEqual(true)
        allure.endStep()
    })
})