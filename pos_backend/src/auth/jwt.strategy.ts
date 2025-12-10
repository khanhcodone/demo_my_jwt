import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Lấy token từ Header "Authorization: Bearer ..."
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Hết hạn là từ chối ngay (để Frontend tự refresh)
      secretOrKey: 'SECRET_KEY_SIEU_BAO_MAT_123',
    });
  }

  // Khi Token hợp lệ, hàm này sẽ chạy và gán kết quả vào request.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
