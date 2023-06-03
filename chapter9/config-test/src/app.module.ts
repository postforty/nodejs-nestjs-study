import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV);
console.log('current working directory : ' + process.cwd());
console.log(`${process.cwd()}/envs/${process.env.NODE_ENV.trim()}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV.trim()}.env`,
      load: [config],
      cache: true, // ConfigService의 get() 함수 사용시 캐시에서 먼저 불러오므로 성능상 이점
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
