# Install application
FROM node:16
# Create app directory
WORKDIR /nodejs2022Q2-service
COPY package*.json ./
COPY prisma ./prisma/
# Install app dependencies
RUN npm install
COPY . .
RUN npm run build

EXPOSE 4000
CMD [  "npm", "run", "migrate" ]
# Install postgres
FROM postgres
# Set postgres variables
ENV POSTGRES_USER node_service_user
ENV POSTGRES_PASSWORD node_service_password
ENV POSTGRES_DB node_service