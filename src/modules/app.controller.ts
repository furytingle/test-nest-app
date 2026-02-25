import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';
import { UpdateBodyDto } from '../core/dto/update-body.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/process-update')
  @HttpCode(200)
  async processUpdate(
    @Req() request: Request,
    @Body() updateBodyDto: UpdateBodyDto,
  ) {
    await this.appService.processUpdate(updateBodyDto);
    return { success: true };
  }
}
