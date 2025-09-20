import { Post, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthRestController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const result = await this.authService.login(username, password);
    return result;
  }
}
