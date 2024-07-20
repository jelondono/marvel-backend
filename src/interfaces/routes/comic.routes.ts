import { Module } from '@nestjs/common';
import { ComicsService } from '../../application/services/comic.service';
import { ComicsController } from '../controllers/comic.controller';
import { MarvelApiModule } from '../../infrastructure/marvel-api/marvel-api.module';

@Module({
  imports: [MarvelApiModule],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
