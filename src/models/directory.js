"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = void 0;
class Directory {
    constructor() {
        this.children = new Map();
    }
    addChild(name, existingDirectory) {
        const newChild = existingDirectory !== null && existingDirectory !== void 0 ? existingDirectory : new Directory();
        this.children.set(name, newChild);
        return newChild;
    }
    getChild(name) {
        return this.children.get(name);
    }
    removeChild(name) {
        return this.children.delete(name);
    }
    hasChild(name) {
        return this.children.has(name);
    }
    getChildrenNames() {
        return Array.from(this.children.keys()).sort();
    }
}
exports.Directory = Directory;
