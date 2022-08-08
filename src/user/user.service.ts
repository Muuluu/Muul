import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'dto/create-user.dto';
import { User } from 'src/models/user.model';
import { Verification } from 'src/models/verification.model';
import { sign, verify } from 'jsonwebtoken';
import { LoginUserDto } from 'dto/login-user.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Verification) private verifyModel: typeof Verification,
    
  ) {

  }

  async signIn(data: LoginUserDto) {
    const user = await this.userModel.findOne({
      where: {
        userName: data.username,
       // password: data.password,
      },
    });
    
    if (user) {
      const { access_token, refresh_token } = this.TokenGenerate(user.id);
      return {
        access_token,
        refresh_token,
      };
    }
    return 'User Not Found';
  }

  getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }
  TokenGenerate(id: string, expiresIn: string = '24h') {
    console.log('ghdf');
    const access_token = sign({ userId: id }, 'muuluu', { expiresIn: '15m' });
    const refresh_token = sign({ userId: id }, 'muuluu' + '_refresh', {
      expiresIn: expiresIn || '24h',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async SignUp(createuserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        username: createuserDto.username,
        email: createuserDto.email,
        phone: createuserDto.phone,
      },
    });
    if (user) {
      return 'Username is already in use';
    } else {
      let User = new this.userModel(createuserDto);
      User.save();
      return 'signed up successfully';
    }
  }

  signUp(data: CreateUserDto) {
    const newUser = new this.userModel({
      username: data.username,
      pass: data.pass,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
    });

    console.log(newUser);
    newUser.save();
    let code = Math.floor(100000 + Math.random() * 900000);
    const newVerify = new this.verifyModel({
      userid: newUser.id,
      verifyCode: code,
      sendDate: new Date(),
      usage: 'SignUp',
      isVerify: false,
    });
    newVerify.save();
    return newUser;
  }

  async approvreVerify(data) {
    let ver = await this.verifyModel.findOne({});

    if (ver.verifyCode == data.verifyCode) {
      this.userModel
        .update({ status: 'active' }, { where: { id: data.userId } })
        .then(() => {});
      ver.isVerify = true;
      ver.save();
    } else {
      return 'Wrong OTP code';
    }
  }
}