import {TaskPersistence} from "../../infrastructure/persistence/task.persistence";
import {Task} from "../../domain/contracts/Task";
import {CalendarRepository} from "../../infrastructure/repositories/calendar.repository";

export class TaskUseCase {

    private readonly taskPersistence: TaskPersistence
    private readonly calendarRepository: CalendarRepository;

    constructor(taskPersistence: TaskPersistence, calendarRepository: CalendarRepository) {
        this.taskPersistence = taskPersistence;
        this.calendarRepository = calendarRepository;
    }

    findAll = async (filter, sort, page: number, size: number) => {
        try {
            return await this.taskPersistence.findAll(filter, sort, page, size);
        } catch (e) {
            throw e;
        }
    }

    findOne = async (id: string) => {
        try {
            return await this.taskPersistence.findOne(id);
        } catch (e) {
            throw e;
        }
    }

    findAllSearchStruct = () => {
        return {
            title: ["$regex"],
            user_id: ["$eq"],
            creation_date: ["$gt", "$gte", "$lt", "$lte"],
            due_date: ["$gt", "$gte", "$lt", "$lte"]
        }
    }

    save = async (task: Task) => {
        try {
            //Date variables init
            task.creation_date = new Date().toISOString();
            task.due_date = (task.due_date) ? task.due_date : new Date().toISOString();

            let response = null;

            if(task.calendar_event){
                response = await this.calendarRepository.createEvent(task);
            }

            task.event_id = response?.id;

            task = await this.taskPersistence.save(task);

            return task;
        } catch (e) {
            throw e;
        }
    }

    update = async (id: string, task: Task) => {
        try {
            const response: Task =  await this.taskPersistence.update(id, task);

            if(task.calendar_event){
                await this.calendarRepository.updateEvent(task);
            }

            return response;
        } catch (e) {
            throw e;
        }
    }

    delete = async (id: string) => {
        try {
            const response = await this.findOne(id);
            await this.taskPersistence.delete(id);
            if(response.calendar_event){
                await this.calendarRepository.deleteEvent(response.event_id);
            }
        } catch (e) {
            throw e;
        }
    }

}
