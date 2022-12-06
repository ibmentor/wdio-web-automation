import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import ByjusTestSeriesPage from "../../Pages/ByjusTestSeriesPage"
import { byjusTestSeriesData } from "../../Data/ByjusTestSeriesData"
const cohortDetail = byjusTestSeriesData.byjusTestSeriesApplicableCohort[0]
describe("Learn Portal - BYJU'S-TestSeries Regression testcases", async () => {
it("351814 TC_03 Verify title of test, icon, name of test, duration, no. of questions, avaliabilty of test, calendar icon and take test CTA", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Availble tab to be displayed", true)
    await ByjusTestSeriesPage.BtnAvailable.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate all the fields related to exam paper under Availble tab", true)
    await browser.pause(4000)
    const testIconDisplayed = await ByjusTestSeriesPage.testIcon.isDisplayed()
    if (testIconDisplayed == true) {
        await ByjusTestSeriesPage.testIcon.waitForDisplayed({ timeout: 10000 })
        expect(await ByjusTestSeriesPage.testIcon.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.calendarIcon.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.availabilityUnderCalendar.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.timeDuration.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.numOfQuestions.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.BtnStartTest.isDisplayed()).toEqual(true)
        expect(await ByjusTestSeriesPage.paperTitle.isDisplayed()).toEqual(true)
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
it("351816 TC_05 Verify the filter dropdown in completed section", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Completed tab to be displayed", true)
    await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.BtnCompleted.click()
    allure.startStep("Validate the options present in filter dropdown in Completed Tab", true)
    await ByjusTestSeriesPage.filterDropDown.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.filterDropDown.click()
    expect(await ByjusTestSeriesPage.filterDropDown.getText()).toHaveTextContaining('All')
    await ByjusTestSeriesPage.selectOptionUnderCompletedDropdpDown('Completed Test')
    await ByjusTestSeriesPage.filterDropDown.click()
    expect(await ByjusTestSeriesPage.filterDropDown.getText()).toHaveTextContaining('Completed Test')
    await ByjusTestSeriesPage.selectOptionUnderCompletedDropdpDown('Missed Test')
    await ByjusTestSeriesPage.filterDropDown.click()
    expect(await ByjusTestSeriesPage.filterDropDown.getText()).toHaveTextContaining('Missed Test')
    allure.endStep();
})
it("351817 TC_06 Verify the date completed on and analysis CTA on completed section", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Completed tab to be displayed", true)
    await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate date completed and analysis cta on completed section", true)
    await ByjusTestSeriesPage.BtnCompleted.click()
    await ByjusTestSeriesPage.filterDropDown.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.selectOptionUnderCompletedDropdpDown('Completed Test')
    await browser.pause(4000)
    const completedTextDisplayed = await ByjusTestSeriesPage.completedTextUnderCalendarIcon.isDisplayed()
    if (completedTextDisplayed == true) {
        await ByjusTestSeriesPage.completedTextUnderCalendarIcon.waitForDisplayed({ timeout: 10000 })
        expect(await ByjusTestSeriesPage.completedTextUnderCalendarIcon).toHaveTextContaining('Completed')
        await ByjusTestSeriesPage.btnViewAnalysis.waitForDisplayed({ timeout: 10000 })
        expect(await ByjusTestSeriesPage.btnViewAnalysis.isDisplayed()).toEqual(true)
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
it("351818 TC_07 Verify the missed class tag along with Expired on date", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Completed tab to be displayed", true)
    await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate missed class tag along with Expired on date under Completed section", true)
    await ByjusTestSeriesPage.BtnCompleted.click()
    await ByjusTestSeriesPage.filterDropDown.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.selectOptionUnderCompletedDropdpDown('Missed Test')
    await browser.pause(5000)
    const missedTestTagDisplayed=await ByjusTestSeriesPage.missedTestTag.isDisplayed()
    console.log("missedTestTagDisplayed*****"+missedTestTagDisplayed)
    if(missedTestTagDisplayed==true)
    {
    await ByjusTestSeriesPage.missedTestTag.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.missedTestTag.isDisplayed()).toEqual(true)
    await ByjusTestSeriesPage.expiredTextUnderCalendarIcon.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.expiredTextUnderCalendarIcon).toHaveTextContaining('Expired')
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

it("351819 TC_08 Verify the pagination and no of enties in available & completed section", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Subject Bookmarks Label to be displayed", true)
    await ByjusTestSeriesPage.BtnAvailable.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate Pagination on Available and Completed section", true)
    await ByjusTestSeriesPage.BtnAvailable.click()
    await browser.pause(4000)
    if(await ByjusTestSeriesPage.BtnPreviousPagePagination.isDisplayed() ==true)
    {
    await ByjusTestSeriesPage.BtnPreviousPagePagination.waitForDisplayed({ timeout: 5000 })
    await ByjusTestSeriesPage.BtnPreviousPagePagination.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    expect(await ByjusTestSeriesPage.BtnPreviousPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.BtnCurrentPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.BtnNextPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.paginationInfoText.isDisplayed()).toEqual(true)
    await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.BtnCompleted.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await ByjusTestSeriesPage.BtnCompleted.click()
    await ByjusTestSeriesPage.BtnPreviousPagePagination.waitForDisplayed({ timeout: 5000 })
    await ByjusTestSeriesPage.BtnPreviousPagePagination.scrollIntoView({ block: "center" })
    await browser.pause(3000)
    expect(await ByjusTestSeriesPage.BtnPreviousPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.BtnCurrentPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.BtnNextPagePagination.isDisplayed()).toEqual(true)
    expect(await ByjusTestSeriesPage.paginationInfoText.isDisplayed()).toEqual(true)
    }
    else{
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

it("351820 TC_09 Verify No tests available for no in available section", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Available tab to be displayed", true)
    await ByjusTestSeriesPage.BtnAvailable.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate no test available in Available Section", true)
    await ByjusTestSeriesPage.BtnAvailable.click()
    await browser.pause(4000)
    const noTestAvailbleDisplayed= await ByjusTestSeriesPage.noTestAvailable.isDisplayed()
    if(noTestAvailbleDisplayed){
    await ByjusTestSeriesPage.noTestAvailable.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.noTestAvailable.isDisplayed()).toEqual(true)
    await ByjusTestSeriesPage.noTestAvailableSubText.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.noTestAvailableSubText.isDisplayed()).toEqual(true)
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

it("351821 TC_10 Verify No tests completed and Missed yet in completed section", async () => {
    await ProfilePage.changeCohortDetail(cohortDetail, 'byjusTestSeriesUser')
    allure.startStep("Navigate to BYJUS Test Series Page", true)
    await ByjusTestSeriesPage.navigateToByjusTestSeriesPage()
    allure.startStep("Wait for Completed tab to be displayed", true)
    await ByjusTestSeriesPage.BtnCompleted.waitForDisplayed({ timeout: 10000 })
    allure.startStep("Validate No tests completed and Missed yet in completed section", true)
    await ByjusTestSeriesPage.BtnCompleted.click()
    await ByjusTestSeriesPage.filterDropDown.waitForDisplayed({ timeout: 10000 })
    await ByjusTestSeriesPage.selectOptionUnderCompletedDropdpDown('Completed Test')
    await browser.pause(4000)
    const noTestsCompletedDisplayed=await ByjusTestSeriesPage.noTestsCompleted.isDisplayed()
    if(noTestsCompletedDisplayed)
    {
    await ByjusTestSeriesPage.noTestsCompleted.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.noTestsCompleted.isDisplayed()).toEqual(true)
    await ByjusTestSeriesPage.noTestsCompletedSubText.waitForDisplayed({ timeout: 10000 })
    expect(await ByjusTestSeriesPage.noTestsCompletedSubText.isDisplayed()).toEqual(true)
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
