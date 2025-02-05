import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    //Get token
    const token = req.cookies['auth'];

    if(!token){
    //Guest users
        return next();
    };

    //Validate token
    try{
        const decodedToken = jwt.verify(token, SECRET)
         //Attach decoded token to request
        req.user = decodedToken;

         next();
    }catch(err){
        //TODO Invalid token
    }

   


  

    
}