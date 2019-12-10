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

  public _relativePathToMapFile: string;
  public _absolutePathExport: string;
  public _useConsole: useMPQConsole;

  constructor(relativePathToMapFile: string, relativePathToExportFolder: string, useConsole: useMPQConsole = useMPQConsole.dontUseConsole) {
    this._relativePathToMapFile = relativePathToMapFile;
    this._absolutePathExport = path.resolve(relativePathToExportFolder);
    this._useConsole = useConsole;
  }

  /**
   * executeCommand
   */
  public executeCommand(command: string, relativeFilePath: string, absoluteExportPath: string) {

    if (this._useConsole === useMPQConsole.useConsole) {
      //e.g. ./MPQEditor.exe /extract warMap.w3m * D:\GIT\Wc3MapWorker\mpq /fp  #with console
      //e.g. ./MPQEditor.exe /extract warMap.w3m * D:\GIT\Wc3MapWorker\mpq /fp #without console
      command = '/' + command;
    }
    const mpqEditorLocation = './mpq/MPQEditor.exe';
    exec('dir', this.messageCallback);

    if (path.sep === '\\') { //windows needs capital Drive for mpqEditor
      absoluteExportPath = absoluteExportPath[0].toUpperCase() + absoluteExportPath.substr(1, absoluteExportPath.length - 1);
    }

    execFile(mpqEditorLocation, [command, relativeFilePath, absoluteExportPath, '/fp'], this.messageCallback);
  }

  /**
   * Extracts the mpq file from the previous specified location
   */
  public unZipMap() {
    this.executeCommand('extract', this._relativePathToMapFile, this._absolutePathExport);
  }

  /**
   * Packs the mpq file with the extracted files and overrides the existing map file
   */
  public zipMap() {
    this.executeCommand('zip', this._relativePathToMapFile, this._absolutePathExport);
  }

  private messageCallback(err: ExecException | null, stdout: string, stderr: string) {
    if (err) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
}
