import BasePage from "./BasePage";

class LearnJourneyPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */


    get labelJourneyOnFirstSubjectCard() { return $('//*[contains(text(),"Journeys")]') }

    get ChapterCard() { return $('//div[@class="premiumHome_chapterCard__TR_ec"]') }

    get subjectNameOnCard() { return $(`//p[contains(@class,'premiumHome_subHeading')]`) }

    get btnHomePageBreadcrum() { return $('//img[@alt="menu-icons/home.png"]') }

    get subjectLogo() { return $(`//img[contains(@class,'premiumHome_subjectIcon')]`) }

    chapterCards(count) { return $(`(//div[contains(@class,'premiumHome_swiperCard')])[${count}]`) }

    get labelJourneyWithTick() { return $('//div[@class="d-flex ms-3 align-items-center"]') }

    get labelJourneyWithTick() { return $('//div[@class="d-flex ms-3 align-items-center"]') }

    get resumeJourneyMessage() { return $("//*[contains(@class,'startTxt')]") }

    get resumeJourneyTitle() { return $("//*[contains(@class,'premiumHome_resumeTxt')]") }

    get BtnContinueJourneyUnderResumeJourney() { return $("(//*[contains(@class,'premiumHome_resumeJourney')]/./..//button[contains(text(),'Continue journey')])[2]") }

    get btnStartJourneyCTAUnderResumeJourney() { return $("//*[contains(@class,'noActivity')]/.//button[contains(@class,'btn-primary')]") }

    get noJourneyTextMsgUnderResumeJourney() { return $("//*[contains(@class,'noJourneyTxt')]") }

    get chaptersCount() { return $$('.swiper-initialized') }

    getChapterHeading(count) { return $(`(//*[contains(@class,'premiumHome_chapterTxt')])[${count}]`) }

    getChapterSection(count) { return $(`(//*[contains(@class,'swiper-initialized')])[${count}]`) }

    getTopicsCountUnderChapter(count) { return $$(`(//*[contains(@class,'swiper-initialized')])[${count}]/..//*[contains(@class,'chapterCards')]`) }

    getStartJourneyButtonOnCard(chapterNo, CardNo) {return $(`((//*[contains(@class,'swiper-initialized')])[${chapterNo}]/..//*[contains(@class,'chapterCards')]/..//*[contains(text(),'Start Journey')])[${CardNo}]`)}

    get backButtonInJourneyPage() { return $("//*[contains(@class,'learnJourney_backArrow')]") }

    get homeButtonInSubjectPage() { return $("//a[contains(text(),'Home')]") }

    get topicListItems() { return $$("//*[contains(@class,'topicListItem')]") }

    get upArrowInJourneyPage() { return $("//*[contains(@alt,'up-arrow')]") }

    get downArrowInJourneyPage() { return $("//*[contains(@class,'arrowFlipped')]") }

    get startButtonInNode() { return $("//button[contains(text(),'Start')]") }

    get topicNameInsideNode() { return $("//*[contains(@class,'fw-bold')]") }

    get topicBottomCard() { return $('.card') }

    get totalNodesUnderTopic() { return $$("//*[contains(@class,'learnJourney_imageWrap')]") }

    getNodeUnderTopic(count) { return $(`(//*[contains(@class,'learnJourney_imageWrap')])[${count}]`) }

    getTopicNameOutsideNode(count) { return $(`(//*[contains(@class,'learnJourney_imageWrap')])[${count}]/..//*[contains(@class,'topicName')]`) }

    getCheckBoxOfEachNodeUnderBottomCard(count) { return $(`(//*[contains(@class,'learnJourney_topicListItem')]/..//*[contains(@class,'checkmark')])[${count}]`)}

    get dataForNode() { return $("//*[contains(@class,'dropDownContainer')]") }

    get btnStartJourney() { return $("(//button[contains(.,'Start Journey')])[1]") }

    get btnFirstNode() { return $("(//img[contains(@alt,'journey map')])[1]") }

    btnNext(count) { return $(`(//button[normalize-space()='Next'])[${count}]`) }

    get btnMCQAnswer() { return $("(//li[contains(@class,'list-group-item')])[3]") }

    get btnMCQWrongAnswer() { return $("(//li[contains(@class,'list-group-item')])[2]") }

    get btnContinue() { return $("(//button[normalize-space()='Continue'])[1]") }

    get btnQuit() { return $("(//button[normalize-space()='Quit'])[1]") }

    get btnSubmit() { return $("//button[normalize-space()='Submit']") }

    get btnRetake() { return $("(//button[normalize-space()='Retake'])[1]") }

    get btnBack() { return $("//i[@class='resourceNode_backButton__3eT66 mdi mdi-arrow-left']") }

    get videoTabInsideNode() {return $("//span[contains(text(),'Video')]")}
    
    getQuestionTabInsideNode(count) {return $(`(//*[contains(text(),'Question')])[${count}]`)}
   
    get backButtonInVideoTabPage() {return $("//*[contains(@class,'mdi-arrow')]")}
    
    get filledVideoProgress() {return $("//*[contains(@class,'Filled')]/span[1]")}
    
    getEmptyQuestionProgress(count){return $(`//*[contains(@class,'Empty')]/span[${count}]`)}
    
    get quitButtonInVideoPage() {return $("//button[contains(text(),'Quit')]")}
    
    get nextButtonInVideoPage() {return $("//button[contains(text(),'Next')]")}
    
    get playIconInVideo() {return $("//*[contains(@class,'play-button')]")}
    
    get timeDetailsInVideo() {return $("//*[contains(@class,'current-time')]")}
    
    get settingIconInVideo(){return $("//*[contains(@class,'shaka-overflow-menu-button')]")}
    
    get submitBtnInVideoPage() {return $("//button[contains(text(),'Submit')]")}
    
    get videoFrame() {return $('.shaka-scrim-container')}
    
    get quitText() {return $("//*[contains(@class,'quitTxt')]")}
    
    get cancelButton() {return $("//button[contains(text(),'Cancel')]")}
    
    get revisitButton() {return $("//button[contains(text(),'Revisit')]")}
    
    get questionData() { return $("//*[contains(@class,'questionsContainer')]")}
    
    get solutionText() { return $("//*[contains(@class,'questionsContainer')]")}
    
    get completionTickMarkForQuestion() { return $("//*[contains(@src,'node-complete.svg')]")}
    
    get continueButton() { return $("//button[contains(text(),'Continue')]")}
    
    get completionConfirmText() { return $("//*[contains(@class,'premiumHome_dispTxt')]")}
    
    get nextButton() { return $("//button[contains(text(),'Next')]")}
    
    get quitButton() { return $("//button[contains(text(),'Quit')]")}
    
    get backButtonInQuestionsPage() {return $("//*[contains(@class,'mdi-arrow')]")}

    get currentBreadCrumb() {return $('//*[contains(@class,"active")]')}

    get btnSubject() {return $(`//div[@class="dashboard-subTitle" and text()="Mathematics"]`)}

    get nextButtonInVideoPage2() {return $("//button[normalize-space()='Next']")}

    get clickSelectedSubject() {return $("(//div[@class='image-div'])[2]")}

    get btnStartJourney2() {return $("(//button[@type='button'][normalize-space()='Start Journey'])[9]")}
    get completionTickMarkForJourney() { return $("//*[contains(@src,'journey-complete-flag.svg')]")}
    get btnResumeInNode() { return $("//*[contains(text(),'Resume')]")}
    
    get clickPhysicsSubject() {return $("//div[@class='dashboard-subTitle'][normalize-space()='Physics']")}

    get topicThrustPressure() {return $('//p[text()="Thrust and Pressure"]/..//*[text()="Start Journey"]')}

    get tickmark () {return $("(//img[@alt='check square'])[1]")}

    get topicPhysicsText() {return $("//p[normalize-space()='physics']")}

    get btnArrowOfLearnJourneyPrePost() {return $(`(//*[contains(@src,'journey.png')]/../../..//*[@class='mdi mdi-arrow-right d-flex align-items-center'])[1]`)}

    get btnSeeMoreOfLJ() {return $("//*[contains(@src,'journey.png')]/../../../../../../..//*[text()='See More']")}

    get btnStartJourneyLJ() {return $("(//a[contains(.,'Start Journey')])[1]")}

    btnRevisionMaterial(count) { return $(`(//*[contains(text(),'Revision Material')])[${count}]`) }

    btnRevisionMaterialArrow(count) {return $(`(//*[contains(text(),'Revision Material')])[${count}]/../../..//*[@class='mdi mdi-arrow-right d-flex align-items-center']`)}

    btnRevisionMaterialSeeMore(count) {return $(`(//*[contains(text(),'Revision Material')])[${count}]/../../..//*[text()='See More']`)}

    btnPrepareforSessionStartJourney(count) {return $(`(//*[contains(text(),'Prepare')]/..//*[contains(text(),'Start Journey')])[${count}]`)}
    
    async navigateToLearnJourneyPage(subjectName) {
        let env = process.env.ENV 
        if(env=='prod')
        {
            await browser.navigateTo(`https://byjus.com/learn/journey/${subjectName}`)
            await browser.pause(3000)
        }
        else if(env=='uat'){
            await browser.navigateTo(`https://stage.byjusweb.com/learn/journey/${subjectName}`)
            await browser.pause(3000)
        }
        else {
            await browser.navigateTo(`https://${env}.byjusweb.com/learn/journey/${subjectName}`)
            await browser.pause(3000)
        }
       
    }

    async selectOption(optionValue){
        const option= await $(`//*[contains(text(),'${optionValue}')]`)
        await option.waitForDisplayed({timeout:10000})
        await option.click()
     }

}

export default new LearnJourneyPage();
