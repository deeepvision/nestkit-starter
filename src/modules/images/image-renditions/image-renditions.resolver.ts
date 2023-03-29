import { Resolver } from '@nestjs/graphql';
import { ImageRendition } from './image-rendition.entity';
import { ImageRenditionsService } from './image-renditions.service';
import { BaseImageRenditionsResolver } from '@deeepvision/nest-kit/dist/modules/images';

@Resolver(() => ImageRendition)
export class ImageRenditionsResolver extends BaseImageRenditionsResolver(ImageRendition) {
  constructor(
    protected readonly imageRenditionsService: ImageRenditionsService,
  ) {
    super(imageRenditionsService);
  }
}
