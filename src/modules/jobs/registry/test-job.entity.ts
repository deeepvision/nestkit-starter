import { Job } from '@deeepvision/nest-kit/dist/modules/jobs';
import { UploadRegion } from '@deeepvision/nest-kit/dist/modules/organizations';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChildEntity } from 'typeorm';

@ObjectType()
export class TestJobMeta {
  @Field(() => UploadRegion)
  uploadRegion!: UploadRegion;
}

@ObjectType({
  implements: () => Job,
})
@ChildEntity()
export class TestJob extends Job {
  @Field(() => TestJobMeta)
  meta!: TestJobMeta;
}
