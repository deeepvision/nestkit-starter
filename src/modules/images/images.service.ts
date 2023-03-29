import { InjectWinstonLoggerFactory, WinstonLoggerFactory } from '@deeepvision/nest-kit';
import { BaseImagesService } from '@deeepvision/nest-kit/dist/modules/images';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageRenditionsService } from './image-renditions/image-renditions.service';
import { Image } from './image.entity';

export class ImagesService extends BaseImagesService<Image> {
  constructor(
    @InjectRepository(Image) protected readonly imageRepository: Repository<Image>,
    @InjectWinstonLoggerFactory() protected readonly loggerFactory: WinstonLoggerFactory,
    protected readonly imageRenditionsService: ImageRenditionsService,
  ) {
    super(
      imageRepository,
      imageRenditionsService,
    );
  }
}
