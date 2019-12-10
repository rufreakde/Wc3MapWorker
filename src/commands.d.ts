export declare enum useMPQConsole {
    useConsole = 1,
    dontUseConsole = 0
}
export declare class commands {
    _relativePathToMapFile: string;
    _absolutePathExport: string;
    _useConsole: useMPQConsole;
    constructor(relativePathToMapFile: string, relativePathToExportFolder: string, useConsole?: useMPQConsole);
    /**
     * executeCommand
     */
    executeCommand(command: string, relativeFilePath: string, absoluteExportPath: string): void;
    /**
     * Extracts the mpq file from the previous specified location
     */
    unZipMap(): void;
    /**
     * Packs the mpq file with the extracted files and overrides the existing map file
     */
    zipMap(): void;
    private messageCallback;
}
//# sourceMappingURL=commands.d.ts.map