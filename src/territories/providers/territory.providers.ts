import { Connection } from 'typeorm';
import { Territory } from '../entities/territory.entity';
import { constants } from '../../utils/constants';

export const territoryProviders = [
  {
    provide: constants.TERRITORY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Territory),
    inject: [constants.DATABASE_CONNECTION],
  },
];