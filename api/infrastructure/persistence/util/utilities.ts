import {Document} from "mongoose";

export class Utilities {

    static transform = <T> (doc: Document): T => {
        if(doc == null){
            return null;
        }
        const response = JSON.parse(JSON.stringify(doc)) as T;
        response["id"] = doc._id;
        delete response["_id"];
        return response;
    }

}
