const getUserID = () => {
  const name = 'userID';
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setUserID = (value: string) => {
  const name = 'userID';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  //encodeURIComponent
};

const httpPost_ = (url: any, body: any) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status == 200) {
      return;
    }
  });
};

export { getUserID, setUserID };
