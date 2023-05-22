import { InjectWinstonLoggerFactory, WinstonLoggerFactory } from '@deeepvision/nest-kit';
import { GcsService } from '@deeepvision/nest-kit/dist/modules/gcs';
import { IdService } from '@deeepvision/nest-kit/dist/modules/id';
import { BaseImageRenditionsService } from '@deeepvision/nest-kit/dist/modules/images';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageRendition } from './image-rendition.entity';

export class ImageRenditionsService extends BaseImageRenditionsService<ImageRendition> {
  constructor(
    @InjectRepository(ImageRendition) protected readonly imageRenditionRepository: Repository<ImageRendition>,
    protected readonly gcsService: GcsService,
  ) {
    super(
      imageRenditionRepository,
      gcsService,
    );
  }
}
