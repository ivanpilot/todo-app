export interface ITodoCreate {
    description: string;
    isCompleted: boolean;
}

export interface ITodoFull extends ITodoCreate {
    id: number;
}
