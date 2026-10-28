# The Good Store

A small React shopping demo with FakeStoreAPI products, client-side routing, a
local demo login, a persistent cart, and light/dark themes.

## Run locally

```bash
npm install
npm run dev
```

## Notes

- Product data is loaded from [FakeStoreAPI](https://fakestoreapi.com/), so the
  product listing and details require an internet connection.
- Login and registration are simulated in the browser. Any valid email and
  password of at least six characters will work; no credentials are sent to a
  server.
- Cart contents, demo login state, and theme preference are stored in browser
  local storage.
