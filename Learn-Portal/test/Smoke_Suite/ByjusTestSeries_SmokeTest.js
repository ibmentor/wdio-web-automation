import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import ByjusTestSeriesPage from "../../Pages/ByjusTestSeriesPage"
import { byjusTestSeriesData } from "../../Data/ByjusTestSeriesData"
const cohortDetail = byjusTestSeriesData.byjusTestSeriesApplicableCohort[0]
describe("Learn Portal - BYJU'S-TestSeries Smoke testcases", async () => {
    it("351812 TC_01 Verify available section on Byjus Test Series page", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
        allure.startStep("Navigate to BYJUS Test Series Page", true)
        await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
        allure.startStep("Wait for Button Available to be displayed", true)
        await ByjusTestSeriesPage.BtnAvailable.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusTestSeriesPage.BtnAvailable.isDisplayed()).toEqual(true)
        allure.startStep("Validate Btn Availble with Dynamic number of tests under Availble Tab", true)
        expect(await ByjusTestSeriesPage.BtnAvailableDynamicNumber.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("351813 TC_02 Verify completed section on Byjus Test Series page", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
        allure.startStep("Navigate to BYJUS Test Series Page", true)
        await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
        allure.startStep("Wait for Btn Completed to be displayed", true)
        await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusTestSeriesPage.BtnCompleted.isDisplayed()).toEqual(true)
        allure.startStep("Validate Btn Completed with Dynamic number of tests under Completed Tab", true)
        expect(await ByjusTestSeriesPage.BtnCompletedDynamicNumber.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("351815 TC_04 Verify the instruction Pop-up when clicked on Start Test ", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
        allure.startStep("Navigate to BYJUS Test Series Page", true)
        await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
        allure.startStep("Wait for Availble tab to be displayed", true)
        await ByjusTestSeriesPage.BtnAvailable.waitForDisplayed({ timeout: 10000 })
        allure.startStep("Validate the details present on instruction Popup", true)
        await browser.pause(4000)
        const testIconDisplayed = await ByjusTestSeriesPage.testIcon.isDisplayed()
        if (testIconDisplayed == true) {
            await ByjusTestSeriesPage.BtnStartTest.waitForDisplayed({ timeout: 10000 })
            await ByjusTestSeriesPage.BtnStartTest.click()
            await ByjusTestSeriesPage.instructionTitle.waitForDisplayed({ timeout: 10000 })
            expect(await ByjusTestSeriesPage.instructionTitle.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.instruction1.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.examIcon1.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.instruction2.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.examIcon2.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.instruction3.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.examIcon3.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.btnTakeTest.isDisplayed()).toEqual(true)
            expect(await ByjusTestSeriesPage.paperDetailSectionInInstructionPage.isDisplayed()).toEqual(true)
        }
        else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep();
    })   


})
