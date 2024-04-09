import { registerEnumType } from '@nestjs/graphql';

export enum WorkerType {
  DIGGER = 'DIGGER',
  AIRPLANE = 'AIRPLANE',
}

registerEnumType(WorkerType, {
  name: 'WorkerType',
});

