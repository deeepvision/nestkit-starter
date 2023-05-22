import { IActionContext } from '@/decorators';
import {
  RestActionContext, JwtAuthGuard, WinstonLoggerFactory, InjectWinstonLoggerFactory, WinstonLogger,
} from '@deeepvision/nest-kit';
import {
  Controller, Post, BadRequestException, Body, UseGuards, Param, Get, Res,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthNService } from './auth-n.service';
import { Response } from 'express';
import { UserInvitationStatus } from '@deeepvision/nest-kit/dist/modules/users';
import { JwtService } from './jwt/jwt.service';
import { UserTokens } from '@deeepvision/nest-kit/dist/modules/auth-n';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthNController {
  logger: WinstonLogger;

  constructor(
    private readonly authNService: AuthNService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectWinstonLoggerFactory() private readonly loggerFactory: WinstonLoggerFactory,
  ) {
    this.logger = this.loggerFactory.create({
      scope: AuthNController.name,
    });
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @RestActionContext() ctx: IActionContext,
  ): Promise<UserTokens> {
    if (!refreshToken) {
      throw new BadRequestException('"refreshToken" is required!');
    }

    return await this.jwtService.refreshTokens(refreshToken, ctx);
  }

  @Get('/:user_id/pixel')
  async changeInvitationStatusToOpened(
    @Param('user_id') userId: string,
    @Res() res: Response,
    @RestActionContext() ctx: IActionContext,
  ): Promise<void> {
    const logger = this.logger.forMethod('setStatusOpened');

    const user = await this.usersService.getOne(userId);

    if (!user) {
      logger.warn(`User with id ${userId} not found`);
    } else {
      if (user.invitationStatus === UserInvitationStatus.EMAIL_SENT) {
        await this.usersService.update({
          id: userId,
          invitationStatus: UserInvitationStatus.EMAIL_OPENED,
        }, ctx);
      }

      logger.info(`User ${userId} open invitation email`);
    }

    const pixel = this.authNService.createPixel();

    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': pixel.length,
    });

    res.end(pixel);
  }
}
