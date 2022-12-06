import BasePage from "./BasePage";

class NudgesPage extends BasePage {

  /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

  get btnNudges(){return $('//img[contains(@src,"byjusclasses/nuc")]')}

  get btnJoinClassNow(){return $("//button[text()='Join Class Now']")}

  get subjectNameAndGradeOnCard(){return $('//span[contains(@class,"dashboard_introTitle")]')}

  get AccountUserName(){return $('(//span[contains(@class,"account-user-name")])[1]')}

  get dateAndTimeOnCard(){return $('(//*[contains(@class,"row card-body")]//div/span)[2]')}

  get userNameOnNudgeWindow(){return $('//div[@class="sc-iAvgwm fSRJbK"]')}

  get subjectNameAndGradeOnNudgeWindow(){return $('//div[@class="sc-lbxAil epdAOR"]')}

  get btnRemindMe(){return $("//button[contains(text(),'Remind me')]")}

  get btnPrepareForClass(){return $("//button[contains(text(),'Prepare for class')]")}

  get labelClassStarted(){return $("//div[contains(text(),'Started') and contains(text(),'mins ago')]")}

  get subjectNameOnNudgeWindow(){return $('//div[@class="sc-gSAPjG kgaLxn"]')}

  get btnCloseNudge(){return $('//img[contains(@src,"byjusclasses/nuc_close")]')}
  
  get labelRemindMeOnceClassStart(){return $("//div[text()='Remind me once class starts']")}

  get nudgePop(){return $('.sc-gXmSlM')}

  async preVerificationOfNudgeWindow(){
      if(await this.btnCloseNudge.isDisplayed() == true){
      await this.btnNudges.click()
    }
 }
 async nudgesTimerPopup(){
   try{
      await this.nudgePop.waitForDisplayed({timeout:8000})
      await this.btnCloseNudge.click()
      }
   catch{}
}

}
export default new NudgesPage();