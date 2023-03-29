import { InjectRepository } from '@nestjs/typeorm';
import { BaseBinaryFilesService } from '@deeepvision/nest-kit/dist/modules/binary-files';
import { Repository } from 'typeorm';

import { BinaryFile } from './binary-file.entity';

export class BinaryFilesService extends BaseBinaryFilesService<BinaryFile> {
  constructor(
    @InjectRepository(BinaryFile) protected readonly binaryFileRepository: Repository<BinaryFile>,
  ) {
    super(
      binaryFileRepository,
    );
  }
}
