import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import SignUpPage from "../../../Pages/SignUpPage"
import { signUpData } from "../../../Data/SignUpData"

describe("Learn Portal - Sign up page test", async () => {

    it("306623 TC_01 - Sign up page submitting the form blank validations", async () => {
        allure.startStep("Open Learn Portal Signup page", true);
        await SignUpPage.loginToLearnPortalSignInPage()
        allure.startStep("Click on Next button",true)
        await SignUpPage.btnNext.click()
        allure.startStep("Wait for Validation message to appear",true)
        await SignUpPage.tfBlankNameValidator.isExisting({timeout:1500})
        allure.startStep("Validate Blank Name text field",true)
        expect(await SignUpPage.tfBlankNameValidator.isExisting()).toEqual(true)
        allure.startStep("Validate Blank Email text field",true)
        expect(await SignUpPage.tfBlankEmailValidator.isExisting()).toEqual(true)
        allure.startStep("Validate Blank City dropdown",true)
        expect(await SignUpPage.ddBlankCity.isExisting()).toEqual(true)
        allure.startStep("Validate Blank Grade dropdown",true)
        expect(await SignUpPage.ddBlankGrade.isExisting()).toEqual(true)
    })

    it("306624 TC_02 - Sign up page validating the Email textfield", async () =>{
        let invalidEmails = signUpData.invalidEmails
        allure.startStep("Open Learn Portal Signup page", true);
        await SignUpPage.loginToLearnPortalSignInPage('free')
        allure.startStep("Validate invalid Email Adress text field",true)
        for (let i=0;i<invalidEmails.length;i++){
            await SignUpPage.tfEmailAdress.setValue(invalidEmails[i]);
            await SignUpPage.btnNext.click()
            await SignUpPage.invalidEmailAdress.isExisting({timeout:1500})
            expect(await SignUpPage.invalidEmailAdress.isExisting()).toEqual(true)
        }
        allure.startStep("Validate Email Adress text field",true)
        await SignUpPage.tfEmailAdress.setValue(signUpData.validEmailAdress);
        expect(await SignUpPage.invalidEmailAdress.isExisting()).toEqual(false)
    })

    it("306625 TC_03 - Sign up page complete flow", async () =>{
        allure.startStep("Open Learn Portal Signup page", true);
        await SignUpPage.loginToLearnPortalSignInPage('free')
        await SignUpPage.completeSignUp()
    })
    it("306626 TC_04 - Login to Learn Portal with valid phone number - invalid otp", async () => {
        allure.startStep("Open Learn Portal", true);
        await LoginPage.openByjusLearnPage()
        allure.startStep("Click Sign Up button", true);
        await SignUpPage.btnSignUp.click()
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(signUpData.validData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Enter invalid OTP", true);
        await SignUpPage.enterOtp(signUpData.invalidData.invalidotp)
        allure.startStep("Click on next", true);
        await $("//*[@type='button']").click()
        allure.startStep("Invalid OTP message should get displayed", true);
        await LoginPage.labelInvalidOtp.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidOtp.isDisplayed()).toEqual(true)
        const invalidErrorMsg = await LoginPage.labelInvalidOtp.getText()
        await expect(invalidErrorMsg).toEqual("Invalid OTP, please check the OTP and try again")
        await browser.reloadSession()
        allure.endStep();
    })
    it("306627 TC_05 - Login with phone number less that 10 digit", async () => {
        allure.startStep("Open Learn Portal", true);
        await LoginPage.openByjusLearnPage()
        allure.startStep("Click Sign Up button", true);
        await SignUpPage.btnSignUp.click()
        const phoneNoWithLessDigits = signUpData.validData.validPhoneNumber.substring(0, 5)
        allure.startStep("Enter phone number with less than 10 digits", true);
        await LoginPage.enterPhoneNumber(phoneNoWithLessDigits)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Invalid phone number messag should get displayed", true);
        await LoginPage.labelInvalidOtp.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidOtp.isDisplayed()).toEqual(true)
        await browser.reloadSession()
        allure.endStep()
    })

    it("306628 TC_06 - Login with alphanumeric and special charater", async () => {
        allure.startStep("Open Learn Portal", true);
        await LoginPage.openByjusLearnPage()
        allure.startStep("Click Sign Up button", true);
        await SignUpPage.btnSignUp.click()
        allure.startStep("Enter alpha numeric and special char to phone number", true);
        const nonNumricPhoneNumber = signUpData.invalidData.invalidPhoneNumber
        allure.startStep("Invalid phone number error message gets diaplyed", true)
        await expect(await LoginPage.validateNonNumericPhoneNumber(nonNumricPhoneNumber)).toEqual("")
        await browser.reloadSession()
        allure.endStep()
    })
    it("306629 TC_07 - Validate country name with country code", async () => {
        allure.startStep("Open Learn Portal", true);
        await LoginPage.openByjusLearnPage()
        allure.startStep("Click Sign Up button", true);
        await SignUpPage.btnSignUp.click()
        let expectedResult = signUpData.countryDetails.countryCode[0]
        allure.startStep("Get country code for India", true)
        let actualResult = await SignUpPage.countryCodeValidationForIndia()
        allure.startStep("Country code and Name matches for India", true)
        expect(expectedResult).toEqual(actualResult)
        allure.startStep("Code and country details matches for other countries", true)
        await SignUpPage.countryCodeValidationForOtherCountries()
        await browser.reloadSession()
        allure.endStep()
    })

})