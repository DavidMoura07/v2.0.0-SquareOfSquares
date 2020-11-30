import { Module } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { TerritoriesController } from './territories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { territoryProviders } from './providers/territory.providers';
import { ErrorsModule } from 'src/errors/errors.module';

@Module({
  controllers: [TerritoriesController],
  providers: [TerritoriesService, ...territoryProviders],
  exports: [...territoryProviders],
  imports: [DatabaseModule, ErrorsModule]
})
export class TerritoriesModule {}
