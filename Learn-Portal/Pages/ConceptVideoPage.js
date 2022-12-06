import BasePage from "./BasePage";
import { loginData } from "../Data/LoginData"
import LoginPage from "./LoginPage";

class ConceptVideoPage extends BasePage {

  /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */
  get menuOption() { return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }

  get conceptVedioLink() { return $("//a[@href='/learn/concept-videos']") }

  get btnPlayOnMainPage() { return $("(//*[@class='play-icon'])[1]") }

  get btnplayInsideVedio() { return $("(//*[contains(@class,'shaka-small-play-button material-icons-round')])[1]") }

  get videoScreen() { return $("//*[@class='video-container shaka-video-container']") }

  get btnFullScreen() { return $("//*[contains(@class,'shaka-fullscreen-button')]") }

  get btnExitFullScreen() { return $("//*[contains(@class,'shaka-fullscreen-button')]") }

  get btnMute() { return $("//button[@aria-label='Mute']") }

  get btnShareOnMainPage() { return $("(//*[@alt='share-icon'])[1]") }

  get sharePopupWindow() { return $("(//*[@class='share-text'])[1]") }

  get shareAppModelWindow() { return $("//*[@class='modal-body']") }

  get labelTwitter() { return $("//*[contains(text(),'Twitter')]") }

  get labelTelegram() { return $("//*[contains(text(),'Telegram')]") }

  get labelWhatsapp() { return $("//*[contains(text(),'Whatsapp')]") }

  get labelFacebook() { return $("//*[contains(text(),'Facebook')]") }

  get labelSMS() { return $("//*[contains(text(),'SMS')]") }

  get labelReddit() { return $("//*[contains(text(),'Reddit')]") }

  get linkCopy() { return $("//*[@class='share-link']") }

  get btnCopy() { return $("//*[@class='copy-link']") }

  get btnAppStore() { return $("//*[@alt='app-store']") }

  get btnPlayStore() { return $("//*[@alt='play-store']") }

  get pageTitle() { return $("//*[contains(text(),'Concept Videos')]") }

  get labelBrowseVideolessons() { return $("//*[@class='m-1 browse-title']") }

  get labelSubjectName() { return $("(//*[@class='subject-name'])[1]") }

  get btnViewConceptAtSubjectLevel() { return $("(//*[contains(text(),'View Concepts')])[1]") }

  get labelTopicName() { return $("(//*[@class='video-title'])[1]") }

  get topicVideosPageTitle() { return $("//*[@class='page-title d-none d-sm-block']") }

  get linkToChapterWiseTest() { return $("(//div[@class='pointer test-card-link'][normalize-space()='Take a Test'])[2]") }

  get linkToAPQ() { return $("(//div[@class='pointer test-card-link'][normalize-space()='Practice Questions'])[2]") }

  get linkToAskADoubt() { return $("(//div[@class='pointer test-card-link'][normalize-space()='Ask a Doubt'])[2]") }

  get btnMoreOptionInVideoPlayer() { return $("//*[@aria-label='More settings']") }

  get labelInterestedVideos() { return $("//*[text()='Videos that May Interest You']") }

  get labelImportantQuestions() { return $("//*[@class='swiper-title pe-2']") }

  get labelRelatedTopics() { return $("//*[text()='Relevant Concept Videos on BYJU’S The Learning App']") }

  get subjectBreadcrumb() { return $("//li[@class='breadcrumb-item active']") }

  subjectName(subject) { return $(`(//div[@class='img-text-container'])[${subject}]`) }

  subjectSubTitle(title) { return $(`(//div[@class='video-sub-title'])[${title}]`) }

  get learnMore() { return $("//button[@class='learn-more btn btn-primary']") }

  get btnDownloadfile() { return $("(//i[@class='mdi mdi-arrow-down-bold-circle-outline'])[1]") }

  get btnBookmark() { return $("(//i[@class ='mdi mdi-bookmark-outline'])[1]") }

  get btnViewConcept() { return $("(//i[@class ='mdi mdi-arrow-expand icon-expand pointer'])[1]") }

  get btnCollapse() { return $("(//i[@class ='mdi mdi-arrow-collapse icon-expand pointer'])[1]") }

  get labelConcept() { return $("//*[contains(@class,'rectangle-gradient')]//h3") }

  get labelViewConcept() { return $("//div[@class='modal-content']//h3[1]") }

  get btnSharePopupClose() { return $("//*[@alt='close-circle']") }

  get btnBreadCrumbOfConceptVideo() { return $("//a[text() = 'Concept Videos']") }

  get linkSubjectCards() { return $("(//div[@class = 'subject-card-widget'])[1]") }

  get labelofConceptVideoPage() { return $("//*[@class='css-17wwswp' and contains(text(),'Concept Videos')]") }

  get btnContinueReading() { return $("//button[@class='button-continue-reading pointer btn']") }

  get CWTbannerHeaddingSelectYourSubject() { return $("//*[contains(@class,'section-heading')]") }

  get APQbannerHeading() { return $("//*[contains(@class,'section-heading')]") }

  get APQbannerHeadingReturninguser() { return $("//*[@class='sub-heading px-3 py-2 m-0']") }

  get btnaskaDoubt() { return $("(//button[normalize-space()='Ask a doubt'])[1]") }

  get btnPlayIntrestedVideos() { return $("(//*[contains(text(),'Videos that May Interest You')]/../../..//*[@alt='play-icon'])[2]") }

  getVideoCount(videonumber) { return $(`(//div[@class='card-body'])[${videonumber}]`) }

  get videoTitle() { return $("(//div[@class='video-sub-title'])[1]") }

  get btnLeftNavigationIntrestedVideos() { return $("(//i[contains(@class,'undefined right uil uil-angle-left')])[1]") }

  get btnRightNavigationIntrestedVideos() { return $("(//i[contains(@class,'undefined right uil uil-angle-right')])[1]") }

  get downloadAppPopupHeading() { return $(`//b[contains(text(),"Download BYJU'S - The Learning App to continue learning")]`) }

  // get btnPlayMoreConcepts() { return $('((//h3[@class="dashboard_dashboardTitle__3RniS"][contains(text(),"More ")]))[1]/../../..//*[contains(@class,"swiper-slide-active")]') }
  get btnPlayMoreConcepts() { return $("(//*[starts-with(text(),'More')]/../../..//*[@alt='play-icon'])[1]") }

  get moreConceptsVideoCardTitle() { return $('(//*[contains(@class,"mb-0 font-15 dashboard_video-titleText__")])[8]') }

  get moreConceptsVideoMainPageTitle() { return $('(//div[@class="title"])[1]') }

  get btnLeftNavigationMoreConcepts() { return $("(//i[contains(@class,'undefined right uil uil-angle-left dashboard_videoArrow__')])[2]") }

  get btnRightNavigationMoreConcepts() { return $("(//i[contains(@class,'undefined right uil uil-angle-right dashboard_videoArrow__')])[2]") }

  get btnPlayRelatedTopics() { return $("(//*[text()='Relevant Concept Videos on BYJU’S The Learning App']/../../..//*[@alt='play-icon'])[2]") }

  get btnRightNavigationRelatedTopics() { return $("//*[text()='Relevant Concept Videos on BYJU’S The Learning App']/../..//*[contains(@class,'uil-angle-right')]") }

  get btnLeftNavigationRelatedTopics() { return $("//*[text()='Relevant Concept Videos on BYJU’S The Learning App']/../..//*[contains(@class,'uil-angle-left')]") }

  get btnFirstSubjectCard() { return $("(//p[normalize-space()='Mathematics'])[1]") }

  get videoTitle() { return $("(//div[@class='video-title'])[2]") }

  get btnfirstViewConceptVideo() { return $("(//button[normalize-space()='View Concepts'])[1]") }

  get btnviewConcepts() { return $("(//button[normalize-space()='View Concepts'])[2]") }

  get bannerHeading() { return $("//div[@class='page-title d-none d-sm-block']") }

  get numberOfVideos() { return $("(//div[@class='video-author'])[2]") }

  get videoCardRows() { return $$("//div[@class='video-card row']") }

  get videoContent() { return $$("(//div[@class='video-content'])[1]") }

  get btnSecondPlayOnMainPage() { return $("(//*[@class='play-icon'])[2]") }

  get tfsearchField() { return $('//input[contains(@class,"searchInput")]') }

  get firstSuggestionAskaDoubt() { return $("(//*[contains(text(),'Gather information about solar light, solar water')])[1]") }

  get btnRightNavigationIMPQues() { return $("(//i[@class='right uil uil-angle-right video-arrow'])[1]") }

  get btnLeftNavigationIMPQues() { return $("(//i[@class='right uil uil-angle-left video-arrow'])[1]") }

  get btnViewSolution() { return $("(//*[@type='button' and contains(text(),'View Solution')])[1]") }

  get btnBookmarkIMPQues() { return $("(//div[@class='d-flex flex-column justify-content-between vd-ques-card']//div//i[@class='mdi mdi-bookmark-outline'])[1]") }

  get viewSolutionQuestion() { return $("//div[@class='bookmark_questionTitle__1NePS']") }

  get btnNextQuestion() { return $("(//button[normalize-space()='Next Question'])[1]") }

  get btnPreviousQuestion() { return $("(//button[normalize-space()='Previous Question'])[1]") }

  get correctSolution() { return $("//div[@class='bookmark_solutionDiv__2sTUY']") }

  get videoTime() {return $("//button[@class='shaka-current-time']")}

  get btnVideoSkip10Sec() {return $("//button[@aria-label='Forward 10']")}

  get btnVideoRewind10Sec() {return $("//button[@aria-label='Rewind 10']")}

  get videoDownloadPopUpReminder() {return $("//div[@class='cntn-vd-app']")}

  get videoDownloadPopUp() {return $("//div[@class='download-popup']")}

  get btnCloseWatchWallPopup() { return $("//*[@class='close-icon pointer']")}

  get btnUnCheckBookmark() { return $("(//i[@class ='icon-bookmark pointer mdi mdi-bookmark'])[1]")}
  
  get btnUncheckBookmarkIMPQues() { return $("(//i[contains(@class,'pointer mdi mdi-bookmark')])[1]") }

  get pageLoadElement(){return $('(//div[@class="container-fluid"])[2]')}

  get btnGmail(){return $("(//img[@alt='email-icon'])[1]")}

  get btnBookMarkReadingMaterial(){return $("(//i[@class ='icon-bookmark pointer mdi mdi-bookmark-outline'])[1]")}
  
  get btnBookMarkedReadingMaterial(){return $("(//i[@class ='icon-bookmark pointer mdi mdi-bookmark'])[1]")}
  get btnUnmute() { return $("//button[@aria-label='Unmute']") }

  get btnPlay() {return $("(//button[@role='button'][normalize-space()='Play'])[1]")}

  get btnConceptVideos() {return $('//li[@class="side-nav-item"]//span[text()="Concept Videos"]')}
  
  async navigateToConceptVideo(user) {

    let menuOptionDisplayed = await this.menuOption.isDisplayed()
    if (!menuOptionDisplayed) {
      browser.reloadSession()
      await LoginPage.loginToLearnPortal(user)
    }
    await this.menuOption.waitForClickable({ timeout: 5000 })
    await this.menuOption.click()

    await this.conceptVedioLink.waitForDisplayed({ timeout: 10000 })
    await this.conceptVedioLink.click()
    
    await this.pageLoadElement.waitForDisplayed({ timeout: 45000 })
    
  }


  async navigateToConceptVideoAndVerifyPageLoad(cohortDetail) {

    await this.menuOption.waitForClickable({ timeout: 5000 })
    await this.menuOption.click()
    await browser.pause(2000)// waiting for the menubar to load completely
    await this.conceptVedioLink.waitForClickable({ timeout: 10000 })
    await this.conceptVedioLink.click()
    await browser.pause(5000)//waiting for the videos to load

    if (loginData.conceptVideoNotApplicable.includes(cohortDetail)) {

      // const videoSection = await $("//*[@class='no-video-text']").getText()
      expect(await $("//*[@class='no-video-text']").getText()).toHaveTextContaining("No Concept Videos")
    }
    else {

      expect(await this.pageTitle.waitForDisplayed({ timeout: 25000 }))
    }
  }
    
}
export default new ConceptVideoPage();
