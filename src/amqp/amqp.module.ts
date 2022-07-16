import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { AMQP_CLIENT } from "../main";
import {
  AmqpConnectionOptions,
  AmqpModuleAsyncOptions,
  AMQP_OPTIONS,
} from "./amqp.configuration";
import { AmqpProvider } from "./amqp.provider";

/**
 * Minimal AMQP module for nestjs.
 * 
 * @author Karafra
 * @since 1.0.0
 */
@Global()
@Module({})
export class AmqpModule {
  /**
   * Connects to amqp instance synchronously.
   * 
   * @param options configuration options
   * @returns amqp module
   */
  public static forRoot(options: AmqpConnectionOptions): DynamicModule {
    return {
      module: AmqpModule,
      providers: [
        AmqpProvider,
        {
          provide: AMQP_OPTIONS,
          useValue: options,
        },
        {
          provide: AMQP_CLIENT,
          useFactory: async (amqpProvider: AmqpProvider) =>
            await amqpProvider.getClient(),
          inject: [AmqpProvider],
        },
      ],
      exports: [AmqpProvider, AMQP_CLIENT],
    };
  }

  /**
   * Connects to amqp instance asynchronously.
   * 
   * @param options configuration options
   * @returns amqp module
   */
  public static forRootAsync(options: AmqpModuleAsyncOptions): DynamicModule {
    return {
      imports: options.imports,
      module: AmqpModule,
      providers: [
        AmqpProvider,
        this.createConfigProviders(options),
        {
          provide: AMQP_CLIENT,
          useFactory: async (amqpProvider: AmqpProvider) =>
            await amqpProvider.getClient(),
          inject: [AmqpProvider],
        },
      ],
      exports: [AmqpProvider, AMQP_CLIENT],
    };
  }
  private static createConfigProviders(
    options: AmqpModuleAsyncOptions
  ): Provider {
    return {
      provide: AMQP_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }
}
