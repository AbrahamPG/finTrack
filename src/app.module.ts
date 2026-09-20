import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AdminModule } from './admin/admin.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import { validationSchema } from './config/validation';

@Module({
  imports: [

    // CARGAMOS .ENV DE FORMA GLOBAL EN LA APP
    ConfigModule.forRoot({ 
      isGlobal:true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
      ],
      validationSchema,
    }),

    // CONFIGURAR TYPEORM DE FORMA ASINCRONA
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService : ConfigService)=>({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        //synchronize: true,
      })
    }),

    AuthModule,

    UsersModule,

    CategoriesModule,

    TransactionsModule,

    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
