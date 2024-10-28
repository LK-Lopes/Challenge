import { FileSystem } from './services/fileSystem';
import { Logger } from './services/logger';

class Directories {

    private fileSystem: FileSystem;

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
    }

    public run(): void {
        try {
            const commands: string[] = this.loadCommands();
            const results: string[] = this.fileSystem.executeCommands(commands);
            this.logResults(results);
        } catch (error) {
            Logger.error("An error occurred while running the application.", error as Error);
        }
    }

    private logResults(results: string[]): void {
        try {
            results.forEach(result => Logger.info(result));
        } catch (error) {
            Logger.error("An error occurred while logging results.", error as Error);
        }
    }

    private loadCommands(): string[] {
        return [
            "CREATE fruits",
            "CREATE vegetables",
            "CREATE grains",
            "CREATE fruits/apples",
            "CREATE fruits/apples/fuji",
            "LIST",
            "CREATE grains/squash",
            "MOVE grains/squash vegetables",
            "CREATE foods",
            "MOVE grains foods",
            "MOVE fruits foods",
            "MOVE vegetables foods",
            "LIST",
            "DELETE fruits/apples",
            "DELETE foods/fruits/apples",
            "LIST"
        ];
    }

    public static start(): void {
        try {
            const fileSystem: FileSystem = new FileSystem();
            const directories: Directories = new Directories(fileSystem);
            directories.run();
        } catch (error) {
            Logger.error("An error occurred during application startup.", error as Error);
        }
    }
}

Directories.start();