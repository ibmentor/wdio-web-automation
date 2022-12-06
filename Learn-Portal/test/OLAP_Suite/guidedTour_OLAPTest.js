import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import PersonalizationPage from "../../Pages/PersonalizationPage"
import CloudWatchPage from "../../Pages/CloudWatchPage"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import { getUserId } from "../../utils/function"
let guidedTourOLAPData = require('../../Data/OLAP_data/guidedTour_OLAP_Data.json')
let userID 



describe("OLAP - Guided Tour flow", async () => {

    it("319826 TC_01 Validate the U_event_id 9200006, m_desc Guided tour pop", async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[1], 'free')
        await LoginPage.logout()
        await browser.reloadSession()
        await LoginPage.loginToLearnPortalWithOutSkippingTour('free')
        userID = await getUserId()
        allure.startStep("Guided tour popup event triggered - 9200006", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200006",userID,guidedTourOLAPData)).toEqual(true)
    })
    it("319827 TC_02 Validate the U_event_id 9200007, m_desc skip guided tour", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortalWithOutSkippingTour('free')
        await ProfilePage.btnskipTour.waitForClickable({ timeout: 15000 })
        await ProfilePage.btnskipTour.click()
        userID = await getUserId()
        allure.startStep("Skip guided tour event triggered - 9200007", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200007",userID,guidedTourOLAPData)).toEqual(true)
        await LoginPage.logout()
        allure.endStep()

    })

    it("319828 TC_03  Validate the U_event_id 9200008, m_desc Start the tour", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortalWithOutSkippingTour('free')
        userID = await getUserId()
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 15000 })
        await PersonalizationPage.btnLetsGo.click()
        allure.startStep("Start the tour event triggered - 9200008", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200008",userID,guidedTourOLAPData)).toEqual(true)
        allure.endStep()

    })
    it("319829 TC_04 Validate the U_event_id 9200009, m_desc next guided tour", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortalWithOutSkippingTour('free')
        userID = await getUserId()
        await PersonalizationPage.btnLetsGo.waitForClickable({ timeout: 15000 })
        await PersonalizationPage.btnLetsGo.click()
        await PersonalizationPage.btnNext.waitForClickable({ timeout: 15000 })
        await PersonalizationPage.btnNext.click()
        allure.startStep("Next guided tour event triggered - 9200009", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchData("9200009",userID,guidedTourOLAPData)).toEqual(true)
        allure.endStep()
    })
})