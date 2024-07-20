import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './user.service';
import { CreateUserDto } from '../../interfaces/dto/create-user.dto';
import { LoginUserDto } from '../../interfaces/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user._doc.email, sub: user._doc._id, userId: user._doc._id, username: user._doc.name };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user._doc._id,
      username: user._doc.name,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
