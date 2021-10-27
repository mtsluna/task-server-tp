const defaultValue = {
    number: 0,
    string: "",
    boolean: false
}

export class RequestProperties {
    static getProperties = (
        req: Request,
        requestProperties: RequestProperty[]
    ): any => {
        const object = {};
        const errorArray: string[] = [];

        requestProperties.forEach(value => {
            let objectTemp = req;
            value.place.forEach(place => {
                objectTemp = objectTemp[place];
            });
            if (value.data) {
                if (objectTemp[value.data]) {
                    objectTemp = objectTemp[value.data];
                } else if (value.nullable && value.nullable == true) {
                    objectTemp = (value.type) ? defaultValue[value.type.valueOf()] : undefined;
                } else {
                    errorArray.push(
                        `${value.data} is not present in: 'req.${value.place.join(".")}'`
                    );
                }
            }
            object[value.data || value.place.reverse()[0]] = RequestProperties.determinateType(
                value.type,
                objectTemp
            );
        });

        if (errorArray.length > 0) {
            const errorMessage = errorArray.join(", ");
            throw new Error(errorMessage);
        }

        return object;
    };

    static determinateType = (type: PrimitiveType, value) => {
        if (!type) {
            return value;
        }
        switch (type.valueOf()) {
            case "string":
                return String(value);
            case "boolean":
                return String(value) == "true";
            case "number":
                return Number(value);
        }
    };
}

export class RequestProperty {
    //In order left to right Example req.locals.traceabilityContext -> ["locals", "traceabilityContext"]
    place: string[];

    //This is a data that you need. Example x-request-id
    data?: string;

    //The type of the data
    type?: PrimitiveType;

    nullable?: boolean = false;
}

/* eslint-disable no-unused-vars */
export enum PrimitiveType {
    string = "string",
    number = "number",
    boolean = "boolean"
}

/* eslint-disable no-unused-vars */
