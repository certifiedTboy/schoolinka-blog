/**
 * @interface IDatabaseConnector
 */
interface IDatabaseConnector {
    connect(url?: string): void;
}

export default IDatabaseConnector;