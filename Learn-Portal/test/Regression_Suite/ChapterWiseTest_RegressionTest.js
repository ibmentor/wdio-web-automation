import { AllureUtil as allure } from "../../utils/util.allure"
import { chapterWiseTestsData } from "../../Data/ChapterWiseTestsData";
import LoginPage from "../../Pages/LoginPage";
import ProfilePage from "../../Pages/ProfilePage";
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage"
import { loginData } from "../../Data/LoginData"
import BookMarksPage from "../../Pages/BookMarksPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import TouchPointPage from "../../Pages/TouchPointPage";
import { touchPointData } from "../../Data/TouchPointData";
const touchPointCohortDetail = touchPointData.touchPointApplicableCohort[0]

describe("Learn Portal -Chapeter Wise Test cases for free user", async () => {

    it("315667 TC_01- Free User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort- Bread crumb  navigation", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject", true)
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Validate All subjects of explore more section", true)
        let noOfSubject = await $$("//div[@class='img-text-container']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let testName = await ChapterWiseTestsPage.sidebarOtherSubjects(i).getText()
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).click()
            let subjectBreadcrumb = await ChapterWiseTestsPage.subjectNameBreadCrumb.getText()
            allure.startStep("Validate subject name and bread crumb", true)
            expect(subjectBreadcrumb).toEqual(testName)
        }
        allure.endStep();
    })

    it("315670 TC_02 Free User-Verify analysis button and redirection to analysis page through analysis button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await browser.pause(5000)
        let analysisButton = await ChapterWiseTestsPage.btnAnalysis.isDisplayed()
        allure.startStep("Click on First test analysis button", true)
        if (analysisButton == false) {
            allure.startStep("Click on First subject card", true)
            await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnSubjectCard.click()
            allure.startStep("Click on First first drop down of test", true)
            await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.ddTestOne.click()
            if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
                await ChapterWiseTestsPage.retakeTest(1).click()
            } else {
                await ChapterWiseTestsPage.btnTakeATest.click()
            }
            await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnStartTest.click()
            await ChapterWiseTestsPage.questionsHandling()
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        } else { }
        await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnAnalysis.click()
        allure.startStep("Verify analysis page through bread crumb ", true)
        await expect(await ChapterWiseTestsPage.labelBreadCrumbAnalysis.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelObjectiveTests.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelAnalysisSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();


    })

    it("315671 TC_03 Free User-Verify if analysis button is displayed then redirection to take a test page through retake test button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject card", true)
        await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnSubjectCard.click()
        allure.startStep("Click on First first drop down of test", true)
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        allure.startStep("Click on analysis button", true)
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed({ timeout: 2500 })) {
            await ChapterWiseTestsPage.retakeTest(1).click()
        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        await expect(await ChapterWiseTestsPage.startTestPopUpInstructions.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Click on start a test button", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.questionsHandling()
        allure.endStep();

    })
    it("315672 TC_04 Free User-verify total number of question should be equal to total number of question in summary page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject card", true)
        await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnSubjectCard.click()
        allure.startStep("Click on First first drop down of test", true)
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        if (await ChapterWiseTestsPage.btnTakeATest.isDisplayed()) {
            await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.btnTakeATest.click()
        }
        else {
            await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 25000 })
            await ChapterWiseTestsPage.retakeTest(1).click()
        }
        let input = await $("//span[text()='Number of Questions :']/parent::p").getText()
        let questions = (parseInt(input.slice(22).trim()))
        await ChapterWiseTestsPage.btnStartTest.waitForDisplayed({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.btnExitTest.click()
        await ChapterWiseTestsPage.btnEndTestInExitAssessmentPopup.click()
        await browser.pause(10000)
        let numberOfQues = await $$("//*[@class='test_heading__1TVPT' and contains(text(),'QUESTION')]").length
        expect(questions).toEqual(numberOfQues);
        allure.endStep();

    })
    it('315673 TC_05 Free User-Verify total number of tests in objective and Subjective Tests', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on first subject card", true)
        await ChapterWiseTestsPage.subjectCard.waitForDisplayed({ timeout: 3000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Click on test drop down", true)
        await ChapterWiseTestsPage.selectTestDropDown(1).waitForDisplayed({ timeout: 15000 })
        await ChapterWiseTestsPage.selectTestDropDown(1).click()
        let input = await $("(//p[@class='total-tests'])[1]").getText()
        let totalTest = (parseInt(input.slice(0, 2).trim()))
        let countOfTest = await ChapterWiseTestsPage.objectiveTestCount.length
        allure.startStep("Click on subjective test tab", true)
        await ChapterWiseTestsPage.subjectiveTest(1).waitForDisplayed({ timeout: 3000 })
        await ChapterWiseTestsPage.subjectiveTest(1).click()
        let countOfTestInSubjective = await $$('//div[contains(text(),"Integers Subjective Test")]').length
        allure.startStep("Verify total test count with objective and subjective test count", true)
        expect(await countOfTestInSubjective + countOfTest).toEqual(totalTest)
    });

    it('315675 TC_06 Free User-Verify Bookmark question option', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on Retake", true)
        await ChapterWiseTestsPage.retakeTest(1).waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.retakeTest(1).moveTo()
        await ChapterWiseTestsPage.retakeTest(1).click()
        allure.startStep("Click on start a test", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 5000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        allure.startStep("click on bookmark question", true)
        for (let i = 0; i <= 5; i++) {
            try {
                await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({ timeout: 3000 })
                await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 3000 })
            } catch { }
            if (await ChapterWiseTestsPage.btnBookmark.isDisplayed()) {
                allure.startStep("Click on bookmark", true)
                await ChapterWiseTestsPage.btnBookmark.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ChapterWiseTestsPage.btnBookmark.click()
                await browser.pause(2000)
                allure.startStep("Verify bookmark", true)
                expect(await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 5000 })).toEqual(true)

            }
            else if (await ChapterWiseTestsPage.btnBookmarked.isDisplayed()) {
                allure.startStep("Click on bookmark", true)
                await ChapterWiseTestsPage.btnBookmarked.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ChapterWiseTestsPage.btnBookmarked.click()
                await ChapterWiseTestsPage.btnBookmark.waitForDisplayed({ timeout: 5000 })
                await ChapterWiseTestsPage.btnBookmark.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ChapterWiseTestsPage.btnBookmark.click()
                allure.startStep("Verify bookmark", true)
                expect(await ChapterWiseTestsPage.btnBookmarked.waitForDisplayed({ timeout: 5000 })).toEqual(true)
                allure.startStep("Click on next button", true)
                await ChapterWiseTestsPage.btnNext.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ChapterWiseTestsPage.btnNext.click()
                await browser.pause(2000)
            }
        }
    });

    it('315677 TC_07 Free User -Verify Subjective Test retake error', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on subjective retake test button", true)
        if (await ChapterWiseTestsPage.subjectiveRetakeTest(1).isDisplayed()) {
            await ChapterWiseTestsPage.subjectiveRetakeTest(1).waitForDisplayed({ timeout: 15000 })
            let countOfRetake = await $$("(//p[contains(text(),'Subjective Test')]/ancestor::div/div/button[text()='Retake Test'])").length
            for (let i = 1; i <= countOfRetake; i++) {
                allure.startStep("Click on subjective retake test button", true)
                await ChapterWiseTestsPage.subjectiveRetakeTest(i).click()
                allure.startStep("Verify retake error msg should display")
                expect(await ChapterWiseTestsPage.retakeErrorText.waitForDisplayed({ timeout: 5000 })).toEqual(true)
            }
        }
    });

    it('315678 TC_08 Free User-Verify subjective analysis page', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'free')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("click on analysis", true)
        if (await ChapterWiseTestsPage.btnSubjectiveAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.btnSubjectiveAnalysis.waitForDisplayed({ timeout: 5000 })
            await ChapterWiseTestsPage.btnSubjectiveAnalysis.click()
            await browser.pause(2000)
            let analysisPage = await $("//p[@class='performance-txt py-3 m-0']").isDisplayed()
            if (analysisPage)
                await expect(await ChapterWiseTestsPage.labelAnalysisSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
            else {
                allure.startStep("Verify msg should display - Analysis is not generated yet")
                await expect(await ChapterWiseTestsPage.labelAnalysisIsNotGenerated.waitForDisplayed({ timeout: 5000 })).toEqual(true);
            }
        }
    });

    it('330160 TC_09 Validate Filter in Bookmark Tab Recent Old',async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to concept video menu", true) 
        let subject="Mathematics"       
        await ConceptVideoPage.navigateToConceptVideo()
        await BookMarksPage.bookmarkQuestionFlow(subject) 
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.tabBookMark.waitForDisplayed({timeout:5000})
        await ChapterWiseTestsPage.tabBookMark.click()
        await ChapterWiseTestsPage.btnViewAll.waitForDisplayed({timeout:3000})
        await ChapterWiseTestsPage.btnViewAll.click()
        await ChapterWiseTestsPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await ChapterWiseTestsPage.btnFilterDropDown(1).click()
        await browser.keys("Recent")
        await browser.keys("Tab")
        console.log(await ChapterWiseTestsPage.selectedFilter.getText(),"######");
        await ChapterWiseTestsPage.selectedFilter.waitForDisplayed({timeout:5000})
        expect(await ChapterWiseTestsPage.selectedFilter.getText()).toEqual("Recent")
        let recentFirstChapterName=await ChapterWiseTestsPage.ChapterNameOnFirstCard.getText()
        await ChapterWiseTestsPage.btnFilterDropDown(1).waitForDisplayed({timeout:5000})
        await ChapterWiseTestsPage.btnFilterDropDown(1).click()
        await browser.keys("Old")
        await browser.keys("Tab")
        await browser.pause(2000)
        await ChapterWiseTestsPage.selectedFilter.waitForDisplayed({timeout:5000})
        expect(await ChapterWiseTestsPage.selectedFilter.getText()).toEqual("Old")
        let oldFirstChapterName=await ChapterWiseTestsPage.ChapterNameOnFirstCard.getText()
        expect(await oldFirstChapterName == recentFirstChapterName).toEqual(false)      
        console.log(oldFirstChapterName,"*******",recentFirstChapterName);
    });

    it('330161  TC_10 Validate Filter in bookmark for Subject',async () => {
        allure.startStep("Change cohort Details",true)
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'free')
        allure.startStep("Navigate to concept video menu", true) 
        let subject="Mathematics"       
        await ConceptVideoPage.navigateToConceptVideo()
        await BookMarksPage.bookmarkQuestionFlow(subject) 
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        await ChapterWiseTestsPage.tabBookMark.waitForDisplayed({timeout:5000})
        await ChapterWiseTestsPage.tabBookMark.click()
        await ChapterWiseTestsPage.btnViewAll.waitForDisplayed({timeout:3000})
        await ChapterWiseTestsPage.btnViewAll.click()
        await ChapterWiseTestsPage.btnFilterDropDown(2).waitForDisplayed({timeout:5000})
        await ChapterWiseTestsPage.btnFilterDropDown(2).click()
        await browser.keys(subject)
        await browser.keys("Tab")
        await browser.pause(2000)
        let cardCount= (await $$('(//div[@class="subj-info"]//div[@class="d-flex"]/p[1])')).length 
        for(let i=1;i<=cardCount;i++){
            expect(await ChapterWiseTestsPage.subjectNameOnCard(i).getText()).toEqual(subject)
        }

    });


    it("331728 TC_11- Neo Paid User - Verify in CWT module once completed all the test or assessments ,in analysis page user can see 'have a doubt' CTA under summary", async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if (await TouchPointPage.btnConnectToTutor.isDisplayed() == true) {
            allure.startStep("Navigate to CWT Module", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            allure.startStep("Click on First subject", true)
            await browser.pause(4000)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isClickable()
            if (retakeTest) {
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
    it("331729 TC_12- Neo Paid User - Verify the text for touch point for doc in cwt module.'Have a doubt in any question?'Connect to a tutor", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if (await TouchPointPage.btnConnectToTutor.isDisplayed() == true) {
            allure.startStep("Navigate to CWT Module", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            allure.startStep("Click on First subject", true)
            await browser.pause(3000)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isClickable()
            if (retakeTest) {
                await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnAnalysis.click()
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                expect(await TouchPointPage.questionText.waitForDisplayed({ timeout: 15000 })).toEqual(true)

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
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                expect(await TouchPointPage.questionText.isDisplayed()).toEqual(true)
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
    it("331736 TC_13- Neo Paid User - Verify all the popups should open on CWT analysis page itself and background should be greyedout", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if (await TouchPointPage.btnConnectToTutor.isDisplayed() == true) {
            allure.startStep("Navigate to CWT Module", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            await browser.pause(3000)
            allure.startStep("Click on First subject", true)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isClickable()
            if (retakeTest) {
                await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnAnalysis.click()
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                expect(await TouchPointPage.touchPointsQuestionPopup.waitForDisplayed({ timeout: 15000 })).toEqual(true)

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
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                expect(await TouchPointPage.touchPointsQuestionPopup.isDisplayed()).toEqual(true)
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
    it("331737 TC_14- Neo Paid User - Verify under summury page 'Have a doubt' cta if we click it should show all the list of questions", async () => {
        allure.startStep("Login to Learn Portal", true)
        await ProfilePage.changeCohortDetail(touchPointCohortDetail, 'neo')
        await TouchPointPage.preConnectwithTutorValidation()
        await browser.pause(5000)
        if (await TouchPointPage.btnConnectToTutor.isDisplayed() == true) {
            allure.startStep("Change cohort Details", true)
            await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
            await browser.pause(3000)
            allure.startStep("Click on First subject", true)
            let retakeTest = await ChapterWiseTestsPage.btnAnalysis.isClickable()
            if (retakeTest) {
                await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnAnalysis.click()
                let numberOfQuesSummaryPage = $$("(//div[@class='test_fibOption__1C536'])").length
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                let numberOfQuesTuchPointPopUp = $$("//div[@class='p-2']").length
                expect(numberOfQuesSummaryPage).toEqual(numberOfQuesTuchPointPopUp)

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
                await ChapterWiseTestsPage.btnTakeATest.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnTakeATest.click()
                await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 35000 })
                await ChapterWiseTestsPage.btnStartTest.click()
                await ChapterWiseTestsPage.questionsHandling()
                let numberOfQuesSummaryPage = $$("(//div[@class='test_fibOption__1C536'])").length
                await TouchPointPage.btnConnectToAtutor.waitForClickable({ timeout: 35000 })
                await TouchPointPage.btnConnectToAtutor.click()
                let numberOfQuesTuchPointPopUp = $$("//div[@class='p-2']").length
                expect(numberOfQuesSummaryPage).toEqual(numberOfQuesTuchPointPopUp)
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
})
