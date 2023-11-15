import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  publish(queue: string, message: string): void {
    this.messagesRepository.persist(queue, message);
  }

  getMessages(queue: string): string[] {
    const messages = this.messagesRepository.get(queue);
    if (!messages.length) throw new NotFoundException('Queue not found');
    return messages;
  }
}
