// src/modules/organizations/organizations.resolver.ts

import { ActionContext, MaybeNull } from '@deeepvision/nest-kit';
import {
  BaseOrganizationsResolver, FetchOrganizationsOptions, OrganizationsOrderBy,
} from '@deeepvision/nest-kit/dist/modules/organizations';
import {
  Args, Query, Resolver,
} from '@nestjs/graphql';

import { IActionContext } from '@/decorators';

import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { FetchCurrentOrganizationInput } from './types/resolver';

@Resolver(() => Organization)
export class OrganizationsResolver extends BaseOrganizationsResolver(Organization) {
  constructor(
    readonly organizationsService: OrganizationsService,
  ) {
    super();
  }

  @Query(() => Organization, {
    nullable: true,
  })
  async currentOrganization(
    @ActionContext() ctx: IActionContext,
    @Args('input') input: FetchCurrentOrganizationInput,
  ): Promise<MaybeNull<Organization>> {
    const opts: FetchOrganizationsOptions = {
      filter: {
      },
      orderBy: OrganizationsOrderBy.createdAt_DESC,
      limit: 1,
      needCountTotal: false,
    };

    if (input.id) {
      opts.filter.ids = [input.id];
    }

    if (!ctx.isGranted('nst:core:organizations:list')) {
      opts.filter.isMemberOf = true;
    }

    const [[org]] = await this.organizationsService.getMany(opts, ctx);

    if (org) {
      return org;
    }

    // if target org is not available for user, try to return first available
    if (input.id) {
      delete opts.filter.ids;

      const [[firstAvailableOrg]] = await this.organizationsService.getMany(opts, ctx);

      return firstAvailableOrg ?? null;
    }

    return null;
  }
}
