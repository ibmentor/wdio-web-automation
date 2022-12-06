import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";
import { loginData } from "../Data/LoginData"
import { AllureUtil as allure } from "../utils/util.allure"



class ByjusClassesPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get menuOption() { return $("//*[@class='topnav-hamburger menu_guidetour_mobile']") }

    get pageTitle() { return $("//*[@class='css-17wwswp']") }

    get labelTestCard() { return $("//*[@class='align-items-center row']") }

    get labelAakashLiveClass() { return $("//*[@class='aakash-classes-container container-fluid']") }

    get btnHomePage() { return $("(//li[@class ='side-nav-item'])[1]") }

    get btnByjusClassPage() { return $('//img[@alt="menu-icons/byjus_class.png"]') }

    get trailClassTickMark() { return $("(//*[@alt= 'progress updated'])[4]") }

    get btnFreeTrialClass() { return $("//*[text()= 'Book a Free trial']") }

    get btnConceptVideo() { return $("//*[@class ='concept-btn']") }

    get btnslotstime() { return $("//button[@class='slot-btn text-muted me-1 btn btn-outline-secondary active']") }

    get btnBookClass() { return $("(//*[@class='byjus-classes-btn btn btn-primary'])[1]") }
    
    get labelBookedSuccess() { return $("//p[contains(@class,'booked-text')]") }

    get labelMasterClass() { return $("(//*[contains(text(),'Masterclass')])[1]") }
    
    get btnMasterClassBook() { return $("(//*[contains(text(),'Masterclass')]/../../..//*[contains(text(),'Book Now')])[1]") }
    get btnRmaindMe() { return $("//*[contains(text(),'Remind me')]") }

    get labelRemaindMePopupHeader() { return $("//*[@class= 'remind-popup-heading']") }

    get labelMobileNumber() { return $("//*[@class= 'remind-popup-subheading pt-2']/p/label") }

    get btnRemaindMeSubmit() { return $("//*[@class= 'rm-submit-btn btn btn-primary']") }

    get btnRemaindMeCancel() { return $("//*[text()= 'Cancel']") }

    get btnMainRemaindMe() { return $("(//*[@class= 'font-12 pe-2  mb-0'])[1]") }

    get btnSecondslotstime() { return $("(//*[@class ='col-4 px-2 text-center'])[2]") }

    get labelremainingslots() { return $("//*[@class= 'tab-content']") }

    get labelRequestCallBack() { return $("//*[@class='request-callback-head']") }

    get btnForYouTab() { return $("//*[text()='For you']") }

    get btnCompletedTab() { return $("(//*[@class= 'd-block font-14'])[2]") }

    get btnRebookClass() { return $("//*[text()= 'Rebook Class']") }

    get btnSwapClass() { return $("//*[text()= 'Swap Class']") }

    get btnBackToByjusClass() { return $("//*[@class= 'byjus-success-link-block']") }

    get btnJoinNow() { return $("(//*[text()= 'Join Now'])[1]") }

    get btnBLCWatchVideo() { return $("(//*[@class= 'dwnld-btn btn btn-primary'])[1]") }

    get btnBLCWatchVideoClose() { return $("//*[@class= 'close-icon pointer']") }

    get btnBLCResult() { return $("(//*[@class= 'test-start-button btn btn-outline-secondary'])[1]") }

    get btnBTCStartTest() { return $("(//*[@class= 'test-start-button btn btn-outline-secondary'])[1]") }

    get btnBTCStartTestpopup() { return $("//*[@class= 'btn btn btn-primary']") }

    get btnBTCExistAssement() { return $("//*[@class= 'practicetest_exitAssessmentBlock__kacQB']") }

    get countDropdownOnCompletedTab() { return $$("//*[@class='drp-dwn']") }

    get btnUpComingTab() { return $("//*[text()='Upcoming']") }

    dropdownOnCompletedTab(count) { return $(`(//*[@class='drp-dwn'])[${count}]`) }

    dropdownElementCountOnCompletedTab(dropdownCount) { return $$(`(//*[@class='drp-dwn'])[${dropdownCount}]/../../../..//*[@class='post-req-crd']`) }

    btnCompletedTabDropdownSeeMore(dropdownCount) { return $(`(//*[@class='drp-dwn'])[${dropdownCount}]/../../../..//*[text()='See More']`) }

    get labelSessionDetailRevisionMaterial() { return $("//*[@class='post-title' and text()='Revision material']") }

    get labelSessionDetailPrepareForSession() { return $("//*[@class='post-title' and text()='Prepare for session']") }

    labelCompletedTabTopicName(dropdownCount) { return $(`(//*[@class='drp-dwn'])[${dropdownCount}]/../../../../../..//*[contains(@class,'prerequist-title')]`) }

    get labelSessionDetailTopicName() { return $("//*[@class='sub-head-det']") }

    get btnUpNextInUpComingTab() { return $(".byjus-class-cards-heading") }
    get btnAllOnCompletedTab() { return $(".align-items-center.active") }
    btnSeeMoreOnUpcomingTab(count) { return $(`(//*[contains(@class,'mob-view-gc')])[${count}]/..//*[text()='See More']`) }
    get joinTime() { return $(".join-time-txt") }
    getTimeOnCardUnderUpcomingTab(count) { return $(`(//*[contains(@class,'mob-view-gc')])[${count}]/..//*[contains(@class,'time-left-span')]`) }
    btnJoinNowOnCardUnderUpcomingTab(count) { return $(`(//*[contains(@class,'mob-view-gc')])[${count}]/..//*[contains(@class,'btn-primary')]`) }
    prepareForClassText(count) { return $(`(//*[contains(@class,'mob-view-gc')])[${count}]/..//*[contains(@class,'prepare-text')]`) }
    get btnSessionDetailBreadCrumb() { return $(".d-sm-block.pointer") }
    get timeLimit() { return $("(//*[contains(@class,'instruction_heading')])[2]") }
    get closeIconInInstructionPopUpPage() { return $('.mdi.mdi-close') }
    get cards() { return $$('div.mob-view-gc') }
    get btndownloadCTA() { return $('.mdi-arrow-down') }
    get btnPostAssessmentCTAInSessionPage() { return $("//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'assessment_icon.png')]/../../..//*[contains(@class,'mdi-arrow-right')]") }
    get btnstartTestCTA() { return $("//*[contains(text(),'Start test')]/following::i") }
    get btnJoinNowInSessionPage() { return $('.button-txt.btn.btn-primary') }
    get btnResult() { return $("//*[contains(text(),'Result')]") }
    get instructionTitle() { return $('.instruction-title') }
    get secondStartCTAButton() { return $("//button[contains(text(),'Start Test')]") }
    get roundCircleStart() { return $("(//*[contains(@class,'rounded-circle')])[5]") }
    get disabledStartTestBtn() { return $("//*[contains(@style,'rgb(143, 143, 143)') and text()='Start test']") }
    get disabledDownloadBtn() { return $("//*[contains(@style,'rgb(143, 143, 143)') and contains(text(),'Download')]") }
    get disabledResultBtn() { return $("//*[contains(@style,'rgb(143, 143, 143)') and contains(text(),'Result')]") }
    getRevisionMaterialTextOnCard(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(text(),'Revision Material')]`) }
    getSeeMoreTxtOnCardUnderCompletedTab(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//button[contains(text(),'See More')]`) }
    getTimeStampOnCard(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//span[contains(@class,'compl-tab-time')]`) }
    getbtnRevisionMaterialCTA(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(text(),'Revision Material')]/following::i`) }
    getChapterTitle(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//div[contains(@class,'prerequist-title')]`) }
    getSubjectTitle(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//span[contains(@class,'compl-tab-sub')]`) }
    get watchVideoCTABtnOnSessionsPage() { return $("//*[contains(text(),'Revision material')]/..//*[contains(text(),'Watch Video')]/..//i[contains(@class,'mdi-arrow-right')]") }
    get closeIconInPopupPage() { return $('.close-icon.pointer') }
    get startAgainButtonInVideoPopupPage() { return $("//*[contains(text(),'Start Again')]") }
    get skipButtonInVideoPopupPage() { return $("//*[contains(text(),'Skip')]") }
    getSubjectIcon(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(@class,'img-thumbnail')]`) }
    get cardsInCompletedTab() { return $$('.mt-3.p-3.horzlin') }
    getPagination(count) { return $(`(//*[@class='pagination']/li)[${count}]`) }
    getPostAssesmentCTABtn(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(text(),'Assessment') or contains(text(),'assessment')]/../../..//*[contains(@class,'mdi-arrow-right')]`) }
    get summaryTitle() { return $("//p[normalize-space()='Summary']") }
    get exitAssessmentButton() { return $("(//*[contains(text(),'Exit Assessment')])[2]") }
    get questionsTextUnderRevisonMaterial() { return $("//*[contains(text(),'Revision material')]/..//*[contains(@src,'post_assessment_icon')]/../..//span[2]") }
    get expiryTimeDetailsUnderReviseMaterialInSessionPage() { return $("//*[contains(text(),'Revision material')]/..//*[contains(@src,'post_assessment_icon')]/../..//span[1]") }
    getSubjectNameUnderCompletedTab(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(@class,'compl-tab-sub')]`) }
    getTopicNameUnderCompletedTab(count) { return $(`(//*[contains(@class,'mt-3 p-3 horzlin')])[${count}]/.//*[contains(@class,'prerequist-title')]`) }
    get subjectNameUnderSessionDetails() { return $('.subj-name') }
    get topicNameUnderSessionDetails() { return $('.sub-head-det') }
    get requistesUnderRevisionMaterial() { return $$("//*[contains(text(),'Revision material')]/..//*[contains(@class,'sess-det')]") }
    get requistesUnderPrepareForSession() { return $$("//*[contains(text(),'Prepare for session')]/..//*[contains(@class,'sess-det')]") }
    get sessionDetailsHeader() { return $("(//*[contains(text(),'Session Details')])[2]") }
    get revisionMaterialSubTitleUnderCompletedTab() { return $("//*[contains(text(),'Revision material')]") }
    get prepareForSessionSubTitleUnderCompletedTab() { return $("//*[contains(text(),'Prepare for session')]") }
    get classNotesUnderPrepareForSessionInSessionPage() { return $("(//*[contains(text(),'Prepare for session')]/..//*[contains(@class,'ct-title')])[1]") }
    get assessmentUnderPrepareForSessionInSessionPage() { return $("(//*[contains(text(),'Prepare for session')]/..//*[contains(@class,'ct-title')])[2]") }
    get skipButtonInVideoPopupPage() { return $("//*[contains(text(),'Skip')]") }
    get pdfImgUnderPrepareForSession() { return $("//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'pdf_icon.png')]") }
    get assessmentImgUnderPrepareForSession() { return $("//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'assessment_icon.png')]") }
    get startTestUnderPrepareForSession() { return $("//*[contains(text(),'Prepare for session')]/..//*[contains(text(),'Start test')]") }
    get startTestUnderRevisionMaterial() { return $("//*[contains(text(),'Revision material')]/..//*[contains(text(),'Start test')]") }
    get postAssessmentCTABtnInSessionPageUnderRevisionMaterial() { return $("//*[contains(text(),'Revision material')]/..//*[contains(@src,'assessment_icon.png')]/../../..//*[contains(@class,'mdi-arrow-right')]") }

    get countCompletedTabFilters() { return $$("//*[contains(@class,'search-item')]") }

    btnCompletedTabFilter(number) { return $(`(//*[contains(@class,'search-item')])[${number}]`) }

    get cardsCountCompletedTab() { return $$("(//*[@class='mt-3 p-3 horzlin'])") }

    cardsCompletedTab(number) { return $(`(//*[@class='mt-3 p-3 horzlin'])[${number}]`) }

    cardsCompletedTabSubjectName(cardNumber, filterName) { return $(`(//*[@class='mt-3 p-3 horzlin'])[${cardNumber}]//*[text()='${filterName}']`) }

    get btnPreDownloadPDF() { return $("//i[@class='mdi mdi-arrow-down d-flex align-items-center']") }

    get btnRemindMeOnWhatsapp() { return $("//*[@class='remind-txt']") }

    get btnScience() { return $("//div[text()='Science']") }

    get btnMathematics() { return $("//div[text()='Mathematics']") }

    get btnPostDownloadPDFCompletedTab() { return $("//div[contains(@class,'post-req-crd')]//i[contains(@class,'mdi mdi-arrow-down d-flex align-items-center')]") }

    get btnWatchVideoCompletedTab() { return $("(//i[contains(@class,'mdi mdi-arrow-right d-flex align-items-center arr-ftsize')])[2]") }

    buttonSeeMoreOnUpcomingTab(countSeeMore) { return $(`(//button[contains(@class,'sc-hKwDye FXTKi see-more-btn p-0 btn btn-purple')][normalize-space()='See More'])[${countSeeMore}]`) }

    get btnPreDownloadPDFSessionDetailPage() { return $("(//a[@class='font-14 btn-size text-end d-flex align-items-center btn-hov'])[1]") }

    btnDownloadPDFSessionDetailPage(count) { return $(`(//a[@class='font-14 btn-size text-end d-flex align-items-center btn-hov'])[${count}]`) }

    btnstartTestSessionDetailPage(count) { return $(`(//div[contains(text(),'Start test')])[${count}]`) }

    get btnStartTestOnInstructionPage() { return $("//button[@class='font-14 btn btn-primary']") }

    get btnJoinByjusClasses() { return $("//button[@class='button-txt btn btn-primary']") }

    btnStartTest(count) { return $(`(//div[@class='font-24 btn-hov'])[${count}]`) }

    btnResumeTest(count) { return $(`(//div[contains(text(),'Resume')])[${count}]`) }

    get btnWatchVideoCompletedTabForPreK3() { return $("(//div[text()='Watch Video'])[3]") }


    cardsCompletedTabNoMaterial(cardNumber) { return $(`(//*[@class='mt-3 p-3 horzlin'])[${cardNumber}]//*[contains(@class,'no-material-txt')]`) }

    cardsCompletedTabRevisionMaterial(cardNumber) { return $(`(//*[@class='mt-3 p-3 horzlin'])[${cardNumber}]//*[@class='drp-dwn']`) }

    assessmentCardCompletedTab(count) { return $(`(//*[@class='drp-dwn'])[${count}]/../../../..//*[contains(@src,'assessment')]`) }

    get btnDownload() { return $("(//*[@class='hor-disp row']//*[contains(text(),'Download')])[1]") }
    btnSeeMore(count) { return $(`(//*[text()='See More'])[${count}]`) }
    get labelForYouTab() { return $("//*[text()='For you']") }
    get labelPrequisite() { return $('(//p[@class="prepare-text m-0"])[1]') }

    get labelTimeAndDateInSesionDetail() { return $("(//*[@class='class-tim-txt'])[1]") }

    get labelTestStartsIn() { return $("(//*[@class='class-tim-txt'])[2]") }

    get subjectLogoInSessionDetail() { return $('//*[@alt="subject-img"]') }

    get alertTextInSessionDetail() { return $('//*[@class="purple-bar"]') }

    get downloadPDFSize() { return $('//*[@class="sb-title d-flex ms-2 disp_txt mt-1"]') }
    get recommendedClassesSubTitle() { return $("//*[contains(text(),'Recommended Classes')]") }
    get classesCard() { return $$(`//*[contains(@class,'byjus-classes-cards')]`) }
    getClassesCard(count) { return $(`(//*[contains(@class,'byjus-classes-cards')])[${count}]`) }
    getBookClassButton(count) { return $(`(//*[contains(@class,'byjus-classes-btn')])[${count}]`) }
    get backToBYJUsClassesButton() { return $(`//*[contains(text(),'Back to BYJU')]`) }
    get successfulClassBookedText() { return $(`//p[contains(text(),'Booked Successfully, Join Now!')]`) }
    get successfulJoinClassText() { return $('.join-class-status-info') }

    get btnTodayTab() { return $("//*[text()= 'Today']") }

    get btnTomorrowTab() { return $("//*[text()= 'Tomorrow']") }

    get labelDateInSuccessPage() { return $("//*[@class='pe-2 mb-2 byjus-success-timing']") }

    get btnSecondaryBookClass() { return $("(//*[@class ='byjus-classes-btn btn btn-primary'])[2]") }

    get btnSecondarySwapClass() { return $("(//*[text()= 'Swap Class'])[2]") }
    get btnBackToByjusClasses() { return $("//*[contains(@class,'byjus-success-link-block')]") }
    get btnBookNow() {return $("//button[normalize-space()='Book Now']")}
    get txtClassNotAvailable() {return $("//p[@class='request-callback-head']")}

    get joinNowPopupBefore15Mins() {return $(`//*[contains(@class,'subjectiveAssessments_heading')]`)}
    get btnGoBack() {return $(`//button[contains(text(),'Go Back')]`)}
    get btnPreAssessmentCTAInSessionPage() { return $("//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'assessment_icon.png')]/../../..//*[contains(@class,'mdi-arrow-right')]") }
    get btnJoinNowInBookedClassPage() {return $('.byjus-success-join-now') }
    get successfulClassBookedTextWithoutJoinbtn() {return $(`//*[contains(text(),'Booking Successful!')]`)}
    get timerInBookedClass() {return $('.timer-countdown') }
    get subjectnameInViewResult() {return $('.chapter-name') }
    get labelTotalScore() {return $('.score-result') }
    questionNumberInResult(count) {return $(`(//*[contains(@class,'test_questionHeader')])[${count}]`) }
    get resultBtnUnderAssessment() {return $(`//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'assessment_icon')]/../../..//*[contains(text(),'Result')]`)}
    get resumeBtnUnderAssessment() {return $(`//*[contains(text(),'Prepare for session')]/..//*[contains(@src,'assessment_icon')]/../../..//*[contains(text(),'Resume')]`)}

    get labelAlertPopupClassStarts() {return $("//*[contains(text(),'Class starts')]")}

    get labelAlertPopupDontMissOutClass() {return $("//*[contains(text(),'Your FREE trial class is about to start')]")}

    get btnCrossIconPopup() {return $("//img[@src='https://np-lp-assets.byjusweb.com/svg/byjusclasses/uc_close-circle.svg']")}

    get btnJoinNowClassAlertPopup() {return $("(//*[contains(text(),'Join Now')])[1]")}

    get labelClassNameaAlertPopup() {return $("(//*[contains(text(),'Mathematics')])[1]")}

    get labelClassName() {return $("(//div[@class='d-flex align-items-center mb-2 subject-badge-img-grid placeholder-glow'])[1]")}

   

   
    async navigateToByjusClassesAndPageLoad(cohortDetail) {

        await this.menuOption.waitForClickable({ timeout: 15000 })
        await this.menuOption.click()
        await browser.pause(1000)

        if (loginData.byjusClassesNotApplicable.includes(cohortDetail)) {
            expect(await DashboardPage.btnByjusClasses.isDisplayed()).toEqual(false)
        }
        else {
            await this.btnByjusClassPage.waitForClickable({ timeout: 20000 })
            await this.btnByjusClassPage.click()
            await this.pageTitle.waitForDisplayed({ timeout: 75000 })
            expect(await this.pageTitle.isDisplayed()).toEqual(true)
            await this.btnCompletedTab.waitForDisplayed({ timeout: 25000 })
        }
    }

    Phone_number = loginData.newUser

    async navigateToAakashLiveClassesAndPageLoad(cohortDetail) {

        //await browser.pause(2000)// Complete loading the page
        await DashboardPage.menuOption.waitForDisplayed({ timeout: 35000 })
        await DashboardPage.menuOption.click()
        await browser.pause(1000)

        if (loginData.akashLiveClassesApplicable.includes(cohortDetail)) {
            await DashboardPage.btnAakashLive.waitForDisplayed({ timeout: 15000 })
            await DashboardPage.btnAakashLive.click()
            await this.labelAakashLiveClass.waitForDisplayed({ timeout: 65000 })
        }
        else {
            expect(await DashboardPage.btnAakashLive.isDisplayed()).toEqual(false)
        }

    }

    async validateJoinNowButtonBasedOnTheTimeInCardUnderUpcomingTab(count) {
        const timeDetailsOnCard = await this.getTimeOnCardUnderUpcomingTab(count)
        await timeDetailsOnCard.waitForExist({ timeout: 3000 })
        await timeDetailsOnCard.scrollIntoView({block:"center"})
        await browser.pause(2000)
        const btnjoinNowCTA = await this.btnJoinNowOnCardUnderUpcomingTab(count)
        await btnjoinNowCTA.waitForExist({ timeout: 3000 })
        const timeDetails = await timeDetailsOnCard.getText()
        const timeDetailsArray = await timeDetails.split(" ")
        let status = timeDetailsArray[0]
        if (status == "Starts") {
            let timeValue = timeDetailsArray[2]
            let timeUnit = timeDetailsArray[3]

            if (timeUnit == "mins") {
                if (timeValue < 15) {
                    expect(await btnjoinNowCTA.isEnabled()).toEqual(true)
                }
                else {
                    await btnjoinNowCTA.click()
                    await browser.pause(2000)
                    await this.joinNowPopupBefore15Mins.waitForDisplayed({timeout:6000})
                    expect(await this.joinNowPopupBefore15Mins.isDisplayed()).toEqual(true)
                    await browser.pause(4000)
                    await this.popupCloseBtn.waitForDisplayed({timeout:5000})
                    await this.popupCloseBtn.click()
                    await browser.pause(2000)
            
                }
            }
                else {
                    await btnjoinNowCTA.click()
                    await browser.pause(2000)
                    await this.joinNowPopupBefore15Mins.waitForDisplayed({timeout:6000})
                    expect(await this.joinNowPopupBefore15Mins.isDisplayed()).toEqual(true)
                    await browser.pause(2000)
                    await this.btnGoBack.waitForDisplayed({timeout:5000})
                    await this.btnGoBack.click()
                    await browser.pause(2000)
                    
                }
            

        }
        else if (status == "Started") {
            expect(await btnjoinNowCTA.isEnabled()).toEqual(true)
        }
    }
    async validateCTAButtonsInSeeMorePageUnderUpComingTab() {
        let count=0
        await browser.pause(3000)
        const cardsLength = await this.cards.length
        for (let i = 1; i <= cardsLength; i++) {
        allure.startStep("Validate CTA buttons in See More Page Under UpComingTab based on the Time in each card", true)
        await browser.pause(5000)
        const seeMoreLink = await this.btnSeeMoreOnUpcomingTab(i)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        if (seeMoreLinkDisplayed == true) {
            await seeMoreLink.scrollIntoView({block:"center"})
            await browser.pause(2000)
            await seeMoreLink.click()
            count++
            await this.joinTime.waitForDisplayed({ timeout: 3000 })
            await this.joinTime.scrollIntoView(true)
            await browser.pause(2000)
            const timeDetails = await this.joinTime.getText()
            const timeDetailsArray = await timeDetails.split(" ")
            let status = timeDetailsArray[0]
            if (status == "Starts") {
                let timeValue = timeDetailsArray[2]
                let timeUnit = timeDetailsArray[3]

                if (timeUnit == "hrs" || timeUnit == "hr") {
                    if (timeValue < 48) {
                        const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                        const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                        if (downloadCTAButton == true) {
                            expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                        }
                        if (startTestCTAButton == true) {
                            expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                        }
                    }
                }
                else if (timeUnit == "mins") {
                    const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                    const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                    if (downloadCTAButton == true) {
                        expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                    }
                    if (startTestCTAButton == true) {
                        expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                    }

                }
                else if (timeUnit == "days" || timeUnit == "day") {
                    if (timeValue <= 2 || timeValue == "a") {
                        const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                        const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                        if (downloadCTAButton == true) {
                            expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                        }
                        if (startTestCTAButton == true) {
                            expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                        }
                    }
                    else {
                        const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                        const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                        if (downloadCTAButton == true) {
                            expect(await this.disabledDownloadBtn.isDisplayed()).toEqual(true)
                        }
                        if (startTestCTAButton == true) {
                            expect(await this.disabledStartTestBtn.isDisplayed()).toEqual(true)
                        }

                    }

                }

                else if (status == "Started") {
                    const downloadCTAButton = this.downloadCTA.isDisplayed()
                    const startTestCTAButton = this.startTestCTA.isDisplayed()
                    if (downloadCTAButton == true) {
                        await expect(await btndownloadCTA.isEnabled()).toEqual(true)
                    }
                    if (startTestCTAButton == true) {
                        await expect(await btnstartTestCTA.isEnabled()).toEqual(true)
                    }
                }
            }
            await this.btnSessionDetailBreadCrumb.waitForDisplayed({ timeout: 5000 })
            await this.btnSessionDetailBreadCrumb.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await this.btnSessionDetailBreadCrumb.click()
            await this.btnUpNextInUpComingTab.waitForDisplayed({ timeout: 10000 })
        }
    }
    if(count<1)
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
    async navigateToCompletedTabHomePageByClickingBreadCrumbButton() {
        await this.btnSessionDetailBreadCrumb.waitForDisplayed({ timeout: 10000 })
        await this.btnSessionDetailBreadCrumb.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await this.btnSessionDetailBreadCrumb.click()
        await this.btnCompletedTab.waitForDisplayed({ timeout: 10000 })
    }


    async validateCTAButtonsInSessionDetailPageUnderUpComingTab() {
        await this.joinTime.waitForDisplayed({ timeout: 3000 })
        await this.joinTime.scrollIntoView(true)
        await browser.pause(2000)
        const timeDetails = await this.joinTime.getText()
        const timeDetailsArray = await timeDetails.split(" ")
        let status = timeDetailsArray[0]
        if (status == "Starts") {
            let timeValue = timeDetailsArray[2]
            let timeUnit = timeDetailsArray[3]

            if (timeUnit == "hrs" || timeUnit == "hr") {
                if (timeValue < 48) {
                    const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                    const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                    if (downloadCTAButton == true) {
                        expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                    }
                    if (startTestCTAButton == true) {
                        expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                    }
                }
            }
            else if (timeUnit == "mins") {
                const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                if (downloadCTAButton == true) {
                    expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                }
                if (startTestCTAButton == true) {
                    expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                }

            }
            else if (timeUnit == "days" || timeUnit == "day") {
                if (timeValue <= 2 || timeValue == "a") {
                    const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                    const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                    if (downloadCTAButton == true) {
                        expect(await this.btndownloadCTA.isEnabled()).toEqual(true)
                    }
                    if (startTestCTAButton == true) {
                        expect(await this.btnstartTestCTA.isEnabled()).toEqual(true)
                    }
                }
                else {
                    const downloadCTAButton = await this.btndownloadCTA.isDisplayed()
                    const startTestCTAButton = await this.btnstartTestCTA.isDisplayed()
                    if (downloadCTAButton == true) {
                        expect(await this.disabledDownloadBtn.isDisplayed()).toEqual(true)
                    }
                    if (startTestCTAButton == true) {
                        expect(await this.disabledStartTestBtn.isDisplayed()).toEqual(true)
                    }

                }

            }

            else if (status == "Started") {
                const downloadCTAButton = this.downloadCTA.isDisplayed()
                const startTestCTAButton = this.startTestCTA.isDisplayed()
                if (downloadCTAButton == true) {
                    await expect(await btndownloadCTA.isEnabled()).toEqual(true)
                }
                if (startTestCTAButton == true) {
                    await expect(await btnstartTestCTA.isEnabled()).toEqual(true)
                }
            }
        }
    }
    async GetMonthNumber(month){
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return mS.indexOf(month) + 1;
      }
}

export default new ByjusClassesPage();