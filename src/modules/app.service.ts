import { Inject, Injectable, Logger } from '@nestjs/common';
import { UpdateBodyDto } from '../core/dto/update-body.dto';
import { plainToClass } from 'class-transformer';
import { FindOrCreateUserDto } from './user/dto/find-or-create-user.dto';
import { validate } from 'class-validator';
import { UserService } from './user/user.service';
import { TelegramService } from '../integrations/telegram/telegram.service';
import { MessageDto } from '../core/dto/message.dto';
import { User } from './user/user.entity';
import { FromDto } from '../core/dto/from.dto';
import { EntityType } from '../core/enum/entity-type.enum';
import { CommandService } from './command/command.service';
import { CommandHelper } from './command/helpers/command-helper';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly telegramService: TelegramService,
    @Inject() private readonly commandService: CommandService,
  ) {}

  async processUpdate(updateBody: UpdateBodyDto): Promise<void> {
    if (!updateBody.message) {
      return;
    }

    const user = await this.validateUser(updateBody.message.from);

    if (!user) {
      return;
    }

    await this.resolveMessage(updateBody.message, user);
  }

  private async resolveMessage(message: MessageDto, user: User): Promise<void> {
    if (message.location) {
      await this.userService.updateUserLocation(user, message.location);
      await this.telegramService.sendMessage(
        user.telegramId,
        'Location updated',
      );
    } else if (message.entities?.length) {
      const type = message.entities[0].type;
      const entityLength = message.entities[0].length;

      if (type === EntityType.BOT_COMMAND) {
        await this.commandService.handleCommand(
          CommandHelper.trimCommand(message.text, entityLength),
          user,
        );
      }
    }
  }

  private async validateUser(from: FromDto): Promise<User | null> {
    const findOrCreateUserDto = plainToClass(FindOrCreateUserDto, from);

    const errors = await validate(findOrCreateUserDto);

    if (errors.length > 0) {
      this.logger.error('Failed to parse user data: ', errors);
      return null;
    }

    return await this.userService.findOrCreate(findOrCreateUserDto);
  }
}
