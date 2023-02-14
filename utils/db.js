import mongoose, { Connection } from "mongoose";

const connection = {};

async function connectDb() {
    if (connection.isConnected) {
        console.log('Already Connected to db');
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('Use Previous Connection to db');
            return;
        }
        await mongoose.disconnect();
    }
    const db =await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("New Connection to database");
    connection.isConnected = db.connections[0].readyState;
}


async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_END === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
            console.log('Disconnected');
        } else {
            console.log('Not Disconnecting to Database');
        }
    }else{
        console.log("Can't disconnect as not connected");
    }
}

const db = { connectDb, disconnectDb };
export default db;