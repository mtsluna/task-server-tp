import {MongoPersistence} from "./mongo.persistence";
import * as mongoose from 'mongoose';
import {UserSchema} from "./models/user.persistence.models";
import {User} from "../../domain/contracts/user";
import {Utilities} from "./util/utilities";
import * as bcrypt from "bcrypt"
import {Task} from "../../domain/contracts/Task";

export class UserPersistence extends MongoPersistence {

    private static instance: UserPersistence;
    private UserModel = mongoose.model("user", UserSchema);

    private constructor() {
        super();
    }

    public static getInstance = () => {
        if(UserPersistence.instance == null) {
            UserPersistence.instance = new UserPersistence();
        }
        return UserPersistence.instance;
    }

    register = async (user: User) => {

        //Encrypt password
        user.password = await bcrypt.hash(user.password, 10);

        const response = new this.UserModel(user);
        const result = await response.save();
        return Utilities.transform<User>(result);
    }

    list = async () => {
        return this.UserModel.find();
    }

    login = async (username: string, password: string) => {
        const response = await this.UserModel.findOne({
            username,
            deleted_at: { "$exists": false }
        });
        const result =  Utilities.transform<User>(response);
        return await bcrypt.compare(password, result.password);
    }

    getOne = async (username: string) => {
        const response = await this.UserModel.findOne({
            username,
            deleted_at: { "$exists": false }
        }, {
            password: 0
        });
        return  Utilities.transform<User>(response);
    }


}
