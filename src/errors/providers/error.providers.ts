import { Connection } from 'typeorm';
import { ErrorEntity } from '../entities/error.entity';
// import { DomainError } from '../entities/domain-erro.entity';
// import { TypeError } from '../entities/type-error.entity';
import { constants } from '../../utils/constants';

export const errorProviders = [
  {
    provide: constants.ERROR_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(ErrorEntity),
    inject: [constants.DATABASE_CONNECTION],
  },
  // {
  //   provide: constants.DOMAIN_ERROR_REPOSITORY,
  //   useFactory: (connection: Connection) => connection.getRepository(DomainError),
  //   inject: [constants.DATABASE_CONNECTION],
  // },
  // {
  //   provide: constants.TYPE_ERROR_REPOSITORY,
  //   useFactory: (connection: Connection) => connection.getRepository(TypeError),
  //   inject: [constants.DATABASE_CONNECTION],
  // },
];