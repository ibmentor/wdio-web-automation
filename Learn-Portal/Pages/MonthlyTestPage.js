class Monthlytestpage{

    get menuOption()  {return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }
    
    get btnMonthlyExam() {return $("//span[text()='Monthly Exam']") }
    
    get labelOfMainpage() { return $("//*[@class='css-17wwswp']")}
    
    get labelOfBookmarkpage() { return $("//*[text()='Subject Bookmarks']")}
    
    get labelOfTestCard() { return $("(//div[contains(@class,'border exam-card')])[1]")}
    
    get labelPaperName1() {return $("(//*[text() = 'Paper 1'])[1]")}
    
    get labelPaperName2() {return $("(//*[text() = 'Paper 2'])[1]")}
    
    get labelOfTimeAndQuestion1() {return $("(//div[@class='duration-section mt-1'])[1]")}
    
    get labelOfTimeAndQuestion2() {return $("(//div[@class='duration-section'])[2]")}
    
    get btnAskADoubt() {return $("(//button[normalize-space()='Ask a Doubt'])[1]")}
    
    get btnConceptVideo() {return $("//button[@class='sc-jRQBWg iPpGag btn btn btn btn-brown btn-sm']")}
    
    get btnBookMark() {return $("(//button[normalize-space()='Go to Bookmarks'])[1]")}
    
    get btnStartTest() {return $("(//button[@class='start-test-btn btn'])[1]")}
    
    get startTestPopupInstruction() {return $("//*[contains(@class,'instruction-title')]")}
    
    get startTestPopupPaperName() {return $("//*[@class='paper']//*[contains(@class,'paper-txt')]")}
    
    get startTestPopupPaperTimeAndQuestion() {return $("//*[@class='paper']//*[contains(@class,'duration-section')]")}
    
    get startTestPopupBtnStartTest() {return $("//a[@class= 'start-test-btn btn btn-primary']")}
    
    get btnMonthlytest(){return $("//p[text()='Revisit important pages ']")}
    
    get headingMonthlytest(){return $('//h1[@class="css-17wwswp"]')}
    
    get btnConceptVideo(){return $("//button[text()='View Concept Videos']")}
    
    get headingConceptVideo(){return $("//p[text()='Concept Videos']")}
    
    get subHeadingConceptVideo(){return $("//p[text()='Browse video lessons']")}
    
    get btnCompleted() {return $("//*[contains(@class,'custom-list')]//li[2]")}
    
    get btnUpcomingTab(){return $('//li[text()="Upcoming"]')}
    
    get btnCompletedTab(){return $('//li[text()="Completed"]')}
    
    get btnSkippedTab(){return $('//li[text()="Skipped"]')}
    
    get papaerTag(){return $('(//p[@class="paper-txt my-1"])[1]')}
    
    get labelValidDateAndTime(){return $('(//i[@class=" mdi mdi-calendar-range calender-icon  test-status"])[1]')}
    
    get labelNoTest(){return $("//p[text()='No tests taken so far']")}
    
    get labelSubHeadingCompletedTest(){return $("//span[text()='Your completed tests will appear here']")}
    
    get labelSkipValidDateAndTime(){return $('(//i[@class=" mdi mdi-calendar-range calender-icon  test-status"])[1]')} 
    
    get headingInSkippedTest(){return $("//p[text()='You’re all caught up!']")}
    
    get subHeadingSkippedTest(){return $("//span[text()='Keep up the learning until the next test']")}
    
    get btnDetailedAnalysis(){return $("(//a[contains(text(),'Detailed Analysis')])[1]")}
    
    get labelResultAvaialble(){return $('(//p[@class="mb-0 avaiable-on"])[1]')}
    
    get labelAttemptsLeft1() {return $("(//*[contains(text(),'Attempts Left:')])[1]")}
    
    get labelAttemptsLeft2() {return $("(//*[contains(text(),'Attempts Left:')])[2]")}
    
    get labelExamName() {return $("(//div[@class='border exam-card card'])[1]//p[contains(@class,'exam-name')]")}
    
    get labelAvailableTill1() {return $("(//*[contains(text(),'Available Till')])[1]")}
        
    get labelAvailableTill2() {return $("(//*[contains(text(),'Available Till')])[2]")}
    
    get cupImage(){return $('//img[@alt="Cup"]')}
    
    get labelRank(){return $("//span[text()='Rank ']")}
    
    get labelPercentile(){return $("//div[text()='Percentile']")}
    
    get labelScore(){return $("//*[text()='Score']")}
    
    get labelNoTestAvailable() {return $("//*[@class='heading font-16']")}
    
    get subHeadingComeBackLater(){return $("//span[text()='Come back again later']")}
    
    get testCheckbox() {return $("//input[@type='checkbox']")}
    
    get btnTestProceed() {return $("//button[text()='PROCEED']")}
    
    get btnTestSubmit() {return $("//button[text()='SUBMIT']")}
    
    get btnTestYes() {return $("//*[text()='Yes']")}
    
    completedLabelExamName(examName) {return $(`//*[contains(@class,"exam-name") and text()="${examName}"]`)}
    btnResumeTest(examName) {return $(`//*[contains(text(),'${examName}')]/..//*[contains(text(),'Resume Test')]`)}
    
    async navigateToMonthlyTestModule() {
    
        await this.menuOption.waitForClickable({timeout:15000})
        await this.menuOption.click()
    
        let btnMonthlyTestDisplayed = await this.btnMonthlyExam.isDisplayed()
    
        //If Monthly Test module is visible this case will pass
        if(btnMonthlyTestDisplayed){
            await this.btnMonthlyExam.waitForClickable({timeout:15000 })
            await this.btnMonthlyExam.click()
        }
    }
    
    async GetMonthNumber(month){
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return mS.indexOf(month) + 1;
      }
    
      async completeTest(){
        try{await this.labelOfTestCard.waitForDisplayed({timeout:25000})}
        catch{}
        if (await this.labelOfTestCard.isDisplayed({timeout:25000})){
            let examName = await this.labelExamName.getText()
            await this.btnStartTest.isClickable({ timeout: 15000 })
            await this.btnStartTest.click()
            await this.startTestPopupBtnStartTest.waitForDisplayed({timeout : 3000})
            await this.startTestPopupBtnStartTest.click()
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            await browser.keys(["PageDown","PageDown","PageDown","PageDown","PageDown","PageDown"])
            await this.testCheckbox.waitForDisplayed({timeout : 4500})
            await browser.pause(700)
            await this.testCheckbox.click()
            await this.btnTestProceed.waitForDisplayed({timeout : 3000})
            await browser.pause(700)
            await this.btnTestProceed.click()
    
            await this.btnTestSubmit.waitForDisplayed({timeout : 4500})
            await this.btnTestSubmit.click()
            await this.btnTestYes.waitForDisplayed({timeout : 4500})
            await this.btnTestYes.click()
    
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
            await browser.refresh()
            return true
        }
        else{
            await this.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
            expect(await this.labelNoTestAvailable.isDisplayed()).toEqual(true)
            return false
        }
    }
    
      
    
    }
    export default new Monthlytestpage()
    
