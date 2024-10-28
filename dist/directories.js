"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileSystem_1 = require("./services/fileSystem");
const logger_1 = require("./services/logger");
class Directories {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
    }
    run() {
        try {
            const commands = this.loadCommands();
            const results = this.fileSystem.executeCommands(commands);
            this.logResults(results);
        }
        catch (error) {
            logger_1.Logger.error("An error occurred while running the application.", error);
        }
    }
    logResults(results) {
        try {
            results.forEach(result => logger_1.Logger.info(result));
        }
        catch (error) {
            logger_1.Logger.error("An error occurred while logging results.", error);
        }
    }
    loadCommands() {
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
    static start() {
        try {
            const fileSystem = new fileSystem_1.FileSystem();
            const directories = new Directories(fileSystem);
            directories.run();
        }
        catch (error) {
            logger_1.Logger.error("An error occurred during application startup.", error);
        }
    }
}
Directories.start();
