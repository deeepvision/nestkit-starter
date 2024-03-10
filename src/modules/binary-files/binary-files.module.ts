import { BINARY_FILES_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/binary-files';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BinaryFile } from './binary-file.entity';
import { BinaryFilesResolver } from './binary-files.resolver';
import { BinaryFilesService } from './binary-files.service';

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
