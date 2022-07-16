import { Inject } from "@nestjs/common";
import { AMQP_CLIENT } from "./amqp.client";

/**
 * Injects aqp client with connection into variable.
 *
 * @returns amqp client with connection.
 */
export const InjectAmqpClient = () => Inject(AMQP_CLIENT);
