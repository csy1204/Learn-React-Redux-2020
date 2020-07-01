# Learn React-Redux 2020

> 리액트 리덕스 공부용 프로젝트

국내에서 많은 사람들이 보는 "리액트를 다루는 기술"이나 여러 입문 자료에서 Redux를 활용하는 방식보다 더 나은 방식이 있지 않을까란 생각으로 이 프로젝트를 진행하려 합니다. 

그렇게 생각하게된 이유는 아래와 같습니다.

1. 책에서 주로 사용하는 [redux-actions](https://github.com/redux-utilities/redux-actions) 라이브러리는 2019년 2월 이후로 업데이트가 사실상 끊겼고, 2020년 6월 현재 메인테이너를 구하는 상황이다.
2. Container 컴포넌트 개념은 창시자 조차 이제 권하지 않는다. 이유는 그렇게 나누는 것이 리액트스럽지도 않으며, Hook을 통해 충분히 더 좋은 코드로 구현 가능하다고 한다. ([링크](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) 
3. [redux-toolkit](https://github.com/reduxjs/redux-toolkit) 이란 redux팀에서 공식적으로 만든 툴셋이 존재한다. redux-actions의 대부분 기능이 내장되어 있으며 다양한 편의성을 제공한다. 이 글을 쓰는 기준 3시간 전까지도 커밋이 발생하고 있다는 점에서 긍정적이다.

또한, Redux를 배울 때 처음에 생기는 어려움 중 하나가 코드량도 많아지고 여러가지 고려해야할 것이 많다는 점인데 redux-toolkit이 해당 어려움을 어느정도 완화해줄 수 있다는 생각이 들었습니다. 하지만 redux-toolkit은 기본적으로 비동기 제어로 redux-thunk를 사용하고 있어 본 예제는 redux-saga를 redux-toolkit에 함께 적용해보는 방식으로 설정하였습니다.

## 1. Init Project

이 프로젝트는 [Redux](https://redux.js.org/)와 [Redux Toolkit](https://redux-toolkit.js.org/) 템플릿을 사용하여, [Create React App](https://github.com/facebook/create-react-app)를 통해 초기 셋팅을 하였습니다.

```bash
npx create-react-app learn-react-redux --template redux
```

## 2. News Viewer를 위한 API 작성

> [소스코드](./src/lib/api.js)

Axios를 통한 API Client 구현, [News API](https://newsapi.org/)를 사용

``` javascript
import axios from 'axios';

axios.defaults.baseURL = "https://newsapi.org/v2/";
const API_KEY = "";

export default {
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
```


## 3. newsSlice (newsReducer) 작성

> [소스코드](./src/features/newsView/newsSlice.js)

createSlice를 이용한 리듀서 생성, getNews, getNewsSuccess, getNewsFailure의 3가지 Action 생성

``` javascript
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
```

## 4. newsEffects (news Saga) 작성

> [소스코드](./src/features/newsView/newsEffects.js)

``` javascript
import { put, takeLatest, call } from "redux-saga/effects";
import newsApi from '../../lib/api'
import { getNews, getNewsSuccess, getNewsFailure } from './newsSlice';

export function* fetchNews() {
  try {
    put(getNews());
    const articles = yield call(newsApi.getHeadlines);
    yield put(getNewsSuccess({articles}));
  } catch (err) {
    yield put(getNewsFailure(err));
  }
}

export function* newsEffects() {
    // news effect 연결 (getNews -> fetechNews)
    yield takeLatest(getNews, fetchNews);
}
```

## 4. rootSaga 작성

> [소스코드](./src/store/saga.js)

[공식문서의 rootSaga](https://redux-saga.js.org/docs/advanced/RootSaga.html) 패턴 참고

``` javascript
import { newsEffects } from "../features/newsView/newsEffects";
import { all } from "redux-saga/effects";

export default function* effects() {
  yield all([
    newsEffects(),
  ]);
}
```

## 5. SagaMiddleWare 적용

getDefaultMiddleware를 통해 Redux Toolkit에 미리 적용되어있는 미들웨어도 함께 포함될 수 있도록 한다.

```javascript
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootEffects from './saga'
import newsReducer from '../features/newsView/newsSlice';
const sagaMiddleware = createSagaMiddleware();

// 기존 createStore, combineReducers를 대체 
export default configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootEffects);
```

## 6. NewsList Component 작성

useDispatch, useSelector 를 이용해 hook에서 redux 사용하도록 함.
useEffect를 이용해 getNews 액션을 dispatch함.

``` jsx
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNews } from './newsSlice'

export default function NewsList() {
    const dispatch = useDispatch();
    const news = useSelector(({news}) => news);
    
    useEffect(() => {
        dispatch(getNews());
    },[]);

    return (
        <div>
            {news.isLoading? 
                <h1>Loading...</h1>:
                <h1>Completed!</h1>
            }
            {!news.isLoading && news.articles.map(article => (
                <p>{article.title}</p>
            ))}
        </div>
    )
}
```

