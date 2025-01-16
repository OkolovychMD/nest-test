import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Controller('generate-text')
export class TextController {
  private rateLimiter: RateLimiterMemory;

  constructor(private readonly openaiService: OpenaiService) {
    this.rateLimiter = new RateLimiterMemory({
      points: 5,
      duration: 60,
    });
  }

  @Post()
  async generateText(@Body('prompt') prompt: string): Promise<{ text: string }> {
    if (!prompt) {
      throw new HttpException('Prompt is required', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.rateLimiter.consume('user');

      const text = await this.openaiService.generateText(prompt);
      return { text };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.msBeforeNext) {
        throw new HttpException(
          `Rate limit exceeded. Try again in ${Math.ceil(error.msBeforeNext / 1000)} seconds.`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
