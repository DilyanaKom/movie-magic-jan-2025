import Cast from '../models/Cast.js';

export default {
    getAll(){
        return Cast.find({});

    },
    create(castData){
        Cast.create(castData);
        return;
    }
}