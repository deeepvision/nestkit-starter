import { BaseImage } from '@deeepvision/nest-kit/dist/modules/images';
import { ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

import { ImageRendition } from './image-renditions/image-rendition.entity';

@ObjectType()
@ChildEntity()
export class Image extends BaseImage {
  renditions!: Promise<ImageRendition[]>;
}
