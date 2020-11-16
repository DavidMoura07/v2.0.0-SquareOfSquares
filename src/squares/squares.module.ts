import { Module } from '@nestjs/common';
import { SquaresService } from './squares.service';
import { SquaresController } from './squares.controller';
import { squareProviders } from './providers/square.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TerritoriesModule } from 'src/territories/territories.module';

@Module({
  controllers: [SquaresController],
  providers: [SquaresService, ...squareProviders],
  imports: [DatabaseModule, TerritoriesModule]
})
export class SquaresModule {}
