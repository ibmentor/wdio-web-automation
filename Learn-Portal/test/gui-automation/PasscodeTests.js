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
    it('336339 TC_01 Verify Passcode is applicable only for paid users',async () =>{
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber=loginData.paidUser.validPhoneNumber
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.pause(2000)
        if(await LoginPage.enterOtpTitle.isDisplayed({timeout:3000}) == true){
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
        try{
        await LoginPage.setupPasscodeTitle.waitForDisplayed({timeout:5000})
        expect(await LoginPage.setupPasscodeTitle.isDisplayed()).toEqual(true)
        }catch{}
        }else{        
        allure.startStep("Verify Title for passcode",true)
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout:3000})
        expect(await LoginPage.enterPasscodeTitle.isDisplayed()).toEqual(true)
        allure.startStep("Verify subtitle for passcode",true)
        expect(await LoginPage.enterPasscodeSubTitle.isDisplayed()).toEqual(true)
        }
    })

    
    it('336683 TC_02 Verify the passcode should be (4 digit ) number',async () =>{
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber=loginData.paidUser.validPhoneNumber
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.pause(2000)
        allure.startStep("Verify Title for passcode",true)
        if(await LoginPage.enterOtpTitle.isDisplayed({timeout:3000}) == true){
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
            try{
                await LoginPage.setupPasscodeTitle.waitForDisplayed({timeout:5000})
                expect(await LoginPage.setupPasscodeTitle.isDisplayed()).toEqual(true)
                await LoginPage.btnNext.click()
                }catch{}            
            await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout:3000})
            }else{
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout:3000})
        expect(await LoginPage.enterPasscodeTitle.isDisplayed()).toEqual(true)
            }
        allure.startStep("Verify number of passcode of box is 4",true)
        expect((await LoginPage.numberOfPasscode).length).toEqual(4)
         
    })
    it("336684 TC_03 Verify the passcode feature should not be applicable for free users", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(loginData.validData.validPhoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterOtpTitle.waitForDisplayed({timeout:5000})
        expect(await LoginPage.enterOtpTitle.isDisplayed()).toEqual(true)
        allure.startStep("Verify passcode titile was not displayed",true)
        expect(await LoginPage.enterPasscodeTitle.isDisplayed()).toEqual(false)
        allure.startStep("Verify subtitle for passcode",true)
        expect(await LoginPage.enterPasscodeSubTitle.isDisplayed()).toEqual(false)
        allure.endStep();

    })
    it("336693 TC_04 Verify the functionality of system generated passcode which user can use to login to his account on any platforms till the user has set up his own passcode(Post purchase)", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
         let phoneNumber=loginData.passcodeNotActivatedUser.validPhoneNumber
         let systemGenPasscode
         let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.pause(3000)
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
        allure.endStep();

    })

    it("337080 TC_05 Verify the multi profile selection functionality", async () => {
        let phoneNumber=loginData.passcodeUserWithMultipleProfile.validPhoneNumber //Need num with multipleProfiles
        let passcode=loginData.passcodeUserWithMultipleProfile.validPasscode
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterPasscodeSubTitle.waitForDisplayed({timeout:5000})
        await LoginPage.enterPasscode(passcode)
        await LoginPage.clickOnLogin()
        allure.startStep("Select First Profile and navigate to Home screen", true);
        try{
            await ProfilePage.multipleAccountText.waitForDisplayed({timeout:6000})
            expect(await ProfilePage.multipleAccountText.getText()).toHaveTextContaining('We found You have multiple accounts')
        }
        catch{}
       if(await ProfilePage.multipleAccountText.isDisplayed()) 
       {
        await ProfilePage.profileSelectionInMultipleSessionPage(1)
        await ProfilePage.ddProfile.waitForDisplayed({timeout:5000})
        allure.startStep("Reload the session to select other profile", true);
        await browser.reloadSession()
        await LoginPage.openByjusLearnPage()
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterPasscodeSubTitle.waitForDisplayed({timeout:5000})
        await LoginPage.enterPasscode(passcode)
        await LoginPage.clickOnLogin()
        allure.startStep("Validate multiple Account text is displayed", true);
        await ProfilePage.multipleAccountText.waitForDisplayed({timeout:6000})
        allure.startStep("Select Second Profile and navigate to Home screen", true);
        await ProfilePage.profileSelectionInMultipleSessionPage(2)
        await ProfilePage.ddProfile.waitForDisplayed({timeout:5000})
        expect(await ProfilePage.ddProfile.isDisplayed()).toEqual(true)
       
       }
       else {
        allure.startStep("Validate No multiple Accounts Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No Multiple Profiles available").toEqual("")
    }
    allure.endStep();
    })
   
    it("336938 TC_06 Verify the user already set his passcode functionality", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
         let phoneNumber='5641685432'
         let passcodes=['1234','2345','3456','1111']
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout:10000})
        allure.startStep("Verify passcode titile was not displayed",true)
        for(let i=0;i<passcodes.length;i++)
        {
        await browser.pause(2000)
        await LoginPage.enterPasscode(passcodes[i])
        await browser.pause(4000)
        await LoginPage.clickOnLogin()
        if(i==0)
        {
          await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
          expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
          expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Wrong passcode. Try again or click Forgot passcode')
          
        }
        if(i==2){
        await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
        expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Wrong passcode. You have only 2 attempts left, try again or click Forgot passcode')
        }
        if(i==3)
        {
            await browser.pause(6000)
            expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(false)

        }
    }

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


    it("337066 TC_08 Verify the wrong passcode flow functionality", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
         let phoneNumber='5641685432'
         let passcodes=['1234','2345','3456','2334','4536']
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout:5000})
        allure.startStep("Verify passcode titile was not displayed",true)
        for(let i=0;i<passcodes.length;i++)
        {
        await browser.pause(2000)
        await LoginPage.enterPasscode(passcodes[i])
        await browser.pause(4000)
        await LoginPage.clickOnLogin()
        if(i==0)
        {
          await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
          expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
          expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Wrong passcode. Try again or click Forgot passcode')
          
        }
        if(i==2){
        await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
        expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Wrong passcode. You have only 2 attempts left, try again or click Forgot passcode')
        }
        if(i==3)
        {
            await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
            expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
            expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Wrong passcode. You have only 1 attempts left, try again or click Forgot passcode')

        }
        if(i==4)
        {
            await LoginPage.maxLimitExceedMsg.waitForDisplayed({timeout:5000}) 
            expect(await LoginPage.maxLimitExceedMsg.isDisplayed()).toEqual(true)

        }
    }

    })

    
    
    it("Change passcode testcases", async () => {
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
        await ProfilePage.popupTextNewPasscode.waitForDisplayed({timeout:7500})
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
    })

    it('337079 TC_09 Verify the forgot passcode functionality', async () =>{
        let phoneNumber = "3546854888"
        let otp
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Click on Forgot Passcode",true)
        await LoginPage.btnForgotPasscode.waitForDisplayed({timeout:3000})
        await LoginPage.btnForgotPasscode.click()      
        
        allure.startStep("Fetch OTP",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/otp?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtpPasscode(otp)
        await browser.pause(4000)
        await LoginPage.btnConfirm.click()
        
        allure.startStep("Set New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("2222")
        await LoginPage.btnNextPasscode.click()
        allure.startStep("Confirm New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("2222")
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()


        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({ timeout: 3500 })
            if (LoginPage.labelLoginLimitExceeded.isDisplayed()) {
              await LoginPage.btnContinue.click()
            }
        }
        catch { }
        await LoginPage.ddProfile.waitForDisplayed({timeout: 10000})
        expect(await LoginPage.ddProfile.isDisplayed()).toEqual(true)
    })

    it('337078 TC_10 Verify the trouble login and signup functionalaity', async () =>{
        let phoneNumber = "2365585578"
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        allure.startStep("Click on Help button", true);
        await LoginPage.btnHelp.waitForClickable({timeout: 5000})
        await LoginPage.btnHelp.click()
        allure.startStep("Validate Help PopUp contents")
        await LoginPage.txtHowToFindPasscode.waitForDisplayed({timeout: 5000})
        expect(await LoginPage.txtHowToFindPasscode.isDisplayed()).toEqual(true)
        expect(await LoginPage.videoContainer.isDisplayed()).toEqual(true)
        expect(await LoginPage.txtStillIssue.isDisplayed()).toEqual(true)
    })

    it("336791 TC_11 Verify the resend passcode functionality", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
         let phoneNumber=loginData.passcodeNotActivatedUser.validPhoneNumber
         let systemGenPasscode
         let systemGenPasscode2
         let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.pause(3000)
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
        await browser.pause(4000)
        if(await LoginPage.passcodeExpiredError.isDisplayed())
        {
           expect(await LoginPage.passcodeExpiredError.getText()).toHaveTextContaining('Oops! Your Passcode is Expired')
           await LoginPage.passcodeSentMsgText.waitForDisplayed({timeout:5000})
           expect(await LoginPage.passcodeSentMsgText.getText()).toHaveTextContaining('Please enter new passcode sent to you on SMS, email & WhatsApp')
           await LoginPage.resendOtpLink.waitForDisplayed({timeout:10000})
           await LoginPage.resendOtpLink.click()
           await browser.pause(3000)
           await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
           const handles = await browser.getWindowHandles()
           await browser.switchToWindow(handles[1]);
           systemGenPasscode2 = await $("//pre").getText()
           systemGenPasscode2 = systemGenPasscode.slice(1, systemGenPasscode2.length - 1)
           systemGenPasscode2 = Array.from(systemGenPasscode2)
           await browser.closeWindow();
           await browser.switchToWindow(handles[0]);
           await LoginPage.enterPasscode(systemGenPasscode2)
           await browser.pause(4000)
           await LoginPage.clickOnLogin()
        }
        }
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
        allure.endStep();

    })
    it("336788 TC_12 Verify that There needs to be a “Continue” button. On clicking continue, we will take the user to the confirm passcode screen(Screen 2)", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
         let phoneNumber=loginData.passcodeActivatedUser.validPhoneNumber
         let passcodes=['','23']
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout:5000})
        allure.startStep("Verify passcode titile was not displayed",true)
        for(let i=0;i<passcodes.length;i++)
        {
        await browser.pause(2000)
        await LoginPage.enterPasscode(passcodes[i])
        await browser.pause(4000)
        await LoginPage.clickOnLogin()
        if(i==0)
        {
          await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
          expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
          expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Please enter the Passcode')
          
        }
        if(i==1){
        await LoginPage.passcodeWrongAttemptError.waitForDisplayed({timeout:5000}) 
        expect(await LoginPage.passcodeWrongAttemptError.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeWrongAttemptError.getText()).toHaveText('Incorrect Passcode')
        }
    }
    })

    it("336783 TC_13 Verify the invalid link functionality 1", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        if(process.env.ENV=='qa')
        {
        await browser.url(loginData.qaExpiredUrl.url[0])

        }
        else if (process.env.ENV=='prod'){

            await browser.url(loginData.prodExpiredUrl.url[0])
        }
        else{
            await browser.url(loginData.stageExpiredUrl.url[0])
        }
        await LoginPage.linkNotFoundError.waitForDisplayed({timeout:10000})
        expect(await LoginPage.linkNotFoundError.isDisplayed()).toEqual(true)
        expect(await LoginPage.welcomeByjusText.isDisplayed()).toEqual(false)
})

    it("337702 TC_14 Verify the change passcode functionality in profile page", async () => {
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
        await ProfilePage.popupTextNewPasscode.waitForDisplayed({timeout:7500})
        otp = ['1','1','1','1']
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
        await ProfilePage.changeCohortDetail(monthlyExamCohortDetail, 'paid')
    })
    it("336792 TC_15 Verify the user if he click on 'I will set it up later screen' functinality", async () => {
        let phoneNumber=loginData.setupPasscodeUser.validPhoneNumber //Need num with multipleProfiles
        let passcode
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        console.log(otp,"||||||||||||||||||||||")
        await LoginPage.enterPasscode(otp)
        await browser.pause(2000)
        await LoginPage.clickOnLogin()
        await browser.pause(5000)
        let errorMessage = $("//p[text()='Oops! Your Passcode is Expired']")
        let resendOtp = $("//button[text()='Resend Passcode']")
        try{
            await errorMessage.waitForDisplayed({timeout:10000})
            await resendOtp.waitForDisplayed({timeout:20000})
            await resendOtp.click()
            await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1]);
            otp = await $("//pre").getText()
            otp = otp.slice(1, otp.length - 1)
            otp = Array.from(otp)
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
            console.log(otp,"+++++++++++++++++")
            await LoginPage.enterPasscode(otp)
            await browser.pause(2000)
            await LoginPage.clickOnLogin()
        }catch{}
        let setLaterButton = $("//p[text()='I will set it up later']")
        await setLaterButton.waitForDisplayed({timeout:5000})
        await setLaterButton.click()
        
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({ timeout: 6500 })
            if (LoginPage.labelLoginLimitExceeded.isDisplayed()) {
                await LoginPage.btnContinue.click()
            }
            }
            catch { }
        try { await LoginPage.cbPaidUserSelection.waitForDisplayed({ timeout: 7000 }) } catch (error) { }
        let cbPaiduserDisplayed = await LoginPage.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
        if (cbPaiduserDisplayed) {
            await browser.pause(3000)
            await LoginPage.btnLogIn.waitForDisplayed({ timeout: 10000 })
            await LoginPage.btnLogIn.waitForClickable({ timeout: 3000 })
            await LoginPage.btnLogIn.click()

            try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({ timeout: 6500 })
            if (LoginPage.labelLoginLimitExceeded.isDisplayed()) {
                await LoginPage.btnContinue.click()
            }
            }
            catch { }
        }
        try {
        await LoginPage.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
        }
        catch {
        }
        let activeSessionMsg = await LoginPage.multipleSessionActiveMsg.isDisplayed()
        if (activeSessionMsg) {
        await LoginPage.btnContinue.waitForClickable({ timeout: 7500 })
        await LoginPage.btnContinue.click()
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
    }
    expect(await ProfilePage.ddProfile.isDisplayed({ timeout: 3000 })).toEqual(true)
    })

    it('336773 TC_16 Verify the functionality of the Auto-login URL behaviour 1: ',async () =>{
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2734232399"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        await browser.pause(3000)
        const handles = await browser.getWindowHandles(); 
        await OtpPage.deleteSupportMailEntries()
        await browser.switchToWindow(handles[0]);
        await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:15000})
        await LoginPage.resendPasscodeLink.click() 
        await browser.pause(10000)  
        const handles1=await browser.getWindowHandles() 
        await browser.switchToWindow(handles1[1]);      
        let otp,loginUrl=await OtpPage.fetchOtpAndUrlFromEmailTab()        
        await browser.closeWindow()
        await browser.switchToWindow(handles[0]);
        await browser.url(loginUrl)
        if(process.env.ENV == qa){
        let url=await browser.getUrl()
        let url1=url.replace("stage","qa")
        let url2=url1.replace("learn","learn-3")
        await browser.url(url2)
        }
        await LoginPage.setupPasscodeLater.waitForDisplayed({timeout:5000})
        await LoginPage.setupPasscodeLater.click()
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout:5000})
            await LoginPage.btnContinue.click()
        } catch (error) {
            
        }
        await ProfilePage.ddProfile.waitForDisplayed({timeout:5000})
        expect(await ProfilePage.ddProfile.isDisplayed()).toEqual(true)
    })
})

