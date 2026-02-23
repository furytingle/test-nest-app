import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateBodyDto } from '../core/dto/update-body.dto';
import { plainToClass } from 'class-transformer';
import { FindOrCreateUserDto } from './user/dto/find-or-create-user.dto';
import { validate } from 'class-validator';
import { UserService } from './user/user.service';
import { TelegramService } from '../integrations/telegram.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly telegramService: TelegramService,
  ) {}

  async processUpdate(updateBody: UpdateBodyDto): Promise<void> {
    const findOrCreateUserDto = plainToClass(
      FindOrCreateUserDto,
      updateBody.message.from,
    );

    const errors = await validate(findOrCreateUserDto);

    if (errors.length > 0) {
      this.logger.error('Failed to parse user data: ', errors);
    }

    const user = await this.userService.findOrCreate(findOrCreateUserDto);

    if (updateBody.message.location) {
      await this.userService.updateUserLocation(
        user,
        updateBody.message.location,
      );
      await this.telegramService.sendMessage(
        user.telegramId,
        'Location updated',
      );
    }

    this.logger.log('Got local user', user);
  }
}
