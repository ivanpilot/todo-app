export interface ITodoLight {
    description: string;
    isCompleted: boolean;
}
export interface ITodoCreate extends ITodoLight {
    sic: string;
}
export interface ITodoFull extends ITodoCreate {
    id: number;
}
