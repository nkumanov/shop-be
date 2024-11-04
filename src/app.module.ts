import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nikolaykumanov:2684357A.kolio@cluster0.j5a7u.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
