import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, Min, Max } from 'class-validator';

export class CreateChallengeDto {
    @IsNumber()
    @Min(1)
    @Max(10)
    memberNum: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    thumbnail: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;
}