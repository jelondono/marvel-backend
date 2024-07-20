import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MarvelApiService } from 'src/infrastructure/marvel-api/marvel-api.service';

@Injectable()
export class ComicsService {
  constructor(private readonly marvelApiService: MarvelApiService) {}

  async getComics() {
    const data = await this.marvelApiService.get('/comics');
    if (!data || !data.data || !data.data.results) {
      throw new HttpException('No data returned from Marvel API', HttpStatus.NO_CONTENT);
    }
    return data.data.results;
  }

  async getComicById(id: string) {
    const data = await this.marvelApiService.get(`/comics/${id}`);
    if (!data || !data.data || !data.data.results || data.data.results.length === 0) {
      throw new HttpException('Comic not found', HttpStatus.NOT_FOUND);
    }
    return data.data.results[0];
  }
}
