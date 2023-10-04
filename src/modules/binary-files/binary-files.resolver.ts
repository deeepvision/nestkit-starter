import { Resolver } from '@nestjs/graphql';
import { BaseBinaryFilesResolver } from '@deeepvision/nest-kit/dist/modules/binary-files';
import { BinaryFile } from './binary-file.entity';

@Resolver(() => BinaryFile)
export class BinaryFilesResolver extends BaseBinaryFilesResolver(BinaryFile) {}
