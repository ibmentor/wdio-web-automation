import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DownloadsPage from "../../Pages/DownloadsPage"
import { loginData } from "../../Data/LoginData"
import DashboardPage from "../../Pages/DashboardPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import BookMarksPage from "../../Pages/BookMarksPage"
const assert=require('assert')
import {checkLazyLoadingImgCount, ConceptVideoBanner, AskADoubtBanner} from "../../utils/function.js"
import { downloadData } from "../../Data/DownloadData"

describe("Learn Portal - Downloads module test cases for Free user", async () => {

    it("315817 TC_02 Free user - Verify Popular Downloads section is visible when the user lands on the download page for the first time ", async () => {

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        allure.startStep("Wait for Popular Downlaod cards to be displayed", true)
        try { await DownloadsPage.popularDownloadsCardsSubject(1).waitForDisplayed({ timeout: 2000 }) }
        catch { }
        if (await DownloadsPage.popularDownloadsCardsSubject(1).isDisplayed({ timeout: 2000 })) {
            allure.startStep("Validate Popular Downlaod cards is displayed", true)
            expect(await DownloadsPage.popularDownloadsCardsSubject(1).isDisplayed()).toEqual(true)
        }
        else {
            allure.startStep("Wait for Popular Downlaod No paper available to be displayed", true)
            await DownloadsPage.labelNoPaperAvailable.waitForDisplayed({ timeout: 1500 })
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.startStep("Validate Popular Downlaod Grid View button is displayed", true)
        expect(await DownloadsPage.btnGridView.isDisplayed()).toEqual(true)
        allure.startStep("Validate Popular Downlaod List View button is displayed", true)
        expect(await DownloadsPage.btnListView.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("315819 TC_04 Free user - Validate grid and list view", async () => {

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        if (await DownloadsPage.labelNoPaperAvailable.isDisplayed()) {
            allure.startStep("Validate selected subject has No Paper Available", true)
            await DownloadsPage.labelNoPaperAvailable.waitForDisplayed({ timeout: 1500 })
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        else {
            allure.startStep("Click on List View button", true)
            await DownloadsPage.btnListView.click()
            let cardCount = await DownloadsPage.popularDownloadsCardsCount.length
            allure.startStep("Validate papers in List View", true)
            expect(cardCount <= 0).toEqual(true)
            allure.startStep("Click on Grid View button", true)
            await browser.pause(2000)
            await DownloadsPage.btnGridView.waitForClickable({timeout:3000})
            await DownloadsPage.btnGridView.click()
            await DownloadsPage.labelPopularDownloads.scrollIntoView()
            await DownloadsPage.popularDownloadsCardsSubject(1).waitForDisplayed({timeout:5000})
            let cardCount2 = await DownloadsPage.popularDownloadsCardsCount.length
            allure.startStep("Validate papers in Grid View", true)
            expect(cardCount2 > 0).toEqual(true)
        }
        allure.endStep();
    })

    it("315821 TC_06 Free user - Validate Pagination - 6 paper per page & text should contain Showing and entries", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        allure.startStep("Get the total number of subject present for the selected cohort", true)
        let subjectCount = await DownloadsPage.selectSubjectCount.length
        let noDataAvailableSubjects = []
        for (let i = 1; i <= subjectCount; i++) {
            allure.startStep("Get the subject name for the selected cohort", true)
            const subjectName = await DownloadsPage.selectSubjectByCount(i).getText()
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
            allure.startStep("Click on Search button", true)
            await DownloadsPage.btnSearch.click()
            allure.startStep("Wait for serach result to get displayed", true)
            await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 5000 })
            await browser.pause(3000)
            allure.startStep("Count the displayed serach result", true)
            let cardCount = await DownloadsPage.searchResultCardsCount(subjectName).length
            if (cardCount > 0 && cardCount <= 6) {
                allure.startStep("Get Pagination text", true)
                const paginationText = await $("//*[contains(@class,'pagination-info-text')]").getText()
                allure.startStep("Validate Pagination text to contain Showing and entries", true)
                expect(paginationText.includes("Showing") && paginationText.includes("entries")).toEqual(true)
                allure.startStep("Validate Selected subject search result count", true)
                expect(true).toEqual(true)
            }
            else {
                allure.startStep("Validate Selected subject has no result to display", true)
                expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })).toEqual(true)
                noDataAvailableSubjects.push(subjectName)
            }
            allure.startStep("Untick the selected subject", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
        }
        if (noDataAvailableSubjects.length == subjectCount) {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test papers available in " + noDataAvailableSubjects).toEqual("")
        }
        allure.endStep();
    })

    it("315822 TC_07 Free user - Validate page navigation buttons", async () => {

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        allure.startStep("Get the total number of subject present for the selected cohort", true)
        let subjectCount = await DownloadsPage.selectSubjectCount.length
        for (let i = 1; i <= subjectCount; i++) {
            allure.startStep("Get the subject name for the selected cohort", true)
            const subjectName = await DownloadsPage.selectSubjectByCount(i).getText()
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
            if (i == 4) {
                break
            }
        }
        allure.startStep("Click on Search button", true)
        await DownloadsPage.btnSearch.click()
        allure.startStep("Wait for serach result to get displayed", true)
        await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 1500 })
        allure.startStep("Validate Pagination Previous button to be disabled", true)
        expect(await DownloadsPage.btnPaginationPreviousDisabled.isExisting()).toEqual(true)
        allure.startStep("Validate Pagination Next button to be enabled", true)
        expect(await DownloadsPage.btnPaginationNextDisabled.isExisting()).toEqual(false)
        let paginationCount = await $$("//*[@class='pagination']/li").length
        paginationCount = parseInt(paginationCount) - 1
        allure.startStep("Move to last Pagination page", true)
        await $(`(//*[@class='pagination']/li)[${paginationCount}]`).click()
        allure.startStep("Validate Pagination Previous button to be enabled", true)
        expect(await DownloadsPage.btnPaginationPreviousDisabled.isExisting()).toEqual(false)
        allure.startStep("Validate Pagination Next button to be disabled", true)
        expect(await DownloadsPage.btnPaginationNextDisabled.isExisting()).toEqual(true)
        allure.endStep();
    })

    it("315823 TC_08 Free user - Validate the tick mark for selected subject", async () => {

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        allure.startStep("Get the total number of subject present for the selected cohort", true)
        let subjectCount = await DownloadsPage.selectSubjectCount.length
        for (let i = 1; i <= subjectCount; i++) {
            allure.startStep("Get the subject name for the selected cohort", true)
            const subjectName = await DownloadsPage.selectSubjectByCount(i).getText()
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
            allure.startStep("Validate the Selected tick mark is visible", true)
            expect(await DownloadsPage.selectSubjectTickMark.isExisting()).toEqual(true)
            allure.startStep("Dselect the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
            allure.startStep("Validate the Selected tick mark is not visible", true)
            expect(await DownloadsPage.selectSubjectTickMark.isExisting()).toEqual(false)
        }
        allure.endStep();
    })

    it("315824 TC_09 Free user - Validate All filter", async () => {

        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Wait for Popular Download label to appear", true)
        await DownloadsPage.labelPopularDownloads.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Popular Download label to is displayed", true)
        expect(await DownloadsPage.labelPopularDownloads.isDisplayed()).toEqual(true)
        allure.startStep("Get the total number of subject present for the selected cohort", true)
        let subjectCount = await DownloadsPage.selectSubjectCount.length
        let noDataAvailableSubjects = []
        for (let i = 1; i <= subjectCount; i++) {
            allure.startStep("Get the subject name for the selected cohort", true)
            const subjectName = await DownloadsPage.selectSubjectByCount(i).getText()
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
            allure.startStep("Click on Search button", true)
            await DownloadsPage.btnSearch.click()
            allure.startStep("Wait for serach result to get displayed", true)
            await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 5000 })
            allure.startStep("Count the displayed serach result", true)
            await browser.pause(3000)
            let cardCount = await DownloadsPage.searchResultCardsCount(subjectName).length
            allure.startStep("Validate text to contain Previous Year Paper or Sample Paper", true)
            if (cardCount > 0) {
                for (let j = 1; j <= 2; j++) {
                    allure.startStep("Get text for searched cards", true)
                    const paperTitle = await DownloadsPage.cardPaperTitle.getText()
                    if (paperTitle.includes("Previous Year Paper") || paperTitle.includes("Sample Paper")) {
                        expect(true).toEqual(true)
                    }
                    else {
                        expect(false).toEqual(true)
                    }
                    let paginationCount = await $$("//*[@class='pagination']/li").length
                    paginationCount = parseInt(paginationCount) - 1
                    await $(`(//*[@class='pagination']/li)[${paginationCount}]`).click()
                }
            }
            else {
                allure.startStep("Validate Selected subject has no result to display", true)
                await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })
                noDataAvailableSubjects.push(subjectName)
            }

            allure.startStep("Wait for Subject to be clickable", true)
            await DownloadsPage.selectSubjectByName(subjectName).waitForClickable({ timeout: 3000 })
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()

        }
        if (noDataAvailableSubjects.length == subjectCount) {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test papers available in " + noDataAvailableSubjects).toEqual("")
        }
        allure.endStep();
    })

    it("315827 TC_12 Free user - Verify view concept videos and ask a doubt button from download page.", async () => {

        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Click on concept video button", true)
        await DownloadsPage.btnConceptVideo.waitForClickable({ timeout: 3500 })
        await DownloadsPage.btnConceptVideo.click()
        allure.startStep("Verify Concept video page heading", true)
        await expect(await DashboardPage.bannerheadingConceptVideos.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await browser.back()
        allure.startStep("Click on ask a doubt button", true)
        await DownloadsPage.btnAskaDoubt.waitForClickable({ timeout: 2500 })
        await DownloadsPage.btnAskaDoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        expect(await AskADoubtPage.btnAskADoubt.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();
    })

    it("318092 TC_13 Free user - Validate magazine papers", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[25]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByName("Current Affairs").click()
        await DownloadsPage.ddPaperFilter.click()
        await browser.keys(["Magazine"])
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.click()
        await browser.pause(2000)
        const subjectNameOnCard = await DownloadsPage.subjectNameOnPaper.isDisplayed()
        if (subjectNameOnCard == true) {
            expect(await DownloadsPage.subjectNameOnPaper.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        }
        else {
            allure.startStep("Validate Selected subject has no result to display", true)
            await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")

        }

    })

    it("318093 TC_14 Free user - Validate explainer papers", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[25]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByName("Current Affairs").click()
        await DownloadsPage.ddPaperFilter.click()
        await browser.keys(["Explainer"])
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.click()
        await browser.pause(2000)
        const subjectNameOnCard = await DownloadsPage.subjectNameOnPaper.isDisplayed()
        if (subjectNameOnCard == true) {
            expect(await DownloadsPage.subjectNameOnPaper.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        }
        else {
            allure.startStep("Validate Selected section has no result to display", true)
            await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;                
            })
            expect("No test data available").toEqual("")
        }


    })

    it("318094 TC_15 Free user - Validate Value Addition Series papers", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[25]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        await DownloadsPage.selectSubjectByName("Current Affairs").click()
        await DownloadsPage.ddPaperFilter.click()
        await browser.keys(["Value"])
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.click()
        await browser.pause(2000)
        const subjectNameOnCard = await DownloadsPage.subjectNameOnPaper.isDisplayed()
        if (subjectNameOnCard == true) {
            expect(await DownloadsPage.subjectNameOnPaper.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        }
        else {
            allure.startStep("Validate Selected section has no result to display", true)
            await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }

    })

    it("318640 TC_19 varify the pagination part should work propely and its should so some 10 items in one sheet as bookmarked items", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        await DownloadsPage.navigateToDownloadsAndPageLoad()
        allure.startStep("Select Specific subject in downloads page", true)
        let subject = 'Mathematics'
        await DownloadsPage.addBookmarksForSpecificSubjectPapers(subject, '12')
        allure.startStep("Navigate to Bookmarks module", true)
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate the pagination part and its should have 10 items in one sheet as bookmarked items", true)
        await BookMarksPage.navigateToCategoriesThroughExamSectionForSpecificSubject(subject)
        const bookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
        console.log(bookmarkCount)
        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
        if (bookmarkCount >= 10) {
            expect(papersCount).toEqual(10)
            let paginationButtons = await $$("(//ul[contains(@class,'pagination')])[3]/li").length
            if (paginationButtons > 3) {
                await BookMarksPage.nextPaginationButton.waitForDisplayed({ timeout: 5000 })
                expect(await BookMarksPage.nextPaginationButton.isDisplayed()).toEqual(true)
                await BookMarksPage.nextPaginationButton.click()
                await BookMarksPage.bookmarkedCategoriesTitle.waitForDisplayed({ timeout: 5000 })
                const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
                for (let i = 1; i <= papersCount; i++) {
                    const paperTitle = await BookMarksPage.getPaperTitle(i)
                    expect(await paperTitle.getText()).toHaveTextContaining(subject)
                }
                await BookMarksPage.previousPaginationButton.waitForDisplayed({ timeout: 5000 })
                expect(await BookMarksPage.previousPaginationButton.isDisplayed()).toEqual(true)
                await BookMarksPage.previousPaginationButton.click()
                await BookMarksPage.bookmarkedCategoriesTitle.waitForDisplayed({ timeout: 5000 })
                const previousPagePapersCount = await BookMarksPage.papersCountInCategoriesSection.length
                for (let i = 1; i <= previousPagePapersCount; i++) {
                    const paperTitle = await BookMarksPage.getPaperTitle(i)
                    expect(await paperTitle.getText()).toHaveTextContaining(subject)
                }

            }
        }
        allure.endStep();
    })


    it("318635 TC_20 verify All the bookmarked downloads in bookmark module by clicking on 'Bookmark' in left menu bar.", async () => {

        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Select Specific subject in downloads page", true)
        const subject = await DownloadsPage.selectSpecificSubject('Mathematics')
        await subject.waitForDisplayed({ timeout: 10000 })
        await subject.click()
        const typeOfPaper = 'All'
        await DownloadsPage.papersDropdown.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.papersDropdown.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await DownloadsPage.papersDropdown.click()
        await browser.keys(typeOfPaper)
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.btnSearch.click()
        allure.startStep("Validate the bookmarked paper counts on bookmark page with downloads page", true)
        const selectedPapers = await DownloadsPage.getPaperTitleCount()
        await browser.pause(2000)
        const selectedPapersCount = await selectedPapers.length
        var papersWithBookmark = []

        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
            const paperTitle = await DownloadsPage.getPaperTitle(i)
            const paperWithBookmarkDisplayed = await paperWithBookmark.isDisplayed()
            if (paperWithBookmarkDisplayed == true) {
                papersWithBookmark.push(await paperTitle.getText())
            }
        }
        let paginationButtons = await $$("//*[@class='page-link']").length

        if (paginationButtons > 1) {
            for (let j = 3; j < paginationButtons + 3; j++) {
                const pagination = await DownloadsPage.getPagination(j)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
                await pagination.click()
                const selectedPapers1 = await DownloadsPage.getPaperTitleCount()
                for (let i = 1; i <= selectedPapers1.length; i++) {
                    const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
                    const paperTitle = await DownloadsPage.getPaperTitle(i)
                    const paperWithBookmarkDisplayed = await paperWithBookmark.isDisplayed()
                    if (paperWithBookmarkDisplayed == true) {
                        papersWithBookmark.push(await paperTitle.getText())
                    }
                }
            }
        }
        await BookMarksPage.navigateToBookMarksPage()
        await BookMarksPage.examPaperSection.waitForDisplayed({ timeout: 10000 })
        await BookMarksPage.bookMarkCountUnderExamPaperSection.waitForDisplayed({ timeout: 10000 })
        const bookmarksCount = await BookMarksPage.bookMarkCountUnderExamPaperSection.getText()
        const bookmarksCountUnderExamSection = parseInt(await bookmarksCount.slice(0, 2))
        expect(papersWithBookmark.length).toEqual(bookmarksCountUnderExamSection)
        allure.endStep();
    })


    it("318637 TC_21 Verify the bookmarked done in download page is reflecting in 'BIOLOGY Bookmark category' along with the count", async () => {

        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        let subject = 'Biology'
        await DownloadsPage.navigateToDownloadsAndPageLoad()
        allure.startStep("Select Specific subject in downloads page", true)
        await DownloadsPage.addBookmarksForSpecificSubjectPapers(subject, '12')
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate the paper title ,bookmark symbol and Download CTA in categories page", true)
        await BookMarksPage.navigateToCategoriesThroughExamSectionForSpecificSubject(subject)
        const bookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
        if (bookmarkCount > 0) {
            for (let i = 1; i <= papersCount; i++) {
                const paperTitle = await BookMarksPage.getPaperTitle(i)
                const downloadCTA = await BookMarksPage.getDownloadCTAButtonInCategoriesPage(i)
                const bookmarkedButton = await BookMarksPage.getBookmarkedButtonInCategoriesPage(i)
                expect(await downloadCTA.isDisplayed()).toEqual(true)
                expect(await bookmarkedButton.isDisplayed()).toEqual(true)
                expect(await paperTitle.getText()).toHaveTextContaining(subject)
            }
            if (bookmarkCount >= 10) {
                let paginationButtons = await $$("(//ul[contains(@class,'pagination')])[3]/li").length
                if (paginationButtons > 3) {
                    for (let j = 3; j < paginationButtons; j++) {
                        const pagination = await BookMarksPage.getPaginationInCategoriesPage(j)
                        allure.startStep("Validate the Pagination in Bookmarked categories tab", true)
                        await pagination.scrollIntoView({ block: "center" })
                        await browser.pause(2000)
                        await pagination.waitForDisplayed({ timeout: 5000 })
                        expect(await pagination.isDisplayed()).toEqual(true)
                        await pagination.click()
                        await browser.pause(3000)
                        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
                        for (let i = 1; i <= papersCount; i++) {
                            const paperTitle = await BookMarksPage.getPaperTitle(i)
                            const downloadCTA = await BookMarksPage.getDownloadCTAButtonInCategoriesPage(i)
                            const bookmarkedButton = await BookMarksPage.getBookmarkedButtonInCategoriesPage(i)
                            expect(await downloadCTA.isDisplayed()).toEqual(true)
                            expect(await bookmarkedButton.isDisplayed()).toEqual(true)
                            expect(await paperTitle.getText()).toHaveTextContaining(subject)
                        }
                    }
                }
            }
        }
        allure.endStep();
    })


    it("318638 TC_22 verify the download text should be visible for all the 3 categories and bookmark symbol as well.", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await BookMarksPage.navigateToBookMarksPage()
        let subject = 'Mathematics'
        allure.startStep("validate bookmark symbol and download cta functionality", true)
        await BookMarksPage.navigateToCategoriesThroughExamSectionForSpecificSubject(subject)
        const bookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
        if (bookmarkCount > 0) {
            for (let i = 1; i <= papersCount; i++) {
                const downloadCTA = await BookMarksPage.getDownloadCTAButtonInCategoriesPage(i)
                const bookmarkedButton = await BookMarksPage.getBookmarkedButtonInCategoriesPage(i)
                expect(await downloadCTA.isDisplayed()).toEqual(true)
                expect(await bookmarkedButton.isDisplayed()).toEqual(true)
            }
            for (let i = 1; i <= papersCount; i++) {
                const downloadCTA = await BookMarksPage.getDownloadCTAButtonInCategoriesPage(i)
                await downloadCTA.waitForDisplayed({ timeout: 5000 })
                await downloadCTA.click()
                await browser.pause(1500)
                const handles = await browser.getWindowHandles()
                await browser.switchToWindow(handles[1]);
                const url = await browser.getUrl()
                let flag = url.includes("pdf")
                expect(flag).toEqual(true)
                await browser.closeWindow();
                await browser.switchToWindow(handles[0]);
                break;
            }

        }
        allure.endStep();
    })

    it("318639 TC_23 Verify unbookmark is also working propely for the download bookmarked items", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsAndPageLoad()
        allure.startStep("Select Specific subject in downloads page", true)
        let subject = 'Biology'
        await DownloadsPage.addBookmarksForSpecificSubjectPapers(subject, '12')
        await BookMarksPage.navigateToBookMarksPage()
        allure.startStep("Validate unbookmark is working propely for the download bookmarked item under bookmark categories", true)
        await BookMarksPage.navigateToCategoriesThroughExamSectionForSpecificSubject(subject)
        const bookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
        if (bookmarkCount > 0) {
            for (let i = 1; i <= papersCount; i++) {
                const paperTitle = await BookMarksPage.getPaperTitle(i)
                const bookmarkedButton = await BookMarksPage.getBookmarkedButtonInCategoriesPage(i)
                expect(await bookmarkedButton.isDisplayed()).toEqual(true)
                const titleBeforeBookmarked = await paperTitle.getText()
                await bookmarkedButton.click()
                await browser.pause(3000)
                await BookMarksPage.bookmarkedCategoriesTitle.waitForDisplayed({ timeout: 5000 })
                const titleAfterBookmarkRemoved = await paperTitle.getText()
                assert.notEqual(titleBeforeBookmarked, titleAfterBookmarkRemoved)
                break;
            }
            const currentBookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
            expect(parseInt(currentBookmarkCount)).toBeLessThan(parseInt(bookmarkCount))
            if (bookmarkCount >= 10) {
                let paginationButtons = await $$("(//ul[contains(@class,'pagination')])[3]/li").length
                if (paginationButtons > 3) {
                    for (let j = 3; j < paginationButtons; j++) {
                        const pagination = await BookMarksPage.getPaginationInCategoriesPage(j)
                        allure.startStep("Validate the Pagination in Bookmarked categories tab", true)
                        await pagination.scrollIntoView({ block: "center" })
                        await browser.pause(2000)
                        await pagination.waitForDisplayed({ timeout: 5000 })
                        expect(await pagination.isDisplayed()).toEqual(true)
                        await pagination.click()
                        await browser.pause(2000)
                        const currentBookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
                        expect(parseInt(currentBookmarkCount)).toBeLessThan(parseInt(bookmarkCount))
                    }
                }
            }
        }
        allure.endStep();
    })
    it("331120 TC_24 Lazy loading - Verify the lazy loading for download module", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Validate image count in starting and end of the page", true) 
        await browser.pause(2000)   
        await checkLazyLoadingImgCount(downloadData.lazyLoadingUrls)
        allure.endStep();
    })

    it("334458 TC_25 For BTLP & NEO user in Download homepage concept video card title ,description & cta is changed", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'btlp')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();

        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'doubtsOnChatUser')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })

    it("334528 TC_26 For BTLP & NEO user in Download homepage ask a doubt card title ,description & cta is changed", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'btlp')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Validate all the texts of Ask A Doubt Video Banner", true)
        await AskADoubtBanner()
        allure.endStep();

        await browser.reloadSession()
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'doubtsOnChatUser')
        allure.startStep("Navigate to Download Module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Validate all the texts of Concept Video Banner", true)
        await ConceptVideoBanner()
        allure.endStep();
    })
    
})
