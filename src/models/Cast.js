import { Schema, model } from 'mongoose';

//Create schema
const castSchema = new Schema({
   name: {
      type: String,
      required: true,
      minLength: [5, 'Name must be min 5 characters long!'],
      match: /^[a-zA-Z 0-9]+$/,

   },
   age: {
      type: Number,
      min: [1, 'Age must be min 1 year old'],
      max: [120, 'Age must be max 120 years old']
   },
   born: {
      type: String,
      minLength: [10,'Place of birth must be min 10 characters long'],
      match: /^[a-zA-Z0-9 ,.-]+$/,
      
   },
   imageUrl: {  
      type: String,
      match:/^https?:\/\//,}
});

//Create model
const Cast = model('Cast', castSchema);

//Export model
export default Cast;
