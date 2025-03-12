import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Define allowed methods
    credentials: false, // Allow credentials (if needed)
  });

  // Increase request body size limit (default is 1MB)
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
