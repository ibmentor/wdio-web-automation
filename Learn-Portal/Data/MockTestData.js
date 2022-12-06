const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const mockTestData = {     
    cohortDetails:['1','8','10th','JEE & NEET (11th)'], 
    subTest:['jee-main','jee-advanced','neet','bitsat'], 
    tests:["JEE Main", "JEE Advanced", "NEET"],

    lazyLoadingUrls:[`${baseUrl[ENV]}learn/mock-tests/jee-mains`,`${baseUrl[ENV]}learn/mock-tests/jee-advanced`,`${baseUrl[ENV]}learn/mock-tests/neet`],
}

export {mockTestData,};
