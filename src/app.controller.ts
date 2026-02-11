import { Controller, Get, Post, Body, HttpCode, Req } from '@nestjs/common';
// import { UpdateBodyDto } from './core/dto/update-body.dto';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/process-update')
  @HttpCode(200)
  processUpdate(@Req() request: Request) {
    console.log(request.body);
    //this.appService.processUpdate(updateBody);
    return { success: true };
  }
}
