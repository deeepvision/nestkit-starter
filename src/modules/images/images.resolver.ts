import { Resolver } from '@nestjs/graphql';
import { BaseImagesResolver } from '@deeepvision/nest-kit/dist/modules/images';
import { Image } from './image.entity';
import { ImagesService } from './images.service';
import { ImageRenditionsService } from './image-renditions/image-renditions.service';

@Resolver(() => Image)
export class ImagesResolver extends BaseImagesResolver(Image) {
  constructor(
    protected readonly imagesService: ImagesService,
    protected readonly imageRenditionsService: ImageRenditionsService,
  ) {
    super(imagesService, imageRenditionsService);
  }
}
