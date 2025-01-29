import Cast from '../models/Cast.js';

export default {
    create(castData){
        //TODO create cast
        Cast.create(castData);
        return;
    }
}