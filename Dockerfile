FROM node:20-slim

WORKDIR /code
COPY . .

RUN cd client && npm install && cd ../server && npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt

EXPOSE 5173
EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]