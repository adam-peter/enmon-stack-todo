import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/schemas/TodoSchema';
import { CreateTodoDto } from './dto/CreateTodoDto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  findAll() {
    return this.todoModel.find();
  }

  createOne(createTodoDto: CreateTodoDto) {
    return this.todoModel.create(createTodoDto);
  }

  updateOne(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  deleteOne(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
