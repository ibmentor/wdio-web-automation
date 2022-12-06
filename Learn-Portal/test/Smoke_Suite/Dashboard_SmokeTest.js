import { AllureUtil as allure } from "../../utils/util.allure"
import LoginPage from "../../Pages/LoginPage"
import ProfilePage from "../../Pages/ProfilePage"
import DashboardPage from "../../Pages/DashboardPage"
import { dashboardData } from "../../Data/DashboardData"
import ConceptVideoPage from "../../Pages/ConceptVideoPage"
import AskADoubtPage from "../../Pages/AskADoubtPage"

describe("Learn Portal - Dashboard module cases for free user", async () => {


    it("316022 TC_01 Free user - Validate FAQ section of download app page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await LoginPage.loginToLearnPortal('free')
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 10000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("Validate FAQ section is displayed")
        await DashboardPage.labelFAQ.waitForDisplayed({ timout: 5000 })

        for (let i = 1; i <= 2; i++) {
            await $("(//*[@class='rounded-circle downloadApp_arrowStyle__3jK0J'])[" + i + "]").click()
            await $("(//*[@class='downloadApp_faqexpandTitle__2xaOP'])[" + i + "]").waitForDisplayed({ timeout: 5000 })
            let qs = await $("(//*[@class='downloadApp_faqexpandTitle__2xaOP'])[" + i + "]").getText()
            expect(await qs).toEqual(dashboardData.FAQ.questions[i - 1])
            await $("(//*[@class='downloadApp_faqAns__1By9a collapse show'])[" + i + "]").waitForDisplayed({ timeout: 5000 })
            let ans = await $("(//*[@class='downloadApp_faqAns__1By9a collapse show'])[" + i + "]").getText()
            expect(await ans).toHaveTextContaining(dashboardData.FAQ.answers[i - 1])
        }
        allure.endStep();
    })

    it("316023 TC_02 Free user - Validate appliaction navigates to google play store and appstore for download page", async () => {

        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        allure.startStep("Click on Download app icon", true)
        await DashboardPage.btnDownloadApp.waitForClickable({ timeout: 10000 })
        await DashboardPage.btnDownloadApp.click()
        allure.startStep("Validate Google Store  section is displayed", true)
        await DashboardPage.btnGooglePlayStore.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnGooglePlayStore.click()
        let handles1 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[0]))
        await browser.closeWindow()
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles1[0]);
        allure.startStep("Validate App Store button is displayed")
        await DashboardPage.btnAppleStore.waitForClickable({ timeout: 5000 })
        await DashboardPage.btnAppleStore.click()
        let handles2 = await browser.getWindowHandles();
        expect(await browser.switchWindow(dashboardData.linksForDownload[1]))
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles2[0]);
        allure.endStep();
    })

    it("316024 TC_03 Free user - Check a button book your trial CTA button is not availabe for cohort 1 ", async () => {
        allure.startStep("Change cohort to 1st", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][0], 'free')
        allure.startStep("Validates book your trial button is not displayed for cohert 1st ", true)
        await browser.pause(6000)//waits for the page to load        
        expect(await DashboardPage.btnbookYourTrialClasses.isDisplayed()).toEqual(false)
        allure.endStep();
    })

    it("316027 TC_05 Free user - Check Akash live classes should display above cohort 10th ", async () => {
        allure.startStep("Change cohort to JEE class", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][8], 'free')
        allure.startStep("Click on Book your free Trial button", true);
        await DashboardPage.btnbookYourTrialClasses.waitForDisplayed({ timeout: 10000 })
        await DashboardPage.btnbookYourTrialClasses.click()
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.startStep('Click on back window button', true);
        await browser.back();
        allure.startStep("Click on Book a free Trial button from CTA card", true);
        await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({ timeout: 25000 })
        await browser.pause(500)
        await DashboardPage.btnbookaFreeTrialCTA.scrollIntoView({ block: "center" })
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep('Verify Aakash live classes', true);
        await DashboardPage.imgAakashOnline.waitForDisplayed({ timeout: 15000 })
        expect(await DashboardPage.imgAakashOnline.isDisplayed()).toEqual(true)
        allure.endStep();
    })

    
    it('319778 TC_19 Free user - Validate the book a class CTA',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("click on book a class button", true)
        if(await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({timeout:15000})){
        await DashboardPage.btnbookaFreeTrialCTA.waitForClickable({timeout:3000})
        await DashboardPage.btnbookaFreeTrialCTA.click()
        allure.startStep('The "book a class" CTA state of the card animation changes to "Join now" CTA',true)
        await DashboardPage.btnJoinNow.waitForDisplayed({timeout:10000})
        expect(await DashboardPage.btnJoinNow.isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.btnJoinNow.waitForDisplayed({timeout:10000})
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
    });

    it('319779 TC_25 Free user - validate the Join now CTA ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("balidate join now button",true)
        await browser.pause(6000)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()){
            await DashboardPage.btnbookaFreeTrialCTA.click()
        }
        else if(await DashboardPage.btnJoinNow.isDisplayed() == true){
        expect(await DashboardPage.btnJoinNow.waitForDisplayed({timeout:5000})).toEqual(true)
        await DashboardPage.validateJoinNowButtonBasedOnTheTimeInCard()
    }else {
        await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({timeout:5000})
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

    it('318901 TC_20 Free user - Verify the functionality of "View all centres" on BTC card ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("click on view all centre button",true)
        await browser.pause(5000)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        expect(await DashboardPage.btnViewAllCentre.isDisplayed()).toEqual(true)
        await DashboardPage.btnViewAllCentre.waitForClickable({timeout:5000})
        await DashboardPage.btnViewAllCentre.click()
        allure.startStep("verify view all centres pop up is getting display",true)
        expect(await DashboardPage.viewAllCentrePopUp.isDisplayed()).toEqual(true)
        }else {
            await DashboardPage.tfBookingSuccessMessage.waitForDisplayed({timeout:5000})
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
    });

    
    it('318899 TC_23 Free user - Verify the request call back functionality On BTC card ',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("click on view all centre button",true)
        await browser.pause(5000)
        if(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed() == true){
        allure.startStep("click on request call back button", true)
        await DashboardPage.btnRequestACallBackOnMainPage.waitForClickable({timeout:3000})
        await DashboardPage.btnRequestACallBackOnMainPage.click()
        await browser.pause(3000)// time to page load
        allure.startStep("Verify booking successfull message ",true)
        expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed()).toEqual(true)
        }else{
            expect(await DashboardPage.tfBookingSuccessMessage.isDisplayed({timeout:5000})).toEqual(true)
            expect(await DashboardPage.btnRequestACallBackOnMainPage.isDisplayed()).toEqual(false)
        }
        allure.endStep()
    });

    

    it('319773 TC_27 Free user - Validate the Neo class banner',async () => {
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][3], 'free')
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("Validate Dashboard page",true)
        await browser.pause(5000)
        if(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed() == true){
            allure.startStep("Validate Neo Class banner",true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed",true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
        }else {
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

    it('319775 TC_28 Free user - Validate the book a class card in neo class banner',async () => {
        await browser.reloadSession()
        allure.startStep("Login to Learn Portal", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'free')
        await browser.pause(5000)
        await browser.keys(["PageDown"])
        await DashboardPage.labelByjusWorld.waitForDisplayed({timeout:10000})
        allure.startStep("Validate Dashboard page",true)
        if(await DashboardPage.btnbookaFreeTrialCTA.waitForDisplayed({timeout:15000})){
            allure.startStep("Validate Neo Class banner",true)
            expect(await DashboardPage.btnbookaFreeTrialCTA.isDisplayed()).toEqual(true)
            allure.startStep("validate subject name is displayed",true)
            expect(await DashboardPage.subjectNameOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate subject topic is displayed",true)
            expect(await DashboardPage.subjectTopicOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate date is displayed",true)
            expect(await DashboardPage.DateOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate time is displayed",true)
            expect(await DashboardPage.TimeOnBTCCard.isDisplayed()).toEqual(true)
            allure.startStep("validate view more slots button is displayed",true)
            expect(await DashboardPage.btnViewMoreSlots.isDisplayed()).toEqual(true)
        }else {
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

    
    it('323278 TC_40 Free user - Verify dashboard design for Free users from grade 4th to 10th',async () => {
        allure.startStep("Login to Learn Portal", true);
        const cohortDetails=dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails.length
        for(let i=0;i<cohortDetails;i++)
        {
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[i], 'free')
        await DashboardPage.dayGreetingText.waitForDisplayed({timeout:10000})
        expect(await DashboardPage.dayGreetingText.isDisplayed()).toEqual(true)
        await browser.pause(5000)
        const neoLogoDisplayed=await DashboardPage.neoLogo.isDisplayed()
        if(neoLogoDisplayed)
        {
            await browser.keys(["PageDown"])
        }
        await browser.keys(["PageDown"])
        await DashboardPage.byjusTutionCenterLogo.scrollIntoView(true)
        await browser.pause(3000)
        await DashboardPage.byjusTutionCenterLogo.waitForDisplayed({timeout:20000})
        expect(await DashboardPage.byjusTutionCenterLogo.isDisplayed()).toEqual(true)
        await DashboardPage.byjusAppDownloadLogo.waitForDisplayed({timeout:20000})
        expect(await DashboardPage.byjusAppDownloadLogo.isDisplayed()).toEqual(true)
        expect(await DashboardPage.askADoubtWidget.isDisplayed()).toEqual(true)
        expect(await DashboardPage.adaptiveTestWidget.isDisplayed()).toEqual(true)
        await DashboardPage.menuOption.click()
        await browser.pause(2000)
        const downloadBtn=await DashboardPage.btnDownloads.isDisplayed()
        if(downloadBtn){
            await DashboardPage.menuOption.click()
            await browser.pause(2000)
            expect(await DashboardPage.downloadsWidget.isDisplayed()).toEqual(true)
        }
        }
        
    })


    it('323274 TC_36 Paid user - Verify explore widget for paid users from grade 4-10 is not displayed',async () => {
        allure.startStep("Login to Learn Portal", true);
        await browser.reloadSession()
        await LoginPage.loginToLearnPortal('paid')
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsFor4th_10thGrade.cohortDetails[4], 'paid') //Premium Cohort
        await DashboardPage.chooseSubjTitle.waitForDisplayed({timeout:10000})
        expect(await DashboardPage.exploreTitle.isDisplayed()).toEqual(false)   
    })

})