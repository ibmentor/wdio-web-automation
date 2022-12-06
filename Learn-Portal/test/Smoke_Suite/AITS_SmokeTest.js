import { AllureUtil as allure } from "../../utils/util.allure"
import { aitsData } from "../../Data/AITSData";
import ProfilePage from "../../Pages/ProfilePage";
import AITSPage from '../../Pages/AITSPage';
import DashboardPage from '../../Pages/DashboardPage'
import ConceptVideoPage from '../../Pages/ConceptVideoPage'
import AskADoubtPage from '../../Pages/AskADoubtPage'
import LoginPage from "../../Pages/LoginPage";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()


describe("Learn Portal - AITS test cases for Premium user", async () => {

    it("315872 TC_01 Validate AITS Module is visible/Not for 1st grade User", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[1],'premium')
        allure.startStep("Check the AITS Module in the menu bar", true)
        await AITSPage.navigateToAITSModule()
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        await AITSPage.menuOption.click() //Close the Menu bar
        allure.endStep()

    })

    it("315873 TC_02 Validate AITS Module is visible/Not for 10th grade User", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[2],'premium')
        allure.startStep("Check the AITS Module in the menu bar", true)
        await AITSPage.navigateToAITSModule()
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        await AITSPage.menuOption.click() //Close the Menu bar
        allure.endStep()

    })

    it("315874 TC_03 Validate AITS module is available for Premium user/Not", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Validate the AITS Module",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("validate Jee advance is displaying",true)
        await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnJeeAdvance.isDisplayed()).toEqual(true)
        allure.startStep("validate Jee mains is displaying",true)
        await AITSPage.btnJeeMain.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnJeeMain.isDisplayed()).toEqual(true)
        allure.startStep("validate NEET is displaying",true)
        await AITSPage.btnNeet.waitForDisplayed({timeout:15000 })
        expect(await AITSPage.btnNeet.isDisplayed()).toEqual(true)
        await AITSPage.menuOption.click()
        allure.endStep()

    })  

    it("315885 TC_14 -Verify the Take Test redirection in Jee-Advanced Page", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject Jee-Advanced", true)
        await AITSPage.navigateToAITSselectSubject("JEE Advanced")
        await browser.pause(5000)
        if(await AITSPage.btnStartTest.isDisplayed({timeout : 3000})){
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Check new tab is opened or not", true)
            await browser.switchWindow("https://assess-stage.tllms.com/take-test")
            allure.startStep("Check the asses page title", true)
            expect(await (await AITSPage.labelJeeAdvancedAssess).isDisplayed({ timeout: 45000 })).toEqual(true)
        }
        else {
            await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 3000 })
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    })
    it("315886 TC_15 -Verify the Take Test redirection in Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject JEE main", true)
        await AITSPage.navigateToAITSselectSubject("JEE Main")
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:17000})}
        catch{}
        await browser.pause(5000)
        if(await AITSPage.btnStartTest.isDisplayed()){
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Check new tab is opened or not", true)
            await browser.switchWindow("https://assess-stage.tllms.com/take-test")
            allure.startStep("Check the asses page title", true)
            expect(await (await AITSPage.labelJeeMainAssess).isDisplayed({ timeout: 45000 })).toEqual(true)
        }
        else {
            await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 3000 })
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    })
    it("315887 TC_16 -Verify the Take Test redirection in NEET Page", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("NEET")
        await browser.pause(8000)
        let flag =await AITSPage.btnStartTest.isDisplayed({timeout : 5000})
        if(flag == true){
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Check new tab is opened or not", true)
            await browser.switchWindow("https://assess-stage.tllms.com/take-test")
            allure.startStep("Check the asses page title", true)
            await browser.pause(5000)
            await browser.refresh()
            expect(await (await AITSPage.labelNEETAssess).isDisplayed({ timeout: 25000 })).toEqual(true)
        }
        else {
            await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 3000 })
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    })

})