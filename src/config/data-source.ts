import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import databaseConfig from '../config/database.config';

// Obligatorio para la CLI externa: lee el archivo .env de la raíz
dotenv.config();


export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,
  logging: process.env.NODE_ENV === 'development',

  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../migrations/*.{js,ts}'],
});
