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

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]