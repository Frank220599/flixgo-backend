import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import {useContainer} from "routing-controllers";
import {Container} from "typedi";
import logger from "morgan";
import path from "path";


useContainer(Container);
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use([
    helmet(),
    express.json(),
    express.urlencoded({extended: false}),
    logger('tiny')
]);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app




