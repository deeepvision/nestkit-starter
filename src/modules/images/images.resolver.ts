import { BaseImagesResolver } from '@deeepvision/nest-kit/dist/modules/images';
import { Resolver } from '@nestjs/graphql';

import { Image } from './image.entity';
import { ImageRenditionsService } from './image-renditions/image-renditions.service';
import { ImagesService } from './images.service';

@Resolver(() => Image)
export class ImagesResolver extends BaseImagesResolver(Image) {
  constructor(
    protected readonly imagesService: ImagesService,
    protected readonly imageRenditionsService: ImageRenditionsService,
  ) {
    super(imagesService, imageRenditionsService);
  }
}
