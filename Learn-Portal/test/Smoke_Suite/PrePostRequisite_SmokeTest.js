import { AllureUtil as allure } from "../../utils/util.allure"
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import { loginData } from "../../Data/LoginData";
import {byjusclassData} from "../../Data/ByjusClassData"
const cohortDetail=byjusclassData.PrePostApplicableCohort[0]
describe("Learn Portal - Byjus Class pre post test cases", async () => {

    it("318851 TC_01 Verify Upnext session ", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(2000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnUpComingTab.click()
            await browser.pause(3000)
            const cardsLength = await ByjusClassesPage.cards.length
            for (let i = 1; i <= cardsLength; i++) {
                allure.startStep("Validate Join now button based on the Time in each card", true)
                await ByjusClassesPage.validateJoinNowButtonBasedOnTheTimeInCardUnderUpcomingTab(i)
            }
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })
    it("318856 TC_02 Verify the pre native assessment (Start test flow)", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(3000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnUpComingTab.click()
            await browser.pause(5000)
            const cardsLength = await ByjusClassesPage.cards.length
            let testDataAvailable = false
            let testDataAvailableForStartTest = false
            for (let i = 1; i <= cardsLength; i++) {
                allure.startStep("Validate Start Test Flow in See More Page Under UpComingTab", true)
                const seeMoreLink = await ByjusClassesPage.btnSeeMoreOnUpcomingTab(i)
                const prepareForClassTitle = await ByjusClassesPage.prepareForClassText(i)
                await prepareForClassTitle.scrollIntoView(true)
                const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
                if (seeMoreLinkDisplayed == true) {
                    testDataAvailable = true
                    await seeMoreLink.scrollIntoView(true)
                    await seeMoreLink.click()
                    const startButtonCTAEnabled = await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.isEnabled()
                    const disabledStartTestButton = await ByjusClassesPage.disabledStartTestBtn.isDisplayed()
                    const disabledResultButton = await ByjusClassesPage.disabledResultBtn.isDisplayed()
                    if (startButtonCTAEnabled == true && (disabledStartTestButton == false || disabledResultButton == false)) {
                        allure.startStep("Click on Start test CTA button", true)
                        await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.waitForDisplayed({ timeout: 3000 })
                        await browser.pause(2000)
                        await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.scrollIntoView({ block: "center" })
                        await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.click()
                        await browser.pause(3000)
                        const summaryHeader = await ByjusClassesPage.summaryTitle.isDisplayed()
                        if (summaryHeader == true) {
                            allure.startStep("validate the display of title for completed test ", true)
                            await ByjusClassesPage.summaryTitle.waitForDisplayed({ timeout: 5000 })
                            await browser.pause(2000)
                            allure.startStep("Navigate to home page of the completed tab", true)
                            await browser.back()
                        }
                        else {
                            allure.startStep("Validate instruction title in instruction Popup", true)
                            await ByjusClassesPage.instructionTitle.waitForDisplayed({ timeout: 3000 })
                            testDataAvailableForStartTest = true
                            expect(await ByjusClassesPage.instructionTitle.isDisplayed()).toEqual(true)
                            allure.startStep("Validate Close icon  in instruction Popup", true)
                            await ByjusClassesPage.closeIconInInstructionPopUpPage.waitForDisplayed({ timeout: 3000 })
                            expect(await ByjusClassesPage.closeIconInInstructionPopUpPage.isDisplayed()).toEqual(true)
                            allure.startStep("Validate start test CTA Button in instruction Popup", true)
                            await ByjusClassesPage.secondStartCTAButton.waitForDisplayed({ timeout: 3000 })
                            expect(await ByjusClassesPage.secondStartCTAButton.isDisplayed()).toEqual(true)
                            await ByjusClassesPage.closeIconInInstructionPopUpPage.click()
                            break;
                        }
                        allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                        await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()

                    }
                    else {
                        allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                        await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                    }
                }

            }
            if (testDataAvailable == false || testDataAvailableForStartTest == false ) {
                allure.startStep("Validate No Test Available Block", true)
                const status = 'blocked'
                const fs = require('fs')
                fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
                expect("No test data available").toEqual("")
            }
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })

    it('318853 TC_03 Verify the the session detail page', async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 10000 })
            const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
            const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
            if (seeMoreLinkDisplayed == true) {
                await seeMoreLink.scrollIntoView(true)
                await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 10000 })
                await ByjusClassesPage.btnSeeMore(1).click()
                await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
                allure.startStep("Verify the the session detail page", true)
                expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.btnSessionDetailBreadCrumb.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.labelTimeAndDateInSesionDetail.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.labelTestStartsIn.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.subjectNameUnderSessionDetails.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.subjectLogoInSessionDetail.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.btnJoinByjusClasses.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.btnPreAssessmentCTAInSessionPage.isDisplayed()).toEqual(true)
                await ByjusClassesPage.validateCTAButtonsInSessionDetailPageUnderUpComingTab()
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
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep()
    });

    it("318834 TC_04 Verify if there is 'NO Revision Material' for the completed class", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 5000 })
        await ByjusClassesPage.btnCompletedTab.click()
        try { await ByjusClassesPage.btnCompletedTabFilter(1).waitForDisplayed({ timeout: 4500 }) } catch { }
        if (await $("(//*[@class='mt-3 p-3 horzlin'])[1]").isDisplayed({ timeout: 3500 })) {
            let cardCount = await ByjusClassesPage.cardsCountCompletedTab.length
            for (let j = 1; j <= cardCount; j++) {
                if (await ByjusClassesPage.cardsCompletedTabRevisionMaterial(j).isDisplayed() == false) {
                    expect(await ByjusClassesPage.cardsCompletedTabNoMaterial(j).isDisplayed()).toEqual(true)
                }
            }
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

    it("318827 TC_05 Verify that elements under Completed section should see post requisites.", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        try { await ByjusClassesPage.cardsCompletedTab(1).waitForDisplayed({ timeout: 4500 }) } catch { }
        await browser.pause(4000)
        let dropdownCount = await ByjusClassesPage.countDropdownOnCompletedTab.length
        for (let i = 1; i <= dropdownCount; i++) {
            let topicName = await ByjusClassesPage.labelCompletedTabTopicName(i).getText()
            expect(await ByjusClassesPage.btnCompletedTabDropdownSeeMore(i).isDisplayed()).toEqual(true)
            await ByjusClassesPage.dropdownOnCompletedTab(i).click()
            expect(await ByjusClassesPage.dropdownElementCountOnCompletedTab(i).length).toBeGreaterThan(0)
            await ByjusClassesPage.btnCompletedTabDropdownSeeMore(i).click()
            try { await ByjusClassesPage.labelSessionDetailTopicName.waitForDisplayed({ timeout: 10000 }) } catch { }
            let sessionDetailTopicName = await ByjusClassesPage.labelSessionDetailTopicName.getText()
            expect(topicName).toEqual(sessionDetailTopicName)
            await browser.back()
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
            await ByjusClassesPage.btnCompletedTab.click()
        }
        if(dropdownCount<1) {
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

    it("318845 TC_06 Verify the functionality of VIDEOS", async () => {
            await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
            allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
            await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
            allure.startStep("Click on Completed Tab button", true)
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnCompletedTab.click()
            await browser.pause(5000)
            const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
            let testDataAvailable = false
            for (let i = 1; i <= cardsCountInCompletedTab; i++) {
                allure.startStep("Validate the Start again button by playing the video in Card Under Complted Tab", true)
                await browser.pause(5000)
                const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
                const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
                const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
                if (revisionMaterialDisplayed == true) {
                    testDataAvailable = true
                    await revisionMaterial.scrollIntoView({ block: "center" })
                    await browser.pause(2000)
                    allure.startStep("Click on Revision material CTA button", true)
                    await seeMoreButton.scrollIntoView({ block: "center" })
                    await browser.pause(2000)
                    allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                    await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                    await seeMoreButton.click()
                    await browser.pause(7000)
                    if (await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.isDisplayed()) {
                        allure.startStep("Click on watch Video CTA button", true)
                        await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.scrollIntoView({ block: "center" })
                        await browser.pause(2000)
                        await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.waitForDisplayed({ timeout: 5000 })
                        await browser.pause(2000)
                        await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.click()
                        await ByjusClassesPage.closeIconInPopupPage.waitForDisplayed({ timeout: 5000 })
                        await browser.pause(2000)
                        allure.startStep("Validate that video is playing in BYJUS classes page", true)
                        const currentUrl = await browser.getUrl()
                        expect(await currentUrl).toHaveTextContaining('byjus-classes')
                        await browser.pause(2000)
                        allure.startStep("Click on close icon under video popup", true)
                        await ByjusClassesPage.closeIconInPopupPage.click()
                        allure.startStep("Validate Start again button after clicking close icon on video", true)
                        await ByjusClassesPage.startAgainButtonInVideoPopupPage.waitForDisplayed({ timeout: 5000 })
                        expect(await ByjusClassesPage.startAgainButtonInVideoPopupPage.isDisplayed()).toEqual(true)
                        allure.startStep("Validate skip button in video popup page", true)
                        await ByjusClassesPage.skipButtonInVideoPopupPage.waitForDisplayed({ timeout: 5000 })
                        expect(await ByjusClassesPage.skipButtonInVideoPopupPage.isDisplayed()).toEqual(true)
                        await ByjusClassesPage.closeIconInPopupPage.waitForDisplayed({ timeout: 2000 })
                        allure.startStep("Click on close icon", true)
                        await ByjusClassesPage.closeIconInPopupPage.click()
                        break;
    
                    }
                    await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                }
    
            }
            if (testDataAvailable == false) {
                allure.startStep("Validate No Test Available Block", true)
                const status = 'blocked'
                const fs = require('fs')
                fs.writeFile('./blockedScenario.json', `"${status}"`, (err) => {
                    // In case of a error throw err.
                    if (err) throw err;
                })
                expect("No test data available").toEqual("")
            }
            allure.endStep();
        })

    it("318843 TC_07 Verify the functionality of start test for post native assessments", async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        let testDataAvailable = false
        let testDataAvailableForStartTest = false
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the Start test flow for post native assessments Under Complted Tab", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                testDataAvailable = true
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                await ByjusClassesPage.postAssessmentCTABtnInSessionPageUnderRevisionMaterial.waitForDisplayed({ timeout: 5000 })
                await ByjusClassesPage.postAssessmentCTABtnInSessionPageUnderRevisionMaterial.click()
                await browser.pause(2000)
                allure.startStep("Check for Summary Header if test is completed", true)
                const summaryHeader = await ByjusClassesPage.summaryTitle.isDisplayed()
                if (summaryHeader == true) {
                    allure.startStep("validate the display of title for completed test ", true)
                    await ByjusClassesPage.summaryTitle.waitForDisplayed({ timeout: 5000 })
                    await browser.pause(2000)
                    allure.startStep("Navigate to home page of the completed tab", true)
                    await browser.back()
                    await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 5000 })
                    await ByjusClassesPage.btnCompletedTab.click()
                    await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
                }
                else {
                    allure.startStep("validate the display of instruction title for the uncompleted test ", true)
                    await ByjusClassesPage.instructionTitle.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.instructionTitle.isDisplayed()).toEqual(true)
                    allure.startStep("validate the display of start test button in instructions Page ", true)
                    await ByjusClassesPage.secondStartCTAButton.waitForDisplayed({ timeout: 5000 })
                    testDataAvailableForStartTest = true
                    expect(await ByjusClassesPage.secondStartCTAButton.isDisplayed()).toEqual(true)
                    await ByjusClassesPage.closeIconInInstructionPopUpPage.waitForDisplayed({ timeout: 5000 })
                    allure.startStep("Click on start test button to start the test", true)
                    await ByjusClassesPage.secondStartCTAButton.click()
                    await browser.pause(2000)
                    allure.startStep("validate the display of exit Assessment button in Assesment page", true)
                    await ByjusClassesPage.exitAssessmentButton.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.exitAssessmentButton.isDisplayed()).toEqual(true)
                    allure.startStep("validate that after clicking on start test it should launch test in Assesment page", true)
                    const currentUrl = await browser.getUrl()
                    expect(await currentUrl).toHaveTextContaining('start-test')
                    allure.startStep("Navigate to home page of the completed tab", true)
                    await browser.back()
                    allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                    await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                    break;
                }
            }
        }
        if (testDataAvailable == false || testDataAvailableForStartTest == false ) {
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


    it("318846 TC_08 Verify the pre requisities which is present in post requisites as well", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        let testDataAvailable = false
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elemets present in post native assessment", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            await browser.pause(3000)
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                testDataAvailable = true
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                allure.startStep("Validate expire details of Assessment under Revison material in Session details page", true)
                await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                const startTestBtnDisplayed = await ByjusClassesPage.startTestUnderPrepareForSession.isDisplayed()
                if (startTestBtnDisplayed == false) {
                    allure.startStep("Validate Class notes under Prepare for session in Session details page", true)
                    await ByjusClassesPage.classNotesUnderPrepareForSessionInSessionPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.classNotesUnderPrepareForSessionInSessionPage.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Assesment under Prepare for session in Session details page", true)
                    await ByjusClassesPage.assessmentUnderPrepareForSessionInSessionPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.assessmentUnderPrepareForSessionInSessionPage.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Pdf Icon for Class notes under Prepare for session in Session details page", true)
                    await ByjusClassesPage.pdfImgUnderPrepareForSession.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.pdfImgUnderPrepareForSession.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Assesment Icon fir Assessment under Prepare for session in Session details page", true)
                    await ByjusClassesPage.assessmentImgUnderPrepareForSession.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.assessmentImgUnderPrepareForSession.isDisplayed()).toEqual(true)
                     break;
                }
                allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()

            }
        }
        if (testDataAvailable == false) {
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

    it("318849 TC_09 Verify Upcoming tab", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
            await ByjusClassesPage.btnUpNextInUpComingTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnUpNextInUpComingTab.isDisplayed()).toEqual(true)
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)
            await ByjusClassesPage.recommendedClassesSubTitle.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.recommendedClassesSubTitle.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    })
   
})