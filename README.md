# auth_test

## Run with Docker

``` sh
docker compose up
```

## Run locally

**Requirements**

* NodeJS
* npm

### Setup frontend

``` sh
git clone git@github.com:kotchaniphapk/auth_test.git
cd client
npm install
npm start
```

### Setup backend

* Start a local MySQL server on port `3306`
* Create an empty database called `sodality`

``` sh
cd server
npm install
npx nodemon sever.js
```

### Unit test

```
cd server
npm run test
```