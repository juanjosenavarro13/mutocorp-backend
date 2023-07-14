import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createWriteStream } from 'node:fs';
import { get } from 'http';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT || 3005;

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('JNP API')
    .setVersion('1.0')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);

  if (process.env.NODE_ENV === 'development') {
    const serverUrl = `http://localhost:${port}`;

    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}
bootstrap();
