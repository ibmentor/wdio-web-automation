import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import PersonalizationPage from "../../../Pages/PersonalizationPage"
import { personalizationData } from "../../../Data/PersonalizationData"
import ProfilePage from "../../../Pages/ProfilePage"


describe("Learn Portal - Personalization test cases", async () => {


    it("306607 TC_01 Validate the skiptour navigation shows 8 steps for cohort 6", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort to 6th standard")
        await ProfilePage.changeCohortDetailWithoutSkippingTour(personalizationData.cohortDetails[0])
        allure.startStep("Validate start a tour is working")
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 1500 })
        await PersonalizationPage.btnLetsGo.click()
        allure.startStep("Validate Step 1 Onboarding is getting displayed with heading and content")
        await PersonalizationPage.labelStep1Heading.waitForDisplayed({ timeout: 1500 })
        for (let i = 1; i <= 8; i++) {
            takeaTourHearderAndContentValidation(i)
            if (i <= 7) { await PersonalizationPage.btnNext.click()}
            else { await PersonalizationPage.btnFinish.click() }
        }

    })

    it("306608 TC_02 Validate the skiptour navigation shows 8 steps for cohort 2", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort to 2nd standard")
        await ProfilePage.changeCohortDetailWithoutSkippingTour(personalizationData.cohortDetails[1])
        allure.startStep("Validate start a tour is working")
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 1500 })
        await PersonalizationPage.btnLetsGo.click()
        allure.startStep("Validate Step 1 Onboarding is getting displayed with heading and content")
        await PersonalizationPage.labelStep1Heading.waitForDisplayed({ timeout: 1500 })
        for (let i = 1; i <= 8; i++) {
            { if (i == 2 || i == 3) continue }
            await  PersonalizationPage.takeaTourHearderAndContentValidation(i)
            if (i <= 7) { await PersonalizationPage.btnNext.click() }
            else { await PersonalizationPage.btnFinish.click() }
        }

    })

    it("306609 TC_03 Validate the icons related to tour steps gets highlighted and other options in the background are disabled", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort to 6th standard")
        await ProfilePage.changeCohortDetailWithoutSkippingTour(personalizationData.cohortDetails[0])
        allure.startStep("Validate start a tour is working")
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 1500 })
        await PersonalizationPage.btnLetsGo.click()
        await browser.pause(2000)
        allure.startStep("Validate Step 1 Onboarding is getting displayed with heading and content")
        await PersonalizationPage.labelStep1Heading.waitForDisplayed({ timeout: 1500 })
        for (let i = 1; i <= 8; i++) {
            await browser.pause(2000)
            let text = await $("//*[@class='react-joyride__overlay']").getAttribute("style")
            let flag1 = text.includes("overflow: hidden")
            let flag2 = await $("//*[@class='react-joyride__spotlight']").isClickable()
            expect(flag1).toEqual(true)
            expect(flag2).toEqual(true)
            if (i <= 7) { await PersonalizationPage.btnNext.click()}
            else { await PersonalizationPage.btnFinish.click()}
        }
    })

    it("306610TC_04 Validate the skiptour navigation after login", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortalAndContinueTour('free')
        await browser.pause(3000)
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 1500 })
        await PersonalizationPage.btnLetsGo.click()
        allure.startStep("Validate Step 1 Onboarding is getting displayed with heading and content")
        await PersonalizationPage.labelStep1Heading.waitForDisplayed({timeout:1500})
        for (let i = 1; i <= 8; i++) {
            await  PersonalizationPage.takeaTourHearderAndContentValidation(i)
            if (i <= 7) { await PersonalizationPage.btnNext.click()}
            else { await PersonalizationPage.btnFinish.click() }
        }

    })
})