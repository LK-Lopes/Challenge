export class Directory {
    private children: Map<string, Directory>;

    constructor() {
        this.children = new Map<string, Directory>();
    }

    public addChild(name: string, existingDirectory?: Directory): Directory {
        const newChild: Directory = existingDirectory ?? new Directory();
        this.children.set(name, newChild);

        return newChild;
    }

    public getChild(name: string): Directory | undefined {

        return this.children.get(name);
    }

    public removeChild(name: string): boolean {

        return this.children.delete(name);
    }

    public hasChild(name: string): boolean {

        return this.children.has(name);
    }

    public getChildrenNames(): string[] {

        return Array.from(this.children.keys()).sort();
    }
}
