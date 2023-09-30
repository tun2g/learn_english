import express, { Express, Request, Response } from 'express';
import helmet from "helmet";
import morgan from "morgan";
import db from "./configs/mongo";
import cookieParser from 'cookie-parser';
import routes from './routes';
import envConfig from './envConfig';

const port = envConfig.PORT;

const app: Express = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan(":remote-addr - :method :url :status :response-time ms"));
app.use(cookieParser());
// Connect to database
db.connect();

// routes configuration
routes(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});