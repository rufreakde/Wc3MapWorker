"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
/*
const notes = '/users/flavio/notes.txt'
path.dirname(notes) // /users/flavio
path.basename(notes) // notes.txt
path.basename(notes, path.extname(notes)) //notes
path.extname(notes) // .txt
*/
var useMPQConsole;
(function (useMPQConsole) {
    useMPQConsole[useMPQConsole["useConsole"] = 1] = "useConsole";
    useMPQConsole[useMPQConsole["dontUseConsole"] = 0] = "dontUseConsole";
})(useMPQConsole = exports.useMPQConsole || (exports.useMPQConsole = {}));
class commands {
    constructor(relativePathToMapFile, relativePathToExportFolder, useConsole = useMPQConsole.dontUseConsole) {
        this._relativePathToMapFile = relativePathToMapFile;
        this._absolutePathExport = path_1.default.resolve(relativePathToExportFolder);
        this._useConsole = useConsole;
    }
    /**
     * executeCommand
     */
    executeCommand(command, relativeFilePath, absoluteExportPath) {
        if (this._useConsole === useMPQConsole.useConsole) {
            //e.g. ./MPQEditor.exe /extract warMap.w3m * D:\GIT\Wc3MapWorker\mpq /fp  #with console
            //e.g. ./MPQEditor.exe /extract warMap.w3m * D:\GIT\Wc3MapWorker\mpq /fp #without console
            command = '/' + command;
        }
        const mpqEditorLocation = './mpq/MPQEditor.exe';
        child_process_1.exec('dir', this.messageCallback);
        if (path_1.default.sep === '\\') { //windows needs capital Drive for mpqEditor
            absoluteExportPath = absoluteExportPath[0].toUpperCase() + absoluteExportPath.substr(1, absoluteExportPath.length - 1);
        }
        child_process_1.execFile(mpqEditorLocation, [command, relativeFilePath, absoluteExportPath, '/fp'], this.messageCallback);
    }
    /**
     * Extracts the mpq file from the previous specified location
     */
    unZipMap() {
        this.executeCommand('extract', this._relativePathToMapFile, this._absolutePathExport);
    }
    /**
     * Packs the mpq file with the extracted files and overrides the existing map file
     */
    zipMap() {
        this.executeCommand('zip', this._relativePathToMapFile, this._absolutePathExport);
    }
    messageCallback(err, stdout, stderr) {
        if (err) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    }
}
exports.commands = commands;
//# sourceMappingURL=commands.js.map