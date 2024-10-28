
# Challenge: Directory Tree

## Overview

This project provides a solution for managing a hierarchical directory structure using TypeScript. The application supports creating, moving, deleting, and listing directories as specified in the coding challenge.

## Repository

Access the project repository here: [Challenge Repository](https://github.com/LK-Lopes/Challenge.git)

## Requirements

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [TypeScript](https://www.typescriptlang.org/) (globally installed via `npm install -g typescript`)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LKLopes8/Challenge.git
   cd Challenge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

To run the application:

```bash
node src/directories.js
```

The program will process a predefined set of directory operations and display the results.

## Commands Supported

- **CREATE <path>**: Creates a directory at the specified path.
- **MOVE <source> <destination>**: Moves a directory (including its children) from the source path to the destination path.
- **DELETE <path>**: Deletes the directory specified by the path.
- **LIST**: Displays the current structure of the directories.

### Example Command Input

The program processes the following sequence of commands:

```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
```

### Expected Output

```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
```

This output aligns with the challenge requirements, demonstrating that directories are correctly created, moved, deleted, and listed.

## Notes

- The project is structured using a modular approach, with a `FileSystem` class managing directory operations and a `Directory` class representing each directory node.
- TypeScript is utilized for enhanced type safety and code clarity.
- Paths specified in `DELETE` commands must reflect the updated directory structure following any `MOVE` operations.

### Summary

The repository includes both TypeScript (`.ts`) source files and their compiled JavaScript (`.js`) equivalents, enabling you to run the application directly with Node.js. Simply execute:

```bash
node src/directories.js
```

If you modify the TypeScript files, recompile them using:

```bash
tsc
```

This setup ensures that the application is easy to run and modify as needed.