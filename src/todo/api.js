const getApi = (src, method, action, body) => {
  fetch(src, {
    method: method,
    headers: { "content-type": "application/json" },
    body: body || null,
  })
    .then((res) => res.json())
    .then((data) => {
      if (action) action(data);
    })
    .catch((err) => console.log(err));
};

export { getApi };
