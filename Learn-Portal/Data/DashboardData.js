const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const dashboardData = {
    FAQ : {
        questions:["1. Is BYJU'S The Learning App available for FREE download and usage?",'2. What is the cost of subscription?'],
        answers:["The  complete app and content in BYJU'S -the learning app is free for 15 days  after registration on a trial basis. After this, you can  purchase the   course to access the complete learning program.",
                 'There are multiple courses and each course will be personalized to the learning needs of the students. Our counsellor will be able to help you choose the right course and the pricing will vary depending on the personalized package for your specific needs. You can call us at  to talk to our Experts about the pricing and product details.',
            ],
        
    },

    linksForDownload :['https://play.google.com/','https://apps.apple.com/'],

    cohortDetailsForBookTrialValidation  : {
        cohortDetails:[['1','2','3','5','7','8','9','10','JEE (11th)'],['11th Grade - Commerce','12th Grade - Commerce','CAT','GRE','GMAT']]
   
    },

    dashboardElementValidation : {
        cohortDetails: [["1st Grade",'2nd Grade','3rd Grade',],['4th Grade','5th Grade'],['4th Grade','5th Grade','6th grade','7th grade','8th Grade','9th Grade','10th Grade'],['JEE (11th)','NEET (11th)','JEE (12th)','NEET (12th)', 'JEE & NEET (12th Pass)', 'JEE (12th Pass)', 'NEET (12th Pass)'],['12th Grade - Commerce','11th Grade - Commerce']],
    },
    cohortDetailsFor4th_10thGrade  : {
        cohortDetails:['4','5','6','7','8','9','10th grade']
       
    },
    cohortDetailsForLessThan4th_Above10thGrade  : {
        cohortDetails:['3rd Grade','LKG','JEE & NEET (12th)','Electrical Engineering','IAS']
    },
    cohortDetailsAbove10thGrade  : {
        cohortDetails:['11th Grade - Commerce','JEE (11th)','IAS']
    },
    lazyLoadingUrls:[`${baseUrl[ENV]}learn/home`,`${baseUrl[ENV]}learn/download-app`,`${baseUrl[ENV]}learn/home`],



}
export {dashboardData,};