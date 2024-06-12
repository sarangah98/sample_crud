import express from 'express';
import bodyParser from 'body-parser';
import employeeRouter from './routes/employee';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/employees', employeeRouter);

export default app;
