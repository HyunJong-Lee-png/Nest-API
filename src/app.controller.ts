import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {

  @Get('/')
  hihome(){
    return 'im homeground'
  }
}
