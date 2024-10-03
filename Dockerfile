FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DATABASE_URL=file:/app/app/prisma/dev.db
ENV DATABASE_URL=$DATABASE_URL

RUN chmod 777 /app/app/prisma/dev.db || true

RUN npx prisma generate

ENV NODE_ENV=production

ENV ROOT_URL=http://quizit.lennertpfundtner.de

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]