
import { ListMethodOptions } from '@deeepvision/nest-kit';
import { BooksFilter, BooksOrderBy } from '../resolver/fetch-books';

export class GetManyBooksOptions extends ListMethodOptions<BooksFilter, BooksOrderBy> {}
