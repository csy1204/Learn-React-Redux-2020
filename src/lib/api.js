import axios from 'axios';

axios.defaults.baseURL = "https://newsapi.org/v2/";
const API_KEY = "a4c0f1aaa3ef40aabc7f75cb260624d2";

export default {
    getNewsEverything: (params) => {
        params['apiKey'] = API_KEY
        console.log(params)
        return axios.get('everything',{params})
    },
    getHeadlines: async () => {
        const params = {
            'apiKey': API_KEY,
            'country': 'kr'
        }
        try {
            const newsResponse = await axios.get('top-headlines', {params});
            return newsResponse.data.articles
        } catch (err) {
            throw err
        }
        
    }
}