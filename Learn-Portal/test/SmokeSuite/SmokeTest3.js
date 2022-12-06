import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import MockTestPage from "../../Pages/MockTestPage";
import AITSPage from '../../Pages/AITSPage';
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import DashboardPage from "../../Pages/DashboardPage"
import { loginData } from "../../Data/LoginData"
import { mockTestData } from "../../Data/MockTestData"
import { aitsData } from "../../Data/AITSData"


describe("Learn Portal - Smoke suite for AITS,MockTest,Byjus Classes", async () => {

    it.only("308953 TC_01 Validate AITS Module is visible/Not for 1st & 10th grade User", async () => {
        
        // allure.startStep("Change cohort Details", true)
        // await ProfilePage.changeCohortDetail(aitsData.cohortDetails[1],'premium')
        // allure.startStep("Check the AITS Module in the menu bar", true)
        // await AITSPage.navigateToAITSModule()
        // expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        // allure.startStep("Validate MOCK TEST should not display", true)
        // expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
        // await AITSPage.menuOption.click() //Close the Menu bar
        // await ProfilePage.changeCohortDetail(aitsData.cohortDetails[2],'premium')
        // allure.startStep("Check the AITS Module in the menu bar", true)
        // await AITSPage.navigateToAITSModule()
        // expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        // allure.startStep("Validate MOCK TEST should not display", true)
        // expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
        // await AITSPage.menuOption.click() 
        

    })    

    it("308954 TC_02 - AITS -Verify the Take Test redirection in Jee-Advanced Page", async () => {
        await browser.reloadSession() 
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSselectSubject("JEE Advanced")
        await browser.pause(5000)
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        try{
            await $("//*[contains(text(),'Upcoming')]").waitForDisplayed({timeout : 5000})

        }
        catch{

            //do nothing

        }        
        if (await $("//*[contains(text(),'Upcoming')]").isDisplayed()) {
        allure.startStep("Click on available test button", true)
        await (await AITSPage.btnStartTest).waitForDisplayed({timeout : 5000})
        await (await AITSPage.btnStartTest).click()
        allure.startStep("Click on Start Test button in instruction popup", true)
        await (await AITSPage.btnStartTestInstructionpopup).waitForDisplayed({timeout: 5000})
        await (await AITSPage.btnStartTestInstructionpopup).click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        expect(await (await AITSPage.labelJeeAdvancedAssess).isDisplayed({ timeout: 35000 })).toEqual(true)
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }

    })

    it("308955 TC_03 - Mock Test - Verify the Take Test redirection in Jee-Advanced Page", async () => {
        await browser.reloadSession() 
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        await browser.pause(5000)
        let upcomingTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (upcomingTabTestCards) {
        allure.startStep("Click on available test button", true)
        await (await MockTestPage.btnTakeTest).click()
        await (await MockTestPage.btnStartTest).isClickable({ timeout: 15000 })
        allure.startStep("Click on Start Test button in instruction popup", true)
        await (await MockTestPage.btnStartTest).click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        expect(await (await MockTestPage.labelJeeMainAssess).isDisplayed({ timeout: 35000 })).toEqual(true)
        }
        else {
            expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
    })

    it("308956 TC_04 Validate AITS & Mock Test module is displaying for free user or not ", async () => {
        await browser.reloadSession()         
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'free')
        allure.startStep("Validate menu is clickable",true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate AITS is displayed or not")
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        allure.startStep("Validate MOCK TEST should not display", true)
        expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
             

    })

    it("308957 TC_05 Validate AITS & MockTest module is displaying for paiduser or not ", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'paid')
        allure.startStep("Validate menu is clickable",true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate AITS is displayed or not")
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        allure.startStep("Validate MOCK TEST should not display", true)
        expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)     

    })

})