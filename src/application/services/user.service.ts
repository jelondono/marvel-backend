import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../domain/models/user.model';
import { CreateUserDto } from '../../interfaces/dto/create-user.dto';
import { AddFavoriteDto } from '../../interfaces/dto/add-favorite.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async addFavorite(userId: string, addFavoriteDto: AddFavoriteDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    user.favorites.push(addFavoriteDto);
    return user.save();
  }

  async getFavorites(userId: string): Promise<AddFavoriteDto[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.favorites || [];
  }
  async removeFavorite(userId: string, comicId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    user.favorites = user.favorites.filter(fav => fav.comicId !== comicId);
    return user.save();
  }
}
