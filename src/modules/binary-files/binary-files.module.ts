import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BinaryFilesService } from './binary-files.service';
import { BinaryFilesResolver } from './binary-files.resolver';
import { BinaryFile } from './binary-file.entity';
import { BINARY_FILES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/binary-files';

@Module({
  imports: [
    TypeOrmModule.forFeature([BinaryFile]),
  ],
  providers: [
    BinaryFilesService,
    {
      provide: BINARY_FILES_SERVICE_TOKEN,
      useExisting: BinaryFilesService,
    },
    BinaryFilesResolver,
  ],
  exports: [
    BinaryFilesService,
    {
      provide: BINARY_FILES_SERVICE_TOKEN,
      useExisting: BinaryFilesService,
    },
    BinaryFilesResolver,
  ],
})
export class BinaryFilesModule {}
