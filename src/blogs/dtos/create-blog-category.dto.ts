import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogCategoryDto {
  @ApiProperty({
    type: String,
    description: 'the name of the category',
    default: 'Visa',
  })
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  name: string
}