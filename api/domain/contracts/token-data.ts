export class TokenData {
    id: string;
    user: {
        id: string
        name: string
        surname: string
    };
    permissions?: [
        {
            id: string
        }
    ];
}
