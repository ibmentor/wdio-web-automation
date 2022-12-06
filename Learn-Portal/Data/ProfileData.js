const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const profileData = {     
    cohortDetails:['7','8','10'],
    personalDetails:["Rahul","test5455@gamil.com","18/12/1993","Male","Bhopal"],
    lazyLoadingUrls:[`${baseUrl[ENV]}learn/profile`,`${baseUrl[ENV]}learn/profile?activeTab=subscriptions`],

}

export {profileData,}