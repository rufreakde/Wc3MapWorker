export declare enum useMPQConsole {
    useConsole = 1,
    dontUseConsole = 0
}
export declare class commands {
    _relativePath_MPQ_MapFile: string;
    _absolutePath_Export: string;
    _relative_Export: string;
    _useConsole: useMPQConsole;
    constructor(relativePathToMapFile: string, relativePathToExportFolder: string, useConsole?: useMPQConsole);
    /**
     * executeCommand
     */
    executeCommand(command: string, params: string[]): void;
    /**
     * Extracts the all mpq content files
     */
    extractAllFromMap(): void;
    /**
     * Extracts the lua files from your mpq
     */
    extractLuaFromMap(): void;
    /**
     * Add/Override the lua files back into your mpq (renamed files will exist twice with old and new name!)
     */
    packLuaBackIntoMap(): void;
    /**
    * Add/Override all files back into your mpq (renamed files will exist twice with old and new name!)
    */
    packAllBackIntoMap(): void;
    private messageCallback;
}
//# sourceMappingURL=commands.d.ts.map