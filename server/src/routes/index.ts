import {Express} from 'express';
import vocabRouter from './routers/vocab.r';
import AuthRouter from './routers/auth.r';

const routes = (app:Express) => {
    app.use("/v1/api/vocab", vocabRouter);
    app.use("/v1/api/auth",AuthRouter);
};

export default routes;