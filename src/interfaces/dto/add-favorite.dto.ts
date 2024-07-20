import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteDto {
  @IsString()
  @IsNotEmpty()
  readonly comicId!: string;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;
  
  @IsString()
  @IsNotEmpty()
  readonly thumbnail?: string;
}
