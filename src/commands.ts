import { execFile, ExecException } from 'child_process';
import path from 'path';

import { promisify } from 'util';
const execFilePromised = promisify(execFile);

export enum useMPQConsole {
  useConsole = 1,
  dontUseConsole = 0
}

export class commands {

  public _relativePath_MPQ_MapFile: string;
  public _absolutePath_Export: string;
  public _relative_Export: string;
  public _useConsole: useMPQConsole;

  constructor(relativePathToMapFile: string, relativePathToExportFolder: string, useConsole: useMPQConsole = useMPQConsole.dontUseConsole) {
    this._relativePath_MPQ_MapFile = relativePathToMapFile;
    this._relative_Export = relativePathToExportFolder;
    this._absolutePath_Export = path.resolve(relativePathToExportFolder);
    this._useConsole = useConsole;

    if (path.sep === '\\') { //windows needs capital Drive for mpqEditor
      this._absolutePath_Export = this._absolutePath_Export[0].toUpperCase() + this._absolutePath_Export.substr(1, this._absolutePath_Export.length - 1);
    }
  }

  /**
   * executeCommand
   */
  public async executeCommand(command: string, params: string[]): Promise<{ stdout: string, stderr: string }> {

    if (this._useConsole === useMPQConsole.useConsole) {
      command = '/' + command; //with and without console for MPQ Editor not relevant for MPQ2K CLI
    }
    const mpqEditorLocation = './mpq/MPQEditor.exe';
    const promise: { stdout: any, stderr: string } = await execFilePromised(mpqEditorLocation, [command, ...params]);
    return promise;
  }

  /**
   * Extracts the all mpq content files
   */
  public async extractAllFromMap(printInformation = true): Promise<{ stdout: string, stderr: string }> {
    const pattern = 'war*.*';
    if (printInformation) {
      console.log(`Extracting ${pattern} files:`);
      console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    }
    return await this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);

  }

  /**
   * Extracts the lua files from your mpq
   */
  public async extractLuaFromMap(printInformation = true): Promise<{ stdout: string, stderr: string }> {
    const pattern = '*.lua';
    if (printInformation) {
      console.log(`Extracting ${pattern} files:`);
      console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    }
    return await this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
  }

  /**
   * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
   */
  public async packLuaBackIntoMap(printInformation = true): Promise<{ stdout: string, stderr: string }> {
    const pattern = '*.lua';
    if (printInformation) {
      console.log(`Adding ${pattern} files:`);
      console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    }
    return await this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
  }

  /**
  * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)
  */
  public async packAllBackIntoMap(printInformation = true): Promise<{ stdout: string, stderr: string }> {
    const pattern = 'war*.*';
    if (printInformation) {
      console.log(`Adding ${pattern} files:`);
      console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    }
    return await this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
  }
}
