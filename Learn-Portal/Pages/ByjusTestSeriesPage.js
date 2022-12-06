import BasePage from "./BasePage";

class ByjusTestSeriesPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get menuOption() { return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }
    get BtnByjusTestSeries() { return $("//*[contains(@src,'bts.png')]") }
    get pageTitle() {return $("//*[contains(text(),'Test Series')]")}
    get BtnAvailable() {return $("//span[contains(text(),'Available')]")}
    get BtnAvailableDynamicNumber() {return $("//span[contains(text(),'Available')]/..//*[@class='tab-count']")}
    get BtnCompleted() {return $("//span[contains(text(),'Completed')]")}
    get BtnCompletedDynamicNumber() {return $("//span[contains(text(),'Completed')]/..//*[@class='tab-count']")}
    get paperTitle() {return $("(//*[contains(@class,'sc-jIkldg')])[1]")}
    get testIcon() {return $("(//*[contains(@alt,'paperIcon')])[1]")}
    get calendarIcon() {return $("(//*[contains(@src,'calendar.svg')])[1]")}
    get availabilityUnderCalendar() {return $("(//*[contains(@src,'calendar.svg')])[1]/../p")}
    get BtnStartTest() {return $("(//*[contains(text(),'Start Test')])[1]")}
    get timeDuration() {return $("(//*[contains(@class,'sc-hQZdRR')])[1]")}
    get numOfQuestions() {return $("(//*[contains(@class,'sc-cyRTDc')])[1]")}
    get examIcon1() {return $("(//*[contains(@class,'sc-cyRTDc')])[1]")}
    get instruction1() {return $("//*[contains(text(),'No marks will be awarded for unattempted questions')]")}
    get instruction2() {return $("//*[contains(text(),'There are multiple sections for each subject with different marking schemes. The marking scheme is mentioned above each question under the respective section')]")}
    get instruction3() {return $("//*[contains(text(),'Mark questions for review to attempt later')]")}
    get examIcon2() {return $("(//*[contains(@class,'sc-cyRTDc')])[2]")}
    get examIcon3() {return $("(//*[contains(@class,'sc-cyRTDc')])[3]")}
    get paperDetailSectionInInstructionPage() {return $("(//*[contains(@class,'sc-eqJLUj')])[1]")}
    get instructionTitle() {return $("//*[contains(text(),'Instructions')]")}  
    get btnTakeTest() {return $("//*[contains(text(),'Take Test')]")}  
    get filterDropDown() {return $("//*[contains(@class,'select__value-container')]")}
    get noTestAvailable() {return $("//*[contains(text(),'No tests available for now')]")}
    get noTestAvailableSubText() {return $("//*[contains(text(),'You can give the tests once the tests become available.')]")}
    get expiredTextUnderCalendarIcon() {return $("(//*[contains(@src,'calendar.svg')])[1]/../p")}
    get missedTestTag() {return $("(//span[normalize-space()='Missed Test'])[1]")}
    get noTestsCompleted() {return $("(//*[contains(text(),'No tests completed  and Missed yet')])")}
    get noTestsCompletedSubText() {return $("//*[contains(text(),'You can give the tests once the tests become available.')]")}
    get btnViewAnalysis() {return $("(//*[contains(text(),'View Analysis')])[1]")}
    get completedTextUnderCalendarIcon() {return $("(//*[contains(@src,'calendar.svg')])[1]/../p")}
    get BtnPreviousPagePagination() {return $("//*[contains(@aria-label,'Previous page')]")}
    get BtnNextPagePagination() {return $("//*[contains(@aria-label,'Next page')]")}
    get BtnCurrentPagePagination() {return $("//*[contains(@aria-current,'page')]")}
    get paginationInfoText() {return $("//*[contains(@class,'pagination-info-text')]")}

    async navigateToByjusTestSeriesPage() {
        await this.menuOption.waitForClickable({ timeout: 15000 })
        await this.menuOption.click()
        await browser.pause(1000)
        await this.BtnByjusTestSeries.waitForClickable({ timeout: 20000 })
        await this.BtnByjusTestSeries.click()
        await this.pageTitle.waitForDisplayed({ timeout: 75000 })
    }
    async selectOptionUnderCompletedDropdpDown(option){
        await this.filterDropDown.click()
        await browser.pause(2000)
        await browser.keys(option)
        await browser.keys('Tab')
    }
    }

  
export default new ByjusTestSeriesPage();