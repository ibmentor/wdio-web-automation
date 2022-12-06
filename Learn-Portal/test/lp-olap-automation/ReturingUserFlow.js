import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import MockTestPage from "../../Pages/MockTestPage";
import AITSPage from '../../Pages/AITSPage';
import ByjusClassesPage from '../../Pages/ByjusClassesPage'
import DashboardPage from "../../Pages/DashboardPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import PersonalizationPage from "../../Pages/PersonalizationPage"
import { loginData } from "../../Data/LoginData"
import { conceptVideoData } from "../../Data/ConceptVideoData"
import { aitsData } from "../../Data/AITSData";
import BookMarksPage from "../../Pages/BookMarksPage"
import isEnabled from "webdriverio/build/commands/element/isEnabled"
import SignUpPage from "../../Pages/SignUpPage"
import {signUpData} from "../../Data/SignUpData"

describe("OLAP - Guided Tour flow", async () => {

    it("TC_07 TC_08 Guided tour popup and skip the tour ", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Guided tour pop event triggered - 9200006",true) 
        allure.startStep("Skip guided tour event triggered - 9200007",true)  
        await LoginPage.logout()             
        allure.endStep()

    })

    it("TC_09 TC_10 Validate the skiptour navigation shows 8 steps for cohort 6", async () => {

        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortalAndContinueTour('free')
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 15000 })
        await PersonalizationPage.btnLetsGo.click()
        allure.startStep("Start the tour event triggered - 9200008",true) 
        await PersonalizationPage.labelStep1Heading.waitForDisplayed({ timeout: 1500 })
        for (let i = 1; i <= 8; i++) {
            if (i <= 7) { await PersonalizationPage.btnNext.click()}
            else { await PersonalizationPage.btnFinish.click() }
        }
        allure.startStep("Next guided tour event triggered - 9200009",true) 
        allure.endStep()

    })

  })

  describe("OLAP - Concept video flows", async () => {

    it("TC_01 Land on concept video home page,Click on video to play,Click forward / backward,Pauses/Plays a video in popular vidoes page", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6])      
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Land on concept video home page event triggered - 9110500",true) 
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Click on video to play event triggered - 9110510", true)
        await ConceptVideoPage.videoScreen.moveTo()
        await browser.pause(3000)// waits till bottom pannel gets displayed
        await ConceptVideoPage.videoScreen.click()
        await ConceptVideoPage.btnVideoSkip10Sec.waitForClickable({timeout : 5000})
        await ConceptVideoPage.btnVideoRewind10Sec.waitForClickable({timeout : 5000})        
        allure.startStep("Click forward / backward skip by 10 seconds event triggered - 9200040", true)
        await ConceptVideoPage.btnMuteUnmute.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnMuteUnmute.click()
        allure.startStep("Click mute or unmute event triggered - 9110508", true)
        allure.endStep()    
    })

    it("TC_02 Click to download PDF,bookmark reading material", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')      
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnFullScreen.scrollIntoView()
        await browser.pause(1000)
        if(await ConceptVideoPage.btnBookmark.isDisplayed())
        {
            await ConceptVideoPage.btnBookmark.click()
        }
        else
        {
            await ConceptVideoPage.btnUnCheckBookmark.click()
        }
        allure.startStep("Click bookmark reading material event triggered - 9200041")
        await ConceptVideoPage.btnDownloadfile.click()
        allure.startStep("Click to download PDF event triggered - 9200156")
        await browser.refresh()
        allure.endStep()         

    })

    it("TC_03 Click to bookmark question,click to view solution", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')      
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnFullScreen.scrollIntoView()
        await ConceptVideoPage.btnRightNavigationIMPQues.scrollIntoView()
        if(await ConceptVideoPage.btnUncheckBookmarkIMPQues.isDisplayed())
        {
            await ConceptVideoPage.btnUncheckBookmarkIMPQues.click()
        }
        else
        {
            await ConceptVideoPage.btnBookmarkIMPQues.click()
        }
        allure.startStep("Click to bookmark question event triggered - 9200154",true)
        await ConceptVideoPage.btnViewSolution.click()
        allure.startStep("Verify book mark button event triggered - 9200155", true)
        allure.endStep() 
           
    })

    it("TC_04 click on a subject in browse options,Click on video to play,click on view concepts,Choose another subject", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')      
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.labelSubjectName.waitForClickable({timeout : 5000})
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("Click on a subject in browse options event triggered - 9200037",true)
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({timeout : 5000})
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()
        allure.startStep("Click on view concepts event triggered - 9200152",true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({timeout : 5000})
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Click on video to play inside subject page event triggered - 9200150",true)
        await ConceptVideoPage.btnCloseWatchWallPopup.waitForClickable({timeout : 1500})
        await ConceptVideoPage.btnCloseWatchWallPopup.click()
        await ConceptVideoPage.labelSubjectName.waitForClickable({timeout : 5000})
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("click on a subject in browse options (select sub from main page-> click on a particular video) event triggered - 9200151",true)
        allure.endStep() 
    })

    it("TC_05 Click on a a video and select subject,click on share button and click on share options", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')      
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.click()      
        await ConceptVideoPage.labelSubjectName.waitForClickable({timeout : 5000})
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("Click on a subject in browse options after selecting a video event triggered - 9200157",true)
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({timeout : 5000})
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()        
        await ConceptVideoPage.btnShareOnMainPage.click()
        allure.startStep("Click on share button event triggered - 9200038",true)        
        await ConceptVideoPage.shareAppModelWindow.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.shareAppModelWindow.isDisplayed()).toEqual(true)
        allure.startStep("Verify application opens all the social media handles and able to navigate to the url", true)

        for (let i = 0; i <= 4; i++) {
            const btnTwitter = await $("//*[@alt='" + conceptVideoData.socialMediaHandles.handleId[i] + "']").click()
            const handles = await browser.getWindowHandles();
            expect(await browser.switchWindow(conceptVideoData.socialMediaHandles.handleUrl[i]))
            allure.startStep("Click on Share options event triggered - 92000153",true) 
            await browser.closeWindow();
            allure.startStep("Switch to window handles[0]", true);
            await browser.switchToWindow(handles[0]);
        }
        allure.endStep();
    })
})

    describe("OLAP - AITS flow", async () => {

  
        it("TC_01 Landed on AITS main page, Click on JEE mains, click on start test,start test popup", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            await AITSPage.navigateToAITSModule()
            await AITSPage.btnJeeMain.waitForClickable({timeout:35000 })
            await AITSPage.btnJeeMain.click()
            allure.startStep("click on aits on the burger menu event triggerd - 9200042",true) 
            allure.startStep("land on aits home page event triggerd - 9200043",true) 
            await AITSPage.btnStartTest.waitForClickable({timeout:25000 })
            await AITSPage.btnStartTest.click()
            allure.startStep("click on start test event triggered - 9200044",true) 
            await AITSPage.btnStartTestInstructionpopup.waitForClickable({timeout:15000 })
            await AITSPage.btnStartTestInstructionpopup.click()
            allure.startStep("View instructions event triggered - 9200045",true) 
            allure.startStep("start test from instructions popup event triggerd  - 9200046",true) 
            allure.endStep()    
        })
        it("TC_02 Landed on AITS main page, Click on JEE mains, click on View syllabus", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            await AITSPage.navigateToAITSselectSubject("JEE Main")
            await AITSPage.btnViewSyllabus.waitForClickable({timeout:25000 })
            await AITSPage.btnViewSyllabus.click()
            await browser.refresh()
            allure.startStep("click on syllabus event triggered - 9200047",true) 
            allure.startStep("view syllabus event triggered - 9200048",true) 
            allure.startStep("click on concept video button - 9200159",true) 
            await $("//button[@class='sc-jRQBWg iPpGag btn btn btn btn-brown btn-sm']").waitForClickable({timeout:25000 })
            await $("//button[@class='sc-jRQBWg iPpGag btn btn btn btn-brown btn-sm']").click()
            await browser.back()
            allure.startStep("click on bookmark button  event triggered- 9200160",true) 
            await $("//button[@class='sc-gKclnd khEuhM btn mb-1 btn btn-cyan btn-sm']").click()
            await browser.back()
            allure.startStep("click on ask a doubt button  event triggered- 9200158",true) 
            await $("//button[@class='sc-jRQBWg iPpGag btn btn btn btn-brown btn-sm']").click()
         
           
        })
        it("TC_03  Landed on AITS main page, Click on JEE mains, click on Ask a doubt and concept video button", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            allure.startStep("Check the AITS Module in the menu bar", true)
            await AITSPage.navigateToAITSModule()
            await AITSPage.btnJeeMain.waitForClickable({timeout:35000 })
            await AITSPage.btnJeeMain.click()
            await AITSPage.btnAITSAskADoubt.waitForClickable({timeout:15000 })
            await AITSPage.btnAITSAskADoubt.click()
            await browser.refresh()
            allure.startStep("Click Ask a doubt event triggered  - 92000158",true) 
            await AITSPage.btnAITSConceptVideo.waitForClickable({timeout:15000})
            await AITSPage.btnAITSConceptVideo.click()
            await browser.back()
            allure.startStep("click concept videos event triggered  - 92000159",true) 
            await AITSPage.btnAITSBookMark.waitForClickable({timeout:15000})
            await AITSPage.btnAITSBookMark.click()
            allure.startStep("click to go to bookmarks  event triggered - 92000160",true) 
            allure.endStep()  
    
        })  
        it("TC_04  Landed on AITS main page, Click on JEE mains, click on upcoming, completed, skipped tab button", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            allure.startStep("Check the AITS Module in the menu bar", true)
            await AITSPage.navigateToAITSselectSubject("JEE Main")
            await AITSPage.btnUpcoming.waitForClickable({timeout:35000 })
            await AITSPage.btnUpcoming.click()
            allure.startStep("Click upcoming event triggered  - 9201023",true) 
            await AITSPage.btnCompleted.waitForClickable({timeout:15000})
            await AITSPage.btnCompleted.click() 
            allure.startStep("click Completed event triggered  - 9200049",true) 
            await AITSPage.btnSkipped.waitForClickable({timeout:15000})
            await AITSPage.btnSkipped.click()
            allure.startStep("click skipped event triggered - 9200051",true) 
            allure.endStep()  
    
        })  
      })


      describe("OLAP - Mock test flow", async () => {
    
        it("TC_01 Landed on Mock test page, click button NEET, Click on take a test and start test button ", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            allure.startStep("Navigate to MOCK TEST Module", true)
            await MockTestPage.navigateToMockTestModule()
            await MockTestPage.btnNeet.waitForClickable({timeout:15000})
            await MockTestPage.btnNeet.click()
            allure.startStep("Click on mock aits on the burger menu event triggered - 9200052",true) 
            allure.startStep("Land on mock aits home page event triggered - 9200053",true) 
            await MockTestPage.btnTakeTest.waitForClickable({timeout:15000})
            await MockTestPage.btnTakeTest.click()
            allure.startStep("Click on take test event triggered - 9200054",true) 
            allure.startStep("View instructions event triggered- 9200055",true) 
            await MockTestPage.btnStartTest.waitForClickable({timeout:15000})
            await MockTestPage.btnStartTest.click()
            allure.startStep("start test from instructions popup event triggered - 9200056",true) 
            allure.endStep()      
        })
        it("TC_02 Landed on Mock test page, click button NEET, Click on view concept videos, bookmark button ", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            allure.startStep("Navigate to MOCK TEST Module", true)
            await MockTestPage.navigateToMockTestModule()
            await MockTestPage.btnNeet.waitForClickable({timeout:15000})
            await MockTestPage.btnNeet.click()
            await MockTestPage.btnViewConceptVideos.waitForClickable({timeout:15000})
            await MockTestPage.btnViewConceptVideos.click()
            allure.startStep("click to go to chapterwise test on burger menu event triggered - 92000162",true) 
            await browser.back()
            allure.startStep("click on bookmark button  event triggered- 9200163",true) 
            await $("//button[@class='sc-gKclnd khEuhM btn mb-1 btn btn-cyan btn-sm']").click()
            allure.endStep()  


        })
        it("TC_03  Landed on Mock test main page, Click on JEE mains, click on upcoming, completed, skipped tab button", async () => {
            allure.startStep("Change cohort Details", true)
            await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14],'premium')
            allure.startStep("Check the Mock test Module in the menu bar", true)
            await MockTestPage.navigateToMockTestselectSubject("JEE Main")
            await MockTestPage.btnUpcoming.waitForClickable({timeout:35000 })
            await MockTestPage.btnUpcoming.click()
            allure.startStep("Click upcoming event triggered  - 9201024",true) 
            await MockTestPage.btnCompleted.waitForClickable({timeout:15000})
            await MockTestPage.btnCompleted.click() 
            allure.startStep("click analysis event triggered  - 9200060",true) 
            await $("(//a[contains(text(),'Analysis')])[1]").click()
            allure.startStep("click Completed event triggered  - 9200059",true) 
            await MockTestPage.btnSkipped.waitForClickable({timeout:15000})
            await MockTestPage.btnSkipped.click()
            allure.startStep("click skipped event triggered - 9200061",true) 
            allure.endStep()  

        })  
      })
describe("OLAP - All subjects flow", async () => {
    
    it("TC_01 Landed on All subjects page, click button on first subject, biology, view concepts, Next chapter, start learning buttons", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("View my subjects home page event triggered- 9200120",true) 
        await AllSubjectsPage.firstSubjectCard.waitForClickable({timeout:35000})
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("click on a subject event triggered- 9200121",true) 
        await AllSubjectsPage.btnBiology.waitForClickable({timeout:25000})
        await AllSubjectsPage.btnBiology.click()
        allure.startStep("click on a subject (explore other subjects)  event triggered - 9200176",true) 
        await AllSubjectsPage.btnViewConcepts.waitForClickable({timeout:25000})
        await AllSubjectsPage.btnViewConcepts.click()
        allure.startStep("click view concepts event triggered - 9200124",true) 
        await AllSubjectsPage.btnNextChapter.waitForClickable({timeout:15000})
        await AllSubjectsPage.btnNextChapter.click()
        allure.startStep("click view concepts event triggered - 9200127",true) 
        await AllSubjectsPage.btnStartLearning.waitForClickable({timeout:15000})
        await AllSubjectsPage.btnStartLearning.click()
        allure.startStep("click view concepts event triggered - 9200126",true) 
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.ddfilterSubjects.waitForClickable({timeout:35000})
        await AllSubjectsPage.ddfilterSubjects.click()
        await browser.keys(["Mathematics", "Tab"])
        allure.startStep("click on filter event triggered - 9200123",true) 
        allure.endStep()  


    })
    it("TC_02  Landed on All subjects page click on recomended videos", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({timeout:35000})
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnPlayRecomendedVideos.waitForClickable({timeout:35000})
        await AllSubjectsPage.btnPlayRecomendedVideos.click()     
        allure.startStep("click on recommended videos event triggered - 9200177",true) 
        allure.endStep()  

})
it("TC_03 Landed on All subjects page click on Ask a doubt, take test, Practice buttons", async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
    await AllSubjectsPage.navigateToAllSubjects()
    await AllSubjectsPage.firstSubjectCard.waitForClickable({timeout:35000})
    await AllSubjectsPage.firstSubjectCard.click()
    await AllSubjectsPage.btnViewConcepts.waitForClickable({timeout:25000})
    await AllSubjectsPage.btnViewConcepts.click()  
    await AllSubjectsPage.btnTakeTest.waitForClickable({timeout:25000})
    await AllSubjectsPage.btnTakeTest.click()  
    allure.startStep("click to take test event triggered - 9200174",true) 
    await browser.back()
    await AllSubjectsPage.btnPractice.waitForClickable({timeout:25000})
    await AllSubjectsPage.btnPractice.click()  
    allure.startStep("Ask a doubt triggered - 9200175",true) 
    await browser.back()
    await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({timeout:25000})
    await AllSubjectsPage.btnaskADoubtSideBar.click()  
    allure.startStep("Ask a doubt triggered - 9200173",true) 
    allure.endStep()  
})
})

describe("OLAP - Adaptive Practice Question", async () => {

    it("TC_01 Click on subject,View subject APQs,View test start pop_up,View analysis screen,Select option ,Click on next question,Click on submit,Click view solution,Click end practice ", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6])
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()        
        await AdaptivePracticeQuestionsPage.startAndEndPracticeFlow()        
        allure.startStep("Click on subject event triggered - 9200705", true)
        allure.startStep("View subject APQs event triggered - 9200711", true)
        allure.startStep("View test start pop_up event triggered - 9200712", true)
        allure.startStep("View analysis screen event triggered - 9200713", true)
        allure.startStep("Select option event triggered - 9200714", true)
        allure.startStep("Click on next question event triggered - 9200715", true)
        allure.startStep("Click on submit event triggered - 9200716", true)
        allure.startStep("Click view solution event triggered - 9200718", true)
        allure.startStep("Click end practice event triggered - 9200719", true)
    })

    it("TC_02 Click APQ from menu,View APQ home page,Click on Analyse,Click on resume,Click on bookmark tab,click on view solution ", async () => {
     
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        allure.startStep("Click to go to APQs on burger menu event triggered - 9200700", true)
        allure.startStep("View APQs home page event triggered - 9200701", true)
        await AdaptivePracticeQuestionsPage.btnAnalyse.click()
        allure.startStep("Click on analayse event triggered - 9200707", true)
        await browser.back()
        await browser.pause(2000)
        await AdaptivePracticeQuestionsPage.resumeButton.waitForClickable({timeout : 5000})
        await AdaptivePracticeQuestionsPage.resumeButton.click()
        allure.startStep("Click on resume event triggered - 9200708", true)
        await browser.pause(2000)
        if(await AdaptivePracticeQuestionsPage.btnUnCheckBookMark.isDisplayed())
        {
            await browser.back()
        }

        else
        {
            await AdaptivePracticeQuestionsPage.btnBookMark.waitForClickable({timeout : 5000})
            await AdaptivePracticeQuestionsPage.btnBookMark.click()
            await browser.back()
        }

        await AdaptivePracticeQuestionsPage.tabBookMark.click()
        allure.startStep("Click on option tab event triggered - 9200706", true)
        await AdaptivePracticeQuestionsPage.btnViewSolution.waitForClickable({timeout:5000})
        await AdaptivePracticeQuestionsPage.btnViewSolution.click()
        allure.startStep("Click on view solution event triggered - 9200710", true)
        
    })
    it("TC_02 Click APQ - start practice, start test button ", async () => {
     
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.btnFirstSubjectCard.click()
        await $("(//*[contains(text(),'Start Practice')])[1]").click()
        allure.startStep("Click on start practice event triggered - 9200182", true)
        await AdaptivePracticeQuestionsPage.btnStartTest.click()
        allure.startStep("Click on start test event triggered - 9200183", true)

    })
})

describe("OLAP - Chapter Wise Test", async () => {

    it("TC_01 Click on CWT from menu,CWT home page,view instructions popup,click start test,select option,click next,click previous,click exit assessment,click on a question to jump to that question,view question ", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6])
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("click to go to chapterwise test on burger menu event triggered - 9200062", true)
        allure.startStep("View chapterwise test home page event triggered - 9200063", true)
        await ChapterWiseTestsPage.btnRetakeTest.click()
        allure.startStep("View instructions popup event triggered - 9200078")
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({timeout:5000})
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("Click start test event triggered - 9200079")
        await ChapterWiseTestsPage.btnExitTest.click()
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.waitForClickable({time : 5000})
        await ChapterWiseTestsPage.btnCancelInExitAssessmentPopup.click()
        allure.startStep("Click exit assessment event triggered - 9200083") 
        allure.startStep("View question event triggered - 9200085")
        await browser.pause(2000)
        if (await ChapterWiseTestsPage.btnCheckBox.isDisplayed()) {
            await ChapterWiseTestsPage.btnCheckBox.click()
        }

        else if (await ChapterWiseTestsPage.btnRadioOption.isDisplayed()) {
            await ChapterWiseTestsPage.btnRadioOption.click()
        }
        else if (await ChapterWiseTestsPage.textbox.isDisplayed()) {
            await ChapterWiseTestsPage.textbox.setValue("abcd")
        }
        allure.startStep("Select option event triggered - 9200080")
        await ChapterWiseTestsPage.btnNext.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnNext.click()
        allure.startStep("Click next event triggered - 9200081")
        await ChapterWiseTestsPage.btnPrevious.waitForClickable({timeout : 25000})
        await ChapterWiseTestsPage.btnPrevious.click()
        allure.startStep("Click previous event triggered - 9200082")               
        await ChapterWiseTestsPage.listOfQuestionInTestPage.waitForClickable({timeout : 25000})
        await ChapterWiseTestsPage.listOfQuestionInTestPage.click()
        allure.startStep("Click on a question to jump to that question event triggered - 9200084")
            
    })

    it("TC_02 Click on subject,Explore_other_subjects,Click on take test,Click on feeback,add feedback,cancel feedback,submit feedback,finish button ", async () => {
        await browser.reloadSession()
         await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.btnAnalysis.waitForDisplayed({timeout :45000})
        await ChapterWiseTestsPage.btnAnalysis.click()
        allure.startStep("Click on analysis event triggered - 9200069")  
        await browser.back()
        await ChapterWiseTestsPage.tabRecentlySubmitted.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.tabRecentlySubmitted.click()
        await ChapterWiseTestsPage.subjectCard.waitForClickable({timeout : 5000})
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Click on subject event triggered - 9200065")   
        await ChapterWiseTestsPage.sidebarOtherSubjects(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.sidebarOtherSubjects(1).click()
        allure.startStep("Explore_other_subjects event triggered - 9200164")
        await browser.pause(2000)        
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 45000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.retakeTest(1).click()
            
        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        allure.startStep("Click on take test event triggered - 9200068")
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({timeout:5000})
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({timeout : 25000})
        await ChapterWiseTestsPage.btnFeedback.click()
        allure.startStep("Click to add question feedback event triggered - 9200086")
        await ChapterWiseTestsPage.selectFeedbackOption.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.selectFeedbackOption.click()
        await browser.keys(['ArrowDown','Tab'])
        allure.startStep("Select feedback event triggered - 9200087")
        await ChapterWiseTestsPage.btnCancelFeedback.waitForDisplayed({timeout :45000})
        await ChapterWiseTestsPage.btnCancelFeedback.click()
        allure.startStep("Click cancel event triggered - 9200089")
        await ChapterWiseTestsPage.btnFeedback.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.btnFeedback.click()
        await ChapterWiseTestsPage.btnSubmitFeedback.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.btnSubmitFeedback.click()  
        allure.startStep("Click submit feeback event triggered - 9200088")
        await ChapterWiseTestsPage.questionsHandling()
        allure.startStep("Click finish event triggered - 9200090")
       
})
it("TC_03 Click on recently submitted, bookmark questions,view solution,add/remove book mark view all buttons ", async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.tabRecentlySubmitted.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.tabRecentlySubmitted.click()
        allure.startStep("Click on recently submitted event triggered - 9200066")  
        await ChapterWiseTestsPage.bookmarkQuestionOption.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.bookmarkQuestionOption.click()
        allure.startStep("Click on bookmark questions event triggered - 9200067")  
        await $("(//button[normalize-space()='View Solution'])[1]").click()
        allure.startStep("Click on view solution event triggered - 9200070")  
        await ChapterWiseTestsPage.btnClosePopup.waitForDisplayed({timeout : 45000})
        await ChapterWiseTestsPage.btnClosePopup.click()
        await $("//*[@class='font-14 view-all-text']").click()
        allure.startStep("Click on view all event triggered - 9200071")  
        await $("//*[@class='mdi mdi-bookmark ']").click()
        allure.startStep("click to add / remove bookmark event triggered - 9200072")  

    })
})
describe("OLAP - Byju's Classes flows", async () => {

    it("TC_01 Land on Byju's Classes and Click on For You Tab and Completed Tab", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5]) 
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        allure.startStep("view default Classes event triggered - 9200121",true)  
        await ByjusClassesPage.btnCompletedTab.isClickable({ timeout:45000 })
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("Click on Completed Tab event triggered - 9200145",true)
        await ByjusClassesPage.btnForYouTab.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.btnForYouTab.click()
        allure.startStep("Click on For You Tab event triggered - 9200144",true)
    })

    it("TC_02 Land on Byju's Classes and Rebook the missing class", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5],'free')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        await ByjusClassesPage.btnRebookClass.scrollIntoView()
        await ByjusClassesPage.btnRebookClass.isDisplayed({ timeout:45000 })
        await ByjusClassesPage.btnRebookClass.click()
        allure.startStep("Click on Rebook Class event triggered - 9200140", true)
        await ByjusClassesPage.btnslotstime.waitForClickable({ timeout:25000 })
        await ByjusClassesPage.btnslotstime.click()
        allure.startStep("Select the TimeSlot event triggered - 9200141", true)
        allure.startStep("Select the TimeSlot event triggered - 9201022", true)
        await ByjusClassesPage.btnBookClass.waitForClickable({ timeout:25000 })
        await ByjusClassesPage.btnBookClass.click()
        allure.startStep("Click on Book class button event triggered - 9200142", true)
        await ByjusClassesPage.btnBackToByjusClass.waitForClickable({timeout:35000})
        await ByjusClassesPage.btnBackToByjusClass.click()
        allure.startStep("Click on Back to Byjus Class event triggered - 9200143", true)
    })

    it("TC_03 Check the events for TimeSlot, Book Class button, Remaind me and Submit", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        const subjectlist= byjusclassData.Class.subjectName.length
        for(let i= 1;i<= subjectlist; i++){
            const subName= byjusclassData.Class.subjectName[i-1]
            await browser.pause(2000)
            var result= await $("//*[contains(text(),'"+subName+"')]").isDisplayed()
            if(result == true){
                await (await ByjusClassesPage.btnBookClass).scrollIntoView()
                await (await ByjusClassesPage.btnslotstime).click()
                allure.startStep("Select the Slot event triggered - 9200141", true)
                await (await ByjusClassesPage.btnBookClass).click()
                allure.startStep("Click on Book Class - 9200142", true)
                await ByjusClassesPage.btnRmaindMe.waitForClickable({timeout:45000})
                await ByjusClassesPage.btnRmaindMe.click()
                allure.startStep("Click on Remaind me button - 9200138", true) 
                expect(await ByjusClassesPage.labelRemaindMePopupHeader.isDisplayed({timeout: 15000})).toEqual(true)
                await ByjusClassesPage.btnRemaindMeSubmit.click()
                allure.startStep("Click submit phone number - 9200139", true) 
                break;
            }
        }
    })

    it("TC_04 Check the event for Join Now button", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5],'free')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        await ByjusClassesPage.btnJoinNow.scrollIntoView()
        expect(await ByjusClassesPage.btnJoinNow.isClickable({ timeout:35000 })).toEqual(true)
        await ByjusClassesPage.btnJoinNow.click()
        allure.startStep("Click on Join Now event triggered - 6000001", true) 
        allure.endStep();
    })
})

describe("OLAP - Aakash Live Classes flows", async () => {

    it("TC_01 Land on Aakash live Classes and Click on the Free trail classes", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[14]) 
        await ByjusClassesPage.navigateToAakashLiveClassesAndPageLoad(loginData.sanityData.cohortDetails[14])
        allure.startStep("Click on Aakash Live Class event triggered - 9200181",true)  
        await ByjusClassesPage.labelAakashLiveClass.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.labelAakashLiveClass.click()
        allure.startStep("Click on Book a Free Class botton event triggered - 9200180",true)
        allure.endStep();
    })

})

describe("OLAP - BTC user flows", async () => {

    it("TC_01 Land on Byju's Classes and click on Completed Tab ", async () => {
        await browser.reloadSession()
        await LoginPage.loginToLearnPortal('neo')
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7]) 
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.isClickable({ timeout:45000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnBLCWatchVideo.scrollIntoView()
        await ByjusClassesPage.btnBLCWatchVideo.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.btnBLCWatchVideo.click()
        allure.startStep("Click on Watch Video event triggered - 9200137",true)
        await ByjusClassesPage.btnBLCWatchVideoClose.waitForDisplayed({ timeout:15000 })
        await ByjusClassesPage.btnBLCWatchVideoClose.click()
        await ByjusClassesPage.btnBLCResult.scrollIntoView()
        await ByjusClassesPage.btnBLCResult.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.btnBLCResult.click()
        allure.startStep("Click on Result event triggered - 6500104",true)

    })

    it("TC_02 Check the event for Join Now button", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5],'neo')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        await ByjusClassesPage.btnJoinNow.scrollIntoView()
        expect(await ByjusClassesPage.btnJoinNow.isClickable({ timeout:35000 })).toEqual(true)
        await ByjusClassesPage.btnJoinNow.click()
        allure.startStep("Click on Join Now event triggered - 6500001", true) 
    })

    it("TC_03 Check the event for Take a Test", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5],'neo')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Byju's Classes event triggered - 9200134",true)  
        await ByjusClassesPage.btnCompletedTab.isClickable({ timeout:45000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnBTCStartTest.scrollIntoView()
        await ByjusClassesPage.btnBTCStartTest.waitForClickable({ timeout:15000 })
        await ByjusClassesPage.btnBTCStartTest.click()
        allure.startStep("Click on Take test event triggered - 6500092",true)
        await ByjusClassesPage.btnBTCStartTestpopup.waitForDisplayed({ timeout:15000 })
        await ByjusClassesPage.btnBTCStartTestpopup.click()
        allure.startStep("Click on Start test in popup event triggered - 6500093",true)
        await ByjusClassesPage.btnBTCExistAssement.waitForDisplayed({ timeout:15000 })
        await ByjusClassesPage.btnBTCExistAssement.click()
        allure.endStep();
    })

})

describe("OLAP - BookMarks Page", async () => {

    it("TC_01 Land on BookMarks and Click on Subject, BookMarks Categories, View Answer and Read Summary", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        await browser.pause(3000) 
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnSubjectCard.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnSubjectCard.click()
        allure.startStep("Click on Subject Card event triggered - 9200132",true) 
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnSubjectCategories.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnSubjectCategories.click()
        allure.startStep("Click on Subject Categories event triggered - 9200131",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnViewAnswer.scrollIntoView()
        await BookMarksPage.btnViewAnswer.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnViewAnswer.click()
        allure.startStep("Click on View Answer event triggered - 9200128",true) 
        await BookMarksPage.btnClosePopup.waitForClickable({ timeout:15000 })
        await BookMarksPage.btnClosePopup.click()
        await BookMarksPage.btnReadSummary.scrollIntoView()
        await BookMarksPage.btnReadSummary.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnReadSummary.click()
        allure.startStep("Click on Read Summary event triggered - 9200129",true) 
        await BookMarksPage.btnClosePopup.waitForClickable({ timeout:15000 })
        await BookMarksPage.btnClosePopup.click()
        
    })

})
  describe("OLAP - Download Module", async () =>{
      
    it("TC_01 - Click to go to Downloads on burger menu / View Downloads home page / Click on subject / Select Papers event / Click on search button / View search results / Click on download", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')

        await browser.pause(1500)
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        
        await DashboardPage.btnDownloads.waitForDisplayed({ timeout: 3000 })
        await DashboardPage.btnDownloads.waitForClickable({ timeout: 3000 })
        allure.startStep("Click to go to Downloads on burger menu event triggred - 9200103", true)
        allure.startStep("View Downloads home page event triggred - 9200104", true)
        await DashboardPage.btnDownloads.click()
        
        const subjectName = await DownloadsPage.selectSubjectByCount("2").getText()
        allure.startStep("Click on subject event triggred - 9200105", true)
        await DownloadsPage.selectSubjectByName(subjectName).click()
        
        await DownloadsPage.ddPapers.click()
        allure.startStep("Select Papers event triggred - 9200107", true)
        await browser.keys(["All", "Tab"])
        
        await DownloadsPage.btnSearch.waitForClickable({ timeout: 2500 })
        allure.startStep("Click on search button event triggred - 9200108", true)
        allure.startStep("View search results event triggred - 9200113", true)
        await DownloadsPage.btnSearch.click()
        
        await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Click on download event triggred - 9200109", true)
        await DownloadsPage.downloadBtnPopularDownloadsCards("1").click()
        await browser.reloadSession()
        allure.endStep()
    })
    
    it("TC_02 - Click concept videos / Ask a doubt", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        
        await DownloadsPage.navigateToDownloadsModule()
        
        await DownloadsPage.btnConceptVideo.waitForClickable({ timeout: 3000 })
        allure.startStep("Click concept videos event triggred - 9200166", true)
        await DownloadsPage.btnConceptVideo.click()
        
        await browser.back()
        
        await DownloadsPage.btnAskaDoubt.waitForDisplayed({ timeout: 7000 })
        await DownloadsPage.btnAskaDoubt.waitForClickable({ timeout: 3000 })
        allure.startStep("Ask a doubt event triggred - 9200998", true)
        await DownloadsPage.btnAskaDoubt.click()
        allure.startStep("Ask a doubt event triggred - 9200165", true)
        await browser.reloadSession()
        allure.endStep()
    })
    
})

describe("OLAP - Profile Module", async () =>{
    it("TC_01 View profile landing / Click on subscriptions / Click to edit DoB / Click on save / Click on grade drop down / Click or select grade / Click on request a callback / View request call back / Click submit after filling details for request call back / Click cancel in request call back / Click to edit profile picture", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        
        await ProfilePage.ddProfile.waitForClickable({timeout:15000})
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({timeout : 15000})
        allure.startStep("View profile landing page event triggred - 9110405", true)
        await ProfilePage.btnProfile.click()
        
        await ProfilePage.btnSubscriptions.waitForDisplayed({timeout : 5000})
        allure.startStep("Click on subscriptions event triggred - 9200027", true)
        await ProfilePage.btnSubscriptions.click()
        
        await browser.pause(1500)
        await ProfilePage.btnPersonalDetails.click()
        await ProfilePage.tfDob.waitForDisplayed({timeout : 3000})
        allure.startStep("Click to edit DoB event triggred - 9200028", true)
        await ProfilePage.tfDob.click()
        await browser.keys(["11/12/2021"])
        await browser.keys(["Enter"])
        allure.startStep("Click on save event triggred - 9200030", true)
        await ProfilePage.tfname.setValue("abcd")
        await ProfilePage.btnSave.click()        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.ddcohortSelection.waitForClickable({timeout:15000})
        allure.startStep("Click on grade drop down event triggred - 9200031", true)
        await ProfilePage.ddcohortSelection.click()
        await browser.keys(cohortDetail)
        allure.startStep("Click / select grade event triggred - 9110406", true)
        await browser.keys('Tab')
        
        await browser.pause(2000)
        await ProfilePage.ddProfile.waitForClickable({timeout:15000})
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({timeout : 15000})
        await ProfilePage.btnProfile.click()
        
        await ProfilePage.btnRequestCallBack.waitForDisplayed({timeout : 3000})
        allure.startStep("Click on request a callback event triggred - 9200029", true)
        allure.startStep("View request call back event triggred - 9200033", true)
        await ProfilePage.btnRequestCallBack.click()
        allure.startStep("Click submit after filling details for request call back event triggred - 9200034", true)
        await ProfilePage.btnRequestCallBackSubmit.click()
        await ProfilePage.btnBackToProfile.waitForDisplayed({timeout : 3000})
        await ProfilePage.btnBackToProfile.click()
        await ProfilePage.btnRequestCallBack.waitForDisplayed({timeout : 3000})
        await ProfilePage.btnRequestCallBack.click()
        await ProfilePage.btnRequestCallBackCancel.waitForDisplayed({timeout : 3000})
        allure.startStep("Click cancel in request call back event triggred - 9200035", true)
        await ProfilePage.btnRequestCallBackCancel.click()
        
        await ProfilePage.btnEditProfilePicture.waitForDisplayed({timeout : 3000})
        allure.startStep("Click to edit profile picture event triggred - 9200036", true)
        await browser.pause(1000)
        await ProfilePage.btnEditProfilePicture.click()
        await browser.reloadSession()
        allure.endStep()
    })
})

describe("OLAP - Onboarding SSO", async () =>{
    it("TC_01 - view signup page / click get OTP / click on login / click on signup / view fill profile details page / click next / view OTP screen / click back / click final login / click resent OTP / trigger incorrect OTP / trigger OTP successful", async () =>{
        await ProfilePage.openByjusLearnPage()
        await SignUpPage.btnSignUp.waitForDisplayed({timeout : 3000})
        await SignUpPage.btnSignUp.waitForClickable({timeout : 3000})
        allure.startStep("Click on signup event triggred - 9200094", true)
        allure.startStep("View signup page event triggred - 9200091", true)
        await SignUpPage.btnSignUp.click()

        await browser.pause(1000)
        await LoginPage.btnLogIn.waitForDisplayed({timeout : 3000})
        allure.startStep("Click on login event triggred - 9200093", true)
        await LoginPage.btnLogIn.click()
        allure.startStep("Click on login event triggred - 9201031", true)
        await browser.pause(1000)
        await SignUpPage.btnSignUp.waitForDisplayed({timeout : 3000})
        await SignUpPage.btnSignUp.click()
        allure.startStep("Click button signup event triggred - 9200091", true)
        let phoneNumber = signUpData.validData.validPhoneNumber
        let otp = signUpData.validData.validotp
        await LoginPage.enterPhoneNumber(phoneNumber)
        allure.startStep("Click get OTP event triggred - 9200092", true)
        allure.startStep("View OTP screen event triggred - 9200097", true)
        await LoginPage.clickOnNext()
        allure.startStep("Click next button event triggred - 9201032", true)
        await browser.pause(11000)
        await LoginPage.resendOtpLink.waitForDisplayed({timeout : 7000})
        await LoginPage.resendOtpLink.waitForClickable({timeout : 7000})
        allure.startStep("Click resent OTP event triggred - 9200100", true)
        await LoginPage.resendOtpLink.click()
        allure.startStep("Click next button event triggred - 9201032", true)
        await SignUpPage.enterOtp(['2','0','1','1'])
        allure.startStep("Click resent OTP event triggred - 9201025", true)
        await SignUpPage.btnNext.click()


        await SignUpPage.enterOtp(otp)
        allure.startStep("Trigger OTP successful event triggred - 9200102", true)
        allure.startStep("View fill profile details page event triggred - 9200095", true)
        await SignUpPage.btnNext.click()

        await SignUpPage.btnBack.waitForDisplayed({timeout : 8000})
        await SignUpPage.btnBack.waitForClickable({timeout : 8000})
        allure.startStep("Click back event triggred - 9200098", true)
        await SignUpPage.btnBack.click()
        await browser.reloadSession()
        allure.endStep()
    })
})

describe("OLAP - Dashboard Module", async () =>{
    it("TC_01 - Land on homepage dashboard / Click on grade drop down / Lands on profile page / Click on Profile / Click on a grade / Click active button in the greetings banner / Ask a doubt / Click on videos shown on homepage / Click on view all for videos / Click on download app", async () =>{
        allure.startStep("Login to Learn Portal", true);
        allure.startStep("Land on homepage dashboard event triggred - 9200013", true)
        await LoginPage.loginToLearnPortal('free')
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]

        await ProfilePage.ddProfile.waitForClickable({timeout:15000})
        await ProfilePage.ddProfile.click()
        await ProfilePage.btnProfile.waitForClickable({timeout : 15000})
        await ProfilePage.btnProfile.click()
        await ProfilePage.ddcohortSelection.waitForClickable({timeout:15000})
        allure.startStep("Click on grade drop down event triggred - 9200031", true)
        await ProfilePage.ddcohortSelection.click()
        await browser.keys(cohortDetail)
        allure.startStep("Lands on profile page event triggred - 9200010", true)
        allure.startStep("Click on Profile event triggred - 9200011", true)
        allure.startStep("Click on a grade event triggred - 9200012", true)
        await browser.keys('Tab')
        
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({timeout : 7000})
        allure.startStep("Click active button in the greetings banner event triggred - 9200014", true)
        await DashboardPage.btnbookYourTrialClasses.click()
        
        await browser.back()
        
        await browser.pause(2000)
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({timeout : 7000})
        await DashboardPage.btnbookYourTrialClasses.waitForClickable({timeout : 7000})
        allure.startStep("Ask a doubt event triggred - 9200998", true)
        await $("//button[@class='btn btn']").click()
        
        await browser.pause(750)
        await $("//*[@class='css-s6ac10']").click()
        
        await $("(//*[@alt='play-icon'])[1]").waitForDisplayed({timeout : 5000}) //First concept video button
        await browser.pause(2000)
        allure.startStep("Click on videos shown on homepage event triggred - 9200017", true)
        await $("(//*[@alt='play-icon'])[1]").click() //First concept video button
        
        await browser.back()
        
        await browser.pause(1500)
        await $("(//*[@alt='play-icon'])[1]").waitForDisplayed({timeout : 5000}) //First concept video button
        await browser.pause(2000)
        allure.startStep("Click on view all for videos event triggred - 9200018", true)
        await DashboardPage.btnConceptVideosViewAll.click()
        
        await browser.back()
        
        allure.startStep("Click on download app event triggred - 9110408", true)
        await $("//*[@href='/learn/download-app']").click() //Download app Button Xpath
    })
    
    it("TC_02 - Neo user Ask A doubt / Select tabs / click to take test / click practice  / ", async () =>{
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Ask a doubt event triggred - 9200998", true)
        await $('//button[text()="Ask a Doubt"]').click() //Ask A Doubt Button Xpath Homepage
        
        await browser.pause(750)
        await $("//*[@class='css-s6ac10']").click()
        
        await $("//*[text()='Topic Covered']").waitForDisplayed({timeout : 4000})
        await $("//*[text()='Topic Covered']").waitForClickable({timeout : 4000})
        allure.startStep("Select tabs event triggred - 9200021", true)
        await $("//*[text()='Topic Covered']").click()
        await $("//*[text()='Recent Activities']").click()

        allure.startStep("click on analysis button event triggred - 9200022", true)
        await $("//*[text()='ANALYSIS']").click() 
        await browser.back()

        await $("(//*[@class='card-subtitle'])[1]").waitForDisplayed({timeout : 4000})
        allure.startStep("click on bookmark button event triggred - 9200023", true)
        await $("(//*[@class='card-subtitle'])[1]").click() 
        await browser.back()

        allure.startStep("click on take a test button event triggred - 9200024", true)
        await $("(//*[@class='card-subtitle'])[2]").click() 
        await browser.back()
      
        

        

    })

})
