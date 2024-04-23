import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, PaginationDto, UpdateUserDto } from '@app/common';
import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '../../../../generated_ts_proto/user1/user1';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
import { TYPES } from '../types';

@Injectable()
export class UserService implements OnModuleInit {
  private userService1: UsersServiceClient;
  constructor(@Inject(TYPES.USER_SVC_CLIENT) private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService1 =
      this.userClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    console.log('inside here');
    console.log(createUserDto);
    return this.userService1.createUser(createUserDto);
  }

  findAll() {
    return this.userService1.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService1.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService1.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService1.removeUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });

    users$.complete();

    let chunkNumber = 1;

    this.userService1.queryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
