import { newsEffects } from "../features/newsView/newsEffects";
import { all } from "redux-saga/effects";

/**
 * Root saga pattern
 * https://redux-saga.js.org/docs/advanced/RootSaga.html
 */

export default function* effects() {
  yield all([
    newsEffects(),
  ]);
}