import { AMQPClient, AMQPError } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";
import { Inject, Injectable, Logger, Optional } from "@nestjs/common";
import { AmqpClient } from "./amqp.client";
import { AmqpConnectionOptions, AMQP_OPTIONS } from "./amqp.configuration";

/**
 * Provider for amqp instances.
 *
 * @author Karafra
 * @since 1.0.0
 */
@Injectable()
export class AmqpProvider {
  private readonly logger = new Logger(AmqpProvider.name);

  private client: AmqpClient;
  private connection: AMQPBaseClient;

  constructor(
    @Optional()
    @Inject(AMQP_OPTIONS)
    private readonly options: AmqpConnectionOptions
  ) {}

  /**
   * Connects to amqp instance
   *
   * @returns amqp client with connection.
   */
  public async getClient(): Promise<AMQPBaseClient> {
    if (this.connection) {
      return this.connection;
    }
    if (!this.options.url) {
      throw new Error("Could not instantiate client without url");
    }
    this.logger.log(`Creating AMQP client`);
    this.client = await new AMQPClient(this.options.url);
    this.logger.log(`Connecting to ${this.options.url} ...`);
    this.connection = await this.client.connect();
    this.logger.log("Connected to amqp");
    return this.connection;
  }
}
