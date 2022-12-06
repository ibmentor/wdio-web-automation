import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import { loginData } from "../../../Data/LoginData"
import ProfilePage from "../../../Pages/ProfilePage"
import DashboardPage from "../../../Pages/DashboardPage"


describe("Learn Portal - Profile Test cases", async () => {

    beforeEach("Open Login portal", async () => {

        await LoginPage.openByjusLearnPage()
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("306611 TC_01 Free User-Make sure there are 2 tabs in profile module, personal details in selected mode, by selecting subscription highlight should go to subscition tab", async () => {

        allure.startStep("Enter valid phone number and otp login to learn portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        await browser.pause(3000)//waiting for page to load
        let selectedTab = await $("//li[@class='selected' and contains(text(),'Personal Details')]").isDisplayed()
        allure.startStep("Verify personal details Tab is selected", true);
        await expect(selectedTab).toEqual(true)
        let twoTabs = await $("//div[@class='tab-container']//li").isDisplayed()
        allure.startStep("Verify 2 tabs of personal details and subscription should display", true);
        await expect(twoTabs).toEqual(true)
        allure.startStep("Click on subscription button", true);
        await ProfilePage.btnSubscriptions.click()
        let highlightSubscription = await $("//li[@class='selected' and contains(text(),'Subscriptions')]").isDisplayed()
        allure.startStep("Verify subscription tab should be highlighted after click on it", true);
        await expect(highlightSubscription).toEqual(true)
        allure.endStep();
    })

    it("306612 TC_02 Free User-Verify Changing the avatar and comparing in 3 places", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Click on edit profile picture", true);
        await ProfilePage.btnEditProfilePicture.waitForClickable({ timeout: 25000 })
        await ProfilePage.btnEditProfilePicture.click()
        allure.startStep("Select profile image", true);
        await ProfilePage.profileImage.waitForClickable({ timeout: 25000 })
        await ProfilePage.profileImage.click()
        await browser.pause(2000);
        allure.startStep("Verify drop down image should be changed", true);
        await expect(await ProfilePage.ddAvatarImage.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Verify personal details image should be changed", true);
        expect(await ProfilePage.personalDetailsImage.isDisplayed()).toEqual(true)
        allure.startStep("Click on menu option", true);
        await DashboardPage.menuOption.click()
        allure.startStep("Click on home button", true);
        await DashboardPage.btnHome.click()
        allure.startStep("Verify drop down image should be changed at dashboard page", true);
        expect(await ProfilePage.ddAvatarImage.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306613 TC_03 Free User-Verify the details and Edit name, dob, email, gender, city save and come back to profile module again and verify the details", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change profile details name, email, DOB, gender, city", true);
        await ProfilePage.changeProfileDetails()
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        let name = await ProfilePage.tfname.getValue()
        let email = await ProfilePage.tfEmail.getValue()
        let DOB = await ProfilePage.tfDob.getValue()
        let gender = await $("(//div[contains(@class,'css-qc6sy-singleValue')])[2]").getText()
        let city = await $("(//div[contains(@class,'css-qc6sy-singleValue')])[3]").getText()
        allure.startStep("Verify name input field ", true);
        await expect(name).toEqual("Rahul")
        allure.startStep("Verify Email filed ", true);
        await expect(email).toEqual("test5455@gamil.com")
        allure.startStep("Verify Date of Birth filed", true);
        await expect(DOB).toEqual("18/12/1993")
        allure.startStep("Verify gender drop down", true);
        await expect(gender).toEqual("Male")
        allure.startStep("Verify city drop down", true);
        await expect(city).toEqual("Bhopal")
        allure.endStep();
    })

    it("306614 TC_04 Free User-Verify For free user, no subscription and request call back options should be available", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        await browser.pause(2000)//waiting for page to load
        let labelNoSubscription = await $("(//button[contains(@class,'personalDetails_subscriptionBtn__2k5V-')])[2]").isDisplayed()
        allure.startStep("Verify no subscription button should be displayed", true);
        await expect(labelNoSubscription).toEqual(true)
        allure.startStep("Verify request a call back button should be displayed", true);
        expect(await ProfilePage.btnRequestCallBack.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306615 TC_05 Free User-Request a call back page validation - Validate all the elements present on the page, that subscription dropdown as well6", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Click on request a call back button", true);
        await ProfilePage.btnRequestCallBack.click()
        let requestCallBack = await $("//*[@class='request-header']").isDisplayed()
        allure.startStep("Verify request a call back header should be visible", true);
        await expect(requestCallBack).toEqual(true)
        let tfName = await $("//label[normalize-space()='Name']").isDisplayed()
        let tfPhoneNumber = await $("//label[normalize-space()='Phone number']").isDisplayed()
        let TfEmail = await $("//label[normalize-space()='Email']").isDisplayed()
        let ddSubscription = await $("//div[contains(@class,'css-ackcql')]").isDisplayed()
        allure.startStep("Verify name input field should be visible", true);
        await expect(tfName).toEqual(true)
        allure.startStep("Verify phone number input field should be visible", true);
        await expect(tfPhoneNumber).toEqual(true)
        allure.startStep("Verify email field should be visible", true);
        await expect(TfEmail).toEqual(true)
        allure.startStep("Verify subscription drop down should be visible", true);
        await expect(ddSubscription).toEqual(true)
        allure.endStep();
    })

    it("306616 TC_06 Free User-Verify cancelling and submitting request a call back from personal details section ", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Click on request a call back button", true);
        await ProfilePage.btnRequestCallBack.click()
        let requestCallBack = await $("//*[@class='request-header']").isDisplayed()
        allure.startStep("Verify request a call back page should be visible", true);
        await expect(requestCallBack).toEqual(true)
        allure.startStep("Click on cancel request a call back button", true);
        await ProfilePage.btnRequestCallBackCancel.click()
        let profileHeading = await $("//*[@class='css-17wwswp']").isDisplayed()
        allure.startStep("Verify profile page heading after clicking on cancel request a call back button", true);
        await expect(profileHeading).toEqual(true)
        allure.startStep("Click on request a call back button", true);
        await ProfilePage.btnRequestCallBack.click()
        allure.startStep("Click on request a call back submit button", true);
        await ProfilePage.btnRequestCallBackSubmit.click()
        await browser.pause(3000)//waiting for page to load
        let requestSubmitted = await $("(//*[normalize-space()='Your request is submitted!'])[1]").isDisplayed()
        allure.startStep("Verify request submitted successfully", true);
        await expect(requestSubmitted).toEqual(true)
        allure.endStep();
    })

    it("306617 TC_07 Free User-Verify cancelling and submitting request a callback from subscription section", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        await ProfilePage.btnSubscriptions.click()
        allure.startStep("Click on request a call back button", true);
        await ProfilePage.btnRequestCallBackSubscriptionPage.click()
        let requestCallBack = await $("//*[@class='request-header']").isDisplayed()
        allure.startStep("Verify request a call back page should be visible", true);
        await expect(requestCallBack).toEqual(true)
        allure.startStep("Click on cancel request a call back button", true);
        await ProfilePage.btnRequestCallBackCancel.click()
        let profileHeading = await $("//*[@class='css-17wwswp']").isDisplayed()
        allure.startStep("Verify profile page heading after clicking on cancel request a call back button", true);
        await expect(profileHeading).toEqual(true)
        allure.startStep("Click on request a call back button", true);
        await ProfilePage.btnRequestCallBack.click()
        allure.startStep("Click on request a call back submit button", true);
        await ProfilePage.btnRequestCallBackSubmit.click()
        await browser.pause(3000)//waiting for page to load
        let requestSubmitted = await $("(//*[normalize-space()='Your request is submitted!'])[1]").isDisplayed()
        allure.startStep("Verify request submitted successfully", true);
        await expect(requestSubmitted).toEqual(true)
        allure.endStep();
    })

    it("306618 TC_08 Free User-Change the cohort and validate the cohert at dashboard page",async() => {

        for (let i = 0; i <= 25; i++) {
        allure.startStep("change cohort details", true);
        let cohortDetail = loginData.sanityData.cohortDetails[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetailWithMultipleCohort(cohortDetail, 'free')
        let Cohort = await $("(//*[@class='font-12 account-position'])[1]").getText()
        allure.startStep("Validate grade changed as expected", true);
        await expect(Cohort).toEqual(loginData.sanityData.cohortDetailsSanitySuite[i])
       
        }
        allure.endStep();
    })
    it("306619 TC_09 Free User-Verify name and email empty error msg validation",async() => {
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Clear the name input values", true);
        await ProfilePage.tfname.clearValue()
        allure.startStep("Set invalid name values", true);
        await ProfilePage.tfname.setValue("t")
        allure.startStep("Clear the Email input values", true);
        await ProfilePage.tfEmail.clearValue()
        allure.startStep("Set invalid Email Email values", true);
        await ProfilePage.tfEmail.setValue("t")
        allure.startStep("Click on save button", true);
        await ProfilePage.btnSave.click()
        let errorMsgName = await $("//div[contains(text(),'Enter a valid name')]").isDisplayed()
        let errorMsgEmail = await $("//div[contains(text(),'Enter a valid email')]").isDisplayed()
        allure.startStep("Verify Error msg for empty name", true);
        await expect(errorMsgName).toEqual(true)
        allure.startStep("Verify Error msg for empty Email", true);
        await expect(errorMsgEmail).toEqual(true)
        allure.endStep();

    })
})