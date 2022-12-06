import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import { loginData } from "../../../Data/LoginData"
import AskADoubtPage from "../../../Pages/AskADoubtPage"
import DashboardPage from "../../../Pages/DashboardPage"
import { baseUrl } from "../../../Config/Config"

describe("Learn Portal - Ask a doubt module test cases for Free user", async () => {
    it("306433 TC_01 Free user - Validate message for less than 3 digits", async () =>{
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("12")
        await browser.keys(["Enter"])
        expect(await AskADoubtPage.labelMinimumCharacterWarning.isDisplayed({timeout : 2000})).toEqual(true)
        allure.endStep();
    })

    it("306434 TC_02 Free user - Validate nevigation to Ask a Doubt and Take A Test Module", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("light")
        allure.startStep("Wait for the search result to get displayed",true)
        await AskADoubtPage.searchResult().waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for the search result to be Clickable",true)
        await AskADoubtPage.searchResult().waitForClickable({timeout : 3000})
        allure.startStep("Click on the searched result",true)
        await AskADoubtPage.searchResult().click()
        allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
        await AskADoubtPage.btnRightNavigationAskADoubt.waitForClickable({timeout : 2000})
        allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
        await AskADoubtPage.btnRightNavigationAskADoubt.click()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("solar")
        allure.startStep("Get the searched text",true)
        const doubtText = await AskADoubtPage.tfAskADoubt.getAttribute("value")
        allure.startStep("Validate the searched text with the text field",true)
        expect(doubtText).toEqual("solar")
        await browser.refresh()
        allure.startStep("Wait for Ask A Doubt button to be Clickable",true)
        await AskADoubtPage.btnRightNavigationAskADoubt.waitForClickable({timeout : 2000})
        allure.startStep("Click on Take a test Button",true)
        await AskADoubtPage.btnRightNavigationTakeATest.click()
        const currentUrl = await browser.getUrl()
        allure.startStep("Validate the navigation to Take a test page",true)
        expect(currentUrl.includes("chapter-wise-tests")).toEqual(true)
        allure.endStep();
    })

    it("306435 TC_03 Free user - Validate Page nevigation buttons i.e. Previous and Next Question", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("light")
        allure.startStep("Wait for the search result to get displayed",true)
        await AskADoubtPage.searchResult().waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for the search result to be Clickable",true)
        await AskADoubtPage.searchResult().waitForClickable({timeout : 3000})
        allure.startStep("Click on the searched result",true)
        await AskADoubtPage.searchResult().click()
        allure.startStep("Wait for Next page Button to be displayed",true)
        await AskADoubtPage.btnNextPage.waitForDisplayed({timeout : 2000})
        allure.startStep("Validate Next page button",true)
        expect(await AskADoubtPage.btnNextPage.isDisplayed()).toEqual(true)
        allure.startStep("Wait for Previous page Button to be displayed",true)
        await AskADoubtPage.btnPreviousPage.waitForDisplayed({timeout : 2000})
        allure.startStep("Validate Previous page button",true)
        expect(await AskADoubtPage.btnPreviousPage.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306436 TC_04 Free user - Validate View all button in Ask A Doubt searched result page", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("light")
        allure.startStep("Wait for View All button to get displayed",true)
        await AskADoubtPage.btnViewAll.waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for View All button to be Clickable",true)
        await AskADoubtPage.btnViewAll.waitForClickable({timeout : 3000})
        allure.startStep("Click View All button",true)
        await AskADoubtPage.btnViewAll.click()
        allure.startStep("Wait for searched result page 1st element to be displayed",true)
        await $("(//*[@class='SearchPage_modalBody__3AbJz'])[1]").waitForDisplayed({timeout : 5000})
        let searchResultDivCount = await AskADoubtPage.searchResultCount.length
        expect(searchResultDivCount>1).toEqual(true)
        allure.startStep("Wait for searched result page 1st element question to be clickable",true)
        await $("(//*[@class='SearchPage_questionsAlign__3ezll'])[1]").waitForClickable({timeout : 2000})
        allure.startStep("Click searched result page, 1st element question",true)
        await $("(//*[@class='SearchPage_questionsAlign__3ezll'])[1]").click()
        allure.startStep("Wait for the question's Solution page to be displayed",true)
        await $("//*[text()='solution:']").waitForDisplayed({timeout : 3000})
        allure.startStep("Validate the question's Solution page",true)
        expect(await $("//*[text()='solution:']").isDisplayed()).toEqual(true)        
        allure.endStep();
    })
    
    it("306437 TC_05 Free user - Validate Pagination buttons", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("light")
        allure.startStep("Wait for View All button to get displayed",true)
        await AskADoubtPage.btnViewAll.waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for View All button to be Clickable",true)
        await AskADoubtPage.btnViewAll.waitForClickable({timeout : 3000})
        allure.startStep("Click View All button",true)
        await AskADoubtPage.btnViewAll.click()
        allure.startStep("Wait for searched result page 1st element to be displayed",true)
        await $("(//*[@class='SearchPage_modalBody__3AbJz'])[1]").waitForDisplayed({timeout : 5000})
        let paginationCount = await AskADoubtPage.searchResultPageCount.length    
        if (paginationCount>1){      
            allure.startStep("Validate Pagination button navigating to next page")
            for(let i=2;i<=paginationCount;i++){  
                await AskADoubtPage.btnChangePage(i).waitForClickable({timeout : 2500})
                await AskADoubtPage.btnChangePage(i).click()
                await $("(//*[@class='SearchPage_modalBody__3AbJz'])[1]").waitForDisplayed({timeout : 5000})
                expect(await $("(//*[@class='SearchPage_modalBody__3AbJz'])[1]").isDisplayed()).toEqual(true)
            }
        }
        allure.endStep();
    })

    it("306438 TC_06 Free user - Validate No Result found, for invalid rearched data", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("qwertqa")
        allure.startStep("Wait for View All button to get displayed",true)
        await AskADoubtPage.btnViewAll.waitForDisplayed({timeout : 5000})
        await browser.keys(["Enter"])
        allure.startStep("Wait for No result found label to be displayed",true)
        await await AskADoubtPage.labelNoResultFound.waitForDisplayed({timeout : 4000})
        allure.startStep("Validate No result found label",true)
        expect(await AskADoubtPage.labelNoResultFound.isDisplayed()).toEqual(true) 
        allure.endStep();
    })

    it("306439 TC_07 Free user - Validate Bread Crumb in Search results", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("solar")
        allure.startStep("Wait for the search result to get displayed",true)
        await AskADoubtPage.searchResult().waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for the search result to be Clickable",true)
        await AskADoubtPage.searchResult().waitForClickable({timeout : 3000})
        allure.startStep("Click on the searched result",true)
        await AskADoubtPage.searchResult().click()
        allure.startStep("Wait for Search bread crumb to get displayed",true)
        await AskADoubtPage.labelBreadCrumb("Search").waitForDisplayed({timeout : 3000})
        allure.startStep("Validate Search bread crumb is displayed",true)
        expect(await AskADoubtPage.labelBreadCrumb("Search").isDisplayed()).toEqual(true)
        expect(await AskADoubtPage.labelBreadCrumb(">").isDisplayed()).toEqual(true)
        allure.startStep("Validate Question bread crumb is displayed",true)
        expect(await AskADoubtPage.labelBreadCrumb("Question").isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306440 TC_08 Free user - Validate Download button and profile sections are available in Ask a doubt", async () =>{
        
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'free')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Enter topic to search",true)
        await AskADoubtPage.tfAskADoubt.setValue("light")
        allure.startStep("Wait for View All button to get displayed",true)
        await AskADoubtPage.btnViewAll.waitForDisplayed({timeout : 3000})
        allure.startStep("Wait for View All button to be Clickable",true)
        await AskADoubtPage.btnViewAll.waitForClickable({timeout : 3000})
        allure.startStep("Click View All button",true)
        await AskADoubtPage.btnViewAll.click()
        allure.startStep("Validate Download App button is present")
        expect(await DashboardPage.btnDownloadApp.isDisplayed()).toEqual(true)
        allure.startStep("Validate Profile button is present",true)
        expect(await DashboardPage.ddProfile.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306441 TC_09 doubtsOnChatUser - Validate doubtsOnChatUser integration with Learn portal",async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'doubtsOnChatUser')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Verify app url")
        expect(await AskADoubtPage.docAskADoubtAppUrl()).toEqual(baseUrl+"ask-a-doubt")
        await $("//*[@class='DoubtsOnChat ']").waitForDisplayed({timeout : 4500})
        allure.startStep("Verify the Ask A Doubt Text visible on page",true)
        const frame= await $('//iframe[@title="DoubtsOnChat"]')
        await browser.switchToFrame(frame)
        await AskADoubtPage.docAskADoubtTitle.waitForDisplayed({timeout:5000})
        expect(await AskADoubtPage.docAskADoubtTitle.isDisplayed()).toEqual(true);
        allure.startStep("Verify the search field visible on page",true)
        expect(await AskADoubtPage.docSearchField.isDisplayed()).toEqual(true);
        allure.endStep();        

    });

    it("306442 TC_10 instaLearnUser - Validate instaLearnUser integration with Learn portal",async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[9]
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(cohortDetail,'instaLearnUser')
        allure.startStep("Nevigate to Ask A doubt search bar",true)
        await AskADoubtPage.navigateToAskADoubt()
        allure.startStep("Verify app url")
        expect(await AskADoubtPage.instaLaernAskADoubtUrl()).toEqual(baseUrl+"ask-a-doubt")
        allure.startStep("Verify the Instant Doubt Solver Text visible on page",true)
        await $("//*[@class='DoubtsOnChat ']").waitForDisplayed({timeout : 4500})
        const frame= await $('//iframe[@title="DoubtsOnChat"]')
        await browser.switchToFrame(frame)
        await AskADoubtPage.instaLearnAskADoubtTitle.waitForDisplayed({timeout:20000})   
        expect(await AskADoubtPage.instaLearnAskADoubtTitle.isDisplayed()).toEqual(true);
        allure.startStep("Verify the search field visible on page",true)
        expect(await AskADoubtPage.instaLaernSearchField.isDisplayed()).toEqual(true);        
        allure.endStep()
    })
})