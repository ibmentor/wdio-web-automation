import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import DashboardPage from "../../../Pages/DashboardPage"
import { dashboardData } from "../../../Data/DashboardData"
import ConceptVideoPage from "../../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../../Pages/AskADoubtPage"
import { time } from "console";



describe("Learn Portal - Dashboard module cases for free user", async () => {

    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()

    })


    it("316022 TC_01 Free user - Validate FAQ section of download app page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Click on Download app icon", true)
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

    it("316023 TC_02 Free user - Validate appliaction navigates to google play store and appstore for download page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 5000 })
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

    it("316024 TC_03 Free user - Check a button book your trial CTA button is not availabe for cohort 1 ", async () => {
        allure.startStep("Change cohort to 1st", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][0], 'free')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        await browser.pause(3000)//waits for the page to load        
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(false)
        allure.endStep();
    })

    it("316025 TC_04 Free user - Check a button book your trial CTA button is not  availabe for cohort < 4 ", async () => {
        allure.startStep("Change cohort to 3rd", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][1], 'free')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(false)
        allure.endStep();
    })
    it("316027 TC_05 Free user - Check Akash live classes should display above cohort 10th ", async () => {
        allure.startStep("Change cohort to JEE class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][7], 'free')
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
    it("316028 TC_06 Free user - Check Question and Answer button should navigate to Question and answer page for cohort 1st, 2nd, 3rd", async () => {
        for (let i = 0; i < 2; i++) {
            allure.startStep("Change cohert  1st, 2nd, 3rd", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][i], 'free')
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

    it("316031 TC_07 Free user - Check Join a class today button in popup window should navigate to Aakash live class for cohort JEE", async () => {
        allure.startStep("Change cohert to 10th class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][7], 'free')
        allure.startStep("Logout the session", true);
        await LoginPage.logout()
        await browser.pause(5000) //waiting for the page to load compeletly
        allure.startStep("Login", true);
        await LoginPage.loginToLearnPortalClickOnBookTrialPopupFreeUser()
        allure.startStep("Click on button Join a class today", true);
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 5000 })
        await DashboardPage.btnbookYourTrialClasses.click()
        await browser.refresh();
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 5000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("316032 TC_08 Free user - Validate buttons on dashboard for free user for class 1 to 3", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[0][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 1 to 3", true);
        await DashboardPage.validateDashboardForGrade1to3(dashboardData.dashboardElementValidation.cohortDetails[0][1])
        allure.endStep();
    })
    it("316034 TC_09 Free user - Validate buttons on dashboard for free user for class 4 to 10", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade4to10('free', dashboardData.dashboardElementValidation.cohortDetails[2][4])
        allure.endStep();
    })

    it("316035 TC_10 Free user - Check a button Concept videos from CTA button should navigate to concept videos page for multiple cohorts", async () => {
        for (let i = 0; i < 4; i++) {
            allure.startStep("Change cohort to 11th commerce, 12th commerce, CAT, GRE, GMAT", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[1][i], 'free')
            allure.startStep("Click on concept video button", true)
            await DashboardPage.btnconceptVideos.waitForDisplayed({ timeout: 25000 })
            await DashboardPage.btnconceptVideos.click()
            allure.startStep('Verify the banner heading of concept video page', true);
            await browser.pause(4000) //waiting for page to load
            await DashboardPage.bannerheadingConceptVideos.waitForDisplayed({ timeout: 35000 })
            expect(await DashboardPage.bannerheadingConceptVideos.isDisplayed()).toEqual(true)
            allure.endStep();
        }
    })
    it("316036 TC_11 Free user - Check the view all button from concept video section should navigate to concept video page", async () => {

        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][4], 'free')
        allure.startStep("Click on concept video view all button", true)
        await DashboardPage.btnviewAllConceptVideo.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btnviewAllConceptVideo.click()
        allure.startStep('Verify the banner heading of concept video page', true);
        await DashboardPage.bannerheadingConceptVideos.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.bannerheadingConceptVideos.isDisplayed()).toEqual(true)
        allure.endStep();

    })
    it("316037 TC_12 Free user - Verify Ask a doubt button should navigate to Ask a doubt page.", async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][4], 'free')
        allure.startStep("Click on Ask a doubt button", true)
        await DashboardPage.btndashboardAskADoubt.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btndashboardAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        expect(await AskADoubtPage.btnAskADoubt.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();
    })

    it("316038 TC_13 Free user - Validate the left side menu option for user from [11-12] for [JEE & NEET] cohort", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[3][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thJEE_NEET('free', dashboardData.dashboardElementValidation.cohortDetails[3][1])

    })
    it("316039 TC_14 Free user - Validate the left side menu option for user from [11-12] for Commerce ", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[4][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thCommerce('free', dashboardData.dashboardElementValidation.cohortDetails[4][1])
        allure.endStep();
    })

    it('318877 TC_15 verify the right side pannel should not be there and card width should be enlarged compared to the existing one',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("validate AskADoubt button",true)
        expect(await DashboardPage.btndashboardAskADoubt.isDisplayed()).toEqual(true)
        await DashboardPage.btndashboardAskADoubt.scrollIntoView(true)
        allure.startStep("validate AdaptiveTest button",true)
        expect(await DashboardPage.btnDashboardAdaptiveTest.isDisplayed()).toEqual(true)
        allure.startStep("validate Downloads button",true)
        expect(await DashboardPage.btnDashboardDownloads.isDisplayed()).toEqual(true)
        allure.endStep()
    });

    it('318887 TC_16 verify all the elements which are present on the BTC card',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        allure.startStep('Validate the "Experience the Futuristic Classrooms near you!"',true)
        expect(await DashboardPage.labelExperienceFuturisticClassroom.isDisplayed()).toEqual(true)
        allure.startStep('Validate the "location and available seats number for the class')
        let labelSeatsLeft = await DashboardPage.seatsLeft.getText()
        expect(labelSeatsLeft.includes("Seats Left")).toEqual(true)      
        allure.startStep('Validate the "Request call back" button and view all center CTA',true)
        expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(true)
        expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
    }else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
        allure.endStep()
    });

    it('319761 TC_17 Verify the elements present on app download card',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate app Download card",true)
        if(await DashboardPage.btnDownloadAppBTC.isDisplayed() == true){
        expect(await DashboardPage.btnDownloadAppBTC.isDisplayed()).toEqual(true)
        expect(await DashboardPage.labelExperienceByjusApp.isDisplayed()).toEqual(true)        
        expect(await DashboardPage.labelAppRating.isDisplayed()).toEqual(true)
        await DashboardPage.btnDownloadAppBTC.click()
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        expect(await DashboardPage.labelAppleStore.isDisplayed()).toEqual(true)
        expect(await DashboardPage.appAvailabilityText.getText()).toHaveTextContaining("This app is available only on the App Store for iPhone and iPad")
        }else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('319777 TC_18 validate the view more slots',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view more slots button",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()){
        await DashboardPage.btnViewMoreSlots.waitForDisplayed({timeout:3000})
        await DashboardPage.btnViewMoreSlots.click()
        allure.startStep('Verify the banner image of byjus classes', true);
        await DashboardPage.bannerheadingByjusClasses.waitForDisplayed({ timeout: 35000 })
        expect(await DashboardPage.bannerheadingByjusClasses.isDisplayed()).toEqual(true)
        let otherClassCards = await $("(//*[contains(@class,'position-relative card-body')])[1]")
        await otherClassCards.waitForDisplayed({timeout:10000})
        expect(await otherClassCards.isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('319778 TC_19 Validate the book a class CTA',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on book a class button", true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
        await DashboardPage.btnbookaFreeTrialCTA.waitForClickable({timeout:3000})
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep('The "book a class" CTA state of the card animation changes to "Join now" CTA',true)
        await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})
        expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('318901 TC_20 Verify the functionality of "View all centres" on BTC card ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view all centre button",true)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
        await DashboardPage.btnViewAllCentre.waitForClickable({timeout:5000})
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("verify view all centres pop up is getting display",true)
        expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({timeout:5000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('318902 TC_21 Verify the "View all centres " popup screen and all the elements which are present on the popup',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view all centre button",true)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        await DashboardPage.btnViewAllCentre.waitForClickable({timeout:5000})
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("validate view all centre pop up", true)
        await DashboardPage.viewAllCentrePopUp.waitForDisplayed({timeout:5000})
        expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
        expect(await DashboardPage.btnCurrentLocationPopUp.isDisplayed()).toEqual(true)
        expect(await DashboardPage.labelStateOnPopUp.isDisplayed()).toEqual(true)
        expect(await DashboardPage.labelCityOnPopUp.isDisplayed()).toEqual(true)
        await DashboardPage.tfStateInput.setValue("Maharashtra")
        await browser.keys("Tab")
        let cityName="Pune"
        await DashboardPage.tfCityInput.setValue(cityName)
        await browser.keys("Tab")
        expect(await $("//*[text()='Showing results for your']").isDisplayed()).toEqual(true)
        expect(await $(`//*[text()='${cityName}']`).isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({timeout:5000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('318903 TC_22 verify the bottom nudges users selects the city and state in "View all centre " popup screen.',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view all centre button",true)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        await DashboardPage.btnViewAllCentre.waitForClickable({timeout:5000})
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("validate view all centre pop up", true)
        await DashboardPage.viewAllCentrePopUp.waitForDisplayed({timeout:5000})
        expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
        expect(await $("//*[text()='Showing results for your']").isDisplayed()).toEqual(true)
        let centersCount = await $$('//div[@class="css-16iyc2u card"]').length
        expect(await centersCount > 1)
        }else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({timeout:5000})
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('318899 TC_23 Verify the request call back functionality On BTC card ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view all centre button",true)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        allure.startStep("click on request call back button", true)
        await DashboardPage.btnRequestACallBackOnMainPage.waitForClickable({timeout:3000})
        await DashboardPage.btnRequestACallBackOnMainPage.click()
        await browser.pause(3000)// time to page load
        allure.startStep("Verify booking successfull message ",true)
        expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed()).toEqual(true)
        }else{
            expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed({timeout:5000})).toEqual(true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(false)
        }
        allure.endStep()
    });

    it('318905 TC_24 Verify the request call back functionality in "View all centre " popup screen ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("click on view all centre button",true)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        await DashboardPage.btnViewAllCentre.waitForClickable({timeout:5000})
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("validate view all centre pop up", true)
        await DashboardPage.viewAllCentrePopUp.waitForDisplayed({timeout:5000})
        allure.startStep("click on request call back button", true)
        await DashboardPage.btnRequestCallBackInViewAllCenter.waitForClickable({timeout:3000})
        await DashboardPage.btnRequestCallBackInViewAllCenter.click()
        await browser.pause(3000)// time to page load
        allure.startStep("Verify booking successfull message ",true)
        expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed()).toEqual(true)
        }else{
            expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed({timeout:5000})).toEqual(true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(false)
        }
        allure.endStep()
    });

    it('319779 TC_25 validate the Join now CTA ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate join now button",true)
        if(await DashboardPage.btnJoinNow.isDisplayed()){
            expect(await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})).toEqual(true)
            await DashboardPage.validateJoinNowButtonBasedOnTheTimeInCard()
        }else if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            await DashboardPage.btnbookaFreeTrialCTA.click()
            expect(await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})).toEqual(true)
            await DashboardPage.validateJoinNowButtonBasedOnTheTimeInCard()
        } else {
        allure.startStep("Validate No Test Available Block", true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
        expect("No test data available").toEqual("")
    }
    allure.endStep()

    });

    it('319771 TC_26 Validate the dashboard for BTC , Neo and BTLA free user',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate Dashboard page",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            allure.startStep("Validate Neo Class banner",true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed",true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
            allure.startStep("validate Request call back button is displayed",true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(true)
            allure.startStep("validate View all centers button is displayed",true)
            expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
            allure.startStep("validate download app button is displayed",true)
            expect(await DashboardPage.btnDownloadAppBTC.isDisplayed()).toEqual(true)
            allure.startStep("validate Ask A Doubt button is displayed",true)
            expect(await DashboardPage.btndashboardAskADoubt.isDisplayed()).toEqual(true)
            allure.startStep("validate Adaptive test button is displayed",true)
            expect(await DashboardPage.btnDashboardAdaptiveTest.isDisplayed()).toEqual(true)
            expect(await DashboardPage.btnDashboardDownloads.isDisplayed()).toEqual(true)
            allure.startStep("validate concept video view all button is displayed",true)
            expect(await DashboardPage.btnConceptVideosViewAll.isDisplayed()).toEqual(true)
            allure.startStep("validate concept video card is displayed",true)
            expect(await DashboardPage.dashboardConceptVideoCard.isDisplayed()).toEqual(true)
        }else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });

    it('319773 TC_27 Validate the Neo class banner',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate Dashboard page",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            allure.startStep("Validate Neo Class banner",true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed",true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
        }else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    })

    it('319775 TC_28 Validate the book a class card in neo class banner',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate Dashboard page",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            allure.startStep("Validate Neo Class banner",true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate subject name is displayed",true)
            expect(await DashboardPage.subjectNameOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate subject topic is displayed",true)
            expect(await DashboardPage.subjectTopicOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate date is displayed",true)
            expect(await DashboardPage.DateOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate time is displayed",true)
            expect(await DashboardPage.TimeOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed",true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
        }else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    })

    it('319776 TC_29 Validate the Join now card in neo class banner',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:5000})
        allure.startStep("Validate join now card",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            await DashboardPage.btnbookaFreeTrialCTA.waitForClickable({timeout:3000})
            await DashboardPage.btnbookaFreeTrialCTA.click()
            await DashboardPage.joinNowCardValidation()
        }else if(await DashboardPage.btnJoinNow.isDisplayed() == true){
            await DashboardPage.joinNowCardValidation()
        }else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
        allure.endStep()
    });
})