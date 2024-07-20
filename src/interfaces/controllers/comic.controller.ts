import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ComicsService } from '../../application/services/comic.service';
import { JwtAuthGuard } from '../../infrastructure/middleware/jwt-auth.guard';

@Controller('comics')
@UseGuards(JwtAuthGuard)
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  async getComics() {
    return this.comicsService.getComics();
  }

  @Get(':id')
  async getComicById(@Param('id') id: string) {
    return this.comicsService.getComicById(id);
  }
}
