// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. Cấu hình đọc file .env
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Kết nối MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI as string),

    // 3. Module User (Quan trọng nhất)
    UsersModule,
  ],
  controllers: [], // Để trống
  providers: [], // Để trống
})
export class AppModule {}
