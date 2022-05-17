# React online marathon

## The tasks of the topic "TypeScript"

There is a simple project.

Configure this project, so that:

1. Install `TypeScript` and register it in the `package.json`

2. Write an configuration file to provide:
    - include to compilation files `file1.ts` and `file2.ts` from root of project
    - include all typescript files from any directory nested to any level of `src`, excluding files `*.test.ts`
    - concatenate and emit output to the file `dist/main.js`
    - all of the above configurations work by invoking `tsc` with no input files
