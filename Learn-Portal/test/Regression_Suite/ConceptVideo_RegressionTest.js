import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import { conceptVideoData } from "../../Data/ConceptVideoData"
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import { get33PercentageOfYoutubeVideo,checkLazyLoadingImgCount} from "../../utils/function"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import TouchPointPage from "../../Pages/TouchPointPage";
import { touchPointData} from "../../Data/TouchPointData";
import { loginData } from "../../Data/LoginData"
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]


describe("Learn Portal - Concept Video test  cases for Free user", async () => {


    it("315683 TC_01 Free user - Validate links to CWT,APQ and Ask a doubt should redirect to expected page.", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(5000)// wait for the videos to load    
        allure.startStep("Click on CWT module under the video", true)
        await ConceptVideoPage.linkToChapterWiseTest.waitForDisplayed({ timeout: 5000 })
        await ConceptVideoPage.linkToChapterWiseTest.click()
        allure.startStep("Validate banner of CWT module", true)
        await expect(await ConceptVideoPage.CWTbannerHeaddingSelectYourSubject.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Navigate to back page", true)
        await browser.back();
        allure.startStep("Click on Adaptive practice Questions module under the video", true)
        await ConceptVideoPage.linkToAPQ.waitForDisplayed({ timeout: 5000 })
        await ConceptVideoPage.linkToAPQ.click()
        allure.startStep("Validate banner of Adaptive practice Questions module", true)
        await expect(await ConceptVideoPage.APQbannerHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Navigate to back page", true)
        await browser.back();
        allure.startStep("Click on Ask a doubt module under the video", true)
        await ConceptVideoPage.linkToAskADoubt.waitForDisplayed({ timeout: 5000 })
        await ConceptVideoPage.linkToAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        await AskADoubtPage.labelBreadCrumb.waitForDisplayed({timeout : 10000})
        expect(await AskADoubtPage.labelBreadCrumb.isDisplayed()).toEqual(true)
        expect(await AskADoubtPage.labelBreadCrumb.isDisplayed()).toEqual(true)
        allure.endStep();

    })

    it("315686 TC_02 Free user - Validation of subject details of cohort 10 displayed at the Browse video lessons panel", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate subject details are dsplayed as expected", true)
        const noOfSubject = await $$("//*[@class='subject-name']")
        const subjectList = conceptVideoData.freeUserData.subjectDetailsCohort8
        expect(noOfSubject.length).toEqual(subjectList.length)
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = conceptVideoData.freeUserData.subjectDetailsCohort8[i - 1]
            let result = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]").isDisplayed()
            expect(result).toEqual(true)
        }
        allure.endStep();
    })

    it("315687 TC_03 Free user - Validating videos corresponding to the selected subjects getting displayed", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.labelSubjectName.waitForDisplayed({ timeout: 5000 })
        const subjectName = await ConceptVideoPage.labelSubjectName.getText()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()
        await browser.pause(3000)  //Waiting for the page to load completely     
        const videoSubtitles = await $$("//*[@class='video-sub-title']")
        expect(await videoSubtitles.length).toBeElementsArrayOfSize({ gte: 1 })
        allure.endStep();

    })

    it("315689 TC_04 Free user - Validating more settings in video player bottom panel", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Validates video screen gets displayed", true)
        await ConceptVideoPage.videoScreen.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.videoScreen.moveTo()
        await browser.pause(3000)// waits till bottom pannel gets displayed
        await ConceptVideoPage.videoScreen.click()
        allure.startStep("Validates more settings option in bottom pannel is clicakbel", true)
        await ConceptVideoPage.btnMoreOptionInVideoPlayer.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnMoreOptionInVideoPlayer.click()
        allure.startStep("Validates resolution,play back,picture in picture and language options are displayed with default values", true)
        for (let i = 0; i <= 3; i++) {
            const option = conceptVideoData.videoPlayerMoreOptions.options[i]
            const defaultVal = conceptVideoData.videoPlayerMoreOptions.value[i]
            expect(await $("//*[contains(text(),'" + option + "')]").waitForClickable({ timeout: 5000 })).toEqual(true)
            const defaultValue = await $("(//*[contains(text(),'" + option + "')])[1]/following-sibling::span").getText()
            expect(await defaultValue).toEqual(defaultVal)

        }
        allure.endStep();
    })

    it("315691 TC_05 Free user - Validation no videos are avalilable for Cohort 2 at concept", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[2], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate no videos are displayed for cohort 2", true)
        const videoSection = await $("//*[@class='no-video-text']").getText()
        expect(await videoSection).toHaveTextContaining("No Concept Videos")
        allure.endStep();

    })

    it("315692 TC_06 Free user - Validate the share options in Concept Video page", async () => {

        allure.startStep("Change cohort to view the video", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate share button is clickable", true)
        await browser.pause(8000)   // waiting for the videos to load  
        await ConceptVideoPage.btnShareOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnShareOnMainPage.click()
        allure.startStep("Validate Share App model window is getting displayed")
        await ConceptVideoPage.shareAppModelWindow.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.shareAppModelWindow.isDisplayed()).toEqual(true)
        allure.startStep("Verify application opens all the social media handles and able to navigate to the url", true)

        for (let i = 0; i <= 4; i++) {
            const btnTwitter = await $("//*[@alt='" + conceptVideoData.socialMediaHandles.handleId[i] + "']").click()
            const handles = await browser.getWindowHandles();
            expect(await browser.switchWindow(conceptVideoData.socialMediaHandles.handleUrl[i]))
            await browser.closeWindow();
            allure.startStep("Switch to window handles[0]", true);
            await browser.switchToWindow(handles[0]);
        }
        allure.endStep();
    })

    it("315693 TC_07 Free user - Validate the subject section and subtitles of videos", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate subject details are dsplayed as expected", true)
        const noOfSubject = await $$("//*[@class='subject-name']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            allure.startStep("Wait for the subjects to be displayed", true)
            await ConceptVideoPage.subjectName(i).waitForDisplayed({ timeout: 15000 })
            allure.startStep("Get subject text", true)
            let subjectTitle = await ConceptVideoPage.subjectName(i).getText()
            allure.startStep("Click on subject", true)
            await ConceptVideoPage.subjectName(i).waitForDisplayed({timeout : 3000})
            await ConceptVideoPage.subjectName(i).click()
            allure.startStep("Verify the subject name from bread crumb", true)
            expect(await ConceptVideoPage.subjectBreadcrumb.getText()).toEqual(subjectTitle)
            let noOfSubtitles = await $$("//div[@class='video-sub-title']")
            for (let i = 1; i <= noOfSubtitles.length; i++) {
                allure.startStep("Verify the subject name from video sub title", true)
                await ConceptVideoPage.subjectSubTitle(i).waitForDisplayed({timeout : 3000})
                expect(await ConceptVideoPage.subjectSubTitle(i).getText()).toEqual(subjectTitle)
            }
            await browser.back()
        }
        allure.endStep();
    })

    it("315695 TC_08 Free user - Validate learn more button is redirecting to download app page on click of videos in concept video page ", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        expect(await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.labelSubjectName.click()
        expect(await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()
        allure.startStep("Validate the video is clickable and popup should display", true)
        expect(await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Validate the learnmore button is clickable", true)
        expect(await ConceptVideoPage.learnMore.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.learnMore.click()
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("Validate Google Store  section is displayed", true)
        await DashboardPage.btnGooglePlayStore.waitForClickable({ timeout: 25000 })
        await DashboardPage.btnGooglePlayStore.click()
        let handles1 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[0]))
        await browser.closeWindow()
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles1[0]);
        allure.startStep("Validate App Store button is displayed")
        await DashboardPage.btnAppleStore.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnAppleStore.click()
        let handles2 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[1]))
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles2[0]);
        allure.endStep();
    })

    it("315696 TC_09 Free user - Validation of BreadCrumb items for ConceptVideo", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate subject details are displayed as expected", true)
        const noOfSubject = await $$("//*[@class='subject-name']")
        const subjectList = conceptVideoData.freeUserData.subjectDetailsCohort7
        expect(noOfSubject.length).toEqual(subjectList.length)
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = conceptVideoData.freeUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate subject details are displayed", true)
            await subjectCard.click()
            allure.startStep("Wait untill element clickable", true)
            await ConceptVideoPage.btnBreadCrumbOfConceptVideo.waitForClickable({ timeout: 15000 })
            allure.startStep("Click on the concept video button in the navigation bar", true)
            await ConceptVideoPage.btnBreadCrumbOfConceptVideo.click()
            allure.startStep("Text should be Concept video", true)
            await ConceptVideoPage.labelofConceptVideoPage.waitForDisplayed({ timeout: 15000 })
            allure.startStep("Check the label of the landing page", true)
            expect(await ConceptVideoPage.labelofConceptVideoPage.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    })

    it("315697 TC_10 Free user - Verifying the content -'Videos which may interest you' of the Concept Video Page on click of one of the videos", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on main play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        for (let i = 1; i <= 3; i++) {
            allure.startStep("Validate heading of visible video cards", true)
            await ConceptVideoPage.getVideoCount(i).waitForDisplayed({ timeout: 45000 })
            expect(await ConceptVideoPage.getVideoCount(i).isDisplayed()).toEqual(true)
        }
        allure.startStep("Click on Right navigation on Intrested Videos", true)
        await ConceptVideoPage.btnRightNavigationIntrestedVideos.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnRightNavigationIntrestedVideos.click()
        allure.startStep("Click on left navigation on Intrested Videos", true)
        await ConceptVideoPage.btnLeftNavigationIntrestedVideos.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnLeftNavigationIntrestedVideos.click()

        allure.startStep("Click on play button of Intrested Videos", true)
        await ConceptVideoPage.btnPlayIntrestedVideos.waitForClickable({ timeout: 45000 })
        let videoTopic = await $("(//img[contains(@class,'dashboard_play-icon__')])[2]/../..//h4").getText() //Get Interested video topic
        await ConceptVideoPage.btnPlayIntrestedVideos.click()
        await browser.pause(1500)
        let redirectedVideoTopic = await $("//*[@class='d-none d-xl-block col-lg-12']//*[@class='title']").getText()
        allure.startStep("Validate the heading of Intrested Videos", true)
        if (redirectedVideoTopic == videoTopic){
            expect(await $("//*[@class='d-none d-xl-block col-lg-12']//*[@class='title']").getText()).toEqual(videoTopic)
        }
        else{
            expect(await ConceptVideoPage.downloadAppPopupHeading.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    })

    it("315698 TC_11 Free user - Verifying the content - 'More Concepts' of the Concept Video Page on click of one of the videos", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(1700)
        await ConceptVideoPage.btnplayInsideVedio.waitForDisplayed({timeout : 1800})
        await ConceptVideoPage.btnplayInsideVedio.click()
        for (let i = 1; i <= 3; i++) {
            allure.startStep("Validate heading of visible  video cards", true)
            await ConceptVideoPage.getVideoCount(i).waitForDisplayed({ timeout: 45000 })
            expect(await ConceptVideoPage.getVideoCount(i).isDisplayed()).toEqual(true)
        }
        allure.startStep("Click on left navigation on related topics", true)        
        await ConceptVideoPage.btnLeftNavigationMoreConcepts.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnLeftNavigationMoreConcepts.click()
        allure.startStep("Click on Right navigation on related topics", true)
        await ConceptVideoPage.btnRightNavigationMoreConcepts.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnRightNavigationMoreConcepts.click()
        await ConceptVideoPage.moreConceptsVideoCardTitle.waitForDisplayed({timeout : 5000})
        await browser.pause(1500)
        let videoCardTitle = await ConceptVideoPage.moreConceptsVideoCardTitle.getText()
        allure.startStep("Click on play button of More Concepts Videos", true)
        await ConceptVideoPage.btnPlayMoreConcepts.scrollIntoView({block:"center"})
        await browser.pause(2000)
        await ConceptVideoPage.btnPlayMoreConcepts.waitForDisplayed({ timeout: 45000 })
        await ConceptVideoPage.btnPlayMoreConcepts.click()
        await browser.pause(1500)
        let videoPageTitle = await ConceptVideoPage.moreConceptsVideoMainPageTitle.getText()
        console.log("videoCardTitle "+videoCardTitle+" videoPageTitle"+videoPageTitle)
        allure.startStep("Validate the heading of Concepts videos", true)
        expect(await ConceptVideoPage.moreConceptsVideoMainPageTitle.getText()).toEqual(videoCardTitle)
        allure.endStep();
    })

    it("315699 TC_12 Free user - Verifying the content - 'Related Topic Lessons on our Mobile App' of the Concept Video Page on click of one of the videos", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        for (let i = 1; i <= 3; i++) {
            allure.startStep("Validate heading of visible video cards", true)
            await ConceptVideoPage.getVideoCount(i).waitForDisplayed({ timeout: 45000 })
            expect(await ConceptVideoPage.getVideoCount(i).isDisplayed()).toEqual(true)
        }
        allure.startStep("Click on left navigation on related topics", true)
        await ConceptVideoPage.btnRightNavigationRelatedTopics.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnRightNavigationRelatedTopics.click()
        allure.startStep("Click on Right navigation on related topics", true)
        await ConceptVideoPage.btnLeftNavigationRelatedTopics.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnLeftNavigationRelatedTopics.click()
        allure.startStep("Click on play button of related topics video", true)
        await ConceptVideoPage.btnPlayRelatedTopics.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayRelatedTopics.click()
        allure.startStep("Validate the download App popup window", true)
        await expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();

    })
    it("315700 TC_13 Free user - Verify the heading of video card and total video counts to displayed video cards", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on Maths", true)
        await ConceptVideoPage.btnFirstSubjectCard.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnFirstSubjectCard.click()
        let videoTitle = await ConceptVideoPage.videoTitle.getText()
        let videoNumber = await ConceptVideoPage.numberOfVideos.getText()
        let totalNoOfChapter = parseInt(videoNumber.slice(0, 3).trim())
        allure.startStep("Click on view concept", true)
        await ConceptVideoPage.btnviewConcepts.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnviewConcepts.click()
        await browser.pause(5000)// waits till video cards gets displayed
        let headingText = await ConceptVideoPage.bannerHeading.getText()
        let videoCardNumbers = await ConceptVideoPage.videoCardRows.length
        allure.startStep("Verify the subject name to subject heading", true)
        expect(await videoTitle).toEqual(headingText)
        allure.startStep("Verify the video count to video cards", true)
        expect(totalNoOfChapter).toEqual(videoCardNumbers)
        allure.endStep();
    })

    it("315701 TC_14 Free user - Verify the left right navigation, view solution, and book mark button in Important question section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on main play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Click right navigation button", true)
        await ConceptVideoPage.btnRightNavigationIMPQues.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnRightNavigationIMPQues.click()
        allure.startStep("Click left navigation button", true)
        await ConceptVideoPage.btnLeftNavigationIMPQues.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnLeftNavigationIMPQues.click()
        allure.startStep("Verify view solution button", true)
        expect(await ConceptVideoPage.btnViewSolution.isDisplayed()).toEqual(true)
        allure.startStep("Verify book mark button", true)
        expect(await ConceptVideoPage.btnBookmarkIMPQues.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("315702 TC_15 Free user - Verify the view solution popup next previous question, correct solution and close button in Important question section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click on main play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Click on main play button", true)
        await ConceptVideoPage.btnViewSolution.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnViewSolution.click()
        let question = await ConceptVideoPage.viewSolutionQuestion.getText()
        allure.startStep("Click Next Question button", true)
        await ConceptVideoPage.btnNextQuestion.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnNextQuestion.click()
        allure.startStep("Click on Previous question button", true)
        await ConceptVideoPage.btnPreviousQuestion.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPreviousQuestion.click()
        let questionText = await ConceptVideoPage.viewSolutionQuestion.getText()
        allure.startStep("Verify same question after clicking on next and previous question buttons", true)
        expect(question).toEqual(questionText)
        allure.startStep("Verify the content of correct solution should displayed", true)
        expect(await ConceptVideoPage.correctSolution.isDisplayed()).toEqual(true)
        allure.startStep("Click on close", true)
        await AllSubjectsPage.btncloseViewSloution.click()
        allure.endStep();
    })
    it("331123 TC_16 Lazy loading - Varify the image loading for concept video page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Validate image count in starting and end of the page", true) 
        for(let i=0;i<conceptVideoData.lazyLoadingUrls.length;i++)
        {
        await browser.pause(3000)   
        await checkLazyLoadingImgCount(conceptVideoData.lazyLoadingUrls[i])
        }
        allure.endStep(); 
    })
    it('334391 TC_17 Verify on click of connect to tutor under any playable video for concept video',async () => {
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('neo')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        await TouchPointPage.btnConnectToTutorConceptVideo.waitForDisplayed({timeout:5000})
        expect(await TouchPointPage.btnConnectToTutorConceptVideo.isDisplayed()).toEqual(true)
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
    });
    
    it('334392 TC_18 Verify the matches found page for the chapter selected with view solution cta for concept video',async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        await TouchPointPage.titleOfVideoConceptVideo.waitForDisplayed({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.waitForClickable({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.click()
        let url=await browser.getUrl()
        let expectedURL=await url.includes("ask-a-doubt/search?searchkey")
        expect(expectedURL).toEqual(true)
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
    });

    it('334393 TC_19 Verify if you cant find the answer " coonect to tutor " below bar you can click .for concept video',async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        await TouchPointPage.titleOfVideoConceptVideo.waitForDisplayed({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.waitForClickable({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.click()
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorConceptVideo.waitForDisplayed({timeout:5000})
        expect(await TouchPointPage.popUpCantFindAnswerConnectWithTutorConceptVideo.isDisplayed()).toEqual(true)
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorConceptVideo.click()
        if(await TouchPointPage.popUpoSelectSubjectConceptVideo.isDisplayed() == true){
        await TouchPointPage.popUpoSelectSubjectConceptVideo.waitForDisplayed({timeout:3000})
        expect(await TouchPointPage.popUpoSelectSubjectConceptVideo.isDisplayed()).toEqual(true)
        }else{
            await TouchPointPage.chatOptionConceptVideo.waitForDisplayed({timeout:3000})
            expect(await TouchPointPage.chatOptionConceptVideo.isDisplayed()).toEqual(true)
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
    });

    it('334394 TC-20 Verify if the auto subjects screen is optional ,sometime if he dont understand the question it will show which subject releated example : science or maths .sometime it wont for concept video',async () => {
        allure.startStep("Change cohort Details", true)
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if(await TouchPointPage.btnConnectToTutor.isDisplayed() == true)
        {
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        await TouchPointPage.titleOfVideoConceptVideo.waitForDisplayed({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.waitForClickable({timeout:3000})
        await TouchPointPage.btnConnectToTutorConceptVideo.click()
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorConceptVideo.waitForDisplayed({timeout:5000})
        await TouchPointPage.popUpCantFindAnswerConnectWithTutorConceptVideo.click()
        if(await TouchPointPage.popUpoSelectSubjectConceptVideo.isDisplayed() == true){
            expect(await TouchPointPage.selectSubjectConceptVideo.isDisplayed()).toEqual(true)
            await TouchPointPage.selectSubjectConceptVideo.click()
            await TouchPointPage.btnConctinueConceptVideo.click()
        }
        await TouchPointPage.popUpConnectToTutorConceptVideo.waitForDisplayed({timeout:3000})
        expect(await TouchPointPage.popUpConnectToTutorConceptVideo.isDisplayed()).toEqual(true)
        expect(await TouchPointPage.chatOptionConceptVideo.isDisplayed()).toEqual(true)
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
    });
    it("335399 TC_21 Validate the 'Click on Play Button ' in Concept video module for all Paid numbers", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.paidUserData.cohortDetails[1], 'btlp')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Click Button Play", true)
        await ConceptVideoPage.btnPlay.click()
        allure.startStep("Interested Video Text is visible", true)
        expect(await ConceptVideoPage.labelInterestedVideos.getText()).toHaveText("Videos that May Interest You")
        allure.endStep(); 
    })

    it("335401 TC_22 Validate the 'Click on Play Button ' in Concept video module for all Paid numbers", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.paidUserData.cohortDetails[1], 'btlp')
        allure.startStep("Navigate to concept videos", true)
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnFirstSubjectCard.waitForDisplayed({timeout:10000})
        await ConceptVideoPage.btnFirstSubjectCard.click()
        await ConceptVideoPage.btnfirstViewConceptVideo.waitForDisplayed({timeout:10000})
        await ConceptVideoPage.btnfirstViewConceptVideo.click()
        allure.startStep("Click Button Play", true)
        await ConceptVideoPage.btnPlay.click()
        allure.startStep("Interested Video Text is visible", true)
        expect(await ConceptVideoPage.labelInterestedVideos.getText()).toHaveText("Videos that May Interest You")
        allure.endStep(); 
    })

    it("352289 TC_23 Validate the library videos of BDLC user", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'bdlc')
        allure.startStep("Navigate to concept videos", true)
        await DashboardPage.menuOption.click()
        await ConceptVideoPage.btnConceptVideos.click()
        await ConceptVideoPage.btnFirstSubjectCard.waitForDisplayed({timeout:10000})
        await ConceptVideoPage.btnFirstSubjectCard.click()
        await ConceptVideoPage.btnfirstViewConceptVideo.waitForDisplayed({timeout:10000})
        await ConceptVideoPage.btnfirstViewConceptVideo.click()
        allure.startStep("Click Button Play", true)
        await ConceptVideoPage.btnPlay.click()
        allure.startStep("Interested Video Text is visible", true)
        expect(await ConceptVideoPage.labelInterestedVideos.getText()).toHaveText("Videos that May Interest You")
        allure.endStep(); 
    });
})
