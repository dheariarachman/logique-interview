import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './api-key.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
