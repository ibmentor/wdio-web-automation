import {getRandomNum} from "../utils/function"
const loginData = {
    validData: {
        validPhoneNumber:getRandomNum(),        
        validotp: ['2','0','5','4']        
    },
    invalidData: {
        validPhoneNumber:"9848919076",
        invalidotp:['5','8','4','3'],
        invalidPhoneNumber:"@#$abcdRTY"        
    },
    paidUser: {
        validPhoneNumber: "4807143807",
        validotp: ['3','8','1','0']
    },
    btlpUser: {
        validPhoneNumber: "4807143807",
        validotp: ['3','8','0','7']
    },
    todUser: {
        validPhoneNumber: "1289833355"
    },
    premiumUser: {
        validPhoneNumber: "4807143807",
        validotp: ['3','8','0','7']
    },
    neoUser: {
        validPhoneNumber: "9580980000"  //Cohort-4th-Neo Subscription
    },
    mlpUser: {
        validPhoneNumber: "7022799698"
    },
    newUser: {
        validPhoneNumber: getRandomNum()
    },
    instaLearnUser:{
        validPhoneNumber: "4807143814",
        validotp: ['3','8','1','4']
    },
    doubtsOnChatUser:{
        validPhoneNumber: "4807143815",
        validotp: ['3','8','1','5']
    },
    prePostUser: {
        validPhoneNumber: "1001001216"
    },
    bdlcUser:{
        validPhoneNumber: "8277408765"
    },
    passcodeActivatedUser: {
        validPhoneNumber: "9597899875",
        validPasscode:"1111"
    },
    passcodeNotActivatedUser: {
        validPhoneNumber: "2587413695",
    },
    passcodeUserWithMultipleProfile:{
        validPhoneNumber: "9597899875", 
        validPasscode:"5544" 
    },
    calendarUser: {
        validPhoneNumber: "1112106871"
    },
    byjusTestSeriesUser: {
        validPhoneNumber: "8988096099"
    },
    setupPasscodeUser:{
        validPhoneNumber: "",//Need new num to which is not having Passcode
        validPasscode:"" //Need passcode to setup the passcode 
    },
    qaExpiredUrl: {url:['https://qa.byjusweb.com/learn-3/auth_verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IjM1NDE3ZDNhLWQ3ZTgtNGRjOC1iM2UxLWMyZWQwZWI1NTM2OSIsImlzUGFzc2NvZGVTZXQiOnRydWUsImxhc3RVcGRhdGVkQnkiOiJzeXN0ZW0iLCJleHBpcnlEYXRlIjoiMjAyMi0wOS0xOSAwOToyNToyOC4yNjc5NzggKzAwMDAgVVRDIiwidG9rZW5JRCI6Ijg4MTQzMDc4MyIsImlzcyI6ImlkZW50aXR5In0.1SbQvO-2FMZhMVOFbrx16BEujzmLH5AhYcPpkmGKNo8&verification-method=token&_branch_match_id=1100383569265751599&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXLyhKzc0szU0sKNBLqswqLdZLzs%2FVDzcpyw8OMvcoKkkCAPFmEosoAAAA']
    },
    prodExpiredUrl: {url:['']
    },
    stageExpiredUrl:{
        url:['https://stage.byjusweb.com/learn/auth_verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6IjM1NDE3ZDNhLWQ3ZTgtNGRjOC1iM2UxLWMyZWQwZWI1NTM2OSIsImlzUGFzc2NvZGVTZXQiOnRydWUsImxhc3RVcGRhdGVkQnkiOiJzeXN0ZW0iLCJleHBpcnlEYXRlIjoiMjAyMi0wOS0yMiAwNjowODowOS4yNDg5MTkgKzAwMDAgVVRDIiwidG9rZW5JRCI6IjE2MTg5NjYyODciLCJpc3MiOiJpZGVudGl0eSJ9.PHUs5O4MtcuSCEUhEcBbv_ha0qsbghRYVaup33Zv9xI&verification-method=token&_branch_match_id=1100383569265751599&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXLyhKzc0szU0sKNBLqswqLdZLzs%2FVd6408sv18SouL0kCALpJ%2BKkoAAAA']
    },

    countryDetails: {            
        countryCode:['+91','+355','+56','+41','+213','+1'], 
        countryName:['India','Albania','Chile','Switzerland','Algeria','Canada']

    },   
    
    
    sanityData : {
        cohortDetailsSanitySuite:['1st Grade','5th Grade','9th Grade','NEET (11th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','CAT','Computer Science Engineering','Universal Cohort','UKG','IAS'],
        cohortDetails:['1st Grade','2nd Grade','3rd Grade','4th Grade','5th Grade','6th grade','7th grade','8th Grade','9th Grade','10th Grade',
        'NEET (11th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)',
        'CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
        'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG','IAS']
    }, 

     allSubjectNotApplicable :['1st Grade','2nd Grade','3rd Grade','4th Grade','5th Grade','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)','11th Grade - Commerce',
    'CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
    'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG','IAS'],

     conceptVideoNotApplicable :['1st Grade','2nd Grade','3rd Grade','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
    'Instrumentation Engineering','Universal Cohort','LKG','UKG'],
    //Removed from list ('Computer Science Engineering',)

     byjusClassesNotApplicable :['1st Grade','2nd Grade','3rd Grade','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)','11th Grade - Commerce',
     'CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
    'Instrumentation Engineering','Computer Science Engineering','LKG','UKG'],
    //Removed from list ('Universal Cohort',)

     apqNotApplicable :['1st Grade','2nd Grade','3rd Grade','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)','11th Grade - Commerce',
     'IAS','CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
    'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG'],
    // Added IAS 

    cwtNotApplicable :['1st Grade','2nd Grade','3rd Grade','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (12th)','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
    'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG'],
    //Removed 'CAT','JEE & NEET (11th)','CAT','11th Grade - Commerce'

    askADoubtNotApplicable :['1st Grade','2nd Grade','3rd Grade','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)','11th Grade - Commerce',
    'CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
   'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG'],

   downloadNotApplicable :['1st Grade','2nd Grade','3rd Grade','4th Grade','5th Grade','11th Grade - Commerce',
    'CAT','Electrical Engineering','Civil Engineering','Mechanical Engineering','Electronics and Communication Engineering',
   'Instrumentation Engineering','Computer Science Engineering','Universal Cohort','LKG','UKG'],
    
   aitsApplicable :['NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)'],

   mocktestApplicable : ['NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (11th)','JEE & NEET (12th)'],

   akashLiveClassesApplicable : ['JEE & NEET (11th)','NEET (11th)','NEET (12th)','JEE (11th)','JEE (12th)','JEE & NEET (12th)','JEE & NEET (12th Pass)']
}

export {loginData,};
