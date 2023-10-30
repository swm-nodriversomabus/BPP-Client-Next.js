// 백엔드 API 불러오기
//
// api(url) : default method type is GET
// api(url, method)
// api(url, method, body)
// api(url, method, body, state)
//
// 테스트하는 경우, method 에 "test", body 대신 예상 response
// api(url, "test", response, state)

import React from 'react';
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

  // document 를 사용하기 위해서 window가 존재하는 지 미리 검증
  if (typeof window === 'undefined') {
    if (state && state[0] != null) {
      state[1](JSON.parse(`{"api_response_code": 0}`));
      return;
    }
  }

  if (state) {
    state[1](JSON.parse(`{"api_response_code": 0}`));
  }

  const BASE_URL = process.env.NEXT_BASE_URL;
  const CLIENT = process.env.NEXT_CLIENT;

  // {id} 를 실제 userID 값으로 치환
  let targetURL = `${BASE_URL}${url}`;

  // method 의 default 값은 GET
  const targetMethod = method ? method.toUpperCase() : 'GET';

  // 테스트의 경우에는 body 를 결과로 반환
  if (targetMethod == 'TEST') {
    if (state) {
      state[1](JSON.parse(JSON.stringify(body)));
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
      ? {
          credentials: 'include',
        }
      : {
          method: targetMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: body ? JSON.stringify(body) : '',
        }
  )
    .then((res: Response) => {
      if (res.status == 200) {
        // 정상 응답 확인된 경우, 응답 받은 JSON 전달
        if (state) {
          res.text().then((text: string) => {
            if (text.length && '[{'.indexOf(text[0]) > -1) {
              state[1](JSON.parse(text));
            } else {
              state[1](JSON.parse(`{"text": "${text}"}`));
            }
          });
        }
      } else if (url == 'auth/refresh') {
        // 리프레시에 실패하면, 로그인 페이지 이동
        window.location.replace(`${CLIENT}login`);
      } else if (res.status == 401) {
        // 권한이 없을 경우, 리프레시
        api('auth/refresh', 'post', {}, [
          null,
          (json: any) => {
            if ('status' in json) {
              api(url, method, body, state);
            }
          },
        ]);
        // 반복해서 호출하지 않도록
        if (state) {
          state[1](JSON.parse(`{"api_response_code": ${res.status}}`));
        }
      } else {
        // 기타 http 응답코드의 경우 로그 출력
        console.log(res.status);

        // 반복해서 호출하지 않도록
        if (state) {
          state[1](JSON.parse(`{"api_response_code": ${res.status}}`));
        }
      }
    })
    .catch((err) => {
      // 오류로그 출력
      console.log(err);

      // 반복해서 호출하지 않도록
      if (state) {
        state[1](JSON.parse(`{"api_response_code": -1}`));
      }
    });
};

// 객체를 map으로 사용할 수 있는 지 여부 확인
const isMap = (json: any) => {
  return json && 'length' in json && 'map' in json && json.length;
};

// 타입 고려없이 map 사용할 수 있음
const mapping = (
  json: any | undefined,
  func: (item: any, index: number) => any
) => {
  if (json && 'length' in json && 'map' in json && json.length) {
    return (json as { map: Function }).map((item: any, index: number) => {
      return func(item, index);
    });
  } else {
    return React.Fragment;
  }
};

export default api;
export { mapping, isMap };
