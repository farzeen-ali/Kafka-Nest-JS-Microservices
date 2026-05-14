import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";

import { ClientKafka } from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit{
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {};

  async onModuleInit() {
    await this.kafkaClient.connect();
  }
  @Get('create-user')
  async createUser() {
    const user = {
      id: 1,
      name: 'Farzeen Ali',
      email: 'farzeen@gmail.com'
    };
    this.kafkaClient.emit('user_created', user);
    return {
      message: 'User Created Event Published!',
      user
    }
  }
}