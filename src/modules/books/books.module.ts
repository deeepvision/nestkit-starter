import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  providers: [
    BooksService,
  ],
  exports: [
    BooksService,
  ],
})
export class BooksModule {
}
