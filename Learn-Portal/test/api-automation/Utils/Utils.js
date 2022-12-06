import basePageURL from '../APIConfig/Config'
import supertest from 'supertest'
const request = supertest(basePageURL.baseUrl)
export default request;

