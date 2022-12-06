import { AllureUtil as allure } from "../../utils/util.allure"
import { mockTestData } from "../../Data/MockTestData"
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import MockTestPage from "../../Pages/MockTestPage";
import DashboardPage from "../../Pages/DashboardPage";
import mock from "webdriverio/build/commands/browser/mock";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()
import {checkLazyLoadingImgCount, ConceptVideoBanner} from "../../utils/function.js"

describe.skip("Learn Portal -MOCK TEST test cases for Premium user", async () => {

    it("316651 TC_02- Validate the test card> 1, Paper 1  are displayed,Time = 180 mins, qs> 54", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Validate JEE Advanced Banner heading", true)
        expect(await MockTestPage.labelOfMainpageJeeAdvanced.getText()).toEqual('Mock Test - JEE Mains')
        await $("(//div[contains(@class,'paper-card')])[1]").waitForDisplayed({timeout:10000})
        let testcard = await $("(//div[contains(@class,'paper-card')])[1]").isDisplayed()
        console.log(testcard,"**********");
        if (testcard == true) {
        allure.startStep("Check the test cards is available", true)
        await MockTestPage.labelOfTestCardJeeAdvanced.waitForDisplayed({ timeout: 25000 })
        expect(await MockTestPage.labelOfTestCardJeeAdvanced.isDisplayed()).toEqual(true)
        allure.startStep("Validate the Paper-1 on the testcard", true)
        expect(await MockTestPage.labelPaper1.getText()).toEqual('Paper 1')
        allure.startStep("validate the Paper-1 time and Questions on the testcard", true)
        const text = await MockTestPage.labelOfTimeAndQuestion1.getText()
        allure.startStep("Verify paper duration time and Questions", true)
        expect(await MockTestPage.timeAndQuestions(text)).toEqual(true)
        }
    else {
            await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })
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

    })

    it("316655 TC_06 -Verify navigation from mock test to home page is possible validate by clicking on home icon application navigates to dashboard", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.click()
        allure.startStep("Click on button MOCK TEST", true)
        await DashboardPage.btnHome.waitForClickable({ timeout: 35000 })
        await DashboardPage.btnHome.click()
        allure.startStep("Waiting for Welcome text to get displayed on Profile Page", true);
        await ProfilePage.welcomeElement.waitForDisplayed({ timout: 15000 })
        await expect(await ProfilePage.welcomeElement.isDisplayed()).toEqual(true)
        allure.endStep()
    })

    it("316662 TC_13 -Verify Instruction popup window for Mock test and sample mock test", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        console.log(testcard);
        if (testcard == true) {
        allure.startStep("Click on take test button", true)
        await MockTestPage.btnTakeTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnTakeTest.click()
        allure.startStep("Verify Instruction pop window", true)
        await expect(await MockTestPage.labelInstructionPopup.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Click on close window button", true)
        await MockTestPage.btnCloseInstructionPopup.click()
        allure.startStep("Click on filter drop down", true)
        await MockTestPage.testFilter.click()
        allure.startStep("Select sample mock tests through filter", true)
        await browser.keys(['ArrowDown', 'Enter'])
        allure.startStep("Click on take test button of sample mock test", true)
        await MockTestPage.btnTakeTestSampleMockTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnTakeTestSampleMockTest.click()
        allure.startStep("Verify Instruction pop window", true)
        await expect(await MockTestPage.labelInstructionPopup.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    else {
            await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })
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

    it("316663 TC_14 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (JEE Main) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
        let noDataAvailableTabs=[]
        await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})
        let upcomingTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            noDataAvailableTabs.push('upcomingTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
        allure.startStep("Click on Tab button Completed", true)
        await MockTestPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnCompleted.click()
        await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})
        let completedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('completedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await MockTestPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnSkipped.click()
        await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})
        let skippedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('skippedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
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
    })

    it("316664 TC_15 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (JEE Advanced) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
        let noDataAvailableTabs=[]
        try{await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})}
        catch{}
        let upcomingTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            noDataAvailableTabs.push('upcomingTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }

        allure.startStep("Click on Tab button Completed", true)
        await MockTestPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnCompleted.click()
        let completedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('completedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await MockTestPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnSkipped.click()
        let skippedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('skippedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
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
    })

    it("316665 TC_16 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (NEET) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
        let noDataAvailableTabs=[]
        try{await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})}
        catch{}
        let upcomingTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            noDataAvailableTabs.push('upcomingTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }

        allure.startStep("Click on Tab button Completed", true)
        await MockTestPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnCompleted.click()
        let completedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('completedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await MockTestPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnSkipped.click()
        let skippedTabTestCards = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await MockTestPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            noDataAvailableTabs.push('skippedTab')
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
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
    })

    it("316666 TC_17 Verify the filter function for Mock test - JEE main, JEE Advanced, NEET", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.click()
        allure.startStep("Click on Mock test", true)
        await MockTestPage.btnMocktest.waitForClickable({ timeout: 45000 })
        await MockTestPage.btnMocktest.click()
        for (let i = 0; i <= 2; i++) {
            allure.startStep("Select subject under Mock test", true)
            await MockTestPage.selectSubject(mockTestData.tests[i])
            let input = await MockTestPage.testFilter.getText()
            let filteTestText = input.trim()
            let subtitleText = await $("(//*[contains(text(),'All India Mock Tests')])[1]").getText()
            allure.startStep("Verify All india mock test heading should be displayed", true)
            expect(filteTestText).toEqual(subtitleText);
            allure.startStep("Click on filter drop down", true)
            await MockTestPage.testFilter.click()
            allure.startStep("Select sample mock tests through filter", true)
            await browser.keys(['ArrowDown', 'Enter'])
            await browser.pause(2000)//waiting for page to load
            let filterText = await MockTestPage.testFilter.getText()
            let filterTestText = filterText.trim()
            let subtitleTestText = await $("(//*[contains(text(),'Sample Mock Tests')])[1]").getText()
            allure.startStep("Verify sample mock test heading should be displayed", true)
            expect(filterTestText).toEqual(subtitleTestText);
            await DashboardPage.menuOption.click()
        }
    })
    it("316667 TC_18 Validate Bookmark button from Mock test page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'premium') 
        allure.startStep("Navigate to Mock test Module on menu bar",true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Validate bookmark redirection text is coming",true)
        await MockTestPage.btnMockTestBookMarks.waitForDisplayed({timeout:20000})
        expect(await MockTestPage.btnMockTestBookMarks.isDisplayed()).toEqual(true)
        allure.endStep()
    })
    it("316668 TC_19 Validate analysis button from Mock test page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'premium') 
        allure.startStep("Navigate to Mock test Module on menu bar",true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        allure.startStep("Click on Tab button Completed", true)
        await MockTestPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnCompleted.click()
        await $("//div[contains(@class,'exam-section card-body')]").waitForDisplayed({timeout:10000})
        let testCard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if(testCard){
        allure.startStep("Click on button analysis", true)
        await MockTestPage.btnAnalysis.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnAnalysis.click()
        await browser.switchWindow("https://assess-stage.tllms.com/test-analysis")
        allure.startStep("Validate Akash NEET mock test page", true)
        await expect(await MockTestPage.headingAkashJeeMainMockTest.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Validate page url", true)
        expect(await browser.getUrl()).toEqual("https://assess-stage.tllms.com/test-analysis")
    }
    else{
        await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
        expect("No test data available").toEqual("")    }
    })

    it("333894 TC_20 Lazy loading - Verify the image loading for Mock Test module", async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'premium')
        allure.startStep("Validate image count in starting and end of the page", true)
        for(let i=0;i<mockTestData.lazyLoadingUrls.length;i++)
        {
        await browser.pause(3000)   
        await checkLazyLoadingImgCount(mockTestData.lazyLoadingUrls[i])
        }
        allure.endStep();
    })

    it("334452 TC_21 For BTLP user in Mock test>JEE Advanced concept video card title ,description & cta is changed", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'btlp')
        allure.startStep("Navigate to Mock Test and select subject JEE Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })
    
    it("334454 TC_22 For BTLP user in Mock test>JEE Mains concept video card title ,description & cta is changed", async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'btlp')
        allure.startStep("Navigate to Mock Test and select subject JEE Main", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })
    
    it("334456 TC_23 For BTLP user in Mock test>NEET concept video card title ,description & cta is changed", async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'btlp')
        allure.startStep("Navigate to Mock Test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })

})
