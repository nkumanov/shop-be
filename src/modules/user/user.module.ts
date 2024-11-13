import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UserProductsController } from './controllers/user.controller';
import { ManageUserService } from './services/user.service';

@Module({
  imports: [DbModule],
  controllers: [UserProductsController],
  providers: [ManageUserService],
  exports: [ManageUserService],
})
export class UserModule {}
