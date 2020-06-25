import {Between, LessThan, MoreThanOrEqual, LessThanOrEqual, MoreThan, Not, Equal, Like} from "typeorm";
import {FindManyOptions} from "typeorm"

const queryBuilder = (req: any, paginate?: boolean): FindManyOptions => {
        console.log('query:', req.query);
        const {limit, page, include, sort, filter} = req.query;
        let sortOptions, paginateOptions, filterOption: any, relations = [];
        if (sort) {
            const res = sort.split('-');
            if (res.length > 1) {
                sortOptions = {
                    [res[1]]: 'DESC'
                };
            } else {
                sortOptions = {
                    [res[0]]: 'ASC'
                };
            }
        }
        if (paginate) {
            paginateOptions = {
                take: +limit || 50,
                skip: +(limit * (page - 1)) || 0,
                order: sortOptions,
            }
        }
        if (include) {
            relations = include.split(',')
        }

        if (filter) {
            for (let [key, value] of Object.entries(filter)) {
                if (typeof filter[key] === "string") {
                    filterOption = {
                        ...filterOption,
                        [key]: Equal(value)
                    }
                } else if (typeof filter[key] === "object") {
                    for (let [childKey, childValue] of Object.entries(filter[key])) {
                        if (childKey === 'between') {
                            filterOption = {
                                ...filterOption,
                                // @ts-ignore
                                [key]: Between(childValue[0], childValue[1])
                            }
                        } else if (childKey === 'moreThan') {
                            filterOption = {
                                ...filterOption,
                                [key]: MoreThan(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterOption = {
                                ...filterOption,
                                [key]: LessThan(childValue)
                            }
                        } else if (childKey === 'moreThanOrEqual') {
                            filterOption = {
                                ...filterOption,
                                [key]: MoreThanOrEqual(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterOption = {
                                ...filterOption,
                                [key]: LessThanOrEqual(childValue)
                            }
                        } else if (childKey === 'not') {
                            filterOption = {
                                ...filterOption,
                                [key]: Not(childValue)
                            }
                        } else if (childKey === 'like') {
                            filterOption = {
                                ...filterOption,
                                [key]: Like(`%${childValue}%`)
                            }
                        } else {
                            filterOption = {
                                ...filterOption,
                                [key]: {
                                    [childKey]: Equal(childValue)
                                }
                            }
                        }
                    }
                }
            }
        }
        // @ts-ignore
        return {
            relations,
            ...paginateOptions,
            where: filterOption,
        }
    }
;

export default queryBuilder;
