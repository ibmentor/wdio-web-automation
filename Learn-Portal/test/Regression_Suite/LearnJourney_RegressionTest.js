import LearnJourneyPage from '../../Pages/LearnJourneyPage'
import ProfilePage from '../../Pages/ProfilePage'
import { AllureUtil as allure } from "../../utils/util.allure"
import { loginData } from '../../Data/LoginData';
import { learnJourneyData } from '../../Data/LearnJourneyData';
describe.skip('Learn Journey Module',async () => {

    it('318651 TC_02 Validate breadcrum on learn journey homepage', async() => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade','premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName="mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL=await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        allure.startStep("Click on Home Page Breadcrum",true)
        await LearnJourneyPage.btnHomePageBreadcrum.waitForClickable({timeout:5000})
        await LearnJourneyPage.btnHomePageBreadcrum.click()
        let currentURLHOmePage=await browser.getUrl()
        expect(currentURLHOmePage).toHaveTextContaining("home")
    });

    it('318653 TC_04 Validate no. of chapters under subject name ',async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade','premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName="mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL=await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.ChapterCard.waitForDisplayed({timeout:10000})
        allure.startStep("Validate no. of chapters under subject name",true)
        let chapter= await $(`(//p[contains(@class,'premiumHome_details')])[1]`).getText()
        let chapterCount=(chapter.slice(0,2).trim())
        for(let i=1;i<=chapterCount;i++){
            expect(await LearnJourneyPage.chapterCards(i).isDisplayed()).toEqual(true)
        }
    });

    it('318656 TC_07 Validate the message when journey is not started under resume journey section',async() => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade','premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName="mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL=await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({timeout:5000})
        await browser.pause(2000)
        allure.startStep("Validate the message when journey is not started under resume journey section", true)
        const continueButtonDisplayed= await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.isDisplayed()
        if(continueButtonDisplayed==false)
        {
            await LearnJourneyPage.resumeJourneyMessage.waitForDisplayed({timeout:10000})
            expect(await LearnJourneyPage.noJourneyTextMsgUnderResumeJourney.isDisplayed()).toEqual(true)
            expect(await LearnJourneyPage.noJourneyTextMsgUnderResumeJourney.getText()).toEqual('No Journey Started Yet...')
            await LearnJourneyPage.resumeJourneyMessage.waitForDisplayed({timeout:10000})
            expect(await LearnJourneyPage.resumeJourneyMessage.isDisplayed()).toEqual(true)
            expect(await LearnJourneyPage.resumeJourneyMessage.getText()).toEqual('Yet to start on any subject? Choose from any of the subjects to start your eductional jouney...')
        }
        else 
        {
         await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.waitForDisplayed({timeout:10000})
         expect(await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.isDisplayed()).toEqual(true)
        }
       

    });

    it('318658 TC_08 Valdiate the Chapter heading and Topics',async() => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade','premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName="mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL=await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await browser.pause(3000)
        const chaptersCount= await LearnJourneyPage.chaptersCount.length
        for(let i=1;i<=chaptersCount;i++)
        {    
            const chapterHeading=await LearnJourneyPage.getChapterHeading(i)
            const chapterSection=await LearnJourneyPage.getChapterSection(i)
            await chapterHeading.waitForDisplayed({timeout:10000})
            await chapterHeading.scrollIntoView({block:"center"})
            await browser.pause(2000)
            expect(await chapterHeading.isDisplayed()).toEqual(true)
            await chapterSection.waitForDisplayed({timeout:10000})
            await chapterSection.scrollIntoView({block:"center"})
            await browser.pause(3000)
            const topicsCountUnderChapter= await LearnJourneyPage.getTopicsCountUnderChapter(i)
            for(let j=1;i<=topicsCountUnderChapter.length;i++)
            {
                if (topicsCountUnderChapter.length>0)
                {
                const startJourneyButtonOnEachCard= await $(`(//*[contains(@class,'swiper-initialized')])[${i}]/..//*[contains(@class,'chapterCards')][${j}]/..//*[contains(text(),'Start Journey')]`) 
                const topicNameOnEachCard=await $(`(//*[contains(@class,'swiper-initialized')])[${i}]/..//*[contains(@class,'chapterCards')][${j}]/..//*[contains(@class,'chapName')]`)
                await startJourneyButtonOnEachCard.scrollIntoView({ block: "center" })
                await browser.pause(2000)
                await startJourneyButtonOnEachCard.waitForDisplayed({timeout:10000})
                expect(await startJourneyButtonOnEachCard.isDisplayed()).toEqual(true)
                await topicNameOnEachCard.waitForDisplayed({timeout:10000})
                expect(await topicNameOnEachCard.isDisplayed()).toEqual(true)
                }
            }

        }
        
    });

    
    it('318657 TC_09 Validate "Resume Journey" CTA in Resume Section', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(2000)
        allure.startStep("Validate Continue Journey button under Resume Journey for the journey started scenario", true)
        const noJourneyTextMsgUnderResumeJourneyDisplayed = await LearnJourneyPage.noJourneyTextMsgUnderResumeJourney.isDisplayed()
        if (noJourneyTextMsgUnderResumeJourneyDisplayed == false) {
            await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.waitForDisplayed({ timeout: 10000 })
            expect(await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.isDisplayed()).toEqual(true)
        }
        else {
            await LearnJourneyPage.btnStartJourneyCTAUnderResumeJourney.waitForDisplayed({ timeout: 10000 })
            expect(await LearnJourneyPage.btnStartJourneyCTAUnderResumeJourney.isDisplayed()).toEqual(true)
        }

    });

    it('318665 TC_10 Verify that clicking on back button in journey loading screen should redirect the user to personalized chapter list screen', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout: 10000 })
        await browser.back()
        await LearnJourneyPage.homeButtonInSubjectPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.homeButtonInSubjectPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        expect(await LearnJourneyPage.homeButtonInSubjectPage.isDisplayed()).toEqual(true)
    });

    it('318669 TC_12 Verify that once the node arrangement is done, the journey path animation should be shown with (^) from the bottom of the screen and node card should be shown to the user', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validation of (^)from the bottom of the screen and node card should be shown to the user",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)
        await LearnJourneyPage.upArrowInJourneyPage.waitForDisplayed({ timeout: 5000 })
        expect(await LearnJourneyPage.upArrowInJourneyPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.upArrowInJourneyPage.click()
        await LearnJourneyPage.downArrowInJourneyPage.waitForDisplayed({ timeout: 5000 })
        expect(await LearnJourneyPage.downArrowInJourneyPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.downArrowInJourneyPage.click()
        await LearnJourneyPage.upArrowInJourneyPage.waitForDisplayed({ timeout: 5000 })
        expect(await LearnJourneyPage.upArrowInJourneyPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.upArrowInJourneyPage.click()
        await LearnJourneyPage.downArrowInJourneyPage.waitForDisplayed({ timeout: 5000 })
        await LearnJourneyPage.downArrowInJourneyPage.click()

    });
    it('318713 TC_15 Verify the back button functionality and redirection in learn journey mapping page as well in loading page and video page', async () => {
        await browser.reloadSession() 
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(2,2)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validate the back button functionality and redirection in learn journey mapping page as well in loading page and video page",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        const node = await LearnJourneyPage.getNodeUnderTopic(1)
        await node.waitForDisplayed({ timeout: 5000 })
        await node.scrollIntoView({ block: "center" })
        await node.pause(2000)
        await node.click()
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
            if(revisitButton==true)   
            {
                await LearnJourneyPage.revisitButton.click()
            }
         else if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({ timeout: 5000 })
        await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.backButtonInVideoTabPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await LearnJourneyPage.backButtonInVideoTabPage.click()
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:5000})
        expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({timeout:10000})
        await LearnJourneyPage.backButtonInJourneyPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await LearnJourneyPage.backButtonInJourneyPage.click()
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({timeout:10000})
        await LearnJourneyPage.resumeJourneyTitle.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        expect(await LearnJourneyPage.resumeJourneyTitle.isDisplayed()).toEqual(true)
        
    })

    it('318694 TC_16 Very the Top bar on the video page', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(2,2)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validate the top bar on the Videos page",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        const node = await LearnJourneyPage.getNodeUnderTopic(1)
        await node.waitForDisplayed({ timeout: 5000 })
        await node.scrollIntoView({ block: "center" })
        await node.pause(2000)
        await node.click()
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
            if(revisitButton==true)   
            {
                await LearnJourneyPage.revisitButton.click()
            }
         else if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.videoTabInsideNode.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.videoTabInsideNode.isDisplayed()).toEqual(true)
        await LearnJourneyPage.filledVideoProgress.waitForDisplayed({ timeout: 5000 })
        expect(await LearnJourneyPage.filledVideoProgress.isDisplayed()).toEqual(true)
        const emptyQuestionProgress=await LearnJourneyPage.getEmptyQuestionProgress(1)
        await emptyQuestionProgress.waitForDisplayed({ timeout: 5000 })
        expect(await emptyQuestionProgress.isDisplayed()).toEqual(true)
        await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.backButtonInVideoTabPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await LearnJourneyPage.backButtonInVideoTabPage.click()
        
    })

    it('318680 TC_17 Verify the message and elements on node card when the user scroll the screen upwards and tap on any node other than current node', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validation of lock and unlock symbol of Nodes based on the node completion",true)
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout:5000})
        const totalNodesCount = await LearnJourneyPage.totalNodesUnderTopic.length
        expect(totalNodesCount).toBeGreaterThan(0)
        const unlockedTopics=await $$("//*[contains(@class,'learnJourney_imageWrap')]/..//*[contains(@src,'unlock')]")
        for (let i = 1; i <= totalNodesCount; i++) {
            const nodeName = await LearnJourneyPage.getTopicNameOutsideNode(i)
            await nodeName.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await nodeName.waitForDisplayed({ timeout: 10000 })
            if(i<=unlockedTopics.length)
            {
              const nodeWithUnlockIcon=await $(`(//*[contains(@class,'learnJourney_imageWrap')])[${i}]/..//*[contains(@src,'unlock')]`)
              await nodeWithUnlockIcon.waitForDisplayed({timeout:5000})
              expect(await nodeWithUnlockIcon.isDisplayed()).toEqual(true)
            }
            else 
            {
            const otherNodesWithLockIcon=await $(`(//*[contains(@class,'learnJourney_imageWrap')])[${i}]/..//*[contains(@src,'lock')]`)
            await otherNodesWithLockIcon.waitForDisplayed({timeout:5000})
            expect(await otherNodesWithLockIcon.isDisplayed()).toEqual(true)
            }        
        }
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout: 3000 })
        await LearnJourneyPage.backButtonInJourneyPage.click()
        await LearnJourneyPage.homeButtonInSubjectPage.waitForDisplayed({ timeout: 10000 })       
    });

    it('318693 TC_18  Very if all the nodes as below 3 segments under What will be covered? Video Quiz Assessments/interactions', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(2, 2)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validate the elements in video page",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        const node = await LearnJourneyPage.getNodeUnderTopic(1)
        await node.waitForDisplayed({ timeout: 5000 })
        await node.scrollIntoView({ block: "center" })
        await node.pause(2000)
        await node.click()
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
            if(revisitButton==true)   
            {
                await LearnJourneyPage.revisitButton.click()
            }
         else if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.quitButtonInVideoPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.quitButtonInVideoPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        expect(await LearnJourneyPage.backButtonInVideoTabPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.nextButtonInVideoPage.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.nextButtonInVideoPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.videoFrame.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.videoFrame.click()
        await browser.pause(2000)
        await LearnJourneyPage.playIconInVideo.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.playIconInVideo.isDisplayed()).toEqual(true)
        await LearnJourneyPage.timeDetailsInVideo.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.timeDetailsInVideo.isDisplayed()).toEqual(true)
        await LearnJourneyPage.settingIconInVideo.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.settingIconInVideo.isDisplayed()).toEqual(true)
        await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.backButtonInVideoTabPage.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        expect(await LearnJourneyPage.backButtonInVideoTabPage.isDisplayed()).toEqual(true)
        await LearnJourneyPage.backButtonInVideoTabPage.click()
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:5000})
        expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)
        

    })

    it('318707 TC_19 Verify the Leaving soon page user should get "Are you sure you want to quit so soon?" for questions', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Validation of back button in Questions Page",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(2,2)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validate the quit functionality in Question Page",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        await browser.pause(5000)
        const node = await LearnJourneyPage.getNodeUnderTopic(1)
        await node.waitForDisplayed({ timeout: 5000 })
        await node.scrollIntoView({ block: "center" })
        await node.pause(2000)
        await node.click()
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
            if(revisitButton==true)   
            {
                await LearnJourneyPage.revisitButton.click()
            }
         else if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.nextButtonInVideoPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.nextButtonInVideoPage.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        await LearnJourneyPage.nextButtonInVideoPage.click()
        await LearnJourneyPage.backButtonInQuestionsPage.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.backButtonInQuestionsPage.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        await LearnJourneyPage.backButtonInQuestionsPage.click()
        await LearnJourneyPage.quitText.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.quitText.getText()).toEqual('Are you sure you want to quit?')
        await LearnJourneyPage.quitButton.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.quitButton.isDisplayed()).toEqual(true)
        await LearnJourneyPage.cancelButton.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.cancelButton.isDisplayed()).toEqual(true)
        
    })

    it('318677 TC_21 Verify the subtopics name on node is similer in the bottom bar having list of subtopics for the particular chapter', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validation of subtopics name on node is similer in the bottom bar having list of subtopics for the particular chapter",true)
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout:5000})
        await browser.pause(3000)
        const totalNodesCount = await LearnJourneyPage.totalNodesUnderTopic.length
        expect(totalNodesCount).toBeGreaterThan(0)
        var topicNamesOutsideNode=[]
        for (let i = 1; i <= totalNodesCount; i++) {
            let j=0;
            let nodeName = await LearnJourneyPage.getTopicNameOutsideNode(i)
            await nodeName.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await nodeName.waitForDisplayed({ timeout: 10000 })
            topicNamesOutsideNode.push(await nodeName.getText())
        }
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:5000})
        await LearnJourneyPage.topicBottomCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await LearnJourneyPage.upArrowInJourneyPage.waitForDisplayed({timeout:5000})
        await LearnJourneyPage.upArrowInJourneyPage.click()
        for(let j=0,k=1;j<topicNamesOutsideNode.length;j++)
        {
            const topicNameInBottomCard = await $(`(//*[contains(@class,'learnJourney_topicListItem')]/../..//*[contains(@class,'checkContainer')])[${k}]`)
            await topicNameInBottomCard.waitForDisplayed({ timeout: 5000 })
            await topicNameInBottomCard.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            expect(await topicNamesOutsideNode[j]).toEqual(await topicNameInBottomCard.getText())
            k++;
        }
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout: 3000 })
        await LearnJourneyPage.backButtonInJourneyPage.click()
        await LearnJourneyPage.homeButtonInSubjectPage.waitForDisplayed({ timeout: 10000 })       
    });

    it('318708 TC_22 Verify the elements on " revisit" screen', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 2)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        allure.startStep("Validate the elements on revisit screen",true)
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
        await browser.pause(4000)
        const totalNodesCount = await LearnJourneyPage.totalNodesUnderTopic.length
        expect(await totalNodesCount).toBeGreaterThan(0)
        for (let i = 1; i <= totalNodesCount; i++) {
            const nodeName = await LearnJourneyPage.getNodeUnderTopic(i)
            await nodeName.scrollIntoView({ block: "center" })
            await browser.pause(2000)
            await nodeName.waitForDisplayed({ timeout: 10000 })
            await nodeName.click()
            await browser.pause(3000)
            const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
            if(revisitButton==true)
            {
                await LearnJourneyPage.revisitButton.waitForDisplayed({timeout:5000})
                await LearnJourneyPage.revisitButton.scrollIntoView({ block: "center" })
                await browser.pause(2000)   
                await LearnJourneyPage.revisitButton.click()
                await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({timeout:5000})
                expect(await LearnJourneyPage.videoTabInsideNode.isDisplayed()).toEqual(true)
                await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({timeout:5000})
                await LearnJourneyPage.backButtonInVideoTabPage.scrollIntoView({ block: "center" })
                await browser.pause(2000)    
                await LearnJourneyPage.backButtonInVideoTabPage.click()
                await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:5000})
            }
                 
        }
       
    })

  
    it('318695 TC_23 Verify the breadcrums in video page', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        allure.startStep("Validation of breadcrums in video page",true)
        const chapterInHomePage=await $(`((//*[contains(@class,'swiper-initialized')])[1]/..//*[contains(@class,'chapterCards')])[1]/p`)
        const chapterNameInHomePage=await chapterInHomePage.getText()
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({timeout:10000})
        expect(chapterNameInHomePage).toEqual(await LearnJourneyPage.currentBreadCrumb.getText())   
        await browser.pause(4000)
        const node= await LearnJourneyPage.getNodeUnderTopic(1)
        await node.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await node.waitForDisplayed({ timeout: 10000 })
        await node.click()
        await browser.pause(3000)
        const nodeOutsideChapter = await LearnJourneyPage.getTopicNameOutsideNode(1)
        const nodeOutsideChapName = await nodeOutsideChapter.getText()
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
        if(revisitButton==true)
        {
        await LearnJourneyPage.revisitButton.waitForDisplayed({timeout:5000})
        await LearnJourneyPage.revisitButton.click()
        }
        else if(await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({timeout:10000})
        await browser.pause(3000)
        expect(nodeOutsideChapName).toEqual(await LearnJourneyPage.currentBreadCrumb.getText()) 
        const navigateToPageThroughBreadCrumb= await $(`//a[contains(text(),'${chapterNameInHomePage}')]`)
        await navigateToPageThroughBreadCrumb.waitForDisplayed({timeout:10000})
        await navigateToPageThroughBreadCrumb.click()
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:10000})
        expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)

    })

    it('318700 TC_26 Varify if the user started and try to quit from the journey functionality', async () => {
        await browser.reloadSession()
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        let subjectName = "mathematics"
        await LearnJourneyPage.navigateToLearnJourneyPage(subjectName)
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL).toHaveTextContaining("journey")
        await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
        await browser.pause(3000)
        const chapterSection = await LearnJourneyPage.getChapterSection(1)
        await chapterSection.waitForDisplayed({ timeout: 10000 })
        await chapterSection.scrollIntoView({ block: "center" })
        await browser.pause(3000)
        allure.startStep("Click on Start Journey Button on Card under chapter",true)
        const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
        await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
        await startJourneyButtonOnCard.click()
        await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({timeout:10000})  
        await browser.pause(4000)
        const nodeName = await LearnJourneyPage.getNodeUnderTopic(1)
        await nodeName.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await nodeName.waitForDisplayed({ timeout: 10000 })
        await nodeName.click()
        await browser.pause(3000)
        allure.startStep("Validation of quit button functionality on Video page",true)
        const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
        if(revisitButton==true)
        {
        await LearnJourneyPage.revisitButton.waitForDisplayed({timeout:5000})
        await LearnJourneyPage.revisitButton.click()
        }
        else if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
            await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.startButtonInNode.click()
        }
        else {
            await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
            await LearnJourneyPage.btnResumeInNode.click()
        }
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({timeout:10000})
        await LearnJourneyPage.quitButton.waitForDisplayed({timeout:10000})
        await browser.pause(3000)
        expect(await LearnJourneyPage.quitButton.isDisplayed()).toEqual(true)
        await LearnJourneyPage.quitButton.click()
        await LearnJourneyPage.quitText.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.quitText.getText()).toEqual('Are you sure you want to quit?')
        await LearnJourneyPage.quitButton.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.quitButton.isDisplayed()).toEqual(true)
        await LearnJourneyPage.cancelButton.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.cancelButton.isDisplayed()).toEqual(true)
        await LearnJourneyPage.cancelButton.click()
        await browser.pause(2000)
        await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({timeout:10000})
        await LearnJourneyPage.quitButton.waitForDisplayed({timeout:10000})
        await LearnJourneyPage.quitButton.click()
        await browser.pause(2000)
        await LearnJourneyPage.cancelButton.waitForDisplayed({ timeout: 10000 })
        await browser.pause(2000)
        await LearnJourneyPage.quitButton.click()
        await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:10000})
        expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)

    })
    it('318660 TC_27 Verify the entry point for learn journey from home page', async () => {
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail('8th Grade', 'premium')
        allure.startStep("Navigate to Learn Journey Page", true)
        await LearnJourneyPage.btnSubject.waitForDisplayed({timeout:5000})
        await LearnJourneyPage.btnSubject.click()
        allure.startStep("Validate Learn Journey Page", true)
        let currentURL = await browser.getUrl()
        expect(currentURL.includes("journey")).toEqual(true)
        await LearnJourneyPage.tickmark.waitForDisplayed({ timeout: 20000 })
        expect(await LearnJourneyPage.tickmark.isExisting()).toEqual(true)

    })

    it("352288 TC_28 Validate the Learn journey for BDLC user", async () => {
        let cohortDetail = loginData.sanityData.cohortDetails[7]
        allure.startStep("Change cohort Details", true)
        await ProfilePage.changeCohortDetail(cohortDetail, 'bdlc')
        allure.startStep("Navigate to Learn Journey Page", true)
        await LearnJourneyPage.clickPhysicsSubject.click()
        await LearnJourneyPage.topicPhysicsText.waitForExist({ timeout: 10000 })
        expect(await LearnJourneyPage.topicPhysicsText.isExisting()).toEqual(true)
        allure.endStep();
    });

})
