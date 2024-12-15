FROM node:18

EXPOSE 5173

WORKDIR /app

COPY /src/frontend/package.json /app/package.json
COPY /src/frontend/package-lock.json /app/package-lock.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--host"]