import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './share/common/http-exception.filter';
import { MiddlewareService } from './share/common/middleware.service';
import { ConfigurationService } from './share/common/configuration.service';
import { SiteGuard } from './share/common/site.guard';
import { LeadService } from './application/services/lead.service';
import { StateService } from './share/common/state.service';
import { LeadRepositorySpec } from './infrastructure/persistence/repositories/lead.repository.spec';
import { ILeadRepository } from './domain/ports/lead.repository';
import { LeadController } from './infrastructure/http/controllers/lead.controller';
import { LeadRepositoryImpl } from './infrastructure/persistence/repositories/lead.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './infrastructure/persistence/entities/lead.entity';
import * as Tools from './share/tools/tools';

const env_file = Tools.getEnvFile();
let is_mock = env_file !== undefined && env_file.ENV_APP_MODE == 'mock';

@Module({
  imports: [

    // load environment data
    ConfigModule.forRoot(
      {
        load: [
          () => {
            return { ...env_file }
          }
        ]
      }
    ),

    //
    TypeOrmModule.forFeature([LeadEntity]),

    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        type: 'postgres',
        host: config_service.get<string>('ENV_DB_HOST'),
        port: config_service.get<number>('ENV_DB_PORT'),
        username: config_service.get<string>('ENV_DB_USERNAME'),
        password: config_service.get<string>('ENV_DB_PASSWORD'),
        database: config_service.get<string>('ENV_DB_NAME'),
        entities: [LeadEntity],
        synchronize: false,
      })
    })
  ],
  providers: [
    // share - global
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },

    // share
    MiddlewareService,
    ConfigurationService,
    StateService,
    SiteGuard,

    // aplication
    LeadService,

    // infraestructure
    (is_mock ? {
      useClass: LeadRepositorySpec,
      provide: ILeadRepository
    } : {
      useClass: LeadRepositoryImpl,
      provide: ILeadRepository
    })
  ],
  controllers: [
    LeadController
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareService)
      .forRoutes('*')
  }
}
