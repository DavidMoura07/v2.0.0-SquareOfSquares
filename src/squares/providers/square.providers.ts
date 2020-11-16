import { Connection } from 'typeorm';
import { Square } from '../entities/square.entity';
import { constants } from '../../utils/constants';

export const squareProviders = [
  {
    provide: constants.SQUARE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Square),
    inject: [constants.DATABASE_CONNECTION],
  },
];