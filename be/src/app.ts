import express, {Application} from 'express';
import { RoutesClassInterface } from './interfaces/RoutesClassInterface';
import cors from 'cors';
import bodyParser from 'body-parser';
import {StatusCodes} from 'http-status-codes';
import errorMiddleware from './middlewares/errorMiddleware';

class App {
    readonly app: Application;

    constructor(private routes: RoutesClassInterface[]) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }

    private initErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initRoutes() {
        this.routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
        this.app.use('/', (req, res, next) => {
            res.status(StatusCodes.NOT_FOUND).send('PAGE NOT FOUND');
        });
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
    }

    public getServer(): any {
        return this.app;
    }

    public listen(): void {
        const DEFAULT_PORT = 5000;
        this.app.listen(process.env.PORT || DEFAULT_PORT, () => {
            console.log(`App listening on the port ${process.env.PORT || DEFAULT_PORT}`);
        });
    }
}

export default App;