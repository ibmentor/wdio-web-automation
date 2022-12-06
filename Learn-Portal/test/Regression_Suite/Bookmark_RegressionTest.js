import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import DownloadsPage from "../../Pages/DownloadsPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"
import {checkLazyLoadingImgCount, ConceptVideoBanner} from "../../utils/function.js"
import {BookmarkData} from "../../Data/BookMarksData"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"

describe("Learn Portal - Bookmarks module testcases for Free user", async () => {

    before("", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
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
        let bookamrk = 4-bookmarkedCount
        if (bookmarkedCount != 4 && bookmarkedCount<5){
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
                await browser.pause(3000)
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
                await browser.pause(3000)
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
                await browser.refresh()
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).waitForDisplayed({timeout:40000})
            }
        }
        
    })
    
        
    it("315857 TC_02 Free user - Subject bookmark - Validate Total Bookmarks / Cards - Subject, Date, and Bookmark Count / Left Right Nevigation Buttons", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Get the total number of Subject Card under Subject Bookmarks",true)
        let count = await BookMarksPage.subjectBookmarksCardCount.length
        for (let i=1;i<=count;i++){
            try {
                allure.startStep("Wait for Subject Card Name under Subject Bookmarks to be displayed",true)
                await BookMarksPage.subjectBookmarksCardSubjectName(i).waitForDisplayed({timeout : 3000})
            }catch{}
            allure.startStep("Validate Subject Card Name under Subject Bookmarks is displayed",true)
            expect(await BookMarksPage.subjectBookmarksCardSubjectName(i).isDisplayed()).toEqual(true)
            allure.startStep("Wait for Subject Card Bookmark count under Subject Bookmarks to be displayed",true)
            await BookMarksPage.subjectBookmarksCardBookmarkCount(i).waitForDisplayed({timeout : 3000})
            allure.startStep("Validate Subject Card Bookmark count under Subject Bookmarks is displayed",true)
            expect(await BookMarksPage.subjectBookmarksCardBookmarkCount(i).isDisplayed()).toEqual(true)
            allure.startStep("Validate Subject Card Date under Subject Bookmarks is displayed",true)
            expect(await BookMarksPage.subjectBookmarksCardBookmarkDate(i).isDisplayed()).toEqual(true)
        }
        if (await BookMarksPage.btnSubjectBookmarksRightNevigation.isDisplayed({timeout : 2500})){
            allure.startStep("Click on Right Navigation button under Subject Bookmarks",true)
            await BookMarksPage.btnSubjectBookmarksRightNevigation.click()
            allure.startStep("Click on Left Navigation button under Subject Bookmarks",true)
            await BookMarksPage.btnSubjectBookmarksLeftNevigation.click()
        }
        await browser.refresh()
        allure.startStep("Wait for Active Subject Card under Subject Bookmarks to be displayed",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 7000})
        allure.startStep("Click Active Subject Card under Subject Bookmarks",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.click()
        allure.startStep("Wait for Subject list under Subject Bookmarks page to be displayed",true)
        await BookMarksPage.mainPageBookmarkFirstSubject.waitForDisplayed({timeout : 3000})
        allure.startStep("Get the Subject list count under Subject Bookmarks page",true)
        let subCount = await BookMarksPage.subjectBookmarkPageSelectSubjectCount.length
        let bookmarkCount = []
        allure.startStep("Get Subject list Bookmark count under Subject Bookmarks",true)
        for(let i=1;i<=subCount;i++){
            await BookMarksPage.subjectBookmarkPageSelectSubject(i).waitForDisplayed({timeout : 3000})
            await BookMarksPage.subjectBookmarkPageSelectSubject(i).click()
            await browser.pause(1000)
            await BookMarksPage.subjectBookmarkPageSelectSubjectBookmarkCount.waitForDisplayed({timeout : 3000})
            bookmarkCount.push(parseInt(await BookMarksPage.subjectBookmarkPageSelectSubjectBookmarkCount.getText()))
        }
        let totalBookmarksCount = 0
        bookmarkCount.forEach(x => {
            totalBookmarksCount += x;
        });
        console.log(totalBookmarksCount)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.mainPageBookmarkCount.waitUntil(async function (){
            return (await BookMarksPage.mainPageBookmarkCount.getText()).includes(totalBookmarksCount)
        },{
            timeout: 15000
        })
        allure.startStep("Get Total Bookmark count under Subject Bookmarks",true)
        allure.startStep("Validate Total Bookmark count under Subject Bookmarks with Bookmark Landing Page count",true)
        expect(parseInt(await BookMarksPage.mainPageBookmarkCount.getText())).toEqual(totalBookmarksCount)
        allure.endStep()
    })

    it("315860 TC_05 Free user - Navigation to concept video, Ask a dobt, CWT, and Downloads module", async () =>{
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()

        await BookMarksPage.btnAskADoubt.waitForDisplayed({timeout : 3000})
        allure.startStep("Clock on Ask a doubt button", true)
        await BookMarksPage.btnAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await BookMarksPage.tfsearchField.setValue("solar")
        allure.startStep("Wait for first suggestions to be displalyed", true)
        await BookMarksPage.firstSuggestionAskaDoubt.waitForDisplayed({timeout:4500})
        allure.startStep("Click on first suggestions", true)
        await BookMarksPage.firstSuggestionAskaDoubt.click()
        await browser.pause(2000)
        allure.startStep("Validate banner of Ask a doubt module", true)
        expect(await browser.getUrl()).toContain("ask-a-doubt")
        
        await browser.back();
        
        await BookMarksPage.btnTakeATest.waitForDisplayed({timeout : 5000})
        allure.startStep("Click on Take A Test button", true)
        await BookMarksPage.btnTakeATest.click()
        allure.startStep("Validate navigating to Take A Test page", true)
        expect(await browser.getUrl()).toHaveTextContaining("chapter-wise-tests")
        
        await browser.back();
        
        await BookMarksPage.btnDownloads.waitForDisplayed({timeout : 5000})
        allure.startStep("Click on Downloads button", true)
        await BookMarksPage.btnDownloads.click()
        allure.startStep("Validate navigating to Downloads page", true)
        expect(await browser.getUrl()).toHaveTextContaining("downloads")
        
        await browser.back();
        
        await BookMarksPage.btnConceptVideos.waitForDisplayed({timeout : 5000})
        allure.startStep("Click on Concept Videos button", true)
        await BookMarksPage.btnConceptVideos.click()
        allure.startStep("Validate navigating to Concept Videos page", true)
        expect(await browser.getUrl()).toHaveTextContaining("concept-videos")
        allure.endStep()
    })

    it("315861 TC_06A Free user - Subject bookmark Page - Validate Total Bookmarks / Cards - Subject, Date, and Bookmark Count / Left Right Nevigation Buttons", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Navigate to Bookmarks Page",true)
        await browser.refresh()
        allure.startStep("Wait for Active Subject Card under Subject Bookmarks to be displayed",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 7000})
        allure.startStep("Click Active Subject Card under Subject Bookmarks",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.click()
        allure.startStep("Wait for Subject list under Subject Bookmarks page to be displayed",true)
        await BookMarksPage.mainPageBookmarkFirstSubject.waitForDisplayed({timeout : 3000})
        allure.startStep("Get the Subject list count under Subject Bookmarks page",true)
        let subCount = await BookMarksPage.subjectBookmarkPageSelectSubjectCount.length
        for(let j=1;j<=subCount;j++){
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).waitForDisplayed({timeout : 3000})
            allure.startStep("Select Subject under Subject bookmark page",true)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).click()
            await browser.pause(600)
            allure.startStep("Get the card count for selected Subject",true)
            let bookmarkedCount = parseInt(await $("(//*[contains(@class,'fw-bold')])[1]").getText())
            if (bookmarkedCount>0){
                allure.startStep("Validate Description, Date, View Answer, and Bookmark Button are displayed",true)
                await BookMarksPage.subjectBookmarkElementsCheck(bookmarkedCount)
            }
            else{
                allure.startStep("Wait for No Bookmarks Block to be displayed",true)
                await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
                allure.startStep("Validate No Bookmarks Block",true)
                expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
            } 
        } 
        allure.endStep()       
    })

    it("315863 TC_07A Free user - Subject Bookmarks - Validation of view answer under Questions tab", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 7000})
        allure.startStep("Click Active Subject Card under Subject Bookmarks",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.click()
        await BookMarksPage.mainPageBookmarkFirstSubject.waitForDisplayed({timeout : 3000})
        allure.startStep("Get the Subject list count under Subject Bookmarks page",true)
        let subCount = await BookMarksPage.subjectBookmarkPageSelectSubjectCount.length
        for(let j=1;j<=subCount;j++){
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).waitForDisplayed({timeout : 4000})
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).scrollIntoView()
            allure.startStep("Wait for Subject under Subject bookmark page to be clickable",true)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).waitForClickable({timeout : 4000})
            allure.startStep("Select Subject under Subject bookmark page",true)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).click()
            await browser.pause(600)
            allure.startStep("Get the card count for selected Subject",true)
            let bookmarkedCount = parseInt(await $("(//*[contains(@class,'fw-bold')])[2]").getText())
            if (bookmarkedCount>0){
                for (let i=1;i<=bookmarkedCount && i<=10;i++){
                    if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                        allure.startStep("Validate View Answer Button and the popup for View Answer",true)
                        await BookMarksPage.recentBookmarksCardViewAnswer(i).waitForDisplayed({timeout : 4500})
                        expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                        await BookMarksPage.recentBookmarksCardViewAnswer(i).click()
                        await BookMarksPage.popupQuestionTitle.waitForDisplayed({timeout : 3000})
                        allure.startStep("Validate View Answer popup Title",true)
                        expect(await BookMarksPage.popupQuestionTitle.isDisplayed()).toEqual(true)
                        await BookMarksPage.popupCloseButton.click()
                    }
                    else{
                        expect(false).toEqual(true)
                    }
                }
            }
        }   
        allure.endStep()     
    })

    it("315864 TC_07B Free user - Subject bookmark - Validation of Read Summary under Chapter Summaries tab", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await browser.refresh()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 10000})
        allure.startStep("Click Active Subject Card under Subject Bookmarks",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.click()
        await BookMarksPage.mainPageBookmarkFirstSubject.waitForDisplayed({timeout : 10000})
        allure.startStep("Get the Subject list count under Subject Bookmarks page",true)
        let subCount = await BookMarksPage.subjectBookmarkPageSelectSubjectCount.length
        for(let j=1;j<=subCount;j++){
            await browser.pause(1000)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).scrollIntoView({block:"center"})
            await browser.keys(["PageUp","PageUp","PageUp"])
            allure.startStep("Wait for Subject under Subject bookmark page to be clickable",true)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).waitForClickable({timeout : 4000})
            allure.startStep("Select Subject under Subject bookmark page",true)
            await BookMarksPage.subjectBookmarkPageSelectSubject(j).click()
            allure.startStep("Select Chapter Summaries under Subject bookmark page",true)
            await BookMarksPage.subjectBookmarkChapterSummaries.click()
            await browser.pause(600)
            allure.startStep("Get the card count for selected Subject",true)
            let bookmarkedCount = parseInt(await $("(//*[contains(@class,'fw-bold')])[2]").getText())
            let totalBookmarkCount = parseInt(await BookMarksPage.subjectBookmarkPageSelectSubjectBookmarkCount.getText())
            if (bookmarkedCount>0){
                for (let i=totalBookmarkCount-bookmarkedCount+1;i<=totalBookmarkCount && i<=10;i++){
                    if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
                        await BookMarksPage.recentBookmarksCardReadSummary(i).waitForDisplayed({timeout : 4500})
                        allure.startStep("Validate Read Summary Button and the popup for Read Summary",true)
                        await BookMarksPage.recentBookmarksCardReadSummary(i).click()
                        await BookMarksPage.popupChapterSummariesTitle.waitForDisplayed({timeout : 3000})
                        allure.startStep("Validate Read Summary popup Title",true)
                        expect(await BookMarksPage.popupChapterSummariesTitle.isDisplayed()).toEqual(true)
                        await BookMarksPage.popupCloseButton.click()
                    }
                    else{
                        expect(false).toEqual(true)
                    }
                }
            }
        }        
        allure.endStep()
    })

    it("315865 TC_09 Free user - Validation Description, Date, View Answer/Read Summary, and Bookmark Button for Bookmarked Categories", async () =>{

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await browser.refresh()
        allure.startStep("Wait for Bookmarked Categories Questions Tab to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.waitForDisplayed({timeout : 5000})
        allure.startStep("Click Bookmarked Categories Questions Tab",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.click()
        allure.startStep("Wait for Bookmarked Categories Questions Tab Header to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesHeader.waitForDisplayed({timeout : 4500})
        allure.startStep("Validate Bookmarked Categories Questions Tab Header",true)
        expect(await BookMarksPage.bookmarkedCategoriesHeader.isDisplayed()).toEqual(true)
        allure.startStep("Get the count of cards under Bookmarked Categories Questions Tab",true)
        let bookmarkQuestionsCount = parseInt(await BookMarksPage.bookmarkedCategoriesQuestionsBookmarkCount.getText())
        if (bookmarkQuestionsCount>0){
            allure.startStep("Validate Description, Date, View Answer, and Bookmark Button are displayed",true)
            for (let i=1;i<=bookmarkQuestionsCount && i<=10;i++){
                expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(2)
                if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                    expect(true).toEqual(true)
                }
                else{
                    expect(false).toEqual(true)
                }
            }
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
                await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
                allure.startStep("Validate No Bookmarks Block",true)
                expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
        } 
        allure.startStep("Select Chapter Summaries under Subject bookmark page",true)
        await BookMarksPage.subjectBookmarkChapterSummaries.click()
        await browser.pause(700)
        let bookmarkChapterSummariesCount = parseInt(await BookMarksPage.bookmarkedCategoriesChapteSummariesBookmarkCount.getText())
        let totalBookmarkCount = bookmarkChapterSummariesCount+bookmarkQuestionsCount
        if (bookmarkChapterSummariesCount>0){
            allure.startStep("Validate Description, Date, Read Summary, and Bookmark Button are displayed",true)
            for (let i=totalBookmarkCount-bookmarkChapterSummariesCount+1;i<=totalBookmarkCount && i<=10;i++){
                expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(2)
            }
            for (let i=1;i<=bookmarkChapterSummariesCount && i<=10;i++){
                if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
                    expect(true).toEqual(true)
                }
                else{
                    expect(false).toEqual(true)
                }
            }
            
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            if(await BookMarksPage.noBookmarksBlock().isDisplayed()){
            await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
            }else{
                let noBookmarkText=await $("(//*[text()='No bookmarks to show yet'])[2]")
                expect(await noBookmarkText.isDisplayed({timeout:5000})).toEqual(true)
            }
        }
        allure.endStep()
    })

    it("315866 TC_10 Free user - Bookmarked Categories - Validation of view answer and Read Summary under Questions tab and Chapter Summaries tab", async () =>{

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await browser.refresh()
        allure.startStep("Wait for Bookmarked Categories Questions Tab to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.waitForDisplayed({timeout : 5000})
        allure.startStep("Click Bookmarked Categories Questions Tab",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.click()
        allure.startStep("Wait for Bookmarked Categories Questions Tab Header to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesHeader.waitForDisplayed({timeout : 4500})
        allure.startStep("Validate Bookmarked Categories Questions Tab Header",true)
        expect(await BookMarksPage.bookmarkedCategoriesHeader.isDisplayed()).toEqual(true)
        allure.startStep("Get the count of cards under Bookmarked Categories Questions Tab",true)
        let bookmarkQuestionsCount = parseInt(await BookMarksPage.bookmarkedCategoriesQuestionsBookmarkCount.getText())
        if (bookmarkQuestionsCount>0){
            for (let i=1;i<=bookmarkQuestionsCount && i<=10;i++){
                if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                    allure.startStep("Validate View Answer Button and the popup for View Answer",true)
                    expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                    await BookMarksPage.recentBookmarksCardViewAnswer(i).click()
                    await BookMarksPage.popupQuestionTitle.waitForDisplayed({timeout : 3000})
                    expect(await BookMarksPage.popupQuestionTitle.isDisplayed()).toEqual(true)
                    await BookMarksPage.popupCloseButton.click()
                }
                else{
                    expect(false).toEqual(true)
                }
            }
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
        } 
        
        await browser.keys(["PageUp","PageUp","PageUp","PageUp","PageUp"])
        await browser.pause(500)
        allure.startStep("Select Chapter Summaries under Subject bookmark page",true)
        await BookMarksPage.subjectBookmarkChapterSummaries.click()
        await browser.pause(700)
        let bookmarkChapterSummariesCount = parseInt(await BookMarksPage.bookmarkedCategoriesChapteSummariesBookmarkCount.getText())
        if (bookmarkChapterSummariesCount>0){
            for (let i=1;i<=bookmarkChapterSummariesCount && i<=10;i++){
                if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
                    allure.startStep("Validate Read Summary Button and the popup for Read Summary",true)
                    await BookMarksPage.recentBookmarksCardReadSummary(i).waitForDisplayed({timeout : 4500})
                    await BookMarksPage.recentBookmarksCardReadSummary(i).click()
                    await BookMarksPage.popupChapterSummariesTitle.waitForDisplayed({timeout : 3000})
                    expect(await BookMarksPage.popupChapterSummariesTitle.isDisplayed()).toEqual(true)
                    await BookMarksPage.popupCloseButton.click()
                }
                else{
                    expect(false).toEqual(true)
                }
            }
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(2).waitForDisplayed({timeout : 4500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(2).isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("315868 TC_14 Free user - Bookmark from Concept Videos and verify that comes under Bookmark module", async () =>{
        
        let conceptVideoBookmarkDescription
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Concept Video Page",true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Wait for main play button to be clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
        allure.startStep("Click main play button", true)
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await ConceptVideoPage.btnRightNavigationIMPQues.waitForClickable({ timeout: 45000 })
        let btnBookmark = $("(//i[@class='mdi mdi-bookmark-outline'])[1]")
        try{await btnBookmark.waitForDisplayed({timeout : 4500})}
        catch{}
        if (await btnBookmark.isDisplayed()){
            allure.startStep("Click bookmark button", true)        
            await btnBookmark.click()
            conceptVideoBookmarkDescription = await $("(//i[@class='mdi mdi-bookmark-outline'])[1]/../../..//*[@class='content']").getText()
        }
        else{
            let btnBookmarked = $("(//i[@class='mdi mdi-bookmark-outline'])[1]")
            await btnBookmarked.waitForDisplayed({timeout : 4500})
            allure.startStep("Click bookmarked button", true)        
            await btnBookmarked.click()
            await btnBookmark.waitForDisplayed({timeout : 3500})
            allure.startStep("Click bookmark button", true)        
            await btnBookmark.click()
            conceptVideoBookmarkDescription = await $("(//i[@class='mdi mdi-bookmark-outline'])[1]/../../..//*[@class='content']").getText()
        }
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate Bookmark from Concept Videos and verify that comes under Bookmark module", true)        
        await BookMarksPage.findElementByText(conceptVideoBookmarkDescription).isDisplayed()
        allure.endStep()
    }) 
    
    it("315869 TC_15 Free user - Bookmark from CWT and verify that comes under Bookmark module", async () =>{
        
        let CWTBookmarkDescription
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')

        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        if( await ChapterWiseTestsPage.btnRetakeTest.isDisplayed()){

        await ChapterWiseTestsPage.btnRetakeTest.waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.btnRetakeTest.moveTo()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.btnRetakeTest.click()
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.click()
        let byjusLogo = $("//*[@class='topnav-logo-lg']/img[@alt='logo']")
        try{
            await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({timeout : 4500})
        }catch{}
        if (await ChapterWiseTestsPage.btnBookmark.isDisplayed()){
            allure.startStep("Click bookmark button", true)
            await ChapterWiseTestsPage.btnBookmark.click()
            CWTBookmarkDescription = await ChapterWiseTestsPage.testQuestionDescription.getText()
            allure.startStep("Click Byjus logo", true)
            await byjusLogo.click()
        }
        else{
            let btnBookmarked = $("//*[@class='mdi mdi-bookmark not-bookmarked me-2']")
            await btnBookmarked.waitForDisplayed({timeout : 4500})
            allure.startStep("Click bookmarked button", true)  
            await btnBookmarked.click()
            await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({timeout : 3000})
            allure.startStep("Click bookmark button", true)  
            await ChapterWiseTestsPage.btnBookmark.click()
            CWTBookmarkDescription = await ChapterWiseTestsPage.testQuestionDescription.getText()
            await byjusLogo.click()
        }
    }
        
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate Bookmark from CWT and verify that comes under Bookmark module", true)
        console.log(CWTBookmarkDescription,"************");
        expect(await BookMarksPage.recentBookmarksCardDiscription(1).getText()).toHaveTextContaining(CWTBookmarkDescription)
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).waitForDisplayed({timeout : 4500})
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).click()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 10000})
        allure.endStep()
    })
    
    it("315870 TC_16 Free user - Bookmark from APQ and verify that comes under Bookmark module", async () =>{
        
        let APQBookmarkDescription
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        
        allure.startStep("Navigate to APQ menu", true)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        let questionDescription = $("//*[@class='practice_FIBOption__1VDj4']/p")
        try{await AdaptivePracticeQuestionsPage.resumeButton.waitForDisplayed({timeout : 3500})}
        catch{}
        if(await AdaptivePracticeQuestionsPage.resumeButton.isDisplayed({timeout : 3500})){
            allure.startStep("Click resume button", true)
            await AdaptivePracticeQuestionsPage.resumeButton.click()
            try{await AdaptivePracticeQuestionsPage.btnBookMark.waitForDisplayed({timeout : 3500})}
            catch{}
            if(await AdaptivePracticeQuestionsPage.btnBookMark.isDisplayed()){
                allure.startStep("Click bookmark button", true)
                await AdaptivePracticeQuestionsPage.btnBookMark.click()
                await questionDescription.waitForDisplayed({timeout : 4500})
                APQBookmarkDescription = await questionDescription.getText()
            }
            else{
                let btnBookmarked = $("//*[@class='mdi mdi-bookmark not-bookmarked']")
                await btnBookmarked.waitForDisplayed({timeout : 3000})
                allure.startStep("Click bookmarked button", true)
                await btnBookmarked.click()
                allure.startStep("Click bookmark button", true)
                await AdaptivePracticeQuestionsPage.btnBookMark.click()
                await questionDescription.waitForDisplayed({timeout : 4500})
                APQBookmarkDescription = await questionDescription.getText()
            }
        }
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate Bookmark from APQ and verify that comes under Bookmark module", true)  
        expect(await BookMarksPage.recentBookmarksCardDiscription(1).getText()).toHaveTextContaining(APQBookmarkDescription)
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).waitForDisplayed({timeout : 4500})
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).click()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 10000})
        allure.endStep()
    })

    it('327254 TC_17 subjective card filter Question Tab',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(3000)
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).waitForDisplayed({timeout:5000})
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCount(1).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterQuestionTab.getText(),"######");
        await BookMarksPage.selectedFilterQuestionTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterQuestionTab.getText()).toEqual("Recent")
        let recentFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(3000)
        await BookMarksPage.selectedFilterQuestionTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterQuestionTab.getText()).toEqual("Old")
        let oldFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        expect(await oldFirstTopicName == recentFirstTopicName).toEqual(false)
        console.log(oldFirstTopicName,"*******",recentFirstTopicName);
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327255 TC_18 subjective card filter chapter summaries Tab',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        await AllSubjectsPage.navigateToAllSubjects()
        let subject="Mathematics"
        await BookMarksPage.bookmarkChapterFlow(subject)
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).waitForDisplayed({timeout:5000})
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).click()
        await BookMarksPage.cardTabs(2).waitForDisplayed({timeout:10000})
        await BookMarksPage.cardTabs(2).click()
        let cardCount= await BookMarksPage.bookmarkCardCount(2).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount >= 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText(),"######");
        await BookMarksPage.selectedFilterChapterSummariesTab(1).waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText()).toEqual("Recent")
        let recentFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(2000)
        await BookMarksPage.selectedFilterChapterSummariesTab(1).waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText()).toEqual("Old")
        let oldFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        console.log(oldFirstTopicName,"*******",recentFirstTopicName);
        expect(await oldFirstTopicName == recentFirstTopicName).toEqual(false)
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327261 TC_19 subjective card filter Exam Paper Tab',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).waitForDisplayed({timeout:5000})
        await BookMarksPage.selectFirstSubjectInsubjectBookmark(subject).click()
        await BookMarksPage.cardTabs(3).waitForDisplayed({timeout:10000})
        await BookMarksPage.cardTabs(3).click()
        let cardCount= await BookMarksPage.bookmarkCardCount(3).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterExamPaperTab.getText(),"######");
        await BookMarksPage.selectedFilterExamPaperTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterExamPaperTab.getText()).toEqual("Recent")
        let recentFirstExamPaperName=await BookMarksPage.FirstExamPaperName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(2000)
        await BookMarksPage.selectedFilterExamPaperTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterExamPaperTab.getText()).toEqual("Old")
        let oldFirstExamPaperName=await BookMarksPage.FirstExamPaperName.getText()
        expect(await recentFirstExamPaperName == oldFirstExamPaperName).toEqual(false)
        console.log(recentFirstExamPaperName,"*******",oldFirstExamPaperName);
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });


    it('327262 TC_20 Bookmark Categories filter Question Tab Recent Old',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectQuestionTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectQuestionTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(1).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterQuestionTab.getText(),"######");
        await BookMarksPage.selectedFilterQuestionTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterQuestionTab.getText()).toEqual("Recent")
        let recentFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.keys("Tab")
        await browser.pause(2000)
        await BookMarksPage.selectedFilterQuestionTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterQuestionTab.getText()).toEqual("Old")
        let oldFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        expect(await oldFirstTopicName == recentFirstTopicName).toEqual(false)
        console.log(oldFirstTopicName,"*******",recentFirstTopicName);
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327263 TC_21 Bookmark Categories filter Question Tab Subject',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectQuestionTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectQuestionTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(1).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(2).click()
        await browser.keys(subject)
        await browser.keys("Tab")
        await browser.pause(2000)
        let cardCount=(await $$("(//*[contains(@class,'tab-pane active')]//div[@class='bookmarkStyles_questionsTab__2tU_N']//div[@class='d-flex align-items-center'])/p[1]")).length
        for(let i=2;i<=cardCount;i++){
        expect(await BookMarksPage.subjectNameOnCards(i).getText()).toEqual(subject)
        }
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327264 TC_22 Bookmark Categories filter Chapter Summaries Tab for recent old',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        await AllSubjectsPage.navigateToAllSubjects()
        let subject="Mathematics"
        await BookMarksPage.bookmarkChapterFlow(subject)
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectedChapterSummariesTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectedChapterSummariesTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(2).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText(),"######");
        await BookMarksPage.selectedFilterChapterSummariesTab(1).waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText()).toEqual("Recent")
        let recentFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.keys("Tab")
        await browser.pause(2000)
        await BookMarksPage.selectedFilterChapterSummariesTab(1).waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterChapterSummariesTab(1).getText()).toEqual("Old")
        let oldFirstTopicName=await BookMarksPage.FirstTopicName.getText()
        expect(await oldFirstTopicName == recentFirstTopicName).toEqual(false)
        console.log(oldFirstTopicName,"*******",recentFirstTopicName);
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327265 TC_23 Bookmark Categories filter Chapter Summaries Tab for subject',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        await AllSubjectsPage.navigateToAllSubjects()
        let subject="Mathematics"
        await BookMarksPage.bookmarkChapterFlow(subject)
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectedChapterSummariesTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectedChapterSummariesTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(2).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(2).click()
        await browser.keys(subject)
        await browser.keys("Enter")
        await browser.pause(2000)
        let cardCount=(await $$("(//*[contains(@class,'tab-pane active')]//div[@class='bookmarkStyles_questionsTab__2tU_N']//div[@class='d-flex align-items-center'])/p[1]")).length
        for(let i=2;i<=cardCount;i++){
        expect(await BookMarksPage.subjectNameOnCards(i).getText()).toEqual(subject)
        }
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327266 TC_24 Bookmark Categories filter Exam Paper Tab for recent old',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectedExamPaperTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectedExamPaperTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(3).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await BookMarksPage.selectedFilterExamPaperTab.getText(),"######");
        await BookMarksPage.selectedFilterExamPaperTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterExamPaperTab.getText()).toEqual("Recent")
        let recentFirstExamPaperName=await BookMarksPage.FirstExamPaperName.getText()
        await BookMarksPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(1).scrollIntoView({block:"center"})
        await browser.pause(2000)
        await BookMarksPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(2000)
        await BookMarksPage.selectedFilterExamPaperTab.waitForDisplayed({timeout:5000})
        expect(await BookMarksPage.selectedFilterExamPaperTab.getText()).toEqual("Old")
        let oldFirstExamPaperName=await BookMarksPage.FirstExamPaperName.getText()
        expect(await oldFirstExamPaperName == recentFirstExamPaperName).toEqual(false)      
        console.log(oldFirstExamPaperName,"*******",recentFirstExamPaperName);
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });

    it('327267 TC_25 Bookmark Categories filter Exam Paper Tab for subject',async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        let subject="Mathematics"
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout:3000})
        await browser.pause(2000)
        await BookMarksPage.selectedExamPaperTab.waitForDisplayed({timeout:5000})
        await BookMarksPage.selectedExamPaperTab.click()
        await BookMarksPage.cardTabs(1).waitForDisplayed({timeout:10000})
        try {            
            await $("(//div[contains(@class,'bookmarkStyles_questionsCard')])[1]").waitForDisplayed({timeout:3000})
        } catch (error) {
            
        }
        let cardCount= await BookMarksPage.bookmarkCardCountInBookmarkCategories(3).getText()
        console.log(cardCount,"$$$$$$$");
        if(cardCount > 1){
        await BookMarksPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await BookMarksPage.btnFilterDropDown(2).click()
        await browser.keys(subject)
        await browser.keys("Enter")
        await browser.pause(2000)
        let cardCount=(await $$("(//*[contains(@class,'tab-pane active')]//div[@class='d-flex align-items-center']//h4)")).length
        for(let i=1;i<=cardCount;i++){
        expect(await BookMarksPage.subjectNameOnFirstCardInExamPaper(i).getText()).toEqual(subject)
        } 
        }else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock(1).waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock(1).isDisplayed()).toEqual(true)
        }
    });
    it("331121 TC_26 Lazy loading - Verify the image loading for Bookmark module", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[6]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Validate image count in starting and end of the page", true)
        await checkLazyLoadingImgCount(BookmarkData.lazyLoadingUrl)
        allure.endStep();
    })

    it('334457 TC_27 For BTLP & NEO user in Bookmarks home page concept video card title, description & cta is changed',async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'btlp')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();

        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'doubtsOnChatUser')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })

})
