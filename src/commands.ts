import { exec, execFile, ExecException } from 'child_process';
import path from 'path';
/*
const notes = '/users/flavio/notes.txt'
path.dirname(notes) // /users/flavio
path.basename(notes) // notes.txt
path.basename(notes, path.extname(notes)) //notes
path.extname(notes) // .txt
*/

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
  public executeCommand(command: string, params: string[]) {

    if (this._useConsole === useMPQConsole.useConsole) {
      command = '/' + command; //with and without console for MPQ Editor not relevant for MPQ2K CLI
    }
    const mpqEditorLocation = './mpq/MPQEditor.exe';
    execFile(mpqEditorLocation, [command, ...params], this.messageCallback);
  }

  /**
   * Extracts the all mpq content files
   */
  public extractAllFromMap() {
    const pattern = '*.lua';
    console.log(`Extracting ${pattern} files:`);
    console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);

  }

  /**
   * Extracts the lua files from your mpq
   */
  public extractLuaFromMap() {
    const pattern = '*.lua';
    console.log(`Extracting ${pattern} files:`);
    console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    this.executeCommand('e', [this._relativePath_MPQ_MapFile, pattern, this._absolutePath_Export, '/fp']);
  }

  /**
   * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
   */
  public packLuaBackIntoMap() {
    const pattern = '*.lua';
    console.log(`Adding ${pattern} files:`);
    console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
  }

  /**
  * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)
  */
  public packAllBackIntoMap() {
    const pattern = '*.*';
    console.log(`Adding ${pattern} files:`);
    console.log(`from: ${this._absolutePath_Export} ----> ${this._relativePath_MPQ_MapFile}`);
    this.executeCommand('a', [this._relativePath_MPQ_MapFile, this._relative_Export + '/' + pattern]);
  }

  private messageCallback(err: ExecException | null, stdout: string, stderr: string) {
    if (err) {
      console.log(`#ERROR: ${stderr}`);
      return;
    }
    console.log(`#: ${stdout}`);
  }
}
