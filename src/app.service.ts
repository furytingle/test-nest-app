import { Injectable, Logger } from '@nestjs/common';
import { UpdateBodyDto } from './core/dto/update-body.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.debug('Got a request');
    return 'Hello World!';
  }

  processUpdate(updateBody: UpdateBodyDto): void {
    this.logger.log(updateBody.message);
  }
}
