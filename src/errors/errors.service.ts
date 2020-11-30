import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/utils/constants';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { Repository } from 'typeorm';
// import { DomainError } from './entities/domain-erro.entity';
import { ErrorEntity } from './entities/error.entity'

@Injectable()
export class ErrorsService {

  constructor(
    @Inject(constants.ERROR_REPOSITORY)
    private errorRepository: Repository<ErrorEntity>,

    // @Inject(constants.DOMAIN_ERROR_REPOSITORY)
    // private domainRepository: Repository<DomainError>,

    // @Inject(constants.TYPE_ERROR_REPOSITORY)
    // private typeRepository: Repository<TypeError>,
  ) {}

  registerError(message: string, type: TypesStrings, domain: DomainsStrings, data?: any){
      const error = new ErrorEntity()
      error.message = message
      error.type = type
      error.domain = domain
      error.data = data
      return this.errorRepository.save(error)
  }

//   private _createDomain(domain: DomainsStrings){
//       const domainError = new DomainError()
//       domainError.name = domain
//         console.log(Types.INCOMPLETE_DATA)
//     //   this.registerError(new ResponseDto(), "BLA", Types.INCOMPLETE_DATA, Domains.TERRITORY)

//     //   return this.domainRepository.save(domainError)
//   }
  
} 
