import { AllureUtil as allure } from "../../../utils/util.allure"
import ProfilePage from "../../../Pages/ProfilePage";
import ConceptVideoPage from '../../../Pages/ConceptVideoPage'
import AskADoubtPage from '../../../Pages/AskADoubtPage'
import LoginPage from "../../../Pages/LoginPage";
import MonthlyTestPage from "../../../Pages/MonthlyTestPage";
import { monthlyExamData } from "../../../Data/MonthlyExamData";
import { baseUrl } from "../../../Config/Config"
import MonthlytestPage from "../../../Pages/MonthlyTestPage";
import { loginData } from "../../../Data/LoginData";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()
describe("Learn Portal - Monthly Test module test cases for Premium user",async () => {
    

    it("310659 TC_01 Validate Monthly Exam in left navigation sandwich bar", async () => {
        await LoginPage.loginToLearnPortal('premium')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Wait for Menu option to be clickable", true)
        await MonthlyTestPage.menuOption.waitForClickable({timeout:15000})
        allure.startStep("Click on Menu option", true)
        await MonthlyTestPage.menuOption.click()
        allure.startStep("Wait for Monthly Test button to be displayed", true)
        await MonthlyTestPage.btnMonthlyExam.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate Monthly Test button in Menu Options", true)
        expect(await MonthlyTestPage.btnMonthlyExam.isDisplayed()).toEqual(true)
        allure.startStep("Click on Monthly Test button in Menu Options", true)
        await MonthlyTestPage.btnMonthlyExam.click()
        allure.startStep("Validate the URL for Monthly Test page", true)
        expect(await browser.getUrl()).toContain("monthly-exam")
        allure.startStep("Validate the heading of Monthly Test page", true)
        expect(await MonthlyTestPage.labelOfMainpage.getText()).toEqual('Monthly Exam')
    })

    it("310660 TC_02 Validate monthly exam is not available except for 4th to 10th Premium user", async () => {
        let user = ["free","neo"]
        for(let i=0;i<user.length;i++){
            allure.startStep(`Login to learn portal with ${user[i]} user`, true)
            await LoginPage.loginToLearnPortal(user[i])
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],user[i])
            allure.startStep("Wait for Menu option to be clickable", true)
            await MonthlyTestPage.menuOption.waitForClickable({timeout:15000})
            allure.startStep("Click on Menu option", true)
            await MonthlyTestPage.menuOption.click()
            allure.startStep("Wait for Monthly Test button to be displayed", true)
            try{
                await MonthlyTestPage.btnMonthlyExam.waitForDisplayed({timeout : 3000})
            }catch{}
            allure.startStep("Validate Monthly Test button in Menu Options", true)
            expect(await MonthlyTestPage.btnMonthlyExam.isDisplayed()).toEqual(false)
            await browser.reloadSession()
        }
    })

    it('310665 TC_03 Validate "Upcoming, completed and skipped" CTA', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
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
            expect(await MonthlyTestPage.labelResultAvaialble.isExisting()).toEqual(true)
        }else{
            await MonthlyTestPage.labelNoTest.waitForDisplayed({timeout:3000})
            expect(await MonthlyTestPage.labelNoTest.isExisting()).toEqual(true)
            expect(await MonthlyTestPage.labelSubHeadingCompletedTest.isExisting()).toEqual(true)
        }

        allure.startStep("click on skipped tab", true)
        await MonthlyTestPage.btnSkippedTab.click()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        allure.startStep("Validate skipped Tab Parameters",true)
        if(await MonthlyTestPage.papaerTag.isDisplayed() == true){
            expect(await MonthlyTestPage.labelSkipValidDateAndTime.isExisting()).toEqual(true)
        }
        allure.endStep();
    });

    it("310666 TC_04 Validate concept video banner", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Wait for Concept Video button to be displayed", true)
        await MonthlyTestPage.btnConceptVideo.waitForDisplayed({timeout : 3500})
        allure.startStep("Click on Concept Video button", true)
        await MonthlyTestPage.btnConceptVideo.click()
        allure.startStep("Validate the URL for Concept Videos page", true)
        expect(await browser.getUrl()).toContain("concept-videos")
        allure.startStep("Validate the heading of Concept Videos page", true)
        expect(await MonthlyTestPage.labelOfMainpage.getText()).toEqual('Concept Videos')

    })

    it("310667 TC_05 Validate Ask a doubt banner", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Wait for Ask a Doubt button",true)
        await MonthlyTestPage.btnAskADoubt.waitForClickable({timeout:65000})
        allure.startStep("Click on Ask a Doubt button",true)
        await MonthlyTestPage.btnAskADoubt.click()
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

    it("310668 TC_06 Validate Bookmark banner", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Wait for Ask a Doubt button",true)
        await MonthlyTestPage.btnBookMark.waitForClickable({timeout:65000})
        allure.startStep("Click on Ask a Doubt button",true)
        await MonthlyTestPage.btnBookMark.click()
        allure.startStep("Validate the URL for Bookmark page", true)
        expect(await browser.getUrl()).toContain("all-bookmarks")
        await MonthlyTestPage.labelOfBookmarkpage.waitForDisplayed({timeout : 3500})
        allure.startStep("Validate the heading of Bookmark page", true)
        expect(await MonthlyTestPage.labelOfBookmarkpage.getText()).toEqual('Subject Bookmarks')
        allure.endStep()
    })

    it("310669 TC_07 Validate exam name, exam date-time, number of questions, time duration of exam and no, of attempts", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[6],'premium')
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
            allure.startStep("Validate No Test Available Block",true)
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
    })

    it("310670 TC_08 Validate coming soon message for upcoming tests", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:15000})}
        catch{}
        if (await MonthlyTestPage.labelOfTestCard.isDisplayed() == false){
            allure.startStep("Wait for Comming Soon message to be visible",true)
            await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate Comming Soon message is dispalyed",true)
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
    })

    it('310672 TC_09 Validate Start exam CTA',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
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
        expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true) 
    }
        allure.endStep();
    });

    it("310675 TC_10 Validate the user have submitted the exam", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[4],'premium')
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
            allure.startStep("Click on Proceed button", true)
            await MonthlyTestPage.btnTestProceed.click()
            allure.startStep("Wait for Submit button to be clickable", true)
            await MonthlyTestPage.btnTestSubmit.waitForDisplayed({timeout : 4500})
            
            allure.startStep("Click on Submit button", true)
            await MonthlyTestPage.btnTestSubmit.click()
            allure.startStep("Wait for Yes button to be clickable", true)
            await MonthlyTestPage.btnTestYes.waitForDisplayed({timeout : 4500})
            allure.startStep("Click on Yes button", true)
            await MonthlyTestPage.btnTestYes.click()

            await browser.closeWindow();
            allure.startStep("Move to AITS tab", true)
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            allure.startStep("Wait for Completed button to be displayed", true)
            await MonthlyTestPage.btnCompleted.waitForDisplayed({timeout : 75000})
            allure.startStep("Click on Complete button", true)
            await MonthlyTestPage.btnCompleted.click()
            expect(await MonthlyTestPage.completedLabelExamName(examName).waitForDisplayed({timeout : 5000})).toEqual(true)
        }
        else{
            await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            allure.startStep("Validate No Test Available Block",true)
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
        
        
    })

    it("310674 TC_11 Validate the user not submitted the exam & clicks on Resume Exam CTA", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[5],'premium')
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
            allure.startStep("Validate No Test Available Block",true)
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
        }
        allure.endStep()
        
    })

    it ('310677 TC_12 Valdidate exam availabilty for cohorts',async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn portal",true)
        let cohortDetails=[]
        let phoneNumber=loginData.premiumUser.validPhoneNumber
        let validOTP=loginData.premiumUser.validotp
        
        await LoginPage.openByjusLearnPage()
        await LoginPage.enterPhoneNumber(phoneNumber)      
        await LoginPage.clickOnNext()
        await LoginPage.enterOtp(validOTP)

        try {await LoginPage.cbPaidUserSelection.waitForDisplayed({timeout : 7000})} catch (error) {}
        let cbPaiduserDisplayed = await LoginPage.cbPaidUserSelection.isDisplayed({ timeout: 15000 })
        if (cbPaiduserDisplayed) {
          await LoginPage.cbPaidUserSelection.waitForDisplayed({timeout : 3000})
          await LoginPage.cbPaidUserSelection.waitForClickable({timeout : 3000})
          await LoginPage.cbPaidUserSelection.click()
          let cohortCount=(await $$("//*[@class='prof-card-sel card-checked card']//div/span")).length
          
          for(let i=1;i<=cohortCount;i++){
              let cohorts=(await $(`(//*[@class='prof-card-sel card-checked card']//div/span)[${i}]`).getText())
              cohorts=cohorts.replace(",","")
              cohortDetails.push(cohorts)

          }
          await LoginPage.btnLogIn.waitForDisplayed({ timeout: 10000 })
          await LoginPage.btnLogIn.waitForClickable({ timeout: 3000 })
          await LoginPage.btnLogIn.click()
          try{
            await LoginPage.labelLoginLimitExceeded.waitForDisplayed({timeout : 4500})
            if (LoginPage.labelLoginLimitExceeded.isDisplayed()){
              await LoginPage.btnContinue.click()
            }
          }
          catch{}

        }
        try{
            await LoginPage.multipleSessionActiveMsg.waitForDisplayed({ timeout: 5000 })
          }
          catch{
          }
          let activeSessionMsg = await LoginPage.multipleSessionActiveMsg.isDisplayed()
          if(activeSessionMsg)
          {
            await LoginPage.btnContinue.waitForClickable({timeout : 7500})
            await LoginPage.btnContinue.click()
          }
          try{
            await ProfilePage.btnskipTour.waitForDisplayed({ timeout: 7500 })
          }
          catch{
          }
          let skipTourDisplayed = await ProfilePage.btnskipTour.isDisplayed({ timeout: 7500 })
          if (skipTourDisplayed) {
            await ProfilePage.btnskipTour.waitForClickable({ timeout: 9000 })
            await ProfilePage.btnskipTour.click()
         }
          let bookTrailWindowDisplayed = await ProfilePage.bookTrailWindow.isDisplayed({ timeout: 5000 })
          if (bookTrailWindowDisplayed) {
            await ProfilePage.bookTrailWindow.waitForDisplayed({ timeout: 5000 })
            await browser.refresh();
            try{await ProfilePage.ddProfile.waitForClickable({timeout:3000})}
            catch{}
          }
          allure.startStep(" Valdidate exam availabilty for cohorts",true)
        for(let i=0;i<cohortDetails.length;i++){
            await ProfilePage.changeCohortDetail(cohortDetails[i],'premium')
            await MonthlyTestPage.menuOption.waitForClickable({timeout:15000})
            await MonthlyTestPage.menuOption.click()

            expect(await MonthlyTestPage.btnMonthlyExam.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    });

    it('310680 TC_13 Validate monthly exams page when exam is not available',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Validate monthly exams page when exam is not available",true)
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        if (await MonthlyTestPage.labelOfTestCard.isDisplayed() == false){
            expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
            expect(await MonthlyTestPage.subHeadingComeBackLater.isDisplayed()).toEqual(true)
        }
        
    });
    
    it('310684 TC_14 Validate Skipped Test',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[2],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("click on skipped tab", true)
        await MonthlyTestPage.btnSkippedTab.waitForDisplayed({timeout:8000})
        await MonthlyTestPage.btnSkippedTab.click()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
        if (skippedTabTestCards) {
            let arr = []
            let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
            arr = expiredDate.split(" ")
            let convertedDate = await MonthlytestPage.GetMonthNumber(arr[5])
            let monthDate = currentMonth.toString()
            allure.startStep("Verify expired month date in skipped tab", true)
            expect(convertedDate <= monthDate)
            allure.startStep("Verify expired year date skipped tab", true)
            expect(currentYear <= arr[6])
        }
        else{
            expect(await MonthlyTestPage.headingInSkippedTest.isDisplayed()).toEqual(true)
            expect(await MonthlyTestPage.subHeadingSkippedTest.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    });

    it("310687 TC_15 Validate Detailed Analysis CTA ", async () => {
        let testCompletedStatus
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(monthlyExamData.cohortDetails[6],'premium')
        allure.startStep("Check the Monthly Test Module in the menu bar", true)
        await MonthlyTestPage.navigateToMonthlyTestModule()
        allure.startStep("Wait for Completed tab to be displayed", true)
        await MonthlyTestPage.btnCompleted.waitForDisplayed({timeout:10000})
        allure.startStep("Click on Completed tab", true)
        await MonthlyTestPage.btnCompleted.click()
        try{await MonthlyTestPage.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        if (await MonthlyTestPage.labelOfTestCard.isDisplayed()){
            await MonthlyTestPage.btnCompleted.click()
            allure.startStep("Wait for Detailed Analysis Button to be displayed", true)
            await MonthlyTestPage.btnDetailedAnalysis.waitForDisplayed({timeout:4500})
            allure.startStep("Click on Detailed Analysis Button", true)
            await MonthlyTestPage.btnDetailedAnalysis.click()
            allure.startStep("Move to new tab", true)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            allure.startStep("Validate Test Analysis window", true)
            expect(await browser.getUrl()).toContain("test-analysis")
        }
        else if(await MonthlyTestPage.labelNoTestAvailable.isDisplayed({timeout : 3500})){
            await MonthlyTestPage.btnUpcoming.click()
            testCompletedStatus = await MonthlyTestPage.completeTest()
            if (testCompletedStatus){
                await MonthlyTestPage.btnCompleted.click()
                allure.startStep("Wait for Detailed Analysis Button to be displayed", true)
                await MonthlyTestPage.btnDetailedAnalysis.waitForDisplayed({timeout:4500})
                allure.startStep("Click on Detailed Analysis Button", true)
                await MonthlyTestPage.btnDetailedAnalysis.click()
                allure.startStep("Move to new tab", true)
                const handles = await browser.getWindowHandles()
                await browser.switchToWindow(handles[1])
                allure.startStep("Validate Test Analysis window", true)
                expect(await browser.getUrl()).toContain("test-analysis")
            }
            else{
                await MonthlyTestPage.btnCompleted.click()
                await MonthlyTestPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
                allure.startStep("Validate No Test Available Block",true)
                expect(await MonthlyTestPage.labelNoTestAvailable.isDisplayed()).toEqual(true)
            }
        }
    })
    allure.endStep()

   
})
