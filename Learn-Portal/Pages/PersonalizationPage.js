import BasePage from "./BasePage";
import { personalizationData } from "../Data/PersonalizationData"


class PersonalizationPage extends BasePage {

    get labelTourPopupHeading() { return $("//**@class='Guidetour_modalHeading__2L-sU']")}
    
    get labelStartATour() { return $("Guidetour_modalContentText__1HGVN")}

    get btnLetsGo() { return $("//*[@class='Guidetour_modalBtnGo__17dKR']")}

    get labelStep1Heading() { return $("//*[@class='Guidetour_heading__2IXhB']")}

    get btnNext() { return $("//button[@title='Next']")}

    get btnFinish() { return $("//*[@class='Guidetour_nextBtn__1Dvi5']")}


    async takeaTourHearderAndContentValidation(i) {
        await browser.pause(1000)
        const headingText = await $("//*[@class='Guidetour_heading__2IXhB']").getText()
        const contentText = await $("//*[@class='Guidetour_content__27S9K']").getText()
        const actualHeading = personalizationData.heading[i - 1]
        const actualContent = personalizationData.content[i - 1]
        expect(await headingText).toHaveTextContaining(actualHeading)
        expect(await contentText).toHaveTextContaining(actualContent)
    }

      
}

export default new PersonalizationPage();