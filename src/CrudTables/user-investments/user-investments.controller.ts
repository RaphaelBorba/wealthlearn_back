import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserInvestmentsService } from './user-investments.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UpdateUserInvestmentDto } from './dto/update-user-investment.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user-investments')
@UseGuards(AuthGuard())
export class UserInvestmentsController {
  constructor(
    private readonly userInvestmentsService: UserInvestmentsService,
  ) {}

  @Post()
  create(@Body() createUserInvestmentDto: CreateUserInvestmentDto) {
    return this.userInvestmentsService.create(createUserInvestmentDto);
  }

  @Get('return-investments/:userId')
  returnInvestmentsWithAmount(@Param('userId') userId: string) {
    return this.userInvestmentsService.returnInvestmentsWithAmount(+userId);
  }

  @Get()
  findAll() {
    return this.userInvestmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInvestmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserInvestmentDto: UpdateUserInvestmentDto,
  ) {
    return this.userInvestmentsService.update(+id, updateUserInvestmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInvestmentsService.remove(+id);
  }
}
