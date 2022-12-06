import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import DashboardPage from "../../Pages/DashboardPage";
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/AlertPopup_OLAP_Data.json')
let userID



describe("Learn Portal - byjus classes alert popup", async () => {
    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()
    })
    it("334308 TC_01 Free user- Validate the U_event_id 6000150 ,m_desc View upcoming class popup (pop-up screen)", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        userID = await getUserId()
        allure.startStep("Click on Byju's Classes", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.getBookClassButton(1).waitForDisplayed({ timeout: 25000 })
        await ByjusClassesPage.getBookClassButton(1).click()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()

    })

    it("334309 TC_02 Free user- Validate the U_event_id 6000001 , m_desc Click on join now (pop-up screen)", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        userID = await getUserId()
        allure.startStep("Click on Byju's Classes", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.getBookClassButton(1).waitForDisplayed({ timeout: 25000 })
        await ByjusClassesPage.getBookClassButton(1).click()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        await ByjusClassesPage.btnJoinNowClassAlertPopup.waitForDisplayed({ timeout: 25000 })
        await ByjusClassesPage.btnJoinNowClassAlertPopup.click()
    })

    it("334310 TC_03 Free user- Validate the U_event_id 6000151 ,m_desc Click on cancel button/cross icon (pop-up screen)", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        userID = await getUserId()
        allure.startStep("Click on Byju's Classes", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.getBookClassButton(1).waitForDisplayed({ timeout: 25000 })
        await ByjusClassesPage.getBookClassButton(1).click()
        await DashboardPage.navigateToHomePageFromHamburgerMenu()
        await ByjusClassesPage.btnCrossIconPopup.waitForDisplayed({ timeout: 25000 })
        await ByjusClassesPage.btnCrossIconPopup.click()

    })
})
describe("Learn Portal - byjus classes alert popup", async () => {


    it("334308 TC_01 Free user- Validate the U_event_id 6000150 ,m_desc View upcoming class popup (pop-up screen)", async () => {

        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAlertPopup("6000150", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("334309 TC_02 Free user- Validate the U_event_id 6000001 , m_desc Click on join now (pop-up screen)", async () => {

        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAlertPopup("6000001", userID, localData)).toEqual(true)
        allure.endStep()
    })

    it("334310 TC_03 Free user- Validate the U_event_id 6000151 ,m_desc Click on cancel button/cross icon (pop-up screen)", async () => {

        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataAlertPopup("6000151", userID, localData)).toEqual(true)
        allure.endStep()
    })
})