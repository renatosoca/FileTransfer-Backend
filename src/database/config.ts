import { set, connect, ConnectOptions } from 'mongoose';

export const dbConnection = async (): Promise<void> => {
  set('strictQuery', false);

  try {
    const mongoUri: string = process.env.MONGO_URI || '';

    const db = await connect( mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`PORT: ${db.connection.port} | Database: ${db.connection.name}`);
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la BD ver logs');
  }
}