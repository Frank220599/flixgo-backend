require('dotenv').config();
import "reflect-metadata";
import express from "express"
import {createExpressServer, useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";
import debug from "debug";
import logger from "morgan"
import compression from "compression"
import db from './database'

useContainer(Container);
const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('tiny'));

const server = useExpressServer(app, {
    authorizationChecker: async (action) => {
        console.log(action);
        return false
    },
    routePrefix: "/api/v1",
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: []
});

db.sync({force: false}).then(r => {
    server.listen(8080, () => {
        debug(`Server up and running on port ${this.port}`)
    })
});


