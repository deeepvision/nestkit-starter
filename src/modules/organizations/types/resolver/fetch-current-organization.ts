import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchCurrentOrganizationInput {
  @Field({
    nullable: true,
  })
  id?: string;
}
