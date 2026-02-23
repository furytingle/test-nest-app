import { Controller, Get, Post, Body, HttpCode, Req } from '@nestjs/common';
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
  async processUpdate(
    @Req() request: Request,
    @Body() updateBodyDto: UpdateBodyDto,
  ) {
    console.log('Request body', request.body);
    await this.appService.processUpdate(updateBodyDto);
    return { success: true };
  }
}
