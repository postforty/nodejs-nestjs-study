import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, Response } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: true,
        maxAge: 1000 * 60 * 24 * 7,
      });
    }
    return res.send({ message: 'login success' });
  }
}
