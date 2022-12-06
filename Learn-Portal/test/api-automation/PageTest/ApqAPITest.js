import APQ from '../RequestDetails/crudOperation'
import { expect } from 'chai'
import apqData from '../Data/APQData'

/*
user can be any
Grade must be 10
subject =Biology
data will change for other subject
 */

describe('APQ Module', async () => {
    it('verify Recently Practice data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/practice/activity?tnl_cohort_id=16')
        expect(response.body.activities[0].category.type).to.be.equal(apqData.APQType)
        expect(response.body.activities[0].category.is_analysis_enabled).to.equal(false)
        expect(response.body.activities[0].category.is_practice_enabled).to.equal(true)
    });

    it('verify Bookmark data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/bookmarked_resources?resource_type=Question&cohort_id=16&per_page=10&page=1&sort=updated_at&direction=desc&time=week')
        expect(response.body.meta.current_page).to.not.be.null
        expect(response.body.meta.total_count).to.not.be.null
        expect(response.body.meta.total_pages).to.not.be.null
    });

    it('Verify analysis profiency summary data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/proficiency_summaries?category_id=22245')//category id will be chapter id
        expect(response.body.skill_summary[0].correct_attempts).to.be.within(apqData.startAttempt,apqData.totalAttempt),
        expect(apqData.profiencyChapter_IdBio).to.contain(response.body.skill_summary[0].chapter_id),
        expect(response.body.skill_summary[0].total_attempts).to.be.within(apqData.startAttempt,apqData.totalAttempt)
        expect(apqData.skills).to.contain(response.body.skill_summary[0].skill)
    });

    it('verify analysis stages data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/practice/stats?chapter_id=22245&limit=5')
        expect(await response.body.stats[0].correct).to.be.within(apqData.answerStart,apqData.answerEnd)
        expect(response.body.stats[0].incorrect).to.be.within(apqData.answerStart,apqData.answerEnd)
        expect(response.body.stats[0].unattempted).to.be.within(apqData.answerStart,apqData.answerEnd)
    });

    it('verify submit answer', async () => {        
        let response = await APQ.POSTrequest('https://staging.tllms.com/web/v1/practice/attempts?chapter_id=22245',apqData.submitData)
        expect(response.body[0].is_correct).to.be.equal(true || false)
               
    });

    it('verify analysis selected topic id data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/categories/22245')
        expect(response.body.id).to.be.equal(22245),//id will be same as present in url
        expect(response.body.is_analysis_enabled).to.be.equal(apqData.APQanalysis)
        expect(response.body.is_practice_enabled).to.be.equal(true);
    });

    it('verify videos data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/public/videos?&category_id=22245')
        expect(typeof(response.body.videos[0].id)).to.be.equal('number')//id will change with subject and its chapter so we can verify it using typeof number
        expect(typeof(response.body.videos[0].category_id)).to.be.equal('number')
    });

    it('verify stages based on practice test performance current stage', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/practice/info?chapter_id=22245')
        expect(typeof(response.body.current_stage.id)).to.be.equal('number')
        expect(apqData.stageName).to.contain(response.body.current_stage.name);
        expect(response.body.current_stage.questions_count).to.equal(5)
    });

    it('verify bookmarked questions according to subjects data', async () => {
        let response = await APQ.GETrequest('https://staging.tllms.com/web/v1/bookmarked_resources?resource_type=Question&cohort_id=16&per_page=10&page=1&sort=updated_at&direction=desc&time=week&subject_id=22211')//22211 is biology subject code
        expect(response.body.meta.current_page).to.not.be.null
        expect(response.body.meta.total_count).to.not.be.null
        expect(response.body.meta.total_pages).to.not.be.null
    });

    it('verify upsert bookmark data', async () => {
        let response = await APQ.POSTrequest('https://staging.tllms.com/web/v1/bookmarked_resources/upsert',apqData.upsertData)
        expect(typeof(response.body.bookmarked_resource.id)).to.be.equal('number')
    });

    it('verify remove bookmark data', async () => {
        let response = await APQ.POSTrequest('https://staging.tllms.com/web/v1/bookmarked_resources/remove',apqData.removeData)  
        expect(response.body).to.be.empty
    });
});