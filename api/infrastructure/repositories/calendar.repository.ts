import * as fs from "fs";
import axios from "axios";
import {config, google} from "../../../config/config";
import {GoogleToken} from "../../domain/contracts/google/google-token";
import {CachePersistence} from "../persistence/cache-persistence";
import qs = require("qs");
import * as moment from "moment";
import {Task} from "../../domain/contracts/Task";

const jwt = require('jsonwebtoken');

export class CalendarRepository extends CachePersistence<GoogleToken>{

    createOwnToken = async (scope: string) => {
        const file = fs.readFileSync("config/credentials.json")

        const privateKey = JSON.parse(file.toString()).private_key;

        return jwt.sign({
            iss: "tareas@tasks-317123.iam.gserviceaccount.com",
            scope,
            aud: "https://oauth2.googleapis.com/token",
            iat: Math.floor(new Date().getTime() / 1000),
            exp: Math.floor(new Date().getTime() / 1000) + 3600
        }, privateKey, {
            algorithm: "RS256"
        });
    };

    getGoogleToken = async (): Promise<GoogleToken> => {
        try {
            if(this.has("google_token")){
                return this.get("google_token");
            }

            const params = {
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: await this.createOwnToken("https://www.googleapis.com/auth/calendar")
            };

            const response = await axios.post(`${config.SERVICES.GOOGLE_API.OAUTH.BASE_PATH}/token`, qs.stringify(params), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            this.set("google_token", response.data);

            return response.data;
        } catch (e) {
            throw e;
        }
    }

    createEvent = async (task: Task) => {
        try {
            const secondDate = new Date(task.due_date);
            secondDate.setHours(secondDate.getHours()+1);

            const response = await axios.post(`${config.SERVICES.GOOGLE_API.BASE_PATH}/calendar/v3/calendars/${encodeURIComponent(config.SERVICES.GOOGLE_API.CALENDAR.CALENDAR_KEY)}/events`, {
                summary: task.title || "",
                start: {
                    dateTime: task.due_date,
                    timeZone: "America/Argentina/Mendoza"
                },
                end: {
                    dateTime: moment(secondDate).toISOString(),
                    timeZone: "America/Argentina/Mendoza"
                },
                description: task.observation || ""
            }, {
                headers: {
                    "Authorization": `Bearer ${(await this.getGoogleToken()).access_token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                params: {
                    key: config.SERVICES.GOOGLE_API.API_KEY
                }
            });

            return response.data;
        } catch (e) {
            console.log(e)
            console.log(e.response.data.error);
            throw e;
        }
    }

    updateEvent = async (task: Task) => {
        try {
            const secondDate = new Date(task.due_date);
            secondDate.setHours(secondDate.getHours()+1);

            const response = await axios.patch(`${config.SERVICES.GOOGLE_API.BASE_PATH}/calendar/v3/calendars/${encodeURIComponent(config.SERVICES.GOOGLE_API.CALENDAR.CALENDAR_KEY)}/events/${task.event_id}`, {
                summary: task.title || "",
                start: {
                    dateTime: task.due_date,
                    timeZone: "America/Argentina/Mendoza"
                },
                end: {
                    dateTime: moment(secondDate).toISOString(),
                    timeZone: "America/Argentina/Mendoza"
                },
                description: task.observation || ""
            }, {
                headers: {
                    "Authorization": `Bearer ${(await this.getGoogleToken()).access_token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                params: {
                    key: config.SERVICES.GOOGLE_API.API_KEY
                }
            });

            return response.data;
        } catch (e) {
            console.log(e)
            console.log(e.response.data.error);
            throw e;
        }
    }

    deleteEvent = async (eventId: string) => {
        try {
            const response = await axios.delete(`${config.SERVICES.GOOGLE_API.BASE_PATH}/calendar/v3/calendars/${encodeURIComponent(config.SERVICES.GOOGLE_API.CALENDAR.CALENDAR_KEY)}/events/${eventId}`, {
                headers: {
                    "Authorization": `Bearer ${(await this.getGoogleToken()).access_token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                params: {
                    key: config.SERVICES.GOOGLE_API.API_KEY
                }
            });

            return response.data;
        } catch (e) {
            console.log(e)
            console.log(e.response.data.error);
            throw e;
        }
    }

}
