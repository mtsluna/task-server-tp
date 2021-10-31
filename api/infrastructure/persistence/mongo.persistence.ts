import * as mongoose from 'mongoose';

export class MongoPersistence {

    protected instance;

    constructor() {
        this.instance = mongoose.connect("mongodb+srv://mtsluna:OATUw4MYIPLoIC5L@cluster0.l90cv.mongodb.net/myFirstDatabase", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

}
