
import BasePage from "./BasePage";

class DashboardPage extends BasePage {

    get calendarTitle() { return $("(//span[contains(text(),'Go to Calendar')])") }

    get classDetail() { return $("(//div[@class='sc-djUGQo djEkdT'])[1]")}

    get preRequisites() { return $("(//span[@class='eventTag'][normalize-space()='CLASS_PREP'])[1]")}
    
    get calendarExpand() {return $ ("//button[normalize-space()='October 2022']")}

    get btnResume() {return $ ("//button[normalize-space()='Resume']")}

    get btnAction() {return $ ("//i[@aria-label='task-progress']")}

    get btnWeekly() {return $ ("//li[normalize-space()='Weekly']")}

    get btnDaily() {return $ ("//li[normalize-space()='Daily']")}

    get btnJoinnow() {return $ ("//button[normalize-space()='Join Now']")}

    get btnDate() {return $ ("//div[contains(text(),'27')]")}

}
export default new DashboardPage();