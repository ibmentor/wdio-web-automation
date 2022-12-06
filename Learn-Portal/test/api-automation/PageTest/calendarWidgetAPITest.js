import crudOperation from '../RequestDetails/crudOperation'
import { expect } from 'chai'
import {getHeaders} from '../../../utils/function'
import LoginPage from '../../../Pages/LoginPage'
var Headers=[]


describe('Calendar Widget Module API Test Cases', async () => {

    before("getHeaders", async () =>{
        await LoginPage.loginToLearnPortal('free')
        Headers=await getHeaders()
    })

    it('Validate get Events api with 200 status', async () => {
    
        let response = await crudOperation.GetRequest('https://calendar.stage.tllms.com/api/v1/users/events?startDate=2022-09-09&endDate=2022-09-09',Headers)
        expect(response.status).to.be.equal(200)
    });

   
    it('Validate get Event Progress api with 200 status', async () => {
    
        let response = await crudOperation.GetRequest('https://calendar.stage.tllms.com/api/v1/users/eventsProgress?startDate=2022-09-04&endDate=2022-09-10',Headers)
        expect(response.status).to.be.equal(200)
    });
    
    it('Validate get requisites details api with 200 status', async () => {
    
        let response = await crudOperation.GetRequest('https://api-stage.tllms.com/staging/ttplus_web_v2/web/neo/asset_details?asset_id=68881&asset_type=Assessment&cohort_id=14',Headers)
        expect(response.status).to.be.equal(200)
    });
   
    it('Validate get Events api with 401/500 status', async () => {
    
        let response = await crudOperation.GetRequestForNegativeCases('https://calendar.stage.tllms.com/api/v1/users/events?startDate=2022-09-09&endDate=2022-09-09',Headers)
        expect(response.status).to.be.equal(401)
    });
    it('Validate get Event Progress api with 401/500 staus', async () => {
    
        let response = await crudOperation.GetRequestForNegativeCases('https://calendar.stage.tllms.com/api/v1/users/eventsProgress?startDate=2022-09-04&endDate=2022-09-10',Headers)
        expect(response.status).to.be.equal(401)
    });
    it('Validate get requisites details api with 401/500 status', async () => {
    
        let response = await crudOperation.GetRequestForNegativeCases('https://api-stage.tllms.com/staging/ttplus_web_v2/web/neo/asset_details?asset_id=68881&asset_type=Assessment&cohort_id=14',Headers)
        expect(response.status).to.be.equal(401)
    });
})
