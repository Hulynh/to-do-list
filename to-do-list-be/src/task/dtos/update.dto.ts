import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
}
