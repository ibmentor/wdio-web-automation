const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const aitsData = {     
        cohortDetails:['JEE & NEET (11th)','1','10'],
        lazyLoadingUrls:[`${baseUrl[ENV]}learn/aits/jee-advanced`,`${baseUrl[ENV]}learn/aits/jee-mains`,`${baseUrl[ENV]}learn/aits/neet`],
}
export {aitsData,}
