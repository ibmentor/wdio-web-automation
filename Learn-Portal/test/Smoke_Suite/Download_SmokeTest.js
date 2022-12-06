import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DownloadsPage from "../../Pages/DownloadsPage"
import { loginData } from "../../Data/LoginData"
import DashboardPage from "../../Pages/DashboardPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import BookMarksPage from "../../Pages/BookMarksPage"

describe("Learn Portal - Downloads module test cases for Free user", async () => {
    it.only("315816 TC_01 Free user - Click on download button and verify the download url", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
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
            if (flag == false) {
                flag = url.includes("downloads/production") //check for production
            }
            allure.startStep("Validate the URL of Downloaded pdf", true)
            expect(flag).toEqual(true)
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
        }
        allure.endStep();
    })

    it("315818 TC_03 Free user - Verify filter for particular subjects", async () => {

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
        let noDataAvailableSubjects = []
        let subjectCount = await DownloadsPage.selectSubjectCount.length
        for (let i = 1; i <= subjectCount; i++) {
            allure.startStep("Get the subject name for the selected cohort", true)
            const subjectName = await DownloadsPage.selectSubjectByCount(i).getText()
            allure.startStep("Wait for Filter subject field to be clickable", true)
            await DownloadsPage.ddSubjects.waitForClickable({ timeout: 2500 })
            allure.startStep("Click on Filter subject field", true)
            await DownloadsPage.ddSubjects.click()
            allure.startStep("Set subject name to Filter subject field", true)
            await browser.keys(subjectName)
            await browser.keys("Tab")
            await browser.pause(1000)
            allure.startStep("Get card count under Popular Download label", true)
            let cardCount = await DownloadsPage.popularDownloadsCardsCount.length
            if (cardCount > 0) {
                allure.startStep("Validate selected subject to matches with the displayed subject", true)
                for (let j = 1; j <= cardCount; j++) {
                    const cardSubjectName = await DownloadsPage.popularDownloadsCardsSubject(j).getText()
                    let flag = cardSubjectName.includes(subjectName)
                    console.log(flag)
                    expect(flag).toEqual(true)
                }
            }
            else {
                allure.startStep("Validate selected subject has No Paper Available", true)
                expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })).toEqual(true)
                noDataAvailableSubjects.push(subjectName)

            }
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

    it("315820 TC_05 Free user - Validate selecting a subject and verifying the search result", async () => {

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
            if (cardCount > 0) {
                for (let j = 1; j <= cardCount; j++) {
                    const cardSubjectName = await DownloadsPage.popularDownloadsCardsSubject(j).getText()
                    let flag = cardSubjectName.includes(subjectName)
                    allure.startStep("Validate Selected subject matches with result subject", true)
                    expect(flag).toEqual(true)
                }
            }
            else {
                allure.startStep("Validate Selected subject has no result to display", true)
                expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 3000 })).toEqual(true)
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

    it("315825 TC_10 Free user - Verify filter for previous year paper", async () => {

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
        let previousYearPaper = await DownloadsPage.previousYearPaper.getText()
        allure.startStep("Verify previous year paper", true)
        expect(previousYearPaper).toEqual("Previous Year's Paper")
        let paginationButtons = await $$("//*[@class='page-link']").length
        if (paginationButtons > 1) {
            for (let i = 2; i <= paginationButtons; i++) {
                await DownloadsPage.paginationNextButton.click()
            }
            allure.startStep("Verify previous year papaer", true)
            expect(previousYearPaper).toEqual("Previous Year's Paper")
        }
        else {
            allure.startStep("Verify previous year papaer", true)
            expect(previousYearPaper).toEqual("Previous Year's Paper")
        }
        allure.endStep();
    })

    it("315826 TC_11 Free user - verify filter for sample paper", async () => {

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
        let samplePaper = await DownloadsPage.previousYearPaper.getText()
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
    it("318091 TC_12 Free user - Validate IAS cohort and Download module", async () => {
        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[25]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Verify IAS label from profile", true)
        expect(await DownloadsPage.labelIAS.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Verify Download module", true)
        expect(await DownloadsPage.pageTitle.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    })

    it("318633 TC_16 Verify user can able to see the bookmark option for any particular subject", async () => {

        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Select Specific subject in downloads page", true)
        const subject = await DownloadsPage.selectSpecificSubject('Mathematics')
        await subject.waitForDisplayed({ timeout: 10000 })
        await subject.click()
        allure.startStep("Select Specific papers under Papers dropdown", true)
        const typeOfPaper = 'Sample Paper'
        await DownloadsPage.papersDropdown.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.papersDropdown.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await DownloadsPage.papersDropdown.click()
        await browser.keys(typeOfPaper)
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.btnSearch.click()
        allure.startStep("Validate that user should be able to bookmark the paper in downloads page", true)
        const selectedPapers = await DownloadsPage.selectedPapers(typeOfPaper)
        const selectedPapersCount = await selectedPapers.length
        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperTitle = await DownloadsPage.getPaperTitle(i)
            expect(await paperTitle.getText()).toHaveTextContaining(typeOfPaper)
        }
        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperWithoutbookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'bookmark-outline')]`)
            const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
            const paperWithoutbookmarkDisplayed = await paperWithoutbookmark.isDisplayed()
            if (paperWithoutbookmarkDisplayed == true) {
                await paperWithoutbookmark.waitForDisplayed({ timeout: 5000 })
                await paperWithoutbookmark.click()
                await browser.pause(2000)
                expect(await paperWithBookmark.isDisplayed()).toEqual(true)
            }
            else {
                expect(await paperWithBookmark.isDisplayed()).toEqual(true)
            }
        }

        allure.endStep();
    })
    it("318636 TC_17 Verify all the elements in bookmark module and newly added 'exam papers' as well.", async () => {

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
        allure.startStep("Validate bookmarked papers from download module reflected in Bookmarks categories Page ", true)
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
                allure.startStep("Validate the Pagination in Completed tab", true)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
                await pagination.click()
                const selectedPapers = await DownloadsPage.getPaperTitleCount()
                for (let i = 1; i <= selectedPapers.length; i++) {
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
        await BookMarksPage.examPaperSection.click()
        await BookMarksPage.bookmarkedCategoriesTitle.waitForDisplayed({ timeout: 10000 })
        await BookMarksPage.subjectDropdown.waitForDisplayed({ timeout: 10000 })
        await BookMarksPage.subjectDropdown.click()
        await browser.keys('Mathematics')
        await browser.keys('Tab')
        await browser.pause(2000)
        const bookmarkCount = await BookMarksPage.bookMarkCountUnderCatgeories.getText()
        const papersCount = await BookMarksPage.papersCountInCategoriesSection.length
        for (let i = 1; i <= papersCount; i++) {
            const paperTitle = await BookMarksPage.getPaperTitle(i)
            const paperTitleName = await paperTitle.getText()
            expect(papersWithBookmark.includes(paperTitleName)).toEqual(true)
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
                        const paperTitleName = await paperTitle.getText()
                        expect(papersWithBookmark.includes(paperTitleName)).toEqual(true)
                    }
                }
            }
        }
        allure.endStep();
    })

    it("318634 TC_18 Verify user can unbookmarked from download page as well", async () => {

        allure.startStep("Change cohort Details", true)
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Navigate to Download module", true)
        await DownloadsPage.navigateToDownloadsModule()
        allure.startStep("Select Specific subject in downloads page", true)
        const subject = await DownloadsPage.selectSpecificSubject('Mathematics')
        await subject.waitForDisplayed({ timeout: 10000 })
        await subject.click()
        allure.startStep("Select Specific papers under Papers dropdown", true)
        const typeOfPaper = 'Sample Paper'
        await DownloadsPage.papersDropdown.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.papersDropdown.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await DownloadsPage.papersDropdown.click()
        await browser.keys(typeOfPaper)
        await browser.keys('Tab')
        await DownloadsPage.btnSearch.waitForDisplayed({ timeout: 3500 })
        await DownloadsPage.btnSearch.click()
        allure.startStep("Validate that user should be able to unbookmark the paper in downloads page", true)
        const selectedPapers = await DownloadsPage.selectedPapers(typeOfPaper)
        const selectedPapersCount = await selectedPapers.length
        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperTitle = await DownloadsPage.getPaperTitle(i)
            expect(await paperTitle.getText()).toHaveTextContaining(typeOfPaper)
        }
        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperWithOutBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'bookmark-outline')]`)
            const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
            const paperWithBookmarkDisplayed = await paperWithBookmark.isDisplayed()
            if (paperWithBookmarkDisplayed == true) {
                await paperWithBookmark.waitForDisplayed({ timeout: 5000 })
                await paperWithBookmark.click()
                await browser.pause(2000)
                expect(await paperWithOutBookmark.isDisplayed()).toEqual(true)
            }
            else {
                expect(await paperWithOutBookmark.isDisplayed()).toEqual(true)
            }
        }

        allure.endStep();
    })

})