import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import TutorOnDemandPage from "../../Pages/TutorOnDemandPage"
import { dashboardData } from "../../Data/DashboardData"
import NudgesPage from "../../Pages/NudgesPage"
describe('Tutor On Demand',async () => {
    it('323349 TC_01 Valiadate the Tutor On Demand Banner in dashboard page',async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        await NudgesPage.nudgesTimerPopup()
        await TutorOnDemandPage.bannerTutorOnDemand.waitForDisplayed({timeout:10000})
        expect(await TutorOnDemandPage.bannerTutorOnDemand.isDisplayed()).toEqual(true)
        expect(await TutorOnDemandPage.btnConnectWithTutor.isDisplayed()).toEqual(true)
        expect(await TutorOnDemandPage.labelGetYourDoubtsResolved.isDisplayed()).toEqual(true)
        await TutorOnDemandPage.btnConnectWithTutor.waitForClickable({timeout:10000})
        await TutorOnDemandPage.btnConnectWithTutor.click()
        await TutorOnDemandPage.headingTutorOnDemand.waitForDisplayed({timeout:5000})
        expect(await TutorOnDemandPage.headingTutorOnDemand.getText()).toHaveTextContaining("Tutor on Demand")
        allure.endStep()
    })

    it('323357 TC-02 Validate the "Connect with a Tutor" CTA in Tutor on Demand tab',async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        allure.startStep("Validate TOD module",true)
        await NudgesPage.nudgesTimerPopup()
        await TutorOnDemandPage.navigateToTOD()
        allure.startStep("Validate Connect A Tutor CTA on TOD Page",true)
        await TutorOnDemandPage.btnConnectATutor.click()
        allure.startStep("Validate Remaining session counts",true)
        await TutorOnDemandPage.txtSessionCount.waitForDisplayed({ timeout:10000 })
        var result = await TutorOnDemandPage.txtSessionCount.getText()
        expect(await TutorOnDemandPage.sessionCount(result)).toEqual(true)
        allure.startStep("Validate Ask a Doubt Card",true)
        expect(await TutorOnDemandPage.askADoubtCard.isDisplayed()).toEqual(true)
        allure.startStep("Validate Unserstand A Concept Card",true)
        expect(await TutorOnDemandPage.understandAConceptCard.isDisplayed()).toEqual(true)
        allure.startStep("Validate Tutor Available timeings",true)
        expect(await TutorOnDemandPage.txtTutorTime.getText()).toHaveTextContaining("3:30 pm to 10:30 pm")
        await TutorOnDemandPage.btnASKClosePopup.click()
        allure.endStep()
    })

})