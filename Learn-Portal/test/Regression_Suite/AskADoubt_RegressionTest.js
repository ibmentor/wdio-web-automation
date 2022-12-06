import { AllureUtil as allure } from "../../utils/util.allure"
import { loginData } from "../../Data/LoginData"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"

describe.skip("Learn Portal - Ask A Doubt Test cases", async () => {
    it("352292 TC_01 Validate the Ask a doubt for BDLC user", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'bdlc')
        allure.startStep("Navigate to Ask A Doubt", true)
        await DashboardPage.menuOption.click()
        await DashboardPage.btnAskADoubt.click()
        await AskADoubtPage.TitleAskADoubt.waitForExist({ timeout: 5000 })
        expect(await AskADoubtPage.TitleAskADoubt.isExisting()).toEqual(true)
        expect(await AskADoubtPage.DoubtPlaceholder.isExisting()).toEqual(true)
        expect(await AskADoubtPage.btnAskADoubt.isExisting()).toEqual(true)
        allure.endStep();
    });
})
