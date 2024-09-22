First install the dependencies

```bash
npm install
```

Setup Environment variables

Required Variables:
DATABASE_URL
ROOT_URL
SESSION_SECRET
NODE_ENV
SECRET_SALT

Optional variables:
ADMIN-EMAILS

Generate the database:
```bash
npx prisma generate
```

Try accessing the databse studio
```bash
npx prisma studio
```

Run the development server

```bash
npm run dev
```

How to run the Websocket
```bash
cd websocket_server
nodemon socket.js
```