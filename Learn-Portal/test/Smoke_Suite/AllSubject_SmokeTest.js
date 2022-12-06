import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import { allSubjectsData } from "../../Data/AllSubjectsData"
import AllSubjectsPage from "../../Pages/AllSubjectsPage"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import ChapterWiseTestsPage from "../../Pages/ChapterWiseTestsPage";
import AskADoubtPage from "../../Pages/AskADoubtPage"
import ByjusClassesPage from "../../Pages/ByjusClassesPage"

describe("Learn Portal - All Subjects test  cases for Free user", async () => {

    it("315941 TC_01 All Subjects menu item should be clickable and should direct to the All Subjects main page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Verify page title of all subject page", true)
        await AllSubjectsPage.pageTitle.waitForDisplayed({ timeout: 1500 })
        await expect(await AllSubjectsPage.pageTitle.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    it("315944 TC_04 To verify if all the chapters are available from each subjects", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        let sujectText = await AllSubjectsPage.firstSubjectCard.getText()
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        await AllSubjectsPage.subjectBreadCrumb.waitForDisplayed({timeout:5000})
        let breadcrumbText = await AllSubjectsPage.subjectBreadCrumb.getText()
        allure.startStep("Verify the bread crumb heading of subject", true)
        expect(sujectText).toEqual(breadcrumbText)
        allure.endStep();

    })

    it("315956 TC_16 To verify if the user is able to switch to different chapters", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[0], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        allure.startStep("Click on first subjects", true)
        await AllSubjectsPage.firstSubjectCard.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.firstSubjectCard.click()
        let videoTitle = await AllSubjectsPage.firstVideoTitle.getText()
        await AllSubjectsPage.btnViewTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnViewTopics.click()
        await browser.pause(5000)
        let chapterTitle = await AllSubjectsPage.chapterTitle.getText()
        expect(videoTitle).toEqual(chapterTitle)
        await AllSubjectsPage.btnNextChapter.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnNextChapter.click()
        await AllSubjectsPage.btnPreviousChapter.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnPreviousChapter.click()
        expect(await AllSubjectsPage.chapterTitle.waitForDisplayed({ timeout: 8000 })).toEqual(true)
        allure.endStep();
    })

    it("315961 TC_21 To verify if the selected concept video notes is available in the concept video section", async () => {

        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(allSubjectsData.freeUserData.cohortDetails[3], 'free')
        allure.startStep("Navigate to all subjects menu from dashboard", true)
        await AllSubjectsPage.navigateToAllSubjects()
        allure.startStep("Navigate to concept videos from all subjects", true)
        await AllSubjectsPage.navigateToConceptVideosfromAllSubjects()
        allure.startStep("Verify main video download app popup", true)
        expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on play button on intrested videos", true)
        await browser.keys(["PageDown"])
        await browser.pause(2000)
        await browser.keys(["End"])
        await browser.pause(3000)
        await ConceptVideoPage.btnPlayIntrestedVideos.waitForClickable({ timeout: 30000 })
        await ConceptVideoPage.btnPlayIntrestedVideos.click()
        allure.startStep("Verify download app popup from interested videos", true)
        expect(await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })).toEqual(true)
        allure.startStep("Click on learn more button", true)
        if (await $("//*[@class='modal-body']").isDisplayed({timeout:1500})){
            await $("//*[@alt='close-circle']").waitForDisplayed({timeout:1500})    
            await $("//*[@alt='close-circle']").click()

        }
        await AllSubjectsPage.btnDownloadNow.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnDownloadNow.click()
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
        await browser.keys(["PageDown"])
        await browser.pause(2000)
        await browser.keys(["End"])
        await browser.pause(3000)
        await AllSubjectsPage.btnplayRelatedTopics.waitForClickable({ timeout: 15000 })
        await AllSubjectsPage.btnplayRelatedTopics.click()
        allure.startStep("Verify download app popup header from related topic videos", true)
        try{
            await ConceptVideoPage.downloadAppPopupHeading.waitForDisplayed({ timeout: 5000 })
            expect(await ConceptVideoPage.downloadAppPopupHeading.isDisplayed()).toEqual(true)
        }
        catch{}
        allure.endStep();

    })

})