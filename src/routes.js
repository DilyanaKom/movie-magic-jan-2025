import homeController from './controllers/home-controller.js';
import { Router } from 'express';

const routes = Router();
routes.use(homeController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;