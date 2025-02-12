import { Router } from 'express';
import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';
import { get } from 'mongoose';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';


const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    
    res.render('search', {movies, filter});
});

movieController.get('/create',  isAuth, (req, res) => {
    res.render('create')
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
    try{
        await movieService.create(newMovie, userId);
        res.redirect('/');
    } catch (err){
        const categories = getCategoryViewData(newMovie.category)
        return res.render('create', {categories, movie: newMovie, error: getErrorMessage(err)});
    }
   
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).populate('casts.cast').lean();
    const isCreator = movie.creator && movie.creator?.toString() === req.user.id;
    res.render('movie/details', {movie, isCreator});
});

movieController.get('/:movieId/attach-cast',  isAuth,async (req, res) => {
    const movieId = req.params.movieId;
    const movie  = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll({exclude: movie.casts}).lean();
    console.log(movie.casts);
    res.render('movie/attach-cast', {movie, casts});
});

movieController.post('/:movieId/attach-cast',  isAuth,async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    const character = req.body.character;
    try{
        await movieService.attachCast(castId, movieId, character);
    }catch(err){
        const error = getErrorMessage(err);
        res.render('movie/attach-cast', {error});
    }
    
    res.redirect(`/movies/${movieId}/details`);

});

movieController.get('/:movieId/delete',  isAuth, async (req, res) =>{
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if(!movie.creator?.equals(req.user?.id)){
        res.setError('You are not the movie owner!');
        return res.redirect('/404');
    }
    await movieService.delete(movieId);
    res.redirect('/');
});

movieController.post('/:movieId/edit',  isAuth,async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;
    //TODO check if creator
try{
    await movieService.update(movieId, movieData);
} catch(err){
    const categories = getCategoryViewData(movieData.category)
   return res.render('movie/edit', categories, {movie: movieData, error: getErrorMessage(err)});
   
}
 res.redirect(`/movies/${movieId}/details`); 
  
})

function getCategoryViewData(category){
    const categoriesMap = 
    { 'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
         'documentary': 'Documentary',
        'short-film': 'Short Film',
    };
    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));
    return categories;
};

movieController.get('/:movieId/edit',  isAuth, async (req, res) => {
const movieId = req.params.movieId;
const movie = await movieService.getOne(movieId).lean();
const categories = getCategoryViewData(movie.category);    

res.render('movie/edit', {movie, categories});
});

export default movieController;
