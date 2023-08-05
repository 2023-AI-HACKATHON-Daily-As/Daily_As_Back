import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  @IsNotEmpty()
  @Min(2)
  @Max(12)
  title: string;

  @IsString()
  @IsOptional()
  @Min(3)
  @Max(200)
  description: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
