import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 DÒNG QUAN TRỌNG NHẤT: Bật CORS để cho phép Frontend gọi vào
  app.enableCors();

  // Kích hoạt tính năng kiểm tra dữ liệu đầu vào (Validation)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
