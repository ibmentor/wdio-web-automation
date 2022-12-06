/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
import * as Config from '../Config/Config'
const envSpecific = process.env.envSpecific
export default class BasePage {
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    
     openByjusLearnPage() {
        browser.maximizeWindow()         
        return browser.url(envSpecific)
        
     }   

     openFetchOtpUrl() {
        return browser.url(`${Config.fetchOtpUrl}`)
     }

     openRedashDB() {
      return browser.newWindow(`${Config.redashUrl}`)
   }

   openCloudWatch() {
      browser.maximizeWindow()  
      return browser.newWindow(`${Config.cloudWatchUrl}`)
   }

   openTllms(){
      return browser.newWindow(`${Config.tllms}`)
   }

   openEmail(){
      return browser.newWindow(`${Config.emailLogin}`)
   }
}

