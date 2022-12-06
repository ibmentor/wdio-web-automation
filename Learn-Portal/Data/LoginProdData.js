let prodNumber = require('../loginProdFreeNumber.json')
import {getRandomNum} from "../utils/function"
const loginProdData = {
    validData: {
        validPhoneNumber: getRandomNum(),
    },
    invalidData: {
        validPhoneNumber:"9848919076",
        invalidotp:['5','8','4','3'],
        invalidPhoneNumber:"@#$abcdRTY"        
    },
    paidUser: {
        validPhoneNumber: "9731633936",
    },
    premiumUser: {
        validPhoneNumber: "4444444444",
    },
    btlpUser: {
        validPhoneNumber: "9483419226",
    },
    neoUser: {
        validPhoneNumber: "7579150435"
    },
    newUser: {
        validPhoneNumber: getRandomNum(),
    },
    instaLearnUser:{
        validPhoneNumber: "4807143814",
    },
    doubtsOnChatUser:{
        validPhoneNumber: "4807143815",  //used as neo user
    },
    prePostUser: {
        validPhoneNumber: "1239501566"
    },
    todUser: {
        validPhoneNumber: "9916154629"
    },
    calendarUser: {
        validPhoneNumber: "1112102686"
    },
    bdlcUser:{
        validPhoneNumber: "9916154629"
    },
}

export {loginProdData,};
