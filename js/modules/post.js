export const createPosted = (path, method, body, onSuccess, onError) => () => fetch(
  path,
  {
    method: method,
    body: body,
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
  .catch((err) => {
    onError(err);
  });
