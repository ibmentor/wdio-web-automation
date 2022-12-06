import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import {profileData} from "../../Data/ProfileData"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import {checkLazyLoadingImgCountEqualValue} from "../../utils/function"

describe("Learn Portal - Profile Test cases", async () => {

    beforeEach("Open Login portal", async () => {

        await LoginPage.openByjusLearnPage()
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    
    it("315844 TC_02 Free User-Verify Changing the avatar and comparing in 3 places", async () => {

        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Select profile", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Click on edit profile picture", true);
        await ProfilePage.btnEditProfilePicture.waitForClickable({ timeout: 25000 })
        await ProfilePage.btnEditProfilePicture.click()
        allure.startStep("Select profile image", true);
        await ProfilePage.profileImage.waitForClickable({ timeout: 25000 })
        await browser.pause(5000);
        await ProfilePage.profileImage.click()
        await browser.pause(5000);
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

    it("315847 TC_05 Free User-Request a call back page validation - Validate all the elements present on the page, that subscription dropdown as well6", async () => {

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

    it("315848 TC_06 Free User-Verify cancelling and submitting request a call back from personal details section ", async () => {

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

    it("315849 TC_07 Free User-Verify cancelling and submitting request a callback from subscription section", async () => {

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

    it("315851 TC_09 Free User-Verify name and email empty error msg validation",async() => {
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

    it("315852 TC_01 Paid User-Verify Active subscription should be visible for paid user", async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Select profile", true);
        allure.startStep("Navigate to profile page", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Verify label Active subscription should displayed", true);
        await expect(await ProfilePage.labelActiveSubscription.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();

    })

    it("315853 TC_02 Paid User-Verify All subscriptions from subscription tab", async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Select profile", true);
        allure.startStep("Navigate to profile page", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("click on view all subscription button", true);
        await ProfilePage.btnSubscriptions.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnSubscriptions.click()
        let cards = await $("//div[@class='classSubscriptions_classesCard__1sf3X card-body']").isDisplayed()
        if(cards){
        let subscriptionCards = await $$("//div[@class='classSubscriptions_classesCard__1sf3X card-body']")
        for (let i = 1; i < subscriptionCards.length; i++) {
            let cardSubjectName = await $(`(//div[@class='classSubscriptions_classesCard__1sf3X card-body']//h5)[${i}]`).isDisplayed()
            let expiryDate = await $(`(//button[contains(@class,'classSubscriptions_classesStatus__1kKaG')])[${i}]`).isDisplayed()
            allure.startStep("verify test card name", true);
            await expect(cardSubjectName).toEqual(true)
            allure.startStep("verify test card expiry date", true);
            await expect(expiryDate).toEqual(true)
        }
    }
    else{
        expect(await ProfilePage.labelNoSubscription.isDisplayed()).toEqual(true)
    }
        allure.endStep();
    })
    it("315854 TC_03 Paid User-Verify All subscriptions after clicking on View all subscription button", async () => {
        await LoginPage.loginToLearnPortal('todUser')
        allure.startStep("Select profile", true);
        allure.startStep("Navigate to profile page", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("click on view all subscription button", true);
        await ProfilePage.btnViewAllSubscription.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnViewAllSubscription.click()
        await browser.pause(5000)
        let cards = await $("//div[@class='classSubscriptions_classesCard__1sf3X card-body']").isDisplayed()
        if(cards){
        let subscriptionCards = await $$("//div[@class='classSubscriptions_classesCard__1sf3X card-body']")
        for (let i = 1; i < subscriptionCards.length; i++) {
            let cardSubjectName = await $(`(//div[@class='classSubscriptions_classesCard__1sf3X card-body']//h5)[${i}]`).isDisplayed()
            let expiryDate = await $(`(//button[contains(@class,'classSubscriptions_classesStatus__1kKaG')])[${i}]`).isDisplayed()
            allure.startStep("verify test card name", true);
            await expect(cardSubjectName).toEqual(true)
            allure.startStep("verify test card expiry date", true);
            await expect(expiryDate).toEqual(true)
        }
    }
    else{
        expect(await ProfilePage.labelNoSubscription.isDisplayed()).toEqual(true)
    }
        allure.endStep();
    })

    it("331119 TC_09 Lazy loading - verify the profile page images", async () => {
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Validate image count in starting and end of the page", true) 
        for(let i=0;i<profileData.lazyLoadingUrls.length;i++)
        {
        await browser.pause(2000)   
        await checkLazyLoadingImgCountEqualValue(profileData.lazyLoadingUrls[i])
        }
        allure.endStep();
    })

    it("352290 TC_10 Validate the user is BDLC user", async () => {
        await browser.reloadSession()
        await LoginPage.loginToLearnPortal('bdlc')
        allure.startStep("Navigate to Subscription Section in Profile Page", true)
        await ProfilePage.navigatetToProfilePage()
        await ProfilePage.btnSubscriptions.click()
        await ProfilePage.doc_text.waitForExist({ timeout: 5000 })
        expect(await ProfilePage.doc_text.isExisting()).toEqual(true)
        allure.endStep();
    });
})
