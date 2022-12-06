import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import LoginPage from "../../Pages/LoginPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
import { loginData } from "../../Data/LoginData"
import OtpPage from "../../Pages/OtpPage"
let localData = require('../../Data/OLAP_data/Passcode_OLAP_Data.json')
let userID


describe("OLAP -  Passcode ", async () => {
    beforeEach("Open Login portal", async () => {
        await LoginPage.openByjusLearnPage()        
    })
    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it.skip("352882 TC_01 Validate the U_event_id 9201060 , m_desc view enter passcode screen", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="3546854888"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout : 7500})
        expect(await LoginPage.enterPasscodeTitle.isDisplayed()).toEqual(true)
        allure.startStep("Enter passcode screen event triggered - 9201060", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201060", userID, localData)).toEqual(true)
        allure.endStep()    
    })

    it.skip("352883 TC_02 Validate the U_event_id 9201061 , m_desc click login ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="3546854888"
        let otp="1234"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout : 7500})
        await LoginPage.enterOtp(otp)
        await browser.pause(4000)
        allure.startStep("Click login event triggered - 9201061", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201061", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352884 TC_03 Validate the U_event_id 9201062 , m_desc view setup new passcode screen ", async () => {
        let phoneNumber = "3553763578"
        let otp
        allure.startStep("Enter valid phone number to phone number field", true);
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        // allure.startStep("Click on Forgot Passcode",true)
        // await LoginPage.btnForgotPasscode.waitForDisplayed({timeout:3000})
        // await LoginPage.btnForgotPasscode.click()      
        
        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)
        // await browser.pause(4000)
        // await LoginPage.btnConfirm.click()
        
        // allure.startStep("Set New Passcode", true)
        // await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        // await LoginPage.enterOtpPasscode("1234")
        // await LoginPage.btnNextPasscode.click()
        // allure.startStep("Confirm New Passcode", true)
        // await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        // await LoginPage.enterOtpPasscode("1234")
        // await LoginPage.btnDone.click()
        // await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        // expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        // expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        // await browser.pause(3000)
        // await LoginPage.btnDone.click()

        allure.startStep("View setup new passcode screen event triggered - 9201062", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataPasscode("9201062", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352885 TC_04 Validate the U_event_id 9201063 , m_desc click continue ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()

        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)

        // await browser.pause(3000)
        // const handles = await browser.getWindowHandles(); 
        // await OtpPage.deleteSupportMailEntries()
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:35000})
        // await LoginPage.resendPasscodeLink.click() 
        // await browser.pause(10000)  
        // const handles1=await browser.getWindowHandles() 
        // await browser.switchToWindow(handles1[1]);      
        // let otp=await OtpPage.fetchOtpAndUrlFromEmailTab()    
        // await browser.closeWindow();
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.enterOtp(otp)
        await LoginPage.nextButton.waitForClickable({timeout: 5000})
        await LoginPage.nextButton.click()
        allure.startStep("Click continue event triggered - 9201063", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataPasscode("9201063", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352886 TC_05 Validate the U_event_id 9201064 , m_desc view enter new passcode/setup later ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()

        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)

        // await browser.pause(3000)
        // const handles = await browser.getWindowHandles(); 
        // await OtpPage.deleteSupportMailEntries()
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:35000})
        // await LoginPage.resendPasscodeLink.click() 
        // await browser.pause(10000)  
        // const handles1=await browser.getWindowHandles() 
        // await browser.switchToWindow(handles1[1]);      
        // let otp=await OtpPage.fetchOtpAndUrlFromEmailTab()    
        // await browser.closeWindow();
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.enterOtp(otp)

        await LoginPage.nextButton.waitForClickable({timeout: 15000})
        await LoginPage.nextButton.click()
        allure.startStep("View enter new passcode/setup later event triggered- 9201064", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201064", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352887 TC_06 Validate the U_event_id 9201065 , m_desc click enter new passcode/setup later ", async () => {
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
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnNextPasscode.click()
        allure.startStep("Confirm New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        allure.startStep("Click enter new passcode/setup later event triggered - 9201065", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataPasscode("9201065", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352888 TC_07 Validate the U_event_id 9201066 , m_desc confirm passcode view ", async () => {
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
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnNextPasscode.click()
        allure.startStep("Confirm New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        allure.startStep("Confirm passcode view event triggered - 9201066", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201066", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352889 TC_08 Validate the U_event_id 9201067 , m_desc confirm passcode ", async () => {
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
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnNextPasscode.click()
        allure.startStep("Confirm New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        allure.startStep("Confirm passcode event triggered - 9201067", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataPasscode("9201067", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352890 TC_09 Validate the U_event_id 9201068 , m_desc view message passcode set successfully ", async () => {
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
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnNextPasscode.click()
        allure.startStep("Confirm New Passcode", true)
        await LoginPage.setPassCodePopupTitle.waitForDisplayed({timeout: 10000})
        await LoginPage.enterOtpPasscode("1234")
        await LoginPage.btnDone.click()
        await LoginPage.passcodeSuccessText.waitForDisplayed({timeout:5000})
        expect(await LoginPage.passcodeSuccessText.isDisplayed()).toEqual(true)
        expect(await LoginPage.passcodeSuccessSubText.isDisplayed()).toEqual(true)
        await browser.pause(3000)
        await LoginPage.btnDone.click()
        allure.startStep("View message passcode set successfully event triggered - 9201068", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataPasscode("9201068", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352891 TC_10 Validate the U_event_id 9201069 , m_desc view multiple account ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="9174635048"
        let otp="5048"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.enterPasscodeTitle.waitForDisplayed({timeout : 7500})
        await LoginPage.enterOtp(otp)
        await browser.pause(4000)
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout:5000})
            await LoginPage.btnContinue.click()
        } catch(error) {}
        allure.startStep("View multiple account event triggered - 9201069", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201069", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352892 TC_11 Validate the U_event_id 9201070 , m_desc click on find passcode video ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.btnHelp.waitForDisplayed({timeout : 7500})
        await LoginPage.btnHelp.click()
        // const video_tab = "(//div)[15]"
        await LoginPage.video_tab.waitForClickable({timeout:5000})
        await LoginPage.video_tab.click()

        allure.startStep("Click on find passcode video event triggered - 9201070", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201070", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352893 TC_12 Validate the U_event_id 9201071 , m_desc view call mentor ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.btnHelp.waitForDisplayed({timeout : 7500})
        await LoginPage.btnHelp.click()
        
        allure.startStep("View call mentor event triggered - 9201071", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201071", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352894 TC_13 Validate the U_event_id 9201072 , m_desc view login link expired screen ", async () => {
        allure.startStep("View login link expired screen event triggered - 9201072", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201072", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352895 TC_14 Validate the U_event_id 9201073 , m_desc click okay ", async () => {
        allure.startStep("Click okay event triggered - 9201073", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201073", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352896 TC_15 Validate the U_event_id 9201074 , m_desc click forgot passcode ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="3546854888"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.btnForgotPasscode.waitForDisplayed({timeout : 7500})
        await LoginPage.btnForgotPasscode.click()
        allure.startStep("Click forgot passcode event triggered - 9201074", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201074", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352897 TC_16 Validate the U_event_id 9201075 , m_desc click resend passcode ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()        
        await LoginPage.btnResendPasscode.waitForDisplayed({timeout : 40000})
        await LoginPage.btnResendPasscode.click()
        allure.startStep("Click resend passcode event triggered - 9201075", true)
        // userID = await getUserId()
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201075", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352902 TC_17 Validate the U_event_id 9201076 , m_desc view change passcode in profile ", async () => {
        await LoginPage.loginToLearnPortal("paid")

        let mddProfileDisplayed = await ProfilePage.ddProfile.isClickable()

        if (!mddProfileDisplayed) {
            await browser.reloadSession()
            await LoginPage.loginToLearnPortal("paid")
        }

        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()

        await ProfilePage.btnChangePasscode.waitForDisplayed({timeout:15000})
        allure.startStep("View change passcode in profile event triggered - 9201076", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201076", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352903 TC_18 Validate the U_event_id 9201077, m_desc click change passcode in profile ", async () => {
        await LoginPage.loginToLearnPortal("paid")

        let mddProfileDisplayed = await ProfilePage.ddProfile.isClickable()

        if (!mddProfileDisplayed) {
            await browser.reloadSession()
            await LoginPage.loginToLearnPortal("paid")
        }

        await ProfilePage.ddProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnProfile.click()

        await ProfilePage.btnChangePasscode.waitForDisplayed({timeout:15000})
        await ProfilePage.btnChangePasscode.click()
        allure.startStep("Click change passcode in profile event triggered - 9201077", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201077", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352899 TC_19 Validate the U_event_id 9201078 , m_desc passcode local notification ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="3553763578"
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()
        // await browser.pause(3000)

        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)

        // const handles = await browser.getWindowHandles(); 
        // await OtpPage.deleteSupportMailEntries()
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:35000})
        // await LoginPage.resendPasscodeLink.click() 
        // await browser.pause(10000)  
        // const handles1=await browser.getWindowHandles() 
        // await browser.switchToWindow(handles1[1]);      
        // let otp=await OtpPage.fetchOtpAndUrlFromEmailTab()    
        // await browser.closeWindow();
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.enterOtp(otp)    
        await LoginPage.setupPasscodeLater.waitForClickable({timeout : 15000})
        await LoginPage.setupPasscodeLater.click()
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout:5000})
            await LoginPage.btnContinue.click()
        } catch(error) {}
        allure.startStep("Passcode local notification event triggered - 9201078", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201078", userID, localData)).toEqual(true)
        allure.endStep() 
    })
    
    it("352900 TC_20 Validate the U_event_id 9201079 , m_desc click reset passcode ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()

        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)

        // await browser.pause(3000)
        // const handles = await browser.getWindowHandles(); 
        // await OtpPage.deleteSupportMailEntries()
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:35000})
        // await LoginPage.resendPasscodeLink.click() 
        // await browser.pause(10000)  
        // const handles1=await browser.getWindowHandles() 
        // await browser.switchToWindow(handles1[1]);      
        // let otp=await OtpPage.fetchOtpAndUrlFromEmailTab()    
        // await browser.closeWindow();
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.enterOtp(otp)    
        await LoginPage.setupPasscodeLater.waitForClickable({timeout : 15000})
        await LoginPage.setupPasscodeLater.click()
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout:5000})
            await LoginPage.btnContinue.click()
        } catch(error) {}
        await LoginPage.btnReset.waitForClickable({timeout : 20000})
        await LoginPage.btnReset.click()
        allure.startStep("Click reset passcode event triggered - 9201079", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201079", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it("352901 TC_21 Validate the U_event_id 9201080 , m_desc cross button ", async () => {
        allure.startStep("Enter valid phone number to phone number field", true);
        let phoneNumber="2365585578"
        let otp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click on next", true);
        await LoginPage.clickOnNext()

        allure.startStep("Fetch Passcode",true)
        await browser.pause(2000)
        await browser.newWindow("https://identity-staging.tllms.com/api/fetch/passcode?phoneNumber=%2B91-"+phoneNumber)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        otp = await $("//pre").getText()
        otp = otp.slice(1, otp.length - 1)
        otp = Array.from(otp)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await LoginPage.enterOtp(otp)

        // await browser.pause(3000)
        // const handles = await browser.getWindowHandles(); 
        // await OtpPage.deleteSupportMailEntries()
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.resendPasscodeLink.waitForDisplayed({timeout:35000})
        // await LoginPage.resendPasscodeLink.click() 
        // await browser.pause(10000)  
        // const handles1=await browser.getWindowHandles() 
        // await browser.switchToWindow(handles1[1]);      
        // let otp=await OtpPage.fetchOtpAndUrlFromEmailTab()    
        // await browser.closeWindow();
        // await browser.switchToWindow(handles[0]);
        // await LoginPage.enterOtp(otp)    
        await LoginPage.setupPasscodeLater.waitForClickable({timeout : 15000})
        await LoginPage.setupPasscodeLater.click()
        try {
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout:5000})
            await LoginPage.btnContinue.click()
        } catch(error) {}
        await LoginPage.btnClose.waitForClickable({timeout : 20000})
        await LoginPage.btnClose.click()
        allure.startStep("Click cross button event triggered - 9201080", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201080", userID, localData)).toEqual(true)
        allure.endStep() 
    })

    it.skip("352898 TC_22 Validate the U_event_id 9201081 , m_desc error ", async () => {
        allure.startStep("Error message event triggered - 9201081", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201081", userID, localData)).toEqual(true)
        allure.endStep() 
    })
})