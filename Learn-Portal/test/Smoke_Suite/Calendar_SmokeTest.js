import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import CalendarPage from "../../Pages/CalendarPage"

describe("Learn Portal - Neo Paid user Calendar Widget", async () => {

    it("319485 TC_01 PaidUaer - Verify Paid user Calendar homepage", async () => {
        allure.startStep("Change cohort to 3rd", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[2], 'calendarUser')
        await CalendarPage.calendarTitle.waitForDisplayed({ timeout: 5000 })
        const Day = await CalendarPage.calendarTitle.getText()
        if( Day == "Today's Plan"){
            await CalendarPage.classDetail.waitForDisplayed({ timeout: 10000 })
            expect(await CalendarPage.classDetail.isDisplayed()).toEqual(true)
            expect(await CalendarPage.preRequisites.getText()).toEqual("CLASS PREP")
        }

        expect(await CalendarPage.calendarTitle.getText()).toHaveTextContaining("Today")
    })

})