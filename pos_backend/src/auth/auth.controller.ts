import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    // Bước 1: Check user
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    // Bước 2: Tạo token
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
