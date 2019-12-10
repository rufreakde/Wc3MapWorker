import { commands, useMPQConsole as useConsole } from './src/commands';

const Commands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);

Commands.unZipMap();
Commands.zipMap();