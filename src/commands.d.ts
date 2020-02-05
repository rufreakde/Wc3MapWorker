export declare enum useMPQConsole {
    useConsole = 1,
    dontUseConsole = 0
}
export declare class commands {
    _relativePath_MPQ_MapFile: string;
    _absolutePath_MPQ_MapFile: string;
    _absolutePath_Export: string;
    _relative_Export: string;
    _useConsole: useMPQConsole;
    constructor(relativePathToMapFile: string, relativePathToExportFolder: string, useConsole?: useMPQConsole);
    /**
     * executeCommand
     */
    executeCommand(command: string, params: string[]): Promise<{
        stdout: string;
        stderr: string;
    }>;
    /**
     * Extracts the all mpq content files
     */
    extractAllFromMap(printInformation?: boolean): Promise<{
        stdout: string;
        stderr: string;
    }>;
    /**
     * Extracts the lua files from your mpq
     */
    extractLuaFromMap(printInformation?: boolean): Promise<{
        stdout: string;
        stderr: string;
    }>;
    /**
     * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
     */
    packLuaBackIntoMap(printInformation?: boolean): Promise<{
        stdout: string;
        stderr: string;
    }>;
    /**
    * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)le
    */
    packAllBackIntoMap(printInformation?: boolean): Promise<{
        stdout: string;
        stderr: string;
    }>;
}
//# sourceMappingURL=commands.d.ts.map