import { AllureUtil as allure } from "../../utils/util.allure"
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import { loginData } from "../../Data/LoginData";
import {byjusclassData} from "../../Data/ByjusClassData"
const cohortDetail=byjusclassData.PrePostApplicableCohort[0]
describe.skip("Learn Portal - Byjus Class pre post test cases", async () => {

    it("318870 TC_01 Paid user - Verify the page loading time for Pre/Post requisites", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnUpComingTab.click()
            allure.startStep("Validate upNext Button got displayed under upComing Tab", true)
            expect(await ByjusClassesPage.btnUpNextInUpComingTab.isDisplayed()).toEqual(true)
            allure.startStep("Click on Completed Tab", true)
            await ByjusClassesPage.btnCompletedTab.click()
            allure.startStep("Validate All Button got displayed under Completed Tab within 5 seconds", true)
            await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
            expect(await ByjusClassesPage.btnAllOnCompletedTab.isDisplayed()).toEqual(true)
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })

    it("318867 TC_02 Negative Test Case -Verify the pre requisites sessions card/Page", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnUpComingTab.click()
            await ByjusClassesPage.validateCTAButtonsInSeeMorePageUnderUpComingTab()
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })
    
    it("318858 TC_03 Verify the Join Byju's Class CTA in session details page", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            await ByjusClassesPage.btnUpComingTab.click()
            await browser.pause(3000)
            const cardsLength = await ByjusClassesPage.cards.length
            let testDataAvailable=false
            for (let i = 1; i <= cardsLength; i++) {
                await browser.pause(3000)
                allure.startStep("Validate Join Byju's Class CTA in Session details Page Under UpComingTab based on the Time in each card", true)
                const seeMoreLink = await ByjusClassesPage.btnSeeMoreOnUpcomingTab(i)
                const prepareForClassTitle = await ByjusClassesPage.prepareForClassText(i)
                await prepareForClassTitle.scrollIntoView({block:"center"})
                await browser.pause(2000)
                const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
                if (seeMoreLinkDisplayed == true) {
                    testDataAvailable=true
                    await seeMoreLink.scrollIntoView(true)
                    await seeMoreLink.click()
                    await ByjusClassesPage.joinTime.waitForDisplayed({ timeout: 3000 })
                    await ByjusClassesPage.joinTime.scrollIntoView(true)
                    await browser.pause(2000)
                    const timeDetails = await ByjusClassesPage.joinTime.getText()
                    const timeDetailsArray = timeDetails.split(" ")
                    let status = timeDetailsArray[0]
                    if (status == "Starts") {
                        let timeValue = timeDetailsArray[2]
                        let timeUnit = timeDetailsArray[3]

                        if (timeUnit == "mins") {
                            if (timeValue < 15) {
                                expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(true)
                            }
                        }
                        else {
                            expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(false)
                        }

                    }
                    else if (status == "Started") {
                        expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(true)
                    }

                    allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                    await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                }
                
            }
            if(testDataAvailable==false) 
            {
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

    it("318824 TC_04 Validate Byju's classes Main Page", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            allure.startStep("validate the display of Upcoming Tab button", true)
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
            allure.startStep("validate the display of Completed Tab button", true)
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })
    it('318854 TC_05 Verify the topic download pdf', async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(3000)
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        if (seeMoreLinkDisplayed == true) {
            await seeMoreLink.scrollIntoView({block:"center"})
            await browser.pause(2000)
            await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 10000 })
            await ByjusClassesPage.btnSeeMore(1).click()
            await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
            if (await ByjusClassesPage.btnDownload.isDisplayed()) {
                await ByjusClassesPage.btnDownload.waitForDisplayed({ timeout: 3000 })
                await ByjusClassesPage.btnDownload.click()
                await browser.pause(1500)
                const handles = await browser.getWindowHandles()
                await browser.switchToWindow(handles[1]);
                const url = await browser.getUrl()
                let flag = url.includes("pdf")
                await browser.closeWindow();
                await browser.switchToWindow(handles[0]);
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

    });

    it('318865 TC_06 Negative Test Case- Verify free user flow', async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(cohortDetail, "free")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        if (await ByjusClassesPage.btnUpComingTab.isExisting()) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 10000 })
        } else {
            await ByjusClassesPage.labelForYouTab.waitForDisplayed({ timeout: 5000 })
        }
        expect(await ByjusClassesPage.labelPrequisite.isDisplayed()).toEqual(false)
        if (await ByjusClassesPage.btnCompletedTab.isClickable()) {
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3000 })
            await ByjusClassesPage.btnCompletedTab.click()
            await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
            expect(ByjusClassesPage.labelPrequisite.isDisplayed()).toEqual(false)
            expect(await ByjusClassesPage.revisionMaterialSubTitleUnderCompletedTab.isDisplayed()).toEqual(false)
        }
    });

    it('318857 TC_07 Verify the pre native assessment (View Result flow)', async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(2000)
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        if (seeMoreLinkDisplayed == true) {
            await seeMoreLink.scrollIntoView(true)
            await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 10000 })
            await ByjusClassesPage.btnSeeMore(1).click()
            await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
            let subjectName = await ByjusClassesPage.subjectNameUnderSessionDetails.getText()
            const disabledResultButton = await ByjusClassesPage.disabledResultBtn.isDisplayed()
            const startButtonCTAEnabled = await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.isEnabled()
            const disabledStartTestButton = await ByjusClassesPage.disabledStartTestBtn.isDisplayed()
            const resultButton = await ByjusClassesPage.resultBtnUnderAssessment.isDisplayed()
            const resumeButton=await ByjusClassesPage.resumeBtnUnderAssessment.isDisplayed()
            if ((startButtonCTAEnabled == true || resumeButton==true) && disabledStartTestButton == false) {
                allure.startStep("Click on Start test CTA button", true)
                await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.waitForDisplayed({ timeout: 3000 })
                await browser.pause(2000)
                await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.scrollIntoView({ block: "center" })
                await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.click()
                await browser.pause(3000)
                await ByjusClassesPage.instructionTitle.waitForDisplayed({ timeout: 3000 })
                expect(await ByjusClassesPage.instructionTitle.isDisplayed()).toEqual(true)
                allure.startStep("Validate Close icon  in instruction Popup", true)
                await ByjusClassesPage.closeIconInInstructionPopUpPage.waitForDisplayed({ timeout: 3000 })
                expect(await ByjusClassesPage.closeIconInInstructionPopUpPage.isDisplayed()).toEqual(true)
                allure.startStep("Validate start test CTA Button in instruction Popup", true)
                await ByjusClassesPage.secondStartCTAButton.waitForDisplayed({ timeout: 3000 })
                expect(await ByjusClassesPage.secondStartCTAButton.isDisplayed()).toEqual(true)
                await ByjusClassesPage.closeIconInInstructionPopUpPage.click()
                await ByjusClassesPage.resultBtnUnderAssessment.waitForDisplayed({ timeout: 10000 }) 
                await ByjusClassesPage.resultBtnUnderAssessment.click()
                await ByjusClassesPage.subjectnameInViewResult.waitForDisplayed({ timeout: 10000 })
                expect(await ByjusClassesPage.subjectnameInViewResult.getText()).toEqual(subjectName)
                expect(await ByjusClassesPage.labelTotalScore.isDisplayed()).toEqual(true)
                let questionCount = await $('//*[@class="summary-body  row"]//div/div/div').getText()
                let questionCount1 = (parseInt(questionCount.slice(0, 20).trim()))
                for (let i = 1; i <= questionCount1; i++) {
                    expect(await ByjusClassesPage.questionNumberInResult(i).isDisplayed()).toEqual(true)
                }
            }
            else if (resultButton==true && disabledResultButton==false) {
                await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.click()
                await ByjusClassesPage.subjectnameInViewResult.waitForDisplayed({ timeout: 10000 })
                expect(await ByjusClassesPage.subjectnameInViewResult.getText()).toEqual(subjectName)
                expect(await ByjusClassesPage.labelTotalScore.isDisplayed()).toEqual(true)
                let questionCount = await $('//*[@class="summary-body  row"]//div/div/div').getText()
                let questionCount1 = (parseInt(questionCount.slice(0, 20).trim()))
                for (let i = 1; i <= questionCount1; i++) {
                    expect(await ByjusClassesPage.questionNumberInResult(i).isDisplayed()).toEqual(true)
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
    });

    it('318862 TC_08 Verify the Breadcrumb button', async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 5000 })
            const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
            const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
            if (seeMoreLinkDisplayed == true) {
                await seeMoreLink.scrollIntoView({block:"center"})
                await browser.pause(2000)
                await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 10000 })
                await ByjusClassesPage.btnSeeMore(1).click()
                await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
                expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
                await ByjusClassesPage.btnSessionDetailBreadCrumb.click()
                await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 15000 })
                expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
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
    });

    it('318860 TC_09 Verify the Alert message in the session detail page', async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
            const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
            if (seeMoreLinkDisplayed == true) {
                await seeMoreLink.scrollIntoView(true)
                await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({ timeout: 10000 })
                await ByjusClassesPage.btnSeeMore(1).click()
                allure.startStep("Verify the Alert message in the session detail page")
                await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
                await browser.pause(3000)
                if(await ByjusClassesPage.alertTextInSessionDetail.isDisplayed())
                {
                expect(await ByjusClassesPage.alertTextInSessionDetail.isDisplayed({ timeout: 5000 })).toEqual(true)
                expect(await ByjusClassesPage.alertTextInSessionDetail.getText()).toHaveTextContaining("join the class only 15 mins before the session start time")
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


    it("318833 TC_10 Verify that recently completed session should be shown first in order", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        allure.startStep("Validate that recently completed session should be shown first in order", true)
        for (let i = cardsCountInCompletedTab; i > 1; i--) {
            const dateAndtimeDataOnCard1 = await ByjusClassesPage.getTimeStampOnCard(i)
            const dateAndTimedetails1 = await dateAndtimeDataOnCard1.getText()
            await dateAndtimeDataOnCard1.scrollIntoView({ block: "center" })
            await browser.pause(3000)
            const dateAndTimedetailsArray1 = await dateAndTimedetails1.split(" ")
            let dateOfcard1 = dateAndTimedetailsArray1[1]
            let monthOfcard1 = dateAndTimedetailsArray1[2]
            let clockTimeFormatOfCard1 = dateAndTimedetailsArray1[4]
            let timeOfCard1 = dateAndTimedetailsArray1[3]
            const dateAndtimeDataOnCard2 = await ByjusClassesPage.getTimeStampOnCard(i - 1)
            const dateAndTimedetails2 = await dateAndtimeDataOnCard2.getText()
            await dateAndtimeDataOnCard2.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            const dateAndTimedetailsArray2 = await dateAndTimedetails2.split(" ")
            let dateOfcard2 = dateAndTimedetailsArray2[1]
            let monthOfcard2 = dateAndTimedetailsArray2[2]
            let clockTimeFormatOfCard2 = dateAndTimedetailsArray2[4]
            let timeOfCard2 = dateAndTimedetailsArray1[3]
            let flag = false
            if (monthOfcard2 == monthOfcard1) {
                if (dateOfcard2 == dateOfcard1) {
                    if (clockTimeFormatOfCard2 == clockTimeFormatOfCard1) {
                        if (timeOfCard2 >= timeOfCard1) {
                            flag = true
                        }

                    }
                    else if (dateOfcard2 > dateOfcard1) {
                        flag = true
                    }

                }

            }

            else if (monthOfcard2 != monthOfcard1) {
                if (dateOfcard2 < dateOfcard1) {
                    flag = true
                }
                expect(flag).toEqual(true)
            }

        }
        allure.endStep();
    })
    it("318826 TC_11 Verify the elements in the completed sessions tab", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("validate the elements in the completed sessions cards", true)
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        let testDataAvailable=false
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elements on Card Under Completed Tab", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const dateAndtimeDataOnCard = await ByjusClassesPage.getTimeStampOnCard(i)
            const subjectOnCard = await ByjusClassesPage.getSubjectTitle(i)
            const chapterOnCard = await ByjusClassesPage.getChapterTitle(i)
            const subjectIconOnCard = await ByjusClassesPage.getSubjectIcon(i)
            allure.startStep("validate the display of Revison material text under completed tab on card", true)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            if (revisionMaterialDisplayed == true) {
                testDataAvailable=true
                await revisionMaterial.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("validate the display of Subject Icon on session card", true)
                await subjectIconOnCard.waitForDisplayed()
                expect(await subjectIconOnCard.isDisplayed()).toEqual(true)
                allure.startStep("validate the display of Subject title on session card", true)
                await subjectOnCard.waitForDisplayed()
                expect(await subjectOnCard.isDisplayed()).toEqual(true)
                allure.startStep("validate the display of chapter title on session card", true)
                await chapterOnCard.waitForDisplayed()
                expect(await chapterOnCard.isDisplayed()).toEqual(true)
                await dateAndtimeDataOnCard.waitForDisplayed()
                const dateAndTimedetails = await dateAndtimeDataOnCard.getText()
                const dateAndTimedetailsArray = await dateAndTimedetails.split(" ")
                let actualdate = dateAndTimedetailsArray[1]
                let actualmonth = dateAndTimedetailsArray[2]
                let actualClockTime = dateAndTimedetailsArray[4]
                const validClockTimes = ["AM", "PM"]
                const validMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "dec"]
                const validDates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
                let validClockTimeFlag, validMonthFlag, validDateFlag = false
                allure.startStep("Compare the Actual displayed time and date details with expected formats", true)
                for (let j = 0; j < validClockTimes.length; j++) {
                    if (validClockTimes[j] == actualClockTime) {
                        validClockTimeFlag = true

                    }
                }
                for (let j = 0; j < validMonths.length; j++) {
                    if (validMonths[j] == actualmonth) {
                        validMonthFlag = true

                    }
                }
                for (let j = 0; j < validDates.length; j++) {
                    if (validDates[j] == actualdate) {
                        validDateFlag = true

                    }
                }
                expect(validDateFlag).toEqual(true)
                expect(validMonthFlag).toEqual(true)
                expect(validClockTimeFlag).toEqual(true)
            }
            if(testDataAvailable==false)
            {
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
        allure.endStep();
    })

    it("318848 TC_12 Validate Byju's classes Main Page", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail, "prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(3000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            allure.startStep("validate the display of Upcoming Tab button", true)
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
            allure.startStep("validate the display of Completed Tab button", true)
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })
    it("318842 TC_12 Verify the elemets present in post native assessment", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        let testDataAvailable=false
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elemets present in post native assessment", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                let validExpiryDetails = false
                testDataAvailable=true
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                allure.startStep("Validate expire details of Assessment under Revison material in Session details page", true)
                await ByjusClassesPage.btnSessionDetailBreadCrumb.waitForDisplayed({timeout:30000})
                await browser.pause(5000)
                const expireDateAndTimeDetails = await ByjusClassesPage.expiryTimeDetailsUnderReviseMaterialInSessionPage.getText()
                const expireDateAndTimeDetailsArray = await expireDateAndTimeDetails.split(" ")
                let expiryDate = expireDateAndTimeDetailsArray[2]
                let expiryMonth = expireDateAndTimeDetailsArray[3]
                let expiryTime = expireDateAndTimeDetailsArray[4]
                let expiryTimeFormat = expireDateAndTimeDetailsArray[5]
                let expTimeDetails = expiryTime + " " + expiryTimeFormat
                var today = new Date()
                var currentDate = today.getDate()
                var currentMonthNumber = today.getMonth() + 1
                var currentTime = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                let expiryMonthNumber = await ByjusClassesPage.GetMonthNumber(expiryMonth)
                if (expiryDate > currentDate && expiryMonthNumber >= currentMonthNumber) {
                    validExpiryDetails = true
                }
                else if (expiryDate == currentDate && expiryMonthNumber == currentMonthNumber) {
                    if (expTimeDetails > currentTime) {
                        validExpiryDetails = true
                    }

                }
                else if (expiryMonthNumber > currentMonthNumber) {
                    if (expiryDate<currentDate) {
                        validExpiryDetails = true
                    }

                }
                expect(validExpiryDetails).toEqual(true)
                allure.startStep("Validate Questions text for Assessment under Revison material in Session details page", true)
                await ByjusClassesPage.questionsTextUnderRevisonMaterial.waitForDisplayed({ timeout: 5000 })
                expect(await ByjusClassesPage.questionsTextUnderRevisonMaterial.isDisplayed()).toEqual(true)
                break;
            }
            
        }
        if(testDataAvailable==false) 
        {
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
            
    it("318835 TC_14 Verify the Pagination for all the completed classes if more completed classes is present", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        let testDataAvailable=false
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        allure.startStep("Validate each pagination should contain atleast 3 completed sessions", true)
        if (cardsCountInCompletedTab >= 3) {
            for (let i = 3; i < 4; i++) {
                const pagination = await ByjusClassesPage.getPagination(i)
                allure.startStep("Validate the Pagination in Completed tab", true)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
                await pagination.click()
                testDataAvailable=true
                await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
                await ByjusClassesPage.btnAllOnCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
            }
            const cardsCountinCurrentCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
            if (cardsCountinCurrentCompletedTab >= 3) {
                const pagination = await ByjusClassesPage.getPagination(4)
                allure.startStep("Validate the Pagination in Completed tab", true)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
            }

        }
        if(testDataAvailable==false) 
        {
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

    it("318825 TC_15 Validate all the Subjects Filters under 'Completed TAB' ", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:5000})
        await ByjusClassesPage.btnCompletedTab.click()
        try{await ByjusClassesPage.btnCompletedTabFilter(1).waitForDisplayed({timeout:4500})}catch{}
        await browser.pause(5000)
        let filterCount = await ByjusClassesPage.countCompletedTabFilters.length
        for (let i=2;i<filterCount;i++){
            await ByjusClassesPage.btnCompletedTabFilter(i).click()
            await browser.pause(3000)
            let filterName = await ByjusClassesPage.btnCompletedTabFilter(i).getText()
            filterName = filterName.replace(" ","")
            if (filterName != "All"){
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await browser.pause(5500)
                let cardCount = await ByjusClassesPage.cardsCountCompletedTab.length
                for(let j=1;j<cardCount;j++){
                    expect(await ByjusClassesPage.cardsCompletedTabSubjectName(j,filterName).getText()).toEqual(filterName)
                }
            }
        }
        
        if(filterCount<1)
            {
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

    it("318829 TC_16 Verify that clicking on 'See more',should open in the new screen, where all the tagged resource types are shown.", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        await browser.pause(5000)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        let testDataAvailable=false
        allure.startStep("Validate the requistes shown in session details page by clicking see more text", true)
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const subjectName = await ByjusClassesPage.getSubjectNameUnderCompletedTab(i)
            const topicName = await ByjusClassesPage.getTopicNameUnderCompletedTab(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreTextOnCard = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                testDataAvailable=true
                await subjectName.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await subjectName.waitForDisplayed({ timeout: 5000 })
                const subjectNameInCompletedTab = await subjectName.getText()
                const topicNameInCompletedTab = await topicName.getText()
                allure.startStep("Click on See more link on card in Completed Tab", true)
                await seeMoreTextOnCard.waitForDisplayed({ timeout: 5000 })
                await seeMoreTextOnCard.click()
                allure.startStep("Validate Session details header in sessions Page", true)
                await ByjusClassesPage.sessionDetailsHeader.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
                expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
                allure.startStep("Validate subject details in sessions Page and completed tab should be same", true)
                expect(await ByjusClassesPage.revisionMaterialSubTitleUnderCompletedTab.isDisplayed()).toEqual(true)
                expect(await subjectNameInCompletedTab).toEqual(await ByjusClassesPage.subjectNameUnderSessionDetails.getText())
                allure.startStep("Validate Topic name details in sessions Page and completed tab should be same", true)
                expect(await topicNameInCompletedTab).toEqual(await ByjusClassesPage.topicNameUnderSessionDetails.getText())
                allure.startStep("Validate that sections under revision material should be displayed ", true)
                expect(await ByjusClassesPage.requistesUnderRevisionMaterial.length).toBeGreaterThan(0)
                await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                expect(await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.isDisplayed()).toEqual(true)
                allure.startStep("Validate that sections under prepare for session should be displayed", true)
                expect(await ByjusClassesPage.requistesUnderPrepareForSession.length).toBeGreaterThan(0)
                break;
            }
            
        }
        if(testDataAvailable==false)
            {
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
    it("318830 TC_17 Verify the breadcrumb for session details and byjusclases", async () => {
        await ProfilePage.changeCohortDetail(cohortDetail,"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3500})
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({timeout:3500})
        await browser.pause(5000)
        const dropDowndisplayed=await ByjusClassesPage.dropdownOnCompletedTab(1).isDisplayed()
        if(dropDowndisplayed==true)
        {
        try{await ByjusClassesPage.dropdownOnCompletedTab(1).waitForDisplayed({timeout:4500})}catch{}
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnSessionDetailBreadCrumb.waitForDisplayed({timeout:4500})
        await ByjusClassesPage.btnSessionDetailBreadCrumb.click()
        try{await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:15000})}catch{}
        expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        }
        else
            {
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

    it("318850 TC_09 Verify Recommended classes session", async () => {

        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[5], "free")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await browser.pause(5000)
        const upComingTabDisplayed = await ByjusClassesPage.btnUpComingTab.isDisplayed()
        if (upComingTabDisplayed == true) {
            await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
        }
        else {
            await ByjusClassesPage.btnForYouTab.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.btnForYouTab.isDisplayed()).toEqual(true)
            await ByjusClassesPage.recommendedClassesSubTitle.waitForDisplayed({ timeout: 3500 })
            expect(await ByjusClassesPage.recommendedClassesSubTitle.isDisplayed()).toEqual(true)
            const bookButtonOnCard = await ByjusClassesPage.getBookClassButton(1)
            const bookButtonOnCardDisplayed = await bookButtonOnCard.isDisplayed()
            if (bookButtonOnCardDisplayed == true) {
                expect(await bookButtonOnCard.isEnabled()).toEqual(true)
                await bookButtonOnCard.click()
                await browser.pause(5000)
                const joinNowButtonDisplayed = await ByjusClassesPage.btnJoinNowInBookedClassPage.isDisplayed()
                if(joinNowButtonDisplayed)
                {
                 await ByjusClassesPage.successfulClassBookedText.waitForDisplayed({ timeout: 10000 })
                expect(await ByjusClassesPage.successfulClassBookedText.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.successfulJoinClassText.isDisplayed()).toEqual(true)
                expect(await ByjusClassesPage.successfulJoinClassText).toHaveTextContaining('You’ve succesfully booked a class and you are ready to join your class.')
                }
                else{

                    await ByjusClassesPage.successfulClassBookedTextWithoutJoinbtn.waitForDisplayed({ timeout: 10000 })
                    expect(await ByjusClassesPage.successfulClassBookedTextWithoutJoinbtn.isDisplayed()).toEqual(true)
                    expect(await ByjusClassesPage.timerInBookedClass.isDisplayed()).toEqual(true)
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
        }
        allure.endStep();
    })
})
