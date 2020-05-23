import {Request} from "express"
import jwt from "jsonwebtoken";
import {UnauthorizedError,} from "routing-controllers"
import {getCustomRepository} from "typeorm"
import UserRepository from "../repositories/UserRepository";
import User from "../database/entities/User";

interface IRequest extends Request {
    user: User
}

const isAuth = async ({request}: { request: IRequest}) => {
    try {
        const repository = getCustomRepository(UserRepository);
        const authHeader = await request.get('Authorization');
        if (!authHeader) {
            throw new UnauthorizedError();
        }
        const token = authHeader.split(' ')[1];
        let decodedToken = await jwt.verify(token, 'secret') as { userId: number };
        if (!decodedToken) {
            throw new UnauthorizedError();
        }
        return request.user = await repository.findById(decodedToken.userId);
    } catch (e) {
        throw new UnauthorizedError(e)
    }
};

export default isAuth
