import { Directory } from '../models/directory';

export class FileSystem {
    private rootDirectory: Directory;
    private commandHandlers: Map<string, (args: string[]) => string>;

    constructor() {
        this.rootDirectory = new Directory();
        this.commandHandlers = new Map<string, (args: string[]) => string>([
            ["CREATE", (args: string[]) => this.create(args[0])],
            ["LIST", () => this.list()],
            ["MOVE", (args: string[]) => this.move(args[0], args[1])],
            ["DELETE", (args: string[]) => this.delete(args[0])]
        ]);
    }

    public executeCommands(commands: string[]): string[] {
        return commands.map((command: string): string => {
            const [commandName, ...commandArgs]: string[] = command.split(' ');
            const executeCommand: ((args: string[]) => string) | undefined = this.commandHandlers.get(commandName);

            if (executeCommand) {

                return executeCommand(commandArgs);
            } else {

                return `Unknown command: ${command}`;
            }
        });
    }

    public create(path: string): string {
        const pathSegments: string[] = path.split('/');
        let currentDirectory: Directory = this.rootDirectory;

        for (const segment of pathSegments) {
            currentDirectory = currentDirectory.hasChild(segment) ? currentDirectory.getChild(segment)! 
                                                                  : currentDirectory.addChild(segment);
        }

        return `CREATE ${path}`;
    }

    public list(): string {
        const output: string[] = ["LIST"];
        this.listHelper(this.rootDirectory, 0, output);

        return output.join('\n');
    }

    public move(sourcePath: string, destinationPath: string): string {
        const sourceSegments: string[] = sourcePath.split('/');
        const destinationSegments: string[] = destinationPath.split('/');
        const sourceDirectory: Directory | null = this.navigateTo(sourceSegments.slice(0, -1));

        if (!sourceDirectory || !sourceDirectory.hasChild(sourceSegments[sourceSegments.length - 1])) {

            return `Cannot move ${sourcePath} - source path does not exist`;
        }

        const childDirectoryName: string = sourceSegments.pop()!;
        const directoryToMove: Directory = sourceDirectory.getChild(childDirectoryName)!;
        const destinationDirectory: Directory | null = this.navigateTo(destinationSegments);

        if (destinationDirectory) {
            destinationDirectory.addChild(childDirectoryName, directoryToMove);
            sourceDirectory.removeChild(childDirectoryName);

            return `MOVE ${sourcePath} ${destinationPath}`;
        }

        return `Cannot move ${sourcePath} - destination path ${destinationPath} does not exist`;
    }

    public delete(path: string): string {
        const pathSegments: string[] = path.split('/');
        const targetName: string = pathSegments[pathSegments.length - 1];
        const parentDirectory: Directory | null = this.navigateTo(pathSegments.slice(0, -1));

        if (parentDirectory && parentDirectory.hasChild(targetName)) {
            parentDirectory.removeChild(targetName);

            return `DELETE ${path}`;
        }

        const basePathExists: Directory | null = this.navigateTo([pathSegments[0]]);
        const errorMessage: string = basePathExists ? `Cannot delete ${path} - directory does not exist`
                                                    : `Cannot delete ${path} - ${pathSegments[0]} does not exist`;

        return `DELETE ${path}\n${errorMessage}`;
    }

    private navigateTo(pathSegments: string[]): Directory | null {
        let currentDirectory: Directory | null = this.rootDirectory;

        for (const segment of pathSegments) {
            const nextDirectory: Directory | null = currentDirectory.getChild(segment) ?? null;

            if (!nextDirectory) return null;
            currentDirectory = nextDirectory;
        }

        return currentDirectory;
    }

    private listHelper(directory: Directory, indent: number, output: string[]): void {
        directory.getChildrenNames().forEach((child: string): void => {
            output.push(`${'  '.repeat(indent)}${child}`);
            const childNode: Directory | undefined = directory.getChild(child);
            
            if (childNode) {
                this.listHelper(childNode, indent + 1, output);
            }
        });
    }
}
