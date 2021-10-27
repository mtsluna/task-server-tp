export class Paginate<T> {
    data: Array<T>;
    pagination: {
        total_pages: number;
        total_elements: number;
        page: number;
        size: number;
    }
}
