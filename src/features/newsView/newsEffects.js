import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import newsApi from '../../lib/api'

newsApi.getNewsEverything()


