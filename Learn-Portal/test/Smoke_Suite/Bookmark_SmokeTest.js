import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import BookMarksPage from "../../Pages/BookMarksPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage"

describe("Learn Portal - Bookmarks module testcases for Free user", async () => {
    
    // before("", async () =>{
    //     allure.startStep("Login to Learn Portal", true);
    //     await LoginPage.loginToLearnPortal('free')
    //     await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9], 'free')
    //     await ConceptVideoPage.navigateToConceptVideo()
    //     await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
    //     await ConceptVideoPage.btnPlayOnMainPage.click()
    //     await browser.pause(10000)
    //     try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})}catch{}
    //     try{await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})}catch{}
    //     let bookmarkedCount = await $$("//*[@class='mdi mdi-bookmark']").length
    //     let bookamrk = 3-bookmarkedCount
    //     if (bookmarkedCount != 3 && bookmarkedCount<4){
    //         for (let i=1;i<=bookamrk;i++){
    //             await $(`(//*[contains(@class,'mdi-bookmark-outline')])[${i}]`).scrollIntoView({block:"center"})
    //             await $(`(//*[contains(@class,'mdi-bookmark-outline')])[${i}]`).click()
    //             await browser.pause(1500)
    //         }
    //     }
    // })
    
    it("315856 TC_01 Free user - Check the three sections of the Bookmarks landing page.", async () =>{//306443
        
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

    it("315858 TC_03 Free user - Chapter Summaries - Cards - Title, Date, and Bookmark Count", async () =>{//306445
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()
        
        allure.startStep("Wait for Bookmarked Categories Questions tab to be displayed",true)
        await BookMarksPage.bookmarkedCategoriesQuestions.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate Bookmarked Categories Tab count",true)
        expect(await BookMarksPage.bookmarkedCategoriesCardCount.length).toEqual(3)
        
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

    it("315859 TC_04 Free user - Recent Bookmarks - Cards - Description, Subject, Date, View Answers/Read Summary Button, and Bookmark Button", async () =>{//306446
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Bookmarks Page",true)
        await BookMarksPage.navigateToBookMarksPage()

        allure.startStep("Wait for Recent Bookmarks Tab to be displayed",true)
        await BookMarksPage.labelRecentBookmarks.waitForDisplayed({timeout : 4000})
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
                else if(await BookMarksPage.recentBookmarksCardDownload(i).isDisplayed()){
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

    it("315867 TC_13 Free user - Uncheck the bookmark and make sure the details are getting deleted", async () =>{//306454
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

})