import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const headerKeyApiKey =
      configService.get<string>('HEADER_KEY_API_KEY') || '';

    super(
      { header: headerKeyApiKey, prefix: '' },
      true,
      async (apikey, done) => {
        if (this.authService.validateApiKey(apikey)) {
          return done(null, true);
        }
        return done(
          new UnauthorizedException({ error: 'Invalid API Key' }),
          null,
        );
      },
    );
  }
}
