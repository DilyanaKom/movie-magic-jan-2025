import { Schema, model } from 'mongoose';

//Create schema
const castSchema = new Schema({
   name: {
      type: String,
      required: true,
      minLength: 5,
      match: /^[a-zA-Z 0-9]+$/,

   },
   age: {
      type: Number,
      min: 1,
      max: 120,
   },
   born: {
      type: String,
      minLength: 10,
      match: /^[a-zA-Z 0-9]+$/,
      
   },
   imageUrl: {  
      type: String,
      match:/^https?:\/\//,}
});

//Create model
const Cast = model('Cast', castSchema);

//Export model
export default Cast;
