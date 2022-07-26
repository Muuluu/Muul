import { Body, Controller, Get, Post } from '@nestjs/common';
import { type } from 'os';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';

type userBody = { firstName: string, lastName: string, userName: string, isActive: boolean}
// url/user/users
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  getUser() {

    return this.userService.getUsers();
  }


  @Post('create')
  createUser(@Body() body: userBody) {
    this.userService.createUser(body)
    return {message: "Чи бүртгэгдсэн.",body}
  }
  @Post('signin')
  signInUser(@Body() body: userBody) {
    
    return this.userService.siginInUser(body)
  }
  @Post('find')
  findById(@Body() body: userBody) {
    
    return this.userService.findById(body)
  }
  
  
}
