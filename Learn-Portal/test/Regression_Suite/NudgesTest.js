import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import NudgesPage from "../../Pages/NudgesPage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage"
import ChapterWiseTestPage from "../../Pages/ChapterWiseTestsPage"
import APQPage from "../../Pages/AdaptivePracticeQuestionsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import AllSubjectPage from "../../Pages/AllSubjectsPage"

describe.skip('Learn Portal - Nudges module cases for Neo user - after class start 0-15 min', () => {
    it('334930 TC_03 Verify the "Join class now " cta functionality',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        await NudgesPage.btnNudges.waitForClickable({timeout:3000})
        await NudgesPage.btnNudges.click()
        allure.startStep("Validate Join class now functionality")
        await NudgesPage.btnJoinClassNow.waitForDisplayed({timeout:5000})
        expect(await NudgesPage.btnJoinClassNow.isDisplayed()).toEqual(true)
        allure.endStep()
    });
})
describe.skip('Learn Portal - Nudges module cases for Neo user - after class start', () => {
    it('334938 TC_10 Verify the nudge for Class has just started or class in progress',async () => {
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        await NudgesPage.btnNudges.click()
        allure.startStep("Verify the nudge for Class has just started")
        await NudgesPage.labelClassStarted.waitForDisplayed({timeout:4000})
        expect(await NudgesPage.labelClassStarted.isDisplayed()).toEqual(true)
        allure.endStep()
    })
})
describe.skip('Learn Portal - Nudges module cases for Neo user - 30-15 min', () => {

    // afterEach("Reload new broswer session", async () => {
    //     await browser.reloadSession()
    // })

    it('334716 TC_01 Verify the nudges is applicable only for neo paid users',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        await browser.pause(3000)
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.endStep()
        
    });
    
    it('334717 TC_02 Verify the nudges will applicable only for 4th to 10th grade where user can book byjus classes',async () => {
        allure.startStep("Change cohort to 2nd", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][1], 'neo')
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(false)
        allure.startStep("Change cohort to JEE (11th)", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][8], 'neo')
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(false)
    });

    
    it('334726 TC_04 Verify the Elements present on nudge window',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("Validate Elements present on nudge window")
        let studentName=await NudgesPage.AccountUserName.getText()
        let subjectAndcohortdetails=await NudgesPage.subjectNameAndGradeOnCard.getText()
        expect(await NudgesPage.dateAndTimeOnCard.isDisplayed()).toEqual(true)
        await NudgesPage.btnNudges.waitForClickable({timeout:3000})
        await NudgesPage.btnNudges.click()
        await NudgesPage.userNameOnNudgeWindow.waitForDisplayed({timeout:5000})
        let studentNameValidation=(await NudgesPage.userNameOnNudgeWindow.getText()).includes("Hey "+studentName)
        expect(studentNameValidation).toEqual(true)
        let subjectAndcohortdetailsValidation=await (await NudgesPage.subjectNameAndGradeOnNudgeWindow.getText()).includes(subjectAndcohortdetails)
        expect(subjectAndcohortdetailsValidation).toEqual(true)    
        allure.endStep()  
                
    });

    it('334931 TC_05 Verify 15 min before the class start CTA functionality',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        await NudgesPage.btnNudges.click()
        allure.startStep("Verify 15 min before the class start CTA functionality")
        expect(await NudgesPage.btnRemindMe.isDisplayed({timeout:5000})).toEqual(true)
        await NudgesPage.btnRemindMe.click()
        await NudgesPage.btnNudges.waitForDisplayed({timeout:3000})
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnPrepareForClass.waitForDisplayed({timeout:3000})
        expect(await NudgesPage.btnPrepareForClass.isDisplayed()).toEqual(true)      
        allure.endStep()
    })
    it('334727 TC_06 Verify the nudge window functionality',async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("click on nudge window to open")
        await NudgesPage.btnNudges.click()
        allure.startStep("Verify the nudge window functionality")
        expect(await NudgesPage.userNameOnNudgeWindow.isDisplayed()).toEqual(true)
        allure.startStep("click on nudge window to close")
        await NudgesPage.btnNudges.click()
        expect(await NudgesPage.userNameOnNudgeWindow.isDisplayed()).toEqual(false)
        allure.endStep()
    });

    it('334926 TC_07 Verify Remind me CTA functionality before 20mins class start.',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("click on nudge window to open")
        await NudgesPage.btnNudges.click()
        allure.startStep("Verify Remind me CTA functionality before 20mins")
        expect(await NudgesPage.btnRemindMe.isDisplayed({timeout:5000})).toEqual(true)
        allure.endStep()
    });

    it('334944 TC_08 Verify the nudge functionality when user is taking test and watching video',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("Validate nudge button is present")
        expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(true)
        // await ChapterWiseTestPage.navigateToCWTAndPageLoad()
        // expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(true)
        // if (await ChapterWiseTestPage.retakeTest(1).isDisplayed({timeout:3500}) == false){
        //     allure.startStep("Click on First subject card", true)
        //     await ChapterWiseTestPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        //     await ChapterWiseTestPage.btnSubjectCard.click()
        //     allure.startStep("Click on First first drop down of test", true)
        //     await ChapterWiseTestPage.ddTestOne.waitForClickable({ timeout: 25000 })
        //     await ChapterWiseTestPage.ddTestOne.click()
        //     await ChapterWiseTestPage.btnTakeATest.click()
        //     await ChapterWiseTestPage.btnStartTest.waitForClickable({ timeout: 25000 })
        //     await ChapterWiseTestPage.btnStartTest.click()
        // }
        // else{
        //     allure.startStep("Click on Retake", true)
        //     await ChapterWiseTestPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        //     await ChapterWiseTestPage.retakeTest(1).moveTo()
        //     await ChapterWiseTestPage.retakeTest(1).click()
        //     allure.startStep("Click on start a test", true)
        //     await ChapterWiseTestPage.btnStartTest.waitForClickable({ timeout: 25000 })
        //     await ChapterWiseTestPage.btnStartTest.click()
        // }
        // await browser.pause(2000)
        // allure.startStep("Verify Nudge is not displayed while test")
        // expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(false)
        // allure.startStep("Exit the test", true)
        // await ChapterWiseTestPage.btnExitTest.waitForDisplayed({ timeout: 35000 })
        // await ChapterWiseTestPage.btnExitTest.click()
        // allure.startStep("Click on end test", true)
        // await ChapterWiseTestPage.btnEndTestInExitAssessmentPopup.waitForDisplayed({ timeout: 35000 })
        // await ChapterWiseTestPage.btnEndTestInExitAssessmentPopup.click()

        // await APQPage.navigateToAPQAndPageLoad()
        // await browser.pause(2000)
        // expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(true)
        // await APQPage.moveToNextTestCard()
        // expect(await APQPage.btnStartPractice.waitForClickable({ timeout: 5000 }))
        // await APQPage.btnStartPractice.click()
        // expect(await APQPage.btnStartTest.waitForClickable({ timeout: 5000 }))
        // await APQPage.btnStartTest.click()
        // await browser.pause(2000)
        // allure.startStep("Verify Nudge is not displayed while test")
        // expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(false)
        // await APQPage.btnEndPractice.click()
        // await APQPage.btnEndPracticeInEndPracticePopup.waitForDisplayed({timeout:3000})
        // await APQPage.btnEndPracticeInEndPracticePopup.click()

        await ConceptVideoPage.navigateToConceptVideo()
        expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForDisplayed({timeout:5000})
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        allure.startStep("Verify Nudge is not displayed while video is playing")
        expect(await NudgesPage.btnNudges.isDisplayed({timeout:5000})).toEqual(false)
        allure.endStep()
    });

    it('334725 TC_09 Verify the nudge- 1 for 30 mins before the class(popup window basis the time to the next scheduled class)',async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("click on nudge window to open")
        await NudgesPage.btnNudges.click()
        allure.startStep("Verify the nudge- 1 for 30 mins before the class")
        expect(await NudgesPage.btnRemindMe.isDisplayed({timeout:5000})).toEqual(true)
        expect(await NudgesPage.btnRemindMe.getText()).toEqual("Remind me 15 min before class")
        allure.endStep()
    });

    it('334722 TC_11 Verify the floating button will be available on all the pages within the given timelines for the classes to join ',async () => {
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to Byjus class page and validate Nudge is present")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to APQ page and validate Nudge is present")
        await APQPage.navigateToAPQAndPageLoad()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to CWT page and validate Nudge is present")
        await ChapterWiseTestPage.navigateToCWTAndPageLoad()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to Ask A Doubt page and validate Nudge is present")
        await AskADoubtPage.navigateToAskADoubt()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to Download page and validate Nudge is present")
        await DownloadsPage.navigateToDownloadsAndPageLoad()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to Concept video page and validate Nudge is present")
        await ConceptVideoPage.navigateToConceptVideo()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to Bookmark page and validate Nudge is present")
        await BookMarksPage.navigateToBookMarksPage()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Navigate to All subject page and validate Nudge is present")
        await AllSubjectPage.navigateToAllSubjects()
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.endStep()
    });

    it('334723 TC_12 Verify the functionality of floating button',async () => {
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        allure.startStep("Verify the functionality of floating button")
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.endStep()
    })

    it('334724 TC_13 Verify the Regular class nudge for paid user not the masterclasses',async () => {
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'neo')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.startStep("Verify for Masterclass nudge functionality is not available")
        let subjectAndcohortdetails=await NudgesPage.subjectNameAndGradeOnCard.getText()
        let flag = subjectAndcohortdetails.includes("Masterclass")
        expect(flag).toEqual(false)
        await NudgesPage.btnNudges.click()
        let subjectName = await NudgesPage.subjectNameOnNudgeWindow.getText()
        let flagForNudgeWindow=subjectName.includes("Masterclass")
        expect(flagForNudgeWindow).toEqual(false)
        allure.endStep()
    });

    it.skip('334719 TC_14 Verify the nuges feature is also applicable for MLP and 2k users',async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'MLP')
         await NudgesPage.preVerificationOfNudgeWindow()
        allure.startStep("Validate nudges is present or not")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(true)
        allure.endStep()
    });

    it('334720 TC_15 Verify nuges feature not applicable for BTC paid and free users',async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][6], 'free')
        allure.startStep("Validate nudges is not present for the free user")
        try{await NudgesPage.btnNudges.waitForDisplayed({timeout:5000})}
        catch{}
        expect(await NudgesPage.btnNudges.isDisplayed()).toEqual(false)
        allure.endStep()
    });
}); 
