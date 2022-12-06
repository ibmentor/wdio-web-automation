import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage";
import { byjusclassData } from "../../Data/ByjusClassData";
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import TouchPointPage from "../../Pages/TouchPointPage";
import {loginData} from "../../Data/LoginData"
import { touchPointData} from "../../Data/TouchPointData";
const cohortDetail=touchPointData.touchPointApplicableCohort[0]

describe("Learn Portal - Byjus Class test cases", async () => {
    
    it("318891 TC_01 Validate Today CTA in Recommanded Classes", async () => {
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[6],'newUser')
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Book todays class", true)
        await browser.pause(6000)
        var noClassAvailable= await ByjusClassesPage.labelRequestCallBack.isDisplayed({timeout:25000})
        if(noClassAvailable){
            allure.startStep("Check the content of no class available page", true)
            await ByjusClassesPage.labelRequestCallBack.scrollIntoView()
            expect(await ByjusClassesPage.labelRequestCallBack.getText()).toHaveTextContaining("there are no classes to book")
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("") 
        }
        else{
        var result = await ByjusClassesPage.labelremainingslots.isDisplayed({timeout:25000})
        if(result){
            var result= await ByjusClassesPage.labelMasterClass.isDisplayed({timeout:20000})
            if(result){
                await ByjusClassesPage.btnSecondaryBookClass.click()
                await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout:25000 })
                allure.startStep("Check Today text in the successpage", true)
                expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Today")
            }
            else{
                await ByjusClassesPage.btnBookClass.click()
                await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout:25000 })
                allure.startStep("Check Today text in the successpage", true)
                expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Today")
            }
        }
        else{
            allure.startStep("Validate todays tab", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    }
    })

    it("318892 TC_02 Validate Tomorrow CTA Recommanded Classes", async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[5],'newUser')
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        var result= await ByjusClassesPage.btnTomorrowTab.isDisplayed({timeout:25000})
        if(result == true){
            allure.startStep("Check Tomorrow tab in Byjusclass main page", true)
            await ByjusClassesPage.btnTomorrowTab.click()
            await ByjusClassesPage.btnBookClass.click()
            allure.startStep("Check Tomorrow text in the successpage", true)
            await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout:25000 })
            expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Tomorrow")
        }else{
            // await ByjusClassesPage.btnTomorrowTab.waitForDisplayed({ timeout:25000 })
            allure.startStep("Check Tomorrow tab in Byjusclass main page", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })
    it('334374 TC-03 verify the chat cta window and "go to chat" box and connecting to tutor for byjus classes', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to concept video menu", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await TouchPointPage.btnConnectToAtutorForByjusClasses.waitForDisplayed({ timeout: 15000 })
        await TouchPointPage.btnConnectToAtutorForByjusClasses.click()
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorByjusClasses.waitForDisplayed({ timeout: 5000 })
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorByjusClasses.click()
        await browser.pause(3000)
        if(await TouchPointPage.popUpoSelectSubjectByjusclasses.isDisplayed() == true){
            expect(await TouchPointPage.selectSubjectConceptVideo.isDisplayed()).toEqual(true)
            await TouchPointPage.selectSubjectByjusClasses.click()
            await TouchPointPage.btnConctinueByjusClasses.click()
        }
        await TouchPointPage.popUpConnectToTutorByjusClasses.waitForDisplayed({ timeout: 3000 })
        expect(await TouchPointPage.popUpConnectToTutorByjusClasses.isDisplayed()).toEqual(true)
        await TouchPointPage.btnDOCChat.waitForDisplayed({ timeout: 5000 })
        await TouchPointPage.btnDOCChat.click()
        await TouchPointPage.connectingToTutorDocWindowByjusClasses.waitForDisplayed({ timeout: 5000 })
        expect(await TouchPointPage.connectingToTutorDocWindowByjusClasses.isDisplayed()).toEqual(true)
    }
    else {
        allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
    }

    });

}) 
