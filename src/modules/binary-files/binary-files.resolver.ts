import { Resolver } from '@nestjs/graphql';
import { BaseBinaryFilesResolver } from '@deeepvision/nest-kit/dist/modules/binary-files';

import { BinaryFile } from './binary-file.entity';
import { BinaryFilesService } from './binary-files.service';

@Resolver(() => BinaryFile)
export class BinaryFilesResolver extends BaseBinaryFilesResolver(BinaryFile) {
  constructor(
    protected readonly binaryFilesService: BinaryFilesService,
  ) {
    super(binaryFilesService);
  }
}
