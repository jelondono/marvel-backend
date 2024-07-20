import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MarvelApiService } from './marvel-api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MarvelApiService],
  exports: [MarvelApiService],
})
export class MarvelApiModule {}
