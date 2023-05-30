import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlogDocument = Blog & Document;

@Schema() // 스키마
export class Blog {
  @Prop() // 스키마의 프로퍼티
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  createDt: Date;

  @Prop()
  updateDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); // 스키마 생성
