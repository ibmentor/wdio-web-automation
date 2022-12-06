import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { loginData } from "../../Data/LoginData"
import MonthlyTestPage from "../../Pages/MonthlyTestPage";
import { getUserId } from "../../utils/function"
import CloudWatchPage from "../../Pages/CloudWatchPage";
let localData = require('../../Data/OLAP_data/MonthlyExm_OLAP_Data.json')
let userID



describe("OLAP - Monthly test flow", async () => {

  it("319337 TC_01 Validate Olap event 9200042_click to go to Monthly test on Burger Men", async () => {
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Login to Learn Portal and change cohort", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    allure.startStep("click on burger menu event triggered - 9200042", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200042", userID, localData)).toEqual(true)
    allure.endStep()
  })


  it("319340 TC_02 Validate Olap event 9200043_land on monthly test home page", async () => {
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Login to Learn Portal and change cohort", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    allure.startStep("land on monthly test home page event triggered - 9200043", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200043", userID, localData)).toEqual(true)
    allure.endStep()
  })
  it("319338 TC_03 Validate Olap event 9200159_click concept videos", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnConceptVideo.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnConceptVideo.click()
    allure.startStep("click concept videos event triggered - 9200159", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200159", userID, localData)).toEqual(true)
    allure.endStep()
  })


  it("319339 TC_04 Validate Olap event 9200160_click to go to bookmarks", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnBookMark.waitForDisplayed({ timeout: 5000 })
    await MonthlyTestPage.btnBookMark.click()
    allure.startStep("click to go to bookmarks event triggered - 9200160", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200160", userID, localData)).toEqual(true)
    allure.endStep()
  })
  it("319348 TC_05 Validate Olap event 9200158_ask a doubt", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnAskADoubt.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnAskADoubt.click()
    allure.startStep("ask a doubt event triggered - 9200158", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200158", userID, localData)).toEqual(true)
    allure.endStep()
  })

  it("319346 TC_06 Validate Olap event 9200051_click on skipped", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnSkippedTab.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnSkippedTab.click()
    allure.startStep("click on skipped event triggered - 9200051", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200051", userID, localData)).toEqual(true)
    allure.endStep()
  })
  it("319347 TC_07 Validate Olap event 9201023_click on upcoming", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnUpcomingTab.click()
    allure.startStep("click on upcoming event triggered - 9201023", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9201023", userID, localData)).toEqual(true)
    allure.endStep()
  })
  it("319345 TC_08 Validate Olap event 9200050_click on view results", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnCompleted.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnCompleted.click()
    await MonthlyTestPage.btnDetailedAnalysis.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnDetailedAnalysis.click()
    allure.startStep("click on detailed analysis event triggered - 9200050", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200050", userID, localData)).toEqual(true)
  })
  it("319344 TC_09 Validate Olap event 9200049_click on completed", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnCompleted.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnCompleted.click()
    allure.startStep("click on completed event triggered - 9200049", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200049", userID, localData)).toEqual(true)

  })
  it("319341 TC_10 Validate Olap event 9200044_click on start test", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnUpcomingTab.click()
    await MonthlyTestPage.btnStartTest.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnStartTest.click()
    allure.startStep("click start test event triggered - 9200044", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200044", userID, localData)).toEqual(true)
    allure.endStep()
  })
  it("319342 TC_11 Validate Olap event 9200045_view instructions", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnUpcomingTab.click()
    await MonthlyTestPage.btnStartTest.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnStartTest.click()
    allure.startStep("view instructions event triggered - 9200045", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200045", userID, localData)).toEqual(true)
    allure.endStep()

  })
  it("319343 TC_12 Validate Olap event 9200046_start test from instructions popup", async () => {
    allure.startStep("Login to Learn Portal and change cohort", true);
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
    userID = await getUserId()
    allure.startStep("Navigate to monthly test module", true);
    await MonthlyTestPage.navigateToMonthlyTestModule()
    await MonthlyTestPage.btnUpcomingTab.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnUpcomingTab.click()
    await MonthlyTestPage.btnStartTest.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.btnStartTest.click()
    await MonthlyTestPage.startTestPopupBtnStartTest.waitForDisplayed({ timeout: 15000 })
    await MonthlyTestPage.startTestPopupBtnStartTest.click()
    allure.startStep("view instructions event triggered - 9200046", true)
    expect(await CloudWatchPage.getAndCompareCloudwatchDataMonthlyExam("9200046", userID, localData)).toEqual(true)
    allure.endStep()

  })
})
