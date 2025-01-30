import movies from '../movies.js';
import Movie from '../models/Movie.js'


export default {
    getOne(movieId){
        //TODO case when movie is missing
        const result = Movie.findById(movieId);
        return result;
},

    create(movieData){
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        });
        return result;
    },
    
   getAll(filter = {}){
        let query =  Movie.find({});

        if(filter.search){
            query = query.where({title: filter.search});
        };
        if(filter.genre){
            query = query.where({genre: filter.genre});
        };
        if(filter.year){
            query = query.where({year: Number(filter.year)});
        }

        return query;
    },

    async attachCast(castId, movieId, character){
        //Option 1
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // await movie.save();
        // return movie;

        //Option 2
        return Movie.findByIdAndUpdate(movieId, { 
            $push: {
                casts: {
                    cast:castId,
                    character: character,
                }
    }});


    }

};