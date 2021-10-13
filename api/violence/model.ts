import { Schema, model } from 'mongoose';

const violenceSchema = new Schema({
    city: String,
    country: String,
    time: Date,
    gender: String,
    age: Number,
    type: String
});

const Violence = model('Violence', violenceSchema);

interface QueryFields {
    city?: string;
    country?: string,
    gender?: string,
    time?: object,
    type?: string
}

export { Violence, QueryFields };