# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN apk add --no-cache make gcc g++ python3 && \
npm install && \
npm rebuild bcrypt --build-from-source && \
apk del make gcc g++ python3

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE ${POSTGRES_PORT}

CMD [ "npm", "run", "start:prod" ]
