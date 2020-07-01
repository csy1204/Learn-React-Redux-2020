import { createSlice } from '@reduxjs/toolkit';

const newsInitialState = {
    articles: [],
    isLoading: false,
    error: null
}

function startLoading(state) {
    state.isLoading = true
  }
  
function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
}

const newsSlice = createSlice({
    name: 'news',
    initialState: newsInitialState,
    reducers: {
       getNews: startLoading,
       getNewsSuccess(state, {payload}) {
        const { articles } = payload
        state.articles = articles
        state.isLoading = false
        state.error = null
        },
       getNewsFailure: loadingFailed
    }
  })

export const { getNews, getNewsSuccess, getNewsFailure } = newsSlice.actions
export default newsSlice.reducer

// {
//     "status": "ok",
//     "totalResults": 34,
//     "articles": [
//         {
//             "source": {
//                 "id": null,
//                 "name": "Hankyung.com"
//             },
//             "author": null,
//             "title": "노민우, 아야세 하루카와 열애설에 공식입장 \"친구 이상 관계 아냐\" - 한국경제",
//             "description": "노민우, 아야세 하루카와 열애설에 공식입장 \"친구 이상 관계 아냐\", 노민우, 아야세 하루카와 열애설에 입 열어 \"친구이지만 그 이상의 관계 아냐\"",
//             "url": "https://www.hankyung.com/entertainment/article/202007012736H",
//             "urlToImage": "https://img.hankyung.com/photo/202007/01.23088282.1.jpg",
//             "publishedAt": "2020-07-01T18:26:10Z",
//             "content": "21 '6.17' . . 2 · . , . , . . . ?"
//         },]
// }