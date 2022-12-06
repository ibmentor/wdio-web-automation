import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import TutorOnDemandPage from "../../Pages/TutorOnDemandPage"
import { dashboardData } from "../../Data/DashboardData"
import NudgesPage from "../../Pages/NudgesPage"
describe.skip('Tutor On Demand',async () => {
    it('323362 TC-01 Validate "Type your doubt" in Ask a doubt Pop up',async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        allure.startStep("Validate TOD module",true)
        await NudgesPage.nudgesTimerPopup()
        await TutorOnDemandPage.navigateToTOD()
        allure.startStep("Validate Connect A Tutor CTA on TOD Page",true)
        await TutorOnDemandPage.btnConnectATutor.click()
        allure.startStep("Validate Ask A Doubt Card",true)
        await TutorOnDemandPage.askADoubtCard.click()
        await TutorOnDemandPage.btnBack.click()
        await TutorOnDemandPage.askADoubtCard.click()
        expect(await TutorOnDemandPage.UploadSection.isDisplayed({ timeout:10000 })).toEqual(true)
        allure.startStep("Validate Type Your Doubt section",true)
        await TutorOnDemandPage.txtTypeYourDoubt.click()
        await TutorOnDemandPage.txtTypeYourDoubt.waitForClickable({ timeout:5000 })
        await TutorOnDemandPage.txtTypeYourDoubt.click()
        var text = "type"
        await TutorOnDemandPage.txtTypeYourDoubt.setValue(text)
        await TutorOnDemandPage.btnCountine.click()
        await TutorOnDemandPage.btnSubjectCard.click()
        await TutorOnDemandPage.btnCountine.click()
        await TutorOnDemandPage.txtAskedQuestion.waitForDisplayed({ timeout:6000 })
        expect(await TutorOnDemandPage.txtAskedQuestion.getText()).toHaveTextContaining(text)
        const AskStatus = await TutorOnDemandPage.txtTutorStatusOnASk.getText()
        if(AskStatus == 'Wait time: 2 mins'){
            await TutorOnDemandPage.btnCountine.click()
            await TutorOnDemandPage.textPermissionRequired.waitForDisplayed({timeout: 5000})
            expect(await TutorOnDemandPage.textPermissionRequired.isDisplayed()).toEqual(true)
            expect(await TutorOnDemandPage.textCameraAccess.isDisplayed()).toEqual(true)
            expect(await TutorOnDemandPage.textMicAccess.isDisplayed()).toEqual(true)
        }
        else{
            expect(AskStatus).toHaveTextContaining('Only available')
        }
        /*  await TutorOnDemandPage.btnCameraAllow.waitForClickable({ timeout:6000 })
        await TutorOnDemandPage.btnCameraAllow.click()
        await browser.pause(5000)
        //await browser.acceptAlert()
        await TutorOnDemandPage.btnMicAllow.waitForClickable({ timeout:6000 })
        await TutorOnDemandPage.btnMicAllow.click()
        await browser.pause(5000)
        await TutorOnDemandPage.txtConnectTutorTime.waitForDisplayed({ timeout:5000 })
        expect(TutorOnDemandPage.txtConnectTutorTime.getText()).toHaveTextContaining('2')
        await TutorOnDemandPage.btnOkey.click()
        await TutorOnDemandPage.btnMaximize.waitForClickable({ timeout:5000 })
        await TutorOnDemandPage.btnMaximize.click()
        expect(await TutorOnDemandPage.btnMinimize.isClickable({ timeout:5000 })).toEqual(true)
        await TutorOnDemandPage.btnCacel.click()
        expect(await $("(//div[contains(text(),'"+text+"')])[1]").getText()).toHaveTextContaining(text)
    */
        allure.endStep()
    })

    it('323353 TC-02 Validate the TOD Home page for an existing user',async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        allure.startStep("Validate TOD module",true)
        await NudgesPage.nudgesTimerPopup()
        await TutorOnDemandPage.navigateToTOD()
        allure.startStep("Validate Filter CTA and Text",true)
        if(await TutorOnDemandPage.btnFilter.isDisplayed() == true)
        {
            await TutorOnDemandPage.btnFilter.click()
            await TutorOnDemandPage.labelFilterPopup.waitForDisplayed({ timeout:5000 })
            allure.startStep("Validate Filter section flow",true)
            expect(await TutorOnDemandPage.labelFilterPopup.getText()).toHaveTextContaining("Filters")
            let result1 = await TutorOnDemandPage.btnShowResult.getText() 
            await TutorOnDemandPage.btnFirstSubjectCard.click()
            let result2 = await TutorOnDemandPage.btnShowResult.getText()
            expect(TutorOnDemandPage.askedDoubtCount(result1) != TutorOnDemandPage.askedDoubtCount(result2)).toEqual(true)
            let text1 = await TutorOnDemandPage.btnFirstSubjectCard.getText()
            await TutorOnDemandPage.btnShowResult.click()
            await TutorOnDemandPage.txtFilteredSubject.waitForDisplayed({ timeout:10000 })
            let text2 = await TutorOnDemandPage.txtFilteredSubject.getText()
            expect(text1 === text2).toEqual(true)
            await TutorOnDemandPage.btnFilter.click()
            let result3 = await TutorOnDemandPage.btnShowResult.getText() 
            await TutorOnDemandPage.btnClearAll.click()
            let result4 = await TutorOnDemandPage.btnShowResult.getText()
            expect(TutorOnDemandPage.askedDoubtCount(result3) != TutorOnDemandPage.askedDoubtCount(result4)).toEqual(true)
        }
        else{
            allure.startStep("Validate No Test Available Block", true)
            const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
            if (err) throw err;
            })
            expect("No test data available").toEqual("")
        }
            allure.endStep()
    })

    it('333677 TC_03 Validate the "Understand a Concept" Card in I want to Pop up',async () => {
        allure.startStep("Change cohert details.", true);
        await ProfilePage.changeCohortDetail(dashboardData.dashboardElementValidation.cohortDetails[2][4], 'todUser')
        allure.startStep("Validate TOD module",true)
        await NudgesPage.nudgesTimerPopup()
        await TutorOnDemandPage.navigateToTOD()
        await TutorOnDemandPage.btnConnectATutor.waitForDisplayed({ timeout: 15000 })
        await TutorOnDemandPage.btnConnectATutor.click()
        allure.startStep("Understand A Concept Card flow",true)
        await TutorOnDemandPage.understandAConceptCard.click()
        const status = await TutorOnDemandPage.txtTutorStatus.getText()
        if(status == 'Tutors unavailable'){
            const count = await $$("(//div[contains(text(),'Tutors unavailable')])")
            for(let i=1; i<=count.length;i++){
                expect(await TutorOnDemandPage.txtTutorStatus1(i).getText()).toHaveTextContaining('Tutors unavailable')
            }
        }else{
            await TutorOnDemandPage.ConceptCardMathematics.click()
            await TutorOnDemandPage.btnFirstTopic.click()
            await TutorOnDemandPage.btnConnect.click()
            await TutorOnDemandPage.textPermissionRequired.waitForDisplayed({timeout: 5000})
            expect(await TutorOnDemandPage.textPermissionRequired.isDisplayed()).toEqual(true)
            expect(await TutorOnDemandPage.textCameraAccess.isDisplayed()).toEqual(true)
            expect(await TutorOnDemandPage.textMicAccess.isDisplayed()).toEqual(true)
        }
        allure.endStep()
    });
    
})
