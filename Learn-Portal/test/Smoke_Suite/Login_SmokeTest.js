import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import { loginProdData } from "../../Data/LoginProdData"
import OtpPage from "../../Pages/OtpPage"
import SignUpPage from "../../Pages/SignUpPage"


describe("Learn Portal - Login Test cases", async () => {

  beforeEach("Open Login portal", async () => {

    await LoginPage.openByjusLearnPage()
  })

  afterEach("Reload new broswer session", async () => {
    await browser.reloadSession()
  })

  it.only("315930 TC_01 Free User-Login to Learn Portal - With valid phone number and otp", async () => {
    allure.startStep("Enter valid phone number and otp login to learn portal", true);
    await LoginPage.loginToLearnPortal('free')
    allure.endStep();
  })

  it("315936 TC_07 Free User-Check Resend OTP button is working fine and try entering the default otp again", async () => {
    let phoneNumber
    let otp
    if (process.env.ENV == "prod") {
      phoneNumber = loginProdData.validData.validPhoneNumber
    }
    else{
      phoneNumber = loginData.validData.validPhoneNumber
      // otp = loginData.validData.validotp
    }
    allure.startStep("Enter valid phone number to phone number field", true);
    await LoginPage.enterPhoneNumber(phoneNumber)
    allure.startStep("Click on next", true);
    await LoginPage.clickOnNext()
    allure.startStep("Field validation in of Resend OTP link in otp page", true)
    await LoginPage.resendOtpLink.waitForDisplayed({ timeout: 30000 })
    await browser.pause(2000)
    allure.startStep("Click on resend OTP button", true)
    await LoginPage.resendOtpButton.click()
    allure.startStep("Enter a valid OTP", true);
    if (process.env.ENV == "prod"){
      otp = await OtpPage.fetchOtp(phoneNumber,"free")
    }
    else {
      await browser.pause(2000)
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
    await browser.pause(4000)
    try{await SignUpPage.completeSignUp()
      await $("//button[text()='Next']").waitForClickable({timeout:1000})
      await $("//button[text()='Next']").click()
    }catch{}
    try {
      await LoginPage.labelLoginLimitExceeded.waitForDisplayed({ timeout: 4500 })
      if (await LoginPage.labelLoginLimitExceeded.isDisplayed()) {
        await LoginPage.btnContinue.click()
      }
    }
    catch { }
    try {
      await LoginPage.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
    }
    catch
    {
      //do nothing
    }

    let activeSessionMsg = await LoginPage.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await LoginPage.btnContinue.waitForClickable({ timeout: 7500 })
      await LoginPage.btnContinue.click()
    }
    try{await ProfilePage.btnskipTour.waitForDisplayed({timeout:4500})}catch{}
    allure.startStep("Waiting for skip a tour button to be visible and clickable")
    if (await ProfilePage.btnskipTour.isDisplayed()) {
      await ProfilePage.btnskipTour.waitForClickable({ timeout: 15000 })
      await ProfilePage.btnskipTour.click()
    }
    try{await ProfilePage.bookTrailWindow.waitForDisplayed({timeout:4500})}catch{}
    allure.startStep("Waiting for Book Trial window to be clickable", true);
    let bookTrailWindowDisplayed = await ProfilePage.bookTrailWindow.isDisplayed({ timeout: 5000 })
    if (bookTrailWindowDisplayed){
      await ProfilePage.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
      await browser.refresh();
    }
    try { await ProfilePage.ddProfile.waitForClickable({ timeout: 4000 }) }
    catch { }
    allure.startStep("Waiting for profile button to display in Home page", true);
    await ProfilePage.ddProfile.waitForDisplayed({ timeout: 10000 })
    const url = await browser.getUrl()
    let flag = url.includes("home")
    expect(flag).toEqual(true)
    allure.endStep()
  })

  it("315937 Paid User-Login to Learn Portal Paid user flow - With valid phone number and otp", async () => {
    allure.startStep("Enter valid phone number to phone number field", true);
    await LoginPage.loginToLearnPortal('paid')
    allure.endStep();
  })

  it("315939 Paid User-Login to Learn Portal Paid user flow - Switch user flow", async () => {
    let phoneNumber
    let otp
    let passcode
    if (process.env.ENV == "prod") {
      // phoneNumber = loginProdData.validData.validPhoneNumber
      phoneNumber = 7022533496
    }
    else{
      phoneNumber = loginData.premiumUser.validPhoneNumber
      // otp = loginData.validData.validotp
    }
    allure.startStep("Enter valid phone number to phone number field", true);
    await LoginPage.enterPhoneNumber(phoneNumber)
    allure.startStep("Click on next button", true);
    await LoginPage.clickOnNext()
    allure.startStep("Enter a valid OTP", true);
    if (process.env.ENV == "prod"){
      otp = await OtpPage.fetchOtp(phoneNumber,"paid")
      await LoginPage.enterOtp(otp)
      await browser.pause(2000)
      await LoginPage.btnLogIn.waitForDisplayed({ timeout: 15000 })
      await LoginPage.btnLogIn.click()
    }
   else { 
        await browser.pause(3000)
        if (await $("//*[contains(text(),'Enter OTP')]").isDisplayed()) {
          await LoginPage.getAndEnterOtpFreeNumber(phoneNumber)
        }
        else {
          await LoginPage.getAndEnterPasscode(phoneNumber)
        }
   }
    try{
    await ProfilePage.multipleSessionActiveMsg()
    }catch{}
    try {
      await ProfilePage.clickButtonSkipATour()
    }
    catch { }
    try{
    await ProfilePage.clickButtonBookATrialPopup()
    }
    catch{}
    allure.startStep("Select user profile", true)
    await ProfilePage.selectProfile()
    await ProfilePage.btnSwitchProfile.click()
    let noOfProfiles = await $$("//*[@class=' font-14 switch-user-name']")
    for (let i = 1; i <= noOfProfiles.length; i++) {
      if(noOfProfiles.length>1){
      if(i==3){
        break;
      }
    }
      let switchUserName = await $("(//*[@class=' font-14 switch-user-name'])[" + i + "]").getText()
      switchUserName = switchUserName.slice(0, "")
      await $("(//*[@class='switch-profile-icon'])[" + i + "]").click()
      try {
        await ProfilePage.multipleSessionActiveMsg()
      }
      catch {
        //do nothing
      }
      try {
        await ProfilePage.clickButtonSkipATour()
        await browser.refresh()
      }
      catch { }
      await browser.pause(5000)
      switchUserName = switchUserName.charAt(0).toUpperCase() + switchUserName.slice(1)
      await $("//*[contains(text(),'" + switchUserName + "')]").waitForDisplayed({ timeout: 5000 })
      expect(await ProfilePage.ddProfile.waitForClickable({ timeout: 25000 })).toEqual(true)
      await ProfilePage.ddProfile.click()
      await $("//*[@class='dropdown-item notify-item profile-switch-item']").click()
    }
    allure.endStep();
  })

})
