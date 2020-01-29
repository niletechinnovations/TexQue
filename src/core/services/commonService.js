import axios from 'axios';
const API_BASE_URL = 'https://food-truck-apis.herokuapp.com/v0.0/';
const API_BASE_URL_WITH_OUT_VERSION = 'https://food-truck-apis.herokuapp.com/';
class ApiService {

    /*Get API*/
    getAPI(urlSegment) {
        return axios.get(API_BASE_URL+urlSegment);
    }
    /*Get API With Authentication header */
    getAPIWithAccessToken(urlSegment) {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Authorization': 'JWT '+accessToken
        }
        return axios.get(API_BASE_URL+urlSegment, {headers: headers});
    }
    /*Post API Without Authentication header */
    postAPI(urlSegment, formdata) {        
        const headers = {
            'Content-Type': 'application/json'           
        }
        return axios.post(API_BASE_URL+urlSegment, formdata, {headers: headers});
    }
    /*Post API With Authentication header */
    postAPIWithAccessToken(urlSegment, formdata){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }
        return axios.post(API_BASE_URL+urlSegment, formdata, {headers: headers});
    } 

    /*Post form data API With Authentication header */
    postMultipartDataAPIWithAccessToken(urlSegment, formdata){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'JWT '+accessToken
        }
        return axios.post(API_BASE_URL+urlSegment, formdata, {headers: headers} );
    } 

    /*PUt API With Authentication header */
    putAPIWithAccessToken(urlSegment, formdata){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }
        return axios.put(API_BASE_URL+urlSegment, formdata, {headers: headers});
    } 

    /*Delete API With Authentication header and Without parameter */
    deleteAPIWithAccessToken(urlSegment, formdata= {}){
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+accessToken
        }

        debugger;
        return axios.delete(API_BASE_URL+urlSegment, { headers: headers , data: formdata});
    } 
    /* Check user logged in or not */
    getAuth(){
        let accessToken = localStorage.getItem("accessToken");        
        if(accessToken === '' || accessToken === null)
          return false;
        else
          return true;
    }
    /*Get API Url*/
    getAPIUrl(){
        return API_BASE_URL_WITH_OUT_VERSION;
    }
}

export default new ApiService();
