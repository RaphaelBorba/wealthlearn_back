import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassTypeService } from './class-type.service';
import { CreateClassTypeDto } from './dto/create-class-type.dto';
import { UpdateClassTypeDto } from './dto/update-class-type.dto';

@Controller('class-type')
export class ClassTypeController {
  constructor(private readonly classTypeService: ClassTypeService) {}

  @Post()
  create(@Body() createClassTypeDto: CreateClassTypeDto) {
    return this.classTypeService.create(createClassTypeDto);
  }

  @Get()
  findAll() {
    return this.classTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassTypeDto: UpdateClassTypeDto,
  ) {
    return this.classTypeService.update(+id, updateClassTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classTypeService.remove(+id);
  }
}
