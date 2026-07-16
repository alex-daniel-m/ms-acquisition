import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FResponseDto {

  @ApiProperty()
  x_correlation_id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  reason!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional()
  reference_error?: string;
}