import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db/schemas/User.schema';
import { UserService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [IsGuestGuard, UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}
