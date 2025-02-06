import { Router } from 'express';
import castService from '../services/cast-service.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const castController = Router();

castController.use(isAuth);//Can be added to routes instead

castController.get('/create', (req, res) => {
    res.render('cast/create');
});
castController.post('/create', async(req, res) => {
    const castData = req.body;
    await castService.create(castData);
    console.log(castData);
    res.redirect('/');
})


export default castController;