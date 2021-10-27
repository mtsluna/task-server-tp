import {TaskUseCase} from "../../application/usecases/task.use-case";
import {PrimitiveType, RequestProperties} from "../utils/request-properties";
import {getUserContext} from "../middlewares/auth.middleware";
require('express-async-errors');

export class TaskHandler {

    private readonly taskUseCase: TaskUseCase;

    constructor(taskUseCase: TaskUseCase) {
        this.taskUseCase = taskUseCase;
    }

    get = async (req, res) => {
        try {
            const { q, sort, page, size } = RequestProperties.getProperties(req, [
                {
                    place: ["query"],
                    data: "q",
                    nullable: true
                },
                {
                    place: ["query"],
                    data: "sort",
                    nullable: true
                },
                {
                    place: ["query"],
                    data: "page",
                    nullable: true,
                    type: PrimitiveType.number
                },
                {
                    place: ["query"],
                    data: "size",
                    nullable: true,
                    type: PrimitiveType.number
                }
            ]);

            const query = q ? JSON.parse(q) : {};
            const sortTemp = sort ? JSON.parse(sort) : {};
            const response = await this.taskUseCase.findAll(query, sortTemp, page, size);

            res.status(200)
                .send(response);
        } catch (e) {
            throw e;
        }
    }

    getOne = async (req, res) => {
        try {
            const { id } = RequestProperties.getProperties(req, [
                {
                    place: ["params"],
                    data: "id",
                    type: PrimitiveType.string
                }
            ]);

            const response = await this.taskUseCase.findOne(id);

            res.status(response ? 200 : 404)
                .send(response);
        } catch (e) {
            throw e;
        }
    }

    getSearchStruct = (req, res) => {
        const response = this.taskUseCase.findAllSearchStruct();
        res.status(200)
            .send(response);
    }

    post = async (req, res) => {
        try {
            const { body } = RequestProperties.getProperties(req, [
                {
                    place: ["body"]
                }
            ]);

            const response = await this.taskUseCase.save(body)

            res.status(201)
                .send(response);
        } catch (e) {
            throw e;
        }
    }

    put = async (req, res) => {
        try {
            const { id, body } = RequestProperties.getProperties(req, [
                {
                    type: PrimitiveType.string,
                    place: ["params"],
                    data: "id"
                },
                {
                    place: ["body"]
                }
            ]);

            const response = await this.taskUseCase.update(id, body);

            res.status(200)
                .send(response);
        } catch (e) {
            throw e;
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = RequestProperties.getProperties(req, [
                {
                    type: PrimitiveType.string,
                    place: ["params"],
                    data: "id"
                }
            ]);

            await this.taskUseCase.delete(id);

            res.status(204)
                .send({});
        } catch (e) {
            throw e;
        }
    }

}
