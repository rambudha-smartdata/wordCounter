import mongoose from 'mongoose';
import constants from './constant';

mongoose.Promise = global.Promise;


const mongooseConnection = () => mongoose.connect(constants.db,
  { useCreateIndex: true, useNewUrlParser: true }).then(
  () => {
    console.log('Database connected');
  }, () => {
    console.log('database not connected');
  },
);

export default mongooseConnection;
