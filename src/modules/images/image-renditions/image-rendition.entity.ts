import { BaseImageRendition } from '@deeepvision/nest-kit/dist/modules/images';
import { ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class ImageRendition extends BaseImageRendition {}
