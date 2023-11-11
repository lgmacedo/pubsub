import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { NewMessageDTO } from './dtos/new-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  publishMessage(@Body() newMessageDTO: NewMessageDTO) {
    const { queue, message } = newMessageDTO;
    this.messagesService.publish(queue, message);
  }

  @Get(':queue')
  getMessages(@Param('queue') queue: string) {
    return this.messagesService.getMessages(queue);
  }
}
