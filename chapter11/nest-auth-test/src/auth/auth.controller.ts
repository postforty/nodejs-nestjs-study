import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  LoginGuard,
} from './auth.guard';

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

  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10, // 로그인 테스트를 고려해 10초로 설정
      });
    }
    return res.send({ message: 'login2 success' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인된 때만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  async login3(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuardWithSession(@Request() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('to-google')
  async googleAuth(@Request() req) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
