import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // Cách 1: Cho phép tất cả (Dễ nhất, dùng khi test)
    origin: '*',

    // Cách 2: Chỉ cho phép trang Vercel của bạn (Bảo mật hơn, dùng khi đã có link vercel)
    // origin: ['http://localhost:5173', 'https://bai-tap-cua-ban.vercel.app'],

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Kích hoạt tính năng kiểm tra dữ liệu đầu vào (Validation)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
