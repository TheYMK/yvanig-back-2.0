import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum SupportedLanguages {
  ENGLISH = 'en',
  FRENCH = 'fr',
}

export class UpdateSettingsDto {
  @ApiProperty({
    type: String,
    description: 'the default supported language',
    enum: SupportedLanguages,
    default: SupportedLanguages.FRENCH,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(SupportedLanguages)
  @IsOptional()
  default_language: SupportedLanguages;

  @ApiProperty({
    type: String,
    description: 'the default currency',
    default: 'KMF',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  default_currency: string;

  @ApiProperty({
    type: String,
    description: 'the default theme',
    enum: Themes,
    default: Themes.LIGHT,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Themes)
  @IsOptional()
  default_theme: Themes;
}
