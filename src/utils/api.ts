const getToken = () => {
  const name = 'access_token';
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const api: any = (
  method: string,
  url: string,
  body: object,
  func: (json: any) => {}
) => {
  if (method.toUpperCase() == 'POST') {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((json) => {
            func(json);
          });
        }
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    fetch(url)
      .then((response) => {
        if (response.status == 200) {
          response.json().then((json) => {
            func(json);
          });
        }
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// const api: any = async (method: string, url: string, body: object) => {
//   const response = await fetch(url, {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   if (response.status == 200) {
//     return await response.json();
//   }
//   const refreshed = await apiRefresh();
//   if (refreshed) {
//     return await api(method, url, body);
//   } else {
//     window.location.replace('login');
//     return {};
//   }
// };

const apiRefresh = async () => {
  if (!getToken()) return false;
  const response = await fetch(
    'https://dev.yeohaengparty.com/api/auth/refresh',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: getToken(),
      }),
    }
  );
  if (response.status == 200) {
    return true;
  } else return false;
};

export { api };
