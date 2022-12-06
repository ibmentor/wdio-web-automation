import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import { adaptivePracticeQuestionData } from "../../Data/AdaptivePracticeQuestionData"
import DashboardPage from "../../Pages/DashboardPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import TouchPointPage from "../../Pages/TouchPointPage";
import { touchPointData} from "../../Data/TouchPointData";
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]

describe("Learn Portal - Adaptive Practice Question test - Free user flow", async () => {

    it("315653 TC_03 Free user- Validate the book marked question is getting displayed under book mark tab", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Validate the book marked question is getting displayed under book mark tab",true)
        await AdaptivePracticeQuestionsPage.bookMarkFlow()        
        allure.endStep();
    })

    it("315654 TC_04 Free user- Validate View solution pop up of bookmarked questions", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(4000)
        allure.startStep("Validate View solution pop up of bookmarked questions",true)  
        await AdaptivePracticeQuestionsPage.bookMarkFlowViewSolutionPopUp()         
        await AdaptivePracticeQuestionsPage.viewSolutionPopupValidation()        
        allure.endStep();
    })

    it("315657 TC_07 Validate resume test - end practice flow", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("End Practice flow validation",true)
        await AdaptivePracticeQuestionsPage.resumeTestEndPracticeFlow()      
        allure.endStep();
    })

    it("315658 TC_08 Free user - Analysis page- validation of analysis the section header", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Validate Performance Statistics section Heading",true)
        expect(await $("(//*[@class='performance-stats g-0 row']//p)[1]").getText()).toEqual("Performance Statistics")
        allure.startStep("Validate Summary section Heading",true)
        expect(await $("//*[@class='heading summary-heading']").getText()).toEqual("Summary")
        allure.startStep("Validate Accuracy section Heading",true)
        expect(await $("(//*[@class='graph-heading'])[1]").getText()).toEqual("Accuracy")
        allure.startStep("Validate Time Spent section Heading",true)
        expect(await $("(//*[@class='graph-heading'])[2]").getText()).toEqual("Time Spent")
        allure.startStep("Validate Remarks section Heading",true)
        expect(await $("((//*[@class='remarks'])//p)[1]").getText()).toEqual("Remarks")
        allure.startStep("Validate Watch Concepts related section Heading",true)
        expect(await $("//*[@class='dashboard_dashboardTitle__1a6N_']").getText()).toHaveTextContaining("Watch Concepts related to")
        allure.startStep("Validate Bookmarked Questions section Heading",true)
        if(await $("(//*[@class='swiper-title'])[1]").isDisplayed() == true){
        expect(await $("(//*[@class='swiper-title'])[1]").getText()).toHaveTextContaining("Bookmarked Questions")
        }
        allure.startStep("Validate Important Questions section Heading",true)
        expect(await $("//*[@class='swiper-title pe-2']").getText()).toHaveTextContaining("Important Questions")
        allure.endStep();
    })

    it("315659 TC_09 Free user - Perfomance statistics section validation", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ module", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Perfomance statistics percentage validation",true)
        expect(await $("//*[@class='percentage']").getText()).toHaveTextContaining("%")
        allure.startStep("Performance Statistics Helper text validation",true)
        expect(await $("//*[@class='performance-hepler-text']").getText()).toHaveTextContaining(adaptivePracticeQuestionData.performance_Statistics)
        allure.endStep();
    })

    it("315660 TC_10 Free user - Analysis- Validate No of questions gets increase after taking the test each time ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Retrieve the initial value of Question attempted",true)
        let initialValue = await $("(//*[@class='count'])[4]").getText()
        allure.startStep("Resume the test again",true)
        await DashboardPage.menuOption.click()
        await DashboardPage.btnAdaptivePracticeQuestions.click()
        await AdaptivePracticeQuestionsPage.resumeButton.click()
        await browser.pause(3000)
        await AdaptivePracticeQuestionsPage.questionsHandling()        
        allure.startStep("Retrieve the final value of Question attempted",true)
        let finalValue = await $("(//*[@class='count'])[4]").getText()
        initialValue = parseInt(initialValue.trim())
        finalValue = parseInt(finalValue.trim())
        let flag
        if(initialValue <  finalValue)
        { flag = true  
        }        
        else 
        { flag = false }
        
        expect(flag).toEqual(true)
        allure.endStep();
    })

    it("315661 TC_11 Free user - Analysis - Accuracy Chart toottip validation ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ page", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        await AdaptivePracticeQuestionsPage.accuracyChart.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.accuracyChart.scrollIntoView()       
        await AdaptivePracticeQuestionsPage.toolTipValidation('Accuracy',2,'hidden')
        await AdaptivePracticeQuestionsPage.accuracyChart.click()
        await AdaptivePracticeQuestionsPage.toolTipValidation('Accuracy',3,'visible')
        allure.endStep();
           

    })

    it("315662 TC_12 Free user - Analysis - Time Spent Chart toottip validation ", async () => {
        
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ page", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnAnalyse.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        await AdaptivePracticeQuestionsPage.timeSpentChart.waitForClickable({ timeout: 25000 })
        await AdaptivePracticeQuestionsPage.timeSpentChart.scrollIntoView() 
        await browser.pause(2000)      
        await AdaptivePracticeQuestionsPage.toolTipValidation('Time Spent',3,'hidden')
        await AdaptivePracticeQuestionsPage.timeSpentChart.click()
        await AdaptivePracticeQuestionsPage.toolTipValidation('Time Spent',4,'visible')
        allure.endStep();     

    })

    it('330134 TC_13 Validate subject Filter in Recently practice Tab',async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ page", true)
        let subjectName="Mathematics"
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.singleTestFlow() 
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.click()
        await browser.keys(subjectName)
        await browser.keys("Tab")
        await browser.pause(2000)
        let cardCount= (await $$('(//div[@class="chapter-subj"]//div[@class="d-flex"]//p[1])')).length
        for(let i=1;i<=cardCount;i++){
            if(i%2 == 0){
                i=i+1;
            }
            expect(await AdaptivePracticeQuestionsPage.subjectNameOnCard(i).getText()).toEqual(subjectName)
        }
    });

    it('330135 TC_14 Validate Filter in Bookmark Tab Recent Old',async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ page", true) 
        let subject="Mathematics"
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.bookMarkFlowViewSolutionPopUp()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.tabBookMark.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.tabBookMark.click()
        await AdaptivePracticeQuestionsPage.btnViewAll.waitForDisplayed({timeout:3000})
        await AdaptivePracticeQuestionsPage.btnViewAll.click()
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await AdaptivePracticeQuestionsPage.selectedFilter.getText(),"######");
        await AdaptivePracticeQuestionsPage.selectedFilter.waitForDisplayed({timeout:5000})
        expect(await AdaptivePracticeQuestionsPage.selectedFilter.getText()).toEqual("Recent")
        let recentFirstChapterName=await AdaptivePracticeQuestionsPage.ChapterNameOnFirstCard.getText()
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.btnFilterDropDown.click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.selectedFilter.waitForDisplayed({timeout:5000})
        expect(await AdaptivePracticeQuestionsPage.selectedFilter.getText()).toEqual("Old")
        let oldFirstChapterName=await AdaptivePracticeQuestionsPage.ChapterNameOnFirstCard.getText()
        console.log(oldFirstChapterName,"*******",recentFirstChapterName);
        expect( oldFirstChapterName == recentFirstChapterName).toEqual(false)
    });

    it('330159 TC_15 Filter in bookmark for Subject',async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to APQ page", true) 
        let subject="Mathematics"       
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.bookMarkFlowViewSolutionPopUp()
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.tabBookMark.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.tabBookMark.click()
        await AdaptivePracticeQuestionsPage.btnViewAll.waitForDisplayed({timeout:3000})
        await AdaptivePracticeQuestionsPage.btnViewAll.click()
        await AdaptivePracticeQuestionsPage.ddsubjectFilter.waitForDisplayed({timeout:5000})
        await AdaptivePracticeQuestionsPage.ddsubjectFilter.click()
        await browser.keys(subject)
        await browser.keys("Tab")
        await browser.pause(2000)
        let cardCount= (await $$('(//div[@class="subj-info"]//div[@class="d-flex"]/p[1])')).length 
        for(let i=1;i<=cardCount;i++){
            expect(await AdaptivePracticeQuestionsPage.subjectNameOnCardForSubjectFilter(i).getText()).toEqual(subject)
        }

    });

    it("331754 TC_02 - Paid User - Validate the text 'You have completed the assesment' popup along with the text 'Need help with any question in the assessment?'Connect to our experts", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        allure.startStep("Navigate to APQ Module", true)
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.startAndEndPracticeForTouchPoint()
        expect(await TouchPointPage.btnConnectToTutorAPQ.isDisplayed({timeout:2000})).toEqual(true)
        let labelCompletedAssessment = $("//*[text()='You have completed the assessment']")
        let labelNeedHelp = $("//*[text()='Need help with any question in the assessment?']")
        expect(await labelCompletedAssessment.isDisplayed({timeout:2500})).toEqual(true)
        expect(await labelNeedHelp.isDisplayed({timeout:1000})).toEqual(true)
    }
    else{
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
    it("331756 TC_03 - Paid User - Verify 'Back to Practice' functionality on 'You have completed the assesment' AdaptivePracticeQuestionsPage popup", async () => {
       
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        allure.startStep("Navigate to APQ Module", true)
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.startAndEndPracticeForTouchPoint()
        expect(await TouchPointPage.btnConnectToTutorAPQ.isDisplayed({timeout:2000})).toEqual(true)
        await AdaptivePracticeQuestionsPage.btnBackToPractice.waitForDisplayed({timeout:3500})
        await AdaptivePracticeQuestionsPage.btnBackToPractice.scrollIntoView({ block: "center" })
        await browser.keys(["PageDown","PageDown"])
        await AdaptivePracticeQuestionsPage.btnBackToPractice.click()
        await browser.pause(1000)
        let url = await browser.getUrl()
        expect(url.includes('analysis')).toEqual(true)
    }
    else{
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
    it("331768 TC_04 - Paid User - Verify if click on 'need help ' CTA should navigate to 'questions ' popup", async () => {
        
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail,'neo')
        allure.startStep("Navigate to APQ Module", true)
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()

        expect(await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).waitForClickable({ timeout: 45000 }))
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard(1).click()
        try{await AdaptivePracticeQuestionsPage.resumeButton.waitForDisplayed({timeout:2500})}catch{}
        if (await AdaptivePracticeQuestionsPage.resumeButton.isDisplayed({timeout:3500})){
            await AdaptivePracticeQuestionsPage.resumeButton.click()
        }
        else{
            await AdaptivePracticeQuestionsPage.btnStartPractice.waitForDisplayed({ timeout: 45000 })
            await AdaptivePracticeQuestionsPage.btnStartPractice.click()
            expect(await AdaptivePracticeQuestionsPage.btnStartTest.waitForClickable({ timeout: 5000 }))
            await AdaptivePracticeQuestionsPage.btnStartTest.click()
        }
        let labelQuestion = $("//*[contains(@class,'practice_FIBOption__')]/p")
        await labelQuestion.waitForDisplayed({timeout:3500})
        let questionText = await labelQuestion.getText()
        expect(await AdaptivePracticeQuestionsPage.btnEndPractice.waitForClickable({timeout : 5000})).toEqual(true)
        await AdaptivePracticeQuestionsPage.btnEndPractice.click()
        await $("//button[contains(text(),'End practice')]").waitForDisplayed({timeout:2500})
        await $("//button[contains(text(),'End practice')]").click()
        await TouchPointPage.btnConnectToTutorAPQ.waitForDisplayed({timeout:4500})
        await TouchPointPage.btnConnectToTutorAPQ.click()
        await TouchPointPage.questionSelectorAPQ(1).waitForDisplayed({timeout:3000})
        let questionCount = await $$("//*[@class='questionTitle']/p").length
        for (let i=1;i<=questionCount;i++){
            await TouchPointPage.questionSelectorAPQ(i).waitForDisplayed({timeout:1000})
            let questionTextPopup = await TouchPointPage.questionSelectorAPQ(i).getText()
            if(questionText === questionTextPopup){
                break
            }
            else{
                expect("Question not present in the Need help popup").toEqual()
            }
        }
    }
    else{
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
