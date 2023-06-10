/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
