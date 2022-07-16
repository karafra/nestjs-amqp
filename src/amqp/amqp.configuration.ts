export const AMQP_OPTIONS = "amqp-options";
/**
 * Sync configuration options.
 * 
 * @author Karafra
 * @since 1.0.0
 */
export interface AmqpConnectionOptions{
    url: string;
}

/**
 * Async configuration options.
 * 
 * @author Karafra
 * @since 1.0.0
 */
export interface AmqpModuleAsyncOptions {
    imports?: any[],
    inject?: any[],
    useFactory: (
        ...args: any[]
    ) => Promise<AmqpConnectionOptions> | AmqpConnectionOptions
}