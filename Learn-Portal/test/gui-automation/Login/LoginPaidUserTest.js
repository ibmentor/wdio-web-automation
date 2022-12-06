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

    it("306585 Paid User-Login to Learn Portal Paid user flow - With valid phone number and otp", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.endStep();
    })    

    it("306586 Paid User-Login to Learn Portal Paid user flow - Profile Validation", async () => {
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


    it("306587 Paid User-Login to Learn Portal Paid user flow - Switch user flow", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.paidUser.validPhoneNumber)
        allure.startStep("Click on next button", true);
        await LoginPage.clickOnNext()
        allure.startStep("Enter a valid OTP", true);
        await LoginPage.enterOtp(loginData.paidUser.validotp)
        await browser.pause(4000)
        await LoginPage.btnLogIn.waitForDisplayed({ timeout: 15000 })
        await LoginPage.btnLogIn.click()
        await ProfilePage.multipleSessionActiveMsg()
        await ProfilePage.clickButtonSkipATour()
        await ProfilePage.clickButtonBookATrialPopup()
        allure.startStep("Select user profile", true)
        await ProfilePage.selectProfile()
        await ProfilePage.btnSwitchProfile.click()      
        let noOfProfiles = await $$("//*[@class=' font-14 switch-user-name']")
        for (let i = 1; i <= noOfProfiles.length; i++) {    
   
                let switchUserName = await $("(//*[@class=' font-14 switch-user-name'])[" + i + "]").getText()
                switchUserName = switchUserName.slice(0,"")
                await $("(//*[@class='switch-profile-icon'])[" + i + "]").click()
                try{                
                    await ProfilePage.multipleSessionActiveMsg()                
                }
                catch {
                    //do nothing
                }
                await browser.pause(5000)
                switchUserName = switchUserName.charAt(0).toUpperCase() + switchUserName.slice(1)
                await $("//*[contains(text(),'" + switchUserName + "')]").waitForDisplayed({ timeout: 5000 })
                expect(await ProfilePage.ddProfile.waitForClickable({timeout:25000})).toEqual(true)        
                await ProfilePage.ddProfile.click()
                await $("//*[@class='dropdown-item notify-item profile-switch-item']").click()
        }
        allure.endStep();
    })  

})