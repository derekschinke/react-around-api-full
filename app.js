import express from 'express';
import mongoose from 'mongoose';

import userRouter from './routers/user';
import cardRouter from './routers/card';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '5fcdc953c018326cad76aa79' };
  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', (req, res) =>
  res.status(404).send({ message: 'Requested resource not found' })
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
