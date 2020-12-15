import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.userService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.userService.login(credentials);
  }
}
