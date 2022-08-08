import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'guard/user.guard';
import { UserService } from './user.service';


// url/user/users
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  @UseGuards(UserAuthGuard)
  getUser() {
    return this.userService.getUsers()
  }
  @Post('login')
  login(@Body() data) {
    return this.userService.signIn(data)
  }
  
  
}
