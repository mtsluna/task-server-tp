import {TaskRepository} from "../infrastructure/repositories/task.repository";
import {TaskUseCase} from "../application/usecases/task.use-case";
import {TaskHandler} from "../interface/handlers/task.handler";
import {TaskPersistence} from "../infrastructure/persistence/task.persistence";
import {AuthHandler} from "../interface/handlers/auth.handler";
import {GenerateTokenUseCase} from "../application/usecases/generate-token.use-case";
import {UserPersistence} from "../infrastructure/persistence/user.persistence";
import {CalendarRepository} from "../infrastructure/repositories/calendar.repository";
import { authMiddleware } from "../interface/middlewares/auth.middleware";

const repositories = {
    task: new TaskRepository(),
    calendar: new CalendarRepository()
}

const persistence = {
    task: new TaskPersistence(),
    user: UserPersistence.getInstance()
}

const use_cases = {
    task: new TaskUseCase(persistence.task, repositories.calendar),
    auth: GenerateTokenUseCase.getInstance(
        persistence.user
    )
}

const handlers = {
    task: new TaskHandler(use_cases.task),
    auth: new AuthHandler(use_cases.auth)
}

const middlewares = {
    auth: authMiddleware
}

export default {
    middlewares,
    handlers,
    use_cases,
    repositories,
    persistence
};
