import {PrimitiveType, RequestProperties} from "../utils/request-properties";
import {config} from "../../../config/config"
import * as async_hooks from "async_hooks";
import injections from "../../injections/Injections";
const jwt = require('jsonwebtoken');

export const dataStore = new Map();
let contextId = 0;

export const authMiddleware = (req, res, next) => {

    const { authorization: token } = RequestProperties.getProperties(req, [
        {
            type: PrimitiveType.string,
            place: ["headers"],
            data: "authorization"
        }
    ]);

    let response: { id: string } = null;

    try {
        if(!String(token).startsWith("Bearer ")){
            throw new Error("Contexto de autorización invalido.");
        }

        response = jwt.verify(String(token).replace("Bearer ", ""), config.SECRET);

        if(!injections.use_cases.auth.has(`token_${response.id}`)){
            throw new Error("Contexto de autorización invalido.");
        }
    } catch (e) {
        res.status(403).send({
            "message": "Invalid auth"
        })
    }


    const asyncHeaders = async_hooks.createHook({
        init(asyncId, type, triggerAsyncId) {
            if (dataStore.has(asyncId)) {
                dataStore.set(asyncId, dataStore.get(triggerAsyncId));
            }
        },
        destroy(asyncId: number) {
            if (dataStore.has(asyncId)) {
                dataStore.delete(asyncId);
            }
        }
    });
    asyncHeaders.enable();

    createContext(res, response);

    next();
}

const createContext = (res, data) => {
    dataStore.set(async_hooks.executionAsyncId(), data);
    contextId = async_hooks.executionAsyncId();
};

export const getUserContext = () => {
    return dataStore.get(contextId);
};
