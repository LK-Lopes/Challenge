export class Logger {

    public static info(message: string): void {
        console.log(message);
    }

    public static error(message: string, error?: Error): void {
        console.error(`ERROR: ${message}`);

        if (error) {
            console.error(error.stack);
        }
    }
}
