import { ApiProperty } from "@nestjs/swagger";

export class LResponseDto {

  @ApiProperty()
  x_correlation_id!: string;

  @ApiProperty()
  vtp!: string;

  @ApiProperty()
  vi!: string;

  @ApiProperty()
  vav!: string;
}