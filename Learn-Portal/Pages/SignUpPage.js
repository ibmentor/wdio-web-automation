import { signUpData } from "../Data/SignUpData";
import BasePage from "./BasePage";
import LoginPage from "./LoginPage";
import OtpPage from "./OtpPage";
import {getRandomNum} from "../utils/function"
class SignUpPage extends BasePage {
    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     */
    get btnSignUp() { return $("//b[text()='Sign Up']") }
    get tfName() { return $("//input[@placeholder='Enter your name' ]") }
    get tfEmailAdress() { return $("//input[@placeholder='Enter your e-mail' ]")}
    get invalidEmailAdress() { return $("(//div[@data-popper-reference-hidden='false'])[2]")}
    get tfBlankNameValidator() { return $("//input[@placeholder='Enter your name']/..//i")}
    get tfBlankEmailValidator() { return $("//input[@placeholder='Enter your e-mail' ]/..//i")}
    get ddCity() { return $("//span[@id='react-select-2-live-region']/..")}
    get ddGrade() { return $("//span[@id='react-select-3-live-region']/..")}
    get ddBlankCity() { return $("//span[@id='react-select-2-live-region']/parent::div[contains(@class,'grade-input-error')]")}
    get ddBlankGrade() { return $("//span[@id='react-select-3-live-region']/parent::div[contains(@class,'grade-input-error')]")}
    get btnNext() { return $("//button[text()='Next']")}
    get btnBack() { return $("//*[@alt='back arrow']")}
    get btnLoginSignupPage() { return $("//b[text()='Log In']")}
    get ddCountryList() { return $("//*[@type='button']") }
    get tfSearchBox() { return $("//*[@placeholder='Search']") }
    get btnCountryCode() { return $("//*[@class='selected-country']/span") }

    async loginToLearnPortalSignInPage() {
        let phoneNumber = getRandomNum()
        let otp 
        await LoginPage.openByjusLearnPage()
        await $("//p[text()='Login']").waitForDisplayed({timeout:3000})
        await browser.pause(2000);
        await LoginPage.enterPhoneNumber(phoneNumber)
        await LoginPage.clickOnNext()
        if (process.env.ENV == "prod") {
          otp = await OtpPage.fetchOtp(phoneNumber)
        }
        else{
          await browser.pause(3000)
          await browser.newWindow("https://identity-staging.tllms.com/api/fetch/otp?phoneNumber=%2B91-"+phoneNumber)
          const handles = await browser.getWindowHandles()
          await browser.switchToWindow(handles[1]);
          otp = await $("//pre").getText()
          otp = otp.slice(1, otp.length - 1)
          otp = Array.from(otp)
          await browser.closeWindow();
          await browser.switchToWindow(handles[0]);
        }
        await LoginPage.enterOtp(otp)
        await browser.pause(3000)//waiting for the page to load completely  
        let cbPaiduserDisplayed = await LoginPage.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
        if (cbPaiduserDisplayed) {
          await LoginPage.cbPaidUserSelection.click()
          await LoginPage.btnLogIn.waitForClickable({ timeout: 15000 })
          await LoginPage.btnLogIn.click()
        }
    }
    
    async enterOtp(otp) {

        await browser.pause(5000);
        let otpValue = otp
        for (let i = 1; i <= 4; i++) {
    
          const otp = await $("(//div/input)[" + i + "]")
          await otp.waitForClickable({ timeout: 5000 })
          await otp.setValue(otpValue[i - 1])
    
        }
      }
    
    async completeSignUp() {
        await this.tfName.waitForClickable({timeout:8000})
        await this.tfName.setValue("Test")
        await this.tfEmailAdress.setValue("test@gmail.com")
        await this.ddCity.click()
        await browser.keys(["A","g"])
        await browser.keys('Tab')
        await browser.pause(1000)
        await this.ddGrade.click()
        await browser.keys(["4","t","h"])
        await browser.keys('Tab')
    }
    async validateCountryNamewithCodeValue(countryName) {

        let ddCountryDisplayed = await this.ddCountryList.isDisplayed({ timeout: 5000 });
        if (ddCountryDisplayed) {
          await this.ddCountryList.click()
        }
        await this.tfSearchBox.waitForClickable({ timeout: 5000 })
        await this.tfSearchBox.setValue(countryName)
        await $("//*[contains(text(),'" + countryName + "')]").click()
        await this.btnCountryCode.waitForClickable({ timeout: 5000 })
        let codeValue = await this.btnCountryCode.getText()
        return codeValue
      }
    async countryCodeValidationForIndia() {
        await this.ddCountryList.click()
        // await browser.pause(1000)
        await this.tfSearchBox.waitForClickable({ timeout: 5000 })
        await this.tfSearchBox.setValue(signUpData.countryDetails.countryName[0])
        await $("(//*[contains(text(),'" + signUpData.countryDetails.countryName[0] + "')])[2]").click()
        await this.btnCountryCode.waitForClickable({ timeout: 5000 })
        let codeValue = await this.btnCountryCode.getText()
        return codeValue
    
      }
      async countryCodeValidationForOtherCountries() {
        const countryList = signUpData.countryDetails.countryName
        let countryName, countryCode, result
        for (let i = 1; i < countryList.length; i++) {
          countryName = signUpData.countryDetails.countryName[i]
          countryCode = signUpData.countryDetails.countryCode[i]
          result = await this.validateCountryNamewithCodeValue(countryName)
          await expect(result).toEqual(countryCode)
    
        }
        }
}
export default new SignUpPage();