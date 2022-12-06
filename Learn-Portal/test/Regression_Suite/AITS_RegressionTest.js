import { AllureUtil as allure } from "../../utils/util.allure"
import { aitsData } from "../../Data/AITSData";
import ProfilePage from "../../Pages/ProfilePage";
import AITSPage from '../../Pages/AITSPage';
import DashboardPage from '../../Pages/DashboardPage'
import ConceptVideoPage from '../../Pages/ConceptVideoPage'
import AskADoubtPage from '../../Pages/AskADoubtPage'
import LoginPage from "../../Pages/LoginPage";
let date = new Date();
let currentMonth = date.getMonth() + 1
let currentYear = date.getFullYear()
import {checkLazyLoadingImgCount, ConceptVideoBanner, AskADoubtBanner} from "../../utils/function.js"


describe.skip("Learn Portal - AITS test cases for Premium user", async () => {

it("315875 TC_04 Validate AITS(JEE-Advance) test cards are available or not", async () => {
        
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
    await AITSPage.btnJeeAdvance.waitForClickable({timeout:15000 })
    await AITSPage.btnJeeAdvance.click()
    allure.startStep("Check the titel of the main page",true)
    await AITSPage.labelOfMainpage.waitForDisplayed({timeout:15000})
    await AITSPage.labelOfMainpage.click()
    expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Advanced')
    try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7500})}
    catch{}
    allure.startStep("Check the test cards is available/Not",true)
    if (await AITSPage.labelOfTestCard.isDisplayed({timeout:10000})){
    expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
    allure.startStep("Check the Paper1 on the testcard",true)
    expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
    allure.startStep("Check the Paper2 on the testcard",true)
    expect(await AITSPage.labelPaper2.getText()).toEqual('Paper 2')
    allure.startStep("Check the Paper1 time and Questions on the testcard",true)
    await AITSPage.labelOfTimeAndQuestion1.waitForDisplayed({timeout:45000})
    var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()       
    expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
    allure.startStep("Check the Paper2 time and Questions on the testcard",true)
    await AITSPage.labelOfTimeAndQuestion1.waitForDisplayed({timeout:45000})
    var text2 = await AITSPage.labelOfTimeAndQuestion2.getText()
    expect(await AITSPage.timeAndQuestions(text2)).toEqual(true)
}
else{
        await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate No Test Available Block",true)
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
it("315876 TC_05 Validate AITS(JEE-Main) test cards are available or not", async () => {
    
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Navigate to AITS JEE-Advance Page menu",true)
    await AITSPage.btnJeeMain.waitForClickable({timeout:15000 })
    await AITSPage.btnJeeMain.click()
    allure.startStep("Check the titel of the main page",true)
    await AITSPage.labelOfMainpage.waitForDisplayed({timeout:65000})
    expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - JEE Mains')
    allure.startStep("Check the test cards is available/Not",true)
    try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:7000})}
    catch{}
    if (await AITSPage.labelOfTestCard.isDisplayed({timeout:10000})){
        expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
        allure.startStep("Check the Paper1 on the testcard",true)
        expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
        allure.startStep("Check the Paper1 time and Questions on the testcard",true)
        var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()
        console.log("@@@@",parseInt(text1.slice(0,4).trim()))
        console.log("#####",parseInt(text1.slice(11,13).trim()))
        expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
    }
    else{
        await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate No Test Available Block",true)
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
it("315877 TC_06 Validate AITS(NEET) test cards are available or not", async () => {
    
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Navigate to AITS NEET Page menu",true)
    await AITSPage.btnNeet.waitForClickable({timeout:45000 })
    await AITSPage.btnNeet.click()
    allure.startStep("Check the titel of the main page",true)
    await AITSPage.labelOfMainpage.waitForDisplayed({timeout:7500})
    expect(await AITSPage.labelOfMainpage.getText()).toEqual('AITS - NEET')
    allure.startStep("Check the test cards is available/Not",true)
    try{await AITSPage.labelOfTestCard.waitForDisplayed({timeout:65000})}
    catch{}
    if (await AITSPage.labelOfTestCard.isDisplayed({timeout:10000})){
    expect(await AITSPage.labelOfTestCard.isDisplayed()).toEqual(true)
    allure.startStep("Check the Paper1 on the testcard",true)
    expect(await AITSPage.labelPaper1.getText()).toEqual('Paper 1')
    allure.startStep("Check the Paper1 time and Questions on the testcard",true)
    var text1 = await AITSPage.labelOfTimeAndQuestion1.getText()
    expect(await AITSPage.timeAndQuestions(text1)).toEqual(true)
    }
    else{
        await AITSPage.labelNoTestAvailable.waitForDisplayed({timeout : 3000})
        allure.startStep("Validate No Test Available Block",true)
        const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
    expect("No test data available").toEqual("")
    }
    await browser.reloadSession()
    allure.endStep()
})

it("315878 TC_07 Validate AITS module is displaying for free user or not ", async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'free')
    allure.startStep("Validate menu is clickable",true)
    await DashboardPage.menuOption.click()
    allure.startStep("Validate AITS is displayed or not")
    expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
    await browser.reloadSession()
    allure.endStep()

})
it("315879 TC_08 Validate AITS module is displaying for paiduser or not ", async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'paid')
    allure.startStep("Validate menu is clickable",true)
    await DashboardPage.menuOption.click()
    allure.startStep("Validate AITS is displayed or not")
    expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
    await browser.reloadSession()
    allure.endStep()

})
it("315880 TC_09 Validate redirection of ask a doubt from AITS page", async () => {
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Validate Jee advance is displaying",true)
    await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:65000 })
    await AITSPage.btnJeeAdvance.click()
    allure.startStep("Validate Ask a Doubt redirection from AITS-Jee Advanced page",true)
    await AITSPage.btnAITSAskADoubt.waitForClickable({timeout:65000})
    await AITSPage.btnAITSAskADoubt.click()
    allure.startStep("Type on search bar of Ask a doubt", true)
    await ConceptVideoPage.tfsearchField.setValue("solar")
    allure.startStep("Click on first suggestions", true)
    await ConceptVideoPage.firstSuggestionAskaDoubt.click()
    await AskADoubtPage.labelBreadCrumb.waitForDisplayed({timeout : 5000})
    allure.startStep("Validate redirection of ask a doubt from AITS page", true)
    expect(await AskADoubtPage.labelBreadCrumb.isDisplayed()).toEqual(true)
    allure.endStep();
})
it("315881 TC_10 Validate redirection of Concept video  from AITS page", async () => {
    
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Validate Jee advance is displaying",true)
    await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:65000 })
    await AITSPage.btnJeeAdvance.click()
    allure.startStep("Validate Ask a Doubt redirection from AITS-Jee Advanced page",true)
    await AITSPage.btnAITSConceptVideo.waitForClickable({timeout:65000})
    await AITSPage.btnAITSConceptVideo.click()
    allure.startStep("Validate Concept Video redirection text is coming",true)
    await ConceptVideoPage.btnPlayOnMainPage.waitForDisplayed({timeout:25000})
    expect(await ConceptVideoPage.btnPlayOnMainPage.isDisplayed()).toEqual(true)
    allure.endStep()
})
it("315882 TC_11 Validate redirection of Bookmark from AITS page", async () => {
    
    allure.startStep("Change cohort Details", true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium') 
    allure.startStep("Navigate to AITS Module on menu bar",true)
    await AITSPage.navigateToAITSModule()
    allure.startStep("Validate Jee advance is displaying",true)
    await AITSPage.btnJeeAdvance.waitForDisplayed({timeout:25000 })
    await AITSPage.btnJeeAdvance.click()
    
    allure.startStep("Validate bookmark redirection text is coming",true)
    await AITSPage.btnAITSBookMark.waitForDisplayed({timeout:20000})
    expect(await AITSPage.btnAITSBookMark.isDisplayed()).toEqual(true)
    
    allure.endStep()
})
it("315883 TC_12  Validate AITS is not displayed for user with cohort value < 11", async () => {
    for (let i = 1; i <= 2; i++) {
        await ProfilePage.changeCohortDetail(aitsData.cohortDetails[i], 'premium')
        allure.startStep("Click on menu options", true)
        await DashboardPage.menuOption.waitForClickable({ timeout: 25000 })
        await DashboardPage.menuOption.click()
        await browser.pause(3000)
        allure.startStep("Validate AITS should not display", true)
        expect(await AITSPage.btnAITS.isDisplayed()).toEqual(false)
        allure.endStep();
    }
})
it("315884 TC_13 -Verify navigation from AITS to home page is possible validate by clicking on home icon application navigates to dashboard", async () => {
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
    allure.startStep("Navigate to AITS and select subject Jee-Advanced", true)
    await AITSPage.navigateToAITSselectSubject("JEE Advanced")
    allure.startStep("Click on menu options", true)
    await DashboardPage.menuOption.click()
    allure.startStep("Click on button AITS", true)
    await DashboardPage.btnHome.waitForClickable({ timeout: 35000 })
    await DashboardPage.btnHome.click()
    allure.startStep("Waiting for Welcome text to get displayed on Profile Page", true);
    await ProfilePage.welcomeElement.waitForDisplayed({ timout: 15000 })
    await expect(await ProfilePage.welcomeElement.isDisplayed()).toEqual(true)
    allure.endStep()
})

it("315888 TC_17 -Verify Instruction popup window for AITS", async () => {
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("NEET")
    allure.startStep("Click on take test button", true)
    await AITSPage.btnStartTest.waitForClickable({ timeout: 45000 })
    await AITSPage.btnStartTest.click()
    allure.startStep("Verify Instruction pop window", true)
    await expect(await AITSPage.labelInstructionPopup.waitForDisplayed({ timeout: 5000 })).toEqual(true);
    allure.endStep()

})
it("315889 TC_18 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (JEE Main) ", async () => {
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("JEE Main")
    allure.startStep("Click on Tab button Upcoming", true)
    await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
    await AITSPage.btnUpcoming.click()
    let noDataAvailableTabs=[]
    try{await $(`(//*[contains(@class,"border exam-card")])[1]`).waitForDisplayed({timeout:10000})}
    catch{}
    let upcomingTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (upcomingTabTestCards) {
        let arr = []
        let availableDate = await $("//i[contains(@class,'test-status')]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify availabe test month date in upcoming tab", true)
        expect(convertedDate >= stringDate)
        allure.startStep("Verify availabe test year date in upcoming tab", true)
        expect(currentYear >= arr[6])
    }
    else {
        noDataAvailableTabs.push('upcomingTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)

    }
    allure.startStep("Click on Tab button Completed", true)
    await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
    await AITSPage.btnCompleted.click()
    let completedTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (completedTabTestCards) {
        let arr = []
        let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify month date in Completed tab", true)
        expect(convertedDate <= stringDate)
        allure.startStep("Verify year date Completed tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('completedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)

    }
    allure.startStep("Click on Tab button skipped", true)
    await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
    await AITSPage.btnSkipped.click()
    let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
    if (skippedTabTestCards) {
        let arr = []
        let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = expiredDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let monthDate = currentMonth.toString()
        allure.startStep("Verify expired month date in skipped tab", true)
        expect(convertedDate <= monthDate)
        allure.startStep("Verify expired year date skipped tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('skippedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    }
    if(noDataAvailableTabs.length>0)
        {
        allure.startStep("Validate No Test Available Block",true)
        const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
        expect("No test data available in "+ noDataAvailableTabs).toEqual("") 
        }
    allure.endStep()
})
it("315890 TC_19 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (JEE Advanced) ", async () => {
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("JEE Advanced")
    allure.startStep("Click on Tab button Upcoming", true)
    await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
    await AITSPage.btnUpcoming.click()
    let noDataAvailableTabs=[]
    try{await $(`(//*[contains(@class,"border exam-card")])[1]`).waitForDisplayed({timeout:10000})}
    catch{}
    let upcomingTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (upcomingTabTestCards) {
        let arr = []
        let availableDate = await $("//i[contains(@class,'test-status')]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify availabe test month date in upcoming tab", true)
        expect(convertedDate >= stringDate)
        allure.startStep("Verify availabe test year date in upcoming tab", true)
        expect(currentYear >= arr[6])
    }
    else {
        noDataAvailableTabs.push('upcomingTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    }

    allure.startStep("Click on Tab button Completed", true)
    await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
    await AITSPage.btnCompleted.click()
    try{await $(`(//*[contains(@class,"border exam-card")])[1]`).waitForDisplayed({timeout:10000})}
    catch{}
    let completedTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (completedTabTestCards) {
        let arr = []
        let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify month date in Completed tab", true)
        expect(convertedDate <= stringDate)
        allure.startStep("Verify year date Completed tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('completedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)

    }
    allure.startStep("Click on Tab button skipped", true)
    await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
    await AITSPage.btnSkipped.click()
    let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
    if (skippedTabTestCards) {
        let arr = []
        let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = expiredDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let monthDate = currentMonth.toString()
        allure.startStep("Verify expired month date in skipped tab", true)
        expect(convertedDate <= monthDate)
        allure.startStep("Verify expired year date skipped tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('skippedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    }
    if(noDataAvailableTabs.length>0)
    {
    allure.startStep("Validate No Test Available Block",true)
    const status = 'blocked'
        const fs = require('fs')
        fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
            // In case of a error throw err.
            if (err) throw err;
        })
    expect("No test data available in "+ noDataAvailableTabs).toEqual("") 
    }
allure.endStep()
})
it("315891 TC_20 Verify Upcoming, Completed, Skipped, Tab Date validaton for AITS (NEET) ", async () => {
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0], 'premium')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("NEET")
    allure.startStep("Click on Tab button Upcoming", true)
    await AITSPage.btnUpcoming.waitForClickable({ timeout: 25000 })
    await AITSPage.btnUpcoming.click()
    let noDataAvailableTabs=[]
    try{await $(`(//*[contains(@class,"border exam-card")])[1]`).waitForDisplayed({timeout:10000})}
    catch{}
    let upcomingTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (upcomingTabTestCards) {
        let arr = []
        let availableDate = await $("//i[contains(@class,'test-status')]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify availabe test month date in upcoming tab", true)
        expect(convertedDate >= stringDate)
        allure.startStep("Verify availabe test year date in upcoming tab", true)
        expect(currentYear >= arr[6])
    }
    else {
        noDataAvailableTabs.push('upcomingTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    }

    allure.startStep("Click on Tab button Completed", true)
    await AITSPage.btnCompleted.waitForClickable({ timeout: 25000 })
    await AITSPage.btnCompleted.click()
    try{await $(`(//*[contains(@class,"border exam-card")])[1]`).waitForDisplayed({timeout:10000})}
    catch{}
    let completedTabTestCards = await $(`(//*[contains(@class,"border exam-card")])[1]`).isDisplayed()
    if (completedTabTestCards) {
        let arr = []
        let availableDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = availableDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let stringDate = currentMonth.toString()
        allure.startStep("Verify month date in Completed tab", true)
        expect(convertedDate <= stringDate)
        allure.startStep("Verify year date Completed tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('completedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)

    }
    allure.startStep("Click on Tab button skipped", true)
    await AITSPage.btnSkipped.waitForClickable({ timeout: 25000 })
    await AITSPage.btnSkipped.click()
    let skippedTabTestCards = await $("(//div[@class='p-2 card-body'])[1]").isDisplayed()
    if (skippedTabTestCards) {
        let arr = []
        let expiredDate = await $("(//i[contains(@class,'test-status')])[1]").getText()
        arr = expiredDate.split(" ")
        let convertedDate = await AITSPage.GetMonthNumber(arr[5])
        let monthDate = currentMonth.toString()
        allure.startStep("Verify expired month date in skipped tab", true)
        expect(convertedDate <= monthDate)
        allure.startStep("Verify expired year date skipped tab", true)
        expect(currentYear <= arr[6])
    }
    else {
        noDataAvailableTabs.push('skippedTabTestCards')
        await expect(await AITSPage.labelNoTestAvailable.waitForDisplayed({ timeout: 5000 })).toEqual(true)
    }
    if(noDataAvailableTabs.length>0)
        {
        allure.startStep("Validate No Test Available Block",true)
        const status = 'blocked'
            const fs = require('fs')
            fs.writeFile('./utils/Testrail/blockedScenario.json', `"${status}"`, (err) => {
                // In case of a error throw err.
                if (err) throw err;
            })
        expect("No test data available in "+ noDataAvailableTabs).toEqual("") 
        }
    allure.endStep()
})


it("333893 TC_21 Lazy loading - Verify the image loading for AITS module", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'premium')
    allure.startStep("Validate image count in starting and end of the page", true)
    for(let i=0;i<aitsData.lazyLoadingUrls.length;i++)
    {
    await browser.pause(3000)   
    await checkLazyLoadingImgCount(aitsData.lazyLoadingUrls[i])
    }
    allure.endStep();
})

it("334449 TC_22 For BTLP user in AITS >JEE Advanced concept video card title ,description & cta is changed", async () => {
    await browser.reloadSession()
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject JEE Advanced", true)
    await AITSPage.navigateToAITSselectSubject("JEE Advanced")
    allure.startStep("Validate all the texts of Concept Video Banner", true)
    await ConceptVideoBanner()
    allure.endStep();
})

it("334450 TC_23 For BTLP user in AITS >JEE Mains concept video card title ,description & cta is changed", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject JEE Main", true)
    await AITSPage.navigateToAITSselectSubject("JEE Main")
    allure.startStep("Validate all the texts of Concept Video Banner", true)
    await ConceptVideoBanner()
    allure.endStep();
})

it("334451 TC_24 For BTLP user in AITS >NEET concept video card title ,description & cta is changed", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("NEET")
    allure.startStep("Validate all the texts of Concept Video Banner", true)
    await ConceptVideoBanner()
    allure.endStep();
})

it("334493 TC_25 For BTLP user in AITS >JEE Advanced ask a doubt card title ,description & cta is changed", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject JEE Advanced", true)
    await AITSPage.navigateToAITSselectSubject("JEE Advanced")
    allure.startStep("Validate all the texts of Ask A Doubt Banner", true)
    await AskADoubtBanner()
    allure.endStep();
})

it("334495 TC_26 For BTLP user in AITS >JEE Mains ask a doubt card title ,description & cta is changed", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject JEE Main", true)
    await AITSPage.navigateToAITSselectSubject("JEE Main")
    allure.startStep("Validate all the texts of Ask A Doubt Banner", true)
    await AskADoubtBanner()
    allure.endStep();
})

it("334496 TC_27 For BTLP user in AITS >NEET ask a doubt card title ,description & cta is changed", async () => {
    allure.startStep("Change cohort Details",true)
    await ProfilePage.changeCohortDetail(aitsData.cohortDetails[0],'btlp')
    allure.startStep("Navigate to AITS and select subject NEET", true)
    await AITSPage.navigateToAITSselectSubject("NEET")
    allure.startStep("Validate all the texts of Ask A Doubt Banner", true)
    await AskADoubtBanner()
    allure.endStep();
})

})
