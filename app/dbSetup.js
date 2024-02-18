const mongoose = require('mongoose');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbServerUrl = process.env.DB_SERVER_URL;
const mongodbConnectionString1 = `mongodb+srv://${dbUsername}:${dbPassword}@${dbServerUrl}`
async function connect() {
    await mongoose.connect(mongodbConnectionString1);
}

connect().then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.log('DB failed to connect', err);
})