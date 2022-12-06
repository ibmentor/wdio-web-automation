import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage";
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import LoginPage from "../../Pages/LoginPage";
import { loginData } from "../../Data/LoginData"
import CloudWatchPage from "../../Pages/CloudWatchPage";
import { getUserId } from "../../utils/function"
let pre_Class_data = require('../../Data/OLAP_data/byjusclassPre_class_OLAP_DATA.json')
let post_Class_data = require('../../Data/OLAP_data/byjusClassPost_class_OLAPData.json')
let userID



describe("OLAP- Pre and post Requisites", async () => {
    it("318795 TC_01 Pre Requisites _ Upcoming Tab Validate Olap Event 9202001 - click download topic pdf", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7])
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnPreDownloadPDF.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnPreDownloadPDF.click()
        allure.startStep("Click download topic PDF event triggered  - 9202001", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202001", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })

    it("318796 TC_02 Post Requisites _ Completed Tab Validate Olap Event 9202001 - click download topic pdf", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnMathematics.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnMathematics.click()
        await ByjusClassesPage.dropdownOnCompletedTab(2).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.dropdownOnCompletedTab(2).click()
        await ByjusClassesPage.btnPostDownloadPDFCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnPostDownloadPDFCompletedTab.click()
        allure.startStep("Click download topic PDF event triggered  - 9202001", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202001", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })
    it.skip("318797 TC_03 Pre Requisites _ Upcoming Tab Validate Olap Event 9202003 - click topic video", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        allure.startStep("Click on topic video event triggered  - 9202003", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202003", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })

    it("318798 TC_04 Post Requisites _ CompletedTab Validate Olap Event 9202003 - click topic video", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnMathematics.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnMathematics.click()
        await ByjusClassesPage.dropdownOnCompletedTab(1).click()
        await ByjusClassesPage.btnWatchVideoCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnWatchVideoCompletedTab.click()
        allure.startStep("Click on topic video event triggered  - 9202003", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202003", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()


    })


    it("318799 TC_05 Pre Requisites _ Upcoming Tab Validate Olap Event 9202016 - click take/retake test on byjus classes", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnStartTest(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnStartTest(1).click()
        allure.startStep("Click take/retake test on byjus classes event triggered  - 9202016", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202016", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318800 TC_06 Post Requisites _ Completed Tab Validate click take/retake test on byjus classes", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.dropdownOnCompletedTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.dropdownOnCompletedTab(1).click()
        await ByjusClassesPage.btnStartTest(2).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnStartTest(2).click()
        allure.startStep("Click take/retake test on byjus classes event triggered  - 9202016", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202016", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })
    it("318801 TC_07 Pre Requisites _ Upcoming Tab Validate Olap Event 9202004 -click see more for session details page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMore(1).click()
        allure.startStep("Click on see more for session detail event triggered  - 9202004", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202004", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318802 TC_08 Post Requisites _ Completed Tab Validate Olap Event 9202004 - click see more for session details page", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        allure.startStep("Click on see more for session detail event triggered  - 9202004", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202004", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })

    it("318803 TC_09 Session details page _ Upcoming tab vaildate Olap event 9202005-land on session details page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).click()
        allure.startStep("Land on session detail page event triggered  - 9202005", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202005", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()
    })

    it("318804 TC_10 Session details page _ Completed tab vaildate Olap event 9202005-land on session details page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        allure.startStep("Land on session detail page event triggered  - 9202005", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202005", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()


    })

    it("318805 TC_11 session details page_ upcoming Tab validate - click remind me on session details page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMore(1).click()
        await ByjusClassesPage.btnRemindMeOnWhatsapp.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnRemindMeOnWhatsapp.click()
        allure.startStep("click remind me on event triggered  - 9202006", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202006", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })

    it("318806 TC_12 Session details page_pre requisites_ Upcoming tab validate Olap event 9202007-click topic video", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMore(1).click()
        await ByjusClassesPage.btnWatchVideoCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnWatchVideoCompletedTab.click()
        allure.startStep("click topic video event triggered  - 9202007", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202007", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318807 TC_13 Session details page_pre requisites_ Completed tab validate Olap event 9202007-click topic video", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnWatchVideoCompletedTabForPreK3.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnWatchVideoCompletedTabForPreK3.click()
        allure.startStep("click remind me on event triggered  - 9202007", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202007", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318808 TC_14 Session details page_post requisites_ Completed tab validate Olap event 9202007-click topic video", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnWatchVideoCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnWatchVideoCompletedTab.click()
        allure.startStep("click remind me on event triggered  - 9202007", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202007", userID, pre_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })
    it("318809 TC_15 Session details page_pre requisites_ Upcoming tab validate Olap event 9202008-click download topic pdf ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).click()
        await ByjusClassesPage.btnPreDownloadPDFSessionDetailPage.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnPreDownloadPDFSessionDetailPage.click()
        allure.startStep("click download topic pdf event triggered  - 9202008", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202008", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318810 TC_16 Session details page_pre requisites_ Completed tab validate Olap event 9202008-click download topic pdf", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnDownloadPDFSessionDetailPage(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnDownloadPDFSessionDetailPage(1).click()
        allure.startStep("click download topic pdf event triggered  - 9202008", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202008", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })

    it("318811 TC_17 Session details page_post requisites_ Completed tab validate Olap event 9202008-click download topic pdf", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnDownloadPDFSessionDetailPage(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnDownloadPDFSessionDetailPage(1).click()
        allure.startStep("click download topic pdf event triggered  - 9202008", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202008", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })

    it("318812 TC_18 Session details page_pre requisites_ Upcoming tab validate Olap event 9202010-<click take/retake test on byjus classes>", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        allure.startStep("click take/retake test on byjus classes event triggered  - 9202010", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202010", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318813 TC_19 Session details page_pre requisites_ Completed tab validate Olap event 9202010-<click take/retake test on byjus classes>", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(3).waitForDisplayed({ timeout: 5000 })
        await ByjusClassesPage.btnstartTestSessionDetailPage(3).click()
        allure.startStep("click take/retake test on byjus classes event triggered  - 9202010", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202010", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318814 TC_20 Session details page_post requisites_ Completed tab validate Olap event 9202010-<click take/retake test on byjus classes>", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 15000 })
        let button = await ByjusClassesPage.btnstartTestSessionDetailPage(1).isClickable()
        if (button) {
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        }
        else {
            await ByjusClassesPage.btnResumeTest(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnResumeTest(1).click()
        }
        allure.startStep("click take/retake test on byjus classes event triggered  - 9202010", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202010", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()
    })

    it("318815 TC_21 Session details page_pre requisites_ Upcoming tab validate Olap event 9202011-view test instructions page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        allure.startStep("view test instructions page event triggered  - 9202011", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202011", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })
    it("318816 TC_22 Session details page_pre requisites_ Completed tab validate Olap event 9202011-view test instructions page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(3).waitForDisplayed({ timeout: 5000 })
        await ByjusClassesPage.btnstartTestSessionDetailPage(3).click()
        allure.startStep("view test instructions page event triggered  - 9202011", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202011", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })

    it("318817 TC_23 Session details page_post requisites_ Completed tab validate Olap event 9202011-view test instructions page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await browser.pause(3000)
        let button = await ByjusClassesPage.btnstartTestSessionDetailPage(1).isClickable()
        if (button) {
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        }
        else {
            await ByjusClassesPage.btnResumeTest(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnResumeTest(1).click()
        }
        allure.startStep("view test instructions page event triggered  - 9202011", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202011", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()

    })
    it("318818 TC_24 Session details page_pre requisites_ Upcoming tab validate Olap event 9202012-click start test on instructions page	", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(3).waitForDisplayed({ timeout: 8000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(3).click()
        let button = await ByjusClassesPage.btnstartTestSessionDetailPage(1).isClickable()
        if (button) {
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        }
        else {
            await ByjusClassesPage.btnResumeTest(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnResumeTest(1).click()
            await ByjusClassesPage.btnStartTestOnInstructionPage.waitForDisplayed({ timeout: 15000 })
            await ByjusClassesPage.btnStartTestOnInstructionPage.click()

        }
        allure.startStep("click start test on instructions page event triggered  - 9202012", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202012", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318819 TC_25 Session details page_pre requisites_ Completed tab validate Olap event 9202012-click start test on instructions page	", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await browser.pause(3000)
        let button = await ByjusClassesPage.btnstartTestSessionDetailPage(1).isClickable()
        if (button) {
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
            await ByjusClassesPage.btnStartTestOnInstructionPage.waitForDisplayed({ timeout: 15000 })
            await ByjusClassesPage.btnStartTestOnInstructionPage.click()
        }
        else {
            await ByjusClassesPage.btnResumeTest(1).waitForDisplayed({ timeout: 5000 })
            await ByjusClassesPage.btnResumeTest(1).click()
            await ByjusClassesPage.btnStartTestOnInstructionPage.waitForDisplayed({ timeout: 15000 })
            await ByjusClassesPage.btnStartTestOnInstructionPage.click()
        }
        allure.startStep("click start test on instructions page event triggered  - 9202012", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202012", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })
    it("318820 TC_26 Session details page_post requisites_ Completed tab validate-click start test on instructions page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).waitForDisplayed({ timeout: 5000 })
        await ByjusClassesPage.btnstartTestSessionDetailPage(1).click()
        await ByjusClassesPage.btnStartTestOnInstructionPage.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnStartTestOnInstructionPage.click()
        allure.startStep("click start test on instructions page event triggered  - 9202012", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202012", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()
    })

    it("318821 TC_27 Session details page_pre requisites_ Upcoming tab validate -click join byju's class on session details page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnSeeMoreOnUpcomingTab(1).click()
        await ByjusClassesPage.btnJoinByjusClasses.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnJoinByjusClasses.click()
        allure.startStep("click join byju's class on session details page event triggered  - 9202013", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202013", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()

    })


    it("318822 TC_28 Post requisites_ Completed tab validate Olap event 9202014-click on subject navigation tab", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnMathematics.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnMathematics.click()
        allure.startStep("click on subject navigation tab event triggered  - 9202014", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202014", userID, post_Class_data)).toEqual(true)
        allure.endStep()

    })
    it("318823 TC_29 Completed tab_ validate Olap event 9202015-view subject completed page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'prePostUser')
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnMathematics.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnMathematics.click()
        allure.startStep("view subject completed page event triggered  - 9202015", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202015", userID, post_Class_data)).toEqual(true)
        allure.endStep()

    })
})