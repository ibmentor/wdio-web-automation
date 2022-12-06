import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import { allSubjectsData } from "../../Data/AllSubjectsData"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage";
import AskADoubtPage from "../../Pages/AskADoubtPage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage"
import { get33PercentageOfYoutubeVideo } from "../../utils/function"
import { loginData } from "../../Data/LoginData"


describe("Learn Portal - All Subjects test  cases for Free user", async () => {

    it("315942 TC_01 Verify if all the subjects are listed in All subjects main page can be iterated through the breadcrumb", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        // const subjectList = allSubjectsData.freeUserData.subjectDetailsCohort7
        // expect(noOfSubject.length).toEqual(subjectList.length)
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.freeUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate subject details are displayed", true)
            await subjectCard.click()
            allure.startStep("Wait untill element clickable", true)
            await AllSubjectsPage.btnBreadCrumbOfAllSubjects.waitForClickable({ timeout: 15000 })
            allure.startStep("Click on the all subject link in the navigation bar", true)
            await AllSubjectsPage.btnBreadCrumbOfAllSubjects.click()
            allure.startStep("Application should load main page of all subjects", true)
            await AllSubjectsPage.pageTitle.waitForDisplayed({ timeout: 15000 })
            await expect(await AllSubjectsPage.pageTitle.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    })

    it("315943 TC_02 Verify if all the subjects are listed in All subjects main page can be iterated through right side subject menu option", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.freeUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate subject details are displayed", true)
            await subjectCard.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await subjectCard.click()
            await browser.pause(5000)
            let subjectTitle = await AllSubjectsPage.labelSubjectTitle.getText()
            allure.startStep("Validate all subject page is loaded for all the subjects", true)
            expect(subjectTitle).toEqual(subName)
            let noOfChapters = await AllSubjectsPage.labelSubTitle.length
            if (noOfChapters > 1) {
                expect(true)
            }
            else if (noOfChapters == 0) {

                let chapterIsDisplayed = await $("//*[contains(text(),'No Chapters Visited Yet')]").isDisplayed()
                expect(chapterIsDisplayed).toEqual(true)
            }
            else {
                expect(false)
            }
        }
        allure.endStep();
    })

    it("315945 TC_03 Total number of chapters available should be visible to the user in the top left section under the  subject name", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.freeUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate chapter details are displayed", true)
            await subjectCard.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await subjectCard.click()
            await browser.pause(5000)
            let chapterCount = await AllSubjectsPage.labelTotalChapters.getText()
            let totalNoOfChapter = parseInt(chapterCount.slice(0, 2).trim())
            let noOfChapters = await AllSubjectsPage.labelSubTitle.length
            if (noOfChapters == 0) {

                let chapterIsDisplayed = await $("//*[contains(text(),'No Chapters Visited Yet')]").isDisplayed()
                expect(chapterIsDisplayed).toEqual(true)
            }
            else {
                expect(totalNoOfChapter).toEqual(noOfChapters)
            }
        }
        allure.endStep();
    })
    it("315946 TC_04 Number of concept videos under each topic names should be visible", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("Validate number of concept videos is visible", true)
        await browser.pause(5000)
        const numberOfVideos = await $$("//div[@class='video-author']")
        for (let i = 1; i <= numberOfVideos.length; i++) {
            allure.startStep("Verify number of subject is displaying", true)
            expect(await AllSubjectsPage.numberOfVideos(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })


    it("315947 TC_05 Number of practice tests under each topic names should be visible", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("Validate number of each test is visible", true)
        await browser.pause(5000)
        let numberOfTest = await $$("//div[@class='video-author']")
        for (let i = 1; i <= numberOfTest.length; i++) {
            allure.startStep("Verify number of subject is displaying", true)
            expect(await AllSubjectsPage.numberOfTest(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })

    it("315948 TC_06 To verify if the title, topic name, decription are visible in each topics", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        allure.startStep("Validate video subtitle , title, and description are displayed as expected", true)
        await browser.pause(5000)
        let numberOfCards = await $$("//div[@class='video-card']")
        for (let i = 1; i <= numberOfCards.length; i++) {
            allure.startStep("Verify video sub-title is displayed", true)
            expect(await AllSubjectsPage.videoSubTitle(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
            allure.startStep("Verify video title is displayed", true)
            expect(await AllSubjectsPage.videoTitle(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
            allure.startStep("Verify video discription is displayed", true)
            expect(await AllSubjectsPage.videoDescription(i).waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })
    it("315949 TC_07 To verify for all the subjects", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const subjectCards = await $$("//div[@class='subject-name']")
        for (let i = 1; i <= subjectCards.length; i++) {
            const subjectName = await AllSubjectsPage.getSubject(i).getText()
            allure.startStep("Click on subject card", true)
            await AllSubjectsPage.getSubject(i).click()
            const subjectsTitle = await AllSubjectsPage.subjectTitleHeading.getText()
            allure.startStep("Verify subject name to realted topic heading", true)
            expect(subjectName).toEqual(subjectsTitle)
            await browser.back();

        }
        allure.endStep();
    })
    it("315950 TC_08 To verify if the Explore other Subjects is visible in the top right section of the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        expect(await AllSubjectsPage.exploreOtherSubjects.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        let textButtonBiolgy = await AllSubjectsPage.btnBiology.getText()
        allure.startStep("Click on button biology from explore other subjects section ", true)
        await AllSubjectsPage.btnBiology.click()
        let headingtextBiology = await AllSubjectsPage.headingBiology.getText()
        expect(await AllSubjectsPage.headingBiology.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        expect(textButtonBiolgy).toEqual(headingtextBiology)
        allure.endStep();
    })

    it("315951 TC_09 To verify if BYJU'S Class of the selected Subject appears in the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[3], 'free')
        allure.startStep("Navigate to Allsubjects", true)
        await AllSubjectsPage.navigateToAllSubjects()
        await browser.pause(3000)//waiting for page to load
        let arr = []
        let subjectsCount = await $$("//div[@class='subject-name']").length
        for (let i = 1; i <= subjectsCount; i++) {
            let subjectsName = await $(`(//div[@class='subject-name'])[${i}]`).getText()
            arr.push(subjectsName)
        }
        allure.startStep("Navigate to byjus classes", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await browser.pause(5000)
        if(await AllSubjectsPage.classSubName.isDisplayed()){
        let classSubName = await AllSubjectsPage.classSubName.getText()
        if (arr.includes(classSubName) == true) {
            allure.startStep("Navigate to Allsubjects", true)
            await AllSubjectsPage.navigateToAllSubjects()
            allure.startStep("Click on subject", true)
            await AllSubjectsPage.subNameInAllSub(classSubName).click()
            allure.startStep("Verify byjus classes should display", true)
            expect(await AllSubjectsPage.byjusClasses.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        }
        else {
            allure.startStep("Navigate to Allsubjects", true)
            await AllSubjectsPage.navigateToAllSubjects()
            let subjectsCount = await $$("//div[@class='subject-name']")
            for (let i = 1; i <= subjectsCount.length; i++) {
                await $(`(//div[@class='subject-name'])[${i}]`).click()
                allure.startStep("Verify byjus classes should not display", true)
                expect(await AllSubjectsPage.byjusClasses.isDisplayed({ timeout: 10000 })).toEqual(false)
                await browser.back()
            }
        }
    }else{
        allure.startStep("Validate No Test Available Block", true)
    const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
    expect("No Class  are available").toEqual("") 
    }
    })
    it("315952 TC_10 To verify if the Popular videos of the selected subject appears in the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let leftRightNvigationButtons = await AllSubjectsPage.btnRightNavigationPopularVideos.isDisplayed()
        if (leftRightNvigationButtons) {
            allure.startStep("Click on button right navigation", true)
            await AllSubjectsPage.btnRightNavigationPopularVideos.waitForClickable({ timeout: 15000 })
            await AllSubjectsPage.btnRightNavigationPopularVideos.click()
            allure.startStep("Click on button left navigation", true)
            await AllSubjectsPage.btnLeftNavigationPopularVideos.waitForClickable({ timeout: 15000 })
            await AllSubjectsPage.btnLeftNavigationPopularVideos.click()
        }
        else {
            allure.startStep("Validate title heading of popular vidoe ", true)
            expect(await AllSubjectsPage.titleHeadingPopularVideos.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();

    })
    it("315953 TC_11 To verify the View Concepts button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        expect(await AllSubjectsPage.btnViewTopics.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("315954 TC_12 To verify the total number of concepts covered and the total number of all concepts in the Concepts Completed section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let videoCount = await $("(//div[@class='video-author'])[1]")
        let videoNumber = await videoCount.getText()
        let input = parseInt(videoNumber.slice(0, 3).trim())
        allure.startStep("click on view concept video button", true)
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewTopics.click()
        await browser.pause(5000)
        let numberOfVideos = await $$("//div[@class='d-flex timeline-as row']")
        allure.startStep("Verify total number of vidoes with total number of chapter is visible", true)
        expect(input).toEqual(numberOfVideos.length)
        allure.endStep();

    })
    it("315957 TC_13 To verify if Take a test section is visible for user to take up the test", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnTakeTest.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnTakeTest.click()
        expect(await ChapterWiseTestsPage.pageTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();

    })
    it("315958 TC_14 To verify if the Practice questions section is visible for a user", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewTopics.click()
        await AllSubjectsPage.btnPractice.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnPractice.click()
        expect(await ChapterWiseTestsPage.pageTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();

    })
    it("315959 TC_15 To verify if the Ask a doubt section is visible for a user", async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewTopics.click()
        allure.startStep("Click on button Ask a doubt", true)
        await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnaskADoubtSideBar.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        let currentURL=await browser.getUrl()
        expect(await currentURL).toContain("ask-a-doubt") 
        allure.endStep();

    })
    it("315960 TC_16 To verify the concept videos section of the user", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Validate main video header", true)
        expect(await AllSubjectsPage.firstVideoHeadder.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Validate video which might intrest you", true)
        expect(await AllSubjectsPage.headingVideoWhichMightIntrest.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Validate Donload PDF button is displayed", true)
        expect(await AllSubjectsPage.btnDownloadPdf.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Validate Important question section", true)
        expect(await ConceptVideoPage.labelImportantQuestions.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.startStep("Validate related topics section", true)
        expect(await AllSubjectsPage.headingRelatedTopics.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();


    })

    it("315962 TC_17 verify if Chapter wise test section is visible to the user in concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click on button Chapter wise tests", true)
        await AllSubjectsPage.btnchapterWiseTests.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnchapterWiseTests.click()
        allure.startStep("Verify headding of chapter wise test page", true)
        expect(await ChapterWiseTestsPage.pageTitle.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();

    })
    it("315963 TC_18 verify if Adaptive practice questions section is visible to the user in the concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click on button Adaptive practice questions", true)
        await AllSubjectsPage.btnAPQ.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnAPQ.click()
        allure.startStep("Verify headding of Adaptive practice Question", true)
        expect(await AllSubjectsPage.titleHeadingAPQ.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();

    })
    it("315964 TC_19 verify if Ask a doubt section is visible to the user in the concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click on button Ask a doubt", true)
        await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnaskADoubtSideBar.click()
        allure.startStep("Type on search bar of Ask a doubt", true)
        await ConceptVideoPage.tfsearchField.setValue("solar")
        allure.startStep("Click on first suggestions", true)
        await ConceptVideoPage.firstSuggestionAskaDoubt.click()
        allure.startStep("Verify button of Ask a doubt section", true)
        expect(await AskADoubtPage.btnAskADoubt.isDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();

    })
    it("315965 TC_20 To verify if the Important Questions of the chapter names are visible in concept selected video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click right navigation button", true)
        await ConceptVideoPage.btnRightNavigationIMPQues.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnRightNavigationIMPQues.click()
        allure.startStep("Click left navigation button", true)
        await ConceptVideoPage.btnLeftNavigationIMPQues.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnLeftNavigationIMPQues.click()
        allure.startStep("Click on book mark button", true)
        await ConceptVideoPage.btnBookmarkIMPQues.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnBookmarkIMPQues.click()
        allure.startStep("Click on view solution button", true)
        await ConceptVideoPage.btnViewSolution.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnViewSolution.click()
        allure.startStep("Verify question after click on view solution button", true)
        expect(await ConceptVideoPage.viewSolutionQuestion.isDisplayed()).toEqual(true)
        allure.endStep();
    })

it("335404 TC_21 To verify if Validate the Click on Play Button in All Subjects Module for all Paid numbers", async () => {

    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7], 'premium')
    allure.startStep("Navigate to all subjects menu from dashboard", true)
    await AllSubjectsPage.navigateToAllSubjects()
    allure.startStep("Navigating to subject card", true)
    await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.firstSubjectCard.click()
    allure.startStep("Click on first subject card", true)
    await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.btnViewTopics.click()
    allure.startStep("Click on view topic", true)
    await AllSubjectsPage.btnStartLearning.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.btnStartLearning.click()
    allure.startStep("Click on start learning button", true)
    await AllSubjectsPage.btnBrowseVideoLessons.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.btnBrowseVideoLessons.click()
    allure.startStep("Click on browse video lesson subject")
    await AllSubjectsPage.btnclickconceptvideo.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.btnclickconceptvideo.click()
    allure.startStep("Click on concept video button")
    await AllSubjectsPage.btnplayvideo.waitForClickable({ timeout: 10000 })
    await AllSubjectsPage.btnplayvideo.click()
    allure.startStep("Click on play video")
    allure.endStep();
})


})
