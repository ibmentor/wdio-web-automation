import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";
import {loginData} from "../Data/LoginData"

  
class AskADoubtPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

get pageTitle() { return $("//*[@class='d-flex flex-column aad-intro-card p-2']")}

get btnAskADoubt() { return $('//img[@alt="menu-icons/ask_a_doubt.png"]')}

get tfAskADoubt() { return $("//*[contains(@class,'SearchbarWidget_containerSearchbar')]//input")}

get labelMinimumCharacterWarning() { return $("//*[contains(@class,'TopbarSearch_TopbarSearch__3zDjJ')]//*[text()='Search key should be more than 3 characters long.']")}

searchResult(resultNumber=2) { return $(`(//div[@class='TopbarSearch_TopbarSearchSuggestions__30N8Q']/ul/li)[${resultNumber}]`)}

get labelBreadCrumb() { return $('//*[@alt="backIcon"]')}

get btnRightNavigationAskADoubt() { return $("//button[text()='Ask a Doubt']")}

get btnRightNavigationTakeATest() { return $("//*[contains(text(),'Take a Test')]")}

get searchResultCount() { return $$("//*[@class='SearchPage_modalBody__3AbJz']")}

get btnViewAll() { return $("//li//*[text()='View all']")}

get btnNextPage() { return $("//*[text()='Next']")}

get btnPreviousPage() { return $("//*[text()='< Previous']")}

get searchResultPageCount() { return $$("//*[@class='pagination']/li")}

get labelNoResultFound() { return $("//*[text()='Sorry, no results were found']")}

btnChangePage(pageNumber) { return $(`(//*[@class='pagination']/li)[${pageNumber}]`)}

get docAskADoubtTitle(){return $('//*[text()="Instant Doubt Solver"]')}

get docSearchField(){return $('#searchInput')}

get instaLearnAskADoubtTitle(){return $("//*[text()='Instant Doubt Solver']")}

get instaLaernSearchField(){return $('#searchInput')}

get questionHeaderInAskaDoubt(){return $(`(//div[@class="instalearnContainer"]//*/h1)[1]`)}

get TitleAskADoubt() {return $("//div[contains(text(),'Instant Doubt Solver')]")}
    
get DoubtPlaceholder() {return $("//input[@placeholder='Search for questions']")}
    
get btnAskADoubt() {return $("(//div[contains(text(),'Ask a doubt')])[1]")}


async navigateToAskADoubt() {
    await DashboardPage.menuOption.waitForClickable({timeout : 7000})
    await DashboardPage.menuOption.click()
    await browser.pause(1000)
    await DashboardPage.btnAskADoubt.waitForClickable({timeout : 1500})
    await DashboardPage.btnAskADoubt.click()
}

async navigateToAskADoubtAndPageLoad(cohortDetail) {

    await DashboardPage.menuOption.waitForClickable({timeout:15000})
    await DashboardPage.menuOption.click()
    await browser.pause(1000)
        
    if (loginData.askADoubtNotApplicable.includes(cohortDetail)) {

        expect(await DashboardPage.btnAskADoubt.isDisplayed()).toEqual(false)
    }

    else {

    await DashboardPage.btnAskADoubt.waitForClickable({timeout : 1500})
    await DashboardPage.btnAskADoubt.click()

    expect(await this.pageTitle.waitForDisplayed({timeout : 1500}))
    expect(await this.btnAskADoubt.waitForDisplayed({timeout : 1500}))

    }  

}
    async docAskADoubtAppUrl(){
        let askADoubtAppUrl=await browser.getUrl()
        return askADoubtAppUrl;
    }
    
    async instaLaernAskADoubtUrl(){
        let askaDoubtUrl=await browser.getUrl()
        return askaDoubtUrl;
    }

}    

export default new AskADoubtPage();