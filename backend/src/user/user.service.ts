import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  get repository() {
    return this.userRepository;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string, role: UserRole = UserRole.MEMBER): Promise<User> {
    const user = this.userRepository.create({ username, password, role });
    return this.userRepository.save(user);
  }
  
    async updateUserRole(userId: number, role: UserRole): Promise<User> {
      await this.userRepository.update(userId, { role });
      return this.userRepository.findOne({ where: { id: userId } });
    }
}
