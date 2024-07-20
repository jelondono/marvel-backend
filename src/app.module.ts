import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './interfaces/routes/auth.routes';
import { UsersModule } from './interfaces/routes/user.routes';
import { ComicsModule } from './interfaces/routes/comic.routes';
import { MarvelApiModule } from './infrastructure/marvel-api/marvel-api.module';
import configuration from './infrastructure/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ComicsModule,
    MarvelApiModule,
  ],
})
export class AppModule {}
