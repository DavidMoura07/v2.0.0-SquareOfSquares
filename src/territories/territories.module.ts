import { Module } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { TerritoriesController } from './territories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { territoryProviders } from './providers/territory.providers';

@Module({
  controllers: [TerritoriesController],
  providers: [TerritoriesService, ...territoryProviders],
  imports: [DatabaseModule]
})
export class TerritoriesModule {}
