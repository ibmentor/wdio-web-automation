import BasePage from "./BasePage";
import { loginData } from "../Data/LoginData"
import ProfilePage from "../Pages/ProfilePage"
import OtpPage from "../Pages/OtpPage"
import Personalization from "../Pages/PersonalizationPage"
import { loginProdData } from "../Data/LoginProdData";
import { fetchOtpUrl } from "../Config/Config";
import SignUpPage from "./SignUpPage";
import { getRandomNum, updateNumberInProdData } from "../utils/function";


class LoginPage extends BasePage {

  /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     */
  get btnLogIn() { return $("//button[text()='Login']") }

  get tfPhonenumber() { return $("//*[@type='text']") }

  get btnNext() { return $("//*[@type='submit']") }

  get labelInvalidOtp() { return $("//*[text()='Invalid OTP, please check the OTP and try again']") }

  get ddCountryList() { return $("//*[contains(@class,'countries-dropdown')]") }

  get tfSearchBox() { return $("//*[@placeholder='Search']") }

  get labelphoneNumber() { return $("//*[@class='number-disp']") }

  get labelInvalidPhoneNumber() { return $("//p[normalize-space()='Please enter valid mobile number']") }

  get resendOtpLink() { return $("//button[normalize-space()='Resend OTP']") }

  get cbPaidUserSelection() { return $("//*[@id='inline-radio-1']") }

  get ddProfile() { return $("//*[@id='dropdown-profile']") }

  get btnlogout() { return $("//a[@href='/learn/account/logout']") }

  get btnCountryCode() { return $("//*[@class='selected-country']/span") }

  get multipleSessionActiveMsg() { return $("//*[contains(text(),'Another session is active')]") }

  get btnContinue() { return $("//button[contains(text(),'Continue')]") }

  get labelLoginLimitExceeded() { return $("//*[text()='Login limit exceeded']") }

  get btnClickHere() { return $("//*[text()='Click here ']") }
  get resendOtpButton() { return $("//button[contains(text(),'Resend OTP')]") }

  //PassCode Locators
  get enterPasscodeTitle() { return $(`//*[text()='Please enter the 4 digit passcode set by you']`) }
  get resendPasscodeLink() { return $(`//*[contains(@class,'resend-link')]`) }
  get enterPasscodeSubTitle() { return $(`//*[text()='Enter Passcode']`) }
  get loginIssueText() { return $(`//*[//*[text()='Still facing issue with login?']`) }
  get callMentorText() { return $(`//*[contains(text(),'Call Mentor')]`) }
  get currentPasscode() { return $(`//*[contains(text(),'Current Passcode')]`) }
  get btnChangePasscode() { return $(`//*[contains(text(),'Change passcode')]`) }
  get changePasscodeTitle() { return $(`//*[contains(@class,'modal-title h4')]`) }
  get verifyPasscodeText() { return $(`//*[contains(text(),"Verify it's you")]`) }
  get enterOtpText() { return $(`//*[contains(text(),"please enter your 4 digit OTP")]`) }
  get btnConfirmOtp() { return $(`//*[contains(text(),"Confirm OTP")]`) }
  get setPassCodePopupTitle() { return $(`//*[contains(text(),"Set New Passcode")]`) }
  get btnConfirmPassCode() { return $(`//*[contains(text(),"Confirm Passcode")]`) }
  get passcodeSuccessText() { return $(`//*[contains(text(),"You have set the passcode successfully!")]`) }
  get numberOfPasscode() {return $$(`//input[@inputmode="numeric"]`)}
  get enterOtpTitle() {return $(`(//*[contains(text(),'Enter OTP')])[1]`)}
  get setupPasscodeTitle() {return $(`//*[contains(text(),'Would you like to set up a new passcode now?')]`)}
  get passcodeWrongAttemptError() {return $(`//*[text()='Enter Passcode']/parent::div/div//p`)}
  get nextButton() {return $(`//button[contains(text(),'Next')]`)}
  get btnDone() {return $(`//button[contains(text(),'Done')]`)}
  get passcodeSuccessSubText() {return $(`//*[contains(text(),"Now you can use the same passcode for subsequent future login.")]`)}
  get maxLimitExceedMsg() {return $(`//*[contains(text(),'You have exceeded maximum number of attempts')]`)}
  get btnForgotPasscode() {return $("//button[normalize-space()='Forgot Passcode']")}
  get btnConfirm() {return $("//button[normalize-space()='Confirm']")}
  get btnNextPasscode() {return $("//button[normalize-space()='Next']")}
  get logoByjus() {return $("//span[@class='topnav-logo-sm']//img[@alt='logo']")}
  get txtIncorrectPasscode() {return $("//p[normalize-space()='Wrong passcode. Try again or click Forgot passcode']")}
  get txtTwoAttemptLeft() {return $("//p[normalize-space()='Wrong passcode. You have only 2 attempts left, try again or click Forgot passcode']")}
  get txtOneAttemptLeft() {return $("//p[normalize-space()='Wrong passcode. You have only 1 attempts left, try again or click Forgot passcode']")}
  get txtExceededLimit() {return $("//b[normalize-space()='You have exceeded maximum number of attempts']")}
  get btnHelp() {return $("//b[normalize-space()='Help']")}
  get videoContainer() {return $("//*[contains(@class,'thumbnail-overlay-image')]")}
  get txtHowToFindPasscode() {return $("//p[normalize-space()='How to find your passcode']")}
  get txtStillIssue() {return $("//p[normalize-space()='Still facing issue with login?']")}
  get passcodeExpiredError() {return $('.sc-eFWqGp')}
  get passcodeSentMsgText() {return $('.sc-WCkqM')}
  get welcomeByjusText() {return $(`//*[contains(text(),"Welcome to BYJU'S!")]`)}
  get linkNotFoundError() {return $(`//*[contains(text(),"Link not found.")]`)}
  get setupPasscodeLater(){return $("//*[contains(text(),'I will set it up later')]")}
  get btnResendPasscode() {return $("//button[normalize-space()='Resend Passcode']")}
  get btnReset() {return $("//button[normalize-space()='Reset']")}
  get btnClose() {return $("//img[@alt='close-circle']")}
  get video_tab() {return $("(//div)[15]")}
  get nudgeProfilePage() {return $("//div[contains(text(),'Your system generated passcode will expire')]")}
  get btnClosePopup() {return $("//img[@alt='close popup']")}
  get btnSignUp() {return $("//b[normalize-space()='Sign Up']")}
  get btnGetOtp() {return $("//button[normalize-space()='Get OTP']")}
  //

  async otpPageValidation() {

    //await browser.pause(5000);  

    for (let i = 1; i <= 4; i++) {
      const otp = await $("(//div/input)[" + i + "]")
      await otp.waitForDisplayed({ timeout: 5000 })

    }

  }

  // This method will validate country code with name

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

  async clickOnLogin() {

    //await browser.pause(5000);
    let btnLoginDisplayed = await this.btnLogIn.isDisplayed({ timeout: 5000 });
    if (btnLoginDisplayed) {
      await this.btnLogIn.click()
    }

  }

  async enterPhoneNumber(phoneNumber) {

    // await browser.pause(5000);
    await this.tfPhonenumber.waitForClickable({ timeout: 2500 })
    let tfPhoneNumberDisplayed = await this.tfPhonenumber.isDisplayed({ timeout: 5000 });
    if (tfPhoneNumberDisplayed) {
      await this.tfPhonenumber.click()
      await this.tfPhonenumber.setValue(phoneNumber)
    }

  }

  async clickOnNext() {
    //await browser.pause(5000);
    await this.btnNext.waitForClickable({ timeout: 6000 })
    await this.btnNext.click()
  }

  async enterOtpPasscode(otp) {

    await $("//*[@class='otp-input']").waitForDisplayed({ timeout: 3000 })
    let otpValue = otp
    for (let i = 1; i <= 4; i++) {

      const otp = await $("(//div/input)[" + i + "]")
      await otp.waitForClickable({ timeout: 5000 })
      await otp.click()
      await otp.setValue(otpValue[i - 1])

    }
  }

  async enterOtpPasscodeProfile(otp) {

    await $("//*[@class='otp-input']").waitForDisplayed({ timeout: 3000 })
    let otpValue = otp
    for (let i = 15; i <= 18; i++) {

      const otp = await $("(//div/input)[" + i + "]")
      await otp.waitForClickable({ timeout: 5000 })
      await otp.click()
      await otp.setValue(otpValue[i - 15])

    }
  }

  async enterOtp(otp) {

    await $("//*[@class='otp-input']").waitForDisplayed({ timeout: 3000 })
    let otpValue = otp
    for (let i = 1; i <= 4; i++) {

      const otp = await $("(//div/input)[" + i + "]")
      await otp.waitForClickable({ timeout: 5000 })
      await otp.click()
      await otp.setValue(otpValue[i - 1])

    }

    await this.btnLogIn.waitForClickable({ timeout: 15000 })
    await this.btnLogIn.click()
  }

  async validateNonNumericPhoneNumber(nonNumericPhoneNumber) {

    let tfPhoneNumberDisplayed = await this.tfPhonenumber.isDisplayed({ timeout: 5000 });
    if (tfPhoneNumberDisplayed) {
      await this.tfPhonenumber.setValue(nonNumericPhoneNumber)
    }
    await this.tfPhonenumber.waitForDisplayed({ timeout: 3000 })
    const enteredValue = await this.tfPhonenumber.getText()
    return enteredValue;
  }

  async countryCodeValidationForIndia() {
    await this.ddCountryList.click()
    await this.tfSearchBox.waitForClickable({ timeout: 5000 })
    await this.tfSearchBox.setValue(loginData.countryDetails.countryName[0])
    await $("(//*[contains(text(),'" + loginData.countryDetails.countryName[0] + "')])[2]").click()
    await this.btnCountryCode.waitForClickable({ timeout: 5000 })
    let codeValue = await this.btnCountryCode.getText()
    return codeValue

  }
  async countryCodeValidationForOtherCountries() {

    const countryList = loginData.countryDetails.countryName
    let countryName, countryCode, result
    for (let i = 1; i < countryList.length; i++) {
      countryName = loginData.countryDetails.countryName[i]
      countryCode = loginData.countryDetails.countryCode[i]
      result = await this.validateCountryNamewithCodeValue(countryName)
      await expect(result).toEqual(countryCode)

    }
  }

  async loginToLearnPortal(user) {

    let phoneNumber, otp
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user == "free") {
        phoneNumber = loginData.validData.validPhoneNumber
        otp = loginData.validData.validotp
      }
      else if (user == "paid") {
        phoneNumber = loginData.paidUser.validPhoneNumber
        otp = loginData.paidUser.validotp
      }
      else if (user == "premium") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "btlp") {
        phoneNumber = loginData.btlpUser.validPhoneNumber
        otp = loginData.btlpUser.validotp
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "neo") {
        phoneNumber = loginData.neoUser.validPhoneNumber
      }
      else if (user == "newUser") {
        phoneNumber = loginData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginData.instaLearnUser.validPhoneNumber
        otp = loginData.instaLearnUser.validotp
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginData.doubtsOnChatUser.validPhoneNumber
        otp = loginData.doubtsOnChatUser.validotp
      }
      else if (user == "smoke1") {
        phoneNumber = loginData.smoke1.validPhoneNumber
        otp = loginData.smoke1.validotp
      }
      else if (user == "prePostUser") {
        phoneNumber = loginData.prePostUser.validPhoneNumber
      }
      else if (user == "todUser") {
        phoneNumber = loginData.todUser.validPhoneNumber
      }
      else if (user == "bdlc") {
        phoneNumber = loginData.todUser.validPhoneNumber
      }
      else if (user == "passcodeActivated") {
        phoneNumber = loginData.passcodeActivatedUser.validPhoneNumber
      }
      else if (user == "passcodeNotActivated") {
        phoneNumber = loginData.passcodeNotActivatedUser.validPhoneNumber
      }
      else if (user == "calendarUser") {
        phoneNumber = loginData.calendarUser.validPhoneNumber
      }
      else if (user == "byjusTestSeriesUser") {
        phoneNumber = loginData.byjusTestSeriesUser.validPhoneNumber
      }
    }

    else if (process.env.ENV == "prod") {
      if (user == "free") {
        phoneNumber = loginProdData.validData.validPhoneNumber
      }
      else if (user == "paid") {
        phoneNumber = loginProdData.paidUser.validPhoneNumber
      }
      else if (user == "premium") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "btlp") {
        phoneNumber = loginProdData.btlpUser.validPhoneNumber
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "neo") {
        phoneNumber = loginProdData.neoUser.validPhoneNumber
      }
      else if (user == "newUser") {
        phoneNumber = loginProdData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginProdData.instaLearnUser.validPhoneNumber
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginProdData.doubtsOnChatUser.validPhoneNumber
      }
      else if (user == "smoke1") {
        phoneNumber = loginProdData.smoke1.validPhoneNumber
      }
      else if (user == "prePostUser") {
        phoneNumber = loginProdData.prePostUser.validPhoneNumber
      }
      else if (user == "todUser") {
        phoneNumber = loginProdData.todUser.validPhoneNumber
      }
      else if (user == "bdlc") {
        phoneNumber = loginData.todUser.validPhoneNumber
      }
      else if (user == "passcodeActivated") {
        phoneNumber = loginData.passcodeActivatedUser.validPhoneNumber
      }
      else if (user == "passcodeNotActivated") {
        phoneNumber = loginData.passcodeNotActivatedUser.validPhoneNumber
      }
      else if (user == "calendarUser") {
        phoneNumber = loginProdData.calendarUser.validPhoneNumber
      }
    }
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(phoneNumber)
    await this.clickOnNext()
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user != "free" && user !="newUser") {
        await browser.pause(3000)
        if (await $("//*[contains(text(),'Enter OTP')]").isDisplayed()) {
          await this.getAndEnterOtpFreeNumber(phoneNumber)
        }
        else {
          await this.getAndEnterPasscode(phoneNumber)
        }
      }
      else if (user == "free" || user =="newUser") {
        await this.getAndEnterOtpFreeNumber(phoneNumber)
        
      }

    }

    if (process.env.ENV == "prod") {
      otp = await OtpPage.fetchOtp(phoneNumber, user)
      await this.enterOtp(otp)
      await browser.pause(6000)//waiting for the page to load completely
    }
    if (await this.labelInvalidOtp.isDisplayed({ timeout: 4500 }) && process.env.ENV == "prod" && user == "free") {
      await browser.reloadSession()
      let number = getRandomNum()
      await updateNumberInProdData(number)
      await this.loginToLearnPortalUsingNumber(number)
    }
    try {
      await SignUpPage.completeSignUp()
      await $("//button[text()='Next']").waitForClickable({ timeout: 1000 })
      await $("//button[text()='Next']").click()
    } catch { }
    try {
      await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
      if (this.labelLoginLimitExceeded.isDisplayed()) {
        await this.btnContinue.click()
      }
    }
    catch { }
    if (user == "paid" || user == "premium" || user == "btlp" || user == "bdlc" || user == "instaLearnUser" || user == "doubtsOnChatUser" || user == "prePostUser" || user == "neo" || user == "todUser" || user == "passcodeActivated" || user == "passcodeNotActivated" || user == "calendarUser" || user =="byjusTestSeriesUser") {
      try { await this.cbPaidUserSelection.waitForDisplayed({ timeout: 7000 }) } catch (error) { }
      let cbPaiduserDisplayed = await this.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
      if (cbPaiduserDisplayed) {
        await browser.pause(3000)
        // await this.cbPaidUserSelection.waitForDisplayed({timeout : 3000})
        // await this.cbPaidUserSelection.waitForClickable({timeout : 3000})
        // await this.cbPaidUserSelection.click()
        await this.btnLogIn.waitForDisplayed({ timeout: 10000 })
        await this.btnLogIn.waitForClickable({ timeout: 3000 })
        await this.btnLogIn.click()

        try {
          await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 6500 })
          if (this.labelLoginLimitExceeded.isDisplayed()) {
            await this.btnContinue.click()
          }
        }
        catch { }
      }
    }
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 7500 })
      await this.btnContinue.click()
    }
    try {
      await ProfilePage.btnskipTour.waitForDisplayed({ timeout: 7500 })
    }
    catch {
    }
    let skipTourDisplayed = await ProfilePage.btnskipTour.isDisplayed({ timeout: 7500 })
    if (skipTourDisplayed) {
      await ProfilePage.btnskipTour.waitForClickable({ timeout: 9000 })
      await ProfilePage.btnskipTour.click()
    }
    let bookTrailWindowDisplayed = await ProfilePage.bookTrailWindow.isDisplayed({ timeout: 5000 })
    if (bookTrailWindowDisplayed) {
      await ProfilePage.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
      await browser.refresh();
      try { await ProfilePage.ddProfile.waitForClickable({ timeout: 3000 }) }
      catch { }
    }
  }

  async selectPaidUserLogin() {
    await browser.pause(5000)//waiting for the page to load completely  
    let cbPaiduserDisplayed = await this.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
    if (cbPaiduserDisplayed) {
      await this.cbPaidUserSelection.waitForDisplayed({ timeout: 3000 })
      await this.cbPaidUserSelection.click()
    }
    await this.btnLogIn.waitForDisplayed({ timeout: 15000 })
    await this.btnLogIn.waitForClickable({ timeout: 15000 })
    await this.btnLogIn.click()

  }


  async loginToLearnPortalClickOnBookTrialPopupFreeUser() {
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(loginData.validData.validPhoneNumber)
    await this.clickOnNext()
    await this.enterOtp(loginData.validData.validotp)
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 3000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 5000 })
      await this.btnContinue.click()
    }
    try {
      await ProfilePage.btnskipTour.waitForDisplayed({ timeout: 45000 })
    }
    catch {
    }
    let skipTourDisplayed = await ProfilePage.btnskipTour.isDisplayed({ timeout: 45000 })
    if (skipTourDisplayed) {
      await ProfilePage.btnskipTour.waitForClickable({ timeout: 15000 })
      await ProfilePage.btnskipTour.click()
    }

  }

  async loginToLearnPortalClickOnBookTrialPopupPaidUser() {
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(loginData.paidUser.validPhoneNumber)
    await this.clickOnNext()
    await this.enterOtp(loginData.paidUser.validotp)
    await this.selectPaidUserLogin()
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 3000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 5000 })
      await this.btnContinue.click()
    }
    try {
      await ProfilePage.btnskipTour.waitForDisplayed({ timeout: 45000 })
    }
    catch {
    }
    let skipTourDisplayed = await ProfilePage.btnskipTour.isDisplayed({ timeout: 45000 })
    if (skipTourDisplayed) {
      await ProfilePage.btnskipTour.waitForClickable({ timeout: 15000 })
      await ProfilePage.btnskipTour.click()
    }
  }

  async logout() {
    await this.ddProfile.waitForClickable({ timeout: 15000 })
    await this.ddProfile.click()
    await this.btnlogout.waitForClickable({ timeout: 15000 })
    await this.btnlogout.click()
  }

  async loginToLearnPortalAndContinueTour(user) {

    let phoneNumber, otp
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user == "free") {
        phoneNumber = loginData.validData.validPhoneNumber
        otp = loginData.validData.validotp
      }
      else if (user == "paid") {
        phoneNumber = loginData.paidUser.validPhoneNumber
        otp = loginData.paidUser.validotp
      }
      else if (user == "premium") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "neo") {
        phoneNumber = loginData.neoUser.validPhoneNumber
      }
      else if (user == "newuser") {
        phoneNumber = loginData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginData.instaLearnUser.validPhoneNumber
        otp = loginData.instaLearnUser.validotp
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginData.doubtsOnChatUser.validPhoneNumber
        otp = loginData.doubtsOnChatUser.validotp
      }
      else if (user == "smoke1") {
        phoneNumber = loginData.smoke1.validPhoneNumber
        otp = loginData.smoke1.validotp
      }
      else if (user == "prePostUser") {
        phoneNumber = loginData.prePostUser.validPhoneNumber
      }
    }

    else if (process.env.ENV == "prod") {
      if (user == "free") {
        phoneNumber = loginProdData.validData.validPhoneNumber
      }
      else if (user == "paid") {
        phoneNumber = loginProdData.paidUser.validPhoneNumber
      }
      else if (user == "premium") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "neo") {
        phoneNumber = loginProdData.neoUser.validPhoneNumber
      }
      else if (user == "newuser") {
        phoneNumber = loginProdData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginProdData.instaLearnUser.validPhoneNumber
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginProdData.doubtsOnChatUser.validPhoneNumber
      }
      else if (user == "smoke1") {
        phoneNumber = loginProdData.smoke1.validPhoneNumber
      }
      else if (user == "prePostUser") {
        phoneNumber = loginProdData.prePostUser.validPhoneNumber
      }
    }
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(phoneNumber)
    await this.clickOnNext()
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user != "free" && user != "newUser") {
        await browser.pause(3000)
        if (await $("//*[contains(text(),'Enter OTP')]").isDisplayed()) {
          await this.getAndEnterOtpFreeNumber(phoneNumber)
        }
        else {
          await this.getAndEnterPasscode(phoneNumber)
        }
      }
      else if (user == "free" || user =="newUser") {
        await this.getAndEnterOtpFreeNumber(phoneNumber)
      }

    }
    if (process.env.ENV == "prod") {
      otp = await OtpPage.fetchOtp(phoneNumber, user)
      await this.enterOtp(otp)
      await browser.pause(3000)//waiting for the page to load completely
    }
    try {
      await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
      if (this.labelLoginLimitExceeded.isDisplayed()) {
        await this.btnContinue.click()
      }
    }
    catch { }
    if (user == "paid" || user == "premium" || user == "btlp" || user == "instaLearnUser" || user == "doubtsOnChatUser" || user == "todUser" || user == "prePostUser") {
      try { await this.cbPaidUserSelection.waitForDisplayed({ timeout: 7000 }) } catch (error) { }
      let cbPaiduserDisplayed = await this.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
      if (cbPaiduserDisplayed) {
        await browser.pause(3000)
        // await this.cbPaidUserSelection.waitForDisplayed({timeout : 3000})
        // await this.cbPaidUserSelection.waitForClickable({timeout : 3000})
        // await this.cbPaidUserSelection.click()
        await this.btnLogIn.waitForDisplayed({ timeout: 10000 })
        await this.btnLogIn.waitForClickable({ timeout: 3000 })
        await this.btnLogIn.click()

        try {
          await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 4500 })
          if (this.labelLoginLimitExceeded.isDisplayed()) {
            await this.btnContinue.click()
          }
        }
        catch { }
      }
    }
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 7500 })
      await this.btnContinue.click()
    }
  }
  async loginToLearnPortalUsingNumber(phoneNumber) {

    let otp
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(phoneNumber)
    await this.clickOnNext()
    if (process.env.ENV == "prod") {
      otp = await OtpPage.fetchOtp(phoneNumber)
      await this.enterOtp(otp)
      await browser.pause(3000)//waiting for the page to load completely
    }
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user != "free" && user !="newUser") {
        await browser.pause(3000)
        if (await $("//*[contains(text(),'Enter OTP')]").isDisplayed()) {
          await this.getAndEnterOtpFreeNumber(phoneNumber)
        }
        else {
          await this.getAndEnterPasscode(phoneNumber)
        }
      }
      else if (user == "free" || user =="newUser") {
        await this.getAndEnterOtpFreeNumber(phoneNumber)
      }
    }
    

    try {
      await SignUpPage.completeSignUp()
      await $("//button[text()='Next']").waitForClickable({ timeout: 1000 })
      await $("//button[text()='Next']").click()
    } catch { }
    try {
      await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
      if (this.labelLoginLimitExceeded.isDisplayed()) {
        await this.btnContinue.click()
      }
    }
    catch { }
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 7500 })
      await this.btnContinue.click()
    }
    try {
      await ProfilePage.btnskipTour.waitForDisplayed({ timeout: 7500 })
    }
    catch {
    }
    let skipTourDisplayed = await ProfilePage.btnskipTour.isDisplayed({ timeout: 7500 })
    if (skipTourDisplayed) {
      await ProfilePage.btnskipTour.waitForClickable({ timeout: 9000 })
      await ProfilePage.btnskipTour.click()
    }
    let bookTrailWindowDisplayed = await ProfilePage.bookTrailWindow.isDisplayed({ timeout: 5000 })
    if (bookTrailWindowDisplayed) {
      await ProfilePage.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
      await browser.refresh();
      try { await ProfilePage.ddProfile.waitForClickable({ timeout: 3000 }) }
      catch { }
    }
  }
  async loginToLearnPortalWithOutSkippingTour(user) {

    let phoneNumber, otp
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user == "free") {
        phoneNumber = loginData.validData.validPhoneNumber
        otp = loginData.validData.validotp
      }
      else if (user == "paid") {
        phoneNumber = loginData.paidUser.validPhoneNumber
        otp = loginData.paidUser.validotp
      }
      else if (user == "premium") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginData.premiumUser.validPhoneNumber
        otp = loginData.premiumUser.validotp
      }
      else if (user == "neo") {
        phoneNumber = loginData.neoUser.validPhoneNumber
      }
      else if (user == "newuser") {
        phoneNumber = loginData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginData.instaLearnUser.validPhoneNumber
        otp = loginData.instaLearnUser.validotp
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginData.doubtsOnChatUser.validPhoneNumber
        otp = loginData.doubtsOnChatUser.validotp
      }
      else if (user == "smoke1") {
        phoneNumber = loginData.smoke1.validPhoneNumber
        otp = loginData.smoke1.validotp
      }
      else if (user == "prePostUser") {
        phoneNumber = loginData.prePostUser.validPhoneNumber
      }
    }

    else if (process.env.ENV == "prod") {
      if (user == "free") {
        phoneNumber = loginProdData.validData.validPhoneNumber
      }
      else if (user == "paid") {
        phoneNumber = loginProdData.paidUser.validPhoneNumber
      }
      else if (user == "premium") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "firstTimeUser") {
        phoneNumber = loginProdData.premiumUser.validPhoneNumber
      }
      else if (user == "neo") {
        phoneNumber = loginProdData.neoUser.validPhoneNumber
      }
      else if (user == "newuser") {
        phoneNumber = loginProdData.newUser.validPhoneNumber
      }
      else if (user == "instaLearnUser") {
        phoneNumber = loginProdData.instaLearnUser.validPhoneNumber
      }
      else if (user == "doubtsOnChatUser") {
        phoneNumber = loginProdData.doubtsOnChatUser.validPhoneNumber
      }
      else if (user == "smoke1") {
        phoneNumber = loginProdData.smoke1.validPhoneNumber
      }
      else if (user == "prePostUser") {
        phoneNumber = loginProdData.prePostUser.validPhoneNumber
      }
    }
    await this.openByjusLearnPage()
    await this.enterPhoneNumber(phoneNumber)
    await this.clickOnNext()
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
      if (user != "free" && user !="newUser") {
        await browser.pause(3000)
        if (await $("//*[contains(text(),'Enter OTP')]").isDisplayed()) {
          await this.getAndEnterOtpFreeNumber(phoneNumber)
        }
        else {
          await this.getAndEnterPasscode(phoneNumber)
        }
      }
      else if (user == "free" || user =="newUser") {
        await this.getAndEnterOtpFreeNumber(phoneNumber)
      }

    }

    if (process.env.ENV == "prod") {
      otp = await OtpPage.fetchOtp(phoneNumber, user)
      await this.enterOtp(otp)
      await browser.pause(3000)//waiting for the page to load completely
    }
    if (await this.labelInvalidOtp.isDisplayed({ timeout: 4500 }) && process.env.ENV == "prod" && user == "free") {
      await browser.reloadSession()
      let number = getRandomNum()
      await updateNumberInProdData(number)
      await this.loginToLearnPortalUsingNumber(number)
    }
    try {
      await SignUpPage.completeSignUp()
      await $("//button[text()='Next']").waitForClickable({ timeout: 1000 })
      await $("//button[text()='Next']").click()
    } catch { }
    try {
      await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
      if (this.labelLoginLimitExceeded.isDisplayed()) {
        await this.btnContinue.click()
      }
    }
    catch { }
    if (user == "paid" || user == "premium" || user == "btlp" || user == "instaLearnUser" || user == "doubtsOnChatUser" || user == "todUser" || user == "prePostUser") {
      try { await this.cbPaidUserSelection.waitForDisplayed({ timeout: 7000 }) } catch (error) { }
      let cbPaiduserDisplayed = await this.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
      if (cbPaiduserDisplayed) {
        await browser.pause(3000)
        // await this.cbPaidUserSelection.waitForDisplayed({timeout : 3000})
        // await this.cbPaidUserSelection.waitForClickable({timeout : 3000})
        // await this.cbPaidUserSelection.click()
        await this.btnLogIn.waitForDisplayed({ timeout: 10000 })
        await this.btnLogIn.waitForClickable({ timeout: 3000 })
        await this.btnLogIn.click()

        try {
          await this.labelLoginLimitExceeded.waitForDisplayed({ timeout: 4500 })
          if (this.labelLoginLimitExceeded.isDisplayed()) {
            await this.btnContinue.click()
          }
        }
        catch { }
      }
    }
    try {
      await this.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
    }
    catch {
    }
    let activeSessionMsg = await this.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await this.btnContinue.waitForClickable({ timeout: 7500 })
      await this.btnContinue.click()
    }

  }
  async enterPasscode(passcode) {
    try{
      await this.enterPasscodeTitle.waitForDisplayed({ timeout: 3000 })
      }catch{}
    let passcodeValue = passcode
    for (let i = 1; i <= 4; i++) {
      const passcodeField = await $("(//input[@inputmode='numeric'])[" + i + "]")
      await passcodeField.waitForClickable({ timeout: 5000 })
      await passcodeField.click()
      await passcodeField.setValue(passcodeValue[i - 1])
    }
  }
  async getAndEnterOtpFreeNumber(phoneNumber){
    let otp
    await browser.pause(2000)
    await browser.newWindow("https://identity-staging.tllms.com/api/fetch/otp?phoneNumber=%2B91-" + phoneNumber)
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1]);
    otp = await $("//pre").getText()
    otp = otp.slice(1, otp.length - 1)
    otp = Array.from(otp)
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
    await this.enterOtp(otp)
    await browser.pause(3000)
  }
  async getAndEnterPasscode(phoneNumber){
    let passcode
    await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1]);
    passcode = await $("//pre").getText()
    console.log("passcode&&&&&"+passcode)
    passcode = passcode.slice(1, passcode.length - 1)
    passcode = Array.from(passcode)
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
    await this.enterPasscode(passcode)
    await this.btnLogIn.waitForClickable({ timeout: 15000 })
    await this.btnLogIn.click()
  }

  async ResendOtpFlow(){
    try{
      await this.btnForgotPasscode.waitForClickable({timeout:5000})
      await this.btnForgotPasscode.click()
    }
    catch{}
    const txtResendOtpTimer = $("//p[@class='timer-left-txt']")
    await txtResendOtpTimer.waitForDisplayed(5000)
    expect(await txtResendOtpTimer.isDisplayed()).toEqual(true)
    expect(await this.resendOtpLink.isClickable()).toEqual(false)
    const txtTimer20sec = $("//span[contains(text(),'25')]")
    await txtTimer20sec.waitForDisplayed({timeout:15000})
}
}

export default new LoginPage();