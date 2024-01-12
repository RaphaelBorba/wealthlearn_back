import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccessUserService } from './access-user.service';
import { CreateAccessUserDto } from './dto/create-access-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

// ACCESS CONTROL FOR THE USERS, ADMINS, COMMUN USERS, ...

@Controller('access-user')
@UseGuards(AuthGuard(true))
export class AccessUserController {
  constructor(private readonly accessUserService: AccessUserService) {}

  @Post()
  create(@Body() createAccessUserDto: CreateAccessUserDto) {
    return this.accessUserService.create(createAccessUserDto);
  }

  @Get()
  findAll() {
    return this.accessUserService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessUserService.remove(+id);
  }
}
