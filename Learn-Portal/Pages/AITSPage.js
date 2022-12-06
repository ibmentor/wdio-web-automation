import BasePage from "./BasePage";
import { loginData } from "../Data/LoginData"
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";


class AITSPage extends BasePage {

    
    get menuOption()  {return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }

    get btnAITS() {return $("//span[text()='All India Test Series (AITS)']") }

    get btnJeeAdvance() {return $("(//span[text()='JEE Advanced'])[2]") }

    get btnJeeMain() {return $("(//span[text()='JEE Main'])[2]") }

    get btnNeet() {return $("//a[@data-menu-key='neet-aits']/span") }

    get labelOfMainpage() { return $("//*[@class='css-17wwswp']")}

    get labelOfTestCard() { return $("(//div[@class='border exam-card card'])[1]")}

    get labelPaper1() {return $("(//*[text() = 'Paper 1'])[1]")}

    get labelPaper2() {return $("(//*[text() = 'Paper 2'])[1]")}

    get labelOfTimeAndQuestion1() {return $("(//div[@class='duration-section mt-1'])[1]")}

    get labelOfTimeAndQuestion2() {return $("(//div[@class='duration-section'])[2]")}

    get btnAITSAskADoubt() {return $("//button[contains(@class,'btn-ask-a-doubt')]")}

    get btnAITSConceptVideo() {return $("//button[normalize-space()='View Concept Videos']")}

    get btnAITSBookMark() {return $("//button[normalize-space()='Go to Bookmarks']")}

    get AskaDoubtpageheader() {return $("//*[contains(text(),'Got a doubt')]")}

    get btnStartTest() {return $("(//button[@class='start-test-btn btn'])[1]")}

    get btnViewSyllabus() {return $("(//button[@type='button'][normalize-space()='View Syllabus'])[1]")}

    get btnStartTestInstructionpopup() {return $("//a[@class= 'start-test-btn btn btn-primary']")}

    get labelJeeMainAssess() {return $("//span[contains(text(),'Main')]")}

    get labelJeeAdvancedAssess() {return $("//span[contains(text(),'Advanced')]")}

    get labelNEETAssess() {return $("//span[contains(text(),'NEET')]")}

    get labelInstructionPopup() {return $("(//div[@class='instruction-title modal-title h4'])[1]")}

    get btnCloseInstructionPopup() {return $("(//i[@class='mdi mdi-close'])[1]")}

    get btnViewConceptVideos() {return $("(//button[normalize-space()='View concept videos'])[1]")}

    get btnUpcoming() {return $("//*[contains(@class,'custom-list')]//li[1]")}

    get btnCompleted() {return $("//*[contains(@class,'custom-list')]//li[2]")}

    get btnSkipped() {return $("//*[contains(@class,'custom-list')]//li[3]")}

    get labelNoTestAvailable() {return $("//*[@class='heading font-16']")}

    get testFilter() {return $("//div[@class='d-flex flex-row align-items-center']")}

    get labelExamName() {return $("(//div[@class='border exam-card card'])[1]//p[contains(@class,'exam-name')]")}

    get testCheckbox() {return $("//input[@type='checkbox']")}
 
    get btnTestYes() {return $("//*[text()='Yes']")}

    get btnTestProceed() {return $("//button[text()='PROCEED']")}

    get btnTestSubmit() {return $("//button[text()='SUBMIT']")}

    get btnViewAnalysis() {return $("(//*[text()='View Analysis'])[1]")}

    completedLabelExamName(examName) {return $(`//*[contains(@class,"exam-name") and text()="${examName}"]`)}

    get popupViewSyllabus() {return $("//*[@class='modal-content']")}

    get btnPopupStartTest() {return $("//*[@class='modal-dialog modal-lg modal-dialog-centered']//*[text()='Start Test']")}


    //Compering the time and Question for testcard here
    async timeAndQuestions(input) {
        input = input.split(" ")
        if (parseInt(input[0]) > 5 && parseInt(input[3]) > -1) {
            return true
        }else{
            return false
        }
    }

    async navigateToAITSModule() {

        await this.menuOption.waitForClickable({timeout:15000})
        await this.menuOption.click()
               
        //await browser.pause(5000)// waiting for the menubar to load completely

        let btnAITSDisplayed = await this.btnAITS.isDisplayed()

        //If AITS module is visible this case will pass
        if(btnAITSDisplayed){
            await this.btnAITS.waitForClickable({timeout:15000 })
            await this.btnAITS.click()
        }
    }

    async navigateToAITSAndVerifyPageLoad(cohortDetail,user) {

        console.log("user",user)
        console.log("cohort",cohortDetail)

        await this.menuOption.waitForClickable({timeout:15000})
        await this.menuOption.click() 
        await browser.pause(1000)              
       
        //For the free and paid user AITS  test is not visible
        if (user == "free" || user == "paid"){
                      
            expect(await this.btnAITS.isDisplayed()).toEqual(false)
        }
        else if (user == "Premium" && loginData.aitsApplicable.includes(cohortDetail) )
        {
            await this.btnAITS.waitForClickable({timeout:25000 })
            await this.btnAITS.click()
            await browser.pause(5000)
            await this.btnJeeAdvance.waitForDisplayed({timeout:1500})
            await this.btnJeeAdvance.click()
            expect(await this.labelOfTestCard.waitForDisplayed({timeout : 45000}))
            await this.btnAITS.click()
            await this.btnJeeMain.waitForDisplayed({timeout : 1500})
            await this.btnJeeMain.click()
            expect(await this.labelOfTestCard.waitForDisplayed({timeout:4500}))
            await this.btnAITS.click()
            await this.btnNeet.waitForDisplayed({timeout:1500})
            await this.btnNeet.click()
            expect(await this.labelOfTestCard.waitForDisplayed({timeout:45000}))

        }
    }

    async navigateToAITSselectSubject(subject) {
        await DashboardPage.menuOption.click()
        await browser.pause(2000)
        await this.btnAITS.waitForClickable({ timeout: 45000 })
        await this.btnAITS.click()
        await browser.pause(2000)
      
        if (subject == "JEE Main") {
      
            await this.btnJeeMain.waitForClickable({ timeout: 25000 })
            await this.btnJeeMain.click()
        }
        else if (subject == "JEE Advanced") {
            await this.btnJeeAdvance.waitForClickable({ timeout: 25000 })
            await this.btnJeeAdvance.click()
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
export default new AITSPage();
