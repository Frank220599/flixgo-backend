import {Between, LessThan, MoreThanOrEqual, LessThanOrEqual, MoreThan, Not, Equal} from "typeorm";

const queryBuilder = (req) => {
        console.log('query:', req.query);
        const {limit, page, include, sort, filter} = req.query;
        let relations = [];
        if (include) {
            relations = include.split(',')
        }
        let sortObj;
        if (sort) {
            const res = sort.split('-');
            if (res.length > 1) {
                sortObj = {
                    [res[1]]: 'DESC'
                };
            } else {
                sortObj = {
                    [res[0]]: 'ASC'
                };
            }
        }

        let filterObj;
        if (filter) {
            for (let [key, value] of Object.entries(filter)) {
                if (typeof filter[key] === "string") {
                    filterObj = {
                        ...filterObj,
                        [key]: Equal(value)
                    }
                } else if (typeof filter[key] === "object") {
                    for (let [childKey, childValue] of Object.entries(filter[key])) {
                        if (childKey === 'between') {
                            filterObj = {
                                ...filterObj,
                                [key]: Between(childValue[0], childValue[1])
                            }
                        } else if (childKey === 'moreThan') {
                            filterObj = {
                                ...filterObj,
                                [key]: MoreThan(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterObj = {
                                ...filterObj,
                                [key]: LessThan(childValue)
                            }
                        } else if (childKey === 'moreThanOrEqual') {
                            filterObj = {
                                ...filterObj,
                                [key]: MoreThanOrEqual(childValue)
                            }
                        } else if (childKey === 'lessThan') {
                            filterObj = {
                                ...filterObj,
                                [key]: LessThanOrEqual(childValue)
                            }
                        } else if (childKey === 'not') {
                            filterObj = {
                                ...filterObj,
                                [key]: Not(childValue)
                            }
                        }
                    }
                }
            }
        }
        return {
            relations,
            take: +limit || 50,
            skip: +(limit * (page - 1)) || 0,
            where: filterObj,
            order: sortObj,
            cache: 60000
        }
    }
;

export default queryBuilder;
