import { Module } from '@nestjs/common';
//import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import { microservices } from './microservices.import';

@Module({
  imports: [...microservices],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
