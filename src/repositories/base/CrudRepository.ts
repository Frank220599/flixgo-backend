import {Request} from "express";
import IRead from "../interfaces/IRead";
import IWrite from "../interfaces/IWrite";
import db from "../../database";
import {NotFoundError} from "routing-controllers";
import {FindOptions} from "sequelize";
import queryBuilder from "../../utils/queryBuilder";

abstract class CrudRepository<T> implements IWrite<T>, IRead<T> {

    protected readonly model;
    private readonly modelName: string;

    constructor(modelName) {
        this.model = db.model(modelName);
        this.modelName = modelName;
    }

    public async create(values): Promise<T> {
        return this.model.create(values)
    }

    public async findAndCountAll(req: Request): Promise<any> {
        const {rows, count} = await this.model.findAndCountAll(queryBuilder(req));
        const _metadata = {
            currentPage: +req.query.page,
            totalCount: count,
            pageCount: Math.ceil(count / req.query.limit),
        };
        return {data: rows, _metadata}
    }

    public async findOne(options: FindOptions): Promise<T> {
        const result = await this.model.findOne(options);
        if (!result) {
            throw new NotFoundError(`${this.modelName} not found!`)
        }
        return result
    }

    public async findByPk(id: number, options?: FindOptions): Promise<T> {
        return this.findOne({where: {id}, ...options})
    }

    public async update(newValues, options: FindOptions): Promise<T> {
        const result = await this.findOne(options);
        Object.keys(newValues).map(key => {
            result[key] = newValues[key]
        });
        //@ts-ignore
        await result.save();
        return result
    }

    public async delete(options: FindOptions): Promise<T> {
        const result = await this.findOne(options);
        //@ts-ignore
        return result.destroy();
    }

}

export default CrudRepository

