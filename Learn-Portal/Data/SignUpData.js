const signUpData = {
    validData: {
        
        validPhoneNumber: "1021032014",        
        validotp: ['2','0','1','4']       
    },
    invalidData: {
        validPhoneNumber:"9848919076",
        invalidotp:['5','8','4','3'],
        invalidPhoneNumber:"@#$abcdRTY"        
    },
    countryDetails: {            
        countryCode:['+91','+229','+975','+53','+86','+57'], 
        countryName:['India','Benin','Bhutan','Cuba','China','Colombia']
    },
    invalidEmails: ["test","test@gmail","@gmail.com","test.com","test@gmail.c","test@gmail.i"],
    validEmailAdress: "test@gmail.com"
}
export {signUpData,};