import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import { loginData } from "../../../Data/LoginData"
import ProfilePage from "../../../Pages/ProfilePage"


describe("Learn Portal - Login Test cases", async () => {

    beforeEach("Open Login portal", async () => {
        
        await LoginPage.openByjusLearnPage()        
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("306578 TC_01 Free User-Login to Learn Portal - With valid phone number and otp", async () => {
        allure.startStep("Enter valid phone number and otp login to learn portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.endStep();
    })

    it("306579 TC_02 Free User-Login to Learn Portal with valid phone number - invalid otp", async () => {
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

    it("306580 TC_03 Free User-Login with phone number less that 10 digit ", async () => {
        const phoneNoWithLessDigits = loginData.validData.validPhoneNumber.substring(0, 5)
        allure.startStep("Enter phone number with less than 10 digits", true);
        await LoginPage.enterPhoneNumber(phoneNoWithLessDigits)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Invalid phone number messag should get displayed", true);
        await LoginPage.labelInvalidOtp.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidOtp.isDisplayed()).toEqual(true)
        allure.endStep()
    })

    it("306581 TC_04 Free User-Login with alphanumeric and special charater ", async () => {
        allure.startStep("Enter alpha numeric and special char to phone number", true);
        const nonNumricPhoneNumber = loginData.invalidData.invalidPhoneNumber
        allure.startStep("Invalid phone number error message gets diaplyed", true)
        await expect(await LoginPage.validateNonNumericPhoneNumber(nonNumricPhoneNumber)).toEqual("")
        allure.endStep()
    })

    it("306582 TC_05 Free User-Validate country name with country code", async () => {

        let expectedResult = loginData.countryDetails.countryCode[0]
        allure.startStep("Get country code for India", true)
        let actualResult = await LoginPage.countryCodeValidationForIndia()
        allure.startStep("Country code and Name matches for India", true)
        expect(expectedResult).toEqual(actualResult)
        allure.startStep("Code and country details matches for other countries", true)
        await LoginPage.countryCodeValidationForOtherCountries()
        allure.endStep()
    })

    
    it("306583 TC_06 Free User-Otp page fields validation",async() => {

        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.invalidData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Field validation in of phone number in otp page",true)
        await LoginPage.labelphoneNumber.waitForDisplayed({timeout:5000})
        allure.startStep("Field validation in of Resend OTP link in otp page",true)
        await LoginPage.resendOtpLink.waitForDisplayed({timeout:10000})
        allure.startStep("Field validation in of OTP textbox in otp page",true)
        await LoginPage.otpPageValidation()   
        await LoginPage.btnLogIn.click()  
        allure.endStep()
    })

    it("306584 TC_07 Free User-Check Resend OTP button is working fine and try entering the default otp again",async() => {

        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.validData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Field validation in of Resend OTP link in otp page",true)
        await LoginPage.resendOtpLink.waitForDisplayed({timeout:10000})
        allure.startStep("Click on resend OTP button",true)
        await browser.pause(10000) //waiting for the resend OTP countdown.
        allure.startStep("Click on button Resend OTP", true);
        await LoginPage.resendOtpLink.click()
        allure.startStep("Enter a valid OTP", true);
        await LoginPage.enterOtp(loginData.validData.validotp)
        try{
            await LoginPage.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
          }
          catch
          {
              //do nothing
          }
          
          let activeSessionMsg = await LoginPage.multipleSessionActiveMsg.isDisplayed()
          if(activeSessionMsg)
          {
            await LoginPage.btnContinue.waitForClickable({timeout : 7500})
            await LoginPage.btnContinue.click()
          }
        allure.startStep("Waiting for skip a tour button to be visible and clickable")
        await ProfilePage.btnskipTour.waitForClickable({timeout:15000})
        await ProfilePage.btnskipTour.click()
        allure.startStep("Waiting for Book Trial window to be clickable", true);
        let bookTrailWindowDisplayed = await ProfilePage.bookTrailWindow.isDisplayed({ timeout: 5000 })
        if (bookTrailWindowDisplayed) {
          await ProfilePage.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
          await browser.refresh();
          try{await ProfilePage.ddProfile.waitForClickable({timeout:3000})}
          catch{}
        }
        allure.startStep("Waiting for Welcome text to get displayed on Profile Page", true);
        await ProfilePage.welcomeElement.waitForDisplayed({ timout: 1500 })
        await expect(await ProfilePage.welcomeElement.isDisplayed()).toEqual(true)
        allure.endStep()
})
})