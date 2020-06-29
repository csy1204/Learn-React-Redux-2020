import axios from 'axios';

axios.defaults.baseURL = "https://newsapi.org/v2/"

export default {
    getNewsEverything: (params) => {
        params['apiKey'] = "a4c0f1aaa3ef40aabc7f75cb260624d2"
        console.log(params)
        return axios.get('everything',{params})
    },

    // editVtt: (params) => {
    //     return axios.get('/vtt/edit',{params})
    // }, 

    // downloadVtt: (params) => {
    //     return axios.get('/vtt/final',{params})
    // }


}