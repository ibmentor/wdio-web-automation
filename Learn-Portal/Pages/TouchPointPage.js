import BasePage from "./BasePage";

class TouchPointPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    selectProfile(count) { return $(`(//div[@class='dropdown-item notify-item profile-switch-item'])[${count}]`) }

    subjectSubjectCard(count) { return $(`(//div[@class='subject-name'])[${count}]`) }

    get summaryPageHeadingHaveADoubt() { return $("(//div[@class='aad-title'])[2]") }

    get btnConnectToAtutor() { return $("(//div[@class='subtext'][normalize-space()='Connect to a tutor'])[2]") }

    get questionText() { return $("(//div[@class='questionTitle'])[1]") }

    get touchPointsQuestionPopup() { return $("//div[@class='modal-content']") }

    get btnConnectToAtutorForByjusClasses() { return $("(//div[@class='ps-3 subtext' and contains(text(),'Connect to a tutor')])[1]") }

    getTextOfQuestions(count) { return $(`(//div[@class='test_fibOption__1C536'])[${count}]`) }

    getTextOfQuestionsConnectToTutorPopup(count) { return $(`(//div[@class='questionTitle'])[${count}]`) }

    get popUpCantFindAnswerConnectWithTutorByjusClasses(){return $(`//*[text()="Can't find the answer?"]`)}

    get connectingToTutorDocWindowByjusClasses(){return $('//div[@class="expert-text-sm expert-leading-5"]')}

    get belowBarConnectToATutor() { return $("//div[@class='comp-flex comp-flex-col -comp-translate-y-1']") }

    get btnCannotFindAnsConnectToTutor() { return $("//img[@src='https://instant-learning.s3.ap-south-1.amazonaws.com/searchPage/bottomCtarightArrow.png']") }

    get chatWindowConnectToTutor() { return $("//div[@class='expert-w-full expert-font-Poppins expert-bg-white  expert-pt-10  expert-relative   ']") }

    get btnViewSolution() { return $("(//div[@class='comp-flex comp-justify-end comp-items-center comp-w-full comp-mt-4'])[1]") }

    get btnDOCChat() { return $("//img[@src='https://instant-learning.s3.ap-south-1.amazonaws.com/images/caretRight.png']") }

    get titleOfVideoConceptVideo(){return $('(//div[@class="video-detail container-fluid"]//*[@class="title"])[1]')}

    get chatOptionByjusClasses(){return $("(//*[contains(@class,'expert-text-black')])[3]")}

    get btnConnectToTutorConceptVideo(){return $('(//*[@class="ps-3 subtext" and text()="Connect to a tutor"])[2]')}

    get popUpCantFindAnswerConnectWithTutorConceptVideo(){return $(`//*[text()="Can't find the answer?"]`)}

    get popUpoSelectSubjectConceptVideo(){return $("//*[text()='Select a subject']")}

    get popUpConnectToTutorByjusClasses(){return $("(//*[contains(@class,'expert-text-black')])[2]")}

    get selectSubjectByjusClasses(){return $("(//*[contains(@class,'expert-text-black')])[2]")}

    get popUpoSelectSubjectByjusclasses(){return $("//*[text()='Select a subject']")}

    get btnConctinueByjusClasses(){return $("//*[text()='Continue']")}

    get selectSubjectConceptVideo(){return $("(//*[contains(@class,'expert-text-black')])[2]")}

    get btnConctinueConceptVideo(){return $("//*[text()='Continue']")}

    get popUpConnectToTutorConceptVideo(){return $("(//*[contains(@class,'expert-text-black')])[2]")}

    get chatOptionConceptVideo(){return $("(//*[contains(@class,'expert-text-black')])[3]")}

    get connectingToTutorDocWindowConceptVideo(){return $('//div[@class="expert-text-sm expert-leading-5"]')}

    get chapterNameInDocWindowConceptVideo(){return $('//*[contains(@class,"expert-overflow-x-auto")]')}

    get connectTutorWindowOnHomePage(){return $('(//div[contains(@class,"expert-flex")])[1]')}

    get btnMenuOnDocWindow(){return $('(//div[contains(@class,"expert-iconsContainer")])[1]//*[@role="button"]')}

    get btnEndChat(){return $("//*[contains(text(),'End Chat')]")}

    get btnLeave(){return $("//*[contains(@class,'expert-w-full') and contains(text(),'Leave')]")}

    get btnLeaveSession(){return $("//*[contains(@class,'expert-w-full') and contains(text(),'Leave session')]")}

    get reasonForEndSessionSelection(){return $("//*[contains(@class,'expert') and contains(text(),'Want to ask another doubt')]")}

    get btnSubmit(){return $("//button[contains(text(),'Submit')]")}

    get btnGoBackToHome(){return $("//*[contains(@class,'expert') and contains(text(),'Go Back To Home')]")}

    get btnThumbSelect(){return $('(//div[@class="expert-flex"]//img)[2]')}

    get btnSeelectRating(){return $('(//img[@alt="icon-type"])[2]')}

    get seatsLeftCount(){return $('//div[@class="expert-text-base expert-font-semibold"]')}

    get btnConnectToTutorAPQ() { return $("//div[@class='subtext']") }

    get popupTouchPointAPQ() { return $("//*[@class='modal-content']//*[text()='Questions']") }
    
    get popupTouchPointQuestionAPQ() { return $("(//div[contains(@class,'border card')])[1]") }

    get popupBtnConnectToTutorAPQ() { return $("(//button[contains(@class,'expertBtn')])") }

    get popupConnectToTutorViaAPQ() { return $("//*[text()='Connect to a tutor via']") }
    get btnConnectToTutor() {return $("//button[contains(text(),'Connect to a tutor')]")}
   

    questionSelectorAPQ(number) {return $(`(//*[@class='questionTitle']/p)[${number}]`)}

    async preConnectwithTutorValidation(){
        if(await this.connectTutorWindowOnHomePage.isDisplayed({timeout:5000}) == true){
            await this.connectTutorWindowOnHomePage.click()
            try{await this.btnMenuOnDocWindow.waitForClickable({timeout:3000})
            await this.btnMenuOnDocWindow.click()
            await this.btnEndChat.waitForClickable({timeout:3000})
            await this.btnEndChat.click()
            await this.btnLeave.waitForDisplayed({timeout:5000})
            await this.btnLeave.click()
           }catch{}
            try {
                await this.btnThumbSelect.waitForDisplayed({timeout:3000})
                await this.btnThumbSelect.waitForClickable({timeout:3000})
                await this.btnThumbSelect.click()
            } catch {               
            }
            try {
                await this.btnSeelectRating.waitForDisplayed({timeout:10000})
                await this.btnSeelectRating.waitForClickable({timeout:3000})
                await this.btnSeelectRating.click()
            } catch {               
            }
            try {
                await this.btnLeaveSession.waitForDisplayed({timeout:3000})
                await this.btnLeaveSession.waitForClickable({timeout:3000})
                await this.btnLeaveSession.click()
            } catch {               
            }
            try {
                await this.reasonForEndSessionSelection.waitForDisplayed({timeout:3000})
                await this.reasonForEndSessionSelection.waitForClickable({timeout:3000})
                await this.reasonForEndSessionSelection.click()
            } catch {               
            }
            try {
                await this.btnSubmit.waitForDisplayed({timeout:3000})
                await this.btnSubmit.waitForClickable({timeout:3000})
                await this.btnSubmit.click()
            } catch {               
            }
            try{
                await this.btnGoBackToHome.waitForDisplayed({timeout:3000})
                await this.btnGoBackToHome.waitForClickable({timeout:3000})
                await this.btnGoBackToHome.click()
            }catch{}
            await browser.pause(3000)
        }
    }
  
}

export default new TouchPointPage();