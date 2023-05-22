import {
  Field, InputType, ObjectType,
} from '@nestjs/graphql';

@InputType()
export class DeleteBookInput {
  @Field()
  id!: string;
}

@ObjectType()
export class DeleteBookPayload {
  @Field()
  id!: string;
}
