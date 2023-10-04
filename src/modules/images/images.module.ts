import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesResolver } from './images.resolver';
import { Image } from './image.entity';
import { ImageRendition } from './image-renditions/image-rendition.entity';
import { ImageRenditionsService } from './image-renditions/image-renditions.service';
import { ImageRenditionsResolver } from './image-renditions/image-renditions.resolver';
import { IMAGES_SERVICE_TOKEN, IMAGE_RENDITIONS_SERVICE_TOKEN } from '@deeepvision/nest-kit/dist/modules/images';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, ImageRendition]),
  ],
  providers: [
    ImagesService,
    {
      provide: IMAGES_SERVICE_TOKEN,
      useExisting: ImagesService,
    },
    ImagesResolver,
    ImageRenditionsService,
    {
      provide: IMAGE_RENDITIONS_SERVICE_TOKEN,
      useExisting: ImageRenditionsService,
    },
    ImageRenditionsResolver,
  ],
  exports: [
    ImagesService,
    {
      provide: IMAGES_SERVICE_TOKEN,
      useExisting: ImagesService,
    },
    ImageRenditionsService,
  ],
})
export class ImagesModule {}
