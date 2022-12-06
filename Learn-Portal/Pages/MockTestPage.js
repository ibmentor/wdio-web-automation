import BasePage from "./BasePage";
import { loginData } from "../Data/LoginData"
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";


class MockTestPage extends BasePage {


    get ddmockTest() {return $("//span[normalize-space()='Mock Test']") }

    get btnJeeAdvanced() {return $("//a[@href='/learn/mock-tests/jee-advanced']") }

    get btnJeeMain() {return $("//*[@href='/learn/mock-tests/jee-mains']") }

    get btnNeet() {return $("//*[@href='/learn/mock-tests/neet']") }

    get btnBitsat() {return $("//*[@href='/learn/mock-tests/bitsat']")}

    get labelOfMainpageJeeAdvanced() { return $("//*[@Class= 'css-17wwswp']")} 

    get labelOfTestCardJeeAdvanced() { return $("//*[@Class= 'exam-name mb-0 pb-1']")}

    get labelPaper1() {return $("(//*[text() = 'Paper 1'])[1]")}

    get labelPaper2() {return $("(//*[text() = 'Paper 2'])[1]")}

    get labelOfTimeAndQuestion1() {return $("(//div[@class='duration-section'])[1]")}

    get labelOfTimeAndQuestion2() {return $("(//div[@class='duration-section'])[2]")}

    get btnMocktest () {return $("(//span[normalize-space()='Mock Test'])[1]")}
   
    ddmockTestList(headernumber) {return $(`(//a[@class='side-nav-link-ref side-sub-nav-link'])[${headernumber}]`)}

    get btnTakeTest() {return $("(//div[@class= 'row'][2]//button[@class= 'start-test-btn m-0 btn btn-primary'])[1]")}

    get btnStartTest() {return $("//a[@class= 'start-test-btn btn btn-primary']")}

    get labelJeeMainAssess() {return $("//span[contains(text(),'JEE Main')]")}

    get labelJeeAdvancedAssess() {return $("//span[contains(text(),'Advanced')]")}

    get labelNEETAssess() {return $("//span[contains(text(),'NEET')]")}

    get btnTakeTestSampleMockTest () {return $("(//button[@class='start-test-btn m-0 btn btn-primary'])[1]")}

    get labelInstructionPopup() {return $("//div[@class='instruction-title modal-title h4']")}

    get btnCloseInstructionPopup() {return $("(//i[@class='mdi mdi-close'])[1]")}

    get btnViewConceptVideos() {return $("//*[text()='View Concept Videos']")}

    get btnUpcoming() {return $("//*[contains(@class,'custom-list')]//li[1]")}

    get btnCompleted() {return $("//*[contains(@class,'custom-list')]//li[2]")}

    get btnSkipped() {return $("//*[contains(@class,'custom-list')]//li[3]")}

    get labelNoTestAvailable() {return $("//*[@class='heading font-16']")}

    get testFilter() {return $("//div[@class='d-flex flex-row align-items-center']")}

    get btnMockTestBookMarks() {return $("//button[text()='Go to Bookmarks']")}

    get btnAnalysis() { return $("(//*[contains(text(),'Analysis')])[1]") }

    get headingAkashJeeMainMockTest() { return $('//header[@class="header-container"]/div/div/div/div/div') }

    get btnMockTestAskADoubt() {return $("//button[contains(@class,'btn-ask-a-doubt')]")}

    get btnViewSyllabus() {return $("(//button[@type='button'][normalize-space()='View Syllabus'])[1]")}

   
    //Compering the time and Question for testcard here
    async timeAndQuestions(input) {
        if (parseInt(input.slice(0,3).trim()) >= 60 && parseInt(input.slice(12,14).trim()) > 10) {
            return true
        }else{
            return false
        }
    }

    async navigateToMockTestModule() {

        await DashboardPage.menuOption.waitForClickable({timeout:15000})
        await DashboardPage.menuOption.click()
        await browser.pause(5000)// waiting for the menubar to load completely

        await this.btnMocktest.waitForDisplayed({timeout:15000 }) 
        expect(await this.btnMocktest.isDisplayed()).toEqual(true)

        await this.btnMocktest.click()
        }


        async navigateMockTestAndVerifyPageLoad(user) {

            await DashboardPage.menuOption.waitForClickable({timeout:15000})
            await DashboardPage.menuOption.click()
            await browser.pause(1000)               
               
            //For the free and paid user Mock test is not visible
            if (user == "free" || user == "paid"){
                expect(await this.btnMocktest.isDisplayed()).toEqual(false)
            }
            else if (user == "Premium" && loginData.mocktestApplicable.includes(cohortDetail))
            {
                await this.btnMocktest.waitForClickable({timeout:15000 })
                await this.btnMocktest.click()
                await browser.pause(5000)
                await this.btnJeeAdvance.waitForDisplayed({timeout:1500})
                expect(await this.labelOfTestCard.waitForDisplayed({timeout : 45000}))
                await this.btnJeeMain.waitForDisplayed({timeout : 1500})
                expect(await this.labelOfTestCard.waitForDisplayed({timeout:4500}))
                await this.btnNeet.waitForDisplayed({timeout:1500})
                expect(await this.labelOfTestCard.waitForDisplayed({timeout:45000}))
                await this.btnBitsat.waitForDisplayed({timeout:1500})
                expect(await this.labelOfTestCard.waitForDisplayed({timeout:45000}))
    
            }
            
        }

        async navigateToMockTestselectSubject(subject) {

            await DashboardPage.menuOption.click()
            await browser.pause(2000)
            await this.btnMocktest.waitForDisplayed({ timeout: 45000 })
            await this.btnMocktest.click()
            await browser.pause(2000)
          
            if (subject == "JEE Main") {
          
                await this.btnJeeMain.waitForDisplayed({ timeout: 25000 })
                await this.btnJeeMain.click()
            }
            else if (subject == "JEE Advanced") {
                await this.btnJeeAdvanced.waitForClickable({ timeout: 25000 })
                await this.btnJeeAdvanced.click()
            }
            else if (subject == "NEET") {
                await this.btnNeet.waitForClickable({ timeout: 25000 })
                await this.btnNeet.click()
            }
        }
        async selectSubject(subject) {
          
            if (subject == "JEE Main") {
          
                await this.btnJeeMain.waitForClickable({ timeout: 25000 })
                await this.btnJeeMain.click()
            }
            else if (subject == "JEE Advanced") {
                await this.btnJeeAdvanced.waitForClickable({ timeout: 25000 })
                await this.btnJeeAdvanced.click()
            }
            else if (subject == "NEET") {
                await this.btnNeet.waitForClickable({ timeout: 25000 })
                await this.btnNeet.click()
            }
        }
        
        async GetMonthNumber(month){
            var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            return mS.indexOf(month) + 1;
          }
}


export default new MockTestPage();