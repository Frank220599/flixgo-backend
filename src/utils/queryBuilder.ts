import {Between, LessThan, MoreThanOrEqual, LessThanOrEqual, MoreThan, Not, Equal, Like} from "typeorm";
import {FindManyOptions} from "typeorm"

const queryBuilder = (req: any, paginate?: boolean): FindManyOptions => {
        console.log('query:', req.query);
        const {limit, page, include, sort, filter} = req.query;
        let sortOptions, paginateOptions, filterOption, relations = [];
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
                        // @ts-ignore
                        ...filterOption,
                        [key]: Equal(value)
                    }
                } else if (typeof filter[key] === "object") {
                    for (let [childKey, childValue] of Object.entries(filter[key])) {
                        if (childKey === 'between') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                // @ts-ignore
                                [key]: Between(childValue[0], childValue[1])
                            }
                        } else if (childKey === 'moreThan') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: MoreThan(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: LessThan(childValue)
                            }
                        } else if (childKey === 'moreThanOrEqual') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: MoreThanOrEqual(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: LessThanOrEqual(childValue)
                            }
                        } else if (childKey === 'not') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: Not(childValue)
                            }
                        } else if (childKey === 'like') {
                            filterOption = {
                                // @ts-ignore
                                ...filterOption,
                                [key]: Like(`%${childValue}%`)
                            }
                        } else {
                            filterOption = {
                                // @ts-ignore
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
            cache: 60000
        }
    }
;

export default queryBuilder;
