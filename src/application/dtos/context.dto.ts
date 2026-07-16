import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class VcDto {

  @IsString()
  @IsOptional()
  @ApiProperty()
  vr?: string; // referrer

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  vp!: string; // page_url
}