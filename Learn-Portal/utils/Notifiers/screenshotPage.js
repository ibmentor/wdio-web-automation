class screenshotPage {

    async takeTestRunStatusScreenshot()
    {
        let runId = require('../Testrail/suitDetails.json')
        runId = parseInt(runId)
        let testRunUrl=`https://tnl.testrail.io/index.php?/runs/view/${runId}`
        await browser.url(testRunUrl)
        await browser.maximizeWindow() 
        const loginName=await $("//*[@type='text']")
        await loginName.waitForDisplayed({timeout:20000})
        const loginPassword=await $("//*[@type='password']")
        const loginBtn=await $("//*[@id='button_primary']")
        await loginName.waitForDisplayed({timeout:10000})
        await loginName.click()
        await loginName.setValue('sowmya.chandrasekaran@byjus.com')
        await browser.pause(3000)
        await loginPassword.click()
        await loginPassword.setValue('Testrail@123')
        await browser.pause(2000)
        await loginBtn.click()
        const projectName=await $('#navigation-project')
        await projectName.waitForDisplayed({timeout:10000})
        const testRunNameDetails=await $('.content-header-title-tooltip')
        await testRunNameDetails.waitForDisplayed({timeout:10000})
        const testRunName=await testRunNameDetails.getText()
        await browser.pause(3000)
        const chartBox=await $('#tablechart_testun')
        await chartBox.waitForDisplayed({timeout:10000})
        await chartBox.saveScreenshot('./testRunScreenshot/ExecutionReport.png')
        return testRunName
    }
    
    }
     export default new screenshotPage();