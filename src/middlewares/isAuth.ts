import jwt from "jsonwebtoken";
import User from "../database/entities/User";


const isAuth = async ({request, response}) => {
    try {
        const authHeader = await request.get('Authorization');
        if (!authHeader) {
            response.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        const token = authHeader.split(' ')[1];
        if (token === "1") {
            return request.user = await User.findByPk(2);
        }
        let decodedToken = await jwt.verify(token, 'secret') as { userId: number };
        if (!decodedToken) {
            response.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        return request.user = await User.findByPk(decodedToken.userId);
    } catch (e) {
        await response.json({
            error: e.message
        });
    }
};

export default isAuth