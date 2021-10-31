import {CachePersistence} from "../../infrastructure/persistence/cache-persistence";
import {TokenData} from "../../domain/contracts/token-data";
import {config} from "../../../config/config"
import { v4 as uuidv4 } from 'uuid';
import {UserPersistence} from "../../infrastructure/persistence/user.persistence";
import {User} from "../../domain/contracts/user";

const jwt = require('jsonwebtoken');


export class GenerateTokenUseCase extends CachePersistence<TokenData>{

    private static instance: GenerateTokenUseCase;
    private readonly userPersistence: UserPersistence;

    private constructor(userPersistence: UserPersistence) {
        super();
        this.userPersistence = userPersistence;
    }

    public static getInstance = (userPersistence: UserPersistence) => {
        if (GenerateTokenUseCase.instance == null) {
            GenerateTokenUseCase.instance = new GenerateTokenUseCase(userPersistence);
        }
        return GenerateTokenUseCase.instance;
    }

    refresh = (refresh_token: string) => {
        try {
            if(!refresh_token.startsWith("Bearer ")){
                throw new Error("Contexto de autorización invalido.");
            }

            console.log(config.SECRET_REFRESH)

            const payload: { id: string } = jwt.verify(refresh_token.replace("Bearer ", ""), config.SECRET_REFRESH);

            if(!this.has(`token_${payload.id}`)){
                throw new Error("Error al establecer una conexión segura.");
            }

            return {
                refresh_token: this.generateRefreshToken(payload.id) || null,
                token: this.generateToken(payload.id) || null
            };
        } catch (e) {
            throw e;
        }
    }

    login = async (username: string, password: string) => {

        if (!await this.userPersistence.login(username, password)) {
            throw new Error("Credenciales invalidas.");
        }

        const userFetched = await this.userPersistence.getOne(username);

        const id = uuidv4();
        await this.set(`token_${id}`, {
            id: id,
            user: {
                id: userFetched?.id || "",
                name: userFetched?.name || "",
                surname: userFetched?.surname || ""
            }
        });

        return {
            refresh_token: this.generateRefreshToken(id) || null,
            token: this.generateToken(id) || null
        };

    }

    register = async (user: User) => {
        return await this.userPersistence.register(user);
    }

    private generateToken = (id: string) => {
        return jwt.sign({
            id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600
        }, 'test');
    }

    private generateRefreshToken = (id: string) => {
        return jwt.sign({
            id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 14400
        }, 'test refresh');
    }

}
