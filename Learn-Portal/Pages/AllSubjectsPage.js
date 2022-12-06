import BasePage from "./BasePage";
import DashboardPage from "../Pages/DashboardPage";
import { loginData } from "../Data/LoginData"

class AllSubjectsPage extends BasePage {

  get pageTitle() { return $("(//*[normalize-space()='All Subjects'])[1]") }

  get labelTestCard() { return $("//*[@class='p-1 col-12']") }

  get btnBreadCrumbOfAllSubjects() { return $("//*[contains(text(),'My Subjects')]") }

  get labelSubjectTitle() { return $("//*[@class='page-title mb-1']") }

  get labelSubTitle() { return $$("//*[@class='video-sub-title']") }

  get labelTotalChapters() { return $("//*[@class='sub-title']") }

  get firstSubjectCard() { return $("(//div[@class='subject-name'])[1]") }

  get btnViewTopics() { return $("(//button[contains(@class,'view-cncpts btn btn-primary btn-sm')][normalize-space()='View Topics'])[1]") }

  get btnStartLearning() { return $("(//button[@class='btn btn btn-plain'][normalize-space()='Start Learning'])[1]") }

  get firstVideoHeadder() { return $("(//img[contains(@class,'video-thumbnail')])[1]") }

  get headingVideoWhichMightIntrest() { return $("//h3[normalize-space()='Videos that May Interest You']") }

  get btnDownloadPdf() { return $("(//button[@class='button-downloadpdf btn'])[1]") }

  get headingRelatedTopics() { return $("(//*[normalize-space()='Relevant Concept Videos on BYJU’S The Learning App'])[1]") }

  get downloadAppPopUp() { return $("//div[@class='download-app-video d-flex flex-column align-items-center justify-content-center']") }

  get btnviewSolution() { return $("(//button[contains(@type,'button')][normalize-space()='View Solution'])[6]") }

  get viewSolutionPopUpHeader() { return $("//div[@class='bookmark_modalHeading__2AAyD modal-header']") }

  get btnDownloadNow() { return $("//*[text()='Download Now']") }

  get btnplayMoreConceptVideo() { return $("(//*[starts-with(text(),'More')]/../../..//*[@alt='play-icon'])[1]") }

  get btnplayRelatedTopics() { return $(`(//*[text()="Relevant Concept Videos on BYJU’S The Learning App"]/../../..//*[@alt='play-icon'])[1]`) }

  get btncloseViewSloution() { return $("//i[@class='mdi mdi-close']") }

  get btnchapterWiseTests() { return $("(//div[@class='pointer test-card-link'][normalize-space()='Take a Test'])[2]") }

  get btnAPQ() { return $("(//div[contains(@class,'pointer test-card-link')][normalize-space()='Practice Questions'])[2]") }

  get btnaskADoubtSideBar() { return $("//*[contains(text(),'Have a Doubt?')]") }

  get importantQuestionsCardText() { return $("(//div[@class='mt-2 ques-content text-start'])[6]") }

  get questionPopup() { return $("(//div[@class='bookmark_questionTitle__1NePS'])[1]") }

  get btnbookMark() { return $("(//i[@class='pointer mdi mdi-bookmark'])[3]") }

  get btnleftNavigationImpQues() { return $("(//i[@class='right uil uil-angle-left video-arrow'])[1]") }

  get btnrightNavigationImpQues() { return $("(//i[@class='right uil uil-angle-right video-arrow'])[1]") }

  get labelSubjectCard() { return $("//*[contains(text(),'Start learning your favorite subjects and concepts to view your progress')]") }

  numberOfTest(headerNumber) { return $(`(//div[@class='video-author']//span[2])[${headerNumber}]`) }

  videoTitle(videoTitle) { return $(`(//div[@class='video-title'])[${videoTitle}]`) }

  videoSubTitle(subTitle) { return $(`(//div[@class='video-title'])[${subTitle}]`) }

  videoDescription(videoContent) { return $(`(//div[@class='video-content'])[${videoContent}]`) }

  get exploreOtherSubjects() { return $("//div[@class='border rounded pb-2 lessons col-12']") }

  get btnBiology() { return $("//p[normalize-space()='Biology']") }

  get headingBiology() { return $("//p[contains(@class,'page-title mb-1')]") }

  get titleHeadingAPQ() { return $("//*[@class='css-17wwswp']") }

  get btnLeftNavigationPopularVideos() { return $("(//i[@class='undefined right uil uil-angle-left dashboard_videoArrow__30y65'])[1]") }

  get btnRightNavigationPopularVideos() { return $("(//i[@class='undefined right uil uil-angle-right dashboard_videoArrow__30y65'])[1]") }

  get titleHeadingPopularVideos() { return $("(//*[normalize-space()='Watch Popular Mathematics Videos'])[1]") }

  get pageHeadingYouHaventStartedYet() { return $("//*[@class='m-2 completed']") }

  get firstVideoTitle() { return $("(//div[@class='video-title'])[1]") }

  get chapterTitle() { return $("//*[@class='chapter-heading']") }

  get btnNextChapter() { return $("//span[@class='clr-blu next-chapter']") }

  get btnPreviousChapter() { return $("//span[@class='clr-blu previous-chapter']") }

  get btnTakeTest() { return $("(//*[@class='card-name mb-1'])[1]") }

  get btnPractice() { return $("//a[@href='/learn/adaptive-questions']//div[@class='arrow-icon']//i[@class='mdi mdi-arrow-right']") }

  get subjectBreadCrumb() { return $("(//li[@class='breadcrumb-item active'])[1]") }

  get labelMoreConcepts() { return $("(//*[@class='dashboard_dashboardTitle__3RniS'])[2]") }

  get btnPlayMoreConcepts() { return $("(//img[contains(@class,'dashboard_play-icon__aRYE-')])[8]") }

  get moreConceptsVideoCardTitle() { return $("(//*[@class='mb-0 font-15 dashboard_video-titleText__3LcRo'])[10]") }

  get downloadByjusAppDescription() { return $("//div[@class='downloadApp_downloadDiv__2erzb']") }

  get labelRelatedTopics() { return $("(//*[@class='dashboard_dashboardTitle__3RniS'])[3]") }

  get subjectTitleHeading() { return $("//p[@class='page-title mb-1']") }

  getSubject(subject) { return $(`(//div[@class='subject-name'])[${subject}]`) }

  get subjectLabelRecomendedclasses() { return $("//*[@class='mb-0 ms-1']") }

  get btnRecomendedSlotTime() { return $("//*[@class='pe-2 mb-2 d-inline-block']") }

  numberOfVideos(videoNumber) { return $(`(//div[@class='video-author'])[${videoNumber}]`) }

  get ddfilterSubjects() { return $("//div[@class='select__single-value css-qc6sy-singleValue']") }

  get btnPlayRecomendedVideos() { return $("(//*[@class='dashboard_videoThumbnailBlock__t0rrk btn btn-link'])[1]") }

  get titleConceptVideos() { return $("(//div[@class='title'])[1]") }

  get titleConceptVideos() { return $("//*[text()='Physics']") }

  getClassName(input) {return $(`//p[contains(text(),${input})]`)}

  get classSubName(){return $('(//p[@class="mb-0 ms-1"])[3]')}

  subNameInAllSub(subName){return $(`//*[text()='${subName}']`)}

  get byjusClasses(){return $("//*[contains(text(),'BYJU’S Classes for')]")}

  get btnRemindmeWhatsapp(){return $("//span[normalize-space()='Remind me']")}

  get btnJoinNow(){return $("(//button[@class='byjus-classes-btn btn btn-primary'])[1]")}

  get btnBrowseVideoLessons(){return $("(//p[normalize-space()='Mathematics'])[1]")}

  get btnclickconceptvideo(){return $("(//button[@role='button'][normalize-space()='View Concepts'])[1]")}

  get btnplayvideo(){return $("(//button[@role='button'][normalize-space()='Play'])[1]")}

  selectSubject(subjectName){return $(`//div[@class='subject-name' and contains(text(),'${subjectName}')]`)}

  get btnStartLearning2() { return $("(//button[@class='btn btn btn-plain'][normalize-space()='Start Learning'])[2]") }


  async navigateToAllSubjects() {
    await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
    await DashboardPage.menuOption.click()
    await browser.pause(3000)
    expect(await DashboardPage.btnAllSubjects.waitForClickable({ timeout: 5000 })).toEqual(true)
    await DashboardPage.btnAllSubjects.click()
    await browser.pause(3000)

  }

  async navigateToAllSubjectAndVerifyPageLoad(cohortDetail) {

    await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
    await DashboardPage.menuOption.click()
    await browser.pause(1000)

    if (loginData.allSubjectNotApplicable.includes(cohortDetail)) {
      expect(await DashboardPage.btnAllSubjects.isDisplayed()).toEqual(false)
    }

    else {
      await DashboardPage.btnAllSubjects.waitForClickable({ timeout: 1500 })
      await DashboardPage.btnAllSubjects.click()
      expect(await this.pageTitle.waitForDisplayed({ timeout: 1500 }))
      expect(await this.labelTestCard.waitForDisplayed({ timeout: 1500 }))

    }
  }


  async navigateToConceptVideosfromAllSubjects() {
    await this.firstSubjectCard.waitForClickable({ timeout: 15000 })
    await this.firstSubjectCard.click()
    await this.btnViewTopics.waitForClickable({ timeout: 15000 })
    await this.btnViewTopics.click()
    await this.btnStartLearning.waitForClickable({ timeout: 15000 })
    await this.btnStartLearning.click()

  }
}
export default new AllSubjectsPage();
