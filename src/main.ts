import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { FormatResponse } from './interceptors/format-response.interceptor';
import { IncompleteDataException } from './errors/incomplete-data.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Square of Squares')
    .setDescription('Square of squares documentation')
    .setVersion('1.0')
    .addTag('Territory')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => new IncompleteDataException(errors),
    }),
  ).useGlobalInterceptors(new FormatResponse());

  await app.listen(8888);
  console.log("Listening on port 8888")
}
bootstrap();
