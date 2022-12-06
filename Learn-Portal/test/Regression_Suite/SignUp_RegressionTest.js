import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import SignUpPage from "../../Pages/SignUpPage"
import { signUpData } from "../../Data/SignUpData"

describe("Learn Portal - Sign up page test", async () => {

    it("315998 TC_02 - Sign up page validating the Email textfield", async () =>{
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

    it("315999 TC_03 - Sign up page complete flow", async () =>{
        allure.startStep("Open Learn Portal Signup page", true);
        await SignUpPage.loginToLearnPortalSignInPage('free')
        await SignUpPage.completeSignUp()
    })

    it("316001 TC_05 - Login with phone number less that 10 digit", async () => {
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
        await LoginPage.labelInvalidPhoneNumber.waitForDisplayed({ timout: 10000 })
        await expect(await LoginPage.labelInvalidPhoneNumber.isDisplayed()).toEqual(true)
        allure.endStep()
    })
    
    it("316002 TC_06 - Login with alphanumeric and special charater", async () => {
        await browser.reloadSession()
        allure.startStep("Open Learn Portal", true);
        await LoginPage.openByjusLearnPage()
        allure.startStep("Click Sign Up button", true);
        await SignUpPage.btnSignUp.click()
        allure.startStep("Enter alpha numeric and special char to phone number", true);
        const nonNumricPhoneNumber = signUpData.invalidData.invalidPhoneNumber
        allure.startStep("Invalid phone number error message gets diaplyed", true)
        await expect(await LoginPage.validateNonNumericPhoneNumber(nonNumricPhoneNumber)).toEqual("")
        allure.endStep()
    })
    it("316003 TC_07 - Validate country name with country code", async () => {
        await browser.reloadSession()
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