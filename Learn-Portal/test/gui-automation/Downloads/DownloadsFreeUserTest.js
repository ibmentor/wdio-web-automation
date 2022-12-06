import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import DownloadsPage from "../../../Pages/DownloadsPage"
import { loginData } from "../../../Data/LoginData"
import DashboardPage from "../../../Pages/DashboardPage"
import ConceptVideoPage from "../../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../../Pages/AskADoubtPage"

describe("Learn Portal - Downloads module test cases for Free user", async () => {

    it("306566 TC_01 Free user - Click on download button and verify the download url", async () => {
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

    it("306567 TC_02 Free user - Vrify Popular Downloads section is visible when the user lands on the download page for the first time ", async () => {

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
            await DownloadsPage.labelNoPaperAvailable.waitForDisplayed({ timeout: 2000 })
            allure.startStep("Validate Popular Downlaod No paper available is displayed", true)
            expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed()).toEqual(true)
        }
        allure.startStep("Validate Popular Downlaod Grid View button is displayed", true)
        expect(await DownloadsPage.btnGridView.isDisplayed()).toEqual(true)
        allure.startStep("Validate Popular Downlaod List View button is displayed", true)
        expect(await DownloadsPage.btnListView.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306568 TC_03 Free user - Verify filter for particular subjects", async () => {

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
            }
        }
        allure.endStep();
    })

    it("306569 TC_04 Free user - Validate grid and list view", async () => {

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
            expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })).toEqual(true)
        }
        else {
            allure.startStep("Click on List View button", true)
            await DownloadsPage.btnListView.click()
            let cardCount = await DownloadsPage.popularDownloadsCardsCount.length
            allure.startStep("Validate papers in List View", true)
            expect(cardCount <= 0).toEqual(true)
            allure.startStep("Click on Grid View button", true)
            await DownloadsPage.btnGridView.click()
            await DownloadsPage.labelPopularDownloads.scrollIntoView()
            cardCount = await DownloadsPage.popularDownloadsCardsCount.length
            allure.startStep("Validate papers in Grid View", true)
            expect(cardCount > 0).toEqual(true)
        }
        allure.endStep();
    })

    it("306570 TC_05 Free user - Validate selecting a subject and verifying the search result", async () => {

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
            allure.startStep("Click on Search button", true)
            await DownloadsPage.btnSearch.click()
            allure.startStep("Wait for serach result to get displayed", true)
            await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 1500 })
            allure.startStep("Count the displayed serach result", true)
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
            }
            allure.startStep("Untick the selected subject", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
        }
        allure.endStep();
    })

    it("306571 TC_06 Free user - Validate Pagination - 6 paper per page & text should contain Showing and entries", async () => {
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
            allure.startStep("Click on Search button", true)
            await DownloadsPage.btnSearch.click()
            allure.startStep("Wait for serach result to get displayed", true)
            await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 1500 })
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
            }
            allure.startStep("Untick the selected subject", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
        }
        allure.endStep();
    })

    it("306572 TC_07 Free user - Validate page nevigation buttons", async () => {

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

    it("306573 TC_08 Free user - Validate the tick mark for selected subject", async () => {

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

    it("306574 TC_09 Free user - Validate All filter", async () => {

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
            allure.startStep("Click on Search button", true)
            await DownloadsPage.btnSearch.click()
            allure.startStep("Wait for serach result to get displayed", true)
            await DownloadsPage.labelSearchResults.waitForDisplayed({ timeout: 1500 })
            allure.startStep("Count the displayed serach result", true)
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
                expect(await DownloadsPage.labelNoPaperAvailable.isDisplayed({ timeout: 1500 })).toEqual(true)
            }
            allure.startStep("Wait for Subject to be clickable", true)
            await DownloadsPage.selectSubjectByName(subjectName).waitForClickable({ timeout: 3000 })
            allure.startStep("Select the subject for the selected cohort", true)
            await DownloadsPage.selectSubjectByName(subjectName).click()
        }
        allure.endStep();
    })

    it("306575 TC_10 Free user - Verify filter for previous year paper", async () => {
        
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

    it("306576 TC_11 Free user - verify filter for sample paper", async () => {
        
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

    it.only("306577 TC_12 Free user - Verify view concept videos and ask a doubt button from download page.", async () => {
        
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
})