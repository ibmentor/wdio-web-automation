import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";
import { loginData } from "../Data/LoginData"


class DownloadsPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get pageTitle() { return $("//h1[text()='Downloads']") }

    get labelTitleCard() { return $("//*[@class='d-flex flex-wrap subjects-list']") }
    
    get subjectSelectionBlock() { return $("//*[@class=' subjects-section rounded']") }

    selectSubjectByName(subject) {return $(`//*[@class='subject-name' and contains(text(),'${subject}')]`)}

    get selectSubjectCount() {return $$("//*[@class='subject-name']")}
    
    selectSubjectByCount(count) {return $(`(//*[@class='subject-name'])[${count}]`)}

    get ddPapers() {return $("//*[@class='paper-filter css-b62m3t-container']")}

    get ddSubjects() {return $("(//*[@class='css-8mmkcg'])[2]")}
    
    get btnSearch() {return $("//*[@type='button' and text()='Search']")}
    
    get btnPaginationNext() {return $("//*[@aria-label='Next page']")}

    get btnPaginationNextDisabled() {return $("//*[@class='page-item disabled']//*[@aria-label='Next page']")}
    
    get btnPaginationPrevious() {return $("//*[@aria-label='Previous page']")}

    get btnPaginationPreviousDisabled() {return $("//*[@class='page-item disabled']//*[@aria-label='Previous page']")}
    
    get labelSearchResults() {return $("//*[text()='Search Results']")}
    
    get labelPopularDownloads() {return $("//p[contains(text(),'Popular Downloads')]")}

    get labelNoPaperAvailable() {return $("//*[text()='No papers available']")}
    
    searchResultCardsCount(subject) {return $$(`//*[@class='popular-downloads-grid-view row']//*[text()='${subject}']`)}

    get popularDownloadsCardsCount() {return $$("//*[@class='popular-downloads-grid-view row']//*[contains(@class,'card-body')]")}
    
    popularDownloadsCardsSubject(number) {return $(`//*[@class='popular-downloads-grid-view row']/div[${number}]//h4`)}
    
    downloadBtnPopularDownloadsCards(number) {return $(`//*[@class='popular-downloads-grid-view row']/div[${number}]//*[text()='Download']`)}
    
    get btnGridView() {return $("(//*[contains(@class,'all-subjects-filter')]/following-sibling::div/button)[1]")}
    
    get btnListView() {return $("(//*[contains(@class,'all-subjects-filter')]/following-sibling::div/button)[2]")}

    get selectSubjectTickMark() {return $("//*[@class='selected-subject mdi mdi-check']")}

    get cardPaperTitle() {return $("(//*[@class='paper-title ps-2'])[1]")}

    get previousYearPaper() { return $("(//div[@class='custom-styler__single-value css-qc6sy-singleValue'])[1]") }

    get sampleYearPaper() { return $("(//*[@class='paper-title ps-2'])[1]") }

    get btnConceptVideo() { return $("(//button[text()='View Concept Videos'])[1]") }

    get btnAskaDoubt() { return $("(//button[text()='Ask a Doubt'])[1]") }

    get paginationNextButton() { return $("(//li[@class='page-item disabled'])[1]") }

    get labelIAS() { return $("(//span[contains(text(),'IAS')])[1]") }

    get ddPaperFilter() { return $("(//*[name()='svg'][@class='css-8mmkcg'])[1]") }

    get subjectNameOnPaper() { return $("//*[@class='selected-sub-name']") }

    get labelNoPaperAvailable() { return $("//p[normalize-space()='No papers available']") }

    get btnBookmark() { return $("//*[@class='mdi mdi-bookmark-outline bookmarked me-2']") }

    get btnBookmarkPopularDownloads(){return $("(//i[contains(@class,'mdi mdi-bookmark-outline font-18 bookmarkStyles_bmIcon__') and @role='button'])[1]")}

    selectSpecificSubject(subjectName) { return $(`//*[contains(@class,'subjects-card')]//*[contains(text(),'${subjectName}')]`)}

    selectedPapers(selectTypeOfPaper) { return $$(`(//*[contains(@class,'paper-title')][contains(text(),'${selectTypeOfPaper}')])`)}
    getPaperTitle(count) {return $(`(//*[contains(@class,'paper-title')])[${count}]`)}
    getPaperTitleCount() {return $$(`//*[contains(@class,'paper-title')]`)}
    get papersDropdown() {return $(`//*[contains(@class,'custom-styler__single-value')]`)}
    getPagination(count) {return $(`(//*[@class='pagination']/li)[${count}]`)}
    
 
    async navigateToDownloadsAndPageLoad(cohortDetail, user) {
        
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        await browser.pause(1000)

        if (loginData.downloadNotApplicable.includes(cohortDetail)) {
            expect(await DashboardPage.btnDownloads.isDisplayed()).toEqual(false)
        }
        else {
            await DashboardPage.btnDownloads.waitForClickable({ timeout: 1500 })
            await DashboardPage.btnDownloads.click()
            expect(await this.pageTitle.waitForDisplayed({ timeout: 2000 }))
            expect(await this.labelTitleCard.waitForDisplayed({ timeout: 1500 }))
        }  
    }
    
    async selectAndSearchSubject(subject){
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        await DashboardPage.btnDownloads.waitForClickable({ timeout: 1500 })
        await DashboardPage.btnDownloads.click()
        await this.subjectSelectionBlock.waitForClickable({timeout : 3000})
        await this.selectSubject(subject).waitForClickable({timeout : 2000})
        await this.selectSubject(subject).click()
        await this.ddPapers.click()
        await browser.keys(["All","Tab"])
        await this.btnSearch.waitForClickable({timeout : 2000})
        await this.btnSearch.click()
    }

    async navigateToDownloadsModule(){
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        await browser.pause(1000)
        await DashboardPage.btnDownloads.waitForDisplayed({ timeout: 3000 })
        await DashboardPage.btnDownloads.waitForClickable({ timeout: 3000 })
        await DashboardPage.btnDownloads.click()
    }

    async selectAndSearchMultipleSubject(subject){
        await this.navigateToDownloadsModule()
        await this.subjectSelectionBlock.waitForClickable({timeout : 3000})
        for (let i=0;i<subject.length;i++){
            await this.selectSubject(subject[i]).waitForClickable({timeout : 2000})
            await this.selectSubject(subject[i]).click()
        }
        await this.ddPapers.click()
        await browser.keys(["All","Tab"])
        await this.btnSearch.waitForClickable({timeout : 2000})
        await this.btnSearch.click()
    }

    async downloadPoularDownloadsPdf(){
        await this.navigateToDownloadsModule()
        await this.labelPopularDownloads.waitForDisplayed({timeout : 5000})
        await this.popularDownloadsCardsSubject(1).waitForDisplayed({timeout : 5000})
        let cardCount = await this.popularDownloadsCardsCount.length
        return cardCount
    }

    async addBookmarksForSpecificSubjectPapers(subjectName,numberOfBookMarks){
        const subject = await this.selectSpecificSubject(subjectName)
        await subject.waitForDisplayed({ timeout: 10000 })
        await subject.click()
        const typeOfPaper = 'All'
        await this.papersDropdown.waitForDisplayed({ timeout: 3500 })
        await this.papersDropdown.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await this.papersDropdown.click()
        await browser.keys(typeOfPaper)
        await browser.keys('Tab')
        await this.btnSearch.waitForDisplayed({ timeout: 3500 })
        await this.btnSearch.click()
        const selectedPapers = await this.getPaperTitleCount()
        await browser.pause(2000)
        const selectedPapersCount = await selectedPapers.length
        let count = 0
        for (let i = 1; i <= selectedPapersCount; i++) {
            const paperWithoutbookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'bookmark-outline')]`)
            const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
            const paperWithoutbookmarkDisplayed = await paperWithoutbookmark.isDisplayed()
            if (paperWithoutbookmarkDisplayed == true) {
                await paperWithoutbookmark.waitForDisplayed({ timeout: 5000 })
                await paperWithoutbookmark.click()
                await browser.pause(2000)
                expect(await paperWithBookmark.isDisplayed()).toEqual(true)
                count++
            }
            else {
                expect(await paperWithBookmark.isDisplayed()).toEqual(true)
                count++
            }
        }
        let paginationButtons = await $$("//*[@class='page-link']").length
        if (paginationButtons > 1) {
            for (let j = 3; j < paginationButtons + 3; j++) {
                if (count >=numberOfBookMarks) {
                    break;
                }
                const pagination = await this.getPagination(j)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
                await pagination.click()
                await browser.pause(3000)
                const selectedPapers1 = await this.getPaperTitleCount()
                for (let i = 1; i <= selectedPapers1.length; i++) {
                    const paperWithoutbookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'bookmark-outline')]`)
                    const paperWithBookmark = await $(`(//*[contains(@class,'sub-name')])[${i}]/../..//*[contains(@class,'not-bookmarked')]`)
                    const paperWithoutbookmarkDisplayed = await paperWithoutbookmark.isDisplayed()
                    if (paperWithoutbookmarkDisplayed == true) {
                        await paperWithoutbookmark.waitForDisplayed({ timeout: 5000 })
                        await paperWithoutbookmark.scrollIntoView({ block: "center" })
                        await browser.pause(2000)
                        await paperWithoutbookmark.click()
                        await browser.pause(2000)
                        expect(await paperWithBookmark.isDisplayed()).toEqual(true)
                        count++
                    }
                    else {
                        expect(await paperWithBookmark.isDisplayed()).toEqual(true)
                        count++
                    }
                }

            }
        }
    }
}

export default new DownloadsPage();