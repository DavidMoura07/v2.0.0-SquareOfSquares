import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerritoriesModule } from './territories/territories.module';
import { SquaresModule } from './squares/squares.module';
import { ErrorsModule } from './errors/errors.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TerritoriesController } from './territories/territories.controller';
import { SquaresController } from './squares/squares.controller';

@Module({
  imports: [TerritoriesModule, SquaresModule, ErrorsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(TerritoriesController, SquaresController)
  }
}
