import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist는 데코 안붙은거 무시
  // transform은 알아서 내가 지정한 type으로 바꿔줌. 
  // movieId는 파라미터로 string으로 오는데 내가 number로 바꾸니 알아서 형변환됨
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
