import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private readonly apiUrl = 'https://api.openai.com/v1/completions';

  constructor(private readonly configService: ConfigService) {}

  async generateText(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new HttpException('OpenAI API key not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model: 'gpt-4o',
      prompt,
      max_tokens: 100,
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          `OpenAI API error: ${error.response.data.error.message}`,
          HttpStatus.BAD_GATEWAY,
        );
      }
      throw new HttpException(`Request failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
