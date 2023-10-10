// 백엔드 API 불러오기
//
// api(url) : default method type is GET
// api(url, method)
// api(url, method, body)
// api(url, method, body, state)
//
// 테스트하는 경우, method 에 "test", body 대신 예상 response
// api(url, "test", response, state)

import { Dispatch, SetStateAction } from 'react';

type NewType = [JSON | null, Dispatch<SetStateAction<JSON | null>> | Function];

const api = (
  url: string,
  method: string | undefined,
  body: any | undefined,
  state: NewType | undefined
) => {
  // 처음 state 를 null 로 설정할 것이기에, 만약 값이 있다면 이미 사용한 경우이므로 중지함
  if (state && state[0] != null) return;

  if (state) {
    state[1](JSON.parse('{}'));
  }

  const id = getUserID();

  // {id} 를 실제 userID 값으로 치환
  let targetURL = `https://dev.yeohaengparty.com/api/${url.replace(
    '{id}',
    id
  )}`;

  // method 의 default 값은 GET
  const targetMethod = method ? method.toUpperCase() : 'GET';

  // 테스트의 경우에는 body 를 결과로 반환
  if (targetMethod == 'TEST') {
    if (state) {
      state[1](JSON.parse(body ? JSON.stringify(body) : '{}'));
    }
    return;
  }

  // GET 으로 보낼 때는 body 대신 쿼리를 이용
  if (targetMethod == 'GET' && body) {
    const query = new URLSearchParams(body).toString();
    if (query) targetURL += '?' + query;
  }

  // fetch 로 api 호출
  fetch(
    targetURL,
    targetMethod == 'GET'
      ? {}
      : {
          method: targetMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : '',
        }
  )
    .then((res: Response) => {
      if (res.status == 200) {
        // 정상 응답 확인된 경우, 응답 받은 JSON 전달
        if (state) {
          res.json().then((json: JSON) => {
            state[1](json);
          });
        }
      } else if (res.status == 401) {
        // 권한이 없을 경우, 리프레시
        if (url == 'auth/refresh') {
          window.location.replace('login');
        } else {
          api('auth/refresh', 'post', {}, undefined);
        }
      } else {
        // 기타 http 응답코드의 경우 로그 출력
        console.log(res.status);
        // 반복해서 호출하지 않도록
        if (state) {
          state[1](JSON.parse('{}'));
        }
      }
    })
    .catch((err) => {
      if (url == 'auth/refresh') {
        window.location.replace('login');
      } else {
        // 오류로그 출력
        console.log(err);
      }
      // 반복해서 호출하지 않도록
      if (state) {
        state[1](JSON.parse('{}'));
      }
    });
};

const getUserID = () => {
  return '12';
};

export default api;
export { getUserID };
