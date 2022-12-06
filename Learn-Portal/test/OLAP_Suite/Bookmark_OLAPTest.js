import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import BookMarksPage from "../../Pages/BookMarksPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
let localData = require('../../Data/OLAP_data/bookMarks_OLAP_Data.json')
let userID 

describe("OLAP - BookMarks Page", async () => {
    before("", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'free')
        await ConceptVideoPage.navigateToConceptVideo()
        let subjectNameVideoPlayButton = $("(//*[@class='video-sub-title' and text()='Mathematics']/../../../..//*[@class='play-icon'])[1]")
        for (let i=0;i<35;i++){
            await browser.keys(["PageDown"])
            try{await subjectNameVideoPlayButton.waitForDisplayed({timeout:500})}catch{}
            if(await subjectNameVideoPlayButton.isDisplayed()){
                break
            }
        }
        await subjectNameVideoPlayButton.click()
        try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})
            await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})
        }catch{}
        let bookmarkedCount = await $$("//*[@class='mdi mdi-bookmark']").length
        let bookamrk = 3-bookmarkedCount
        if (bookmarkedCount != 3 && bookmarkedCount<4){
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
                await browser.pause(1500)
            }
        }
        await DownloadsPage.navigateToDownloadsModule()
        try{await $("(//*[contains(@class,'bookmarked')])[1]").waitForDisplayed({timeout:3500})}catch{}
        bookmarkedCount = await $$("//*[contains(@class,'bookmarked')]").length
        if (bookmarkedCount<=3){
            bookamrk = 3-bookmarkedCount
            console.log("bookamrk = ",bookamrk," bookmarkedCount = ",bookmarkedCount)
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).waitForDisplayed({timeout:40000})
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
                await browser.refresh()
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).waitForDisplayed({timeout:40000})
            }
        }
        
    })

    it("318158 TC_01 vaildate the U_event_id 9201047 m_descclick bookmarks homepage burger menu", async  () => {
        allure.startStep("Change the cohort",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Click on bookmark homepage event triggered - 9200147",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201047",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
        
    it("320426 TC_02 Validate the U_event_id 9201044 m_desc view bookmarks homepage", async  () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Click on bookmark homepage event triggered - 9200144",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201044",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320427 TC_03 Validate the U_event_id 9200128 m_desc click view answer", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnViewAnswer.scrollIntoView()
        await BookMarksPage.btnViewAnswer.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnViewAnswer.click()
        allure.startStep("Click on View Answer event triggered - 9200128",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200128",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320428 TC_04 Validate the U_event_id 9200129 m_desc click read summary", async  () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnReadSummary.scrollIntoView()
        await BookMarksPage.btnReadSummary.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnReadSummary.click()
        allure.startStep("Click on Read Summary event triggered - 9200129",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200129",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320429 TC_05 Validate the U_event_id 9200130 m_desc click download", async  () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        await browser.pause(3000)
        if (await BookMarksPage.btnDownload.isDisplayed()) {
            await BookMarksPage.btnDownload.scrollIntoView()
            await BookMarksPage.btnDownload.waitForDisplayed({ timeout:15000 })
            await BookMarksPage.btnDownload.click()

        } else {
            await DownloadsPage.navigateToDownloadsAndPageLoad()
            await BookMarksPage.btnBookmarkPopularDownloads.waitForDisplayed({ timeout:15000 })
            await BookMarksPage.btnBookmarkPopularDownloads.click()
            await BookMarksPage.navigateToBookMarksPage()
            await BookMarksPage.btnDownload.scrollIntoView()
            await BookMarksPage.btnDownload.waitForDisplayed({ timeout:15000 })
            await BookMarksPage.btnDownload.click()
        }
        allure.startStep("Click on Downloads event triggered - 9200130",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200130",userID,localData)).toEqual(true)
        allure.endStep()
    })

    it("320431 TC_06 Validate the U_event_id 9200132 m_desc click in bookmarked subjects", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnSubjectCard.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnSubjectCard.click()
        allure.startStep("Click on Subject Card event triggered - 9200132",true) 
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200132",userID,localData)).toEqual(true)
        allure.endStep()
    })    

    it("320430 TC_07 Validate the U_event_id 9200131 m_desc click in bookmarked categories", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.btnSubjectCategories.waitForDisplayed({ timeout:15000 })
        await BookMarksPage.btnSubjectCategories.click()
        allure.startStep("Click on Bookmarks Categories event triggered - 9200131",true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200131",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320432 TC_08 Validate the U_event_id 9200133 m_desc select recent or old ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(3000)
        await BookMarksPage.selectFirstSubjectInsubjectBookmark("Mathematics").waitForDisplayed({timeout:5000})
        await BookMarksPage.selectFirstSubjectInsubjectBookmark("Mathematics").click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDownQuestionTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDownQuestionTab.click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        allure.startStep("select recent or old event triggered - 9200133",true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9200133",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320433 TC_09 Validate the U_event_id 9201018 m_desc select recent or old when all subjects selected ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectQuestionTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectQuestionTab.click()
        await BookMarksPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(2).click()
        await browser.keys("All Subject")
        await browser.keys("Tab")
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        allure.startStep("select recent or old when all subjects selected event triggered - 9201018",true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201018",userID,localData)).toEqual(true)
        allure.endStep()
    }) 

    it("320434 TC_09 Validate the U_event_id 9201019 m_desc select subject in filter ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], "free")
        userID = await getUserId()
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectQuestionTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectQuestionTab.click()
        await BookMarksPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(2).click()
        await browser.keys("Mathematics")
        await browser.keys("Tab")
        allure.startStep("select subject in filter event triggered - 9201019",true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9201019",userID,localData)).toEqual(true)
        allure.endStep()
    }) 
})