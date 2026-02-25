import { Inject, Injectable } from '@nestjs/common';
import { TelegramService } from '../../integrations/telegram/telegram.service';
import { User } from '../user/user.entity';
import { CommandHandlerFactory } from './command-handler-factory';

@Injectable()
export class CommandService {
  constructor(@Inject() private readonly telegramService: TelegramService) {}

  async handleCommand(command: string, user: User): Promise<void> {
    console.log(`Handling command: ${command}`);
    const handler = CommandHandlerFactory.createHandler(
      command,
      this.telegramService,
    );
    await handler.handle(user);
  }
}
