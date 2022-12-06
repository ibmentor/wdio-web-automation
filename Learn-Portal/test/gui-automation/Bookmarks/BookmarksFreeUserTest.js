import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import { loginData } from "../../../Data/LoginData"
import ConceptVideoPage from "../../../Pages/ConceptVideoPage"
import BookMarksPage from "../../../Pages/BookMarksPage"
import ChapterWiseTestsPage from "../../../Pages/ChapterWiseTestsPage"
import AdaptivePracticeQuestionsPage from "../../../Pages/AdaptivePracticeQuestionsPage"

describe("Learn Portal - Bookmarks module testcases for Free user", async () => {
    before("", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
        await ConceptVideoPage.navigateToConceptVideo()
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        try{await $("(//*[contains(text(),'Important Question')]/../../..//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})}catch{}
        try{await $("(//*[contains(text(),'Important Question')]/../../..//*[@class='mdi mdi-bookmark-outline'])[1]").waitForDisplayed({timeout:5500})}catch{}
        let bookmarkedCount = await $$("//*[contains(text(),'Important Question')]/../../..//*[@class='mdi mdi-bookmark']").length
        let bookamrk = 3-bookmarkedCount
        if (bookmarkedCount != 3 && bookmarkedCount<4){
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(text(),'Important Question')]/../../..//*[@class='mdi mdi-bookmark-outline'])[${1}]`).scrollIntoView({block:"center"})
                await $(`(//*[contains(text(),'Important Question')]/../../..//*[@class='mdi mdi-bookmark-outline'])[${1}]`).click()
                await browser.pause(1500)
            }
        }
    })
    
    it("306443 TC_01 Free user - Check the three sections of the Bookmarks landing page.", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Wait for Subject Bookmarks Label to be displayed",true)
        await BookMarksPage.labelSubjectBookmarks.waitForDisplayed({timeout : 3500})
        allure.startStep("Validate Subject Bookmarks Label on Bookmarks Landing Page",true)
        expect(await BookMarksPage.labelSubjectBookmarks.isDisplayed()).toEqual(true)
        allure.startStep("Validate Bookmarks Categories on Bookmarks Landing Page",true)
        expect(await BookMarksPage.labelBookmarkedCategories.isDisplayed()).toEqual(true)
        allure.startStep("Validate Recent Bookmarks on Bookmarks Landing Page",true)
        expect(await BookMarksPage.labelRecentBookmarks.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    
    it("306444 TC_02 Free user - Subject bookmark - Validate Total Bookmarks / Cards - Subject, Date, and Bookmark Count / Left Right Nevigation Buttons", async () =>{
        
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

    it("306445 TC_03 Free user - Chapter Summaries - Cards - Title, Date, and Bookmark Count", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        
        allure.startStep("Wait for Bookmarked Categories Questions tab to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate Bookmarked Categories Tab count",true)
        expect(await BookMarksPage.bookmarkedCategoriesCardCount.length).toEqual(2)
        
        allure.startStep("Validate Bookmarked Categories Question tab Title",true)
        expect(await BookMarksPage.bookmarkedCategoriesQuestions.isDisplayed()).toEqual(true)
        if (await BookMarksPage.bookmarkedCategoriesQuestionsBookmarked.getText() != "No bookmarks yet"){
            allure.startStep("Validate Bookmarked Categories Question tab Date",true)
            expect(await BookMarksPage.bookmarkedCategoriesQuestionsDate.getText()).toContain("Last updated")
        }
        allure.startStep("Validate Bookmarked Categories Question tab Bookmark count",true)
        expect(await BookMarksPage.bookmarkedCategoriesQuestionsBookmarked.isDisplayed()).toEqual(true)
        
        allure.startStep("Validate Bookmarked Categories Chapter Summaries tab Title",true)
        expect(await BookMarksPage.bookmarkedCategoriesChapterSummaries.isDisplayed()).toEqual(true)
        if (await BookMarksPage.bookmarkedCategoriesChapterSummariesBookmarked.getText() != "No bookmarks yet"){
            allure.startStep("Validate Bookmarked Categories Chapter Summaries tab Date",true)
            expect(await BookMarksPage.bookmarkedCategoriesChapterSummariesDate.getText()).toContain("Last updated")
        }
        allure.startStep("Validate Bookmarked Categories Chapter Summaries tab Bookmark count",true)
        expect(await BookMarksPage.bookmarkedCategoriesChapterSummariesBookmarked.isDisplayed()).toEqual(true)
        allure.endStep()
    })

    it("306446 TC_04 Free user - Recent Bookmarks - Cards - Description, Subject, Date, View Answers/Read Summary Button, and Bookmark Button", async () =>{
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()

        allure.startStep("Wait for Recent Bookmarks Tab to be displayed",true)
        await BookMarksPage.labelRecentBookmarks.waitForDisplayed({timeout : 3000})
        await BookMarksPage.labelRecentBookmarks.scrollIntoView()
        
        allure.startStep("Get Recent Bookmarks Card Count",true)
        let subCount = await BookMarksPage.recentBookmarksCardCount.length
        if (subCount>0){
            for (let i=1;i<=subCount;i++){
                allure.startStep("Validate card Details - Description, Subject, Date, View Answers/Read Summary Button, and Bookmark Button",true)
                expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(2)
                if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                    expect(true).toEqual(true)
                }
                else if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
                    expect(true).toEqual(true)
                }
                else{
                    expect(false).toEqual(true)
                }
            }
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 3500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("306447 TC_05 Free user - Navigation to concept video, Ask a dobt, CWT, and Downloads module", async () =>{
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

    it("306448 TC_06A Free user - Subject bookmark Page - Validate Total Bookmarks / Cards - Subject, Date, and Bookmark Count / Left Right Nevigation Buttons", async () =>{
        
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
            let bookmarkedCount = parseInt(await $("(//*[@class='fw-bold'])[2]").getText())
            if (bookmarkedCount>0){
                allure.startStep("Validate Description, Date, View Answer, and Bookmark Button are displayed",true)
                for (let i=1;i<=bookmarkedCount && i<=10;i++){
                    expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                    expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                    expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(1)
                    if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                        expect(true).toEqual(true)
                    }
                    else if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
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
        } 
        allure.endStep()       
    })

    it("306449 TC_06B Free user - Subject bookmark Page - Validate Total Bookmarks / Cards - Subject, Date, and Bookmark Count / Left Right Nevigation Buttons", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
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
            await BookMarksPage.subjectBookmarkChapterSummaries.waitForDisplayed({timeout : 3000})
            allure.startStep("Select Chapter Summaries under Subject bookmark page",true)
            await BookMarksPage.subjectBookmarkChapterSummaries.click()
            await browser.pause(600)
            allure.startStep("Get the card count for selected Subject",true)
            let bookmarkedCount = parseInt(await $("(//*[@class='fw-bold'])[3]").getText())
            let totalBookmarkCount = parseInt(await BookMarksPage.subjectBookmarkPageSelectSubjectBookmarkCount.getText())
            if (bookmarkedCount>0){
                allure.startStep("Validate Description, Date, Read Summary, and Bookmark Button are displayed",true)
                for (let i=totalBookmarkCount-bookmarkedCount+1;i<=totalBookmarkCount && i<=10;i++){
                    expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                    expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                    expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(1)
                    if(await BookMarksPage.recentBookmarksCardViewAnswer(i).isDisplayed()){
                        expect(true).toEqual(true)
                    }
                    else if(await BookMarksPage.recentBookmarksCardReadSummary(i).isDisplayed()){
                        expect(true).toEqual(true)
                    }
                    else{
                        expect(false).toEqual(true)
                    }
                }
            }
            else{
                if(await BookMarksPage.noBookmarksBlock().isDisplayed()){
                    allure.startStep("Validate No Bookmarks Block",true)
                    expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
                }
                else if(await BookMarksPage.noBookmarksBlock(2).isDisplayed()){
                    allure.startStep("Validate No Bookmarks Block",true)
                    expect(await BookMarksPage.noBookmarksBlock(2).isDisplayed()).toEqual(true)
                }
            }
        } 
        allure.endStep()       
    })

    it("306450 TC_07A Free user - Subject Bookmarks - Validation of view answer under Questions tab", async () =>{
        
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
            let bookmarkedCount = parseInt(await $("(//*[@class='fw-bold'])[2]").getText())
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

    it("306451 TC_07B Free user - Subject bookmark - Validation of Read Summary under Chapter Summaries tab", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        await browser.refresh()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 7000})
        allure.startStep("Click Active Subject Card under Subject Bookmarks",true)
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.click()
        await BookMarksPage.mainPageBookmarkFirstSubject.waitForDisplayed({timeout : 3000})
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
            let bookmarkedCount = parseInt(await $("(//*[@class='fw-bold'])[3]").getText())
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

    it("306452 TC_09 Free user - Validation Description, Date, View Answer/Read Summary, and Bookmark Button for Bookmarked Categories", async () =>{

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
        let totalBookmarkCount = parseInt(await BookMarksPage.recentBookmarksCardCount.length)
        if (bookmarkChapterSummariesCount>0){
            allure.startStep("Validate Description, Date, Read Summary, and Bookmark Button are displayed",true)
            for (let i=totalBookmarkCount-bookmarkChapterSummariesCount+1;i<=totalBookmarkCount && i<=10;i++){
                expect(await BookMarksPage.recentBookmarksCardDiscription(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardBookmarkButton(i).isDisplayed()).toEqual(true)
                expect(await BookMarksPage.recentBookmarksCardSubjectAndDate(i).length).toEqual(2)
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
            await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("306453 TC_10 Free user - Bookmarked Categories - Validation of view answer and Read Summary under Questions tab and Chapter Summaries tab", async () =>{

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
        let totalBookmarkCount = parseInt(await BookMarksPage.recentBookmarksCardCount.length)
        if (bookmarkChapterSummariesCount>0){
            for (let i=totalBookmarkCount-bookmarkChapterSummariesCount+1;i<=totalBookmarkCount && i<=10;i++){
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

    it("306454 TC_13 Free user - Uncheck the bookmark and make sure the details are getting deleted", async () =>{
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Get Recent Bookmarks Card Count",true)
        let subCount = await BookMarksPage.recentBookmarksCardCount.length
        if (subCount>0){
            allure.startStep("Wait for Recent Bookmarks 1st card to be displayed",true)
            await BookMarksPage.recentBookmarksCardDiscription(1).waitForDisplayed({timeout : 4500})
            await BookMarksPage.recentBookmarksCardDiscription(1).scrollIntoView()
            allure.startStep("Get the description for Recent Bookmarks 1st card to be displayed",true)
            let text = await BookMarksPage.recentBookmarksCardDiscription(1).getText()
            expect(await BookMarksPage.findElementByText(text).isDisplayed()).toEqual(true)
            allure.startStep("Click Bookmarked button to uncheck 1st Card",true)
            await BookMarksPage.recentBookmarksCardBookmarkButton(1).click()
            await browser.pause(600)
            allure.startStep("Validate removed Bookmarked element should not be visible",true)
            expect(await BookMarksPage.findElementByText(text).isDisplayed()).toEqual(false)
        }
        else{
            allure.startStep("Wait for No Bookmarks Block to be displayed",true)
            await BookMarksPage.noBookmarksBlock().waitForDisplayed({timeout : 4500})
            allure.startStep("Validate No Bookmarks Block",true)
            expect(await BookMarksPage.noBookmarksBlock().isDisplayed()).toEqual(true)
        }
        allure.endStep()
    })

    it("306455 TC_14 Free user - Bookmark from Concept Videos and verify that comes under Bookmark module", async () =>{
        
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
        let btnBookmark = $("(//i[@class='mdi mdi-bookmark'])[1]")
        try{await btnBookmark.waitForDisplayed({timeout : 4500})}
        catch{}
        if (await btnBookmark.isDisplayed()){
            allure.startStep("Click bookmark button", true)        
            await btnBookmark.click()
            conceptVideoBookmarkDescription = await $("(//i[@class='mdi mdi-bookmark'])[1]/../../..//*[@class='content']").getText()
        }
        else{
            let btnBookmarked = $("(//i[@class='pointer mdi mdi-bookmark-outline'])[1]")
            await btnBookmarked.waitForDisplayed({timeout : 4500})
            allure.startStep("Click bookmarked button", true)        
            await btnBookmarked.click()
            await btnBookmark.waitForDisplayed({timeout : 3500})
            allure.startStep("Click bookmark button", true)        
            await btnBookmark.click()
            conceptVideoBookmarkDescription = await $("(//i[@class='pointer mdi mdi-bookmark'])[1]/../../..//*[@class='content']").getText()
        }
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate Bookmark from Concept Videos and verify that comes under Bookmark module", true)        
        await BookMarksPage.findElementByText(conceptVideoBookmarkDescription).isDisplayed()
        allure.endStep()
    }) 
    
    it("306456 TC_15 Free user - Bookmark from CWT and verify that comes under Bookmark module", async () =>{
        
        let CWTBookmarkDescription
        let cohortDetail = loginData.sanityData.cohortDetails[8]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')

        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()

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
        
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate Bookmark from CWT and verify that comes under Bookmark module", true)  
        expect(await BookMarksPage.recentBookmarksCardDiscription(1).getText()).toHaveTextContaining(CWTBookmarkDescription)
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).waitForDisplayed({timeout : 4500})
        await BookMarksPage.recentBookmarksCardBookmarkButton(1).click()
        await BookMarksPage.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 10000})
        allure.endStep()
    })
    
    it("306457 TC_16 Free user - Bookmark from APQ and verify that comes under Bookmark module", async () =>{
        
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
    
})
