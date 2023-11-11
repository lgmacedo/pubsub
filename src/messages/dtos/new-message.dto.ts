import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageDTO {
  @IsNotEmpty()
  @IsString()
  queue: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
