import DashboardPage from "./DashboardPage"

class TutorOnDemandPage {

    get bannerTutorOnDemand() {return $(".heading")}

    get headingTutorOnDemand(){return $("//div[text()='Tutor on Demand']")}

    get btnConnectWithTutor() {return $("*[class='tod'] button")}
  
    get labelGetYourDoubtsResolved() {return $(".txt")}

    get headingTutorOnDemand() {return $("//div[contains(text(),'Tutor on Demand')]")} 

    get btnTODMenuOption() {return $("//a[contains(@data-menu-key,'tod')]")}

    get txthistory() {return $("(//div[@class='expert-pl-0.5 expert expert-text-dov-grey expert-font-semibold expert-text-xs expert-tracking-widest'])[1]")}

    get txtNewUserScreen() {return $("(//*[@class = 'comp-text-black'])[1]")}

    get btnConnectATutor() {return $("(//*[contains(text(), 'Connect to a tutor')])[1]")}

    get txtSessionCount() {return $("(//div[contains(@class,'comp-px-2 comp-py-1 comp-rounded-full comp-text-il-dark-black comp-bg-il-light-grey comp-font-semibold comp-text-xs')])[1]")}

    get askADoubtCard() {return $("//*[@data-dd-action-name='INTENT_ASK_A_DOUBT']")}

    get understandAConceptCard() {return $("//*[@data-dd-action-name='INTENT_CONCEPT_RESOLUTION']")}

    get txtTutorTime() {return $("//*[contains(text(), 'Tutors are available between')]")}

    get btnASKClosePopup() {return $("//img[@alt='close']")}

    get btnBack() {return $("//*[@alt='back']")}

    get UploadSection() {return $("(//div[@class='comp-flex comp-justify-center comp-mb-6'])[1]")}

    get txtTypeYourDoubt() {return $("(//*[contains(@placeholder, 'Type your doubt here...')])[1]")}

    get btnCountine() {return $("//*[text()='Continue']")}

    get selectSubjectPopup() {return $("//*[@class='expert-subjectContainer  expert-w-full expert-font-Poppins ']")}

    get btnSubjectCard() {return $("(//*[contains(@class, 'expert-mt-1.5 expert-text-black expert-text-sm expert-leading-5 expert-font-semibold expert-text-center expert-line-clamp-2')])[1]")}

    get txtAskedQuestion() {return $("(//div[contains(@class,'expert-line-clamp-3 expert-break-all expert-leading-5 expert-max-h-[80px]')])[1]")}

    get btnCacel() {return $("//*[contains(text(), 'Cancel')]")}

    get btnCameraAllow() {return $("(//*[text() = 'Allow'])[1]")}

    get btnMicAllow() {return $("(//*[text() = 'Allow'])[2]")}

    get btnMinimize() {return $("//div[@class='expert-w-full expert-flex expert-items-center expert-justify-between ']/div[2]")}

    get txtConnectTutorTime() {return $("//p[contains(@class,'expert-text-dov-light-purple')]")}

    get btnOkey() {return $("//*[contains(text(), 'Okay')]")}

    get btnMaximize() {return $("//div[@class='blockLandscape']/div/div[1]")}

    get btnFilter() {return $("//*[text() = 'Filters']")}

    get btnClearAll() {return $("//div[contains(@class,'expert-flex expert-justify-between expert-items-center')]/div[1]")}

    get labelFilterPopup() {return $("//div[contains(@class,'expert-flex expert-justify-between expert-items-center')]/div[2]")}

    get btnClose() {return $("//div[contains(@class,'expert-flex expert-justify-between expert-items-center')]/div[3]")}

    get subjectCards() {return $("(//div[contains(@class,'expert-w-full expert-flex expert-justify-between expert-flex-wrap')])[1]")}

    get btnMathsCard() {return $("//div[contains(text(),'Maths')]")}

    get tickMark() {return $("(//img)[44]")}

    get btnShowResult() {return $(".expert-btnContainer")}

    get txtFilterresult() {return $("(//div[contains(@class,'expert-mr-3 expert-truncate')])[1]")}

    get btnFirstSubjectCard() {return $("//div[contains(@class,'expert-w-full expert-flex expert-justify-between expert-flex-wrap')]/div[1]")}
    
    get txtFilteredSubject() {return $("(//*[@class='expert-mr-3 expert-truncate'])[1]")}

    get txtTutorStatusOnASk() {return $("(//div[@class='expert-mt-1 expert-text-dov-grey expert-text-sm expert-text-center '])[1]")}

    get txtTutorStatus() {return $("(//*[contains(@class, 'expert-flex expert-flex-col expert-ml-4')]/div[2])[1]")}

    txtTutorStatus1(count) {return $(`(//*[contains(@class, 'expert-flex expert-flex-col expert-ml-4')]/div[2])[${count}]`)}

    get ConceptCardMathematics() {return $("//div[normalize-space()='Mathematics']")}

    get btnFirstTopic() {return $("(//div[contains(@data-dd-action-name,'CONCEPT_CHAPTER')])[1]")}

    get btnConnect(){return $("//button[text()='Connect']")}

    get textPermissionRequired(){return $("//h5[normalize-space()='Permissions required!']")}

    get textCameraAccess(){return $("//div[contains(text(),'Camera access')]")}

    get textMicAccess(){return $("//div[contains(text(),'Microphone access')]")}

    async navigateToTOD(user) {

        let menuOptionDisplayed = await DashboardPage.menuOption.isDisplayed()
        if (!menuOptionDisplayed) {
          browser.reloadSession()
          await LoginPage.loginToLearnPortal(user)
        }
        await DashboardPage.menuOption.waitForClickable({ timeout: 5000 })
        await DashboardPage.menuOption.click()
    
        await this.btnTODMenuOption.waitForDisplayed({ timeout: 10000 })
        await this.btnTODMenuOption.click()
        
        await this.headingTutorOnDemand.waitForDisplayed({ timeout: 45000 })
        
      }

      async askedDoubtCount(input) {
        if (parseInt(input.slice(12, 15).trim()) >= 0) {
          return input
        } else {
            return false
        }
    }

      async sessionCount(input) {
        if (parseInt(input.slice(0, 1).trim()) > 0) {
          return true
        } else {
            return false
        }
    }   
}

export default new TutorOnDemandPage();