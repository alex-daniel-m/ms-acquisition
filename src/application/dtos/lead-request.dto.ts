import { IsNotEmpty, ValidateNested, IsObject, IsOptional, IsUUID, IsHash } from 'class-validator';
import { Type } from 'class-transformer';
import { VcDto } from './context.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class LRequestDto {

  @IsHash('sha256')
  @IsNotEmpty()
  @ApiProperty()
  vsi!: string; // site_id

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  vssi!: string; // session_id

  @ValidateNested()
  @Type(() => VcDto)
  @ApiProperty({ type: () => VcDto })
  vc!: VcDto; // context object

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  vn?: Record<string, any>; // niche (form data)
}