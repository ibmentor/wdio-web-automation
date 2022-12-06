import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"

describe("Learn Portal - Login Test cases", async () => {

    beforeEach("Open Login portal", async () => {
        
        await LoginPage.openByjusLearnPage()        
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    
    it("315931 TC_02 Free User-Login to Learn Portal with valid phone number - invalid otp", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.invalidData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Enter invalid OTP", true);
        await LoginPage.enterOtp(loginData.invalidData.invalidotp)
        allure.startStep("Invalid OTP message should get displayed", true);
        await LoginPage.labelInvalidOtp.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidOtp.isDisplayed()).toEqual(true)
        const invalidErrorMsg = await LoginPage.labelInvalidOtp.getText()
        await expect(invalidErrorMsg).toEqual("Invalid OTP, please check the OTP and try again")
        allure.endStep();

    })

    it("315932 TC_03 Free User-Login with phone number less that 10 digit ", async () => {
        const phoneNoWithLessDigits = loginData.validData.validPhoneNumber.toString().substring(0, 5)
        allure.startStep("Enter phone number with less than 10 digits", true);
        await LoginPage.enterPhoneNumber(phoneNoWithLessDigits)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Invalid phone number message should get displayed", true);
        await LoginPage.labelInvalidPhoneNumber.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidPhoneNumber.isDisplayed()).toEqual(true)
        allure.endStep()
    })

    it("315933 TC_04 Free User-Login with alphanumeric and special charater ", async () => {
        allure.startStep("Enter alpha numeric and special char to phone number", true);
        const nonNumricPhoneNumber = loginData.invalidData.invalidPhoneNumber
        allure.startStep("Invalid phone number error message gets diaplyed", true)
        await expect(await LoginPage.validateNonNumericPhoneNumber(nonNumricPhoneNumber)).toEqual("")
        allure.endStep()
    })

    it("315934 TC_05 Free User-Validate country name with country code", async () => {

        let expectedResult = loginData.countryDetails.countryCode[0]
        allure.startStep("Get country code for India", true)
        let actualResult = await LoginPage.countryCodeValidationForIndia()
        allure.startStep("Country code and Name matches for India", true)
        expect(expectedResult).toEqual(actualResult)
        allure.startStep("Code and country details matches for other countries", true)
        await LoginPage.countryCodeValidationForOtherCountries()
        allure.endStep()
    })

    
    it("315935 TC_06 Free User-Otp page fields validation",async() => {

        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.invalidData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Field validation in of phone number in otp page",true)
        await LoginPage.labelphoneNumber.waitForDisplayed({timeout:5000})
        await browser.pause(2000)
        allure.startStep("Field validation in of Resend OTP link in otp page",true)
        await LoginPage.resendOtpButton.waitForDisplayed({timeout:30000})
        allure.startStep("Field validation in of OTP textbox in otp page",true)
        await LoginPage.otpPageValidation()   
        await LoginPage.btnLogIn.click()  
        allure.endStep()
    })

    it("315938 Paid User-Login to Learn Portal Paid user flow - Profile Validation", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.paidUser.validPhoneNumber)
        allure.startStep("Click on next button", true);
        await LoginPage.clickOnNext()
        allure.startStep("Enter a valid OTP", true);
        await LoginPage.enterOtp(loginData.paidUser.validotp)
        await browser.pause(4000)
        allure.startStep("Select user profile", true)
        let noOfProfiles = await $$("//*[contains(@class,'prof-card-sel')]")
        
        for (let i = 1; i <= noOfProfiles.length; i++) {
            let userName = await $("(//*[contains(@class,'prof-card-sel')])[" + i + "]").getText()
            let profileName
            if (/\d/.test(userName)) {
                profileName = userName.slice(0,"")
                
              }
            else {
                profileName = userName.slice(0,"")
            }
            //To convert the first letter of user name to upper case
            profileName = profileName.charAt(0).toUpperCase() + profileName.slice(1)
            await $("(//*[@type='radio'])[" + i + "]").click()
            await LoginPage.btnLogIn.waitForClickable({ timeout: 15000 })
            await LoginPage.btnLogIn.click()
            await ProfilePage.multipleSessionActiveMsg()
            await ProfilePage.clickButtonSkipATour()
            await ProfilePage.clickButtonBookATrialPopup()
            await LoginPage.logout()

            if (i < noOfProfiles.length) {
                await browser.pause(2000)
                allure.startStep("Login to next profile", true);
                await LoginPage.enterPhoneNumber(loginData.paidUser.validPhoneNumber)
                await LoginPage.clickOnNext()
                await LoginPage.enterOtp(loginData.paidUser.validotp)
                await browser.pause(2000)
            }
        }
        allure.endStep();
    })  

})