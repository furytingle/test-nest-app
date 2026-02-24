import { User } from '../user/user.entity';

export interface CommandHandlerInterface {
  handle(user: User): Promise<void>;
}
