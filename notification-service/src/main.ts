import { NestFactory } from "@nestjs/core";

import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app/app.module";

async function bootstrap(){
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,

    options: {
      client: {
        clientId: 'notification-consumer',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId : 'notification-group'
      },
      subscribe: {
        fromBeginning: true
      }
    }
  })
  await app.listen();
  console.log('Notification Service is Running')
}
bootstrap();