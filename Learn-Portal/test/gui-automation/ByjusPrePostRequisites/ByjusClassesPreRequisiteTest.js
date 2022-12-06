import { AllureUtil as allure } from "../../../utils/util.allure"
import ByjusClassesPage from "../../../Pages/ByjusClassesPage";
import LoginPage from "../../../Pages/LoginPage";
import ProfilePage from "../../../Pages/ProfilePage";
import { loginData } from "../../../Data/LoginData";

describe("Learn Portal - Byjus Class pre post test cases", async () => {
   
    it("312276 TC_01 Paid user - Verify the page loading time for Pre/Post requisites", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnUpComingTab.click()
        allure.startStep("Validate upNext Button got displayed under upComing Tab", true)
        expect(await ByjusClassesPage.btnUpNextInUpComingTab.isDisplayed()).toEqual(true)
        allure.startStep("Click on Completed Tab", true)
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("Validate All Button got displayed under Completed Tab within 5 seconds", true)
        await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
        expect(await ByjusClassesPage.btnAllOnCompletedTab.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it("312253 TC_02 Verify Upnext session ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnUpComingTab.click()
        await browser.pause(3000)
        const cardsLength = await ByjusClassesPage.cards.length
        for (let i = 1; i <= cardsLength; i++) {
            allure.startStep("Validate Join now button based on the Time in each card", true)
            await ByjusClassesPage.validateJoinNowButtonBasedOnTheTimeInCardUnderUpcomingTab(i)
        }
        allure.endStep();
    })
    it("312273 TC_03 Negative Test Case -Verify the pre requisites sessions card/Page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnUpComingTab.click()
        const cardsLength = await ByjusClassesPage.cards.length
        for (let i = 1; i <= cardsLength; i++) {
            allure.startStep("Validate CTA buttons in See More Page Under UpComingTab based on the Time in each card", true)
            await ByjusClassesPage.validateCTAButtonsInSeeMorePageUnderUpComingTab(i)
        }
        allure.endStep();
    })
    it("312261 TC_04 Verify the Join Byju's Class CTA in session details page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnUpComingTab.click()
        const cardsLength = await ByjusClassesPage.cards.length
        for (let i = 1; i <= cardsLength; i++) {
            allure.startStep("Validate Join Byju's Class CTA in Session details Page Under UpComingTab based on the Time in each card", true)
            const seeMoreLink = await ByjusClassesPage.btnSeeMoreOnUpcomingTab(i)
            const prepareForClassTitle = await ByjusClassesPage.prepareForClassText(i)
            await prepareForClassTitle.scrollIntoView(true)
            const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
            if (seeMoreLinkDisplayed == true) {
                await seeMoreLink.scrollIntoView(true)
                await seeMoreLink.click()
                await ByjusClassesPage.joinTime.waitForDisplayed({ timeout: 3000 })
                await ByjusClassesPage.joinTime.scrollIntoView(true)
                await browser.pause(2000)
                const timeDetails = await ByjusClassesPage.joinTime.getText()
                const timeDetailsArray = timeDetails.split(" ")
                let status = timeDetailsArray[0]
                if (status == "Starts") {
                    let timeValue = timeDetailsArray[2]
                    let timeUnit = timeDetailsArray[3]

                    if (timeUnit == "mins") {
                        if (timeValue < 15) {
                            expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(true)
                        }
                    }
                    else {
                        expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(false)
                    }

                }
                else if (status == "Started") {
                    expect(await ByjusClassesPage.btnJoinNowInSessionPage.isEnabled()).toEqual(true)
                }

                allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
            }
        }
        allure.endStep();
    })


    it("312258 TC_05 Verify the pre native assessment (Start test flow)", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on upComing Tab", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnUpComingTab.click()
        const cardsLength = await ByjusClassesPage.cards.length
        for (let i = 1; i <= cardsLength; i++) {
            allure.startStep("Validate Start Test Flow in See More Page Under UpComingTab", true)
            const seeMoreLink = await ByjusClassesPage.btnSeeMoreOnUpcomingTab(i)
            const prepareForClassTitle = await ByjusClassesPage.prepareForClassText(i)
            await prepareForClassTitle.scrollIntoView(true)
            const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
            if (seeMoreLinkDisplayed == true) {
                await seeMoreLink.scrollIntoView(true)
                await seeMoreLink.click()
                const startButtonCTAEnabled = await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.isEnabled()
                const disabledStartTestButton = await ByjusClassesPage.disabledStartTestBtn.isDisplayed()
                const disabledResultButton = await ByjusClassesPage.disabledResultBtn.isDisplayed()
                if (startButtonCTAEnabled == true && (disabledStartTestButton == false || disabledResultButton == false)) {
                    allure.startStep("Click on Start test CTA button", true)
                    await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.waitForDisplayed({ timeout: 3000 })
                    await browser.pause(2000)
                    await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.scrollIntoView({ block: "center" })
                    await ByjusClassesPage.btnPostAssessmentCTAInSessionPage.click()
                    await browser.pause(3000)
                    const summaryHeader = await ByjusClassesPage.summaryTitle.isDisplayed()
                    if (summaryHeader == true) {
                        allure.startStep("validate the display of title for completed test ", true)
                        await ByjusClassesPage.summaryTitle.waitForDisplayed({ timeout: 5000 })
                        await browser.pause(2000)
                        allure.startStep("Navigate to home page of the completed tab", true)
                        await browser.back()
                    }
                    else {
                        allure.startStep("Validate instruction title in instruction Popup", true)
                        await ByjusClassesPage.instructionTitle.waitForDisplayed({ timeout: 3000 })
                        expect(await ByjusClassesPage.instructionTitle.isDisplayed()).toEqual(true)
                        allure.startStep("Validate Close icon  in instruction Popup", true)
                        await ByjusClassesPage.closeIconInInstructionPopUpPage.waitForDisplayed({ timeout: 3000 })
                        expect(await ByjusClassesPage.closeIconInInstructionPopUpPage.isDisplayed()).toEqual(true)
                        allure.startStep("Validate start test CTA Button in instruction Popup", true)
                        await ByjusClassesPage.secondStartCTAButton.waitForDisplayed({ timeout: 3000 })
                        expect(await ByjusClassesPage.secondStartCTAButton.isDisplayed()).toEqual(true)
                        await ByjusClassesPage.closeIconInInstructionPopUpPage.click()
                    }
                    allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                    await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()

                }
                else {
                 allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                 await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                }
            }
        }
        allure.endStep();
    })
    it("312250 TC_06 Validate Byju's classes Main Page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        allure.startStep("validate the display of Upcoming Tab button", true)
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
        allure.startStep("validate the display of Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        allure.endStep();
    })
    it('312256 TC_07 Verify the topic download pdf',async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        if (seeMoreLinkDisplayed == true) {
        await seeMoreLink.scrollIntoView(true)
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({timeout:10000})
        await ByjusClassesPage.btnSeeMore(1).click()
        await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({timeout:5000})
        if(await ByjusClassesPage.btnDownload.isDisplayed()){
        await ByjusClassesPage.btnDownload.waitForDisplayed({timeout:3000})
        await ByjusClassesPage.btnDownload.click()
        await browser.pause(1500)
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1]);
            const url = await browser.getUrl()
            let flag = url.includes("pdf")
            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
    }
 }
    });

    it('312270 TC_08 Negative Test Case- Verify free user flow',async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"free")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        if(await ByjusClassesPage.btnUpComingTab.isExisting())
        {
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({timeout:10000})
        }else{
            await ByjusClassesPage.labelForYouTab.waitForDisplayed({timeout:5000})
        }
        expect(await ByjusClassesPage.labelPrequisite.isDisplayed()).toEqual(false)
        if(await ByjusClassesPage.btnCompletedTab.isClickable()){ 
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3000})
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({timeout:5000})
        expect(ByjusClassesPage.labelPrequisite.isDisplayed()).toEqual(false) 
        expect(await ByjusClassesPage.revisionMaterialSubTitleUnderCompletedTab.isDisplayed()).toEqual(false)
    }
    });

    it('312260 TC_09 Verify the pre native assessment (View Result flow)',async () => {
        await browser.reloadSession()
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        if (seeMoreLinkDisplayed == true) {
        await seeMoreLink.scrollIntoView(true)
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({timeout:10000})
        await ByjusClassesPage.btnSeeMore(1).click()
        await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({timeout:5000})
        let subjectName=await ByjusClassesPage.subjectNameUnderSessionDetails.getText()
        await ByjusClassesPage.btnViewResult.waitForDisplayed({timeout:5000})
        const disabledResultButton=await ByjusClassesPage.disabledResultBtn.isDisplayed()
        if(disabledResultButton == false){
        await ByjusClassesPage.btnViewResult.click()
        await ByjusClassesPage.subjectnameInViewResult.waitForDisplayed({timeout:10000})
        expect(await ByjusClassesPage.subjectnameInViewResult.getText()).toEqual(subjectName)
        expect(await ByjusClassesPage.labelTotalScore.isDisplayed()).toEqual(true)
        let questionCount=await $('//*[@class="summary-body  row"]//div/div/div').getText()
        let questionCount1=(parseInt(questionCount.slice(0, 20).trim()))
        for(let i=1;i<=questionCount1;i++){
            expect(await ByjusClassesPage.questionNumberInResult(i).isDisplayed()).toEqual(true)
        }
    }
}
    });

    it('312267 TC_10 Verify the Breadcrumb button',async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({timeout: 5000})
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        console.log("seeMoreLinkDisplayed"+seeMoreLinkDisplayed)
        if (seeMoreLinkDisplayed == true) {
        await seeMoreLink.scrollIntoView(true)
        await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({timeout:10000})
        await ByjusClassesPage.btnSeeMore(1).click()
        await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({timeout:5000})
        expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnSessionDetailBreadCrumb.click()
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({timeout:5000})
        expect(await ByjusClassesPage.btnUpComingTab.isDisplayed()).toEqual(true)
        expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        }
    });

    it('312255 TC_11 Verify the the session detail page',async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({timeout: 10000})
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        console.log("seeMoreLinkDisplayed"+seeMoreLinkDisplayed)
        if (seeMoreLinkDisplayed == true) {
            await seeMoreLink.scrollIntoView(true)
            await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({timeout:10000})
            await ByjusClassesPage.btnSeeMore(1).click()
            await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({timeout:5000})
            allure.startStep("Verify the the session detail page",true)
            expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.btnSessionDetailBreadCrumb.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.labelTimeAndDateInSesionDetail.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.labelTestStartsIn.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.subjectNameUnderSessionDetails.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.subjectLogoInSessionDetail.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.btnJoinByjusClasses.isDisplayed()).toEqual(true)
            expect(await ByjusClassesPage.btnResult.isDisplayed()).toEqual(true)
            await ByjusClassesPage.validateCTAButtonsInSessionDetailPageUnderUpComingTab()            
        }    
        allure.endStep()    
    });

    it('312263 TC_12 Verify the Alert message in the session detail page',async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[6],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.menuOption.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.menuOption.click()
        allure.startStep("validate the display of Byjus classes button", true)
        await ByjusClassesPage.btnByjusClassPage.waitForDisplayed({ timeout: 3500 })
        expect(await ByjusClassesPage.btnByjusClassPage.isDisplayed()).toEqual(true)
        await ByjusClassesPage.btnByjusClassPage.click()
        await ByjusClassesPage.btnUpComingTab.waitForDisplayed({timeout: 5000})
        const seeMoreLink = await ByjusClassesPage.btnSeeMore(1)
        const seeMoreLinkDisplayed = await seeMoreLink.isDisplayed()
        console.log("seeMoreLinkDisplayed"+seeMoreLinkDisplayed)
        if (seeMoreLinkDisplayed == true) {
            await seeMoreLink.scrollIntoView(true)
            await ByjusClassesPage.btnSeeMore(1).waitForDisplayed({timeout:10000})
            await ByjusClassesPage.btnSeeMore(1).click()
            allure.startStep("Verify the Alert message in the session detail page")
            await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({timeout:5000})
            expect(await ByjusClassesPage.alertTextInSessionDetail.isDisplayed({timeout:5000})).toEqual(true)
            expect(await ByjusClassesPage.alertTextInSessionDetail.getText()).toHaveTextContaining("join the class only 15 mins before the session start time")
        }
        allure.endStep()
    });                
})