import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import DashboardPage from "../../Pages/DashboardPage"
import { loginData } from "../../Data/LoginData"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { get33PercentageOfYoutubeVideoForOlap, getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/conceptVideos_OLAP_Data.json')
let userID

describe("OLAP - Concept video flows", async () => {

    it("320468 TC_01 Validate the U_event_id 9110500, m_desc Land on concept video home page ", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Land on concept video home page event triggered - 9110500", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9110500",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320469 TC_02 Validate the U_event_id 9110510, m_desc Click on video to play" , async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        allure.startStep("Click on video to play event triggered - 9110510", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9110510",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320478 TC_03 Validate the U_event_id 9200040, m_desc Click forward/backward skip by 10 seconds" , async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnVideoSkip10Sec.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnVideoSkip10Sec.click()
        allure.startStep("Click forward / backward skip by 10 seconds event triggered - 9200040", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200040",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320479 TC_04 Validate the U_event_id 9110508, m_desc Click mute or unmute" , async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnMute.waitForDisplayed({ timeout: 15000 })
        await ConceptVideoPage.btnMute.click()
        allure.startStep("Click mute or unmute event triggered- 9110508", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9110508",userID,localData)).toEqual(true)
        allure.endStep()
    })

    it("320480 TC_05 Validate the U_event_id 9200041, m_desc click bookmark reading material", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        let subjectNameVideoPlayButton = $("(//*[@class='video-sub-title' and text()='Mathematics']/../../../..//*[@class='play-icon'])[1]")
        for (let i=0;i<35;i++){
            await browser.keys(["PageDown"])
            try{await subjectNameVideoPlayButton.waitForDisplayed({timeout:500})}catch{}
            if(await subjectNameVideoPlayButton.isDisplayed()){
                break
            }
        }
        // await ConceptVideoPage.btnFullScreen.scrollIntoView()
        // await browser.pause(1000)
        try{await ConceptVideoPage.btnSecondPlayOnMainPage.waitForDisplayed({timeout:10000})}catch{}
        if(await ConceptVideoPage.btnBookMarkReadingMaterial.isDisplayed({timeout:10000})){
            await ConceptVideoPage.btnBookMarkReadingMaterial.click()
            console.log("if condition")
        }
        if(await ConceptVideoPage.btnBookMarkedReadingMaterial.isDisplayed({timeout:5000})){
            await ConceptVideoPage.btnBookMarkedReadingMaterial.click()
            await browser.refresh()
            await ConceptVideoPage.btnBookMarkReadingMaterial.waitForDisplayed({timeout:10000})
            await ConceptVideoPage.btnBookMarkReadingMaterial.click()
            console.log("else if condition")
        }
        allure.startStep("Click bookmark reading material event triggered - 9200041")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200041",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320483 TC_06 Validate the U_event_id 9200156, m_desc Click to download PDF", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        let subjectNameVideoPlayButton = $("(//*[@class='video-sub-title' and text()='Mathematics']/../../../..//*[@class='play-icon'])[1]")
        for (let i=0;i<35;i++){
            await browser.keys(["PageDown"])
            try{await subjectNameVideoPlayButton.waitForDisplayed({timeout:500})}catch{}
            if(await subjectNameVideoPlayButton.isDisplayed()){
                await subjectNameVideoPlayButton.click()
                break
            }
        }
        await ConceptVideoPage.btnDownloadfile.waitForDisplayed({timeout:5000})
        await ConceptVideoPage.btnDownloadfile.click()
        allure.startStep("Click to download PDF event triggered - 9200156")
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200156",userID,localData)).toEqual(true)
        allure.endStep()

    })

    it("320481 TC_07 Validate the U_event_id 9200154, m_desc Click to bookmark question", async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnBookmarkIMPQues.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnRightNavigationIMPQues.scrollIntoView()
        await ConceptVideoPage.btnBookmarkIMPQues.click()
        allure.startStep("Click to bookmark question event triggered - 9200154", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200154",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320482 TC_08 Validate the U_event_id 9200155, m_desc Click to view solution", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnRightNavigationIMPQues.scrollIntoView()
        await ConceptVideoPage.btnViewSolution.click()
        allure.startStep("Click to view solution event triggered - 9200155", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200155",userID,localData)).toEqual(true)
        allure.endStep()

    })

    it("320471 TC_09 Validate the U_event_id 9200037, m_desc Click on a subject in browse options", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("Click on a subject in browse options event triggered - 9200037", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200037",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320473 TC_10 Validate the U_event_id 9200152, m_desc Click on view concepts", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        // await ConceptVideoPage.btnFullScreen.scrollIntoView()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()   
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()
        allure.startStep("Click on view concepts event triggered - 9200152", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200152",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320470 TC_11 Validate the U_event_id 9200150, m_desc Click on video to play", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()   
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnViewConceptAtSubjectLevel.click()
        await ConceptVideoPage.btnSecondPlayOnMainPage.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnSecondPlayOnMainPage.click()
        allure.startStep("Click on video to play inside subject page event triggered - 9200150", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200150",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320472 TC_12 Validate the U_event_id 9200151, m_desc Click on a subject in browse options", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("click on a subject in browse options (select sub from main page-> click on a particular video) event triggered - 9200151", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200151",userID,localData)).toEqual(true)
        allure.endStep()
    })

    it("320484 TC_13 Validate the U_event_id 9200157, m_desc Click on a subject in browse options", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.labelSubjectName.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.labelSubjectName.click()
        allure.startStep("Click on a subject in browse options after selecting a video event triggered - 9200157", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200157",userID,localData)).toEqual(true)
        allure.endStep()
    })
    it("320474 TC_14 Validate the U_event_id 9200038, m_desc Click on share options" , async () => { 
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnShareOnMainPage.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnShareOnMainPage.click()
        allure.startStep("Click on share button event triggered - 9200038", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200038",userID,localData)).toEqual(true)
        allure.endStep()

    })
    it("320475 TC_15 Validate the U_event_id 9200153, m_desc Click on the share options", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnShareOnMainPage.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnShareOnMainPage.click()
        await ConceptVideoPage.btnGmail.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.btnGmail.click()
        allure.startStep("Click on Share options event triggered - 9200153", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9200153",userID,localData)).toEqual(true)
        allure.endStep()

    })

    it('320485 TC_16 Validate the U_event_id 9201043, m_desc Video is completed or exit video playback screen',async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForDisplayed({timeout:5500})
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(5000)
        await ConceptVideoPage.videoTime.waitForDisplayed({timeout:5500})
        let videoTime= await ConceptVideoPage.videoTime.getHTML(false)
        console.log(videoTime,"Time for video");
        await browser.pause(2000)
        let tenSecondsButtomPressCount = get33PercentageOfYoutubeVideoForOlap(videoTime)
        for (let i = 0;i<tenSecondsButtomPressCount;i++){
            await ConceptVideoPage.btnVideoSkip10Sec.click()
        }
        await browser.pause(5000)
        allure.startStep("Click on Share options event triggered - 9201043", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9201043",userID,localData)).toEqual(true)
        allure.endStep()
    });

    it('356896 TC_17 Validate the u_event_id 9201045, m_desc click on concept videos in burger menu',async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8],'free')
        userID = await getUserId()
        await ConceptVideoPage.menuOption.waitForClickable({ timeout: 5000 })
        await ConceptVideoPage.menuOption.click()

        await DashboardPage.btnConceptVideos.waitForDisplayed({ timeout: 10000 })
        await DashboardPage.btnConceptVideos.click()
        allure.startStep("Click on Share options event triggered - 9201045", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataConceptVideo("9201045",userID,localData)).toEqual(true)
        allure.endStep()
    });
            
})