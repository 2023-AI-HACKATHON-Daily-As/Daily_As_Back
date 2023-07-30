import { IsString, IsBoolean, IsArray, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
    // @IsString()
    // @IsNotEmpty()
    // user_id: string;

    @IsString()
    @IsNotEmpty()
    task: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    sub_task: string[];

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsDateString()
    @IsNotEmpty()
    deadline: Date;
    
    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

    @IsBoolean()
    @IsNotEmpty()
    disabled: boolean;

    @IsDateString()
    @IsNotEmpty()
    createdAt: Date;
}