import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-headerapikey/lib/Strategy';

export class HeaderAPIKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'key', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate = (apiKey: string, done: (err: Error, data) => {}) => {
    console.log(apiKey);
    if (this.configService.get<string>('API_KEY') === apiKey) {
      done(null, true);
    }

    if (this.configService.get<string>('API_KEY') !== apiKey) {
      done(new UnauthorizedException({ error: 'Invalid API Key' }), null);
    }

    done(new ForbiddenException('Api key is missing'), null);
  };
}
