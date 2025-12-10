// src/users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email này đã được sử dụng!');
    }

    // 2. Mã hóa mật khẩu (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới và lưu vào DB
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    // 4. Trả về kết quả (Không trả về password)
    return {
      id: newUser._id,
      email: newUser.email,
      createdAt: newUser.createdAt || new Date(), // Fallback nếu chưa có
      message: 'Đăng ký thành công!',
    };
  }

  // Các hàm khác giữ nguyên hoặc để trống tạm thời
  findAll() {
    return `This action returns all users`;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
