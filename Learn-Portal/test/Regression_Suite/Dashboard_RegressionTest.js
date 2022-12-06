import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import AskADoubtPage from "../../Pages/AskADoubtPage"
import { loginData } from "../../Data/LoginData"
import { checkLazyLoadingImgCount, AskADoubtBanner, DashboardGreetTxt } from "../../utils/function.js"
import TouchPointPage from "../../Pages/TouchPointPage";
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import AdaptivePracticeQuestionsPage from "../../Pages/AdaptivePracticeQuestionsPage";
import { touchPointData } from "../../Data/TouchPointData";
import NudgesPage from "../../Pages/NudgesPage"
const touchPointCohortDetail = touchPointData.touchPointApplicableCohort[0]
describe("Learn Portal - Dashboard module cases for free user", async () => {

    it("316025 TC_01 Free user - Check a button book your trial CTA button is not availabe for cohort < 4 ", async () => {
        allure.startStep("Change cohort to 3rd", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][2], 'free')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(false)
        allure.endStep();
    })
    it("316028 TC_02 Free user - Check Question and Answer button should navigate to Question and answer page for cohort 1st, 2nd, 3rd", async () => {
        for (let i = 0; i < 2; i++) {
            allure.startStep("Change cohert  1st, 2nd, 3rd", true);
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][i], 'free')
            allure.startStep('Verify BYJUS live classes', true);
            await browser.pause(5000)
            await DashboardPage.btnQuestionAndAnswer.scrollIntoView({ inline: "center" })
            await browser.pause(2000)
            await browser.keys(["PageUp"])
            await browser.pause(2000)
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

    it("316031 TC_03 Free user - Check Join a class today button in popup window should navigate to Aakash live class for cohort JEE", async () => {
        allure.startStep("Change cohert to 10th class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][8], 'free')
        allure.startStep("Logout the session", true);
        await LoginPage.logout()
        await browser.pause(5000) //waiting for the page to load compeletly
        allure.startStep("Login", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][8], 'free')
        allure.startStep("Click on button Join a class today", true);
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 10000 })
        await DashboardPage.btnbookYourTrialClasses.click()
        await browser.refresh();
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 5000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("316032 TC_04 Free user - Validate buttons on dashboard for free user for class 1 to 3", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[0][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 1 to 3", true);
        await DashboardPage.validateDashboardForGrade1to3(dashboardData.dashboardElementValidation.cohortDetails[0][1])
        allure.endStep();
    })

    it("316034 TC_05 Free user - Validate buttons on dashboard for free user for class 4 to 10", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade4to10('free', dashboardData.dashboardElementValidation.cohortDetails[2][4])
        allure.endStep();
    })

    it("316035 TC_06 Free user - Check a button Concept videos from CTA button should navigate to concept videos page for multiple cohorts", async () => {
        await browser.reloadSession()
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

    it("316038 TC_07 Free user - Validate the left side menu option for user from [11-12] for [JEE & NEET] cohort", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[3][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thJEE_NEET('free', dashboardData.dashboardElementValidation.cohortDetails[3][1])

    })
    it("316039 TC_08 Free user - Validate the left side menu option for user from [11-12] for Commerce ", async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[4][1], 'free')
        allure.startStep("Validate the elements on the dashboard for grade 6 to 10", true);
        await DashboardPage.validateDashboardForGrade11thTo12thCommerce('free', dashboardData.dashboardElementValidation.cohortDetails[4][1])
        allure.endStep();
    })



    it('318887 TC_10 verify all the elements which are present on the BTC card', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        if (await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true) {
            allure.startStep('Validate the "Experience the Futuristic Classrooms near you!"', true)
            expect(await DashboardPage.labelExperienceFuturisticClassroom.isDisplayed()).toEqual(true)
            allure.startStep('Validate the "location and available seats number for the class')
            let labelSeatsLeft = await DashboardPage.seatsLeft.getText()
            expect(labelSeatsLeft.includes("Seats Left")).toEqual(true)
            allure.startStep('Validate the "Request call back" button and view all center CTA', true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(true)
            expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
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

    it('319761 TC_11 Verify the elements present on app download card', async () => {

        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate app Download card", true)
        await browser.pause(5000)
        if (await DashboardPage.btnDownloadAppBTC.isDisplayed() == true) {
            expect(await DashboardPage.btnDownloadAppBTC.isDisplayed()).toEqual(true)
            expect(await DashboardPage.labelExperienceByjusApp.isDisplayed()).toEqual(true)
            expect(await DashboardPage.labelAppRating.isDisplayed()).toEqual(true)
            await DashboardPage.btnDownloadAppBTC.click()
            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[1]);
            expect(await DashboardPage.labelAppleStore.isDisplayed()).toEqual(true)
            expect(await DashboardPage.appAvailabilityText.getText()).toHaveTextContaining("This app is available only on the App Store for iPhone and iPad")
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

    it('319771 TC_12 Validate the dashboard for BTC , Neo and BTLA free user', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("Validate Dashboard page", true)
        if (await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({ timeout: 15000 })) {
            allure.startStep("Validate Neo Class banner", true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed", true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
            allure.startStep("validate Request call back button is displayed", true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(true)
            allure.startStep("validate View all centers button is displayed", true)
            expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
            allure.startStep("validate download app button is displayed", true)
            expect(await DashboardPage.btnDownloadAppBTC.isDisplayed()).toEqual(true)
            allure.startStep("validate Ask A Doubt button is displayed", true)
            expect(await DashboardPage.btndashboardAskADoubt.isDisplayed()).toEqual(true)
            allure.startStep("validate Adaptive test button is displayed", true)
            expect(await DashboardPage.btnDashboardAdaptiveTest.isDisplayed()).toEqual(true)
            expect(await DashboardPage.btnDashboardDownloads.isDisplayed()).toEqual(true)
            allure.startStep("validate concept video view all button is displayed", true)
            expect(await DashboardPage.btnConceptVideosViewAll.isDisplayed()).toEqual(true)
            allure.startStep("validate concept video card is displayed", true)
            expect(await DashboardPage.dashboardConceptVideoCard.isDisplayed()).toEqual(true)
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


    it("316036 TC_13 Free user - Check the view all button from concept video section should navigate to concept video page", async () => {

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


    it('319777 TC_18 Free user - validate the view more slots', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("click on view more slots button", true)
        await browser.pause(10000)
        if (await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()) {
            await DashboardPage.btnViewMoreSlots.waitForDisplayed({ timeout: 3000 })
            await DashboardPage.btnViewMoreSlots.click()
            allure.startStep('Verify the banner image of byjus classes', true);
            await DashboardPage.bannerheadingByjusClasses.waitForDisplayed({ timeout: 35000 })
            expect(await DashboardPage.bannerheadingByjusClasses.isDisplayed()).toEqual(true)
            await browser.pause(8000)
            let otherClassCards = await $("(//*[contains(@class,'position-relative card-body')])[1]")
            if(await otherClassCards.isDisplayed())
            {
            await otherClassCards.waitForDisplayed({ timeout: 10000 })
            expect(await otherClassCards.isDisplayed()).toEqual(true)
            }
            else {
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
            expect("No test data available for Other Class Cards").toEqual("")

            }
            
        } else {
            await DashboardPage.btnJoinNow.waitForDisplayed({ timeout: 5000 })
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
    it('318902 TC_21 Free user - Verify the "View all centres " popup screen and all the elements which are present on the popup', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("click on view all centre button", true)
        await browser.pause(5000)
        if (await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true) {
            await DashboardPage.btnViewAllCentre.waitForClickable({ timeout: 5000 })
            await DashboardPage.btnViewAllCentre.click()
            allure.startStep("validate view all centre pop up", true)
            await DashboardPage.viewAllCentrePopUp.waitForDisplayed({ timeout: 5000 })
            expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
            expect(await DashboardPage.btnCurrentLocationPopUp.isDisplayed()).toEqual(true)
            expect(await DashboardPage.labelStateOnPopUp.isDisplayed()).toEqual(true)
            expect(await DashboardPage.labelCityOnPopUp.isDisplayed()).toEqual(true)
            await DashboardPage.tfStateInput.setValue("Maharashtra")
            await browser.keys("Tab")
            let cityName = "Pune"
            await DashboardPage.tfCityInput.setValue(cityName)
            await browser.keys("Tab")
            expect(await $("//*[text()='Showing results for your']").isDisplayed()).toEqual(true)
            expect(await $(`//*[text()='${cityName}']`).isDisplayed()).toEqual(true)
        } else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({ timeout: 5000 })
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

    it('318903 TC_22 Free user - verify the bottom nudges users selects the city and state in "View all centre " popup screen.', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("click on view all centre button", true)
        await browser.pause(5000)
        if (await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true) {
            await DashboardPage.btnViewAllCentre.waitForClickable({ timeout: 5000 })
            await DashboardPage.btnViewAllCentre.click()
            allure.startStep("validate view all centre pop up", true)
            await DashboardPage.viewAllCentrePopUp.waitForDisplayed({ timeout: 5000 })
            expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
            expect(await $("//*[text()='Showing results for your']").isDisplayed()).toEqual(true)
            let centersCount = await $$('//div[@class="css-16iyc2u card"]').length
            expect(await centersCount > 1)
        } else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({ timeout: 5000 })
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

    it('318905 TC_23 Verify the request call back functionality in "View all centre " popup screen ', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        allure.startStep("click on view all centre button", true)
        await browser.pause(5000)
        if (await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true) {
            await DashboardPage.btnViewAllCentre.waitForClickable({ timeout: 5000 })
            await DashboardPage.btnViewAllCentre.click()
            allure.startStep("validate view all centre pop up", true)
            await DashboardPage.viewAllCentrePopUp.waitForDisplayed({ timeout: 5000 })
            allure.startStep("click on request call back button", true)
            await DashboardPage.btnRequestCallBackInViewAllCenter.waitForClickable({ timeout: 3000 })
            await DashboardPage.btnRequestCallBackInViewAllCenter.click()
            await browser.pause(3000)// time to page load
            allure.startStep("Verify booking successfull message ", true)
            expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed()).toEqual(true)
        } else {
            expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed({ timeout: 5000 })).toEqual(true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(false)
        }
        allure.endStep()
    });

    it('319776 TC_24 Validate the Join now card in neo class banner', async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        allure.startStep("Validate join now card", true)
        if (await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true) {
            await DashboardPage.btnbookaFreeTrialCTA.waitForClickable({ timeout: 3000 })
            await DashboardPage.btnbookaFreeTrialCTA.click()
            await DashboardPage.joinNowCardValidation()
        } else if (await DashboardPage.btnJoinNow.isDisplayed() == true) {
            await DashboardPage.joinNowCardValidation()
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



    it('323267 TC_25 Verify join class card title for free user', async () => {

        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsForLessThan4th_Above10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForLessThan4th_Above10thGrade.cohortDetails[i], 'free')
            await DashboardPage.learnAnytimeTitle.waitForDisplayed({ timeout: 10000 })
            expect(await DashboardPage.learnAnytimeTitle.isDisplayed()).toEqual(true)
            expect(await DashboardPage.learnAnytimeTitle).toHaveTextContaining('Learn anytime, anywhere!')
        }

    })

    it("316037 TC_14 Paid user - Verify Ask a doubt button should navigate to Ask a doubt page.", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][4], 'paid')
        allure.startStep("Click on Ask a doubt button", true)
        await DashboardPage.btndashboardAskADoubt.waitForDisplayed({ timeout: 15000 })
        await DashboardPage.btndashboardAskADoubt.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await DashboardPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        const ques = await DashboardPage.firstSuggestionAskaDoubt.getText()
        await DashboardPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        expect(await AskADoubtPage.instaLaernAskADoubtUrl()).toHaveTextContaining("ask-a-doubt")
        await AskADoubtPage.questionHeaderInAskaDoubt.waitForDisplayed({ timeout: 15000 })
        expect(ques).toEqual(await AskADoubtPage.questionHeaderInAskaDoubt.getText())
        allure.endStep();
    })

    it('323268 TC_26 Verify join class card title for Paid user', async () => {
        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'paid')
            await browser.pause(3000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            if (upComingClassess) {
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {
                    await DashboardPage.backdrop.click()
                }
                await DashboardPage.yourUpcomingClassTitle.waitForDisplayed({ timeout: 3000 })
                expect(await DashboardPage.yourUpcomingClassTitle.isDisplayed()).toEqual(true)
                expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(true)
            }

        }

    })

    it('323269 TC_27 Verify join class card title for Paid user when user dont have upcoming classes', async () => {

        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'paid')
            await browser.pause(3000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            if (upComingClassess) {
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {
                    await DashboardPage.backdrop.click()
                }
                await DashboardPage.yourUpcomingClassTitle.waitForDisplayed({ timeout: 3000 })
                expect(await DashboardPage.yourUpcomingClassTitle.isDisplayed()).toEqual(true)
                expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(true)
            }
            else {
                expect(await DashboardPage.yourUpcomingClassTitle.isDisplayed()).toEqual(false)
                expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(false)

            }
        }

    })

    it('323271 TC_29 Verify onboarding user checklist for paid user', async () => {

        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'paid')
            await browser.pause(5000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            if (upComingClassess) {
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {
                    await DashboardPage.backdrop.click()
                }
            }
            expect(await DashboardPage.onBoardingCheckList.isDisplayed()).toEqual(false)
        }

    })

    it('323272 TC_30 Verify panel to switch to LP 1.0', async () => {

        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'paid')
            await browser.pause(5000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            if (upComingClassess) {
                await browser.pause(3000)
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {

                    await DashboardPage.backdrop.click()
                }
            }
            expect(await DashboardPage.oldBackExperineceTitle.isDisplayed()).toEqual(false)
            expect(await DashboardPage.btnToNavigateOldPortal.isDisplayed()).toEqual(false)
        }

    })

    it('323270 TC_28 Verify onboarding user checklist for free user above 10th grade', async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsAbove10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsAbove10thGrade.cohortDetails[i], 'free')
            await browser.pause(3000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            if (upComingClassess) {
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {
                    await DashboardPage.backdrop.click()
                }
            }
            expect(await DashboardPage.onBoardingCheckList.isDisplayed()).toEqual(true)
        }

    })




    it('323275 TC_31 Verify explore widget for free users from above and below grade 4-10', async () => {

        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsForLessThan4th_Above10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForLessThan4th_Above10thGrade.cohortDetails[i], 'free')
            await browser.pause(5000)
            const neoLogoDisplayed = await DashboardPage.neoLogo.isDisplayed()
            if (neoLogoDisplayed) {
                await browser.keys(["PageDown"])
            }
            await DashboardPage.whatsnewExploreTitle.waitForDisplayed({ timeout: 20000 })
            expect(await DashboardPage.whatsnewExploreTitle.isDisplayed()).toEqual(true)
            await DashboardPage.questionAndAnswerBtn.waitForDisplayed({ timeout: 20000 })
            expect(await DashboardPage.questionAndAnswerBtn.isDisplayed()).toEqual(true)
        }

    })


    it('323276 TC_32 Verify explore widget for paid users from above and below grade 4-10', async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'paid')
            await browser.pause(5000)
            const upComingClassess = await DashboardPage.yourUpcomingClassTitle.isDisplayed()
            const exploreTitle = await DashboardPage.exploreTitle.isDisplayed()
            if (upComingClassess) {
                const backdropDisplayed = await DashboardPage.backdrop.isDisplayed()
                if (backdropDisplayed) {
                    await DashboardPage.backdrop.click()
                }
                await DashboardPage.yourUpcomingClassTitle.waitForDisplayed({ timeout: 3000 })
                expect(await DashboardPage.yourUpcomingClassTitle.isDisplayed()).toEqual(true)
                expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(true)
            }
            if (!exploreTitle) {
                expect(await DashboardPage.chooseSubjTitle.isDisplayed()).toEqual(true)
            }
            else {
                await DashboardPage.exploreTitle.waitForDisplayed({ timeout: 20000 })
                await browser.pause(4000)
                const neoLogoDisplayed = await DashboardPage.neoLogo.isDisplayed()
                if (neoLogoDisplayed) {
                    await browser.keys(["PageDown"])
                }
                await DashboardPage.byjusTutionCenterLogo.scrollIntoView(true)
                await browser.pause(3000)
                await DashboardPage.byjusTutionCenterLogo.waitForDisplayed({ timeout: 20000 })
                expect(await DashboardPage.byjusTutionCenterLogo.isDisplayed()).toEqual(true)
            }
        }
    })


    it('323277 TC_33 Verify dashboard design for BTLP users', async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[4], 'btlp') //Premium Cohort
        await DashboardPage.dayGreetingText.waitForDisplayed({ timeout: 20000 })
        expect(await DashboardPage.dayGreetingText.isDisplayed()).toEqual(true)
        await browser.pause(5000)
        const neoLogoDisplayed = await DashboardPage.neoLogo.isDisplayed()
        if (neoLogoDisplayed) {
            await browser.keys(["PageDown"])
        }
        const chooseSubjectDisplayed = await DashboardPage.chooseSubjTitle.isDisplayed()
        if (!chooseSubjectDisplayed) {
            await browser.keys(["PageDown"])
        }
        await DashboardPage.chooseSubjTitle.scrollIntoView(true)
        await browser.pause(3000)
        expect(await DashboardPage.chooseSubjTitle.isDisplayed()).toEqual(true)
        expect(await DashboardPage.subjCard.isDisplayed()).toEqual(true)
        await DashboardPage.watchVideoSection.waitForDisplayed({ timeout: 20000 })
        expect(await DashboardPage.watchVideoSection.isDisplayed()).toEqual(true)
        await DashboardPage.videoCardUnderwatchVideoSection.waitForDisplayed({ timeout: 20000 })
        expect(await DashboardPage.videoCardUnderwatchVideoSection.isDisplayed()).toEqual(true)
        expect(await DashboardPage.askADoubtWidget.isDisplayed()).toEqual(true)
        expect(await DashboardPage.adaptiveTestWidget.isDisplayed()).toEqual(true)
        await DashboardPage.menuOption.click()
        await browser.pause(2000)
        const downloadBtn = await DashboardPage.btnDownloads.isDisplayed()
        if (downloadBtn) {
            await DashboardPage.menuOption.click()
            await browser.pause(2000)
            expect(await DashboardPage.downloadsWidget.isDisplayed()).toEqual(true)
        }
    })


    it('323315 TC_34 Verify explore widget for free users from grade 4-10', async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        const cohortDetails = dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for (let i = 0; i < cohortDetails; i++) {
            await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'free')
            await DashboardPage.exploreTitle.waitForDisplayed({ timeout: 20000 })
            await browser.pause(5000)
            const neoLogoDisplayed = await DashboardPage.neoLogo.isDisplayed()
            if (neoLogoDisplayed) {
                await browser.keys(["PageDown"])
            }
            await DashboardPage.byjusTutionCenterLogo.scrollIntoView(true)
            await browser.pause(3000)
            await DashboardPage.byjusTutionCenterLogo.waitForDisplayed({ timeout: 20000 })
            expect(await DashboardPage.byjusTutionCenterLogo.isDisplayed()).toEqual(true)
            await DashboardPage.byjusAppDownloadLogo.waitForDisplayed({ timeout: 20000 })
            expect(await DashboardPage.byjusAppDownloadLogo.isDisplayed()).toEqual(true)
        }

    })

    it("323018 TC_35 Lazy Loading - Verify the images loading on dashboard screen(free user BTC dashboard ) ", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[6]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Validate image count in starting and end of the page", true)
        await checkLazyLoadingImgCount(dashboardData.lazyLoadingUrls[0])
        allure.endStep();
    })

    it("323020 TC_36 Lazy Loading - Verify the images loading on 'Download app' screen ", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[6]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'free')
        allure.startStep("Validate image count in starting and end of the page", true)
        await checkLazyLoadingImgCount(dashboardData.lazyLoadingUrls[1])
        allure.endStep();
    })

    it("331118 TC_37 Lazy loading - Check the lazy loading for paid user (BLC,NEO paid ) dashboard ", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[6]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'paid')
        allure.startStep("Validate image count in starting and end of the page", true)
        await checkLazyLoadingImgCount(dashboardData.lazyLoadingUrls[2])
        allure.endStep();
    })
    it("331724 TC_38- Neo paid user -Dashboard- Verify the touchpoint feature is applicable only for neo paid users", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        allure.startStep("Navigate to CWT Module", true)
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if (await TouchPointPage.btnConnectToTutor.isDisplayed() == true) {
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            allure.startStep("Click on First subject", true)
            await browser.pause(3000)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isDisplayed()

            if (retakeTest == true) {
                await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnAnalysis.click()
                expect(await TouchPointPage.summaryPageHeadingHaveADoubt.waitForDisplayed({ timeout: 15000 })).toEqual(true)
            }
            else {
                await TouchPointPage.subjectSubjectCard(2).waitForClickable({ timeout: 35000 })
                await TouchPointPage.subjectSubjectCard(2).click()
                await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.ddTestOne.click()
                let takeTest = await ChapterWiseTestsPage.btnTakeATest.isClickable()
                if (takeTest) {
                    await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 35000 })
                    await ChapterWiseTestsPage.btnTakeATest.click()
                }
                else {
                    await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
                    await ChapterWiseTestsPage.retakeTest(1).click()
                }
                await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnStartTest.click()
                await ChapterWiseTestsPage.questionsHandling()
                expect(await TouchPointPage.summaryPageHeadingHaveADoubt.isDisplayed()).toEqual(true)
            }
            await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
            let completedTab = await ByjusClassesPage.btnCompletedTab.isClickable()
            if (completedTab) {
                await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
                await ByjusClassesPage.btnCompletedTab.click()
            }
            await browser.pause(3000)
            expect(await TouchPointPage.btnConnectToAtutorForByjusClasses.isDisplayed()).toEqual(true)
            await TouchPointPage.preConnectwithTutorValidation()
            allure.startStep("Navigate to concept video menu", true)
            await ConceptVideoPage.navigateToConceptVideo()
            allure.startStep("Validates play button in main page is clickable", true)
            await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
            await ConceptVideoPage.btnPlayOnMainPage.click()
            await browser.pause(3000)
            expect(await TouchPointPage.btnConnectToTutorConceptVideo.isDisplayed()).toEqual(true)
            await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
            await AdaptivePracticeQuestionsPage.startAndEndPracticeForTouchPoint()
            await TouchPointPage.btnConnectToTutorAPQ.waitForDisplayed({ timeout: 4500 })
            await browser.keys(["PageDown", "PageDown", "PageDown"])
            await TouchPointPage.btnConnectToTutorAPQ.scrollIntoView({block:"center"})
            await browser.pause(3000)
            await TouchPointPage.btnConnectToTutorAPQ.click()
            expect(await TouchPointPage.popupTouchPointAPQ.isDisplayed()).toEqual(true)
            await TouchPointPage.popupTouchPointQuestionAPQ.waitForDisplayed({ timeout: 4500 })
            await TouchPointPage.popupTouchPointQuestionAPQ.click()
            await TouchPointPage.popupBtnConnectToTutorAPQ.click()
            await TouchPointPage.popupConnectToTutorViaAPQ.waitForDisplayed({ timeout: 35000 })
            expect(await TouchPointPage.popupConnectToTutorViaAPQ.isDisplayed()).toEqual(true)
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
    })

    it("334437 TC_45 For BTLP user below greeting message content is changed in Dashboard ", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'btlp')
        allure.startStep("Validate greeting message content in Dashboard", true)
        await DashboardGreetTxt()
        allure.endStep();
    })

    it("334529 TC_46 For NEO user in Dashboard ask a doubt card title ,description & cta is changed", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'doubtsOnChatUser')
        allure.startStep("Validate all the texts of Ask A Doubt Video Banner", true)
        await AskADoubtBanner()
        allure.endStep();
    })

    it("335392 TC_47 For BTLP user -Above 10 cohort Dashboard ask a doubt title , description & cta is changed", async () => {
        await browser.reloadSession()
        let cohortDetail = loginData.sanityData.cohortDetails[13]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'btlp')
        allure.startStep("Validate all the texts of Ask A Doubt Video Banner", true)
        await AskADoubtBanner()
        allure.endStep();
    })


    it("331735 TC_39- free User - Verify the touch point feature should not be visible for free user or other than neo paid user .APQ and CWT after completing the assessment that 'completed assessment page should not be visible for free user'", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject", true)
        await browser.pause(3000)
        let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isDisplayed()
        if (retakeTest == true) {
            await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.btnAnalysis.click()
            expect(await TouchPointPage.summaryPageHeadingHaveADoubt.isDisplayed({ timeout: 15000 })).toEqual(false)
        }
        else {
            await TouchPointPage.subjectSubjectCard(2).waitForClickable({ timeout: 35000 })
            await TouchPointPage.subjectSubjectCard(2).click()
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            let takeTest = await ChapterWiseTestsPage.btnTakeATest.isClickable()
            if (takeTest) {
                await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            else {
                await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.retakeTest(1).click()
            }
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.questionsHandling()
            expect(await TouchPointPage.summaryPageHeadingHaveADoubt.isDisplayed()).toEqual(false)
        }
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        let completedTab = await ByjusClassesPage.btnCompletedTab.isClickable()
        if (completedTab) {
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
            await ByjusClassesPage.btnCompletedTab.click()
        }
        expect(await TouchPointPage.btnConnectToAtutorForByjusClasses.isDisplayed()).toEqual(false)
        await TouchPointPage.preConnectwithTutorValidation()
        allure.startStep("Navigate to concept video menu", true)
        await ConceptVideoPage.navigateToConceptVideo()
        allure.startStep("Validates play button in main page is clickable", true)
        await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayOnMainPage.click()
        await browser.pause(3000)
        expect(await TouchPointPage.btnConnectToTutorConceptVideo.isDisplayed()).toEqual(false)
        await AdaptivePracticeQuestionsPage.navigateToAPQAndPageLoad()
        await AdaptivePracticeQuestionsPage.startAndEndPracticeForTouchPoint()
        expect(await TouchPointPage.btnConnectToTutorConceptVideo.isDisplayed()).toEqual(false)


    })
    it("337305 TC_40 Verify the Footer in Dashboard module", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForDisplayed({timeout:15000})
        await browser.pause(5000)
        await browser.keys(["End"])
        await browser.pause(2000)
        await TouchPointPage.preConnectwithTutorValidation()
        await NudgesPage.preVerificationOfNudgeWindow()
        await DashboardPage.termsAndConditionLink.waitForDisplayed({timeout:15000})
        expect(await DashboardPage.termsAndConditionLink.isClickable()).toEqual(true)
        await DashboardPage.privacyPolicyLink.waitForDisplayed({timeout:15000})
        expect(await DashboardPage.privacyPolicyLink.isClickable()).toEqual(true)
        await DashboardPage.termsAndConditionLink.click()
        await browser.pause(4000)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1]);
        const termsAndConditionsUrl = await browser.getUrl()
        let expectedTermsAndConditionsUrlDisplayed= termsAndConditionsUrl.includes("https://byjus.com/tnc_app/")
        expect(expectedTermsAndConditionsUrlDisplayed).toEqual(true)
        await DashboardPage.termsAndConditionTitle.waitForDisplayed({timeout:10000})
        expect(await DashboardPage.termsAndConditionTitle.isDisplayed()).toEqual(true)
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
        await DashboardPage.privacyPolicyLink.waitForDisplayed({timeout:15000})
        await DashboardPage.privacyPolicyLink.click()
        await browser.pause(2000)
        const handles1 = await browser.getWindowHandles()
        await browser.switchToWindow(handles1[1]);
        const privacyPolicyUrl= await browser.getUrl()
        let expectedPrivacyUrlDisplayed = privacyPolicyUrl.includes("https://byjus.com/tnc_app/#privacydesc")
        expect(expectedPrivacyUrlDisplayed).toEqual(true)
        await DashboardPage.privacyPolicyTitle.waitForDisplayed({timeout:10000})
        expect(await DashboardPage.privacyPolicyTitle.isDisplayed()).toEqual(true)
        await browser.closeWindow();
        await browser.switchToWindow(handles1[0]);
        allure.endStep();
    })

})

