import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
} from '@app/common';
import { Observable } from 'rxjs';
//import { UsersServiceControllerMethods } from 'generated_ts_proto/user/user.service';
@Controller()
//@UsersServiceControllerMethods()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'CreateUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UsersService')
  findOneUser(findOneUserdDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserdDto.id);
  }

  @GrpcMethod('UsersService')
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService')
  removeUser(findOneUserdDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserdDto.id);
  }

  @GrpcMethod('UsersService')
  queryUsers(paginationDtoSream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoSream);
  }
}
