import { Book } from '../../book.entity';
import {
  ExtractSortFields, OffsetPaginated, OffsetPaginationInput,
} from '@deeepvision/nest-kit';
import {
  ArgsType, Field, InputType, ObjectType, registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class BooksFilter {
  @Field(() => [String], {
    nullable: true,
  })
  ids?: string[];

  @Field({
    nullable: true,
  })
  search?: string;
}

export enum BooksOrderBy {
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC'
}

export type BooksOrderFields = ExtractSortFields<BooksOrderBy>;
registerEnumType(BooksOrderBy, {
  name: 'BooksOrderBy',
});

@ArgsType()
export class FetchBooksInput extends OffsetPaginationInput {
  @Field(() => BooksOrderBy, {
    defaultValue: BooksOrderBy.createdAt_DESC,
  })
  orderBy!: BooksOrderBy;

  @Field(() => BooksFilter, {
    nullable: true,
  })
  filter?: BooksFilter;
}

@ObjectType()
export class PaginatedBooks extends OffsetPaginated(Book) {
}
