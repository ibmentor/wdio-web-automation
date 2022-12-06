import { AllureUtil as allure } from "../../../utils/util.allure"
import ProfilePage from "../../../Pages/ProfilePage";
import { byjusclassData } from "../../../Data/ByjusClassData";
import ByjusClassesPage from "../../../Pages/ByjusClassesPage";



describe("Learn Portal - Byjus Class test cases", async () => {

    it("306458 TC_01 Free user - Validation for first time user is able to book free trial class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[3], 'newuser')
        allure.startStep("Check the tick mark of Book a freetrail class", true)
        var result= await ByjusClassesPage.trailClassTickMark.isDisplayed({ timeout:5000 })
        allure.startStep("First time user should be untick", true)
        if(result == false){
            allure.startStep("Click on the Free Trial Class button on Dashboard", true)
            await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
            const subjectlist= byjusclassData.Class.subjectName.length
            for(let i= 1;i<= subjectlist; i++){
                allure.startStep("Change the Subject", true)
                const subName= byjusclassData.Class.subjectName[i-1]
                await browser.pause(2000)
                allure.startStep("Check the subject availabelity on Byjus classes main page", true)
                var result= await $("//*[contains(text(),'"+subName+"')]").isDisplayed()
                if(result == true){
                    await (await ByjusClassesPage.btnBookClass).scrollIntoView()
                    allure.startStep("Select first slot", true)
                    await (await ByjusClassesPage.btnslotstime).click()
                    allure.startStep("Click on Book button", true)
                    await (await ByjusClassesPage.btnBookClass).click()
                    await browser.pause(2000)
                    allure.startStep("Check the Success massage", true)
                    expect(await ByjusClassesPage.labelBookedSuccess.isDisplayed({timeout:15000})).toEqual(true)
                    break;
                }
            }
            allure.startStep("Click on Homepage button in sidebar", true)
            await (await ByjusClassesPage.btnHomePage).click()
            await browser.pause(4000)
            allure.startStep("Check the tick mark on Personalization section", true)
            expect(await ByjusClassesPage.trailClassTickMark.isDisplayed()).toEqual(true)
        }
    })
    it("306459 TC_02 Free user - Validate All user is able to book Master class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[9], 'newuser')
        allure.startStep("Click on Byjus Class in side bar", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check master class is able to book", true)
        var result= await ByjusClassesPage.labelMasterClass.isDisplayed({timeout:20000})
        if(result){
            allure.startStep("Click on Book button", true)
            await (await ByjusClassesPage.btnMasterClassBook).click()
            await browser.pause(2000)
            allure.startStep("Check the Success massage", true)
            expect(await ByjusClassesPage.labelBookedSuccess.isDisplayed({timeout:15000})).toEqual(true) 
        }
    })

    it("306460 TC_03 Free user - Validate Remaind me popup after booking the class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[3], 'newuser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check master class is able to book", true)
        await ByjusClassesPage.labelMasterClass.scrollIntoView()
        var result= await ByjusClassesPage.labelMasterClass.isDisplayed({timeout:20000})
        if(result){
            allure.startStep("Click on Book button", true)
            await ByjusClassesPage.btnMasterClassBook.waitForClickable({ timeout:15000 })
            await (await ByjusClassesPage.btnMasterClassBook).click()
        }
        allure.startStep("Check the Remaind me Button", true) 
        await ByjusClassesPage.btnRmaindMe.waitForClickable({timeout:15000})
        await ByjusClassesPage.btnRmaindMe.click()
        allure.startStep("Check the Mobile number in Remind me Popup", true) 
        expect(await ByjusClassesPage.labelRemaindMePopupHeader.isDisplayed({timeout: 15000})).toEqual(true)
        expect(await ByjusClassesPage.labelMobileNumber.getText()).toHaveTextContaining('+91-'+ByjusClassesPage.PhoneNumber) 
        allure.startStep("Check the Cancel button in the remaind me popup", true) 
        expect(await ByjusClassesPage.btnRemaindMeCancel.isDisplayed({timeout: 15000})).toEqual(true)
        allure.startStep("Check the Submit button is clickable are not", true) 
        await ByjusClassesPage.btnRemaindMeSubmit.waitForClickable({timeout: 15000})
        await ByjusClassesPage.btnRemaindMeSubmit.click()
        await ByjusClassesPage.labelMasterClass.scrollIntoView()
        allure.startStep("Check the Remaind me button is displayed in the Class card/Not", true) 
        expect(await ByjusClassesPage.btnMainRemaindMe.isDisplayed({timeout:15000})).toEqual(false)
    })

    it("306461TC_04 Free user - Validate User have run out of the free trials", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[9], 'free')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        var result= await ByjusClassesPage.labelremainingslots.isDisplayed({timeout:15000})
        if(result == false){
            allure.startStep("Check the content of run out of free trial", true)
            expect(await ByjusClassesPage.labelRequestCallBack.getText()).toHaveTextContaining("you've run out of free trials")
        }
    })

    it("306462 TC_05 Free user - Validate User don't have the Class", async () => {
        allure.startStep("Change the cohort", true)
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[10], 'newuser')
        allure.startStep("Navigate to Byjus Class Page", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Check the User have class or not", true)
        var result= await ByjusClassesPage.labelremainingslots.isDisplayed({timeout:15000})
        if(result == false){
            allure.startStep("Check the content of no class available page", true)
            await ByjusClassesPage.labelRequestCallBack.scrollIntoView()
            expect(await ByjusClassesPage.labelRequestCallBack.getText()).toHaveTextContaining("there are no classes to book")
        }
    })

    it("306463 TC_06 Free user - Land on Byju's Classes and Rebook the missing class", async () => {
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[4],'newuser')
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnRebookClass.scrollIntoView()
        await ByjusClassesPage.btnRebookClass.isDisplayed({ timeout:45000 })
        allure.startStep("Click on Rebook Class button", true)
        await ByjusClassesPage.btnRebookClass.click()
        await ByjusClassesPage.btnslotstime.waitForClickable({ timeout:25000 })
        allure.startStep("Select Second slot", true)
        await ByjusClassesPage.btnslotstime.click()
        allure.startStep("Click on Book button", true)
        await ByjusClassesPage.btnBookClass.click()
        allure.startStep("Check the Success massage", true)
        expect(await ByjusClassesPage.labelBookedSuccess.isDisplayed({timeout:45000})).toEqual(true)
    })
 
    it("306464 TC_07 Free user - Check the event for Join Now button", async () => {
        await ProfilePage.changeCohortDetail(byjusclassData.cohortDetailsForBookTrialValidation.cohortDetails[5],'newuser')
        allure.startStep("Click on Byju's Classes",true)  
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnJoinNow.scrollIntoView()
        expect(await ByjusClassesPage.btnJoinNow.isClickable({ timeout:45000 })).toEqual(true)
        allure.startStep("Click on Join Now", true) 
        await ByjusClassesPage.btnJoinNow.click()
    })

})