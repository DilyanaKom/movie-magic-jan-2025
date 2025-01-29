import {Router} from 'express';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/', async (req, res) => {
    //Option 2 - with lean method on the query
    const movies = await movieService.getAll().lean();

     //Option 1: convert documents to plain objects
     //const plainMovies = movies.map(m => m.toObject());

    res.render('home', {movies});
});

router.get('/about', (req, res) =>{
    res.render('about')
});

export default router;