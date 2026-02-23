import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { FindOrCreateUserDto } from './dto/find-or-create-user.dto';
import { LocationDto } from '../../core/dto/location.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreate(user: FindOrCreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { telegramId: user.id.toString() },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User();
    newUser.telegramId = user.id.toString();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.telegramLanguageCode = user.languageCode;
    newUser.telegramUsername = user.username;

    return this.userRepository.save(newUser);
  }

  async updateUserLocation(user: User, location: LocationDto): Promise<void> {
    user.location = {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    };
    await this.userRepository.save(user);
  }
}
