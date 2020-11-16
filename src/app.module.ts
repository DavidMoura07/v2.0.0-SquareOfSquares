import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerritoriesModule } from './territories/territories.module';
import { SquaresModule } from './squares/squares.module';
import { ErrorsModule } from './errors/errors.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TerritoriesModule, SquaresModule, ErrorsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
