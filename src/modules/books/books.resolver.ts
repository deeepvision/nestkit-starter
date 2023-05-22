import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  ActionContext, GraphQLJwtAuthGuard, GraphQLPermissionsGuard, createOffsetPaginationOptions, offsetPaginatedOutput,
} from '@deeepvision/nest-kit';
import { IActionContext } from '@/decorators';
import { UsePermission } from '@/permissions/permissions.decorators';
import {
  CreateBookInput, UpdateBookInput, DeleteBookInput, FetchBooksInput, DeleteBookPayload, PaginatedBooks,
} from './types/resolver';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Resolver(() => Book)
@UseGuards(GraphQLJwtAuthGuard, GraphQLPermissionsGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {
  }

  @Query(() => Book)
  @UsePermission('nst:core:books:get')
  async book(
    @Args('id') id: string,
     @ActionContext() ctx: IActionContext,
  ): Promise<Book> {
    return await this.booksService.getOneOrFail(id, ctx);
  }

  @Query(() => PaginatedBooks)
  @UsePermission('nst:core:books:list')
  async books(
    @Args() input: FetchBooksInput,
  ): Promise<PaginatedBooks> {
    const [books, meta] = await this.booksService.getMany(
      {
        filter: input.filter ?? {
        },
        orderBy: input.orderBy,
        ...createOffsetPaginationOptions(input),
      },
    );

    return await offsetPaginatedOutput(books, meta);
  }

  @Mutation(() => Book)
  @UsePermission('nst:core:books:create')
  async createBook(
    @Args('input') input: CreateBookInput,
     @ActionContext() ctx: IActionContext,
  ): Promise<Book> {
    return await this.booksService.create(input, ctx);
  }

  @Mutation(() => Book)
  @UsePermission('nst:core:books:update')
  async updateBook(
    @Args('input') input: UpdateBookInput,
     @ActionContext() ctx: IActionContext,
  ): Promise<Book> {
    return await this.booksService.update(input, ctx);
  }

  @Mutation(() => DeleteBookPayload)
  @UsePermission('nst:core:books:delete')
  async deleteBook(
    @Args('input') input: DeleteBookInput,
     @ActionContext() ctx: IActionContext,
  ): Promise<DeleteBookPayload> {
    await this.booksService.delete(input.id, ctx);

    return {
      id: input.id,
    };
  }
}
