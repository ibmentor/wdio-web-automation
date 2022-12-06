const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const monthlyExamData = {     
    cohortDetails:['4th Grade','5th Grade','6th grade','7th grade','8th Grade','9th Grade','10th Grade'],
    smokeData :['4th Grade'],
    Instructions:["Marks will be awarded only for attempted questions.","Each subject has multiple sections with different marking schemes. You can refer to the marking scheme given above each question.","You can mark questions for review to attempt them later."],
    LazyLoadingUrl:`${baseUrl[ENV]}learn/monthly-exam`,
    monthlyExamApplicableCohort:['8th grade']
}
export {monthlyExamData};