"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const directory_1 = require("../models/directory");
class FileSystem {
    constructor() {
        this.rootDirectory = new directory_1.Directory();
        this.commandHandlers = new Map([
            ["CREATE", (args) => this.create(args[0])],
            ["LIST", () => this.list()],
            ["MOVE", (args) => this.move(args[0], args[1])],
            ["DELETE", (args) => this.delete(args[0])]
        ]);
    }
    executeCommands(commands) {
        return commands.map((command) => {
            const [commandName, ...commandArgs] = command.split(' ');
            const executeCommand = this.commandHandlers.get(commandName);
            if (executeCommand) {
                return executeCommand(commandArgs);
            }
            else {
                return `Unknown command: ${command}`;
            }
        });
    }
    create(path) {
        const pathSegments = path.split('/');
        let currentDirectory = this.rootDirectory;
        for (const segment of pathSegments) {
            currentDirectory = currentDirectory.hasChild(segment) ? currentDirectory.getChild(segment)
                : currentDirectory.addChild(segment);
        }
        return `CREATE ${path}`;
    }
    list() {
        const output = ["LIST"];
        this.listHelper(this.rootDirectory, 0, output);
        return output.join('\n');
    }
    move(sourcePath, destinationPath) {
        const sourceSegments = sourcePath.split('/');
        const destinationSegments = destinationPath.split('/');
        const sourceDirectory = this.navigateTo(sourceSegments.slice(0, -1));
        if (!sourceDirectory || !sourceDirectory.hasChild(sourceSegments[sourceSegments.length - 1])) {
            return `Cannot move ${sourcePath} - source path does not exist`;
        }
        const childDirectoryName = sourceSegments.pop();
        const directoryToMove = sourceDirectory.getChild(childDirectoryName);
        const destinationDirectory = this.navigateTo(destinationSegments);
        if (destinationDirectory) {
            destinationDirectory.addChild(childDirectoryName, directoryToMove);
            sourceDirectory.removeChild(childDirectoryName);
            return `MOVE ${sourcePath} ${destinationPath}`;
        }
        return `Cannot move ${sourcePath} - destination path ${destinationPath} does not exist`;
    }
    delete(path) {
        const pathSegments = path.split('/');
        const targetName = pathSegments[pathSegments.length - 1];
        const parentDirectory = this.navigateTo(pathSegments.slice(0, -1));
        if (parentDirectory && parentDirectory.hasChild(targetName)) {
            parentDirectory.removeChild(targetName);
            return `DELETE ${path}`;
        }
        const basePathExists = this.navigateTo([pathSegments[0]]);
        const errorMessage = basePathExists ? `Cannot delete ${path} - directory does not exist`
            : `Cannot delete ${path} - ${pathSegments[0]} does not exist`;
        return `DELETE ${path}\n${errorMessage}`;
    }
    navigateTo(pathSegments) {
        var _a;
        let currentDirectory = this.rootDirectory;
        for (const segment of pathSegments) {
            const nextDirectory = (_a = currentDirectory.getChild(segment)) !== null && _a !== void 0 ? _a : null;
            if (!nextDirectory)
                return null;
            currentDirectory = nextDirectory;
        }
        return currentDirectory;
    }
    listHelper(directory, indent, output) {
        directory.getChildrenNames().forEach((child) => {
            output.push(`${'  '.repeat(indent)}${child}`);
            const childNode = directory.getChild(child);
            if (childNode) {
                this.listHelper(childNode, indent + 1, output);
            }
        });
    }
}
exports.FileSystem = FileSystem;
