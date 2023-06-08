import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret', // 세션 암호화에 사용되는 키(유출되면 안됨)
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  ),
    app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
