
import BasePage from "./BasePage";
import { loginData } from "../Data/LoginData"
import {getRandomNum, stringToChar, updateNumberInProdData} from "../utils/function"
import LoginPage from "./LoginPage";


class OtpPage extends BasePage {

  /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     */

  get tfuserName() { return $("//*[@id='inputEmail']") }

  get tfPassword() { return $("//*[@id='inputPassword']") }

  get tfgoogleEmail() { return $("//*[@type='email']")}

  get tfgooglePswd() { return $("//*[@type='password']") }

  get btnNext() { return $("(//*[contains(text(),'Next')])[2]")}

  get btnLogin() { return $("//*[contains(text(),'Log In')]") }

  get ddCreate() { return $("//*[@id='create-button']")}

  get btnQuery() { return $("//a[@href='queries/new']")}

  get tfQuerySpace() { return $("//*[@class=' ace_editor ace-tm']")}//$("//*[@class='ace_content']")}

  get btnExecuteQuery() { return $("//*[contains(text(),'Execute')]")}

  get tfOtp()     { return $("//*[@id='app-content']//visualization-renderer//tr/td[8]/div")}

  get ddTableSelection() { return $("//*[@class='caret pull-right']")}

//   get labelTableName() { return $("(//*[contains(text(),'Identity-Stage')])[1]")}      //QA/UAT

  get labelTableName() { return $("(//*[contains(text(),'Identity-Prod-Replica')])[1]")}     //prod

  get tfOtpNew(){return $('(//tr[@class="odd"]//td)[2]')}

 
async fetchOtp(phoneNumber,user='free') {

  //  await this.openRedashDB()
  //  await browser.pause(3000)     
   
  //  await $("//*[@class='login-button btn btn-default btn-block']").waitForDisplayed({timeout : 3000})
  //  await $("//*[@class='login-button btn btn-default btn-block']").click()

   //  await this.tfgoogleEmail.waitForDisplayed({timeout : 5000})
  //  await this.tfgoogleEmail.setValue("")
  //  await this.btnNext.waitForDisplayed({timeout : 5000})
  //  await this.btnNext.click() 
  //waitAndClickElement(this.btnNext,5000) 

  //  await this.tfgooglePswd.waitForDisplayed({timeout : 5000})
  //  await this.tfgooglePswd.setValue("")

  //  await this.ddCreate.waitForDisplayed({timeout : 5000})
  //  await this.ddCreate.click()
  
  //  await this.btnQuery.waitForDisplayed({timeout : 5000})
  //  await this.btnQuery.click()

  //  await this.ddTableSelection.waitForDisplayed({timeout : 5000})
  //  await this.ddTableSelection.click()
   

  //  await this.labelTableName.waitForDisplayed({timeout : 5000})
  //  await this.labelTableName.click()
 

  //  await this.tfQuerySpace.waitForClickable({timeout : 15000})
  //  await this.tfQuerySpace.click()

  //  var query = stringToChar(`select * from verification_otps where phone='+91-${phoneNumber}'`)
  //  console.log(query)
  //  await browser.keys(query)  

   
  //  await this.btnExecuteQuery.waitForDisplayed({timeout : 5000})
  //  await this.btnExecuteQuery.click()
    
  //  await this.tfOtp.waitForDisplayed({timeout : 5000})
  //  var otpValue = stringToChar(await this.tfOtp.getText())
  //  console.log("@@@@@@",otpValue)


  await this.openTllms() 
  if (await $('//input[@id="email"]').isDisplayed({timeout : 6000})){
    await $('//input[@id="email"]').waitForDisplayed({timeout : 6000})
    await $('//input[@id="email"]').setValue("iptestaccount@byjus.com")
  
    await $('//button[@type="submit"]').waitForClickable({timeout:3000})
    await $('//button[@type="submit"]').click() 
  
    await this.tfgoogleEmail.waitForDisplayed({timeout : 5000})
    await this.tfgoogleEmail.setValue("iptestaccount@byjus.com")
    await this.btnNext.waitForDisplayed({timeout : 5000})
    await this.btnNext.click()  
  
    await this.tfgooglePswd.waitForDisplayed({timeout : 5000})
    await this.tfgooglePswd.setValue("lptest@1234")
  
    await this.btnNext.waitForDisplayed({timeout : 5000})
    await this.btnNext.click()
  }
 try{await $("//*[@class='wrapper']").waitForDisplayed({timeout:15000})}catch{}
 // await $("//*[@class='wrapper']").click()
 // await $('(//button[@class="close"])[2]').waitForDisplayed({timeout:3000})
 // await $('(//button[@class="close"])[2]').click()

 //  await browser.pause(3000)  

 await browser.navigateTo(`https://tllms.com/admin/identity_otps?utf8=%E2%9C%93&mobile_no=%2B91-${phoneNumber}`)
 await $('//input[@type="submit"]').waitForDisplayed({timeout:10000})
 await $('//input[@type="submit"]').waitForClickable({timeout:10000})
 await $('//input[@type="submit"]').doubleClick()

  await browser.pause(3000)
  
  await this.tfOtpNew.waitForDisplayed({timeout:5000})
  var otpValue = stringToChar(await this.tfOtpNew.getText())
  if(otpValue.length<=0 && user == "free"){
    await browser.reloadSession()
    let number = getRandomNum()
    await updateNumberInProdData(number)
    await LoginPage.loginToLearnPortalUsingNumber(number)
  }
   const handles = await browser.getWindowHandles();
   await browser.closeWindow()
   await browser.switchToWindow(handles[0]);
   return otpValue 
}

async fetchOtpFromEmail() {
  await this.openEmail() 
  let btnNext = $("//*[contains(text(),'Next')]")
  if (await this.tfgoogleEmail.isDisplayed({timeout : 6000})){  
    await this.tfgoogleEmail.waitForDisplayed({timeout : 5000})
    await this.tfgoogleEmail.setValue("iptestaccount@byjus.com")
    await btnNext.waitForDisplayed({timeout : 5000})
    await btnNext.click()  
  
    await this.tfgooglePswd.waitForDisplayed({timeout : 10000})
    await this.tfgooglePswd.setValue("lptest@1234")
  
    await btnNext.waitForDisplayed({timeout : 5000})
    await btnNext.click()

    
    await $("//a[@aria-label='Google apps']").waitForDisplayed({timeout:10000})
    await browser.url("https://mail.google.com/mail/?tab=km")
    
    await $("//span[@name='support']/../../..").waitForDisplayed({timeout:25000})
    await $("//span[@name='support']/../../..").click()

    await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/b").waitForDisplayed({timeout:3500})
    let otp = await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/b").getText()
    let url = await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/a").getText()
    
    console.log(opt,"++++++++++++++++++")
    console.log(url,"++++++++++++++++++")

    await $("//input[@aria-label='Search in mail']").waitForDisplayed({timeout:4000})
    await $("//input[@aria-label='Search in mail']").setValue("support")
    await browser.keys(["Enter"])
    
    await browser.pause(2000)
    await $("//*[text()='View messages']").waitForDisplayed({timeout:5000})

    await $("(//*[@role='checkbox'])[2]").click()
    await $("//*[@aria-label='Delete']").waitForDisplayed({timeout:5000})
    await $("//*[@aria-label='Delete']").click()

    return otp,url
  }
}

async deleteSupportMailEntries(){
  await this.openEmail() 
  let btnNext = $("//*[contains(text(),'Next')]")
  if (await this.tfgoogleEmail.isDisplayed({timeout : 6000})){  
    await this.tfgoogleEmail.waitForDisplayed({timeout : 5000})
    await this.tfgoogleEmail.setValue("iptestaccount@byjus.com")
    await btnNext.waitForDisplayed({timeout : 5000})
    await btnNext.click()  
  
    await this.tfgooglePswd.waitForDisplayed({timeout : 10000})
    await this.tfgooglePswd.setValue("lptest@1234")
  
    await btnNext.waitForDisplayed({timeout : 5000})
    await btnNext.click()

    
    await $("//a[@aria-label='Google apps']").waitForDisplayed({timeout:10000})
    await browser.url("https://mail.google.com/mail/?tab=km")
    
    await $("//input[@aria-label='Search in mail']").waitForDisplayed({timeout:4000})
    await $("//input[@aria-label='Search in mail']").setValue("support")
    await browser.keys(["Enter"])

    try{
    await $("//span[@name='support']/../../..").waitForDisplayed({timeout:15000})
    
    await browser.pause(2000)
    await $("//*[text()='View messages']").waitForDisplayed({timeout:5000})

    await $("(//*[@role='checkbox'])[2]").click()
    await $("//*[@aria-label='Delete']").waitForDisplayed({timeout:5000})
    await $("//*[@aria-label='Delete']").click()
    }catch{}
}
}

async fetchOtpAndUrlFromEmailTab() {
  await browser.url("https://mail.google.com/mail/?tab=km")

  await $("//span[@name='support']/../../..").waitForDisplayed({timeout:25000})
  await $("//span[@name='support']/../../..").click()

  await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/b").waitForDisplayed({timeout:3500})
  let otp = await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/b").getText()
  let url = await $("//span[contains(text(),'ago')]/../../../../../../..//*[text()='Your passcode is: ']/a").getText()
  
  console.log(otp,"++++++++++++++++++")
  console.log(url,"++++++++++++++++++")

  return otp,url

}
  
}

export default new OtpPage();
