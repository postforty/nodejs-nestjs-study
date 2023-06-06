import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm'; // 리포지토리 주입 데코레이터
import { Repository } from 'typeorm'; // 리포지토리

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // <>안에 entity 객체 타입 추가
  ) {}
}
