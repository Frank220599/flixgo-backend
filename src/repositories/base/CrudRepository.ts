import {Request} from "express";
import IRead from "../interfaces/IRead";
import IWrite from "../interfaces/IWrite";
import {NotFoundError} from "routing-controllers";
import {getRepository} from "typeorm";
import queryBuilder from "../../utils/queryBuilder";

abstract class CrudRepository<T> implements IWrite<T>, IRead<T> {

    protected readonly entity;
    protected readonly entityName: string;

    protected constructor(entity) {
        this.entity = getRepository(entity);
        this.entityName = `${entity.name}`;
    }

    public async create(values): Promise<T> {
        return this.entity.insert(values)
    }

    public async findAndCount(req: Request): Promise<any> {
        const result = await this.entity.findAndCount(queryBuilder(req));
        const _metadata = {
            currentPage: +req.query.page || 1,
            totalCount: result[1],
            pageCount: Math.ceil(result[1] / req.query.limit) || 1,
        };
        return {data: result[0], _metadata}
    }

    public async find(options): Promise<T> {
        const result = await this.entity.find(options);
        if (!result[0]) {
            throw new NotFoundError(`${this.entityName} not found!`)
        }
        return result[0]
    }

    public async findById(id: number, options?): Promise<T> {
        return this.find({where: {id}, ...options})
    }

    public async update(newValues, options): Promise<T> {
        const result = await this.find(options);
        Object.keys(newValues).map(key => {
            result[key] = newValues[key]
        });
        await this.entity.save(result);
        return result
    }

    public async delete(options): Promise<T> {
        const result = await this.find(options);
        //@ts-ignore
        return result.destroy();
    }

}

export default CrudRepository

