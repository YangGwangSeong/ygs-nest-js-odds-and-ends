import {
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {}

  @Get()
  async getAuthSesstion(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }
}
