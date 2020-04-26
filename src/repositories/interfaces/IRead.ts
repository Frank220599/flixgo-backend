import {Request} from "express";

interface IRead<T> {
    find(options): Promise<T>;

    findById(id: number): Promise<T>;

    findAndCount(req: Request): Promise<T[]>
}

export default IRead