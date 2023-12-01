import {MongoClient} from 'mongodb';

const {
    MONGO_URI = 'mongodb://localhost:27017/todo-api'
} = process.env;


const client = new MongoClient(MONGO_URI);
export const db = client.db();


