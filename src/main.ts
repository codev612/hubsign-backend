import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Define allowed methods
    credentials: false, // Allow credentials (if needed)
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
