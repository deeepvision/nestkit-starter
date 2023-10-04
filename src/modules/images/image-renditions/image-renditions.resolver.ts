import { Resolver } from '@nestjs/graphql';
import { ImageRendition } from './image-rendition.entity';
import { BaseImageRenditionsResolver } from '@deeepvision/nest-kit/dist/modules/images';

@Resolver(() => ImageRendition)
export class ImageRenditionsResolver extends BaseImageRenditionsResolver(ImageRendition) {}
