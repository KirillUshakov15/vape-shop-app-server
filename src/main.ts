import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 7000

async function start(){
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, //process.env.API_CLIENT_URL,
    credentials: true
  });
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`Server success start on port: ${PORT}`)
  })
}

start();
