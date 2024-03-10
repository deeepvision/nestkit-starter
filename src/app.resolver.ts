import {
  ActionContext,
  GraphQLJwtAuthGuard, GraphQLPermissionsGuard, InjectWinstonLoggerFactory, UsePermission, WinstonLoggerFactory,
} from '@deeepvision/nest-kit';
import { PostgresPubSub } from '@deeepvision/nest-kit/dist/modules/postgres-pubsub';
import { Inject, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  Mutation, Resolver, Subscription,
} from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { GcpConfig } from '@/config';
import { IActionContext } from '@/decorators';

@Resolver()
@UseGuards(GraphQLJwtAuthGuard, GraphQLPermissionsGuard)
export class AppResolver {
  constructor(
    @InjectWinstonLoggerFactory() private readonly loggerFactory: WinstonLoggerFactory,
    @Inject(GcpConfig.KEY) private readonly gcpConfig: ConfigType<typeof GcpConfig>,
    @InjectDataSource() private readonly dataSource: DataSource,
    // @InjectDataSource() private readonly dataSource: DataSource,
    private readonly pubsub: PostgresPubSub,
  ) {}

  logger = this.loggerFactory.create({
    scope: 'AppResolver',
  });

  @UseGuards(GraphQLJwtAuthGuard)
  @Mutation(() => Boolean)
  async sayHello(
    @ActionContext() ctx: IActionContext,
  ) {
    await this.pubsub.publish('HELLO_SAID', {
      helloSaid: `Hello, ${ctx.user.fullName}!`,
    });

    return true;
  }

  @UsePermission('nst:core:app:hello-said')
  @Subscription(() => String)
  helloSaid() {
    return this.pubsub.asyncIterator('HELLO_SAID');
  }

  @Subscription(() => String)
  helloSaidPublic() {
    return this.pubsub.asyncIterator('HELLO_SAID');
  }
}
