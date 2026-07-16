import { ApiProperty } from "@nestjs/swagger";

export class LResponseDto {

  @ApiProperty()
  x_correlation_id!: string; // correlation id

  @ApiProperty()
  vtp!: string; // lead type

  @ApiProperty()
  vi!: string; // lead id

  @ApiProperty()
  vav!: string; // api version
}