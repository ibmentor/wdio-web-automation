import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import DashboardPage from "../../../Pages/DashboardPage"
import { dashboardData } from "../../../Data/DashboardData"
import ConceptVideoPage from "../../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../../Pages/AskADoubtPage"



describe("Learn Portal - Dashboard module cases for paid user", async () => {

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()

    })


    it("306548 TC_01  Paid user - Validate FAQ section of download app page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Click on Download app icon", true)
        await browser.pause(2000)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("Validate FAQ section is displayed")
        await DashboardPage.labelFAQ.waitForDisplayed({ timout: 5000 })

        for (let i = 1; i <= 2; i++) {
            await $("(//*[@class='rounded-circle downloadApp_arrowStyle__3jK0J'])[" + i + "]").click()
            await $("(//*[@class='downloadApp_faqexpandTitle__2xaOP'])[" + i + "]").waitForDisplayed({ timeout: 5000 })
            let qs = await $("(//*[@class='downloadApp_faqexpandTitle__2xaOP'])[" + i + "]").getText()
            expect(await qs).toEqual(dashboardData.FAQ.questions[i - 1])
            await $("(//*[@class='downloadApp_faqAns__1By9a collapse show'])[" + i + "]").waitForDisplayed({ timeout: 5000 })
            let ans = await $("(//*[@class='downloadApp_faqAns__1By9a collapse show'])[" + i + "]").getText()
            expect(await ans).toHaveTextContaining(dashboardData.FAQ.answers[i - 1])
        }
        allure.endStep();
    })

    it("306549 TC_02  Paid user - Validate appliaction navigates to google play store and app store for download page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 15000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("Validate Google Store  section is displayed", true)
        await DashboardPage.btnGooglePlayStore.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnGooglePlayStore.click()
        let handles1 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[0]))
        await browser.closeWindow()
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles1[0]);
        allure.startStep("Validate App Store button is displayed")
        await DashboardPage.btnAppleStore.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnAppleStore.click()
        let handles2 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[1]))
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles2[0]);
        allure.endStep();

    })

    it("306550 TC_03  Paid user - Check a button book your trial CTA button is not availabe for cohort 1 ", async () => {
        allure.startStep("Change cohort to 1st", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][0], 'paid')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        await browser.pause(3000)//waits for the page to load
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(false)
        allure.endStep();
    })

    it("306551 TC_04  Paid user - Check a button book your trial CTA button is availabe for cohort > 3 ", async () => {
        allure.startStep("Change cohort to 4th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][1], 'paid')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306552 TC_05  Paid user - Check book your trial classes button should navigate to byjus classes page", async () => {
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Change cohort to 7th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'paid')
        allure.startStep("Validate Byjus live class label is getting displayed", true)
        expect(await $("//*[@id='root']//div[2]/div/span").getText()).toHaveTextContaining('BYJUS live classes')
        allure.startStep("Click on Book a free Trial button", true);
        await DashboardPage.btnbookYourTrialClasses.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnbookYourTrialClasses.click()
        allure.startStep('Verify the banner image of byjus classes', true);
        await DashboardPage.bannerheadingByjusClasses.waitForDisplayed({ timeout: 35000 })
        expect(await DashboardPage.bannerheadingByjusClasses.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306553 TC_06  Paid user - Check Akash live classes should display above cohort 10th ", async () => {
        allure.startStep("Change cohort to JEE class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][7], 'paid')
        allure.startStep("Click on Book your free Trial button", true);
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 5000 })
        await DashboardPage.btnbookYourTrialClasses.click()
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.startStep('Click on back window button', true);
        await browser.back();
        allure.startStep("Click on Book a free Trial button from CTA card", true);
        await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({ timeout: 25000 })
        await browser.pause(500)
        await DashboardPage.btnbookaFreeTrialCTA.scrollIntoView({ block: "center" })
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306554 TC_07  Paid user - Check Question and Answer button should navigate to Question and answer page for cohort 4th, 6th, 7th", async () => {
        for (let i = 1; i < 3; i++) {
            allure.startStep("Change cohert 4th, 6th, 7th", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][i], 'paid')
            allure.startStep('Verify BYJUS live classes', true);
            await DashboardPage.btnQuestionAndAnswer.waitForDisplayed({ timeout: 15000 })
            await DashboardPage.btnQuestionAndAnswer.click()
            const handles = await browser.getWindowHandles();
            allure.startStep('Switched to ask a Question page', true);
            await browser.switchToWindow(handles[1]);
            await DashboardPage.labelAskAQues.waitForDisplayed({ timeout: 15000 })
            expect(await DashboardPage.labelAskAQues.isDisplayed()).toEqual(true)
            allure.startStep('Close the window');
            await browser.closeWindow();
            allure.startStep('Switched back to default window', true);
            await browser.switchToWindow(handles[0]);
            allure.endStep();
        }
    })

    it("306555 TC_08  Paid user - Check book a Free Trial button should navigate to byjus classes page for cohort 4th, 6th, 7th", async () => {
        for (let i = 1; i < 3; i++) {
            allure.startStep("Change cohert 4th, 6th, 7th", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][i], 'paid')
            allure.startStep('Verify BYJUS live classes', true);
            await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({ timeout: 15000 })
            await DashboardPage.btnbookaFreeTrialCTA.click()
            allure.startStep('Verify byjus classes banner heading', true);
            await DashboardPage.bannerheadingByjusClasses.waitForDisplayed({ timeout: 15000 })
            expect(await DashboardPage.bannerheadingByjusClasses.isDisplayed()).toEqual(true)
            allure.endStep();
        }

    })


    it("306556 TC_09  Paid user - Check Join a class today button in popup window should navigate to BYJUS class for cohort 7th", async () => {
        allure.startStep("Change cohert to 7th class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'paid')
        allure.startStep("Logout the session", true);
        await LoginPage.logout()
        await browser.pause(5000) //waiting for the page to load compeletly
        allure.startStep("Login", true);
        await LoginPage.loginToLearnPortalClickOnBookTrialPopupPaidUser()
        allure.startStep("Click on button Join a class today", true);
        await DashboardPage.btnjoinAClassInsideBookATrialPopup.waitForDisplayed({ timeout: 8000 })
        await DashboardPage.btnjoinAClassInsideBookATrialPopup.click()
        allure.startStep('Verify BYJUS classes', true);
        await DashboardPage.bannerheadingByjusClasses.waitForDisplayed({ timeout: 35000 })
        expect(await DashboardPage.bannerheadingByjusClasses.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306557 TC_10  Paid user - Check Join a class today button in popup window should navigate to Aakash live class for cohort JEE", async () => {
        allure.startStep("Change cohert to 10th class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][7], 'paid')
        allure.startStep("Logout the session", true);
        await LoginPage.logout()
        await browser.pause(5000) //waiting for the page to load compeletly
        allure.startStep("Login", true);
        await LoginPage.loginToLearnPortalClickOnBookTrialPopupPaidUser()
        allure.startStep("Click on button Join a class today", true);
        await DashboardPage.btnjoinAClassInsideBookATrialPopup.waitForDisplayed({ timeout: 35000 })
        await DashboardPage.btnjoinAClassInsideBookATrialPopup.click()
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 35000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("306558 TC_11  Paid user - Check a button Concept videos from CTA button should navigate to concept videos page for multiple cohorts", async () => {
        for (let i = 0; i < 4; i++) {
            allure.startStep("Change cohort to 11th commerce, 12th commerce, CAT, GRE, GMAT", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[1][i], 'paid')
            allure.startStep("Click on concept video button", true)
            await DashboardPage.btnconceptVideos.waitForDisplayed({ timeout: 15000 })
            await DashboardPage.btnconceptVideos.click()
            allure.startStep('Verify the banner heading of concept video page', true);
            await browser.pause(4000) //waiting for page to load
            await DashboardPage.bannerheadingConceptVideos.waitForDisplayed({ timeout: 45000 })
            expect(await DashboardPage.bannerheadingConceptVideos.isDisplayed()).toEqual(true)
            allure.endStep();
        }

    })
    it("306559 TC_12  Paid user - Check the view all button from concept video section should navigate to concept video page", async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][4], 'paid')
        allure.startStep("Click on concept video view all button", true)
        await DashboardPage.btnviewAllConceptVideo.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnviewAllConceptVideo.click()
        allure.startStep('Verify the banner heading of concept video page', true);
        await DashboardPage.bannerheadingConceptVideos.waitForDisplayed({ timeout: 25000 })
        expect(await DashboardPage.bannerheadingConceptVideos.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("3065560 TC_13  Paid user - Validate buttons on dashboard for paid user for class 1 to 3", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[0][1], 'paid')
        allure.startStep("Validate the elements on the dashboard for grade 1 to 3", true);
        await DashboardPage.validateDashboardForGrade1to3(dashboardData.dashboardElementValidation.cohortDetails[0][1])
        allure.endStep();
    })

    it("306561 TC_14  Paid user - Validate buttons on dashboard for paid user for class 4 to 5", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[1][1], 'paid')
        allure.startStep("Validate the elements on the dashboard for grade 4 or 5", true);
        await DashboardPage.validateDashboardForGrade4and5('paid', dashboardData.dashboardElementValidation.cohortDetails[1][1], 'paid')
        allure.endStep();
    })
    it("306562 TC_15  Paid user - Validate buttons on dashboard for paid user for class 6 to 10", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'paid')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade6to10('paid', dashboardData.dashboardElementValidation.cohortDetails[2][4], 'paid')
        allure.endStep();
    })
    it("306563 TC_16  Paid user - Verify Ask a doubt button should navigate to Ask a doubt page.", async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][4], 'paid')
        allure.startStep("Click on Ask a doubt button", true)
        await DashboardPage.btndashboardAskADoubt.waitForDisplayed({ timeout: 35000 })
        await DashboardPage.btndashboardAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        expect(await AskADoubtPage.btnAskADoubt.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();
    })
    it("306564 TC_17  Paid user - Validate the left side menu option for user from [11-12] for [JEE & NEET] cohort", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[3][1], 'paid')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thJEE_NEET('paid', dashboardData.dashboardElementValidation.cohortDetails[3][1])
        allure.endStep();

    })
    it("306565 TC_18  Paid user - Validate the left side menu option for user from [11-12] for Commerce cohort", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[4][1], 'paid')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thCommerce('paid', dashboardData.dashboardElementValidation.cohortDetails[4][1])
        allure.endStep();

    })
})