import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { loginData } from "../../Data/LoginData"
import { getUserId } from "../../utils/function"
import { dashboardData } from "../../Data/DashboardData"
import TutorOnDemandPage from "../../Pages/TutorOnDemandPage"
let TutorOnDemandOLAPdata = require('../../Data/OLAP_data/TutorOnDemand_OLAP_Data.json')
let userID


describe("OLAP - Tutor On Demand Module", async () => {

    it('334135 TC_01 Validate the U_event_id 9202061, m_desc click tutor on demand from burger menu ', async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        userID = await getUserId()
        await TutorOnDemandPage.btnTODMenuOption.waitForDisplayed({ timeout: 15000 })
        await TutorOnDemandPage.btnTODMenuOption.click()
        allure.startStep("click tutor on demand from burger menu event triggred - 9202061", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9202061", userID, TutorOnDemandOLAPdata)).toEqual(true)
    });

    it("334136 TC_02 Validate the U_event_id 9202062, m_desc tutor on demand landing page ", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        userID = await getUserId()
        await TutorOnDemandPage.btnConnectWithTutor.waitForDisplayed({ timeout: 15000 })
        await TutorOnDemandPage.btnConnectWithTutor.click()
        allure.startStep("tutor on demand landing page event triggred - 9202062", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchData("9202062", userID, TutorOnDemandOLAPdata)).toEqual(true)

    });
})
