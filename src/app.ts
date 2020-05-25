import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import {useContainer} from "routing-controllers";
import {Container} from "typedi";
import debug from "debug";
import logger from "morgan";


useContainer(Container);
const app = express();
app.use([
    helmet(),
    express.json(),
    express.urlencoded({extended: true}),
    logger('tiny')
]);

app.get('/', (req, res) => {
    res.send('Hello World!')
});
debug('http');

export default app




