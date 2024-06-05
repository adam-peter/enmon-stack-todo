import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;

  @IsBoolean()
  completed: boolean;
}
