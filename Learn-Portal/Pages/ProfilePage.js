import BasePage from "./BasePage";
import LoginPage from "./LoginPage";
import {conceptVideoData} from "../Data/ConceptVideoData"
import waitUntil from "webdriverio/build/commands/browser/waitUntil";
import { profileData } from "../Data/ProfileData";


class ProfilePage extends BasePage {

  /**
   * btn for button
   * dd for dropdown list
   * tf for text field
   * rb for radio button
   */
get bookTrailWindow() { return $("//*[@class='highlight-component-backdrop']") }
  
get ddProfile() { return $("//*[@id='dropdown-profile']") }

get btnProfile() { return $("//*[contains(text(),'My profile')]") }  

get welcomeElement() { return $("//*[contains(text(),'Welcome' )]") }

get btnDownloadApp() { return $("(//*[contains(text(),'Download App')])[1]") }

get ddcohortSelection() { return $("//*[@class='grade-width__indicators css-1wy0on6']") }

get btnskipTour() {return $("//button[@class='Guidetour_modalBtnSkip__44AcQ']")}

get btnSwitchProfile() { return $("//*[@class='dropdown-item notify-item profile-switch-item']")}

get btnPersonalDetails() { return $("//*[text()='Personal Details']")}

get btnSubscriptions() { return $("//*[text()='Subscriptions']")}

get tfDob() { return $("//*[@name='date_of_birth']")}

get btnRequestCallBack() { return $("//button[@class='personalDetails_requestCallBackbtn__3s86f btn btn-primary']")}

get btnSave() { return $("//button[contains(text(),'Save')]")}

get btnBackToProfile() { return $("//*[text()='Back to Profile']")}

get btnRequestCallBackSubmit() { return $("//*[@class='submit lg-view mb-4 btn btn-primary' and text()='Submit']")}

get btnRequestCallBackCancel() { return $("//*[text()='Cancel']")}

get btnEditProfilePicture() { return $("//img[@class='personalDetails_edit__27EUA']")}

get ddAvatarImage() { return $(`(//img[contains(@src,'avatars/staging/141/original.png?1649395010')])[1] | (//img[contains(@src,'avatars/production/88/original.png?1649392326')])[1]`)}

get personalDetailsImage() { return $(`(//img[contains(@src,'avatars/staging/141/original.png?1649395010')])[3] | (//img[contains(@src,'avatars/production/88/original.png?1649392326')])[3]`)}

get dashboardProfileImage() { return $(`(//img[contains(@src,'avatars/staging/141/original.png?1649395010')])[1] | ("(//img[contains(@src,'avatars/production/88/original.png?1649392326')])[1]`)}

get profileImage() { return $("(//img[@alt='profile icon'])[3]")}

get tfname() { return $("//input[@placeholder='Enter your name']")}

get tfEmail() { return $("//input[@placeholder='Enter your e-mail']")}

get ddGender() { return $("(//div[contains(@class,'css-ackcql')])[2]")}

get ddCity() { return $("(//div[contains(@class,'css-ackcql')])[3]")}

get btnRequestCallBackSubscriptionPage() { return $("//button[@class='subscriptions_callBack__2J_Wg']")}

get labelActiveSubscription() { return $("//div[@class='personalDetails_lpView__2cujH']")}

get btnViewAllSubscription() { return $("//button[text()='View all subscriptions']")}
get multipleProfile() {return $$(".prof-card")}

selectSpecificProfile(count) {return $(`(//*[contains(@class,'prof-card')])[${count}]`)}

get multipleAccountText() {return $('.enter-your-txt-multiple')}

//passcode xpath
get btnChangePasscode() { return $("//button[text()='Change passcode']")}
get btnChangePasscode() { return $("//button[text()='Change passcode']")}

tfOptPasscode(count) { return $(`(//input[@inputmode='numeric'])[${count}]`)}

get btnConfirmOtp() { return $("//button[text()='Confirm OTP']")}

get popupTextNewPasscode() { return $("//div[text()='Set New Passcode']")}

get btnContinue() { return $("//button[text()='Continue']")}

get popupTextPasscodeChanged() { return $("//*[text()='You have set the passcode successfully!']")}

//

get doc_text() {return $("//p[normalize-space()='Doc']")}


  async changeCohortDetail(cohortDetail, user) {

    let mddProfileDisplayed = await this.ddProfile.isClickable()

    if (!mddProfileDisplayed) {
      await browser.reloadSession()
      await LoginPage.loginToLearnPortal(user)
    }

    // await browser.pause(5000)//Waiting for the page to load completely
    await this.ddProfile.waitForClickable({ timeout: 15000 })
    await this.ddProfile.click()
    await this.btnProfile.waitForClickable({ timeout: 15000 })
    await this.btnProfile.click()
    await this.ddcohortSelection.waitForClickable({ timeout: 15000 })
    await this.ddcohortSelection.click()
    await browser.keys(cohortDetail)
    await browser.keys('Tab')
    await browser.pause(6000)
    await $("//*[@class='font-12 account-position']").waitUntil(async function () {
      return ((await $("//*[@class='font-12 account-position']").getText()).toLowerCase()).includes(cohortDetail.toLowerCase())
    }, {
      timeout: 15000,
      timeoutMsg: 'Cohort not changed to the expected cohort'
    })
    try{
      await this.btnskipTour.waitForDisplayed({ timeout: 7500 })
    }
    catch{
    }
    let skipTourDisplayed = await this.btnskipTour.isDisplayed({ timeout: 7500 })
    if (skipTourDisplayed) {
      await this.btnskipTour.waitForClickable({ timeout: 9000 })
      await this.btnskipTour.click()
   }
    let bookTrailWindowDisplayed = await this.bookTrailWindow.isDisplayed({ timeout: 5000 })
    if (bookTrailWindowDisplayed) {
      await this.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
      await browser.refresh();
      try{await this.ddProfile.waitForClickable({timeout:3000})}
      catch{}
    }
    for (let i=0;i<25;i++){
      try{
        await $("//*[text()='Explore']").waitForDisplayed({timeout:200})
        if(await $("//*[text()='Explore']").isDisplayed()){
          break
        }
        else{
          await $(`//*[text()="BYJU'S World of Learning"]`).waitForDisplayed({timeout:200})
          if(await $(`//*[text()="BYJU'S World of Learning"]`).isDisplayed()){
            break
          }
        }

    }catch{}

    }
  }

  async changeCohortDetailWithoutSkippingTour(cohortDetail, user) {

    let mddProfileDisplayed = await this.ddProfile.isClickable()

    if (!mddProfileDisplayed) {
      await browser.reloadSession()
      await LoginPage.loginToLearnPortal(user)
    }

    await browser.pause(5000)//Waiting for the page to load completely
    await this.ddProfile.waitForClickable({ timeout: 15000 })
    await this.ddProfile.click()
    await this.btnProfile.waitForClickable({ timeout: 15000 })
    await this.btnProfile.click()
    await this.ddcohortSelection.waitForClickable({ timeout: 15000 })
    await this.ddcohortSelection.click()
    await browser.keys(cohortDetail)
    await browser.keys('Tab')
    await browser.pause(3000)

  }

  async clickButtonSkipATour() {
    await this.btnskipTour.waitForDisplayed({ timeout: 65000 })
    await this.btnskipTour.click()
  }

  async clickButtonBookATrialPopup() {
    await this.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
    await browser.refresh();
    try { await this.ddProfile.waitForClickable({ timeout: 3000 }) }
    catch { }
  }

  async selectProfile() {
    await this.ddProfile.waitForDisplayed({ timeout: 25000 })
    await this.ddProfile.click()
  }
  async navigatetToProfilePage() {
    await this.ddProfile.waitForClickable({ timeout: 25000 })
    await this.ddProfile.click()
    await this.btnProfile.waitForClickable({ timeout: 25000 })
    await this.btnProfile.click()
  }
  async changeProfileDetails(data) {
    await this.navigatetToProfilePage()
    await this.tfname.clearValue()
    await browser.pause(2000)
    await this.tfname.setValue(profileData.personalDetails[0])
    await this.tfEmail.clearValue()
    await this.tfEmail.setValue(profileData.personalDetails[1])
    await this.tfDob.clearValue()
    await browser.pause(3000)
    await this.tfDob.setValue(profileData.personalDetails[2])
    await this.ddGender.click()
    await browser.keys([profileData.personalDetails[3]])
    await browser.keys(["Enter"])
    await browser.pause(2000)
    await this.ddCity.click()
    await browser.keys([profileData.personalDetails[4]])
    await browser.keys(["Enter"])
    await this.btnSave.click()
    await browser.pause(4000)
  }
  async multipleSessionActiveMsg() {
    try {
      await LoginPage.multipleSessionActiveMsg.waitForDisplayed({ timeout: 7500 })
    }
    catch {
    }
    let activeSessionMsg = await LoginPage.multipleSessionActiveMsg.isDisplayed()
    if (activeSessionMsg) {
      await LoginPage.btnContinue.waitForDisplayed({ timeout: 7500 })
      await LoginPage.btnContinue.click()
    }
  }
  async changeCohortDetailWithMultipleCohort(cohortDetail, user) {

    let mddProfileDisplayed = await this.ddProfile.isClickable()

    if (!mddProfileDisplayed) {
      await browser.reloadSession()
      await LoginPage.loginToLearnPortal(user)
    }

    // await browser.pause(5000)//Waiting for the page to load completely
    await this.ddProfile.waitForClickable({ timeout: 15000 })
    await this.ddProfile.click()
    await this.btnProfile.waitForClickable({ timeout: 15000 })
    await this.btnProfile.click()
    await this.ddcohortSelection.waitForClickable({ timeout: 15000 })
    await this.ddcohortSelection.click()
    let cohortName = await $("//*[normalize-space()='"+cohortDetail+"']")
    await cohortName.click()
    await browser.keys(cohortDetail)
    await browser.keys('Tab')
    await browser.pause(6000)
    await $("//*[@class='font-12 account-position']").waitUntil(async function () {
      return ((await $("//*[@class='font-12 account-position']").getText()).toLowerCase()).includes(cohortDetail.toLowerCase())
    }, {
      timeout: 15000,
      timeoutMsg: 'Cohort not changed to the expected cohort'
    })
    try{
      await this.btnskipTour.waitForDisplayed({ timeout: 7500 })
    }
    catch{
    }
    let skipTourDisplayed = await this.btnskipTour.isDisplayed({ timeout: 7500 })
    if (skipTourDisplayed) {
      await this.btnskipTour.waitForClickable({ timeout: 9000 })
      await this.btnskipTour.click()
   }
    let bookTrailWindowDisplayed = await this.bookTrailWindow.isDisplayed({ timeout: 5000 })
    if (bookTrailWindowDisplayed) {
      await this.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
      await browser.refresh();
      try{await this.ddProfile.waitForClickable({timeout:3000})}
      catch{}
    }
    await $("//*[contains(text(),'Explore')]").waitForDisplayed({ timeout: 7000 })
  }
  async profileSelectionInMultipleSessionPage(count){
    const specificProfile=await this.selectSpecificProfile(count)
        await specificProfile.click()
        await browser.pause(3000)
        await LoginPage.btnLogIn.waitForDisplayed({timeout:5000})
        await LoginPage.btnLogIn.click()
        try {
          await LoginPage.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
          if (LoginPage.labelLoginLimitExceeded.isDisplayed()) {
            await LoginPage.btnContinue.click()
          }
        }
        catch { }
          try {
            await this.btnskipTour.waitForDisplayed({ timeout: 5000 })
            await this.btnskipTour.click()
            }
            catch {}
            try{
            await this.clickButtonBookATrialPopup()
            }
            catch{}
          }
}

export default new ProfilePage();