import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fileUpLoad(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return `${file.originalname} File Uploaded check http://localhost:3000/upload/${file.filename}`;
  }
}
