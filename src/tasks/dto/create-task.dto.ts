import { IsDate, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { CreateMemoDto } from './create-memo.dto';

export class CreateTaskDto {
  @IsDate()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  subMemo: CreateMemoDto[];

  @IsBoolean()
  isCompleted: boolean;
}
