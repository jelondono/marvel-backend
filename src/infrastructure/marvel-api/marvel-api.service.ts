import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class MarvelApiService {
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.publicKey = this.getConfigVariable('marvelApi.publicKey');
    this.privateKey = this.getConfigVariable('marvelApi.privateKey');
  }

  private getConfigVariable(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`${key} is not defined`);
    }
    return value;
  }

  private getAuthParams(): { ts: number; hash: string } {
    const ts = Date.now();
    const hash = crypto
      .createHash('md5')
      .update(ts + this.privateKey + this.publicKey)
      .digest('hex');
    return { ts, hash };
  }

  async get(endpoint: string): Promise<any> {
    const { ts, hash } = this.getAuthParams();
    const url = `https://gateway.marvel.com/v1/public${endpoint}`;
    const params = {
      ts,
      apikey: this.publicKey,
      hash,
    };

    try {
      const response = await this.httpService.get(url, { params }).toPromise();
      if (!response || !response.data) {
        throw new HttpException('No data returned from Marvel API', HttpStatus.NO_CONTENT);
      }
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch data from Marvel API', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
