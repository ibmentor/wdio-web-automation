const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const downloadData = {
    
    lazyLoadingUrls:`${baseUrl[ENV]}learn/downloads`,
         
    }
    export {downloadData,};