export interface Task {
    id: string | undefined;
    title: string | undefined;
    due_date: string | undefined;
    creation_date: string | undefined;
    numeric_reference: number | undefined;
    calendar_event: boolean | undefined;
    observation: string | undefined;
    user_id: string | undefined;
    event_id: string | undefined;
}
