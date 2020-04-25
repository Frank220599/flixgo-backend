import User from "./database/models/User";

require('dotenv').config();
import {useExpressServer, Action} from "routing-controllers";
import isAuth from "./middlewares/isAuth";
import currentUserChecker from "./middlewares/currentUserChecker";
import db from "./database";
import app from "./app";

const server = useExpressServer(app, {
    authorizationChecker: async (action: Action, roles: string[]) => {
        const user: User = await isAuth(action);
        if (user && !roles.length)
            return true;
        if (user && roles.find(role => user.role.name === role)) {
            await action.response.json({
                msg: 'You do not permission for this operation'
            });
            return true;
        }
        return false;
    },
    currentUserChecker: (action) => currentUserChecker(action),
    cors: true,
    routePrefix: "/api/v1",
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: []
});

db.sync({force: false}).then(r => {
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        if (process.env.NODE_ENV !== 'test')
            console.log(`Server up and running on port ${port}`)
    })
});

export default server