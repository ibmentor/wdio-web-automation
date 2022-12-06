const ENV = process.env.ENV
const baseUrl = require('../Config/Config')
const conceptVideoData = {
    freeUserData : {
        cohortDetails:['7','8','2','9'],
        subjectDetailsCohort7:['Mathematics','Physics','Chemistry','Biology','History','Geography','Civics'],
        subjectDetailsCohort8:['Mathematics','Physics','Chemistry','Biology','History','Geography','Civics'],
    },
    paidUserData : {
        cohortDetails:['10','8','1','7'],
        subjectDetailsCohort10:['Mathematics','Physics','Chemistry','Biology','History','Geography','Civics','Economics'],
        subjectDetailsCohort8:['Mathematics','Physics','Chemistry','Biology','History','Geography','Civics'],
        
    },

    videoPlayerMoreOptions: {
        options:['Playback speed','Picture-in-Picture','Language','Resolution'],
        value:['1x','Off','English','Auto']
    },
    
    socialMediaHandles: {
        handleId:['twitter-icon','telegram-icon','whatsapp-icon','facebook-icon','reddit-icon'],
        handleUrl:['https://twitter.com/','https://telegram.me/','https://web.whatsapp.com/','https://www.facebook.com/','https://www.reddit.com/'],

    },
    lazyLoadingUrls:[`${baseUrl[ENV]}learn/concept-videos`,`${baseUrl[ENV]}learn/concept-videos/chapters/22200`,`${baseUrl[ENV]}learn/concept-videos/video-detail/11678`,`${baseUrl[ENV]}learn/concept-videos/video-detail/685385`]

}
export {conceptVideoData,};
