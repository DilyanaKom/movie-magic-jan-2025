import homeController from './controllers/home-controller.js';
import { Router } from 'express';
import movieController from './controllers/movie-controller.js';

const routes = Router();
routes.use(homeController);
routes.use('/movies', movieController);


routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;