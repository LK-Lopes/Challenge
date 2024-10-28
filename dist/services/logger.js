"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(message) {
        console.log(message);
    }
    static error(message, error) {
        console.error(`ERROR: ${message}`);
        if (error) {
            console.error(error.stack);
        }
    }
}
exports.Logger = Logger;
