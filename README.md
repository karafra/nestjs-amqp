# Webeleon npm package starter

## Install

```bash
npm i @karafra/nestjs-amqp
```

## Configuration in the root module
### with forRoot

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmqpModule } from '@karafra/nestjs-amqp';
import { amqpConfig } from './configurations/redis.config';

@Module({
  imports: [
    AmqpModule.forRoot({
      url: 'amqp://localhost:6379',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### with forRootAsync

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmqpModule } from '@karafra/nestjs-amqp';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { amqpConfig } from './configurations/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig],
    }),
    AmqpModule.forRootAsync({
      useFactory: async (configService) => configService.get('amqp'), 
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Usage

This package is globally providing `AMQP_CLIENT`

```ts
import { Injectable } from '@nestjs/common';
import { InjectAmqpClient, AmqpClient } from '@karafra/nestjs-amqp';

@Injectable()
export class SomeService {
  constructor(
    @InjectRedisClient() redisClient: AmqpClient
  ) {}
}
```
