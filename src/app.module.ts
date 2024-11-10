import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
    }),
    AuthModule,
    SharedModule,
    ProductsModule,
    UserModule,
    DbModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
