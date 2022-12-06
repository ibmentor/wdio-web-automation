import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import DashboardPage from "../../Pages/DashboardPage";



describe("Learn Portal - byjus classes alert popup", async () => {

    
    it(" TC_01 Free user- Validate class alert popup before 15mins of book a class", async () => {
        
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        let bookedClassName = await ByjusClassesPage.labelClassName.getText()
        await ByjusClassesPage.getBookClassButton(1).waitForDisplayed({ timeout:25000 })
        await ByjusClassesPage.getBookClassButton(1).click()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        expect(await ByjusClassesPage.labelClassNameaAlertPopup.getText()).toHaveTextContaining(bookedClassName)
        expect(await ByjusClassesPage.labelAlertPopupClassStarts.getText()).toHaveTextContaining("Class starts")
        expect(await ByjusClassesPage.labelAlertPopupDontMissOutClass.getText()).toHaveTextContaining("Your FREE trial class is about to start. Don't miss out!")
        expect(await ByjusClassesPage.btnCloseClassAlertPopup.isDisplayed()).toEqual(true)
        expect(await ByjusClassesPage.btnJoinNowClassAlertPopup.isDisplayed()).toEqual(true)
        allure.endStep();
    })

})