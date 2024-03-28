FROM node:20.11.1

# Create app directory
RUN mkdir -p /srv/app/next-protein-backend
WORKDIR /srv/app/next-protein-backend

COPY package*.json /srv/app/next-protein-backend

RUN npm install

COPY . /srv/app/next-protein-backend

#COPY ./dist /srv/app/next-protein-backend/dist

CMD ["npm", "run", "start:dev"]