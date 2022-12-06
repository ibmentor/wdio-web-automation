import { AllureUtil as allure } from "../../../utils/util.allure"
import ProfilePage from "../../../Pages/ProfilePage";
import { byjusclassData } from "../../../Data/ByjusClassData";
import ByjusClassesPage from "../../../Pages/ByjusClassesPage";
import LoginPage from "../../../Pages/LoginPage";

describe("Learn Portal - Byjus Class pre post test cases", async () => {
    it("312273 TC_01 Paid user - Verify the pre requisites sessions card/Page", async () => {
        await LoginPage.loginToLearnPortal("prePostUser")
        await ByjusClassesPage.navigateToByjusClassesAndPageLoad()
        await ByjusClassesPage.btnCompletedTab.waitForDisplayed({timeout:3500})
        await ByjusClassesPage.btnCompletedTab.click()
        try{await ByjusClassesPage.dropdownOnCompletedTab(1).waitForDisplayed({timeout:4500})}catch{}
        let dropdownCount = await ByjusClassesPage.countDropdownOnCompletedTab.length
        for (let i=1;i<=dropdownCount;i++){
            let topicName = await ByjusClassesPage.labelCompletedTabTopicName(i)
            expect(await ByjusClassesPage.btnSeeMoreDropdownOnCompletedTab(i).isDisplayed()).toEqual(true)
            await ByjusClassesPage.dropdownOnCompletedTab(i).click()
            expect(await ByjusClassesPage.dropdownElementCountOnCompletedTab(i).length).toBeGreaterThan(0)
            await ByjusClassesPage.btnSeeMoreDropdownOnCompletedTab(i).click()
            expect(topicName).toEqual()
        }
    })
        
})