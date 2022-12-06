import { AllureUtil as allure } from "../../../utils/util.allure"
import { mockTestData } from "../../../Data/MockTestData"
import LoginPage from "../../../Pages/LoginPage";
import ProfilePage from "../../../Pages/ProfilePage";
import MockTestPage from "../../../Pages/MockTestPage";
import DashboardPage from "../../../Pages/DashboardPage";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()


describe("Learn Portal -MOCK TEST test cases for Premium user", async () => {

    it("306588 TC_01- Validate JEE Advanced, JEE mains, NEET and BISAT should be visible in MOCK TEST  for Premium", async () => {
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

    it("306589 TC_02- Validate the test card> 1, Paper 1  are displayed,Time = 180 mins, qs> 54", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Validate JEE Advanced Banner heading", true)
        expect(await MockTestPage.labelOfMainpageJeeAdvanced.getText()).toEqual('Mock Test - JEE Mains')
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
        if (testcard) {
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

    }
        allure.endStep();

    })

    it("306590 TC_03- Validate MOCK TEST should not be Availabe for paid users", async () => {
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
    it("306591 TC_04 -Validate MOCK TEST should not be Availabe for free users", async () => {
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

    it("306592 TC_05 -Validate Mock Test is not displayed for user with cohort value < 11", async () => {
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
    it("306593 TC_06 -Verify navigation from mock test to home page is possible validate by clicking on home icon application navigates to dashboard", async () => {
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
    it("306594 TC_07 -Verify the Take Test redirection in Jee-Advanced Page", async () => {
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
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
    })

    it("306595 TC_08 -Verify the Take Test redirection in Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject JEE main", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        await browser.pause(3000)//waiting for page load
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
        expect(await (await MockTestPage.labelJeeMainAssess).isDisplayed({ timeout: 45000 })).toEqual(true)
    }
    else {
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    })

    it("306596 TC_09 -Verify the Take Test redirection in NEET Page", async () => {
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    })

    it("306597 TC_10 -Verify the Take Test redirection in Sample Mock Test Jee-Advanced Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Advanced", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

    }
    })

    it("306598 TC_11 -Verify the Take Test redirection in Sample Mock Test Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject Jee-Main", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    })

    it("306599 TC_12 -Verify the Take Test redirection in Sample Mock Test NEET Page", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    })

    it("306600 TC_13 -Verify Instruction popup window for Mock test and sample mock test", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        let testcard = await $("//div[contains(@class,'exam-section card-body')]").isDisplayed()
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

    }
    })

    it("306601 TC_14 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (JEE Main) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
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
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
    })

    it("306602 TC_15 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (JEE Advanced) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Advanced")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
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
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
    })

    it("306603 TC_16 Verify Upcoming, Completed, Skipped, Tab Date validaton for Mock Test (NEET) ", async () => {
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3], 'premium')
        allure.startStep("Navigate to Mock test and select subject NEET", true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        allure.startStep("Click on Tab button Upcoming", true)
        await MockTestPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnUpcoming.click()
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
            await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
    })

    it("306604 TC_17 Verify the filter function for Mock test - JEE main, JEE Advanced, NEET", async () => {
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
    it("306605 TC_18 Validate Bookmark button from Mock test page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'premium') 
        allure.startStep("Navigate to Mock test Module on menu bar",true)
        await MockTestPage.navigateToMockTestselectSubject("JEE Main")
        allure.startStep("Validate bookmark redirection text is coming",true)
        await MockTestPage.btnMockTestBookMarks.waitForDisplayed({timeout:20000})
        expect(await MockTestPage.btnMockTestBookMarks.isDisplayed()).toEqual(true)
        allure.endStep()
    })
    it.only("306606 TC_19 Validate analysis button from Mock test page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(mockTestData.cohortDetails[3],'premium') 
        allure.startStep("Navigate to Mock test Module on menu bar",true)
        await MockTestPage.navigateToMockTestselectSubject("NEET")
        allure.startStep("Click on Tab button Completed", true)
        await MockTestPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await MockTestPage.btnCompleted.click()
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
        await expect(await MockTestPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    }
    })
  
})