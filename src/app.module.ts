import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Verification } from './models/verification.model';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '13.215.139.119',
      port: 3306,
      username: 'rtd',
      password: 'Tiny722$',
      database: 'muuluu',
      models: [User,Verification],
    }),
    SequelizeModule.forFeature([User,Verification]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
