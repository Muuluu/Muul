import { Controller, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { AppModule } from "src/app.module";
import { User } from "src/models/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [ 
        AppModule,
     SequelizeModule.forRoot({
        dialect: 'mysql',
        host: '13.215.139.119',
        port: 3306,
        username: 'rtd',
        password: 'Tiny722$',
        database: 'muuluu',
        models: [User],
      }),
      SequelizeModule.forFeature([User]),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [SequelizeModule, UserService]
})
export class UserModule {}