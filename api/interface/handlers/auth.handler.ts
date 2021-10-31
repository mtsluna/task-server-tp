import {PrimitiveType, RequestProperties} from "../utils/request-properties";
import {GenerateTokenUseCase} from "../../application/usecases/generate-token.use-case";
require('express-async-errors');

export class AuthHandler {

    private readonly generateTokenUseCase: GenerateTokenUseCase;

    constructor(generateTokenUseCase: GenerateTokenUseCase) {
        this.generateTokenUseCase = generateTokenUseCase;
    }

    refresh = async (req, res) => {
        const { refresh_token } = RequestProperties.getProperties(req, [
            {
                type: PrimitiveType.string,
                place: ["body"],
                data: "refresh_token"
            }
        ]);

        try {
            const response = await this.generateTokenUseCase.refresh(refresh_token);

            res.status(200)
                .send({
                    access_token: response.token,
                    access_token_expiration: "3600",
                    refresh_token: response.refresh_token,
                    refresh_token_expiration: "14400",
                    token_type: "Bearer "
                });
        } catch (e) {
            res.status(401).send({
                "message": "invalid refresh token"
            })
        }
    }

    register = async (req, res) => {
        const { body } = RequestProperties.getProperties(req, [
            {
                place: ["body"],
            }
        ]);

        await this.generateTokenUseCase.register(body);

        res.status(201).send();
    }

    login = async (req, res) => {
        const { username, password } = RequestProperties.getProperties(req, [
            {
                type: PrimitiveType.string,
                place: ["body"],
                data: "username"
            }, {
                type: PrimitiveType.string,
                place: ["body"],
                data: "password"
            }
        ]);

        const auth: { token: string, refresh_token: string } = await this.generateTokenUseCase.login(username, password);

        res.status(200)
            .send({
                access_token: auth.token,
                access_token_expiration: "1000",
                refresh_token: auth.refresh_token,
                refresh_token_expiration: "3000",
                token_type: "Bearer "
            });

    }

    list = async (req, res) => {
        const data = await this.generateTokenUseCase.list();
        res.status(200).send(data);
    }

}
