import { User } from '@app/db/schemas/user.schema';
import { Controller, Get, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUsers() {
    return this.userModel.find();
  }
}
