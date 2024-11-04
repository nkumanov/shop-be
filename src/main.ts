import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IsUserGuard } from './guards/isUser.guard';
import { IsGuestGuard } from './guards/isGuest.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
