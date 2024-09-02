import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UnitController } from './unit/unit.controller';
import { UnitService } from './unit/unit.service';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          logging: true,
          // synchronize: true,
          ssl: configService.get('NODE_ENV') == 'PROD' ? {
            rejectUnauthorized: false
          } : false


        }),
        inject: [ConfigService],
      }),
    UnitModule],
  controllers: [AppController, UnitController],
  providers: [AppService, UnitService],
})
export class AppModule {
}
