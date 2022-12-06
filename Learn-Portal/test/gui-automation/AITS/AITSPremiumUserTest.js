import { AllureUtil as allure } from "../../../utils/util.allure"
import { aitsData } from "../../../Data/AITSData";
import ProfilePage from "../../../Pages/ProfilePage";
import AITSPage from '../../../Pages/AITSPage';
import DashboardPage from '../../../Pages/DashboardPage'
import ConceptVideoPage from '../../../Pages/ConceptVideoPage'
import AskADoubtPage from '../../../Pages/AskADoubtPage'
import LoginPage from "../../../Pages/LoginPage";
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
    it("306364 TC_04 Validate AITS(JEE-Advance) test cards are available or not", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeAdvance.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:15000})
        await AITSPage.labelOfMainpage.click()
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Advanced')
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7500})}
        catch{}
        allure.startStep("Check the test cards is available/Not",true)
        if (await AITSPage.labelOfTestCard.isDisplayed()){
        expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
        allure.startStep("Check the Paper1 on the testcard",true)
        expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
        allure.startStep("Check the Paper2 on the testcard",true)
        expect(await AITSPage.labelPaper2.getText()).toEqual('Paper 2')
        allure.startStep("Check the Paper1 time and Questions on the testcard",true)
        await AITSPage.labelOfTimeAndQuestion1.waitForDisplayed({timeout:45000})
        var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()       
        expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
        allure.startStep("Check the Paper2 time and Questions on the testcard",true)
        await AITSPage.labelOfTimeAndQuestion1.waitForDisplayed({timeout:45000})
        var text2 = await AITSPage.labelOfTimeAndQuestion2.getText()
        expect(await AITSPage.timeAndQuestions(text2)).toEqual(true)
    }
    else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    }) 
    it("306365 TC_05 Validate AITS(JEE-Main) test cards are available or not", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeMain.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeMain.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:65000})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Mains')
        allure.startStep("Check the test cards is available/Not",true)
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
            allure.startStep("Check the Paper1 on the testcard",true)
            expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
            allure.startStep("Check the Paper1 time and Questions on the testcard",true)
            var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()
            console.log("@@@@",parseInt(text1.slice(0,4).trim()))
            console.log("#####",parseInt(text1.slice(11,13).trim()))
            expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    })
    it("306366 TC_06 Validate AITS(NEET) test cards are available or not", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS NEET Page menu",true)
        await AITSPage.btnNeet.waitForClickable({timeout:45000 })
        await AITSPage.btnNeet.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:7500})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - NEET')
        allure.startStep("Check the test cards is available/Not",true)
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
        expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
        allure.startStep("Check the Paper1 on the testcard",true)
        expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
        allure.startStep("Check the Paper1 time and Questions on the testcard",true)
        var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()
        expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        await browser.reloadSession()
        allure.endStep()
    })

    it("306367 TC_07 Validate AITS module is displaying for free user or not ", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'free')
        allure.startStep("Validate menu is clickable",true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate AITS is displayed or not")
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        await browser.reloadSession()
        allure.endStep()

    })
    it("306368 TC_08 Validate AITS module is displaying for paiduser or not ", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'paid')
        allure.startStep("Validate menu is clickable",true)
        await DashboardPage.menuOption.click()
        allure.startStep("Validate AITS is displayed or not")
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        await browser.reloadSession()
        allure.endStep()

    })
    it("306369 TC_09 Validate redirection of ask a doubt from AITS page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Validate Jee advance is displaying",true)
        await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:65000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Validate Ask a Doubt redirection from AITS-Jee Advanced page",true)
        await AITSPage.btnAITSAskADoubt.waitForClickable({timeout:65000})
        await AITSPage.btnAITSAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        await AskADoubtPage.labelBreadCrumb("Search").waitForDisplayed({timeout : 5000})
        allure.startStep("Validate redirection of ask a doubt from AITS page", true)
        expect(await AskADoubtPage.labelBreadCrumb("Search").isDisplayed()).toEqual(true)
        expect(await AskADoubtPage.labelBreadCrumb(">").isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("306370 TC_10 Validate redirection of Concept video  from AITS page", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Validate Jee advance is displaying",true)
        await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:65000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Validate Ask a Doubt redirection from AITS-Jee Advanced page",true)
        await AITSPage.btnAITSConceptVideo.waitForClickable({timeout:65000})
        await AITSPage.btnAITSConceptVideo.click()
        allure.startStep("Validate Concept Video redirection text is coming",true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForDisplayed({timeout:25000})
        expect(await ConceptVideoPage.btnPlayOnMainPage.isDisplayed()).toEqual(true)
        allure.endStep()
    })
    it("306371 TC_11 Validate redirection of Bookmark from AITS page", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium') 
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Validate Jee advance is displaying",true)
        await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:25000 })
        await AITSPage.btnJeeAdvance.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            allure.startStep("Validate bookmark redirection text is coming",true)
            await AITSPage.btnAITSBookMark.waitForDisplayed({timeout:20000})
            expect(await AITSPage.btnAITSBookMark.isDisplayed()).toEqual(true)
        }
        else{
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 8000 })).toEqual(true);
        }
        allure.endStep()
    })
    it("306372 TC_12  Validate AITS is not displayed for user with cohort value < 11", async () => {
        for (let i = 1; i <= 2; i++) {
            await ProfilePage.changeCohortDetail(aitsData.cohortDetails[i], 'premium')
            allure.startStep("Click on menu options", true)
            await DashboardPage.menuOption.waitForClickable({ timeout: 25000 })
            await DashboardPage.menuOption.click()
            await browser.pause(3000)
            allure.startStep("Validate AITS should not display", true)
            expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
            allure.endStep();
        }
    })
    it("306373 TC_13 -Verify navigation from AITS to home page is possible validate by clicking on home icon application navigates to dashboard", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject Jee-Advanced", true)
        await AITSPage.navigateToAITSselectSubject("JEE Advanced")
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.click()
        allure.startStep("Click on button AITS", true)
        await DashboardPage.btnHome.waitForClickable({ timeout: 35000 })
        await DashboardPage.btnHome.click()
        allure.startStep("Waiting for Welcome text to get displayed on Profile Page", true);
        await ProfilePage.welcomeElement.waitForDisplayed({ timout: 15000 })
        await expect(await ProfilePage.welcomeElement.isDisplayed()).toEqual(true)
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
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })
    it("315886 TC_15 -Verify the Take Test redirection in Jee-Main Page", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject JEE main", true)
        await AITSPage.navigateToAITSselectSubject("JEE Main")
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:17000})}
        catch{}
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
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })
    it("315887 TC_16 -Verify the Take Test redirection in NEET Page", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("NEET")
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
            await browser.pause(5000)
            await browser.refresh()
            expect(await (await AITSPage.labelNEETAssess).isDisplayed({ timeout: 25000 })).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 30000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })


    it("306377 TC_17 -Verify Instruction popup window for AITS", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("NEET")
        allure.startStep("Click on take test button", true)
        await AITSPage.btnStartTest.waitForClickable({ timeout: 45000 })
        await AITSPage.btnStartTest.click()
        allure.startStep("Verify Instruction pop window", true)
        await expect(await AITSPage.labelInstructionPopup.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep()

    })
    it("306378 TC_18 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (JEE Main) ", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("JEE Main")
        allure.startStep("Click on Tab button Upcoming", true)
        await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await AITSPage.btnUpcoming.click()
        let upcomingTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 8000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button Completed", true)
        await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await AITSPage.btnCompleted.click()
        let completedTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await AITSPage.btnSkipped.click()
        let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.endStep()
    })
    it("306379 TC_19 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (JEE Advanced) ", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("JEE Advanced")
        allure.startStep("Click on Tab button Upcoming", true)
        await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await AITSPage.btnUpcoming.click()
        let upcomingTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }

        allure.startStep("Click on Tab button Completed", true)
        await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await AITSPage.btnCompleted.click()
        let completedTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await AITSPage.btnSkipped.click()
        let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }
        allure.endStep()
    })
    it("306380 TC_20 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (NEET) ", async () => {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
        allure.startStep("Navigate to AITS and select subject NEET", true)
        await AITSPage.navigateToAITSselectSubject("NEET")
        allure.startStep("Click on Tab button Upcoming", true)
        await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
        await AITSPage.btnUpcoming.click()
        let upcomingTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (upcomingTabTestCards) {
            let arr = []
            let availableDate = await $("//i[contains(@class,'test-status')]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify availabe test month date in upcoming tab", true)
            expect(convertedDate >= stringDate)
            allure.startStep("Verify availabe test year date in upcoming tab", true)
            expect(currentYear >= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        }

        allure.startStep("Click on Tab button Completed", true)
        await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
        await AITSPage.btnCompleted.click()
        let completedTabTestCards = await $("//div[@class='border exam-card card']").isDisplayed()
        if (completedTabTestCards) {
            let arr = []
            let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = availableDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let stringDate = currentMonth.toString()
            allure.startStep("Verify month date in Completed tab", true)
            expect(convertedDate <= stringDate)
            allure.startStep("Verify year date Completed tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
        allure.startStep("Click on Tab button skipped", true)
        await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
        await AITSPage.btnSkipped.click()
        let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await AITSPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else {
            await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true);

        }
    })

    it("308213 TC_21 Validate AITS(JEE-Advance) after submitting the test the test should move to Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeAdvance.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:15000})
        await AITSPage.labelOfMainpage.click()
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Advanced')
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7500})}
        catch{}
        allure.startStep("Check the test cards is available/Not",true)
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            let examName = await AITSPage.labelExamName.getText()
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Move to new tab", true)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await browser.keys(["PageDown","PageDown","PageDown","PageDown","PageDown","PageDown"])
            allure.startStep("Wait for checkbox to be displayed", true)
            await AITSPage.testCheckbox.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on checkbox", true)
            await AITSPage.testCheckbox.click()
            allure.startStep("Wait for Proceed button to be clickable", true)
            await AITSPage.btnTestProceed.waitForDisplayed({timeout : 3000})
            allure.startStep("Click on Proceed button", true)
            await AITSPage.btnTestProceed.click()
            allure.startStep("Wait for Submit button to be clickable", true)
            await AITSPage.btnTestSubmit.waitForDisplayed({timeout : 4500})
            
            // expect(await AITSPage.btnTestSubmit.isDisplayed()).toEqual(true)
            
            allure.startStep("Click on Submit button", true)
            await AITSPage.btnTestSubmit.click()
            allure.startStep("Wait for Yes button to be clickable", true)
            await AITSPage.btnTestYes.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on Yes button", true)
            await AITSPage.btnTestYes.click()

            await browser.closeWindow();
            allure.startStep("Move to AITS tab", true)
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            allure.startStep("Wait for Completed button to be displayed", true)
            await AITSPage.btnCompleted.waitForDisplayed({timeout : 75000})
            allure.startStep("Click on Complete button", true)
            await AITSPage.btnCompleted.click()
            expect(await AITSPage.completedLabelExamName(examName).waitForDisplayed({timeout : 5000})).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    }) 
    it("308214 TC_22 Validate AITS(JEE-Main) after submitting the test the test should move to Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeMain.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeMain.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:65000})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Mains')
        allure.startStep("Check the test cards is available/Not",true)
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            let examName = await AITSPage.labelExamName.getText()
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Move to new tab", true)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await browser.keys(["PageDown","PageDown","PageDown","PageDown","PageDown","PageDown"])
            allure.startStep("Wait for checkbox to be displayed", true)
            await AITSPage.testCheckbox.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on checkbox", true)
            await AITSPage.testCheckbox.click()
            allure.startStep("Wait for Proceed button to be clickable", true)
            await AITSPage.btnTestProceed.waitForDisplayed({timeout : 3000})
            allure.startStep("Click on Proceed button", true)
            await AITSPage.btnTestProceed.click()
            allure.startStep("Wait for Submit button to be clickable", true)
            await AITSPage.btnTestSubmit.waitForDisplayed({timeout : 4500})
            
            // expect(await AITSPage.btnTestSubmit.isDisplayed()).toEqual(true)
            
            allure.startStep("Click on Submit button", true)
            await AITSPage.btnTestSubmit.click()
            allure.startStep("Wait for Yes button to be clickable", true)
            await AITSPage.btnTestYes.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on Yes button", true)
            await AITSPage.btnTestYes.click()

            await browser.closeWindow();
            allure.startStep("Move to AITS tab", true)
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            allure.startStep("Wait for Completed button to be displayed", true)
            await AITSPage.btnCompleted.waitForDisplayed({timeout : 75000})
            allure.startStep("Click on Complete button", true)
            await AITSPage.btnCompleted.click()
            expect(await AITSPage.completedLabelExamName(examName).waitForDisplayed({timeout : 5000})).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    })
    it("308215 TC_23 Validate AITS(NEET) after submitting the test the test should move to Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS NEET Page menu",true)
        await AITSPage.btnNeet.waitForClickable({timeout:45000 })
        await AITSPage.btnNeet.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:7500})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - NEET')
        allure.startStep("Check the test cards is available/Not",true)
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            let examName = await AITSPage.labelExamName.getText()
            allure.startStep("Click on available test button", true)
            await (await AITSPage.btnStartTest).isClickable({ timeout: 15000 })
            allure.startStep("Click on Start Test button in instruction popup", true)
            await (await AITSPage.btnStartTest).click()
            await AITSPage.btnPopupStartTest.waitForDisplayed({timeout : 3000})
            await AITSPage.btnPopupStartTest.click()
            allure.startStep("Move to new tab", true)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await browser.refresh()
            await browser.keys(["PageDown","PageDown","PageDown","PageDown","PageDown","PageDown"])
            allure.startStep("Wait for checkbox to be displayed", true)
            await AITSPage.testCheckbox.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on checkbox", true)
            await AITSPage.testCheckbox.click()
            allure.startStep("Wait for Proceed button to be clickable", true)
            await AITSPage.btnTestProceed.waitForDisplayed({timeout : 3000})
            allure.startStep("Click on Proceed button", true)
            await AITSPage.btnTestProceed.click()
            allure.startStep("Wait for Submit button to be clickable", true)
            await AITSPage.btnTestSubmit.waitForDisplayed({timeout : 4500})
            
            // expect(await AITSPage.btnTestSubmit.isDisplayed()).toEqual(true)
            
            allure.startStep("Click on Submit button", true)
            await AITSPage.btnTestSubmit.click()
            allure.startStep("Wait for Yes button to be clickable", true)
            await AITSPage.btnTestYes.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on Yes button", true)
            await AITSPage.btnTestYes.click()

            await browser.closeWindow();
            allure.startStep("Move to AITS tab", true)
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            allure.startStep("Wait for Completed button to be displayed", true)
            await AITSPage.btnCompleted.waitForDisplayed({timeout : 75000})
            allure.startStep("Click on Complete button", true)
            await AITSPage.btnCompleted.click()
            expect(await AITSPage.completedLabelExamName(examName).waitForDisplayed({timeout : 5000})).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("308216 TC_24 Validate AITS(JEE-Advance) Validate View Analysis under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeAdvance.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:15000})
        await AITSPage.labelOfMainpage.click()
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Advanced')
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7500})}
        catch{}
        allure.startStep("Check the test cards is available/Not",true)
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewAnalysis.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewAnalysis.click()
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await AITSPage.labelJeeAdvancedAssess.waitForDisplayed({timeout : 7500})
            expect(await AITSPage.labelJeeAdvancedAssess.isDisplayed()).toEqual(true)
            expect(await browser.getUrl()).toEqual("https://assess-stage.tllms.com/test-analysis")
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    }) 
    it("308217 TC_25 Validate AITS(JEE-Main) Validate View Analysis under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeMain.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeMain.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:65000})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Mains')
        allure.startStep("Check the test cards is available/Not",true)
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewAnalysis.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewAnalysis.click()
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await AITSPage.labelJeeMainAssess.waitForDisplayed({timeout : 7500})
            expect(await AITSPage.labelJeeMainAssess.isDisplayed()).toEqual(true)
            expect(await browser.getUrl()).toEqual("https://assess-stage.tllms.com/test-analysis")
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    })
    it("308218 TC_26 Validate AITS(NEET) Validate View Analysis under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS NEET Page menu",true)
        await AITSPage.btnNeet.waitForClickable({timeout:45000 })
        await AITSPage.btnNeet.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:7500})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - NEET')
        allure.startStep("Check the test cards is available/Not",true)
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewAnalysis.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewAnalysis.click()
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await AITSPage.labelNEETAssess.waitForDisplayed({timeout : 7500})
            expect(await AITSPage.labelNEETAssess.isDisplayed()).toEqual(true)
            expect(await browser.getUrl()).toEqual("https://assess-stage.tllms.com/test-analysis")
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("308219 TC_27 Validate AITS(JEE-Advance) Validate View Syllabus under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeAdvance.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeAdvance.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:15000})
        await AITSPage.labelOfMainpage.click()
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Advanced')
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7500})}
        catch{}
        allure.startStep("Check the test cards is available/Not",true)
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewSyllabus.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewSyllabus.click()
            try{await AITSPage.popupViewSyllabus.waitForDisplayed({timeout : 3500})}
            catch{}
            expect(await AITSPage.popupViewSyllabus.isDisplayed()).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    }) 
    it("308220 TC_28 Validate AITS(JEE-Main) Validate View Syllabus under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
        await AITSPage.btnJeeMain.waitForClickable({timeout:15000 })
        await AITSPage.btnJeeMain.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:65000})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Mains')
        allure.startStep("Check the test cards is available/Not",true)
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewSyllabus.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewSyllabus.click()
            try{await AITSPage.popupViewSyllabus.waitForDisplayed({timeout : 3500})}
            catch{}
            expect(await AITSPage.popupViewSyllabus.isDisplayed()).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()

    })
    it("308221 TC_29 Validate AITS(NEET) Validate View Syllabus under Completed tab", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
        allure.startStep("Navigate to AITS Module on menu bar",true)
        await AITSPage.navigateToAITSModule()
        allure.startStep("Navigate to AITS NEET Page menu",true)
        await AITSPage.btnNeet.waitForClickable({timeout:45000 })
        await AITSPage.btnNeet.click()
        allure.startStep("Check the titel of the main page",true)
        await AITSPage.labelOfMainpage.waitForDisplayed({timeout:7500})
        expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - NEET')
        allure.startStep("Check the test cards is available/Not",true)
        await AITSPage.btnCompleted.waitForDisplayed({timeout : 35000})
        await AITSPage.btnCompleted.click()
        try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
        catch{}
        if (await AITSPage.labelOfTestCard.isDisplayed()){
            await AITSPage.btnViewSyllabus.waitForDisplayed({timeout : 3500})
            await AITSPage.btnViewSyllabus.click()
            try{await AITSPage.popupViewSyllabus.waitForDisplayed({timeout : 3500})}
            catch{}
            expect(await AITSPage.popupViewSyllabus.isDisplayed()).toEqual(true)
        }
        else{
            await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await AITSPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })
})