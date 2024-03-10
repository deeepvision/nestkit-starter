import { BaseBinaryFile } from '@deeepvision/nest-kit/dist/modules/binary-files';
import { ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

@ObjectType()
@ChildEntity()
export class BinaryFile extends BaseBinaryFile {}
