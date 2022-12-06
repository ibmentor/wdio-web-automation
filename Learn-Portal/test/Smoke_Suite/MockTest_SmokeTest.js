import { AllureUtil as allure } from "../../utils/util.allure"
import { mockTestData } from "../../Data/MockTestData"
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import MockTestPage from "../../Pages/MockTestPage";
import DashboardPage from "../../Pages/DashboardPage";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()


describe("Learn Portal -MOCK TEST test cases for Premium user", async () => {

    it("316650 TC_01- Validate JEE Advanced, JEE mains, NEET and BISAT should be visible in MOCK TEST  for Premium", async () => {
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3])
        allure.startStep("Validate MOCK TEST Module", true)
        await MockTestPage.navigateToMockTestModule()
        allure.startStep("Validate JEE Amin, JEE Advanced, NEET, BITSAT", true)
        for (let i = 1; i <= 3; i++) {
            let testName = mockTestData.subTest[i - 1]
            let result = await $("//*[@data-menu-key='" + testName + "-mock-test']").isDisplayed()
            expect(result).toEqual(true)
        }
        await DashboardPage.menuOption.click()
        allure.endStep();
    })

    it("316652 TC_03- Validate MOCK TEST should not be Availabe for paid users", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[0])
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate MOCK TEST should not display", true)
        expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
        allure.endStep();

    })
    it("316653 TC_04 -Validate MOCK TEST should not be Availabe for free users", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[0])
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate MOCK TEST should not display", true)
        expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
        allure.endStep();
    })

    it("316654 TC_05 -Validate Mock Test is not displayed for user with cohort value < 11", async () => {
        await browser.reloadSession()
        for (let i = 0; i <= 2; i++) {
            await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[i], 'premium')
            allure.startStep("Click on menu options", true)
            await DashboardPage.menuOption.waitForClickable({ timeout: 25000 })
            await DashboardPage.menuOption.click()
            await browser.pause(3000)
            allure.startStep("Validate MOCK TEST should not display", true)
            expect(await MockTestPage.btnMocktest.isDisplayed()).toEqual(false)
            allure.endStep();
        }

    })

    it("316656 TC_07 -Verify the Take Test redirection in Jee-Advanced Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        await browser.pause(5000)
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard) {
        allure.startStep("Click on available test button", true)
        await (await MockTestPage.btnTakeTest).click()
        await (await MockTestPage.btnStartTest).isClickable({ timeout: 15000 })
        allure.startStep("Click on Start Test button in instruction popup", true)
        await (await MockTestPage.btnStartTest).click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        expect(await (await MockTestPage.labelJeeAdvancedAssess).isDisplayed({ timeout: 35000 })).toEqual(true)
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

    it("316657 TC_08 -Verify the Take Test redirection in Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject JEE main", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        await browser.pause(5000)//waiting for page load
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard) {
        allure.startStep("Click on available test button", true)
        await (await MockTestPage.btnTakeTest).click()
        await (await MockTestPage.btnStartTest).isClickable({ timeout: 15000 })
        allure.startStep("Click on Start Test button in instruction popup", true)
        await (await MockTestPage.btnStartTest).click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        await browser.pause(5000)
        expect(await (await MockTestPage.labelJeeMainAssess).isDisplayed({ timeout: 45000 })).toEqual(true)
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

    it("316658 TC_09 -Verify the Take Test redirection in NEET Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        await browser.pause(5000)
        allure.startStep("Click on available test button", true)
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard == true) {
        await (await MockTestPage.btnTakeTest).click()
        await (await MockTestPage.btnStartTest).isClickable({ timeout: 15000 })
        allure.startStep("Click on Start Test button in instruction popup", true)
        await (await MockTestPage.btnStartTest).click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        await browser.pause(5000)
        expect(await (await MockTestPage.labelNEETAssess).isDisplayed({ timeout: 25000 })).toEqual(true)
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

    it("316659 TC_10 -Verify the Take Test redirection in Sample Mock Test Jee-Advanced Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        await browser.pause(5000)
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard) {
        allure.startStep("Click on take test of sample mock test", true)
        await MockTestPage.btnTakeTestSampleMockTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnTakeTestSampleMockTest.click()
        allure.startStep("Click on Start Test button in instruction popup", true)
        await MockTestPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnStartTest.click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        expect(await (await MockTestPage.labelNEETAssess).isDisplayed({ timeout: 35000 })).toEqual(true)
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

    it("316660 TC_11 -Verify the Take Test redirection in Sample Mock Test Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Main", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        await browser.pause(5000)
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard) {
        allure.startStep("Click on take test of sample mock test", true)
        await MockTestPage.btnTakeTestSampleMockTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnTakeTestSampleMockTest.click()
        allure.startStep("Click on Start Test button in instruction popup", true)
        await MockTestPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnStartTest.click()
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        await expect(await MockTestPage.labelJeeMainAssess.waitForDisplayed({ timeout: 5000 })).toEqual(true);
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

    it("316661 TC_12 -Verify the Take Test redirection in Sample Mock Test NEET Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        await browser.pause(5000) // need time to load page
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard == true) {
        allure.startStep("Click on filter drop down", true)
        await MockTestPage.testFilter.click()
        allure.startStep("Select sample mock tests through filter", true)
        await browser.keys(['ArrowDown', 'Enter'])
        allure.startStep("Click on take test of sample mock test", true)
        await MockTestPage.btnTakeTestSampleMockTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnTakeTestSampleMockTest.click()
        allure.startStep("Click on Start Test button in instruction popup", true)
        await MockTestPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnStartTest.click()
        allure.startStep("Check new tab is opened or not", true)
        await browser.switchWindow("https://assess-stage.tllms.com/take-test")
        allure.startStep("Check the asses page title", true)
        await expect(await MockTestPage.labelNEETAssess.waitForDisplayed({ timeout: 5000 })).toEqual(true);
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

})
