import { Controller, Get, Post, Body, UseGuards, Request, Delete } from '@nestjs/common';
import { UsersService } from '../../application/services/user.service';
import { JwtAuthGuard } from '../../infrastructure/middleware/jwt-auth.guard';
import { AddFavoriteDto } from '../dto/add-favorite.dto';
import { User } from '../../domain/models/user.model';
import { RemoveFavoriteDto } from '../dto/remove-favorite.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addFavorite(@Request() req: any, @Body() addFavoriteDto: AddFavoriteDto): Promise<User> {
    console.log(req.user); // Asegúrate de que req.user contiene userId
    const userId = req.user.userId;
    return this.usersService.addFavorite(userId, addFavoriteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Request() req: any): Promise<AddFavoriteDto[]> {
    return this.usersService.getFavorites(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites')
  async removeFavorite(@Request() req: any, @Body() removeFavoriteDto: RemoveFavoriteDto): Promise<User> {
    const userId = req.user.userId;
    return this.usersService.removeFavorite(userId, removeFavoriteDto.comicId);
  }
}
