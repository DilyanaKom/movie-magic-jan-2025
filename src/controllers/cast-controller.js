import { Router } from 'express';
import castService from '../services/cast-service.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const castController = Router();

castController.use(isAuth);//Can be added to routes instead

castController.get('/create', (req, res) => {
    res.render('cast/create');
});
castController.post('/create', async(req, res) => {
    const castData = req.body;
    try{
        await castService.create(castData);
        return res.redirect('/');
    } catch(err){
        const error = getErrorMessage(err);
        return res.render('cast/create', {error});
    }  
})


export default castController;