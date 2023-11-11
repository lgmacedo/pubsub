import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  private storagePath = path.resolve(
    __dirname,
    '..',
    '..',
    'storage',
    'messages',
  );

  constructor() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  persist(queueName: string, message: string): void {
    const filePath = path.join(this.storagePath, `${queueName}.txt`);
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(filePath, logMessage, 'utf-8');
  }

  get(queue: string): string[] {
    const filePath = path.join(this.storagePath, `${queue}.txt`);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content.split('\n').filter(Boolean);
    }

    return [];
  }
}
