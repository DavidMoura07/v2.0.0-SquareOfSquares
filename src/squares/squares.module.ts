import { Module } from '@nestjs/common';
import { SquaresService } from './squares.service';
import { SquaresController } from './squares.controller';
import { squareProviders } from './providers/square.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TerritoriesModule } from 'src/territories/territories.module';
import { ErrorsModule } from 'src/errors/errors.module';

@Module({
  controllers: [SquaresController],
  providers: [SquaresService, ...squareProviders],
  imports: [DatabaseModule, TerritoriesModule, ErrorsModule]
})
export class SquaresModule {}
