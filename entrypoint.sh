#!/bin/bash

cd client
npm run build
nohup npm run preview &

cd ../server
# IS_DOCKER=true npm test
IS_DOCKER=true npx nodemon server
