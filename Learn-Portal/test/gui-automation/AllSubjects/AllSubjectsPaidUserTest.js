import { AllureUtil as allure } from "../../../utils/util.allure"
import LoginPage from "../../../Pages/LoginPage"
import ProfilePage from "../../../Pages/ProfilePage"
import { allSubjectsData } from "../../../Data/AllSubjectsData"
import AllSubjectsPage from "../../../Pages/AllSubjectsPage"
import ConceptVideoPage from "../../../Pages/ConceptVideoPage"
import ChapterWiseTestsPage from "../../../Pages/ChapterWiseTestsPage";
import AskADoubtPage from "../../../Pages/AskADoubtPage"
import { get33PercentageOfYoutubeVideo } from "../../../utils/function"

describe("Learn Portal - All Subjects test  cases for Paid user", async () => {


    it("306408 TC_01 All Subjects menu item should be clickable and should direct to the All Subjects main page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('paid')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Verify page title of all subject page", true)
        await AllSubjectsPage.pageTitle.waitForDisplayed({ timeout: 1500 })
        await expect(await AllSubjectsPage.pageTitle.isDisplayed()).toEqual(true)
        allure.endStep();

    })

    it("306409 TC_02 Verify if all the subjects are listed in All subjects main page can be iterated through the breadcrumb", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        const subjectList = allSubjectsData.paidUserData.subjectDetailsCohort7
        expect(noOfSubject.length).toEqual(subjectList.length)
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.paidUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate subject details are displayed", true)
            await subjectCard.click()
            allure.startStep("Wait untill element clickable", true)
            await AllSubjectsPage.btnBreadCrumbOfAllSubjects.waitForClickable({ timeout: 15000 })
            allure.startStep("Click on the all subject link in the navigation bar", true)
            await AllSubjectsPage.btnBreadCrumbOfAllSubjects.click()
            allure.startStep("Application should load main page of all subjects", true)
            await AllSubjectsPage.pageTitle.waitForDisplayed({ timeout: 1500 })
            await expect(await AllSubjectsPage.pageTitle.isDisplayed()).toEqual(true)
        }
        allure.endStep();
    })
    it("306410 TC_03 Verify if all the subjects are listed in All subjects main page can be iterated through right side subject menu option", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.paidUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate subject details are displayed", true)
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

                let chapterIsDisplayed = await $("//*[contains(text(),'No Chapters to show yet')]").isDisplayed()
                expect(chapterIsDisplayed).toEqual(true)
            }
            else {
                expect(false)
            }
        }
        allure.endStep();
    })
    it("306411 TC_04 To verify if all the chapters are available from each subjects", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        let sujectText = await AllSubjectsPage.firstSubjectCard.getText()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let breadcrumbText = await AllSubjectsPage.subjectBreadCrumb.getText()
        allure.startStep("Verify the bread crumb heading of subject", true)
        expect(sujectText).toEqual(breadcrumbText)
        allure.endStep();

    })
    it("306412 TC_05 Total number of chapters available should be visible to the user in the top left section under the  subject name", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        const noOfSubject = await $$("//*[@class='subject-name']")
        for (let i = 1; i <= noOfSubject.length; i++) {
            let subName = allSubjectsData.paidUserData.subjectDetailsCohort7[i - 1]
            let subjectCard = await $("//*[@class='subject-name' and contains(text(),'" + subName + "')]")
            allure.startStep("Validate chapter details are displayed", true)
            await subjectCard.click()
            await browser.pause(5000)
            let chapterCount = await AllSubjectsPage.labelTotalChapters.getText()
            let totalNoOfChapter = parseInt(chapterCount.slice(0, 2).trim())
            let noOfChapters = await AllSubjectsPage.labelSubTitle.length
            if (noOfChapters == 0) {

                let chapterIsDisplayed = await $("//*[contains(text(),'No Chapters to show yet')]").isDisplayed()
                expect(chapterIsDisplayed).toEqual(true)
            }
            else {
                expect(totalNoOfChapter).toEqual(noOfChapters)
            }
        }
        allure.endStep();
    })
    it("306413 TC_06 Number of concept videos under each topic names should be visible", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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


    it("306414 TC_07 Number of practice tests under each topic names should be visible", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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

    it("306415 TC_08 To verify if the title, topic name, decription are visible in each topics", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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
    it("306416 TC_09 To verify for all the subjects", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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
    it("306417 TC_10 To verify if the Explore other Subjects is visible in the top right section of the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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

    it("306418 TC_11 To verify if the Popular videos of the selected subject appears in the page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let leftRightNvigationButtons = await AllSubjectsPage.btnRightNavigationPopularVideos.isDisplayed()
        if(leftRightNvigationButtons){
        allure.startStep("Click on button right navigation", true)
        await AllSubjectsPage.btnRightNavigationPopularVideos.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnRightNavigationPopularVideos.click()
        allure.startStep("Click on button left navigation", true)
        await AllSubjectsPage.btnLeftNavigationPopularVideos.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnLeftNavigationPopularVideos.click()}
        else{
        allure.startStep("Validate title heading of popular vidoe ", true)
        expect(await AllSubjectsPage.titleHeadingPopularVideos.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        }
        allure.endStep();
    })
    it("306419 TC_12 To verify the View Concepts button", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        expect(await AllSubjectsPage.btnViewConcepts.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("306420 TC_13 To verify the total number of concepts covered and the total number of all concepts in the Concepts Completed section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let videoCount = await $("(//div[@class='video-author'])[1]")
        let videoNumber = await videoCount.getText()
        let input = parseInt(videoNumber.slice(0, 3).trim())
        allure.startStep("click on view concept video button", true)
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        await browser.pause(5000)
        let numberOfVideos = await $$("//div[@class='d-flex timeline-as row']")
        allure.startStep("Verify total number of vidoes with total number of chapter is visible", true)
        expect(input).toEqual(numberOfVideos.length)
        allure.endStep();

    })
    it("306421 TC_14 To verify for a new user in the selection of concepts in each subject", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        allure.startStep("Validate page title you haven't started yet", true)
        expect(await AllSubjectsPage.pageHeadingYouHaventStartedYet.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("306422 TC_15 To verify if the user is able to switch to different chapters", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let videoTitle = await AllSubjectsPage.firstVideoTitle.getText()
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        let chapterTitle = await AllSubjectsPage.chapterTitle.getText()
        expect(videoTitle).toEqual(chapterTitle)
        await AllSubjectsPage.btnNextChapter.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnNextChapter.click()
        await AllSubjectsPage.btnPreviousChapter.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnPreviousChapter.click()
        expect(await AllSubjectsPage.chapterTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("306423 TC_16 To verify if Take a test section is visible for user to take up the test", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        await AllSubjectsPage.btnTakeTest.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnTakeTest.click()
        expect(await ChapterWiseTestsPage.pageTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("306424 TC_17 To verify if the Practice questions section is visible for a user", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        await AllSubjectsPage.btnPractice.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnPractice.click()
        expect(await ChapterWiseTestsPage.pageTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })
    it("306425 TC_18 To verify if the Ask a doubt section is visible for a user", async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.btnViewConcepts.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewConcepts.click()
        allure.startStep("Click on button Ask a doubt", true)
        await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnaskADoubtSideBar.click()
       await $("//iframe[@id='docIframe']").waitForDisplayed({timeout : 4500})
       const frame= await $("//iframe[@id='docIframe']")
       await browser.switchToFrame(frame)
        await AskADoubtPage.instaLearnAskADoubtTitle.waitForDisplayed({timeout:20000})   
        expect(await AskADoubtPage.instaLearnAskADoubtTitle.isDisplayed()).toEqual(true);
        allure.endStep();
    })
    it("306426 TC_19 To verify the concept videos section of the user", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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

    it("306427 TC_20 To verify if the selected concept video notes is available in the concept video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Verify main video download app popup", true)
        expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on play button on intrested videos", true)
        await ConceptVideoPage.btnPlayIntrestedVideos.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayIntrestedVideos.click()
        allure.startStep("Verify download app popup from interested videos", true)
        expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on learn more button", true)
        await AllSubjectsPage.btnlearnMore.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnlearnMore.click()
        await browser.back();
        allure.startStep("Click on button view solution", true)
        await AllSubjectsPage.btnviewSolution.waitForClickable({ timeout: 30000 })
        await AllSubjectsPage.btnviewSolution.click()
        allure.startStep("Verify view solution popup header", true)
        expect(await AllSubjectsPage.viewSolutionPopUpHeader.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on button close", true)
        await AllSubjectsPage.btncloseViewSloution.waitForClickable({ timeout: 30000 })
        await AllSubjectsPage.btncloseViewSloution.click()
        allure.startStep("Click on play button More concept videos", true)
        await AllSubjectsPage.btnplayMoreConceptVideo.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnplayMoreConceptVideo.click()
        allure.startStep("Verify download app popup from More concept vidoes", true)
        expect(await AllSubjectsPage.titleConceptVideos.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        await browser.back();
        allure.startStep("Click on button play related topic video", true)
        await AllSubjectsPage.btnplayRelatedTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnplayRelatedTopics.click()
        await ConceptVideoPage.videoTime.waitForDisplayed({timeout:4000})
        await browser.pause(1500)
        let videoTime = await ConceptVideoPage.videoTime.getText()
        let tenSecondsButtomPressCount = get33PercentageOfYoutubeVideo(videoTime)
        for (let i = 0;i<tenSecondsButtomPressCount;i++){
            await ConceptVideoPage.btnVideoSkip10Sec.click()
        }
        allure.startStep("Verify download app popup header from related topic videos", true)
        expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 10000 })).toEqual(true)
        allure.endStep();
    })
    it("306428 TC_21 verify if Chapter wise test section is visible to the user in concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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
    it("306429 TC_22 verify if Adaptive practice questions section is visible to the user in the concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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
    it("306430 TC_23 verify if Ask a doubt section is visible to the user in the concepts video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click on button Ask a doubt", true)
        await AllSubjectsPage.btnaskADoubtSideBar.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnaskADoubtSideBar.click()
        await $("//iframe[@id='docIframe']").waitForDisplayed({timeout : 4500})
        const frame= await $("//iframe[@id='docIframe']")
        await browser.switchToFrame(frame)
        await AskADoubtPage.instaLearnAskADoubtTitle.waitForDisplayed({timeout:20000})   
        expect(await AskADoubtPage.instaLearnAskADoubtTitle.isDisplayed()).toEqual(true);
        allure.endStep();
    })
    it("306431 TC_24 To verify if the Important Questions of the chapter names are visible in concept selected video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[1], 'paid')
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
    it("TC_25 To verify if the Explore other Subjects is visible in the concepts video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        await AllSubjectsPage.btnBiology.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000) //wait for the page to be load
        let buttonText = await AllSubjectsPage.btnBiology.getText()
        allure.startStep("Click on biology button", true)
        await AllSubjectsPage.btnBiology.waitForClickable({ timeout: 45000 })
        await AllSubjectsPage.btnBiology.click()
        let breadcrumbtext = await AllSubjectsPage.subjectBreadCrumb.getText()
        allure.startStep("Verify concept videos should appear related to biology", true)
        expect(buttonText).toEqual(breadcrumbtext)
    
    })
    it("TC_26 To verify the more concepts in each of the subject names in the concept's video page", async () => {
    
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        let cardTitle = await AllSubjectsPage.moreConceptsVideoCardTitle.getText()
        allure.startStep("Click play button", true)
        await ConceptVideoPage.btnPlayMoreConcepts.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayMoreConcepts.click()
        let mainTitle = await ConceptVideoPage.moreConceptsVideoMainPageTitle.getText()
        allure.startStep("Validate video title of main page", true)
        expect(cardTitle).toEqual(mainTitle)
    
    })
    it("TC_27 To verify if the related lessons on the Mobile app section is visible in the concept's video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[4], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        expect(await AllSubjectsPage.labelRelatedTopics.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on button play related topic video", true)
        await AllSubjectsPage.btnplayRelatedTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnplayRelatedTopics.click()
        allure.startStep("Verify download app popup header from related topic videos", true)
        expect(await AllSubjectsPage.downloadAppPopUp.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.endStep();
      
    })
    it("TC_28 To verify if the related lessons on the Mobile app section is visible in the concept's video page", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.paidUserData.cohortDetails[4], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to Concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Click play button", true)
        await ConceptVideoPage.btnPlayMoreConcepts.waitForClickable({ timeout: 45000 })
        await ConceptVideoPage.btnPlayMoreConcepts.click()
        allure.startStep("Validates video screen gets displayed",true)
        await ConceptVideoPage.videoScreen.waitForClickable({timeout:15000})
        await ConceptVideoPage.videoScreen.moveTo()
        await browser.pause(3000)// waits till bottom pannel gets displayed
        let videoTime = await ConceptVideoPage.videoTime.getText()
        let tenSecondsButtomPressCount = get33PercentageOfYoutubeVideo(videoTime)
        for (let i = 0;i<=tenSecondsButtomPressCount;i++){
            await ConceptVideoPage.btnVideoSkip10Sec.click()
        }
        await ConceptVideoPage.videoDownloadPopUp.waitForDisplayed({timeout:4000})
        let flag = await ConceptVideoPage.videoDownloadPopUp.isDisplayed()
        expect(flag).toEqual(true)
        allure.endStep();

})
})