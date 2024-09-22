FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DATABASE_URL=file:/app/prisma/dev.db
ENV DATABASE_URL=$DATABASE_URL

RUN chmod 777 /app/prisma/dev.db || true

RUN npx prisma generate

RUN npx prisma migrate dev

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]