import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config/configuration';

function configureSwagger(app: INestApplication) {
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('To-do-list')
    .setDescription('To Do List API description')
    .setVersion('1.0.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup('todo/docs', app, swaggerDoc);
}

function configureValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'todo/api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  configureSwagger(app);
  configureValidation(app);
  app.enableCors();
  await app.listen(config().port, () => {
    console.log(`app is running on port: ${config().port}`);
  });
}
bootstrap();