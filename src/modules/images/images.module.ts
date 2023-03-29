import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesResolver } from './images.resolver';
import { Image } from './image.entity';
import { ImageRendition } from './image-renditions/image-rendition.entity';
import { ImageRenditionsService } from './image-renditions/image-renditions.service';
import { ImageRenditionsResolver } from './image-renditions/image-renditions.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, ImageRendition]),
  ],
  providers: [
    ImagesService,
    ImagesResolver,
    ImageRenditionsService,
    ImageRenditionsResolver,
  ],
  exports: [
    ImagesService,
    ImageRenditionsService,
  ],
})
export class ImagesModule {}
