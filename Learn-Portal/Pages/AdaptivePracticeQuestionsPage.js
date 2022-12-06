import BasePage from "./BasePage";
import DashboardPage from "./DashboardPage";
import { loginData } from "../Data/LoginData"
import { adaptivePracticeQuestionData } from "../Data/AdaptivePracticeQuestionData"
import isDisplayed from "webdriverio/build/commands/element/isDisplayed";

class AdaptivePracticeQuestionsPage extends BasePage {

    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     * link for hyperLinks
     */

    get pageTitle() { return $("//*[@class='css-17wwswp']") }

    get labelTestCard() { return $("//*[@class='apq-crsl-wrap p-0']") }

    get totalSubjectCard(){return $$('.subject-img')}

    btnFirstSubjectCard(count) { return $(`(//*[@class='subject-img'])[${count}]`) }

    get btnSecondSubjectCard(){return $("(//*[@class='subject-img'])[2]")}

    get btnThirdSubjectCard(){return $("(//*[@class='subject-img'])[3]")}

    get btnStartPractice() { return $("(//*[contains(text(),'Start Practice')])[1]") }

    get btnStartTest() { return $("//button[contains(text(),'Start Test')]") }

    get btnRadioOption() { return $("(//*[@type='radio'])[1]") }

    get btnSubmit() { return $("//button[contains(text(),'Submit')]") }

    get btnNextQuestion() { return $("(//*[@type='button'])[3]") }

    get btnCheckBox() { return $("(//input[@type='checkbox'])[1]") }

    get textbox() { return $("//*[@id='fib.ControlTextarea']") }

    get btnResumePractice() { return $("(//button[contains(text(),'Resume Practice')])[1]") }

    get imgStage1BeforeStart() { return $("//*[@src='https://np-lp-assets.byjusweb.com/svg/apq/stage1.svg']") }

    get imgStage1AfterCompletion() { return $("//*[contains(@src,'/stage1-blue.svg')]") }

    get labelQuestion() { return $("//*[@class='practice_FIBOption__1VDj4']") }

    get btnBookMark() { return $("//*[@class='mdi mdi-bookmark-outline bookmarked']") }

    get btnUnCheckBookMark() { return $("//*[@class='mdi mdi-bookmark not-bookmarked']") }

    get tabBookMark() { return $("//*[@data-rb-event-key='bookmarked_questions']") }

    get subjectNameInBookMarkCard() { return $("(//*[contains(@class,'d-flex align-items-center')]//p)[1]") }

    get dateInBookMarkCard() { return $("(//*[contains(@class,'d-flex align-items-center')]//p)[2]") }

    get questionInBookMarkCard() { return $("(//*[@class='bookmarkStyles_question__3dU81'])[1]") }

    get btnViewSolution() { return $("(//button[contains(text(),'View Solution')])[1]") }

    get subjectNameInBookMarkPopup() { return $("//*[@class='bookmark_subHeader__3vi-N d-none d-sm-block']") }

    get dateInBookMarkPopup() { return $("(//*[@class='bookmark_bookmarkedDate__1Lldd'])[1]") }

    get questionInBookMarkPopup() { return $("//*[@class='bookmark_questionTitle__1NePS']") }

    get correctAnsBadge() { return $("//*[@class='bookmark_correctBadge__bpo67']") }

    get nextQuestion() { return $("//*[@class='bookmark_nextBtn__HTdb8 btn btn-link']") }

    get prevQuestion() { return $("//*[@class='bookmark_prevBtn__25kot btn btn-link']") }

    get rightArrow() { return $("//*[@class='uil-angle-right fs-4']") }

    get leftArrow() { return $("//*[@class='uil-angle-left fs-4']") }

    get closeButton() { return $("//*[@class='mdi mdi-close']") }

    get resumeButton() { return $("//button[contains(text(),'Resume')]")}

    get recentlyPracticedTest() { return $("//*[@class='font-16']")}

    get topicNameInsideTest() { return $("(//*[@class='practice_subHeading__1s3Rl'])[1]")}

    get questionLabelInsideTest() { return $("//*[@class='practice_questionHeader__38q7i']")}

    get btnEndPractice() { return $("//button[contains(text(),'End Practice')]")}

    get endPracticePopupHeading() { return $("//*[contains(text(),'Want to End Your Practice Session?')]")}

    get endPracticePopupsubHeading() { return $("//*[contains(text(),'Ending your practise session will restart your journey')]")}

    get btnCancelInEndPracticePopup() { return $("//button[contains(text(),'Cancel')]")}

    get btnEndPracticeInEndPracticePopup() { return $("//button[contains(text(),'End practice')]")}

    get apqPageSubHeader() { return $("//*[@class='analysis-subheader']")}

    get btnAnalyse() { return $("(//button[contains(text(),Analyse)])[1]")}

    get accuracyChart() { return $("(//*[@class='recharts-surface'] )[1]")}

    get timeSpentChart() { return $("(//*[@class='recharts-surface'] )[2]")}

    get btnViewAll() { return $("//a[@class='font-14 view-all-text']")}

    get btnBookmarksIcon() {return $ ("(//img[@alt='unbkmkimg'])[1]")}

    get ddrecentOldFilter() { return $("(//div[@class='custom-styler__indicator custom-styler__dropdown-indicator css-tlfecz-indicatorContainer'])[1]") }

    get ddsubjectFilter() { return $("(//div[@class='custom-styler__indicator custom-styler__dropdown-indicator css-tlfecz-indicatorContainer'])[2]") }

    get ddsubjectFilterAPQPage() { return $("//div[@class='custom-styler__indicator custom-styler__dropdown-indicator css-tlfecz-indicatorContainer']") }
    get btnBackToPractice() {return $ ("//button[text()='Back to Practice']")}

    get btnFilterDropDown(){return $("//*[contains(@class,'dropdown-indicator')]")}

    subjectNameOnCard(count){return $(`(//div[contains(@class,'chapter-subj')]/div/p)[${count}]`)}

    get selectedFilter(){return $("(//i[contains(@class,'mdi-filter-variant')]/following-sibling::div)[1]")}

    get ChapterNameOnFirstCard(){return $('(//div[contains(@class,"bookmarkStyles_question__")])[1]')}
    async singleTestFlow() {

        await this.moveToNextTestCard()
        expect(await this.btnStartPractice.waitForClickable({ timeout: 5000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(2000)
        await this.questionsHandling()
        await browser.pause(2000)
        await this.imgStage1AfterCompletion.waitForDisplayed({ timeout: 5000 })
    }


    async completeTestFlow() {
        await this.moveToNextTestCard()
        expect(await this.btnStartPractice.waitForClickable({ timeout: 5000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(6000)
        for (let j = 1; j < 6; j++) {
            console.log("j value is-", j)
            for (let i = 1; i <= 5; i++) {
                console.log("i value is -", i)
                if (await this.btnCheckBox.isDisplayed()) {
                    await this.btnCheckBox.click()
                }
                else if (await this.btnRadioOption.isDisplayed()) {
                    await this.btnRadioOption.click()
                }
                else if (await this.textbox.isDisplayed()) {
                    await this.textbox.setValue("abcd")
                }


                await this.btnSubmit.waitForClickable({ timeout: 5000 })
                await this.btnSubmit.click()
                await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
                await this.btnNextQuestion.click()
            }
            await browser.pause(4000)


            await this.btnResumePractice.moveTo()
            await this.btnResumePractice.click()
            await browser.pause(2000)
            //await this.imgStage1AfterCompletion.waitForDisplayed({ timeout: 5000 })
        }

    }

    async bookMarkFlow() {
        await this.moveToNextTestCard()
        expect(await this.btnStartPractice.waitForClickable({ timeout: 5000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(3000)
        let question
        for (let i = 1; i <= 3; i++) {
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            if (i == 3) {

                question = await this.labelQuestion.getText()

            }

            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
        }
        await browser.pause(2000)
        await DashboardPage.menuOption.click()
        await DashboardPage.btnAdaptivePracticeQuestions.click()
        await browser.pause(2000)
        await this.tabBookMark.click()
        await browser.pause(2000)
        let bookMarkQs = await $("(//*[@class='bookmarkStyles_question__3dU81'])[1]").getText()
        expect(question).toEqual(bookMarkQs)


    }

    async viewSolutionPopupValidation() {

        await DashboardPage.menuOption.click()
        await DashboardPage.btnAdaptivePracticeQuestions.click()
        await this.tabBookMark.waitForClickable({ timeout: 5000 })
        await this.tabBookMark.click()
        expect(await this.subjectNameInBookMarkCard.isExisting()).toEqual(true)
        let subjectNameInBookMarkCard = await this.subjectNameInBookMarkCard.getText()
        expect(await this.dateInBookMarkCard.isExisting()).toEqual(true)
        let dateInBookMarkCard = await this.dateInBookMarkCard.getText()
        dateInBookMarkCard = dateInBookMarkCard.slice(2, 12)
        expect(await this.questionInBookMarkCard.isExisting()).toEqual(true)
        let questionInBookMarkCard = await this.questionInBookMarkCard.getText()
        expect(await this.btnViewSolution.isExisting()).toEqual(true)
        await this.btnViewSolution.click()
        expect(await this.subjectNameInBookMarkPopup.isExisting()).toEqual(true)
        let subjectNameInBookMarkPopup = await this.subjectNameInBookMarkPopup.getText()
        expect(await this.dateInBookMarkPopup.isExisting()).toEqual(true)
        let dateInBookMarkPopup = await this.dateInBookMarkPopup.getText()
        expect(await this.questionInBookMarkPopup.isExisting()).toEqual(true)
        let questionInBookMarkPopup = await this.questionInBookMarkPopup.getText()
        expect(subjectNameInBookMarkCard).toEqual(subjectNameInBookMarkPopup)
        expect(dateInBookMarkCard).toEqual(dateInBookMarkPopup)
        expect(questionInBookMarkCard).toEqual(questionInBookMarkPopup)
        expect(await this.correctAnsBadge.isExisting()).toEqual(true)
        expect(await this.nextQuestion.isExisting()).toEqual(true)
        await this.nextQuestion.click()
        expect(await this.prevQuestion.isExisting()).toEqual(true)
        await this.prevQuestion.click()
        expect(await this.rightArrow.isExisting()).toEqual(true)
        await this.rightArrow.click()
        expect(await this.leftArrow.isExisting()).toEqual(true)
        await this.leftArrow.click()
        expect(await this.closeButton.isExisting()).toEqual(true)
        await this.closeButton.click()
    }

    async instructionPopupValidation() {
        const totalSubjects=await this.totalSubjectCard.length
        for(let i=1;i<=totalSubjects;i++){
            const subject=await this.btnFirstSubjectCard(i)
            await subject.click()
            await browser.pause(2000)
            const startPractice=await this.btnStartPractice.isDisplayed()
            if(startPractice == true){
                expect(await this.btnStartPractice.waitForClickable({ timeout: 5000 }))
                await this.btnStartPractice.click()
                break;
            }else{
               await browser.back()
            }
        }        

        await $("//div[text()='Instructions']").waitForDisplayed({timeout:5000})
        expect(await $("//div[text()='Instructions']").isDisplayed()).toEqual(true)
        expect(await $('//ul[@class="apqinstruction_insBulletPoints__2KYEQ"]').isDisplayed()).toEqual(true)
        expect(await this.btnStartTest.isDisplayed()).toEqual(true)
    }

    async resumeTestFlow() {

        expect(await this.resumeButton.isExisting()).toEqual(true)
        let recentlyPractisedTest = (await this.recentlyPracticedTest.getText()).trim()
        await this.resumeButton.click()
        let testNameInsideTestPage = (await this.topicNameInsideTest.getText()).trim()
        expect(await (recentlyPractisedTest)).toEqual(testNameInsideTestPage)
        await this.questionsHandling() 
    }

    async resumeTestEndPracticeFlow() {
       
        expect(await this.resumeButton.isExisting()).toEqual(true)
        await this.resumeButton.click()
        expect(await this.btnEndPractice.waitForClickable({timeout : 5000})).toEqual(true)
        await this.btnEndPractice.click()
        expect(await this.endPracticePopupHeading.isExisting()).toEqual(true)
        expect(await this.endPracticePopupsubHeading.isDisplayed()).toEqual(true)
        await this.btnCancelInEndPracticePopup.click()
        await this.btnEndPractice.click()
        await this.btnEndPracticeInEndPracticePopup.waitForClickable({timeout:25000})
        await this.btnEndPracticeInEndPracticePopup.click()
        await browser.pause(2000)
        expect(await this.apqPageSubHeader.isExisting()).toEqual(true)
    }
    

    async questionsHandling() {

        for (let i = 1; i <= 5; i++) {
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
            }

            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()
            if( i==1)
            {
              await this.btnViewSolution.click()  
            }
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
        }
    }

    async toolTipValidation(chart,counter,status)
    {
        let className = await $("(//*[@class='recharts-wrapper']//div)[1]").getAttribute("class")
        let visibilityStatus = await $("//*[@class='"+className+"']").getAttribute("style")
        console.log("@@@@",visibilityStatus)
        let flag = visibilityStatus.includes("visibility: "+status+"")
        let count = await $$("//*[contains(text(),'"+chart+"')]")
        await expect(count.length).toEqual(counter)
        if(chart == "Accuracy")
        {
            await expect(flag).toEqual(true)
        }
       
    }

    async startAndEndPracticeFlow() {

        expect(await this.btnFirstSubjectCard(1).waitForClickable({ timeout: 45000 }))
        await this.btnFirstSubjectCard(1).click()
        //await browser.pause(3000)
        expect(await this.btnStartPractice.waitForClickable({ timeout: 45000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(2000)
       
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
            }

            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()           
            await this.btnViewSolution.click()           
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
            expect(await this.btnEndPractice.waitForClickable({timeout : 5000})).toEqual(true)
            await this.btnEndPractice.click()
        
    }
    async startTestAndBookMArkQuestion() {

        expect(await this.btnFirstSubjectCard(1).waitForClickable({ timeout: 45000 }))
        await this.btnFirstSubjectCard(1).click()
        //await browser.pause(3000)
        expect(await this.btnStartPractice.waitForClickable({ timeout: 45000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(2000)
        await this.btnBookMark.waitForClickable({ timeout: 5000 })
        await this.btnBookMark.click()
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
            }
            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()           
            await this.btnViewSolution.click()           
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
            expect(await this.btnEndPractice.waitForClickable({timeout : 5000})).toEqual(true)
            await this.btnEndPractice.click()
            await this.btnEndPracticeInEndPracticePopup.waitForClickable({ timeout: 5000 })
            await this.btnEndPracticeInEndPracticePopup.click()
        
    }

    
    async navigateToAPQAndPageLoad(cohortDetail) {

        await DashboardPage.menuOption.waitForClickable({ timeout: 15000 })
        await DashboardPage.menuOption.click()
        await browser.pause(1000)

        if (loginData.apqNotApplicable.includes(cohortDetail)) {

            expect(await DashboardPage.btnAdaptivePracticeQuestions.isDisplayed()).toEqual(false)
        }
        else {
            await DashboardPage.btnAdaptivePracticeQuestions.waitForDisplayed({ timeout: 3500 })
            await DashboardPage.btnAdaptivePracticeQuestions.click()

            await browser.pause(3000)

           // expect(await this.pageTitle.waitForDisplayed({ timeout: 5000 }))
           // expect(await this.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 }))

        }

    }

   // This method will help to iterate the subject cards till start Practice button is displyed
    async moveToNextTestCard() {

        let question,testAvailable
        expect(await this.btnFirstSubjectCard(1).waitForClickable({ timeout: 5000 }))
        let totalSubject = await $$("(//*[@class='subject-img'])")
             
        for(let i=1;i<=totalSubject.length;i++)
        {
          
            await (await $("(//*[@class='subject-img'])["+i+"]")).click()
            await browser.pause(3000)
            try{
                await (await this.btnStartPractice).waitForDisplayed({timeout :5000})
            }
        catch
        {
          //dothing
        }
            if(await this.btnStartPractice.isDisplayed() == false)
            {
                await browser.back()
                await (await $("(//*[@class='subject-img'])["+i+"]")).waitForDisplayed({timeout : 5000})
                
            }  
            else {
                break
            }   } 
    }
    async startAndEndPracticeForTouchPoint() {

        expect(await this.btnFirstSubjectCard(2).waitForClickable({ timeout: 45000 }))
        await this.btnFirstSubjectCard(2).click()
        try{await this.resumeButton.waitForDisplayed({timeout:2500})}catch{}
        if (await this.resumeButton.isDisplayed({timeout:3500})){
            await this.resumeButton.click()
        }
        else{
            await this.btnStartPractice.waitForDisplayed({ timeout: 45000 })
            await this.btnStartPractice.click()
            expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
            await this.btnStartTest.click()
        }
        await browser.pause(2000)
       
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
            }

            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()           
            await this.btnViewSolution.click()           
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
            expect(await this.btnEndPractice.waitForClickable({timeout : 5000})).toEqual(true)
            await this.btnEndPractice.click()
            await $("//button[contains(text(),'End practice')]").waitForDisplayed({timeout:2500})
            await $("//button[contains(text(),'End practice')]").click()
        
    }

    async bookMarkFlowViewSolutionPopUp() {
        await this.moveToNextTestCard()
        expect(await this.btnStartPractice.waitForClickable({ timeout: 5000 }))
        await this.btnStartPractice.click()
        expect(await this.btnStartTest.waitForClickable({ timeout: 5000 }))
        await this.btnStartTest.click()
        await browser.pause(3000)
        let question
        for (let i = 1; i <= 5; i++) {
            if (await this.btnCheckBox.isDisplayed()) {
                await this.btnCheckBox.click()
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            else if (await this.btnRadioOption.isDisplayed()) {
                await this.btnRadioOption.click()
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            else if (await this.textbox.isDisplayed()) {
                await this.textbox.setValue("abcd")
                await this.btnBookMark.waitForClickable({ timeout: 5000 })
                await this.btnBookMark.click()
            }
            if (i == 1) {

                question = await this.labelQuestion.getText()

            }

            await this.btnSubmit.waitForClickable({ timeout: 5000 })
            await this.btnSubmit.click()
            await this.btnNextQuestion.waitForClickable({ timeout: 5000 })
            await this.btnNextQuestion.click()
        }
        await browser.pause(2000)

    }

}

export default new AdaptivePracticeQuestionsPage();