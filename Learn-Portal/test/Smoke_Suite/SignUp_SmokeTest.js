import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import SignUpPage from "../../Pages/SignUpPage"
import { signUpData } from "../../Data/SignUpData"

describe("Learn Portal - Sign up page test", async () => {

    it("315997 TC_01 - Sign up page submitting the form blank validations", async () => {
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

    it("316000 TC_04 - Login to Learn Portal with valid phone number - invalid otp", async () => {
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

})
