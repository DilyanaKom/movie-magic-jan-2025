export const tempData = (req, res, next) => {
    //Attach error setter to res
    res.setError = (message) => {
        req.session.error = {
            message,
            isFirst: true
        }
    }
    if(!req.session.error){
        return next();
    }


    //read error and set to response
    if(req.session.error.isFirst){
        req.session.error.isFirst = false;
        res.locals.error = req.session.error.message;
    } else {
        req.session.error = null;
    }
    next();

};