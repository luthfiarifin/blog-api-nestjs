import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(credentials: RegisterDTO) {
    try {
      const user = this.userRepository.create(credentials);
      await user.save();
      return user;
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Username has already been taken');
      }

      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user && await user.comparePassword(password)) {
        return user;
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
