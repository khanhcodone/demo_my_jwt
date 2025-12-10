import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema'; // Đảm bảo đường dẫn đúng

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // 1. Validate User (Đăng nhập)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Trả về user object (bỏ password đi cho an toàn)
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // 2. Tạo cặp Token (Login thành công thì gọi hàm này)
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }), // Hết hạn sau 1 phút (để test refresh cho nhanh)
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Hết hạn sau 7 ngày
      user: { email: user.email, _id: user._id },
    };
  }

  // 3. Refresh Token (Lấy token mới từ token cũ)
  async refreshToken(refreshToken: string) {
    try {
      // Verify xem refresh token có hợp lệ không
      const payload = this.jwtService.verify(refreshToken);

      // Nếu hợp lệ, tạo lại access token mới
      const newPayload = { email: payload.email, sub: payload.sub };
      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: '60s' }),
      };
    } catch (e) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }
  }
}
