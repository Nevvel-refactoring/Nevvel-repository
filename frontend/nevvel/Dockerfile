FROM node:18.15.0 AS base

WORKDIR /home/ubuntu/frontend

COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN chmod 755 -R ./node_modules
RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]