import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import { loginData } from "../../Data/LoginData"
import { conceptVideoData } from "../../Data/ConceptVideoData"

describe("Learn Portal - Smoke suite for Login, Concept video,Download and Ask a doubt modules", async () => {
it("308923 TC_01 Login to Learn Portal - With valid phone number and otp", async () => {
    allure.startStep("Enter valid phone number and otp login to learn portal", true);
    await LoginPage.loginToLearnPortal('free')
    allure.endStep();
})

it("308924 TC_02 Validate user navigates to first video by clicking the play button in main page", async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
    allure.startStep("Navigate to concept video menu", true)
    await ConceptVideoPage.navigateToConceptVideo()
    allure.startStep("Validates play button in main page is clickable", true)
    await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
    await ConceptVideoPage.btnPlayOnMainPage.click()
    allure.startStep("Validates video screen gets displayed", true)
    await ConceptVideoPage.videoScreen.waitForClickable({ timeout: 15000 })
    await ConceptVideoPage.videoScreen.moveTo()
    await browser.pause(3000)// waits till bottom pannel gets displayed
    await ConceptVideoPage.videoScreen.click()
    allure.startStep("Validates muting option of video", true)
    await ConceptVideoPage.btnMuteUnmute.waitForClickable({ timeout: 15000 })
    await ConceptVideoPage.btnMuteUnmute.click()
    await browser.pause(2000)// video plays muted
    allure.startStep("Validates unmuting option of video", true)
    await ConceptVideoPage.btnMuteUnmute.waitForClickable({ timeout: 15000 })
    await ConceptVideoPage.btnMuteUnmute.click()
    allure.startStep("Validates maximize option of video", true)
    await ConceptVideoPage.btnFullScreen.waitForClickable({ timeout: 15000 })
    await ConceptVideoPage.btnFullScreen.click()
    await browser.pause(2000)// full screen module is visible
    allure.startStep("Validates minimize option of video", true)
    await ConceptVideoPage.btnExitFullScreen.waitForClickable({ timeout: 15000 })
    await ConceptVideoPage.btnExitFullScreen.click()
    allure.endStep();
})

it("308925 TC_03 Validate links to CWT, APQ and Ask a doubt should redirect to expected page.", async () => {

    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(conceptVideoData.freeUserData.cohortDetails[0], 'free')
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
    allure.startStep("Validate banner of Ask a doubt module", true)
    await AskADoubtPage.labelBreadCrumb("Search").waitForDisplayed({timeout : 5000})
    expect(await AskADoubtPage.labelBreadCrumb("Search").isDisplayed()).toEqual(true)
    expect(await AskADoubtPage.labelBreadCrumb(">").isDisplayed()).toEqual(true)
    allure.endStep();

})

it("308926 TC_04 Validate the share options in Concept Video page", async () => {


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

it("308927 TC_05 Verifying the content -'Videos which may interest you' of the Concept Video Page on click of one of the videos", async () => {

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

    allure.startStep("Click on play button of Intrested Videos", true)
    await ConceptVideoPage.btnPlayIntrestedVideos.waitForClickable({ timeout: 45000 })
    let videoTopic = await $("(//img[contains(@class,'dashboard_play-icon__aRYE-')])[2]/../..//h4").getText() //Get Interested video topic
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

it("308928 TC_06 Verifying the content - 'More Concepts' of the Concept Video Page on click of one of the videos", async () => {

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

it("308929 TC_07 Verifying the content - 'Related Topic Lessons on our Mobile App' of the Concept Video Page on click of one of the videos", async () => {

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
    allure.startStep("Click on play button of related topics video", true)
    await ConceptVideoPage.btnPlayRelatedTopics.waitForClickable({ timeout: 45000 })
    await ConceptVideoPage.btnPlayRelatedTopics.click()
    allure.startStep("Validate the download App popup window", true)
    await expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    allure.endStep();

})

it("308930 TC_08 Downloads - Free user - Click on download button and verify the download url", async () => {
    
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(cohortDetail, 'free')
    allure.startStep("Navigate to Download Module", true)
    await DownloadsPage.navigateToDownloadsModule()
    allure.startStep("Wait for Popular Download label to appear", true)
    await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
    allure.startStep("Validate Popular Download label to is displayed", true)
    expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
    allure.startStep("Get the card count for Popular Download block", true)
    let cardCount = await DownloadsPage.downloadPoularDownloadsPdf()
    for (let i = 1; i <= cardCount; i++) {
        allure.startStep("Click on Download button", true)
        await DownloadsPage.downloadBtnPopularDownloadsCards(i).click()
        await browser.pause(1500)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl()
        let flag = url.includes("downloads/staging")
        if (flag == false){
           flag = url.includes("downloads/production") //check for production
        }
        allure.startStep("Validate the URL of Downloaded pdf", true)
        expect(flag).toEqual(true)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }
    allure.endStep();
})

it("308931 TC_09 Downloads - Free user - Verify filter for previous year paper", async () => {
        
    allure.startStep("Change cohort Details", true)
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    await ProfilePage.changeCohortDetail(cohortDetail, 'free')
    allure.startStep("Navigate to Download module", true)
    await DownloadsPage.navigateToDownloadsModule()
    allure.startStep("Click on subject maths", true)
    await DownloadsPage.selectSubjectByName("Mathematics").click()
    allure.startStep("Click on  filter drop down", true)
    await DownloadsPage.ddPapers.waitForDisplayed({ timeout: 2500 })
    await DownloadsPage.ddPapers.click()
    allure.startStep("Select previous year paper from drop down", true)
    await browser.keys(["Pre", "Tab"])
    allure.startStep("Click on search button", true)
    await DownloadsPage.btnSearch.waitForClickable({ timeout: 2500 })
    await DownloadsPage.btnSearch.click()
    let input = await DownloadsPage.previousYearPaper.getText()
    let previousYearPaper = String(input.slice(20, 39))
    allure.startStep("Verify previous year paper", true)
    expect(previousYearPaper).toEqual("Previous Year Paper")
    let paginationButtons = await $$("//*[@class='page-link']").length
    if (paginationButtons > 1) {
        for (let i = 2; i <= paginationButtons; i++) {
            await DownloadsPage.paginationNextButton.click()
        }
        allure.startStep("Verify previous year papaer", true)
        expect(previousYearPaper).toEqual("Previous Year Paper")
    }
    else {
        allure.startStep("Verify previous year papaer", true)
        expect(previousYearPaper).toEqual("Previous Year Paper")
    }
    allure.endStep();
})

it("308932 TC_10 Downloads - Free user - verify filter for sample paper", async () => {
    
    allure.startStep("Change cohort Details", true)
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    await ProfilePage.changeCohortDetail(cohortDetail, 'free')
    allure.startStep("Navigate to Download module", true)
    await DownloadsPage.navigateToDownloadsModule()
    allure.startStep("Click on subject maths", true)
    await DownloadsPage.selectSubjectByName("Mathematics").click()
    allure.startStep("Click on  filter drop down", true)
    await DownloadsPage.ddPapers.waitForDisplayed({ timeout: 2500 })
    await DownloadsPage.ddPapers.click()
    allure.startStep("Select sample year paper from drop down", true)
    await browser.keys(["Sample", "Tab"])
    allure.startStep("Click on search button", true)
    await DownloadsPage.btnSearch.waitForClickable({ timeout: 2500 })
    await DownloadsPage.btnSearch.click()
    let input = await DownloadsPage.previousYearPaper.getText()
    let samplePaper = String(input.slice(20, 32))
    allure.startStep("Verify sample paper", true)
    expect(samplePaper).toEqual("Sample Paper")
    let paginationButtons = await $$("//*[@class='page-link']").length
    if (paginationButtons > 1) {
        for (let i = 2; i <= paginationButtons; i++) {
            await DownloadsPage.paginationNextButton.click()
        }
        allure.startStep("Verify sample paper", true)
        expect(samplePaper).toEqual("Sample Paper")
    }
    else {
        allure.startStep("Verify sample papaer", true)
        expect(samplePaper).toEqual("Sample Paper")
    }
    allure.endStep();
})

 

it("308933 TC_11 Ask A Doubt - Free user - Validate nevigation to Ask a Doubt and Take A Test Module", async () =>{
        
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(cohortDetail,'free')
    allure.startStep("Nevigate to Ask A doubt search bar",true)
    await AskADoubtPage.navigateToAskADoubt()
    allure.startStep("Enter topic to search",true)
    await AskADoubtPage.tfAskADoubt.setValue("light")
    allure.startStep("Wait for the search result to get displayed",true)
    await AskADoubtPage.searchResult().waitForDisplayed({timeout : 3000})
    allure.startStep("Wait for the search result to be Clickable",true)
    await AskADoubtPage.searchResult().waitForClickable({timeout : 3000})
    allure.startStep("Click on the searched result",true)
    await AskADoubtPage.searchResult().click()
    allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
    await AskADoubtPage.btnRightNavigationAskADoubt.waitForClickable({timeout : 2000})
    allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
    await AskADoubtPage.btnRightNavigationAskADoubt.click()
    allure.startStep("Enter topic to search",true)
    await AskADoubtPage.tfAskADoubt.setValue("solar")
    allure.startStep("Get the searched text",true)
    const doubtText = await AskADoubtPage.tfAskADoubt.getAttribute("value")
    allure.startStep("Validate the searched text with the text field",true)
    expect(doubtText).toEqual("solar")
    await browser.refresh()
    allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
    await AskADoubtPage.btnRightNavigationAskADoubt.waitForClickable({timeout : 5000})
    allure.startStep("Click on Take a test Button",true)
    await AskADoubtPage.btnRightNavigationTakeATest.waitForClickable({timeout : 5000})
    await AskADoubtPage.btnRightNavigationTakeATest.click()
    const currentUrl = await browser.getUrl()
    allure.startStep("Validate the navigation to Take a test page",true)
    expect(currentUrl.includes("chapter-wise-tests")).toEqual(true)
    allure.endStep();
})

it("308934 TC_12 Ask A Doubt - doubtsOnChatUser - Validate doubtsOnChatUser integration with Learn portal",async () => {
    await browser.reloadSession()
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(cohortDetail,'doubtsOnChatUser')
    allure.startStep("Nevigate to Ask A doubt search bar",true)
    await AskADoubtPage.navigateToAskADoubt()
    allure.startStep("Verify app url")
    expect(await AskADoubtPage.docAskADoubtAppUrl()).toContain("ask-a-doubt")
    allure.startStep("Verify the Ask A Doubt Text visible on page",true)
    await browser.pause(3000)
    const frame= await $('//iframe[@title="DoubtsOnChat"]')
    await browser.switchToFrame(frame)
    await AskADoubtPage.docAskADoubtTitle.waitForDisplayed({timeout:5000}) 
    expect(await AskADoubtPage.docAskADoubtTitle.isDisplayed()).toEqual(true);
    allure.startStep("Verify the search field visible on page",true)
    expect(await AskADoubtPage.docSearchField.isDisplayed()).toEqual(true);
    allure.endStep();        

})

it("308935 TC_13 Ask A Doubt - instaLearnUser - Validate instaLearnUser integration with Learn portal",async () => {
    await browser.reloadSession()
    let cohortDetail = loginData.sanityData.cohortDetails[9]
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(cohortDetail,'instaLearnUser')
    allure.startStep("Nevigate to Ask A doubt search bar",true)
    await AskADoubtPage.navigateToAskADoubt()
    allure.startStep("Verify app url")
    expect(await AskADoubtPage.instaLaernAskADoubtUrl()).toContain("ask-a-doubt")
    allure.startStep("Verify the Instant Doubt Solver Text visible on page",true)
    await browser.pause(3000)
    const frame= await $('//iframe[@title="DoubtsOnChat"]')
    await browser.switchToFrame(frame)
    await AskADoubtPage.instaLearnAskADoubtTitle.waitForDisplayed({timeout:20000})   
    expect(await AskADoubtPage.instaLearnAskADoubtTitle.isDisplayed()).toEqual(true);
    allure.startStep("Verify the search field visible on page",true)
    expect(await AskADoubtPage.instaLaernSearchField.isDisplayed()).toEqual(true);        
    allure.endStep()
})

it("308936 TC_14 Login to Learn Portal Paid user flow - Switch user flow", async () => {
    await browser.reloadSession()
    await LoginPage.openByjusLearnPage()  
    allure.startStep("Enter valid phone number to phone number field", true);
    await LoginPage.enterPhoneNumber(loginData.paidUser.validPhoneNumber)
    allure.startStep("Click on next button", true);
    await LoginPage.clickOnNext()
    allure.startStep("Enter a valid OTP", true);
    await LoginPage.enterOtp(loginData.paidUser.validotp)
    await browser.pause(4000)
    await LoginPage.btnLogIn.waitForDisplayed({ timeout: 15000 })
    await LoginPage.btnLogIn.click()
    await ProfilePage.multipleSessionActiveMsg()
    await ProfilePage.clickButtonSkipATour()
    await ProfilePage.clickButtonBookATrialPopup()
    allure.startStep("Select user profile", true)
    await ProfilePage.selectProfile()
    await ProfilePage.btnSwitchProfile.click()      
    let noOfProfiles = await $$("//*[@class=' font-14 switch-user-name']")
    for (let i = 1; i <= noOfProfiles.length; i++) {    

            let switchUserName = await $("(//*[@class=' font-14 switch-user-name'])[" + i + "]").getText()
            switchUserName = switchUserName.slice(0,"")
            await $("(//*[@class='switch-profile-icon'])[" + i + "]").click()
            try{                
                await ProfilePage.multipleSessionActiveMsg()                
            }
            catch {
                //do nothing
            }
            await browser.pause(5000)
            switchUserName = switchUserName.charAt(0).toUpperCase() + switchUserName.slice(1)
            await $("//*[contains(text(),'" + switchUserName + "')]").waitForDisplayed({ timeout: 5000 })
            expect(await ProfilePage.ddProfile.waitForClickable({timeout:25000})).toEqual(true)        
            await ProfilePage.ddProfile.click()
            await $("//*[@class='dropdown-item notify-item profile-switch-item']").click()
    }
    allure.endStep();
}) 


})
