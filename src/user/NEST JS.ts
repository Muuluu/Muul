import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/models/user.model';
import { stringify } from 'querystring';
import { where } from 'sequelize/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel :typeof User){
  
  }
  getUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }
  createUser(data) {
  const newUser =new this.userModel ({
    id:data.id,
    firstName: data.firstName
  })
  newUser.save()
  return newUser;
  }
  siginInUser(body){
    let usr = this.userModel.findOne({
    where: {
        firstName: body.firstName},
      
    })
    

    return usr
  } 
  findById(body){
    let user = this.userModel.findOne({
    where: {
        id: body.id}
    })

    return user
  }
}
