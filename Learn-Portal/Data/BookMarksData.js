const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const BookmarkData = {
    lazyLoadingUrl:`${baseUrl[ENV]}learn/all-bookmarks`
}
export {BookmarkData,};