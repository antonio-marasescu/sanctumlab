export type LoggerProps = {
    serviceName: string;
};

export class Logger {
    private readonly serviceName: string;

    constructor({ serviceName }: LoggerProps) {
        this.serviceName = serviceName;
    }

    private formatLog(level: string, message: string, ctx: object): string {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            serviceName: this.serviceName,
            level,
            message,
            context: ctx
        });
    }

    public log(message: string, ctx: object = {}): void {
        console.log(this.formatLog('LOG', message, ctx));
    }

    public info(message: string, ctx: object = {}): void {
        console.info(this.formatLog('INFO', message, ctx));
    }

    public warn(message: string, ctx: object = {}): void {
        console.warn(this.formatLog('WARN', message, ctx));
    }

    public debug(message: string, ctx: object = {}): void {
        console.debug(this.formatLog('DEBUG', message, ctx));
    }

    public error(message: string, ctx: object = {}): void {
        console.error(this.formatLog('ERROR', message, ctx));
    }
}

export const AppLogger = new Logger({ serviceName: 'sanctumLab' });
