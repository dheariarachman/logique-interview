import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from './api-key.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [HeaderAPIKeyStrategy],
})
export class AuthModule {}
