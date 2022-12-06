import { AllureUtil as allure } from "../../../utils/util.allure"
import { chapterWiseTestsData } from "../../../Data/ChapterWiseTestsData";
import LoginPage from "../../../Pages/LoginPage";
import ProfilePage from "../../../Pages/ProfilePage";
import ChapterWiseTestsPage from "../../../Pages/ChapterWiseTestsPage"


describe("Learn Portal -Chapeter Wise Test cases for Paid user", async () => {

    it("306525 TC_01- Paid User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort", async () => {
        allure.startStep("Login to Learn Portal", true)
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1])
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject", true)
        await ChapterWiseTestsPage.subjectCard.waitForClickable({ timeout: 35000 })
        await ChapterWiseTestsPage.subjectCard.click()
        allure.startStep("Validate all the sujects in side bar of Explore other subjects", true)
        let noOfSubject = await $$("//div[@class='img-text-container']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).waitForClickable({ timeout: 35000 })
            await ChapterWiseTestsPage.sidebarOtherSubjects(i).click()
            allure.startStep("Validate CWT should display in bread crumb", true)
            expect(await ChapterWiseTestsPage.breadCrumbCWT.isDisplayed()).toEqual(true)

        }
        allure.endStep();
    })


    it("306526 TC_02- Paid User-Navigate to CWT module from dashboard and check the user is able to land up in CWT module by selecting all the subject names available for that cohort- Bread crumb  navigation", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'paid')
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
    it("306527 TC_03 Paid User-Verify analysis button and redirection to analysis page through analysis button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First test analysis button", true)
        await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnAnalysis.click()
        allure.startStep("Verify analysis page through bread crumb ", true)
        await expect(await ChapterWiseTestsPage.labelBreadCrumbAnalysis.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelObjectiveTests.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        await expect(await ChapterWiseTestsPage.labelAnalysisSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();


    })
    it("306528 TC_04 Paid User-Verify if analysis button is displayed then redirection to take a test page through retake test button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject card", true)
        await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnSubjectCard.click()
        allure.startStep("Click on First first drop down of test", true)
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        allure.startStep("Click on analysis button", true)
        if (await ChapterWiseTestsPage.btnAnalysis.isDisplayed()) {
            await ChapterWiseTestsPage.btnRetakeTest.click()
        } else {
            await ChapterWiseTestsPage.btnTakeATest.click()

        }
        await expect(await ChapterWiseTestsPage.startTestPopUpInstructions.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.startStep("Click on start a test button", true)
        await ChapterWiseTestsPage.btnStartTest.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnStartTest.click()
        await ChapterWiseTestsPage.questionsHandling()
        await expect(await ChapterWiseTestsPage.labelPerformanceSummary.waitForDisplayed({ timeout: 5000 })).toEqual(true);
        allure.endStep();

    })
    it("306529 TC_05 Paid User-Verify total number of question should be equal to total number of question in summary page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(chapterWiseTestsData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to CWT Module", true)
        await ChapterWiseTestsPage.navigateToCWTAndPageLoad()
        allure.startStep("Click on First subject card", true)
        await ChapterWiseTestsPage.btnSubjectCard.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnSubjectCard.click()
        allure.startStep("Click on First first drop down of test", true)
        await ChapterWiseTestsPage.ddTestOne.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.ddTestOne.click()
        let input = await $("(//*[@class='mb-1 font-12 pt-2 pb-2'])[1]").getText()
        let questions = (parseInt(input.slice(12, 17).trim()))
        allure.startStep("Click on button analysis", true)
        await ChapterWiseTestsPage.btnAnalysis.waitForClickable({ timeout: 25000 })
        await ChapterWiseTestsPage.btnAnalysis.click()
        await browser.pause(4000)//waiting fot page to load
        let numberOfQues = await $$("//*[@class='test_heading__1TVPT' and contains(text(),'QUESTION')]").length
        expect(questions).toEqual(numberOfQues);
        allure.endStep();




    })
})