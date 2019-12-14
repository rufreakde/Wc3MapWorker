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
        this._relativePath_MPQ_MapFile = relativePathToMapFile;
        this._relative_Export = relativePathToExportFolder;
        this._absolutePath_Export = path_1.default.resolve(relativePathToExportFolder);
        this._useConsole = useConsole;
        if (path_1.default.sep === '\\') { //windows needs capital Drive for mpqEditor
            this._absolutePath_Export = this._absolutePath_Export[0].toUpperCase() + this._absolutePath_Export.substr(1, this._absolutePath_Export.length - 1);
        }
    }
    /**
     * executeCommand
     */
    executeCommand(command, params) {
        if (this._useConsole === useMPQConsole.useConsole) {
            command = '/' + command; //with and without console for MPQ Editor not relevant for MPQ2K CLI
        }
        const mpqEditorLocation = './mpq/MPQEditor.exe';
        child_process_1.execFile(mpqEditorLocation, [command, ...params], this.messageCallback);
    }
    /**
     * Extracts the all mpq content files
     */
    extractAllFromMap() {
        const pattern = '*.lua';
        console.log(`Extracting ${pattern} files:`);
        console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
        this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
    }
    /**
     * Extracts the lua files from your mpq
     */
    extractLuaFromMap() {
        const pattern = '*.lua';
        console.log(`Extracting ${pattern} files:`);
        console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
        this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
    }
    /**
     * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
     */
    packLuaBackIntoMap() {
        const pattern = '*.lua';
        console.log(`Adding ${pattern} files:`);
        console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
        this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
    }
    /**
    * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)
    */
    packAllBackIntoMap() {
        const pattern = '*.*';
        console.log(`Adding ${pattern} files:`);
        console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
        this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
    }
    messageCallback(err, stdout, stderr) {
        if (err) {
            console.log(`#ERROR: ${stderr}`);
            return;
        }
        console.log(`#: ${stdout}`);
    }
}
exports.commands = commands;
//# sourceMappingURL=commands.js.map