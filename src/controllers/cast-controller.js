import { Router } from 'express';
import castService from '../services/cast-service.js';

const castController = Router();

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