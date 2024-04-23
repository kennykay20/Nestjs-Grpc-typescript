import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  console.log(join(__dirname));
  console.log(join(__dirname, '../../auth/user1/user1.proto'));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        url: '0.0.0.0:54000',
        protoPath: join(__dirname, '..', '../auth/user1/user1.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
