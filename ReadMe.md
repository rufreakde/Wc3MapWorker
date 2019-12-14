# Whats Wc3MapWorker?
**Wc3MapWorker** is a npm package written in TypeScript to enable you to **export and import** your wc3 map files data easily **via ts/js**. Used only for the MPQ extraction and creation! If you are looking to extract the content of the extracted files into jason format use [WC3MapTranslator](https://github.com/ChiefOfGxBxL/WC3MapTranslator) instead.

**Wc3MapWorker** has no wiki all information is in the ReadMe.md files through the project!

# 1. Node Requiriments
> Node version v8.9.1+  
> tsc version 3.7.2+  
>   
>An executable of used [MPQEditor](http://www.zezula.net/en/mpq/download.html) is already in this repository you can override it with a newer version if you want. (commands should not break)

# 2. Usage
```ts
import { commands, useMPQConsole as useConsole } from './src/commands';

const Commands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
Commands.extractLuaFromMap();
Commands.packLuaBackIntoMap();
//... and more commands
// PS: if you need other specific command calls just open an GitHub Issue
// Add Input Output (how it should look like) And I will add this to command to the lib. Or create it yourself make a PR I review it then ;)
// The code is not complicated just some CLI calls! :)
```
```console
NOTE: This package does modify your file system! Since it works with your local files. ;)
```