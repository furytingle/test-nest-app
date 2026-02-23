import { Inject, Injectable, Logger, Req } from '@nestjs/common';
import { UpdateBodyDto } from './core/dto/update-body.dto';
import { plainToClass } from 'class-transformer';
import { FindOrCreateUserDto } from './user/dto/find-or-create-user.dto';
import { validate } from 'class-validator';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@Inject() private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processUpdate(
    @Req() request: Request,
    updateBody: UpdateBodyDto,
  ): Promise<void> {
    this.logger.log('Request body', request.body);

    const findOrCreateUserDto = plainToClass(
      FindOrCreateUserDto,
      updateBody.message.from,
    );

    const errors = await validate(findOrCreateUserDto);

    if (errors.length > 0) {
      this.logger.error('Failed to parse user data: ', errors);
    }

    const user = await this.userService.findOrCreate(findOrCreateUserDto);

    this.logger.log('Got local user', user);
  }
}
