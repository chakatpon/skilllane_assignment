import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
