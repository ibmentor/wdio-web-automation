import request from "../Utils/Utils"
import userData from '../Data/UserData'

class APQmodule{   
  
    async apqValidationsGetRequest(url){
        return request
        .get(url)
        .set(userData.user1.TOKEN[0],userData.user1.TOKEN[1])
        .set(userData.user1.appID[0],userData.user1.appID[1])
        .set(userData.user1.userID[0],userData.user1.userID[1])
        .then(async(response)=>{
           expect(response.status).toEqual(200)
           return response;
        })
    }

    async apqValidationsPostRequest(url,data){
        return request
        .post(url)
        .set(userData.user1.TOKEN[0],userData.user1.TOKEN[1])
        .set(userData.user1.appID[0],userData.user1.appID[1])
        .set(userData.user1.userID[0],userData.user1.userID[1])
        .send(data)
        .then(async(response)=>{
          expect(response.status).toEqual(200)
          return response;
        })
    }
}
export default new APQmodule()