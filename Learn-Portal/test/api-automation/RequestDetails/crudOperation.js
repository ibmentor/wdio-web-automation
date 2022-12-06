import request from "../Utils/Utils"
import { expect } from 'chai'
import userData from "../Data/UserData"

class crudOperation {
    
    async GETrequest(url) {
        return request
            .get(url)
            .set(userData.user1.TOKEN[0],userData.user1.TOKEN[1])
            .set(userData.user1.appID[0],userData.user1.appID[1])
            .set(userData.user1.userID[0],userData.user1.userID[1])
            .then(async (response) => {

                if (response.status == 200) {
                    console.log("status code verified 200 OK");
                } else {
                    console.log("status code found: ", +response.status);
                }
                expect(response.status).to.be.equal(200)
                return response;
            })



    }

    async POSTrequest(url,data) {
        return request
            .post(url)
            .set(userData.user1.TOKEN[0],userData.user1.TOKEN[1])
            .set(userData.user1.appID[0],userData.user1.appID[1])
            .set(userData.user1.userID[0],userData.user1.userID[1])
            .send(data)
            .then(async (response) => {
                if (response.status == 200) {
                    console.log("status code verified 200 OK");
                } else {
                    console.log("status code found: ", +response.status);
                }
                expect(response.status).to.be.equal(200)
                return response;
            })


    }  

    async v2GETrequest(url){
        return requestNew.get(url)
        .set(userData.user1.TOKEN[0],userData.user1.TOKEN[1])
        .set(userData.user1.appID[0],userData.user1.appID[1])
        .set(userData.user1.userID[0],userData.user1.userID[1])
        .then(async(response)=>{
            if (response.status == 200) {
                console.log("status code verified 200 OK");
            } else {
                console.log("status code found: ", +response.status);
            }
            expect(response.status).to.be.equal(200)
            return response;
        })
    }
    async GetRequest(url, Headers) {
        return request
            .get(url)
            .set(userData.user1.TOKEN[0], Headers[2])
            .set(userData.user1.appID[0], Headers[1])
            .set(userData.user1.userID[0], Headers[0])
            .then(async (response) => {

                if (response.status == 200) {
                    console.log("status code verified 200 OK");
                } else {
                    console.log("status code found: ", +response.status);
                }
                return response;
            })
    }
    async GetRequestForNegativeCases(url, Headers) {
        var token = Headers[2]
        token = token.toString();
        token = token.slice(0, -3);
        return request
            .get(url)
            .set(userData.user1.TOKEN[0], token)
            .set(userData.user1.appID[0], Headers[1])
            .set(userData.user1.userID[0], Headers[0])
            .then(async (response) => {

                if (response.status == 200) {
                    console.log("status code verified 200 OK");
                } else {
                    console.log("status code found: ", +response.status);
                }
                return response;
            })

    }

}
export default new crudOperation()