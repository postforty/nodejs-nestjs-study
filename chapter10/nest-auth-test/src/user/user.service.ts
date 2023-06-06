import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm'; // 리포지토리 주입 데코레이터
import { Repository } from 'typeorm'; // 리포지토리

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // <>안에 entity 객체 타입 추가
  ) {}

  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  }

  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  }
}
