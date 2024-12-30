
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here if not already imported
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use the secret from environment variables
        signOptions: { expiresIn: '10days' }, // Set the expiry time for tokens if needed
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    AuthGuard,
    JwtModule
  ],
})

export class AuthModule {}
