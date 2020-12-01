import { createConnection } from 'typeorm';
import { constants } from '../utils/constants';

const synchronize = process.env.NODE_ENV !== "PROD" ? true : false

export const databaseProviders = [
  {
    provide: constants.DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'userdocker',
      password:  process.env.DB_PASSWORD || 'passdocker',
      database: process.env.DB_SCHEMA || 'squares',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize,
    }),
  },
];