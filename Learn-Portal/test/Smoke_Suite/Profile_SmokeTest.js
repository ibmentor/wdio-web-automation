import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"


describe("Learn Portal - Profile Test cases", async () => {

    beforeEach("Open Login portal", async () => {

        await LoginPage.openByjusLearnPage()
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("315843 TC_01 Free User-Make sure there are 2 tabs in profile module, personal details in selected mode, by selecting subscription highlight should go to subscition tab", async () => {

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

    it("315845 TC_03 Free User-Verify the details and Edit name, dob, email, gender, city save and come back to profile module again and verify the details", async () => {

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

    it("315846 TC_04 Free User-Verify For free user, no subscription and request call back options should be available", async () => {

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

    it("315850 TC_08 Free User-Change the cohort and validate the cohert at dashboard page",async() => {
        
        for (let i = 0; i < loginData.sanityData.cohortDetailsSanitySuite.length; i++) {
        allure.startStep("change cohort details", true);
        let cohortDetail = loginData.sanityData.cohortDetailsSanitySuite[i]
        allure.startStep("Application navigates to Profile page and changes the  cohort to "+cohortDetail,true)
        await ProfilePage.changeCohortDetailWithMultipleCohort(cohortDetail, 'free')
        let Cohort = await $("(//*[@class='font-12 account-position'])[1]").getText()
        allure.startStep("Validate grade changed as expected", true);
        await expect(Cohort).toEqual(loginData.sanityData.cohortDetailsSanitySuite[i])
       
        }
        allure.endStep();
    })

})