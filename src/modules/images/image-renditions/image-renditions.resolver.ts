import { BaseImageRenditionsResolver } from '@deeepvision/nest-kit/dist/modules/images';
import { Resolver } from '@nestjs/graphql';

import { ImageRendition } from './image-rendition.entity';

@Resolver(() => ImageRendition)
export class ImageRenditionsResolver extends BaseImageRenditionsResolver(ImageRendition) {}
