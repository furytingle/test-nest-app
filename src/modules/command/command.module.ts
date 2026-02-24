import { Module } from '@nestjs/common';
import { TelegramService } from '../../integrations/telegram/telegram.service';
import { CommandService } from './command.service';

@Module({
  imports: [TelegramService],
  providers: [CommandService],
  exports: [CommandService],
})
export class CommandModule {}
