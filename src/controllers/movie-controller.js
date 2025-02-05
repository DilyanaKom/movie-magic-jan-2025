import { Router } from 'express';
import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';


const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    
    res.render('search', {movies, filter});
});

movieController.get('/create', (req, res) => {
    res.render('create')
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;
    await movieService.create(newMovie, userId);
    res.redirect('/');
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).populate('casts.cast').lean();
    const isCreator = movie.creator && movie.creator?.toString() === req.user.id;
    res.render('movie/details', {movie, isCreator});
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie  = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll({exclude: movie.casts}).lean();
    console.log(movie.casts);
    res.render('movie/attach-cast', {movie, casts});
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    const character = req.body.character;
    await movieService.attachCast(castId, movieId, character);
    res.redirect(`/movies/${movieId}/details`);

});

movieController.get('/:movieId/delete', async (req, res) =>{
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if(!movie.creator?.equals(req.user?.id)){
        return res.redirect('/404');
    }
    await movieService.delete(movieId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
const movieId = req.params.movieId;
const movie = await movieService.getOne(movieId).lean();

    res.render('movie/edit', {movie});
});

export default movieController;
