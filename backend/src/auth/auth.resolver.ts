import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Post, Body, Controller } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.authService.login(username, password);
    return result.access_token;
  }
}

@Controller('auth')
export class AuthRestController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const result = await this.authService.login(username, password);
    return result;
  }
}
