const mongoose = require('mongoose');

const connectToDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectToDB;