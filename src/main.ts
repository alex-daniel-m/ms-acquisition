import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { routes } from '@infrastructure/http/routes/routes';

async function bootstrap() {

  // ------ Aplication

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();

  // ------ Swagger

  const config = new DocumentBuilder()
    .setTitle('Report Service')
    .setDescription('High-performance tracking engine for lead attribution and technical fingerprinting. Designed to capture marketing metadata and hardware signals across multi-niche platforms.')
    .setVersion('1.0')
    .addTag('Microservice', 'Endpoints for building reports')
    .build();

  const custom_options: SwaggerCustomOptions = {
    customfavIcon: 'https://innosk.com/favicon.svg',
    customSiteTitle: 'Innosk Reports API Docs',
    customCss: `
          .swagger-ui .topbar-wrapper .link {
              display: none !important;
          }

          .swagger-ui .topbar-wrapper img, 
          .swagger-ui .topbar-wrapper svg {
              display: none !important;
          }

          .swagger-ui .topbar-wrapper:before {
              content: 'Innosk';
              color: #86efac;
              font-weight: 900;
              font-size: 38px;
              font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              letter-spacing: 2px;
              margin-right: auto; /* Esto lo empuja a la izquierda */
          }

          .swagger-ui .topbar .download-url-wrapper { 
              display: none !important; 
          }
      `
  }

  const document = SwaggerModule.createDocument(
    app,
    config
  );

  SwaggerModule.setup(
    `${routes.ENV_APP_PATH}${routes.ENV_SWAGGER_DOCS_RESOURCE}` || '/docs',
    app,
    document,
    custom_options
  );

  // ------ Run

  await app.listen(
    routes.ENV_APP_PORT,
    routes.ENV_APP_HOST
  );
}
bootstrap();
