import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage";
import { byjusclassData } from "../../Data/ByjusClassData";
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import {ConceptVideoBanner} from "../../utils/function.js"
import TouchPointPage from "../../Pages/TouchPointPage";
import {loginData} from "../../Data/LoginData"
import LoginPage from "../../Pages/LoginPage";
import { touchPointData} from "../../Data/TouchPointData";
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]
describe.skip("Learn Portal - Byjus Class test cases", async () => {

    it("319464 TC_01 Free user - Validate User have run out of the free trials", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[9], 'newUser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.labelRequestCallBack.isDisplayed({timeout:15000})
        if(result){
            allure.startStep("Check the content of run out of free trial", true)
            expect(await ByjusClassesPage.labelRequestCallBack.getText()).toHaveTextContaining("you've run out of free trials")
        }    
        else{
            allure.startStep("Validate run out of free trial user", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })

    it("319465 TC_02 Free user - Validate User don't have the Class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[6], 'newUser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.labelRequestCallBack.isDisplayed({timeout:25000})
        if(result){
            allure.startStep("Check the content of no class available page", true)
            await ByjusClassesPage.labelRequestCallBack.scrollIntoView()
            expect(await ByjusClassesPage.labelRequestCallBack.getText()).toHaveTextContaining("there are no classes to book")
        }
        else{
            allure.startStep("Validate no class available page", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })

    it("319462 TC_03 Free user - Validate All user is able to book Master class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[9], 'newUser')
        allure.startStep("Click on Byjus Class in side bar", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check master class is able to book", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.labelMasterClass.isDisplayed({timeout:45000})
        if(result){
            allure.startStep("Click on Book button", true)
            await ByjusClassesPage.btnMasterClassBook.click()
            await browser.pause(2000)
            allure.startStep("Check the Success massage", true)
            expect(await ByjusClassesPage.labelBookedSuccess.isDisplayed({timeout:15000})).toEqual(true) 
        }else{
            allure.startStep("Validate master class is able to book", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })

    it("318893 TC_04 Validate 'Swap Class' CTA", async () => {
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[5],'newUser')
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Book todays class", true)
        await browser.pause(3000)
        var result = await ByjusClassesPage.labelremainingslots.isDisplayed({ timeout: 20000 })
        if (result) {
            var result = await ByjusClassesPage.labelMasterClass.isDisplayed({ timeout: 20000 })
            if (result) {
                await ByjusClassesPage.btnSecondaryBookClass.click()
                await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout: 25000 })
                allure.startStep("Check Today text in the successpage", true)
                expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Today")
            } else {
                await ByjusClassesPage.btnBookClass.click()
                await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout: 25000 })
                allure.startStep("Check Today text in the successpage", true)
                expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Today")
            }
            await ByjusClassesPage.btnBackToByjusClasses.waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnBackToByjusClasses.click()
            await browser.pause(3000)
            var result = await ByjusClassesPage.btnSwapClass.isDisplayed({ timeout: 20000 })
            if (result) {
                await ByjusClassesPage.btnSwapClass.scrollIntoView()
                allure.startStep("Check if swap class CTA is displayed", true)
                await ByjusClassesPage.btnSwapClass.click()
                var tomorrowTab = await ByjusClassesPage.btnTomorrowTab.isDisplayed()
                if (tomorrowTab) {
                    await ByjusClassesPage.btnTomorrowTab.waitForDisplayed({ timeout: 25000 })
                    allure.startStep("Check Tomorrow tab in Swap page", true)
                    await ByjusClassesPage.btnTomorrowTab.click()
                }
                else {
                    await ByjusClassesPage.btnTodayTab.waitForDisplayed({ timeout: 25000 })
                    allure.startStep("Check Today tab in Swap page", true)
                    await ByjusClassesPage.btnTodayTab.click()
                }
                await ByjusClassesPage.btnSecondarySwapClass.click()
                allure.startStep("Check Tomorrow text in the successpage", true)
                await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout: 25000 })
                expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Tomorrow")
            } else {
                allure.startStep("Validate master class is able to book", true)
                const status = 'blocked'
                const fs = require('fs')
                fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
                expect("No test data available").toEqual("")
            }
        }
        else {
            allure.startStep("Validate master class is able to book", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })

    it("319463 TC_05 Free user - Validate Remaind me popup after booking the class", async () => {
        await browser.reloadSession()
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[5], 'newUser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check master class is able to book", true)
        await browser.pause(2000)
        var result = await ByjusClassesPage.labelMasterClass.isDisplayed({ timeout: 25000 })
        if (result) {
            allure.startStep("Click on Book button", true)
            await ByjusClassesPage.btnMasterClassBook.waitForClickable({ timeout: 15000 })
            await (await ByjusClassesPage.btnMasterClassBook).click()
        }
        await browser.pause(2000)
        var bookClassbtn = await ByjusClassesPage.btnBookClass.isDisplayed({ timeout: 25000 })
        if (bookClassbtn) {
            await ByjusClassesPage.btnBookClass.click()
            await ByjusClassesPage.labelDateInSuccessPage.waitForDisplayed({ timeout: 25000 })
            allure.startStep("Check Today text in the successpage", true)
            expect(await ByjusClassesPage.labelDateInSuccessPage.getText()).toHaveTextContaining("Today")
        }
        await browser.pause(2000)
        var remindMeBtn = await ByjusClassesPage.btnRmaindMe.isDisplayed({ timeout: 25000 })
        if (remindMeBtn) {
            allure.startStep("Check the Remaind me Button", true)
            await ByjusClassesPage.btnRmaindMe.waitForClickable({ timeout: 15000 })
            await ByjusClassesPage.btnRmaindMe.click()
            allure.startStep("Check the Mobile number in Remind me Popup", true)
            expect(await ByjusClassesPage.labelRemaindMePopupHeader.isDisplayed({ timeout: 15000 })).toEqual(true)
            expect(await ByjusClassesPage.labelMobileNumber.getText()).toHaveTextContaining('+91-' + ByjusClassesPage.PhoneNumber)
            allure.startStep("Check the Cancel button in the remaind me popup", true)
            expect(await ByjusClassesPage.btnRemaindMeCancel.isDisplayed({ timeout: 15000 })).toEqual(true)
            allure.startStep("Check the Submit button is clickable are not", true)
            await ByjusClassesPage.btnRemaindMeSubmit.waitForClickable({ timeout: 15000 })
            await ByjusClassesPage.btnRemaindMeSubmit.click()
            allure.startStep("Check the Remaind me button is displayed in the Class card/Not", true)
            expect(await ByjusClassesPage.btnMainRemaindMe.isDisplayed({ timeout: 15000 })).toEqual(false)
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
    })
    it("333661 TC_06- Neo Paid User - 	Verify the touchpoint feature for byjus classes ", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to Byjus classes Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000) //added
        expect(await TouchPointPage.btnConnectToAtutorForByjusClasses.isDisplayed()).toEqual(true)
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

    })
    it("334369 TC_07 - Neo Paid User - Verify on click of connect to tutor for byjus classes", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to Byjus classes Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        let subjectName = await $("(//div[@class='prerequist-title d-flex '])[1]").getText()
        let arr = []
        arr = subjectName.split(" ")
        await TouchPointPage.btnConnectToAtutorForByjusClasses.waitForDisplayed({ timeout: 15000 })
        await TouchPointPage.btnConnectToAtutorForByjusClasses.click()
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining(arr[0], arr[2])
        }else {
            allure.startStep("Validate No Test Available Block", true)
                const status = 'blocked'
                const fs = require('fs')
                fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
                expect("No test data available").toEqual("")
        }

    })
    it("334370 TC_08 - Neo Paid User -Verify the matches found page for the chapter selected with view solution cta for byjus classes ", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to Byjus classes Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await TouchPointPage.btnConnectToAtutorForByjusClasses.waitForDisplayed({ timeout: 15000 })
        await TouchPointPage.btnConnectToAtutorForByjusClasses.click()
        if(await TouchPointPage.popUpoSelectSubjectByjusclasses.isDisplayed() == true){
            expect(await TouchPointPage.selectSubjectConceptVideo.isDisplayed()).toEqual(true)
            await TouchPointPage.selectSubjectByjusClasses.click()
            await TouchPointPage.btnConctinueByjusClasses.click()
        }
        await TouchPointPage.btnViewSolution.waitForDisplayed({ timeout: 15000 })
        expect(await TouchPointPage.btnViewSolution.isDisplayed()).toEqual(true)
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
    })

    it("334460 TC_06 For BTLP user in Byjus class after book a class concept video card title ,description & cta is changed ", async () => {
        await browser.reloadSession()
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[3],'btlp')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.btnBookNow.isDisplayed({timeout:25000})
        if(result){
            allure.startStep("Click on Book Now Button", true)
            await ByjusClassesPage.btnBookNow.scrollIntoView()
            await ByjusClassesPage.btnBookNow.click()
            allure.startStep("Validate all the texts of Concept Video Banner", true)
            await ConceptVideoBanner()
            allure.endStep();
        }
        else{
            allure.startStep("Validate no class available page", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
    })

    it("334461 TC_07 For BTLP & NEO user in Byjus class if user doesn't have any class to book concept video card title ,description & cta is changed", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[4],'btlp')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.txtClassNotAvailable.isDisplayed({timeout:25000})
        if(result){
            allure.startStep("Check class not available", true)
            await ByjusClassesPage.txtClassNotAvailable.scrollIntoView()
            allure.startStep("Validate all the texts of Concept Video Banner", true)
            await ConceptVideoBanner()
            allure.endStep();
        }
        else{
            allure.startStep("Validate class is available", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }

        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[5], 'doubtsOnChatUser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        await browser.pause(3000)
        var result= await ByjusClassesPage.txtClassNotAvailable.isDisplayed({timeout:25000})
        if(result){
            allure.startStep("Check class not available", true)
            await ByjusClassesPage.txtClassNotAvailable.scrollIntoView()
            allure.startStep("Validate all the texts of Concept Video Banner", true)
            await ConceptVideoBanner()
            allure.endStep();
        }
        else{
            allure.startStep("Validate class is available", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
   

})    

    it("334371 TC_09 - Neo Paid User - Verify if you cant find the answer 'connect to tutor' below bar you can click.", async () => {
        allure.startStep("Login to Learn Portal", true)
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to Byjus classes Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await TouchPointPage.btnConnectToAtutorForByjusClasses.waitForDisplayed({ timeout: 15000 })
        await TouchPointPage.btnConnectToAtutorForByjusClasses.click()
        if(await TouchPointPage.popUpoSelectSubjectByjusclasses.isDisplayed() == true){
            expect(await TouchPointPage.selectSubjectConceptVideo.isDisplayed()).toEqual(true)
            await TouchPointPage.selectSubjectByjusClasses.click()
            await TouchPointPage.btnConctinueByjusClasses.click()
        }
        await TouchPointPage.belowBarConnectToATutor.waitForDisplayed({ timeout: 15000 })
        expect(await TouchPointPage.belowBarConnectToATutor.isDisplayed()).toEqual(true)
        expect(await TouchPointPage.btnCannotFindAnsConnectToTutor.isClickable()).toEqual(true)
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

    })
    it('334372 TC-10 verify if the auto subjects screen is optional for byjus classes module', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
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
        if(await TouchPointPage.popUpoSelectSubjectByjusclasses.isDisplayed() == true){
            expect(await TouchPointPage.selectSubjectConceptVideo.isDisplayed()).toEqual(true)
            await TouchPointPage.selectSubjectByjusClasses.click()
            await TouchPointPage.btnConctinueByjusClasses.click()
        }
        await TouchPointPage.popUpConnectToTutorByjusClasses.waitForDisplayed({ timeout: 3000 })
        expect(await TouchPointPage.popUpConnectToTutorByjusClasses.isDisplayed()).toEqual(true)
        expect(await TouchPointPage.chatOptionByjusClasses.isDisplayed()).toEqual(true)
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
