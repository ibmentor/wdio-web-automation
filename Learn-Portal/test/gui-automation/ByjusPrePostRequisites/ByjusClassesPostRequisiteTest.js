import { AllureUtil as allure } from "../../../utils/util.allure"
import ProfilePage from "../../../Pages/ProfilePage";
import ByjusClassesPage from "../../../Pages/ByjusClassesPage";
import LoginPage from "../../../Pages/LoginPage";
import { loginData } from "../../../Data/LoginData";
describe("Learn Portal - Byjus Class pre post test cases", async () => {
    it("312654 TC_01 Validate Byju's classes Main Page", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
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

    it("312655 TC_02 Validate all the subjects filters under 'Completed TAB' ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:5000})
        await ByjusClassesPage.btnCompletedTab.click()
        try{await ByjusClassesPage.btnCompletedTabFilter(1).waitForDisplayed({timeout:4500})}catch{}
        let filterCount = await ByjusClassesPage.countCompletedTabFilters.length
        for (let i=1;i<filterCount;i++){
            await ByjusClassesPage.btnCompletedTabFilter(i).click()
            let filterName = await ByjusClassesPage.btnCompletedTabFilter(i).getText()
            filterName = filterName.replace(" ","")
            if (filterName != "All"){
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await ByjusClassesPage.btnCompletedTabFilter(i).click()
                await browser.pause(5500)
                let cardCount = await ByjusClassesPage.cardsCountCompletedTab.length
                for(let j=1;j<cardCount;j++){
                    expect(await ByjusClassesPage.cardsCompletedTabSubjectName(j,filterName).getText()).toEqual(filterName)
                }
            }
        }
    })
    it("312665 TC_03 Verify if there is no revision material for the completed class", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:5000})
        await ByjusClassesPage.btnCompletedTab.click()
        try{await ByjusClassesPage.btnCompletedTabFilter(1).waitForDisplayed({timeout:4500})}catch{}
        if (await $("(//*[@class='mt-3 p-3 horzlin'])[1]").isDisplayed({timeout:3500})){
            let cardCount = await ByjusClassesPage.cardsCountCompletedTab.length
            for (let j=1;j<=cardCount;j++){
                if(await ByjusClassesPage.cardsCompletedTabRevisionMaterial(j).isDisplayed() == false){
                    expect(await ByjusClassesPage.cardsCompletedTabNoMaterial(j).isDisplayed()).toEqual(true)   
                }
            }
        }
    })
    it("312661 TC_04 Verify the breadcrumb for session details and byjusclases", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3500})
        await ByjusClassesPage.btnCompletedTab.click()
        await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({timeout:3500})
        const dropDowndisplayed=await ByjusClassesPage.dropdownOnCompletedTab(1).isDisplayed()
        if(dropDowndisplayed==true)
        {
        try{await ByjusClassesPage.dropdownOnCompletedTab(1).waitForDisplayed({timeout:4500})}catch{}
        await ByjusClassesPage.btnCompletedTabDropdownSeeMore(1).click()
        await ByjusClassesPage.btnSessionDetailBreadCrumb.waitForDisplayed({timeout:4500})
        await ByjusClassesPage.btnSessionDetailBreadCrumb.click()
        try{await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:4500})}catch{}
        expect(await ByjusClassesPage.btnCompletedTab.isDisplayed()).toEqual(true)
        }
    })
    it("312657 TC_05 Verify that elements under Completed section should see post requisites", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3500})
        await ByjusClassesPage.btnCompletedTab.click()
        try {await ByjusClassesPage.cardsCompletedTab(1).waitForDisplayed({timeout:4500})} catch{}
        let dropdownCount = await ByjusClassesPage.countDropdownOnCompletedTab.length
        for (let i=1;i<=dropdownCount;i++){
            let topicName = await ByjusClassesPage.labelCompletedTabTopicName(i).getText()
            expect(await ByjusClassesPage.btnCompletedTabDropdownSeeMore(i).isDisplayed()).toEqual(true)
            await ByjusClassesPage.dropdownOnCompletedTab(i).click()
            expect(await ByjusClassesPage.dropdownElementCountOnCompletedTab(i).length).toBeGreaterThan(0)
            await ByjusClassesPage.btnCompletedTabDropdownSeeMore(i).click()
            try{await ByjusClassesPage.labelSessionDetailTopicName.waitForDisplayed({timeout:4500})}catch{}
            let sessionDetailTopicName = await ByjusClassesPage.labelSessionDetailTopicName.getText()
            expect(topicName).toEqual(sessionDetailTopicName)
            await browser.back()
            await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3500})
            await ByjusClassesPage.btnCompletedTab.click()
        }
    })

    it("312656 TC_06 Verify the elements in the completed sessions tab", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        allure.startStep("validate the elements in the completed sessions cards", true)
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elements on Card Under Completed Tab", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const dateAndtimeDataOnCard = await ByjusClassesPage.getTimeStampOnCard(i)
            const subjectOnCard = await ByjusClassesPage.getSubjectTitle(i)
            const chapterOnCard = await ByjusClassesPage.getChapterTitle(i)
            const subjectIconOnCard = await ByjusClassesPage.getSubjectIcon(i)
            allure.startStep("validate the display of Revison material text under completed tab on card", true)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            if (revisionMaterialDisplayed == true) {
                await revisionMaterial.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("validate the display of Subject Icon on session card", true)
                await subjectIconOnCard.waitForDisplayed()
                expect(await subjectIconOnCard.isDisplayed()).toEqual(true)
                allure.startStep("validate the display of Subject title on session card", true)
                await subjectOnCard.waitForDisplayed()
                expect(await subjectOnCard.isDisplayed()).toEqual(true)
                allure.startStep("validate the display of chapter title on session card", true)
                await chapterOnCard.waitForDisplayed()
                expect(await chapterOnCard.isDisplayed()).toEqual(true)
                await dateAndtimeDataOnCard.waitForDisplayed()
                const dateAndTimedetails = await dateAndtimeDataOnCard.getText()
                const dateAndTimedetailsArray = await dateAndTimedetails.split(" ")
                let actualdate = dateAndTimedetailsArray[1]
                let actualmonth = dateAndTimedetailsArray[2]
                let actualClockTime = dateAndTimedetailsArray[4]
                const validClockTimes = ["AM", "PM"]
                const validMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "dec"]
                const validDates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
                let validClockTimeFlag, validMonthFlag, validDateFlag = false
                allure.startStep("Compare the Actual displayed time and date details with expected formats", true)
                for (let j = 0; j < validClockTimes.length; j++) {
                    if (validClockTimes[j] == actualClockTime) {
                        validClockTimeFlag = true

                    }
                }
                for (let j = 0; j < validMonths.length; j++) {
                    if (validMonths[j] == actualmonth) {
                        validMonthFlag = true

                    }
                }
                for (let j = 0; j < validDates.length; j++) {
                    if (validDates[j] == actualdate) {
                        validDateFlag = true

                    }
                }
                expect(validDateFlag).toEqual(true)
                expect(validMonthFlag).toEqual(true)
                expect(validClockTimeFlag).toEqual(true)
            }
        }
        allure.endStep();
    })
    it("312677 TC_07 Verify the functionality of VIDEOS", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the Start again button by playing the video in Card Under Complted Tab", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                await revisionMaterial.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on Revision material CTA button", true)
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                await browser.pause(3000)
                const startTestBtnDisplayed = await ByjusClassesPage.startTestUnderRevisionMaterial.isDisplayed()
                if (startTestBtnDisplayed == false) {
                    allure.startStep("Click on watch Video CTA button", true)
                    await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.scrollIntoView({ block: "center" })
                    await browser.pause(2000)
                    await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.waitForDisplayed({ timeout: 5000 })
                    await ByjusClassesPage.watchVideoCTABtnOnSessionsPage.click()
                    await ByjusClassesPage.closeIconInPopupPage.waitForDisplayed({ timeout: 5000 })
                    await browser.pause(2000)
                    allure.startStep("Validate that video is playing in BYJUS classes page", true)
                    const currentUrl = await browser.getUrl()
                    expect(await currentUrl).toHaveTextContaining('byjus-classes')
                    await browser.pause(2000)
                    allure.startStep("Click on close icon under video popup", true)
                    await ByjusClassesPage.closeIconInPopupPage.click()
                    allure.startStep("Validate Start again button after clicking close icon on video", true)
                    await ByjusClassesPage.startAgainButtonInVideoPopupPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.startAgainButtonInVideoPopupPage.isDisplayed()).toEqual(true)
                    allure.startStep("Validate skip button in video popup page", true)
                    await ByjusClassesPage.skipButtonInVideoPopupPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.skipButtonInVideoPopupPage.isDisplayed()).toEqual(true)
                    await ByjusClassesPage.closeIconInPopupPage.waitForDisplayed({ timeout: 2000 })
                    allure.startStep("Click on close icon", true)
                    await ByjusClassesPage.closeIconInPopupPage.click()

                }
                await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
            }
        }
        allure.endStep();
    })
    it("312660 TC_08 Verify that clicking  on See more,should open in the new screen, where all the tagged resource types are shown.", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        allure.startStep("Validate the requistes shown in session details page by clicking see more text", true)
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const subjectName = await ByjusClassesPage.getSubjectNameUnderCompletedTab(i)
            const topicName = await ByjusClassesPage.getTopicNameUnderCompletedTab(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreTextOnCard = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                await subjectName.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await subjectName.waitForDisplayed({ timeout: 5000 })
                const subjectNameInCompletedTab = await subjectName.getText()
                const topicNameInCompletedTab = await topicName.getText()
                allure.startStep("Click on See more link on card in Completed Tab", true)
                await seeMoreTextOnCard.waitForDisplayed({ timeout: 5000 })
                await seeMoreTextOnCard.click()
                allure.startStep("Validate Session details header in sessions Page", true)
                await ByjusClassesPage.sessionDetailsHeader.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await ByjusClassesPage.sessionDetailsHeader.waitForDisplayed({ timeout: 5000 })
                expect(await ByjusClassesPage.sessionDetailsHeader.isDisplayed()).toEqual(true)
                allure.startStep("Validate subject details in sessions Page and completed tab should be same", true)
                expect(await ByjusClassesPage.revisionMaterialSubTitleUnderCompletedTab.isDisplayed()).toEqual(true)
                expect(await subjectNameInCompletedTab).toEqual(await ByjusClassesPage.subjectNameUnderSessionDetails.getText())
                allure.startStep("Validate Topic name details in sessions Page and completed tab should be same", true)
                expect(await topicNameInCompletedTab).toEqual(await ByjusClassesPage.topicNameUnderSessionDetails.getText())
                allure.startStep("Validate that sections under revision material should be displayed ", true)
                expect(await ByjusClassesPage.requistesUnderRevisionMaterial.length).toBeGreaterThan(0)
                await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                expect(await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.isDisplayed()).toEqual(true)
                allure.startStep("Validate that sections under prepare for session should be displayed", true)
                expect(await ByjusClassesPage.requistesUnderPrepareForSession.length).toBeGreaterThan(0)
                break;
            }
        }
        allure.endStep();
    })
    it("312666 TC_09 Verify the pagination for all the completed classes if more  completed classes is present", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        allure.startStep("Validate each pagination should contain atleast 3 completed sessions", true)
        if (cardsCountInCompletedTab >= 3) {
            for (let i = 3; i < 4; i++) {
                const pagination = await ByjusClassesPage.getPagination(i)
                allure.startStep("Validate the Pagination in Completed tab", true)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
                await pagination.click()
                await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
                await ByjusClassesPage.btnAllOnCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
            }
            const cardsCountinCurrentCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
            if (cardsCountinCurrentCompletedTab >= 3) {
                const pagination = await ByjusClassesPage.getPagination(4)
                allure.startStep("Validate the Pagination in Completed tab", true)
                await pagination.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await pagination.waitForDisplayed({ timeout: 5000 })
                expect(await pagination.isDisplayed()).toEqual(true)
            }

        }
        allure.endStep();
    })

           
    it("312664 TC_10 Verify that recently completed session should be shown first in order", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        allure.startStep("Validate that recently completed session should be shown first in order", true)
        for (let i = cardsCountInCompletedTab; i > 1; i--) {
            const dateAndtimeDataOnCard1 = await ByjusClassesPage.getTimeStampOnCard(i)
            const dateAndTimedetails1 = await dateAndtimeDataOnCard1.getText()
            await dateAndtimeDataOnCard1.scrollIntoView({ block: "center" })
            await browser.pause(3000)
            const dateAndTimedetailsArray1 = await dateAndTimedetails1.split(" ")
            let dateOfcard1 = dateAndTimedetailsArray1[1]
            let monthOfcard1 = dateAndTimedetailsArray1[2]
            let clockTimeFormatOfCard1 = dateAndTimedetailsArray1[4]
            let timeOfCard1 = dateAndTimedetailsArray1[3]
            const dateAndtimeDataOnCard2 = await ByjusClassesPage.getTimeStampOnCard(i - 1)
            const dateAndTimedetails2 = await dateAndtimeDataOnCard2.getText()
            await dateAndtimeDataOnCard2.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            const dateAndTimedetailsArray2 = await dateAndTimedetails2.split(" ")
            let dateOfcard2 = dateAndTimedetailsArray2[1]
            let monthOfcard2 = dateAndTimedetailsArray2[2]
            let clockTimeFormatOfCard2 = dateAndTimedetailsArray2[4]
            let timeOfCard2 = dateAndTimedetailsArray1[3]
            let flag = false
            if (monthOfcard2 == monthOfcard1) {
                if (dateOfcard2 == dateOfcard1) {
                    if (clockTimeFormatOfCard2 == clockTimeFormatOfCard1) {
                        if (timeOfCard2 >= timeOfCard1) {
                            flag = true
                        }

                    }
                    else if (dateOfcard2 > dateOfcard1) {
                        flag = true
                    }

                }

            }

            else if (monthOfcard2 != monthOfcard1) {
                if (dateOfcard2 < dateOfcard1) {
                    flag = true
                }
                expect(flag).toEqual(true)
            }

        }
        allure.endStep();
    })
    it("312675 TC_11 Verify the functionality of start test for post native assessments", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the Start test flow for post native assessments Under Complted Tab", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                await ByjusClassesPage.postAssessmentCTABtnInSessionPageUnderRevisionMaterial.waitForDisplayed({ timeout: 5000 })
                await ByjusClassesPage.postAssessmentCTABtnInSessionPageUnderRevisionMaterial.click()
                await browser.pause(2000)
                allure.startStep("Check for Summary Header if test is completed", true)
                const summaryHeader = await ByjusClassesPage.summaryTitle.isDisplayed()
                if (summaryHeader == true) {
                    allure.startStep("validate the display of title for completed test ", true)
                    await ByjusClassesPage.summaryTitle.waitForDisplayed({ timeout: 5000 })
                    await browser.pause(2000)
                    allure.startStep("Navigate to home page of the completed tab", true)
                    await browser.back()
                    await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 5000 })
                    await ByjusClassesPage.btnCompletedTab.click()
                    await ByjusClassesPage.btnAllOnCompletedTab.waitForDisplayed({ timeout: 5000 })
                }
                else {
                    allure.startStep("validate the display of instruction title for the uncompleted test ", true)
                    await ByjusClassesPage.instructionTitle.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.instructionTitle.isDisplayed()).toEqual(true)
                    allure.startStep("validate the display of start test button in instructions Page ", true)
                    await ByjusClassesPage.secondStartCTAButton.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.secondStartCTAButton.isDisplayed()).toEqual(true)
                    await ByjusClassesPage.closeIconInInstructionPopUpPage.waitForDisplayed({ timeout: 5000 })
                    allure.startStep("Click on start test button to start the test", true)
                    await ByjusClassesPage.secondStartCTAButton.click()
                    await browser.pause(2000)
                    allure.startStep("validate the display of exit Assessment button in Assesment page", true)
                    await ByjusClassesPage.exitAssessmentButton.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.exitAssessmentButton.isDisplayed()).toEqual(true)
                    allure.startStep("validate that after clicking on start test it should launch test in Assesment page", true)
                    const currentUrl = await browser.getUrl()
                    expect(await currentUrl).toHaveTextContaining('start-test')
                    allure.startStep("Navigate to home page of the completed tab", true)
                    await browser.back()
                    allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                    await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
                }
            }
        }
        allure.endStep();
    })

    it("312674 TC_12 Verify the elemets present in post native assessment", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elemets present in post native assessment", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                let validExpiryDetails = false
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                allure.startStep("Validate expire details of Assessment under Revison material in Session details page", true)
                const expireDateAndTimeDetails = await ByjusClassesPage.expiryTimeDetailsUnderReviseMaterialInSessionPage.getText()
                const expireDateAndTimeDetailsArray = await expireDateAndTimeDetails.split(" ")
                let expiryDate = expireDateAndTimeDetailsArray[2]
                let expiryMonth = expireDateAndTimeDetailsArray[3]
                let expiryTime = expireDateAndTimeDetailsArray[4]
                let expiryTimeFormat = expireDateAndTimeDetailsArray[5]
                let expTimeDetails = expiryTime + " " + expiryTimeFormat
                var today = new Date()
                var currentDate = today.getDate()
                var currentMonthNumber = today.getMonth() + 1
                var currentTime = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                let expiryMonthNumber = await ByjusClassesPage.GetMonthNumber(expiryMonth)
                if (expiryDate > currentDate && expiryMonthNumber >= currentMonthNumber) {
                    validExpiryDetails = true
                }
                else if (expiryDate == currentDate && expiryMonthNumber == currentMonthNumber) {
                    if (expTimeDetails > currentTime) {
                        validExpiryDetails = true
                    }

                }
                expect(validExpiryDetails).toEqual(true)
                allure.startStep("Validate Questions text for Assessment under Revison material in Session details page", true)
                await ByjusClassesPage.questionsTextUnderRevisonMaterial.waitForDisplayed({ timeout: 5000 })
                expect(await ByjusClassesPage.questionsTextUnderRevisonMaterial.isDisplayed()).toEqual(true)
                allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()
            }
        }
        allure.endStep();
    })
            
    it("312678 TC_13 Verify the pre requisities which is present in post requisites as well", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[9],"prePostUser")
        allure.startStep("Navigate to BYJUS classes and click on Classes button", true)
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        allure.startStep("Click on Completed Tab button", true)
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 3500 })
        await ByjusClassesPage.btnCompletedTab.click()
        const cardsCountInCompletedTab = await ByjusClassesPage.cardsInCompletedTab.length
        for (let i = 1; i <= cardsCountInCompletedTab; i++) {
            allure.startStep("Validate the elemets present in post native assessment", true)
            const revisionMaterial = await ByjusClassesPage.getRevisionMaterialTextOnCard(i)
            const revisionMaterialDisplayed = await revisionMaterial.isDisplayed()
            const seeMoreButton = await ByjusClassesPage.getSeeMoreTxtOnCardUnderCompletedTab(i)
            if (revisionMaterialDisplayed == true) {
                await seeMoreButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                allure.startStep("Click on see more button under Revison material in Completed Tab", true)
                await seeMoreButton.waitForDisplayed({ timeout: 5000 })
                await seeMoreButton.click()
                allure.startStep("Validate expire details of Assessment under Revison material in Session details page", true)
                await ByjusClassesPage.prepareForSessionSubTitleUnderCompletedTab.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                const startTestBtnDisplayed = await ByjusClassesPage.startTestUnderPrepareForSession.isDisplayed()
                if (startTestBtnDisplayed == false) {
                    allure.startStep("Validate Class notes under Prepare for session in Session details page", true)
                    await ByjusClassesPage.classNotesUnderPrepareForSessionInSessionPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.classNotesUnderPrepareForSessionInSessionPage.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Assesment under Prepare for session in Session details page", true)
                    await ByjusClassesPage.assessmentUnderPrepareForSessionInSessionPage.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.assessmentUnderPrepareForSessionInSessionPage.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Pdf Icon for Class notes under Prepare for session in Session details page", true)
                    await ByjusClassesPage.pdfImgUnderPrepareForSession.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.pdfImgUnderPrepareForSession.isDisplayed()).toEqual(true)
                    allure.startStep("Validate Assesment Icon fir Assessment under Prepare for session in Session details page", true)
                    await ByjusClassesPage.assessmentImgUnderPrepareForSession.waitForDisplayed({ timeout: 5000 })
                    expect(await ByjusClassesPage.assessmentImgUnderPrepareForSession.isDisplayed()).toEqual(true)
                }
                allure.startStep("Click on BreadCrumb button in Session details page to navigate to Completed tab home page", true)
                await ByjusClassesPage.navigateToCompletedTabHomePageByClickingBreadCrumbButton()

            }
        }
        allure.endStep();
    })
      
})