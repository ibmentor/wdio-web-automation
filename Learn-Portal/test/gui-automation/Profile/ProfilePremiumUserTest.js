import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"




describe("Learn Portal - Profile Test cases", async () => {

    beforeEach("Open Login portal", async () => {

        await LoginPage.openByjusLearnPage()
    })

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })

    it("306620 TC_01 Paid User-Verify Active subscription should be visible for paid user", async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Select profile", true);
        allure.startStep("Navigate to profile page", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("Verify label Active subscription should displayed", true);
        await expect(await ProfilePage.labelActiveSubscription.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();

    })

    it("306621 TC_02 Paid User-Verify All subscriptions from subscription tab", async () => {
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
    it("306622TC_03 Paid User-Verify All subscriptions after clicking on View all subscription button", async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Select profile", true);
        allure.startStep("Navigate to profile page", true);
        await ProfilePage.navigatetToProfilePage()
        allure.startStep("click on view all subscription button", true);
        await ProfilePage.btnViewAllSubscription.waitForDisplayed({ timeout: 5000 })
        await ProfilePage.btnViewAllSubscription.click()
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
})