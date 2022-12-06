import BasePage from "./BasePage";
import DashboardPage from "../Pages/DashboardPage";
import { loginData } from "../Data/LoginData"
import ConceptVideoPage from "../Pages/ConceptVideoPage"
import AllSubjectsPage from "./AllSubjectsPage";

class BookMarksPage extends BasePage {

    get btnSubjectCard() {return $("(//*[@class='bookmarkStyles_subCard__3HcM6 card'])[6]")}

    get btnSubjectCategories() {return $("(//*[@class='bookmarkStyles_subCard__3HcM6 bookmarkStyles_summariesCard__1E42N card'])[1]")}

    get btnViewAnswer() {return $("(//*[text()= 'View Answer'])[1]")}

    get btnReadSummary() {return $("(//*[text()= 'Read Summary'])[1]")}

    get btnClosePopup() {return $("//*[@class= 'mdi mdi-close']")}

    get labelSubjectBookmarks() {return $("//*[text()='Subject Bookmarks']")}

    get labelBookmarkedCategories() {return $("//*[text()='Bookmarked Categories']")}

    get labelRecentBookmarks() {return $("//*[text()='Recent Bookmarks']")}

    get subjectBookmarksCardCount() {return $$("(//*[contains(@class,'p-3 card')])[1]//*[contains(@class,'swiper-slide swiper-slide-duplicate')]")}
    
    get btnSubjectBookmarksLeftNevigation() {return $("//*[contains(@class,'uil-angle-left')]")}

    get btnSubjectBookmarksRightNevigation() {return $("//*[contains(@class,'uil-angle-right')]")}
    
    subjectBookmarksCardSubjectName(number) {return $(`((//*[contains(@class,'p-3 card')])[1]//*[contains(@class,'swiper-slide swiper-slide-duplicate')])[${number}]//*[@class='bookmarkStyles_subjName__29wt-']`)}

    subjectBookmarksCardBookmarkCount(number) {return $(`((//*[contains(@class,'p-3 card')])[1]//*[contains(@class,'swiper-slide swiper-slide-duplicate')])[${number}]//*[contains(@class,'bookmarkStyles_subBmCount__3z6ca')]`)}
    
    subjectBookmarksCardBookmarkDate(number) {return $(`((//*[contains(@class,'p-3 card')])[1]//*[contains(@class,'swiper-slide swiper-slide-duplicate')])[${number}]//*[contains(@class,'bookmarkStyles_lastUpdated__1U0z7')]`)}
    
    get bookmarkedCateoriesCardCount() {return $$("((//*[contains(@class,'p-3 card')])[2])//*[contains(@class,'bookmarkStyles_subCard__3HcM6')]")}
    
    get subjectBookmarkPageSelectSubjectCount() {return $$("//*[contains(@class,'subjects-card')]")}
    
    subjectBookmarkPageSelectSubject(count) {return $(`(//*[contains(@class,'subjects-card')])[${count}]`)}
    
    get subjectBookmarkPageSelectSubjectBookmarkCount() {return $("(//*[contains(@class,'fw-bold')])[1]")}
    
    get subjectBookmarkChapterSummaries () {return $("//*[text()='Chapter Summaries']")}
    
    get mainPageBookmarkCount() {return $("//*[@class='bookmarkStyles_bmCount__1_Eqr']")}
    
    get mainPageBookmarkFirstSubject() {return $("(//*[contains(@class,'subjects-card')])[1]")}
    
    get mainPageBookmarkActiveSubjectCard() {return $("//*[@class='swiper-slide swiper-slide-active']")}
    
    get bookmarkedCategoriesCardCount() {return $$("//*[contains(@class,'bookmarkStyles_summariesCard__1E42N card')]")}
    
    get bookmarkedCategoriesQuestions() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Questions']")}
    
    get bookmarkedCategoriesQuestionsDate() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Questions']/../..//*[@class='bookmarkStyles_lastUpdated__1U0z7']")}
    
    get bookmarkedCategoriesQuestionsBookmarked() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Questions']/../..//button")}
    
    get bookmarkedCategoriesChapterSummariesBookmarked() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Chapter Summaries']/../..//button")}
    
    get bookmarkedCategoriesChapterSummaries() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Chapter Summaries']")}
    
    get bookmarkedCategoriesChapterSummariesDate() {return $("//*[contains(@class,'bookmarkStyles_subjName__') and text()='Chapter Summaries']/../..//*[@class='bookmarkStyles_lastUpdated__1U0z7']")}
    
    get bookmarkedCategoriesHeader() {return $("//*[text()='Bookmarked Categories']")}
    
    get bookmarkedCategoriesQuestionsBookmarkCount() {return $("(//*[contains(@class,'bookmarkStyles_bmCount__')])[1]")}
    
    get bookmarkedCategoriesChapteSummariesBookmarkCount() {return $("(//*[contains(@class,'bookmarkStyles_bmCount__')])[2]")}
    
    findElementByText(text) {return $(`//*[text()="${text}"]`)}
    
    get recentBookmarksCardCount () {return $$("//*[@alt='unbkmkimg']/../../../../..")}
    
    recentBookmarksCardDiscription (count) {return $(`(//*[contains(@class,'bookmarkStyles_question__')])[${count}]`)}
    
    recentBookmarksCardSubjectAndDate (count) {return $$(`(//*[contains(@class,'bookmarkStyles_question__')])[${count}]/../..//*[contains(@class,'d-flex')]/p`)}
    
    recentBookmarksCardViewAnswer (count) {return $(`(//button[text()='View Answer'])[${count}]`)}

    recentBookmarksCardReadSummary (count) {return $(`(//button[text()='Read Summary'])[${count}]`)}

    recentBookmarksCardDownload (count) {return $(`(//*[text()='Download'])[${count}]`)}
    
    recentBookmarksCardBookmarkButton (count) {return $(`(//*[contains(@class,'bookmarkStyles_bmIcon__')])[${count}]`)}
    
    noBookmarksBlock (count=1) {return $(`(//*[text()='No bookmarks to show yet'])[${count}]`)}

    get popupQuestionTitle () {return $("//*[@class='bookmark_questionTitle__1NePS']")}

    get popupChapterSummariesTitle () {return $("//*[@class='bookmark_popUpTitle__1IHRS']")}
    
    get popupCloseButton () {return $("//*[@class='mdi mdi-close']")}

    // Concept Videos Xpath

    get btnConceptVideos() { return $("//*[text()='View Concept Videos']")}

    get btnDownloads(){return $("(//p[text()='View Downloads'])[1]")}

    get btnBookmarkIMPQuesCount() { return $$(`//i[contains(@class,'pointer mdi mdi-bookmark-outline')]`) }
    
    btnBookmarkIMPQues(count) { return $(`(//i[contains(@class,'pointer mdi mdi-bookmark-outline')])[${count}]`) }

    get btnAskADoubt() { return $("//p[text()='Have a Doubt?']")}

    get tfsearchField() { return $("//input[@placeholder='Search']") }

    get firstSuggestionAskaDoubt() { return $(`(//*[contains(@class,'single-suggestion')])[1]`) }

    labelBreadCrumb(text) { return $(`//*[@class='SearchPage_breadcrumb__3MG5V']//*[contains(text(),'${text}')]`)}
    
    get btnTakeATest() { return $("//p[text()='Take a Test']")}
    
    get btnViewDownloads() { return $("//p[text()='View Downloads']")}

    get btnViewConceptVideos() { return $("//button[text()='View Concept Videos']")}

    get examPaperSection() { return $("//*[contains(text(),'Bookmarked Categories')]/..//p[contains(text(),'Exam Papers')]")}

    get bookMarkCountUnderExamPaperSection() { return $("//*[contains(text(),'Bookmarked Categories')]/..//p[contains(text(),'Exam Papers')]/../..//*[contains(@class,'bookmarkStyles_subBmCount')]")}
   
    get bookMarkCountUnderCatgeories() { return $("(//*[contains(@class,'bookmarkStyles_bmCount')])[3]")}
   
    get subjectDropdown() { return $("(//*[contains(@class,'custom-styler__value-container')])[6]")}
   
    get bookmarkedCategoriesTitle() { return $("//*[contains(@class,'bmPageTitle')]")}
   
    get papersCountInCategoriesSection() { return $$("//*[text()='Download']/../../../../..")}
   
    get previousPaginationButton() {return $("//*[contains(@aria-disabled,'false')]")}
   
    get nextPaginationButton() {return $("//*[contains(@aria-disabled,'false')]")}
   
    getPaginationInCategoriesPage(count) {return $(`((//ul[contains(@class,'pagination')])[3])/li[${count}]`)}
   
    getPaperTitle(count) {return $(`(//*[contains(@class,'bookmarkStyles')]/..//*[contains(@class,'bookmarkStyles_question')])[${count}]`)}
   
    getBookmarkedButtonInCategoriesPage(count) {return $(`(//*[contains(@class,'bookmarkStyles')]/././/*[contains(@alt,'unbkmkimg')])[${count}]`)}
   
    getDownloadCTAButtonInCategoriesPage(count) {return $(`(//*[contains(@class,'bookmarkStyles')]/..//*[contains(text(),'Download')])[${count}]`)}

   get btnDownload() {return $ ("(//*[text()='Recent Bookmarks']/..//a[text()='Download'])[1]")}

   clickOnSelectedSubjectVideo(subjectName){return $(`(//*[text()='${subjectName}']/../../../..//*[@class='play-icon'])[1]`)}

   selectFirstSubjectInsubjectBookmark(subjectName){return $(`(//*[contains(@class,'bookmarkStyles_subjName__') and contains(text(),'${subjectName}')])[1]`)}

    get btnFilterDropDownQuestionTab(){return $("(//div[contains(@class,'dropdown-indicator')])[1]")}

    get selectedFilterQuestionTab(){return $("(//*[contains(@class,'custom-styler__single-value')])[1]")}

    bookmarkCardCount(count){return $(`(//*[contains(@class,'bookmarkCount')])[${count}]//span[2]`)}

    cardTabs(count){return $(`(//*[@role="tab"])[${count}]`)}

    get FirstTopicName(){return  $("(//*[contains(@class,'tab-pane active')]//div[contains(@class,'bookmarkStyles_question__')])[1]")}

    btnFilterDropDown(count){return $(`(//*[contains(@class,'tab-pane active')]//div[contains(@class,'dropdown-indicator')])[${count}]`)}

    selectedFilterChapterSummariesTab(count){return $(`(//*[contains(@class,'tab-pane active')]//*[contains(@class,'custom-styler__single-value')])[${count}]`)}

    get FirstExamPaperName(){return $("(//*[contains(@class,'tab-pane active')]//*[contains(@class,'bookmarkStyles_question__')])[1]")}

    get btnFilterDropDownExamPaperTab(){return $("(//div[contains(@class,'dropdown-indicator')])")}

    get selectedFilterExamPaperTab(){return $("(//*[contains(@class,'tab-pane active')]//*[contains(@class,'mdi-filter-variant')]/following-sibling::div)[1]")}

    bookmarkCardCountInBookmarkCategories(count){return $(`(//*[contains(@class,'bookmarkCount')])[${count}]//div/div[1]`)}

    get selectQuestionTab(){return $("//p[contains(@class,'bookmarkStyles_subjName__') and text()='Questions']")}

    subjectNameOnCards(count){return $(`(//*[contains(@class,'tab-pane active')]//p[@class='fw-normal font-12 mb-0'])[${count}]`)}

    get selectedChapterSummariesTab(){return $("//p[contains(@class,'bookmarkStyles_subjName__') and text()='Chapter Summaries']")}

    get selectedExamPaperTab(){return $("//p[contains(@class,'bookmarkStyles_subjName__') and text()='Exam Papers']")}

    subjectNameOnFirstCardInExamPaper(count){return $(`(//*[contains(@class,'tab-pane active')]//div[@class='d-flex align-items-center']//h4)[${count}]`)}

    clickOnSelectedSubjectVideo(subjectName){return $(`(//*[text()='${subjectName}']/../../../..//*[@class='play-icon'])[1]`)}
   
    async navigateToBookMarksPage() {
        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        expect(await DashboardPage.btnBookmarks.waitForClickable({ timeout: 5000 })).toEqual(true)
        await DashboardPage.btnBookmarks.click()
        await this.mainPageBookmarkActiveSubjectCard.waitForDisplayed({timeout : 5000})
    
      }

    async bookmarkQuesFromConceptVideos() {
      this.btnConceptVideos.waitForDisplayed({timeout : 3000})
      this.btnConceptVideos.click()
      await ConceptVideoPage.btnPlayOnMainPage.waitForClickable({ timeout: 45000 })
      await ConceptVideoPage.btnPlayOnMainPage.click()
      await ConceptVideoPage.btnBookmarkIMPQues.waitForDisplayed({timeout : 3500})
      expect(await ConceptVideoPage.btnBookmarkIMPQues.isDisplayed()).toEqual(true)
      await this.btnBookmarkIMPQues(1).waitForDisplayed({timeout : 3000})
      let countBookmarkBtn = await this.btnBookmarkIMPQuesCount.length
      console.log(countBookmarkBtn)
      for (let i=1;i<=countBookmarkBtn || i ==3 ;i++){
        await this.btnBookmarkIMPQues(i).waitForDisplayed({timeout : 3000})
        await browser.pause(1000)
        await this.btnBookmarkIMPQues(i).click()
      }
    }
    async navigateToCategoriesThroughExamSectionForSpecificSubject(subject) {
      await this.examPaperSection.waitForDisplayed({ timeout: 10000 })
      await this.examPaperSection.click()
      await this.bookmarkedCategoriesTitle.waitForDisplayed({ timeout: 10000 })
      await this.subjectDropdown.waitForDisplayed({ timeout: 10000 })
      await this.subjectDropdown.click()
      await browser.keys(subject)
      await browser.keys('Tab')
      await browser.pause(2000)
    }

    async bookmarkQuestionFlow(subjectName){
        let subjectNameVideoPlayButton = $(`(//*[@class='video-sub-title' and text()='${subjectName}']/../../../..//*[@class='play-icon'])[1]`)
        for (let i=0;i<35;i++){
            await browser.keys(["PageDown"])
            try{await subjectNameVideoPlayButton.waitForDisplayed({timeout:500})}catch{}
            if(await subjectNameVideoPlayButton.isDisplayed()){
                break
            }
        }
        await subjectNameVideoPlayButton.click()
        try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})
            await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})
        }catch{}
        let bookmarkedCount = await $$("//*[@class='mdi mdi-bookmark']").length
        let bookamrk = 4-bookmarkedCount
        if (bookmarkedCount != 4 && bookmarkedCount<5){
            for (let i=1;i<=bookamrk;i++){
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
                await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
                await browser.pause(1500)
            }
        }
    }
    async subjectBookmarkElementsCheck(bookmarkedCount){
      for (let i=1;i<=bookmarkedCount;i++){
        try{await this.recentBookmarksCardDiscription(i).waitForDisplayed({timeout:1000})}catch{}
        expect(await this.recentBookmarksCardDiscription(i).isExisting()).toEqual(true)
        expect(await this.recentBookmarksCardBookmarkButton(i).isExisting()).toEqual(true)
      }
      let questionTabBookmarkCount = $$("(//*[contains(@class,'fw-bold')])[2]").length
      for (let i=1;i<=questionTabBookmarkCount && i<=10;i++){
        if(await this.recentBookmarksCardViewAnswer(i).isExisting()){
          expect(true).toEqual(true)
        }
        else{
          expect(false).toEqual(true)
        }
      }
      let chapterSummariesTabBookmarkCount = $$("(//*[contains(@class,'fw-bold')])[3]").length
      for (let i=1;i<=chapterSummariesTabBookmarkCount && i<=10;i++){
        if(await this.recentBookmarksCardReadSummary(i).isExisting()){
          expect(true).toEqual(true)
        }
        else{
          expect(false).toEqual(true)
        }
      }
      let examPapersTabBookmarkCount = $$("(//*[contains(@class,'fw-bold')])[3]").length
      for (let i=1;i<=examPapersTabBookmarkCount && i<=10;i++){
        if(await this.recentBookmarksCardDownload(i).isExisting()){
          expect(true).toEqual(true)
        }
        else{
          expect(false).toEqual(true)
        }
      }
    
    }

    async bookmarkChapterFlow(subjectName){     
      await AllSubjectsPage.selectSubject(subjectName).waitForDisplayed({timeout:3000})
      await AllSubjectsPage.selectSubject(subjectName).click()
      await AllSubjectsPage.btnViewTopics.waitForDisplayed({timeout:5000})
      await AllSubjectsPage.btnViewTopics.click()
      await AllSubjectsPage.btnStartLearning.waitForDisplayed({timeout:5000})
      await AllSubjectsPage.btnStartLearning.click()
      try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})
          await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})
      }catch{}
      let bookmarkedCount = await $$("//*[@class='mdi mdi-bookmark']").length
      let bookamrk = 1-bookmarkedCount
      if (bookmarkedCount != 1 && bookmarkedCount<2){
          for (let i=1;i<=bookamrk;i++){
              await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
              await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
              await browser.pause(500)
          }
        }
        await browser.back()
        await browser.pause(1500)
        await AllSubjectsPage.btnStartLearning2.waitForDisplayed({timeout:3000})
        await AllSubjectsPage.btnStartLearning2.click()
        try{await $("(//*[@class='mdi mdi-bookmark'])[1]").waitForDisplayed({timeout:5500})
          await $("(//*[contains(@class,'mdi-bookmark-outline')])[1]").waitForDisplayed({timeout:5500})
      }catch{}
      let bookmarkedCount2 = await $$("//*[@class='mdi mdi-bookmark']").length
      let bookamrk2 = 1-bookmarkedCount
      if (bookmarkedCount2 != 1 && bookmarkedCount2<2){
          for (let i=1;i<=bookamrk2;i++){
              await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).scrollIntoView({block:"center"})
              await $(`(//*[contains(@class,'mdi-bookmark-outline')])[1]`).click()
              await browser.pause(500)
          }
        }      
      }

}

export default new BookMarksPage();