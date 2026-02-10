import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UpdateBodyDto } from './core/dto/update-body.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/process-update')
  @HttpCode(200)
  processUpdate(@Body() updateBody: UpdateBodyDto) {
    this.appService.processUpdate(updateBody);
    return { success: true };
  }
}
