import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IsGuestGuard } from 'src/guards/isGuest.guard';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthController } from './controllers/auth.controller';

import { DbModule } from 'src/db/db.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthUserService } from './services/auth.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AuthAdminService } from './services/auth-admin.service';

@Module({
  controllers: [AuthController, AdminAuthController],
  providers: [IsGuestGuard, AuthUserService, AuthAdminService],
  imports: [SharedModule, DbModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}
