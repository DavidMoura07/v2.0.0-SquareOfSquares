import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ErrorsService } from './errors.service';
import { errorProviders } from './providers/error.providers';

@Module({
  providers: [...errorProviders, ErrorsService],
  exports: [...errorProviders, ErrorsService],
  imports: [DatabaseModule]
})
export class ErrorsModule {}
