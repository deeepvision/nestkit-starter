import { Module } from '@nestjs/common';

import { EmailsController } from './emails.controller';

@Module({
  controllers: [
    EmailsController,
  ],
})
export class EmailsModule {}
