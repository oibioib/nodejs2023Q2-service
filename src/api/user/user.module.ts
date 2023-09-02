import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingModule } from 'src/hashing/hashing.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule, TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
