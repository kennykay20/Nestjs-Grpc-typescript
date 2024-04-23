import { ClientsModule, Transport } from '@nestjs/microservices';
import { TYPES } from './types';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

export const microservices = [
  ClientsModule.registerAsync([
    {
      name: TYPES.USER_SVC_CLIENT,
      useFactory: () => ({
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/user1/user1.proto'),
          url: '0.0.0.0:54000',
        },
      }),
    },
  ]),
];
