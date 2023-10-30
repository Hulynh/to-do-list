import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty()
  content: string;
}
