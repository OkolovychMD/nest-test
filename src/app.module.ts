import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { TextModule } from './text/text.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
	OpenaiModule, 
	TextModule, 
	ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
