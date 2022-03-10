import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(salt + ' - salt');
    // console.log(hashedPassword + ' - hashedPassword');

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      // console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('User name already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
