import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  //SWAGGER CONFIURATION
  const config = new DocumentBuilder()
    .setTitle('Mi API de NestJS')
    .setDescription('Documentacion de la API con soporte a PostgreSQL')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  //MONTAMOS RUTA DE SWAGGER
  SwaggerModule.setup('api/docs', app, document)
  
  //Filters
  app.useGlobalFilters(new HttpExceptionFilter())


  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
