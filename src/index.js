import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';


const app = express();

//handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    //Option 3, without lean, set in handlebars
    // runtimeOptions:{
    //     allowProtoPropertiesByDefault: true,
    // },
    helpers: {
        showRating: showRatingHelper,
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);

//db config 
try {
    const defaultUri = 'mongodb://localhost:27017/magic-movies-jan2025';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);
    console.log('DB connected successfully');
} catch(err){
    console.log('Cannot connect to DB');
    console.error(err.message);
}

//routs setup
app.use(routes);

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
