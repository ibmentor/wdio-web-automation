import LearnJourneyPage from '../../Pages/LearnJourneyPage'
import ProfilePage from '../../Pages/ProfilePage'
import { AllureUtil as allure } from "../../utils/util.allure"
import { learnJourneyData } from '../../Data/LearnJourneyData';
describe('Learn Journey Module',async () => {

  it('318666 TC_11 Verify that after loading animation(3sec) user should navigate to journey map screen and formation of map should start and the nodes appear with node names followed by node arrangement', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    await browser.pause(2000)
    allure.startStep("Validation of journey map after the loading of animation(3sec) and noded appearance and its names under respective Node",true)
    await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout: 3000 })
    const totalNodesCount = await LearnJourneyPage.totalNodesUnderTopic.length
    expect(totalNodesCount).toBeGreaterThan(0)
    for (let i = 1; i <= totalNodesCount; i++) {
        const nodeName = await LearnJourneyPage.getTopicNameOutsideNode(i)
        await nodeName.scrollIntoView({ block: "center" })
        await browser.pause(2000)
        await nodeName.waitForDisplayed({ timeout: 10000 })
        expect(await nodeName.isDisplayed()).toEqual(true)
    }
    await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({ timeout: 3000 })
    await LearnJourneyPage.backButtonInJourneyPage.click()
    await LearnJourneyPage.homeButtonInSubjectPage.waitForDisplayed({ timeout: 10000 })
    await LearnJourneyPage.homeButtonInSubjectPage.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    expect(await LearnJourneyPage.homeButtonInSubjectPage.isDisplayed()).toEqual(true)
});

it('318670 TC_13 Verify the elements in first node card', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 3)
    await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
    await startJourneyButtonOnCard.click()
    allure.startStep("Validate the elements in first node card",true)
    await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
    const topicNameOutsideNode = await LearnJourneyPage.getTopicNameOutsideNode(1)
    const node = await LearnJourneyPage.getNodeUnderTopic(1)
    await node.waitForDisplayed({ timeout: 5000 })
    await node.scrollIntoView({ block: "center" })
    await node.pause(2000)
    await node.click()
    await browser.pause(3000)
    const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
    if(revisitButton==false)
    {
    await LearnJourneyPage.dataForNode.waitForDisplayed({ timeout: 5000 })
    const topicNameInsideNode = await LearnJourneyPage.topicNameInsideNode.getText()
    expect(await topicNameOutsideNode.getText()).toEqual(topicNameInsideNode)
    expect(await LearnJourneyPage.dataForNode).toHaveTextContaining('What will be covered?')
    expect(await LearnJourneyPage.dataForNode).toHaveTextContaining('Video')
    expect(await LearnJourneyPage.dataForNode).toHaveTextContaining('Question' || 'Assesment')
    expect(await LearnJourneyPage.startButtonInNode.isDisplayed()).toEqual(true)
    }
})

it('318671 TC_27 Verify the functionality of upward vector', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    allure.startStep("Validation of functionality of upward vector",true)
    await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
    await LearnJourneyPage.upArrowInJourneyPage.waitForDisplayed({ timeout: 10000 })
    expect(await LearnJourneyPage.upArrowInJourneyPage.isDisplayed()).toEqual(true)
    await LearnJourneyPage.upArrowInJourneyPage.click();
    await browser.pause(2000)
    expect(await LearnJourneyPage.topicListItems.length).toBeGreaterThan(0)
    for (let i = 1; i <= await LearnJourneyPage.topicListItems.length; i++) {
        const checkBoxUnderNode = await LearnJourneyPage.getCheckBoxOfEachNodeUnderBottomCard(i)
        await checkBoxUnderNode.waitForDisplayed({ timeout: 5000 })
        expect(await checkBoxUnderNode.isDisplayed()).toEqual(true)
    }

    await LearnJourneyPage.downArrowInJourneyPage.waitForDisplayed({ timeout: 5000 })
    await LearnJourneyPage.downArrowInJourneyPage.click();

});

it('318673 TC_14 Verify that first node should display and user should be redirected to the resource screen( Video or Question or assessments or interactions) by clicking on "Lets start " CTA', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
    allure.startStep("Validate Learn Journey Page", true)
    let currentURL = await browser.getUrl()
    expect(currentURL).toHaveTextContaining("journey")
    await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({ timeout: 10000 })
    await browser.pause(3000)
    const chapterSection = await LearnJourneyPage.getChapterSection(1)
    await chapterSection.waitForDisplayed({ timeout: 10000 })
    await chapterSection.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    allure.startStep("Click on start journey button",true)
    const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(2,2)
    await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
    await startJourneyButtonOnCard.click()
    allure.startStep("Validate that after clicking Start CTA button in Node should be redirected to the resource screen( Video or Question or assessments or interactions)",true)
    await LearnJourneyPage.topicBottomCard.waitForDisplayed({ timeout: 5000 })
    await browser.pause(5000)
    const totalNodesCount = await LearnJourneyPage.totalNodesUnderTopic.length
    for(let i=1;i<=totalNodesCount;i++)
    {
    const node = await LearnJourneyPage.getNodeUnderTopic(i)
    await node.waitForDisplayed({ timeout: 5000 })
    await node.scrollIntoView({ block: "center" })
    await node.pause(2000)
    await node.click()
    const revisitButton=await LearnJourneyPage.revisitButton.isDisplayed()
        if(revisitButton==false)   
        {
            await node.click()
            break;
        }
    }
    await browser.pause(3000)
    if (await LearnJourneyPage.startButtonInNode.isDisplayed()) {
        await LearnJourneyPage.startButtonInNode.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.startButtonInNode.click()
    }
    else {
        await LearnJourneyPage.btnResumeInNode.waitForDisplayed({ timeout: 10000 })
        await LearnJourneyPage.btnResumeInNode.click()
    }

    await LearnJourneyPage.videoTabInsideNode.waitForDisplayed({ timeout: 10000 })
    const questionTabInsideNode= await LearnJourneyPage.getQuestionTabInsideNode(1)
    expect(await questionTabInsideNode.isDisplayed()).toEqual(true)
    expect(await LearnJourneyPage.videoTabInsideNode.isDisplayed()).toEqual(true)
    await LearnJourneyPage.backButtonInVideoTabPage.waitForDisplayed({ timeout: 10000 })
    await LearnJourneyPage.backButtonInVideoTabPage.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await LearnJourneyPage.backButtonInVideoTabPage.click()
    await LearnJourneyPage.backButtonInJourneyPage.waitForDisplayed({timeout:10000})
    
})

it('318675 TC_20 Verify that on completion of node and navigating back to journey map screen user should be shown the node completion tick mark animation', async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    const startJourneyButtonOnCard = await LearnJourneyPage.getStartJourneyButtonOnCard(1, 1)
    await startJourneyButtonOnCard.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await startJourneyButtonOnCard.waitForDisplayed({ timeout: 10000 })
    await startJourneyButtonOnCard.click()
    allure.startStep("Validate completion of node and navigating back to journey map screen user should be shown the node completion tick mark animation",true)
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
          const topicNameInSideCard=await LearnJourneyPage.topicNameInsideNode.getText()
          await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:5000})
          await LearnJourneyPage.topicBottomCard.scrollIntoView({ block: "center" })
          await browser.pause(2000)
          await LearnJourneyPage.upArrowInJourneyPage.waitForDisplayed({timeout:5000})
          await LearnJourneyPage.upArrowInJourneyPage.click()
          const nodeTickCompletionStatusInBottomCard=await $(`//*[contains(@class,'learnJourney_topicListItem')]/..//*[contains(@class,'checkmark')]/../..//*[contains(text(),'${topicNameInSideCard}')]`)
          const nodeCompletedStatusInBottomCard=await $(`//*[contains(@class,'learnJourney_topicListItem')]/..//*[contains(@class,'checkmark')]/../..//*[contains(text(),'${topicNameInSideCard}')]/./..//*[contains(text(),'Completed')]`)
          await nodeTickCompletionStatusInBottomCard.waitForDisplayed({timeout:5000})
          expect(await nodeTickCompletionStatusInBottomCard.isDisplayed()).toEqual(true)
          await browser.pause(2000)
          expect(await nodeCompletedStatusInBottomCard.isDisplayed()).toEqual(true)
          await LearnJourneyPage.downArrowInJourneyPage.waitForDisplayed({timeout:5000})
          await LearnJourneyPage.downArrowInJourneyPage.click()
        }
             
    }
   
})

it('318698 TC_24 Verify retake functionality if any wrong question is selected', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    allure.startStep("Validation of retake functionality in question page",true)
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
    await LearnJourneyPage.nextButtonInVideoPage.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.nextButtonInVideoPage.click()
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
        await LearnJourneyPage.nextButtonInVideoPage2.click() //new add
        await browser.pause(2000)
    }
    await LearnJourneyPage.questionData.waitForDisplayed({timeout:10000})
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
        await LearnJourneyPage.selectOption(learnJourneyData.qa.optionDetails[0])
        await browser.pause(2000)
    }
    else {
        await LearnJourneyPage.selectOption(learnJourneyData.prod.optionDetails[0])
        await browser.pause(2000)
    }
    expect(await LearnJourneyPage.btnSubmit.isDisplayed()).toEqual(true)
    await LearnJourneyPage.btnSubmit.click()
    await LearnJourneyPage.solutionText.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.solutionText.isDisplayed()).toEqual(true)
    await LearnJourneyPage.btnRetake.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.btnRetake.isDisplayed()).toEqual(true)
    await LearnJourneyPage.btnRetake.click()
    await browser.pause(2000)
    await LearnJourneyPage.questionData.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.questionData.isDisplayed()).toEqual(true)
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
        await LearnJourneyPage.selectOption(learnJourneyData.qa.optionDetails[1])
        await browser.pause(2000)
    }
    else {
        await LearnJourneyPage.selectOption(learnJourneyData.prod.optionDetails[1])
        await browser.pause(2000)
    }
    await LearnJourneyPage.btnSubmit.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.solutionText.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.solutionText.isDisplayed()).toEqual(true)
    await LearnJourneyPage.nextButton.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.nextButton.click()
    await browser.pause(5000)
    if (await LearnJourneyPage.completionTickMarkForQuestion.isDisplayed()) {
        await LearnJourneyPage.completionTickMarkForQuestion.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.completionConfirmText.isDisplayed()).toEqual(true)
        expect(await LearnJourneyPage.continueButton.isDisplayed()).toEqual(true)
    }
    else {
        await LearnJourneyPage.completionTickMarkForJourney.waitForDisplayed({ timeout: 10000 })
        expect(await LearnJourneyPage.completionTickMarkForJourney.isDisplayed()).toEqual(true)
    }

});

it('318652 TC_03 Validate subject logo and subject heading',async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade','premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    let subjectName="mathematics"
    await LearnJourneyPage.btnSubject.click()
    allure.startStep("Validate Learn Journey Page", true)
    let currentURL=await browser.getUrl()
    expect(currentURL).toHaveTextContaining("journey")
    await LearnJourneyPage.ChapterCard.waitForDisplayed({timeout:10000})
    allure.startStep("Validate subject logo and subject heading",true)
    expect(await LearnJourneyPage.subjectLogo.isDisplayed()).toEqual(true)
    expect(await LearnJourneyPage.subjectNameOnCard.isDisplayed()).toEqual(true)        
    expect((await LearnJourneyPage.subjectNameOnCard.getText()).toLowerCase()).toEqual(subjectName)
});

it('318654 TC_05 Validate no. of journey under subject name',async() => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade','premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
    allure.startStep("Validate Learn Journey Page", true)
    let currentURL=await browser.getUrl()
    expect(currentURL).toHaveTextContaining("journey")
    await LearnJourneyPage.ChapterCard.waitForDisplayed({timeout:10000})
    allure.startStep("Validate no. of journey under subject name",true)
    expect(await LearnJourneyPage.labelJourneyWithTick.isDisplayed()).toEqual(true)
});

it('318655 TC_06 Validate resume journey section',async() => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade','premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
    allure.startStep("Validate Learn Journey Page", true)
    let currentURL=await browser.getUrl()
    expect(currentURL).toHaveTextContaining("journey")
    await LearnJourneyPage.resumeJourneyTitle.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.resumeJourneyTitle.isDisplayed()).toEqual(true)
    expect(await LearnJourneyPage.resumeJourneyTitle.getText()).toEqual('Resume Journey')
    allure.startStep("Validate the elements under resume journey section", true)
    await browser.pause(3000)
    const continueButtonDisplayed= await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.isDisplayed()
   if(continueButtonDisplayed==false)
   {
    await LearnJourneyPage.btnStartJourneyCTAUnderResumeJourney.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.btnStartJourneyCTAUnderResumeJourney.isDisplayed()).toEqual(true)
   }
   else 
   {
    await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.BtnContinueJourneyUnderResumeJourney.isDisplayed()).toEqual(true)

   }
});

it('318701 TC_25 Verify that tapping on Yes button in "Are you sure you want to quit?" bottom sheet dialog, user should navigate to journey map screen', async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail('8th Grade', 'premium')
    allure.startStep("Navigate to Learn Journey Page", true)
    await LearnJourneyPage.btnSubject.click()
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
    allure.startStep("Validation of quit button functionality on Questions page",true)
    const nodeName = await LearnJourneyPage.getNodeUnderTopic(1)
    await nodeName.scrollIntoView({ block: "center" })
    await browser.pause(2000)
    await nodeName.waitForDisplayed({ timeout: 10000 })
    await nodeName.click()
    await browser.pause(3000)
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
    await LearnJourneyPage.nextButtonInVideoPage.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.nextButtonInVideoPage.click()
    if (process.env.ENV == "qa" || process.env.ENV == "uat") {
        await LearnJourneyPage.nextButtonInVideoPage2.click() //new add
        await browser.pause(2000)
    }
    await LearnJourneyPage.questionData.waitForDisplayed({timeout:10000})
    await browser.pause(3000)
    expect(await LearnJourneyPage.quitButton.isDisplayed()).toEqual(true)
    await LearnJourneyPage.quitButton.scrollIntoView({block:"center"})
    await browser.pause(3000)
    await LearnJourneyPage.quitButton.click()
    await LearnJourneyPage.quitText.waitForDisplayed({ timeout: 10000 })
    expect(await LearnJourneyPage.quitText.getText()).toEqual('Are you sure you want to quit?')
    await LearnJourneyPage.quitButton.waitForDisplayed({ timeout: 10000 })
    expect(await LearnJourneyPage.quitButton.isDisplayed()).toEqual(true)
    await LearnJourneyPage.cancelButton.waitForDisplayed({ timeout: 10000 })
    expect(await LearnJourneyPage.cancelButton.isDisplayed()).toEqual(true)
    await LearnJourneyPage.cancelButton.click()
    await browser.pause(2000)
    await LearnJourneyPage.questionData.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.quitButton.waitForDisplayed({timeout:10000})
    await LearnJourneyPage.quitButton.click()
    await LearnJourneyPage.cancelButton.waitForDisplayed({ timeout: 10000 })
    await browser.pause(2000)
    await LearnJourneyPage.quitButton.click()
    await LearnJourneyPage.topicBottomCard.waitForDisplayed({timeout:10000})
    expect(await LearnJourneyPage.topicBottomCard.isDisplayed()).toEqual(true)

});
})
