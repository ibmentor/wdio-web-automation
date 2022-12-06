import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import OtpPage from "../../Pages/OtpPage"
import { qa } from "../../Config/Config"

describe("Learn Portal -  page test", async () => {

    beforeEach("Open Login portal", async () => {
        
        await LoginPage.openByjusLearnPage()        
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    // This test case is designed for setting the passcode for a fresh paid number (Future purpose)
    /*
    it("336939 TC_07 Verify the user has not already set his passcode functionality", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber=loginData.setupPasscodeUser.validPhoneNumber 
        let passcode=loginData.setupPasscodeUser.validPasscode
        let systemGenPasscode
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        if(await LoginPage.enterOtpTitle.isDisplayed()){
            await browser.pause(2000)
            await browser.newWindow("https://identity-staging.tllms.com/api/fetch/otp?phoneNumber=%2B91-"+phoneNumber)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1]);
            otp = await $("//pre").getText()
            otp = otp.slice(1, otp.length - 1)
            otp = Array.from(otp)
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
            await LoginPage.enterOtp(otp)
            await browser.pause(4000)
        }
        else{
        await LoginPage.enterPasscodeSubTitle.waitForDisplayed({timeout:5000})
        allure.startStep("Verify passcode titile was not displayed",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        systemGenPasscode = await $("//pre").getText()
        systemGenPasscode = systemGenPasscode.slice(1, systemGenPasscode.length - 1)
        systemGenPasscode = Array.from(systemGenPasscode)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterPasscode(systemGenPasscode)
        await browser.pause(4000)
        await LoginPage.clickOnLogin()
        }
        try {
            await SignUpPage.completeSignUp()
            await $("//button[text()='Next']").waitForClickable({ timeout: 1000 })
            await $("//button[text()='Next']").click()
          } catch { }
        try
        {
            await LoginPage.setupPasscodeTitle.waitForDisplayed({timeout:5000})
            expect(await LoginPage.setupPasscodeTitle.isDisplayed()).toEqual(true)
            await LoginPage.nextButton.waitForDisplayed({timeout:5000})
            await LoginPage.nextButton.click()
        }
        catch{}
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout:5000})
        expect(await LoginPage.setPassCodePopupTitle.isDisplayed()).toEqual(true)
        await LoginPage.enterPasscodeSubTitle.waitForDisplayed({timeout:5000})
        expect(await LoginPage.enterPasscodeSubTitle.isDisplayed()).toEqual(true)
        allure.startStep("Verify number of passcode of box is 4",true)
        expect((await LoginPage.numberOfPasscode).length).toEqual(4)
        await LoginPage.enterPasscode(passcode)
        await browser.pause(3000)
        await LoginPage.nextButton.click()
        await LoginPage.btnConfirmPassCode.waitForDisplayed({timeout:5000})
        await LoginPage.enterPasscode(passcode)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        allure.endStep();

    })*/


   
    
    it("337702 TC_09 Verify the change passcode functionality in profile page.", async () => {
        await LoginPage.loginToLearnPortal("paid")

        let mddProfileDisplayed = await ProfilePage.ddProfile.isClickable()

        if (!mddProfileDisplayed) {
        await browser.reloadSession()
        await LoginPage.loginToLearnPortal("paid")
        }

        // await browser.pause(5000)//Waiting for the page to load completely
        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()

        await ProfilePage.btnChangePasscode.waitForDisplayed({timeout:3500})
        await ProfilePage.btnChangePasscode.click()
        await browser.pause(2000)

        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/otp?phoneNumber=%2B91-" + loginData.paidUser.validPhoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        let otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);

        for (let i=5;i<=8;i++){
            await ProfilePage.tfOptPasscode(i).setValue(otp[i-5])
        }
        
        await ProfilePage.btnConfirmOtp.click()
        await ProfilePage.popupTextNewPasscode.waitForDisplayed({timeout:15000})
        otp = ['0','0','0','0']
        for (let i=5;i<=8;i++){
            await ProfilePage.tfOptPasscode(i).setValue(otp[i-5])
        }
        await ProfilePage.btnContinue.click()
        for (let i=5;i<=8;i++){
            await ProfilePage.tfOptPasscode(i).setValue(otp[i-5])
        }
        await ProfilePage.btnContinue.click()
        try{await ProfilePage.popupTextPasscodeChanged.waitForDisplayed({timeout:6500})}catch{}
        expect(await ProfilePage.popupTextPasscodeChanged.isDisplayed()).toEqual(true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'paid')
    })

   
})

