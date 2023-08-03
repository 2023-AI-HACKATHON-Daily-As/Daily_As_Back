import { ApiProperty } from '@nestjs/swagger';

export class getAuthResDto {
  @ApiProperty({
    example: '200',
    description: 'statusCode',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    example: 'test@dailyAs.com',
    description: '유저 이메일',
    required: true,
  })
  userId: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmszNDBAa2FrYW8uY29t......',
    description: '엑세스 토큰',
    required: true,
  })
  accessToken: string;
}
