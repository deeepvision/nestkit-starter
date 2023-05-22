import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field()
  id!: string;

  @Field({
    nullable: true,
  })
  title?: string;
}
