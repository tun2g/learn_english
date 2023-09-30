import mongoose from 'mongoose';
import envConfig from '../envConfig';

mongoose.set('strictQuery', false);

async function connect() {
  try {
    console.log(`Connect to ${envConfig.DB_URI}`);  
    await mongoose.connect(envConfig.DB_URI!,{});

  } catch (err) {
    console.log('Mongo connect failed');
  }
}

export default { connect };
