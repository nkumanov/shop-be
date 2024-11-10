import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UserProductsController } from './controllers/user.controller';

@Module({
  imports: [DbModule],
  controllers: [UserProductsController],
})
export class UserModule {}
