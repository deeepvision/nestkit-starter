import { ObjectType } from '@nestjs/graphql';
import { BaseBinaryFile } from '@deeepvision/nest-kit/dist/modules/binary-files';
import { ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class BinaryFile extends BaseBinaryFile {}
