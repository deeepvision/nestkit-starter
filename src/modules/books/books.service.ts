import {
  Injectable, InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorKeys } from '@/enums/error-keys';
import { IdPrefix } from '@/enums/id-prefix';
import { ServiceMethodContext } from '@/types/services';
import {
  createListMeta, extractSortParams, InjectWinstonLoggerFactory, ListMeta, MaybeNull, WinstonLoggerFactory,
} from '@deeepvision/nest-kit';
import { IdService } from '@deeepvision/nest-kit/dist/modules/id';
import {
  CreateBookOptions, GetManyBooksOptions, UpdateBookOptions,
} from './types/service';
import { BooksOrderBy, BooksOrderFields } from './types/resolver';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  private logger = this.loggerFactory.create({
    scope: 'BooksService',
  });

  constructor(
    @InjectWinstonLoggerFactory() private readonly loggerFactory: WinstonLoggerFactory,
     @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
     private readonly idService: IdService,
  ) {
  }

  async getOne(id: string): Promise<MaybeNull<Book>> {
    return await this.bookRepository.findOneBy({
      id,
    });
  }

  async getOneOrFail(id: string, ctx: ServiceMethodContext): Promise<Book> {
    const logger = this.logger.forMethod('getOneOrFail', ctx, {
      id,
    });

    const book = await this.getOne(id);

    if (!book) {
      throw new NotFoundException({
        message: `Book with id ${id} not found`,
        key: ErrorKeys.NST_BOOKS_NOT_FOUND,
        context: logger.getContext(),
      });
    }

    return book;
  }

  async getMany(
    {
      filter,
      orderBy = BooksOrderBy.createdAt_DESC,
      limit,
      offset,
      needCountTotal,
    }
    : GetManyBooksOptions): Promise<[Book[], ListMeta]> {
    const sort = extractSortParams<BooksOrderFields>(orderBy);

    const query = this.bookRepository
      .createQueryBuilder('b');

    if (filter.search) {
      query.andWhere(`b.title LIKE :search`, {
        search: `%${filter.search}%`,
      });
    }

    if (Array.isArray(filter.ids)) {
      query.andWhere('b.id IN(:...ids)', {
        ids: filter.ids,
      });
    }

    query.addOrderBy(`b.${sort.columnName}`, sort.direction);

    query.limit(limit);
    query.offset(offset);

    return await Promise.all([
      query.getMany(),
      createListMeta<Book>({
        query,
        needCountTotal,
        limit,
        offset,
      }),
    ]);
  }

  async create(opts: CreateBookOptions, ctx: ServiceMethodContext): Promise<Book> {
    const logger = this.logger.forMethod('create', ctx);

    const book = this.bookRepository.create({
      id: this.idService.generateEntityId(IdPrefix.BOOK),
      ...opts,
    });

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Failed to create book',
        key: ErrorKeys.NST_BOOKS_FAILED_TO_CREATE,
        context: logger.getContext(),
        error,
      });
    }

    return book;
  }

  async update(
    {
      id,
      ...opts
    }
    : UpdateBookOptions, ctx: ServiceMethodContext): Promise<Book> {
    const logger = this.logger.forMethod('update', ctx, {
      id,
    });

    const book = await this.getOneOrFail(id, ctx);

    this.bookRepository.merge(book, opts);

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Failed to update book with id ${id}`,
        key: ErrorKeys.NST_BOOKS_FAILED_TO_UPDATE,
        context: logger.getContext(),
        error,
      });
    }

    return book;
  }

  async delete(id: string, ctx: ServiceMethodContext): Promise<void> {
    const logger = this.logger.forMethod('delete', ctx, {
      id,
    });

    const book = await this.getOne(id);

    if (!book) {
      return;
    }

    try {
      await this.bookRepository.remove(book);
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Failed to delete book with id ${id}`,
        key: ErrorKeys.NST_BOOKS_FAILED_TO_DELETE,
        context: logger.getContext(),
        error,
      });
    }
  }
}
