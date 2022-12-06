import BasePage from "./BasePage";

class DashboardPage extends BasePage {

  /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get btnDownloadApp() { return $("(//*[@class='dl-title' and contains(text(),'Download App')])[1]")}

    get labelFAQ() { return $("//*[contains(text(),'FAQ')]")}  

    get btnGooglePlayStore() { return $("//*[@alt='Google Play store']")}

    get btnAppleStore() { return $("//a/img[@alt='App store']")}

    get ddProfile() { return $("//*[@id='dropdown-profile']") }

    get btnProfile() { return $("//*[contains(text(),'My profile')]") }  

    get ddcohortSelection() { return $("//*[@class=' css-ackcql']") }

    get menuOption()  {return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }

    get btnbookYourTrialClasses()  {return $("(//a[normalize-space()='Book a Trial Class'])[1]") }

    get btnbookaFreeTrialCTA()  {return $("(//button[normalize-space()='Book a Free Trial'])[1]") }

    get bannerByjusClasses()  {return $("//img[@alt='banner-image']") }

    get bannerheadingByjusClasses()  {return $("//*[@class='css-17wwswp']") }

    get imgAakashOnline()  {return $("//img[@alt='moduleImage']") }

    get labelAskAQues()  {return $("//*[normalize-space()='Ask a question. Get a verified answer.']") }

    get btnjoinAClassInsideBookATrialPopup()  {return $("(//a[normalize-space()='Book a Trial Class'])[1]") }

    changedClass(calssNumber) { return $(`//div[@id="dropdown-profile"]//span[contains(text(),"${calssNumber}")]`) }
    
    get topnavHamburger() { return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }
    
    get btnHome() { return $('//span[normalize-space()="Home"]')}

    get btnConceptVideos() { return $('//li[@class="side-nav-item"]//span[text()="Concept Videos"]') }

    get btnAllSubjects() { return $('//li[@class="side-nav-item"]//a[@href="/learn/all-subjects"]') }

    get btnByjusCorner() { return $('//li[@class="side-nav-item"]//span[text()="BYJU\'s Corner"]') }

    get btnFaqs() { return $('//li[@class="side-nav-item"]//span[text()="FAQs"]') }

    get btnByjusClasses() { return $(`//li[@class='side-nav-item']//span[text()="BYJU'S Classes"]`) }

    get btnBCE() { return $('//li[@class="side-nav-item"]//span[text()="BCE"]') }

    get btnAdaptivePracticeQuestions() { return $('//li[@class="side-nav-item"]//span[text()="Adaptive Practice Questions"]') }

    get btnChapterWiseTests() { return $('//li[@class="side-nav-item"]//span[text()="Chapter wise test"]') }

    get btnAskADoubt() { return $('//li[@class="side-nav-item"]//span[text()="Ask a Doubt"]') }

    get btnRevision() { return $('//li[@class="side-nav-item"]//span[text()="Revision"]') }

    get btnDownloads() { return $('//li[@class="side-nav-item"]//span[text()="Downloads"]') }

    get btnBookmarks() { return $('//li[@class="side-nav-item"]//span[text()="Bookmarks"]') }

    get labelWelcome() { return $('//h3[contains(text(),"Welcome")]') }

    get btnAITS() { return $('li[@class="side-nav-item"]//span[text()="All India Test Series (AITS)"]')}

    get btnAITSJEEAdvance() { return $("//a[@data-menu-key='jee-advanced-aits']//span[text()='JEE Advanced']")}

    get btnAITSJEEMain() { return $("//a[@data-menu-key='jee-main-aits']//span[text()='JEE Main']")}

    get btnAITSNEET() { return $("//a[@data-menu-key='neet-aits']//span[text()='NEET']")}

    get btnconceptVideos() { return $("//button[text()='Concept Videos']") }

    get bannerheadingConceptVideos() { return $("//*[@class='css-17wwswp']") }
  
    get btnviewAllConceptVideo () { return $("//*[text()='View all']") }

    get btnBookmarkOnDashboard(){return $('(//p[@class="card-name mb-1"])[1]')}

    get btnTakeTestOnDashboard(){return $('(//p[@class="card-name mb-1"])[2]')}

    get btnaskADoubtviewAllConceptVideo() { return $("(//button[@class='sc-jRQBWg iRpWqG btn concept-btn btn btn-brown btn-sm'][normalize-space()='View concept videos'])[1]") }

    get btnAakashLive() { return $("//a[@data-menu-key='aakash-dashboard']") }
    
    get btnQuestionAndAnswer() { return $("(//button[normalize-space()='Question and Answer'])") }
    
    get btnConceptVideosViewAll() { return $("//*[text()='View all']") }

    get labelByjusWorld(){return $(`//*[text()="Explore BYJU'S World of Learning"]`)}

    get btndashboardAskADoubt(){return $('(//p[@class="card-name mb-1"])[1]')}

    get btnDashboardAdaptiveTest(){return $('(//p[@class="card-name mb-1"])[2]')}

    get btnDashboardDownloads(){return $('(//p[@class="card-name mb-1"])[3]')}

    get labelExperienceByjusApp(){return $(`//*[text()="Experience BYJU'S The Learning App"]`)}

    get btnDownloadAppBTC(){return $('//button[text()="Download the App Now"]')}

    get labelAppRating(){return $(`//*[contains(text(),'App Ratings')]`)}

    get btnRequestACallBackOnMainPage(){return $("(//button[text()='Request a Call'])[1]")}

    get btnRequestCallBackInViewAllCenter(){return $("(//button[text()='Request a Call'])[2]")}

    get btnViewAllCentre(){return $("//button[text()='View All Centers']")}

    get labelExperienceClassroom(){return $("//*[text()='Experience the Futuristic Classrooms near you!']")}

    get btnViewMoreSlots(){return $("//button[text()='View More Slots']")}

    get btnJoinNow(){return $("//button[@cursor='pointer' and contains(text(),'Join Now')]")}

    get viewAllCentrePopUp(){return $("//h2[text()='View all Centres']")}

    get btnCurrentLocationPopUp(){return $("//button[text()='Use my Current Location']")}

    get labelStateOnPopUp(){return $("//*[text()='State']")}

    get labelCityOnPopUp(){return $("//*[text()='City']")}

    get tfStateInput(){return $('//input[@class="state-select__input"]')}

    get tfCityInput(){return $('//input[@class="city-select__input"]')}

    get getTimeOnCard(){return $('//*[text()="Join Now"]/following::span')}

    get tfBookingSuccessMessage(){return $("//*[text()='Call booked successfully, We will get in touch with you soon.']")}
  
    get labelExperienceFuturisticClassroom(){return  $("//*[text()='Experience the Futuristic Classrooms near you!']")}

    get seatsLeft(){return $('//div[@class="css-1ovoirf"]')}

    get labelAppleStore(){return $('//*[@class="we-localnav__title__product"]')}

    get appAvailabilityText(){return $('//p[@class="we-banner__copy"]')}

    get dashboardConceptVideoCard(){return $("(//div[contains(@class,'dashboard_videoCardBlock__')])[1]")}

    get subjectNameOnBTCCard(){return $(`//*[contains(@class,'css-1gn7xbl')] | //*[contains(@class,'css-1uudmmt')]`)}
    get subjectTopicOnBTCCard(){return $('//*[@class="css-5wi7ts"]')}

    get DateOnBTCCard(){return $('(//span[@class="css-1ow46rq"])[1]')}

    get TimeOnBTCCard(){return $('(//span[@class="css-1ow46rq"])[2]')}

    get onBoardingCheckList() {return $("(//div[contains(@class,'horizontal-steps-content')])[2]")}
    get learnAnytimeTitle() {return $("//*[contains(@class,'dashboard_introCard_header')]")}
    get dayGreetingText() {return $("//h1[contains(text(),'Good')]")}
    get byjusAppDownloadLogo(){return $("//*[contains(@src,'downloadLogo')]")}
    get byjusTutionCenterLogo(){return $("//*[contains(@src,'btclogo')]")}
    get yourUpcomingClassTitle() {return $("//*[contains(text(),'Your upcoming class')]")}
    get backdrop(){return $('.highlight-component-backdrop')}
    get oldBackExperineceTitle() {return $("//*[contains(text(),'To go back to old learning experience')]")}
    get btnToNavigateOldPortal() {return $("//*[contains(@class,'TopStrip_linkBtn')]")}
    get exploreTitle() {return $("//*[contains(text(),'World of Learning')]")}
    get neoLogo() {return $("//*[contains(@src,'neoLogo')]")}
    get chooseSubjTitle(){return $("//*[contains(text(),'Choose Your Subject')]")}
    get subjCard(){return $(`(//*[contains(@class,'dashboard-cwt mb-2 card')])[1]`)}
    get watchVideoSection(){return $(`//*[contains(text(),"Watch Videos - Learn with BYJU'S")]`)}
    get videoCardUnderwatchVideoSection(){return $("(//*[@alt='play-icon'])[1]")}
    get adaptiveTestWidget(){return $("//p[contains(text(),'Adaptive Test')]")}
    get askADoubtWidget(){return $("//p[contains(text(),'Ask a doubt?')]")}
    get downloadsWidget(){return $("//p[contains(text(),'Downloads')]")}
    get whatsnewExploreTitle(){return $(`//*[contains(text(),"What's new in BYJU'S Classes?")]`)}
    get questionAndAnswerBtn(){return $(`//button[contains(text(),'Question and Answer')]`)}
    get tfsearchField() { return $('//input[contains(@class,"searchInput")]') }
    get firstSuggestionAskaDoubt() { return $("(//*[contains(text(),'Gather information about solar light, solar water')])[1]") }
    get btnAskADoubtOnDashboard(){return $("//button[contains(text(),'Ask a Doubt')]")}

    get btnAnalysis(){return $("(//button[contains(text(),'ANALYSIS')])[1]")}

    get TopicCoveredTab(){return $("//span[text()='Topic Covered']")}

    get btnRetakeTestOnDashboard(){return $("(//button[text()='RETAKE TEST'])[1]")}

    get btnPracticeOnDashboard(){return $("(//button[text()='PRACTICE'])[1]")}
    get termsAndConditionLink() {return $("//*[contains(text(),'Terms of Use')]")}
    get privacyPolicyLink() {return $("//*[contains(text(),'Privacy Policy')]")}
    get termsAndConditionTitle() {return $("//*[normalize-space()='Terms and Conditions']")}
    get privacyPolicyTitle() {return $("//span[normalize-space()='Privacy Policy']")}
    get copyRightsText() {return $("//p[contains(@class,'theme-text')]")}


    async navigateToHomePageFromHamburgerMenu(){
        await this.menuOption.waitForClickable({ timeout: 15000 })
        await this.menuOption.click()
        await browser.pause(3000)
        expect(await this.btnHome.waitForClickable({ timeout: 5000 })).toEqual(true)
        await this.btnHome.click()
        await browser.pause(3000)
    }
    async validateDashboardForGrade1to3(classNumber) {
        await this.changedClass(classNumber).waitForDisplayed({timeout:5000});
        await this.labelWelcome.waitForDisplayed({timeout:5000})
        await this.topnavHamburger.click()
        await this.btnHome.waitForDisplayed({timeout:5000})
        await expect(await this.btnHome.isDisplayed()).toEqual(true);
        await expect(await this.btnConceptVideos.isDisplayed()).toEqual(true);
    }

    async validateDashboardForGrade4and5(user, classNumber) {
        await this.changedClass(classNumber).waitForDisplayed({timeout:5000});
        await this.labelWelcome.waitForDisplayed({timeout:5000})
        await this.topnavHamburger.click()
        await this.btnHome.waitForDisplayed({timeout:5000})
        if (user == "free" || user == "paid" || user == "premium")
        await expect(await this.btnHome.isDisplayed()).toEqual(true);
        await expect(await this.btnByjusClasses.isDisplayed()).toEqual(true);
        await expect(await this.btnAdaptivePracticeQuestions.isDisplayed()).toEqual(true);
        await expect(await this.btnChapterWiseTests.isDisplayed()).toEqual(true);
        await expect(await this.btnAskADoubt.isDisplayed()).toEqual(true);
        await expect(await this.btnConceptVideos.isDisplayed()).toEqual(true);
        await expect(await this.btnBookmarks.isDisplayed()).toEqual(true);

        if (user == "premium"){
            await expect(await this.btnBCE.isDisplayed()).toEqual(true);
        }
    }
    async validateDashboardForGrade4to10(user, classNumber) {
        await this.changedClass(classNumber).waitForDisplayed({timeout:5000});
        await this.exploreTitle.waitForDisplayed({timeout:5000})
        await this.topnavHamburger.click()
        await this.btnHome.waitForDisplayed({timeout:5000})
        if (user == "free" || user == "paid" || user == "premium")
        await expect(await this.btnHome.isDisplayed()).toEqual(true);
        await expect(await this.btnByjusClasses.isDisplayed()).toEqual(true);
        await expect(await this.btnAdaptivePracticeQuestions.isDisplayed()).toEqual(true);
        await expect(await this.btnChapterWiseTests.isDisplayed()).toEqual(true);
        await expect(await this.btnAskADoubt.isDisplayed()).toEqual(true);
       // await expect(await this.btnRevision.isDisplayed()).toEqual(true);
        await expect(await this.btnDownloads.isDisplayed()).toEqual(true);
        await expect(await this.btnConceptVideos.isDisplayed()).toEqual(true);
        await expect(await this.btnBookmarks.isDisplayed()).toEqual(true);
        await expect(await this.btnAllSubjects.isDisplayed()).toEqual(true);

        if (user == "premium"){
            await expect(await this.btnBCE.isDisplayed()).toEqual(true);
        }
    }
    async validateDashboardForGrade11thTo12thJEE_NEET(user, classNumber) {
        await this.changedClass(classNumber).waitForDisplayed({timeout:5000});
        await this.labelWelcome.waitForDisplayed({timeout:2000})
        await this.topnavHamburger.click()
        await this.btnHome.waitForDisplayed({timeout:5000})
        if (user == "free" || user == "paid" || user == "premium")
        await this.btnHome.waitForDisplayed({timeout:20000})
        await this.btnHome.waitForDisplayed({timeout:5000})
        await expect(await this.btnHome.isDisplayed()).toEqual(true);
        await this.btnAakashLive.waitForDisplayed({timeout:5000})
        await expect(await this.btnAakashLive.isDisplayed()).toEqual(true);
        await this.btnConceptVideos.waitForDisplayed({timeout:5000})
        await expect(await this.btnConceptVideos.isDisplayed()).toEqual(true);

        if (user == "premium"){
            await expect(await this.btnBCE.isDisplayed()).toEqual(true);
        }
    }

    async validateDashboardForGrade11thTo12thCommerce(user, classNumber) {
        await this.changedClass(classNumber).waitForDisplayed({timeout:5000});
        await this.labelWelcome.waitForDisplayed({timeout:2000})
        await this.topnavHamburger.click()
        await this.btnHome.waitForDisplayed({timeout:5000})
        if (user == "free" || user == "paid" || user == "premium")
        await expect(await this.btnHome.isDisplayed()).toEqual(true);
        //await expect(await this.btnByjusClasses.isDisplayed()).toEqual(true);
        await expect(await this.btnAdaptivePracticeQuestions.isDisplayed()).toEqual(true);
        await expect(await this.btnChapterWiseTests.isDisplayed()).toEqual(true);
        await expect(await this.btnConceptVideos.isDisplayed()).toEqual(true);
        await expect(await this.btnBookmarks.isDisplayed()).toEqual(true);

        if (user == "premium"){
            await expect(await this.btnBCE.isDisplayed()).toEqual(true);
        }
    }

    async navigateToBookMarkAndSectionLoad(user){

        //For the free user book mark is not available
         if (user == "free"){
             expect(true)
         }
         else if (user == "Premium" || user == "paid")
         {
             await this.menuOption.waitForClickable({timeout:15000})
             await this.menuOption.click() 
             await this.btnBookmarks.waitForClickable({timeout : 1500})
             await this.btnBookmarks.click()                 
             expect(await this.tabRecentActivity.waitForDisplayed({timeout : 3500}))
         }     
     }
 
     async navigateToDownloadApp()
 
         {
            await browser.pause(1000)
             await this.btnDownloadApp.waitForDisplayed({timeout:10000})
             await this.btnDownloadApp.click()
             expect(await this.labelFAQ.waitForDisplayed({timout:5000}))
         }

     async validateJoinNowButtonBasedOnTheTimeInCard() {
            const timeDetailsOnCard = await this.getTimeOnCard
            await timeDetailsOnCard.waitForExist({ timeout: 3000 })
            await timeDetailsOnCard.scrollIntoView(true)
            await browser.pause(2000)
            const btnjoinNowCTA = await this.btnJoinNow
            await btnjoinNowCTA.waitForExist({ timeout: 3000 })
            const timeDetails = await timeDetailsOnCard.getText()
            const timeDetailsArray = await timeDetails.split(" ")
            let status = timeDetailsArray[0]
            if (status == "Starts") {
                let timeValue = timeDetailsArray[2]
                let timeUnit = timeDetailsArray[3]
    
                if (timeUnit == "mins") {
                    if (timeValue < 15) {
                        expect(await btnjoinNowCTA.isEnabled()).toEqual(true)
                    }
                }
                else {
                    expect(await btnjoinNowCTA.isEnabled()).toEqual(false)
                }
    
            }
            else if (status == "Started") {
                expect(await btnjoinNowCTA.isEnabled()).toEqual(true)
            }
        }

        async joinNowCardValidation(){
            await this.btnJoinNow.waitForDisplayed({timeout:5000})
            expect(await this.btnJoinNow.isDisplayed()).toEqual(true)
            expect(await this.subjectNameOnBTCCard.isDisplayed()).toEqual(true) 
            expect(await this.subjectTopicOnBTCCard.isDisplayed()).toEqual(true)
            expect(await this.DateOnBTCCard.isDisplayed()).toEqual(true)
            expect(await this.TimeOnBTCCard.isDisplayed()).toEqual(true)
            await this.validateJoinNowButtonBasedOnTheTimeInCard()
        }
}
export default new DashboardPage();