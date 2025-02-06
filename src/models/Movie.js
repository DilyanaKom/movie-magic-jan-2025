import { Schema, model, Types } from 'mongoose';

//Create schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title should be min 5 characters long!'],
        match: /^[a-zA-Z 0-9]+$/

    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre should be min 5 characters long!'],
        match: /^[a-zA-Z 0-9]+$/

    },
    director: {
        type: String,
        minLength: [5, 'Director should be min 5 characters long!'],
        match: /^[a-zA-Z 0-9]+$/

    },
    year: {
        type: Number,
        min: 1900,
        max: 2024.

    },
    imageUrl: {
        type: String,
        match:/^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    description: {
        type: String,
        minLength: [20,'Description should be min 20 characters long!'],
        match: /^[a-zA-Z 0-9]+$/,


    },
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
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

//Create model
const Movie = model('Movie', movieSchema);

//Export model
export default Movie;