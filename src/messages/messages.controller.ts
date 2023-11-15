import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { MessagesService } from './messages.service';
import { NewMessageDTO } from './dtos/new-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  publishMessage(@Res() res: Response, @Body() newMessageDTO: NewMessageDTO) {
    const { queue, message } = newMessageDTO;
    this.messagesService.publish(queue, message);
    return res
      .status(HttpStatus.CREATED)
      .send('Message successfully added to queue');
  }

  @Get(':queue')
  getMessages(@Param('queue') queue: string) {
    return this.messagesService.getMessages(queue);
  }
}
