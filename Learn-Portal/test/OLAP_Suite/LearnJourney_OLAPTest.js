import { AllureUtil as allure } from "../../utils/util.allure"
import LearnJourney from '../../Pages/learnJourneyPage.js'
import CloudWatchPage from "../../Pages/CloudWatchPage";
import ProfilePage from "../../Pages/ProfilePage";
import ByjusClassesPage from "../../Pages/ByjusClassesPage";
import LoginPage from "../../Pages/LoginPage";
import { loginData } from "../../Data/LoginData";
import { getUserId } from "../../utils/function"
import learnJourneyPage from "../../Pages/learnJourneyPage.js";
let pre_Class_data = require('../../Data/OLAP_data/byjusclassPre_class_OLAP_DATA.json')
let post_Class_data = require('../../Data/OLAP_data/byjusClassPost_class_OLAPData.json')
let learnJourneyData = require('../../Data/OLAP_data/learnJourney_OLAP_Data.json')
let userID 


describe("OLAP- Learn journey", async () => {
    it("318721 TC_01 Learn Journey -Jounery page Validate Olap event 9202038-Land on subject journey page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        allure.startStep("Land on subject journey page event triggered  - 9202038", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202038",userID,learnJourneyData)).toEqual(true)
        allure.endStep()

    })

    it("318722 TC_02 Learn Journey -Jounery page Validate Olap event 9202017-Click continue journey", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.BtnContinueJourneyUnderResumeJourney.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.BtnContinueJourneyUnderResumeJourney.click()
        allure.startStep("Click continue journey event triggered  - 9202017", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202017",userID,learnJourneyData)).toEqual(true)
        allure.endStep()

    })
    it("318723 TC_03 Learn Journey -Jounery page Validate Olap event 9202018-Click start journey", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        allure.startStep("Click start journey event triggered  - 9202018", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202018",userID,learnJourneyData)).toEqual(true)
        allure.endStep()

    })

    it("318724 TC_04 Learn Journey -Jounery page Validate Olap event 9202019-View journey page", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        allure.startStep("View journey page event triggered  - 9202019", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202019",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318725 TC_05 Learn Journey -Jounery page Validate Olap event 9202020-click on node", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        allure.startStep("click on node event triggered  - 9202020", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202020",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318726 TC_06 Learn Journey -Jounery page Validate Olap event 9202021-view node", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        allure.startStep("view node event triggered  - 9202021", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202021",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318727 TC_07 Learn Journey -Jounery page Validate Olap event 9202022-click the option on node", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        allure.startStep("click the option on node event triggered  - 9202022", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202022",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318728 TC_08 Learn Journey -Jounery page Validate Olap event 9202023-node completion", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:25000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 25000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.scrollIntoView({block:"center"})
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnMCQAnswer.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnMCQAnswer.click()
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        allure.startStep("node completion node event triggered  - 9202023", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202023",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318729 TC_09 Learn Journey -Jounery page Validate Olap event 9202024-click continue after node completion", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:25000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnMCQAnswer.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnMCQAnswer.click()
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnContinue.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnContinue.click()
        allure.startStep("click continue after node completion event triggered  - 9202024", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202024",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318730 TC_10 Learn Journey -Jounery page Validate Olap event 9202025-video start view", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        allure.startStep("video start view event triggered  - 9202025", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202025",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

  

    it("318734 TC_11 Learn Journey -Jounery page Validate Olap event 9202029-Click on next button", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        allure.startStep("Click on next button event triggered  - 9202029", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202029",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318735 TC_12 Learn Journey -Jounery page Validate Olap event 9202030-Click on quit button", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnQuit.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnQuit.click()
        allure.startStep("Click on quit button event triggered  - 9202030", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202030",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318737 TC_13 Learn Journey -Learn Journey -Jounery page Validate Olap event 9202032-question view", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        allure.startStep("question view event triggered  - 9202032", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202032",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318738 TC_14 Learn Journey -Jounery page Validate Olap event 9202033-select option", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnMCQAnswer.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnMCQAnswer.click()
        allure.startStep("select option event triggered  - 9202033", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202033",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318739 TC_15 Learn Journey -Jounery page Validate Olap event 9202034-submit answer", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnMCQAnswer.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnMCQAnswer.click()
        await LearnJourney.submitBtnInVideoPage.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.submitBtnInVideoPage.click()
        allure.startStep("submit answer event triggered  - 9202034", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202034",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318740 TC_16 Learn Journey -Learn Journey -Jounery page Validate Olap event 9202035-retake quiz", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnNext(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnNext(1).click()
        await LearnJourney.btnMCQWrongAnswer.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnMCQWrongAnswer.click()
        await LearnJourney.btnSubmit.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnSubmit.click()
        await LearnJourney.btnRetake.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnRetake.click()
        allure.startStep("retake quiz triggered  - 9202035", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202035",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318741 TC_17 Learn Journey -Jounery page Validate Olap event 9202036-click on back button", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        for (let i=0;i<10;i++){
            await browser.keys(["PageDown"])
            try{await LearnJourney.topicThrustPressure.waitForDisplayed({timeout:500})}catch{}
            if(await LearnJourney.topicThrustPressure.isDisplayed()){
                break
            }
        }
        await LearnJourney.btnFirstNode.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnFirstNode.click()
        let revisitButton = await LearnJourney.revisitButton.isClickable()
        if (revisitButton) {
            await LearnJourney.revisitButton.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.revisitButton.click()
        }
        else {
            await LearnJourney.startButtonInNode.waitForDisplayed({ timeout: 15000 })
            await LearnJourney.startButtonInNode.click()
        }
        await LearnJourney.btnBack.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnBack.click()
        allure.startStep("click on back button triggered  - 9202036", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202036",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })
    it("318742 TC_18 Learn Journey -Jounery page Validate Olap event 9202037-click on show jounrey arrow mark", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[7],'premium')
        userID = await getUserId()
        await LearnJourney.clickPhysicsSubject.waitForDisplayed({timeout:20000})
        await LearnJourney.clickPhysicsSubject.click()
        await LearnJourney.topicThrustPressure.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.topicThrustPressure.click()
        await LearnJourney.upArrowInJourneyPage.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.upArrowInJourneyPage.click()
        allure.startStep("click on show jounrey arrow mark event triggered  - 9202037", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataLearnJourney("9202037",userID,learnJourneyData)).toEqual(true)
        allure.endStep()
    })

    it("318716 TC_19 Learn Journey_In Pre requisites Upcoming tab -Validate Olap event 9202002-click start journey on classes_page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await LearnJourney.btnArrowOfLearnJourneyPrePost.waitForDisplayed({timeout:20000})
        await LearnJourney.btnArrowOfLearnJourneyPrePost.click()
        allure.startStep("Click start journey on classes_page  - 9202002", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202002", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()
    })

    it("318717 TC_20 Learn Journey_In Post requisites Completed tab -Validate Olap event 9202002-click start journey on classes_page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await LearnJourney.btnRevisionMaterial(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnRevisionMaterial(1).click()
        await LearnJourney.btnRevisionMaterialArrow(1).waitForDisplayed({ timeout: 5000})
        await LearnJourney.btnRevisionMaterialArrow(1).click()
        allure.startStep("Click start journey on classes_page  - 9202002", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202002", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()
    })

    it("318718 TC_21 Learn Journey_In session details page Pre requisites Upcoming tab -Validate Olap event 9202009-click start journey on classes_page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await LearnJourney.btnSeeMoreOfLJ.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnSeeMoreOfLJ.click()
        await LearnJourney.btnStartJourneyLJ.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnStartJourneyLJ.click()
        allure.startStep("Click start journey on classes_page  - 9202009", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202009", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()
    })

    it("318719 TC_22 Learn Journey_In session details page Pre requisites Completed tab -Validate Olap event 9202009-click start journey on classes_page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await LearnJourney.btnRevisionMaterialSeeMore(1).waitForDisplayed({ timeout: 10000})
        await LearnJourney.btnRevisionMaterialSeeMore(1).click()
        await LearnJourney.btnPrepareforSessionStartJourney(1).waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnPrepareforSessionStartJourney(1).click()
        allure.startStep("Click start journey on classes_page  - 9202009", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202009", userID, pre_Class_data, 'pre_class')).toEqual(true)
        allure.endStep()
    })

    it("318720 TC_23 Learn Journey_In Session deatils page Post requisites Completed tab -Validate Olap event 9202009-click start journey on classes_page ", async () => {
        await ProfilePage.changeCohortDetail(loginData.sanityData.cohortDetails[8], 'prePostUser')
        userID = await getUserId()
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({ timeout: 15000 })
        await ByjusClassesPage.btnCompletedTab.click()
        await LearnJourney.btnRevisionMaterialSeeMore(1).waitForDisplayed({ timeout: 10000})
        await LearnJourney.btnRevisionMaterialSeeMore(1).click()
        await LearnJourney.btnStartJourneyLJ.waitForDisplayed({ timeout: 15000 })
        await LearnJourney.btnStartJourneyLJ.click()
        allure.startStep("Click start journey on classes_page  - 9202009", true)
        expect(await CloudWatchPage.getAndCompareCloudwatchDataPrePost("9202009", userID, post_Class_data, 'post_class')).toEqual(true)
        allure.endStep()
    })
})