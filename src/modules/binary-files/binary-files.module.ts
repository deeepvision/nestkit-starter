import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BinaryFilesService } from './binary-files.service';
import { BinaryFilesResolver } from './binary-files.resolver';
import { BinaryFile } from './binary-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BinaryFile]),
  ],
  providers: [
    BinaryFilesService,
    BinaryFilesResolver,
  ],
  exports: [
    BinaryFilesService,
    BinaryFilesResolver,
  ],
})
export class BinaryFilesModule {}
