import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @Get()
  async getAuthSesstion(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
