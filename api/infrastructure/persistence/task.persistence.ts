import * as mongoose from 'mongoose';
import {MongoPersistence} from "./mongo.persistence";
import {TaskSchema} from "./models/task.persistences.models";
import {Task} from "../../domain/contracts/Task";
import {Utilities} from "./util/utilities";
import {Paginate} from "../../domain/contracts/paginate";

export class TaskPersistence extends MongoPersistence {

    private TaskModel = mongoose.model("task", TaskSchema);

    constructor() {
        super();
    }

    findAll = async (filter, sort, page: number = 0, size: number = 0) => {
        try {
            filter["deleted_at"] = { "$exists": false };
            const response = await this.TaskModel.find(filter, {
                observation: 0,
                numeric_reference: 0
            }, {
                skip: size * page,
                limit: size,
                sort: sort
            });
            const total: number = Number(await this.count(filter));
            const result: Paginate<Task> = {
                data: response.map(doc => Utilities.transform<Task>(doc)),
                pagination: {
                    page: page,
                    size: size,
                    total_elements: total,
                    total_pages: Math.round(total / ((size === 0) ? 1 : size))
                }
            };
            return result;
        } catch (e) {
            throw new Error("Error al listar las tareas.")
        }

    }

    count = async (filter) => {
        filter["deleted_at"] = { "$exists": false };
        return this.TaskModel.find(filter).count();
    }

    findOne = async (id: string) => {
        try {
            const response = await this.TaskModel.findOne({
                _id: id,
                deleted_at: { "$exists": false }
            })
            return Utilities.transform<Task>(response);
        } catch (e) {
            throw new Error(`Error al obtener la tarea.`)
        }
    }

    save = async (task: Task) => {
        try {
            //Date variables init
            task.creation_date = new Date().toISOString();
            task.due_date = (task.due_date) ? task.due_date : new Date().toISOString();

            const response = new this.TaskModel(task);
            const result = await response.save();
            return Utilities.transform<Task>(result);
        } catch (e) {
            throw new Error("Error al guardar.")
        }
    }

    update = async (id: string, task) => {
        try {
            task["updated_at"] = Date.now();
            await this.TaskModel.updateOne({
                _id: id
            }, {"$set": { ...task }});
            return (await this.findOne(id));
        } catch (e) {
            throw new Error("Error al actualizar.")
        }
    }

    delete = async (id: string) => {
        try {
            let entity = await this.findOne(id);
            entity = Object.assign(entity, {
                deleted_at: Date.now()
            });
            await this.TaskModel.updateOne({
                _id: id,
                deleted_at: { "$exists": false }
            }, entity);
        } catch (e){
            throw new Error("Error al eliminar.")
        }
    }
}
