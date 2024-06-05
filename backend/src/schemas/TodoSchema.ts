import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  @Prop({ isRequired: true })
  text: string;

  @Prop({ isRequired: true, default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
