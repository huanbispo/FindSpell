FROM node:18

COPY ./package.json /app/frontend/package.json
COPY ./package-lock.json /app/frontend/package-lock.json

WORKDIR /app/frontend

RUN npm install

COPY ./src/frontend /app/frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
