import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/CreateTodoDto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  createOne(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createOne(createTodoDto);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateOne(id, updateTodoDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.todosService.deleteOne(id);
  }
}
