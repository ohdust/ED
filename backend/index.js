require('dotenv').config();
const cors = require('cors');
const { app, express, server } = require('../backend/services/server.services');

const PORT = process.env.PORT;
const router = require('./routes/router.module');

app.use(
    cors({
        origin: process.env.CORS,
        credentials: true,
    })
);

app.use(express.json());
app.use(router);

server.listen(PORT, () => {
    console.log(`server working on port: ${PORT}`);
});





