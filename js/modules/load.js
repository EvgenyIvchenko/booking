export const createLoader = (onSuccess, onError) => () => fetch(
  'https://25.javascript.htmlacademy.pro/keksobooking/data1',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onError();
  });
