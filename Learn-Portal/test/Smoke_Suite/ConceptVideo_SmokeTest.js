import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import { conceptVideoData } from "../../Data/ConceptVideoData"
import TouchPointPage from "../../Pages/TouchPointPage";
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import { get33PercentageOfYoutubeVideo } from "../../utils/function"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import { touchPointData} from "../../Data/TouchPointData";
const touchPointCohortDetail=touchPointData.touchPointApplicableCohort[0]


describe("Learn Portal - Concept Video test  cases for Free user", async () => {

    it("315682 TC_01 Free user - Validate user navigates to first video by clicking the play button in main page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(30000)
        allure.startStep("Validates video screen gets displayed", true)
        await ConceptVideoPage.videoScreen.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.videoScreen.moveTo()
        await browser.pause(3000)// waits till bottom pannel gets displayed
        await ConceptVideoPage.videoScreen.click()
        allure.startStep("Validates muting option of video", true)
        await ConceptVideoPage.btnMute.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnMute.click()
        await browser.pause(2000)// video plays muted
        allure.startStep("Validates unmuting option of video", true)
        await ConceptVideoPage.btnUnmute.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnUnmute.click()
        allure.startStep("Validates maximize option of video", true)
        await browser.pause(2000)
        await ConceptVideoPage.btnFullScreen.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnFullScreen.click()
        await browser.pause(2000)// full screen module is visible
        allure.startStep("Validates minimize option of video", true)
        await ConceptVideoPage.btnExitFullScreen.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnExitFullScreen.click()
        allure.endStep();
    })

    it("315684 TC_02 Free user - Share button validation in Concept Video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate share button is clickable", true)
        await ConceptVideoPage.btnShareOnMainPage.waitForClickable({ timeout: 15000 })
        await ConceptVideoPage.btnShareOnMainPage.click()
        allure.startStep("Validate Share App model window is getting displayed")
        await ConceptVideoPage.shareAppModelWindow.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.shareAppModelWindow.isDisplayed()).toEqual(true)
        allure.startStep("Verify twitter icon is dipalyed", true)
        await ConceptVideoPage.labelTwitter.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.labelTwitter.isDisplayed()).toEqual(true)
        allure.startStep("Verify Telegram icon is dipalyed", true)
        await ConceptVideoPage.labelTelegram.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.labelTelegram.isDisplayed()).toEqual(true)
        allure.startStep("Verify WhatsApp icon is dipalyed", true)
        await ConceptVideoPage.labelWhatsapp.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.labelWhatsapp.isDisplayed()).toEqual(true)
        allure.startStep("Verify Reddit icon is dipalyed", true)
        await ConceptVideoPage.labelReddit.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.labelReddit.isDisplayed()).toEqual(true)
        allure.startStep("Verify Facebook icon is dipalyed", true)
        await ConceptVideoPage.labelFacebook.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.labelFacebook.isDisplayed()).toEqual(true)
        allure.startStep("Verify linkToCopy button is dipalyed", true)
        await ConceptVideoPage.linkCopy.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.linkCopy.isDisplayed()).toEqual(true)
        allure.startStep("Verify CopyLink button is dipalyed", true)
        await ConceptVideoPage.btnCopy.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.btnCopy.isDisplayed()).toEqual(true)
        allure.startStep("Verify AppStore buton is dipalyed", true)
        await ConceptVideoPage.btnAppStore.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.btnAppStore.isDisplayed()).toEqual(true)
        allure.startStep("Verify playStore is dipalyed", true)
        await ConceptVideoPage.btnPlayStore.waitForDisplayed({ timeout: 5000 })
        expect(await ConceptVideoPage.btnPlayStore.isDisplayed()).toEqual(true)
        allure.startStep("close the share popup", true)
        await ConceptVideoPage.btnSharePopupClose.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.btnSharePopupClose.isDisplayed()).toEqual(true)
        await ConceptVideoPage.btnSharePopupClose.click()
        allure.endStep();
    })

    it("315685 TC_03 Free user - Validation of subject details of cohort 7 displayed at the Browse video lessons panel", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validate subject details are dsplayed as expected", true)
        await browser.pause(5000)
        const noOfSubject = await $$("//*[@class='subject-name']")
        const subjectList = conceptVideoData.freeUserData.subjectDetailsCohort7
        expect(noOfSubject.length).toEqual(subjectList.length)
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = conceptVideoData.freeUserData.subjectDetailsCohort7[i - 1]
            let result = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]").isDisplayed()
            expect(result).toEqual(true)
        }
        allure.endStep();
    })

    it("315688 TC_04 Free user - Validate topic wise videos are getting displayed", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        expect(await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.labelSubjectName.click()
        expect(await ConceptVideoPage.labelTopicName.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        const topicName = await ConceptVideoPage.labelTopicName.getText()
        expect(await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({ timeout: 5000 })).toEqual(true)
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()
        expect(await ConceptVideoPage.topicVideosPageTitle.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        const topicVideoPageName = await ConceptVideoPage.topicVideosPageTitle.getText()
        expect(topicName).toEqual(topicVideoPageName)
        allure.endStep();
    })

    it("315690 TC_05 Free user - Validate Interested videos and Related videos section", async () => {


        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[1], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in the main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForDisplayed({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Validates interested video section is displayed under video", true)
        await ConceptVideoPage.labelInterestedVideos.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.labelInterestedVideos.isDisplayed()).toEqual(true)
        allure.startStep("Validates related topics video section is displayed under video", true)
        await ConceptVideoPage.labelRelatedTopics.waitForDisplayed({ timeout: 15000 })
        expect(await ConceptVideoPage.labelRelatedTopics.isDisplayed()).toEqual(true)
        allure.endStep();

    })

    it("315694 TC_06 Free user - Validation of DownloadFile, Bookmark and Expand and collapse of description and continue reading button fuctionality", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await $("//*[text()='Biology']/../../../..//*[@class='play-icon']").waitForClickable({ timeout: 30000 })
        await $("//*[text()='Biology']/../../../..//*[@class='play-icon']").click()
        allure.startStep("Validates video screen gets displayed", true)
        await ConceptVideoPage.videoScreen.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.videoScreen.moveTo()
        await browser.pause(3000)// waits till bottom pannel gets displayed
        await ConceptVideoPage.videoScreen.click()
        await ConceptVideoPage.btnFullScreen.scrollIntoView()
        allure.startStep("Validate the Download File is displaying/Not", true)
        if(await ConceptVideoPage.btnDownloadfile.isDisplayed() == true){
        await ConceptVideoPage.btnDownloadfile.scrollIntoView()
        expect(await ConceptVideoPage.btnDownloadfile.isDisplayed()).toEqual(true)
        }
        allure.startStep("Validate the BookMark button is displaying/Not", true)
        expect(await ConceptVideoPage.btnBookmark.isDisplayed()).toEqual(true)
        allure.startStep("Validate the View button is displaying/Not", true)
        expect(await ConceptVideoPage.btnViewConcept.isDisplayed()).toEqual(true)
        allure.startStep("Validate the title on the concept", true)
        var collapsetitle = await ConceptVideoPage.labelConcept.getText()
        await ConceptVideoPage.btnViewConcept.click()
        await ConceptVideoPage.labelViewConcept.waitForDisplayed({timeout:1500})
        var viewtitle = await ConceptVideoPage.labelViewConcept.getText()
        console.log(collapsetitle," == ",viewtitle)
        console.log(collapsetitle == viewtitle)
        console.log(collapsetitle === viewtitle)
        expect(collapsetitle == viewtitle).toEqual(true)
        await ConceptVideoPage.btnCollapse.click()
        allure.startStep("Validate the Continue Reading button", true)
        await browser.pause(1000)
        await ConceptVideoPage.btnContinueReading.waitForDisplayed({ timeout: 15000 })
        // scroll to specific element
        await ConceptVideoPage.btnDownloadfile.scrollIntoView()
        expect(await ConceptVideoPage.btnContinueReading.isDisplayed()).toEqual(true)
        await ConceptVideoPage.btnContinueReading.click()
        expect(await ConceptVideoPage.btnContinueReading.isDisplayed()).toEqual(false)
        allure.endStep();
    })
    it('334395 TC_07 Verify the selection of subject it can go to DOC window with the question detail for concept video',async () => {
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
        let videoTitle=await TouchPointPage.titleOfVideoConceptVideo.getText()
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
        let seatsCount=await TouchPointPage.seatsLeftCount.getText()
        if(seatsCount >= 1){
        await TouchPointPage.chatOptionConceptVideo.waitForClickable({timeout:3000})
        await TouchPointPage.chatOptionConceptVideo.click()
        await TouchPointPage.connectingToTutorDocWindowConceptVideo.waitForDisplayed({timeout:3000})
        expect(await TouchPointPage.connectingToTutorDocWindowConceptVideo.isDisplayed()).toEqual(true)
        let chapterName=await TouchPointPage.chapterNameInDocWindowConceptVideo.getText()
        expect(videoTitle).toEqual(chapterName)
        }else{
            expect(await seatsCount).toEqual(0)
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
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
})