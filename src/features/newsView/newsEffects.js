import { put, takeLatest, call } from "redux-saga/effects";
import newsApi from '../../lib/api'
import { getNews, getNewsSuccess, getNewsFailure } from './newsSlice';

export function* fetchNews() {
  try {
    put(getNews());
    const articles = yield call(newsApi.getHeadlines);
    yield put(getNewsSuccess({
        articles
    }));
  } catch (err) {
    yield put(getNewsFailure(err));
  }
}

export function* newsEffects() {
    // news effect 연결 (getNews -> fetechNews)
    yield takeLatest(getNews, fetchNews);
}