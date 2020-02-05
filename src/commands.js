"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const execFilePromised = util_1.promisify(child_process_1.execFile);
var useMPQConsole;
(function (useMPQConsole) {
    useMPQConsole[useMPQConsole["useConsole"] = 1] = "useConsole";
    useMPQConsole[useMPQConsole["dontUseConsole"] = 0] = "dontUseConsole";
})(useMPQConsole = exports.useMPQConsole || (exports.useMPQConsole = {}));
class commands {
    constructor(relativePathToMapFile, relativePathToExportFolder, useConsole = useMPQConsole.dontUseConsole) {
        this._relativePath_MPQ_MapFile = relativePathToMapFile;
        this._absolutePath_MPQ_MapFile = path_1.default.resolve(relativePathToMapFile);
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
    async executeCommand(command, params) {
        if (this._useConsole === useMPQConsole.useConsole) {
            command = '/' + command; //with and without console for MPQ Editor not relevant for MPQ2K CLI
        }
        const mpqEditorLocation = path_1.default.resolve('./mpq/MPQEditor.exe');
        const promise = await execFilePromised(mpqEditorLocation, [command, ...params]);
        return promise;
    }
    /**
     * Extracts the all mpq content files
     */
    async extractAllFromMap(printInformation = true) {
        const pattern = 'war*.*';
        if (printInformation) {
            console.log(`Extracting ${pattern} files:`);
            console.log(`from: ${this._absolutePath_MPQ_MapFile} ----> ${this._absolutePath_Export}`);
        }
        return await this.executeCommand('e', [this._absolutePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
    }
    /**
     * Extracts the lua files from your mpq
     */
    async extractLuaFromMap(printInformation = true) {
        const pattern = '*.lua';
        if (printInformation) {
            console.log(`Extracting ${pattern} files:`);
            console.log(`from: ${this._absolutePath_MPQ_MapFile} ----> ${this._absolutePath_Export}`);
        }
        return await this.executeCommand('e', [this._absolutePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
    }
    /**
     * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
     */
    async packLuaBackIntoMap(printInformation = true) {
        const pattern = '*.lua';
        if (printInformation) {
            console.log(`Adding ${pattern} files:`);
            console.log(`from: ${this._absolutePath_Export} ----> ${this._absolutePath_MPQ_MapFile}`);
        }
        return await this.executeCommand('a', [this._absolutePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
    }
    /**
    * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)le
    */
    async packAllBackIntoMap(printInformation = true) {
        const pattern = 'war*.*';
        if (printInformation) {
            console.log(`Adding ${pattern} files:`);
            console.log(`from: ${this._absolutePath_Export} ----> ${this._absolutePath_MPQ_MapFile}`);
        }
        return await this.executeCommand('a', [this._absolutePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
    }
}
exports.commands = commands;
//# sourceMappingURL=commands.js.map