import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage";
import LoginPage from "../../Pages/LoginPage";
import MonthlyTestPage from "../../Pages/MonthlyTestPage";
import { monthlyExamData } from "../../Data/MonthlyExamData";
import MonthlytestPage from "../../Pages/MonthlyTestPage";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()
const monthlyExamCohortDetail= monthlyExamData.monthlyExamApplicableCohort[0]
describe("Learn Portal - Monthly Test module test cases for Premium user",async () => {
    it('318777 TC_01 Validate "Upcoming, completed and skipped" CTA', async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamCohortDetail,'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        let noDataAvailableTabs=[]
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        allure.startStep("Wait for Upcoming Tab to be displayed", true)
        await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({timeout:5000})
        allure.startStep("Validate Upcoming Tab Parameters",true)
        if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
            expect(await MonthlyTestPage.labelValidDateAndTime.isExisting()).toEqual(true)
            expect(await MonthlyTestPage.btnStartTest.isExisting()).toEqual(true)
        }else{
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
            noDataAvailableTabs.push('upcomingTab')
        }

        allure.startStep("click on completed tab", true)
        await MonthlyTestPage.btnCompletedTab.click()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        allure.startStep("Validate Completed Tab Parameters",true)
        if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
            expect(await MonthlyTestPage.labelValidDateAndTime.isExisting()).toEqual(true)
            expect(await MonthlyTestPage.btnDetailedAnalysis.isExisting()).toEqual(true)
            expect(await MonthlyTestPage.labelOfTimeAndQuestion1.isExisting()).toEqual(true)
            
        }else{
            await MonthlyTestPage.labelNoTest.waitForDisplayed({timeout:3000})
            expect(await MonthlyTestPage.labelNoTest.isExisting()).toEqual(true)
            expect(await MonthlyTestPage.labelSubHeadingCompletedTest.isExisting()).toEqual(true)
            noDataAvailableTabs.push('completedTab')
        }

        allure.startStep("click on skipped tab", true)
        await browser.pause(2000)
        await MonthlyTestPage.btnSkippedTab.click()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        allure.startStep("Validate skipped Tab Parameters",true)
        if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
            expect(await MonthlyTestPage.labelSkipValidDateAndTime.isExisting()).toEqual(true)
        }
        else{
            noDataAvailableTabs.push('skippedTab')
        }
        if(noDataAvailableTabs.length>0)
        {
        allure.startStep("Validate No Test Available Block",true)
        const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
        expect("No test data available in "+ noDataAvailableTabs).toEqual("") 
        }

        allure.endStep();
    });

    it("318781 TC_02 Validate exam name, exam date-time, number of questions, time duration of exam and no, of attempts", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamCohortDetail,'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await MonthlyTestPage.labelOfTestCard.isDisplayed()){
        expect(await MonthlyTestPage.labelOfTestCard.isDisplayed()).toEqual(true)
        allure.startStep("Validate the Test name on the testcard",true)
        expect(await MonthlyTestPage.labelPaperName1.getText()).toEqual('Paper 1')
        var text1 = await MonthlyTestPage.labelOfTimeAndQuestion1.getText()
        allure.startStep("Validate the Paper1 Time",true)
        expect(text1).toContain("mins")
        allure.startStep("Validate the Paper1 Number of Questions",true)
        expect(text1).toContain("Questions")
        allure.startStep("Validate the Paper1 Available till label",true)
        expect(await MonthlyTestPage.labelAvailableTill1.isDisplayed()).toEqual(true)
        allure.startStep("Validate the Paper1 Attempts Left label",true)
        expect(await MonthlyTestPage.labelAttemptsLeft1.isDisplayed()).toEqual(true)
        }
        else{
            await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
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

    it('318783 TC_03 Validate Start exam CTA',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamCohortDetail,'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Click on start test button",true)
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        if(await MonthlyTestPage.btnStartTest.isDisplayed()){
        await MonthlyTestPage.btnStartTest.waitForClickable({timeout:5000})
        await MonthlyTestPage.btnStartTest.click()
        await browser.pause(4000)
        allure.startStep("Validate instruction popup",true)
        await MonthlytestPage.startTestPopupInstruction.waitForDisplayed({timeout:3500})
        for (let i = 1; i <= 3; i++) {
            if (i == 1) {
                expect(await $("//*[contains(text(),'" + monthlyExamData.Instructions[i] + "')]").isExisting()).toEqual(true)
            }
        }
        expect(await MonthlyTestPage.startTestPopupBtnStartTest.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.startTestPopupBtnStartTest.isClickable({timeout:5000})).toEqual(true)
        expect(await MonthlyTestPage.startTestPopupPaperName.isExisting()).toEqual(true)
        expect(await MonthlyTestPage.startTestPopupPaperTimeAndQuestion.isExisting()).toEqual(true)
    }else{
        await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
    }
        allure.endStep();
    });

    it("318785 TC_04 Validate the user not submitted the exam & clicks on Resume Exam CTA", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamCohortDetail,'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        if (await MonthlyTestPage.labelOfTestCard.isDisplayed({timeout:25000})){
            let examName = await MonthlyTestPage.labelExamName.getText()
            allure.startStep("Click on available test button", true)
            await (await MonthlyTestPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await MonthlyTestPage.btnStartTest).click()
            await MonthlyTestPage.startTestPopupBtnStartTest.waitForDisplayed({timeout : 3000})
            await MonthlyTestPage.startTestPopupBtnStartTest.click()
            allure.startStep("Move to new tab", true)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await browser.keys(["PageDown","PageDown","PageDown","PageDown","PageDown","PageDown"])
            allure.startStep("Wait for checkbox to be displayed", true)
            await MonthlyTestPage.testCheckbox.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on checkbox", true)
            await MonthlyTestPage.testCheckbox.click()
            allure.startStep("Wait for Proceed button to be clickable", true)
            await MonthlyTestPage.btnTestProceed.waitForDisplayed({timeout : 3000})
            
            await browser.closeWindow();
            allure.startStep("Move to AITS tab", true)
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            allure.startStep("Wait for Completed button to be displayed", true)
            await MonthlyTestPage.btnCompleted.waitForDisplayed({timeout : 75000})
            allure.startStep("Validate the Resume Test button for uncompleted test", true)
            expect(await MonthlyTestPage.btnResumeTest(examName).waitForDisplayed({timeout : 5000})).toEqual(true)
        }
        else{
            await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
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
    
