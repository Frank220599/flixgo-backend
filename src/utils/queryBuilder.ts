const queryBuilder = (req) => {
    const {limit, page, include, select, ...restQueryParams} = req.query;
    let relations;
    if (typeof include === "string") {
        relations = new Array(include)
    } else {
        relations = include
    }
    return {
        relations: relations || [],
        take: +limit || 50,
        skip: +(limit * (page - 1)) || 0,
        where: {
            ...restQueryParams
        },
        order: {
            id: 'DESC'
        },
        cache: true
    }
};

export default queryBuilder;