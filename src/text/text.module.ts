import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [TextController]
})
export class TextModule {}
