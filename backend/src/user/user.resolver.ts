import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.repository.find();
  }

  @Mutation(() => User)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('role', { type: () => String, nullable: true }) role?: UserRole,
  ): Promise<User> {
    return this.userService.createUser(username, password, role ?? UserRole.MEMBER);
  }
  
    @Mutation(() => User)
    async updateUserRole(
      @Args('userId') userId: number,
      @Args('role') role: string,
    ): Promise<User> {
      return this.userService.updateUserRole(userId, role as UserRole);
    }
}
