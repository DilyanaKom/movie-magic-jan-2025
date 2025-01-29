import { Schema, model } from 'mongoose';

//Create schema
const castSchema = new Schema({
   name: String,
   age: Number,
   born: String,
   imageUrl: String
});

//Create model
const Cast = model('Cast', castSchema);

//Export model
export default Cast;
