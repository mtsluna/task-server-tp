import * as mongoose from 'mongoose';

export class MongoPersistence {

    protected instance;

    constructor() {
        this.instance = mongoose.connect("mongodb+srv://admin:Rn6qKYOB25ZIljQa@cluster0.jkcqd.mongodb.net/taskManager", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

}
