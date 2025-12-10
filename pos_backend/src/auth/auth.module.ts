import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Import User Schema để dùng được trong AuthService
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Cấu hình JWT
    JwtModule.register({
      global: true,
      secret: 'SECRET_KEY_SIEU_BAO_MAT_123', // Trong dự án thật phải để vào file .env
      signOptions: { expiresIn: '60s' },
    }),
  ],
  //thêm sau
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
