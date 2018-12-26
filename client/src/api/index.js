import axios from 'axios'
const API_BASE_URL = "http://localhost:8080";

export default function callApi(endpoint,method = 'GET', body){
    return axios({
        method: method,
        url: `${API_BASE_URL}/user/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};