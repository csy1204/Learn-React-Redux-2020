# Learn React-Redux 2020

> 리액트 리덕스 공부용 프로젝트

국내에서 많은 사람들이 보는 "리액트를 다루는 기술"이나 여러 입문 자료에서 Redux를 다루는 방식이 약간 현재와 맞지 않을 수 있다는 생각이 이 프로젝트를 진행하려 합니다. 

그렇게 생각하게된 이유는 아래와 같습니다.

1. 책에서 주로 사용하는 [redux-actions](https://github.com/redux-utilities/redux-actions) 라이브러리는 2019년 2월 이후로 업데이트가 사실상 끊겼고, 2020년 6월 현재 메인테이너를 구하는 상황이다.
2. Container 컴포넌트 개념은 창시자 조차 이제 권하지 않는다. 이유는 그렇게 나누는 것이 리액트스럽지도 않으며, Hook을 통해 충분히 더 좋은 코드로 구현 가능하다고 한다. ([링크](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) 
3. [redux-toolkit](https://github.com/reduxjs/redux-toolkit) 이란 redux팀에서 공식적으로 만든 툴셋이 존재한다. redux-actions의 대부분 기능이 내장되어 있으며 다양한 편의성을 제공한다. 이 글을 쓰는 기준 3시간 전까지도 커밋이 발생하고 있다는 점에서 긍정적이다.

또한, Redux를 배울 때 처음에 생기는 어려움 중 하나가 코드량도 많아지고 여러가지 고려해야할 것이 많다는 점인데 redux-toolkit이 해당 어려움을 어느정도 완화해줄 수 있다는 생각이 들었습니다.

## 1. Init Project

이 프로젝트는 [Redux](https://redux.js.org/)와 [Redux Toolkit](https://redux-toolkit.js.org/) 템플릿을 사용하여, [Create React App](https://github.com/facebook/create-react-app)를 통해 초기 셋팅을 하였습니다.

```bash
npx create-react-app learn-react-redux --template redux
```



순서
1. Redux 기존 코드를 사용해 Todo Reducer 만들기
2. Todolist 만들기
3. Redux Toolkit을 이용해 리팩토링
4. Axios를 이용한 API 제작
5. 뉴스 뷰어 만들기
6. Redux Saga 적용하기



