import { Schema, model, Types } from 'mongoose';

//Create schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageURl: String,
    rating: Number,
    description: String,
    // casts: [{
    //     type: Types.ObjectId,
    //     ref: 'Cast',

    // }],
    casts: [{
        _id: false,
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast',
        }
    }],
});

//Create model
const Movie = model('Movie', movieSchema);

//Export model
export default Movie;