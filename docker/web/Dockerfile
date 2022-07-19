FROM node:16
WORKDIR /nodejs2022Q2-service
COPY package*.json ./
COPY ../../prisma ./prisma/
RUN npm install
COPY ../.. .
RUN npm run build
EXPOSE 4000
CMD [  "npm", "run", "migrate" ]
