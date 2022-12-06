import { AllureUtil as allure } from "../../utils/util.allure"
import ProfilePage from "../../Pages/ProfilePage"
import { dashboardData } from "../../Data/DashboardData"
import NudgesPage from "../../Pages/NudgesPage"
import cloudWatchLoginPage from "../../Pages/CloudWatchPage"
import { getUserId } from "../../utils/function"
let localData = require('../../Data/OLAP_data/nudges_OLAP_Data.json')
let userID = null

describe('Learn Portal - Nudges module cases for Neo user -Event Triggering script (15 - 30 Mins)', () => {

    it('335492 TC_01 Validate the U_event_id 9202128 , m_desc click reminder bell', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        console.log(userID,"&&&&&&&&&&&&&&&&&");
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
    });
    
    it('335493 TC_02 Validate the U_event_id 9202129 , m_desc class reminder pop up', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
    });
    it('335493 TC_03 Validate the U_event_id 9202130 , m_desc class click remind me in 15mins', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnRemindMe.waitForDisplayed({ timeout: 8000 })
        await NudgesPage.btnRemindMe.click()
    });

    it('335493 TC_06 Validate the U_event_id 9202133 , m_desc class click remind me in 15mins', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        await NudgesPage.preVerificationOfNudgeWindow()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnNudges.click()
    }); //not getting triggered
    it('335493 TC_04 Validate the U_event_id 9202131 , m_desc click dismiss 30 or 15 mins', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnNudges.click()
    });
    it('335500 TC_09 Validate the U_event_id 9202136 , m_desc click Prepare for the class', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnRemindMe.waitForDisplayed({ timeout: 8000 })
        await NudgesPage.btnRemindMe.click()
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnPrepareForClass.waitForDisplayed({timeout:3500})
        await NudgesPage.btnPrepareForClass.click()
    });
    
});

describe('Learn Portal - Nudges module cases for Neo user -Event Triggering script (0 - 15 Mins)', () => {
    
    it('335499 TC_08 Validate the U_event_id 9202135 , m_desc click reminder me once class starts', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.labelRemindMeOnceClassStart.waitForDisplayed({timeout:3500})
        await NudgesPage.labelRemindMeOnceClassStart.click()
    }); //not getting triggered
    it('335493 TC_07 Validate the U_event_id 9202134 , m_desc click join now in reminder bell', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnJoinClassNow.waitForDisplayed({timeout:3500})
        await NudgesPage.btnJoinClassNow.click()
    }); //not getting triggered
});

describe('Learn Portal - Nudges module cases for Neo user -Event Triggering script (post class start)', () => {
    
    it('335496 TC_05 Validate the U_event_id 9202132 , m_desc click dismiss join now', async () => {
        allure.startStep("Change cohort to 8th", true);
        await ProfilePage.changeCohortDetail(dashboardData.cohortDetailsForBookTrialValidation.cohortDetails[0][5], 'neo')
        await NudgesPage.preVerificationOfNudgeWindow()
        userID = await getUserId()
        await NudgesPage.preVerificationOfNudgeWindow()
        try { await NudgesPage.btnNudges.waitForDisplayed({ timeout: 8000 }) } catch { }
        await NudgesPage.btnNudges.click()
        await NudgesPage.btnNudges.click()
    }); //event not reflecting on cloudwatch
})

describe('Learn Portal - Nudges module cases for Neo user -Comparing Olap Data with Cloudwatch',async () => {
    
    afterEach("Reload new broswer session", async () => {
        await browser.reloadSession()

    })
    it('335492 OLAP - U_event_id 9202128',async () => {
        allure.startStep("Click reminder bell event triggered - 9202128", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202128", userID, localData)).toEqual(true)
        allure.endStep()        
    });

    it('335493 OLAP - U_event_id 9202129',async () => {
        allure.startStep("Click reminder bell event triggered - 9202129", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202129", userID, localData)).toEqual(true)
        allure.endStep()        
    });

    it('335493 OLAP - U_event_id 9202130',async () => {
        allure.startStep("click remind me in 15mins event triggered - 9202130", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202130", userID, localData)).toEqual(true)
        allure.endStep()        
    });

    it('335493 OLAP - U_event_id 9202131',async () => {
        allure.startStep("click dismiss 30 or 15 mins event triggered - 9202131", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202131", userID, localData)).toEqual(true)
        allure.endStep()
    });

    it('335496 OLAP - U_event_id 9202132',async () => {
        allure.startStep("click dismiss join now event triggered - 9202132", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202132", userID, localData)).toEqual(true)
        allure.endStep()   
    });

    it('335497 OLAP - U_event_id 9202133',async () => {
        allure.startStep("click dismiss start preparing event triggered - 9202133", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202133", userID, localData)).toEqual(true)
        allure.endStep()    
    });

    it('335493 OLAP - U_event_id 9202134',async () => {
        allure.startStep("click join now in reminder bell event triggered - 9202134", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202134", userID, localData)).toEqual(true)
        allure.endStep()   
    });
    it('335499 OLAP - U_event_id 9202135',async () => {
        allure.startStep("click reminder me once class starts event triggered - 9202135", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202135", userID, localData)).toEqual(true)
        allure.endStep()   
    });
    it('335500 OLAP - U_event_id 9202136',async () => {
        allure.startStep("click Prepare for the class event triggered - 9202136", true)
        expect(await cloudWatchLoginPage.getAndCompareCloudwatchDataNudges("9202136", userID, localData)).toEqual(true)
        allure.endStep()   
    });
    
});
