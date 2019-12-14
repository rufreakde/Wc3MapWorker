import * as assert from 'assert';
import { commands, useMPQConsole as useConsole } from '../src/commands';
import { resolve } from 'dns';

let testCommands = null;

describe('commands', () => {

    beforeEach(() => {
        testCommands = null;
    });

    it('Should extract 1 lua file from the test map', async () => {
        testCommands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
        const promise = await testCommands.extractLuaFromMap(false).catch((error) => { assert.fail(`Error with CLI!\n${error}`); });
        const expected = `Extracting "war3map.lua" ...\n1 file(s) extracted.\n\n`;
        assert.equal(promise.stdout, expected, "Error with expected output!");
    });

    it('Should extract all files from the test map', async () => {
        testCommands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
        const promise = await testCommands.extractAllFromMap(false).catch((error) => { assert.fail(`Error with CLI!\n${error}`); });
        const expected = `Extracting "war3map.w3r" ...\nExtracting "war3map.shd" ...\nExtracting "war3mapUnits.doo" ...\nExtracting "war3map.w3c" ...\nExtracting "war3map.w3i" ...\nExtracting "war3map.wpm" ...\nExtracting "war3map.wts" ...\nExtracting "war3map.wct" ...\nExtracting "war3map.wtg" ...\nExtracting "war3map.mmp" ...\nExtracting "war3map.lua" ...\nExtracting "war3map.doo" ...\nExtracting "war3map.w3e" ...\nExtracting "war3mapMap.blp" ...\n14 file(s) extracted.\n\n`;
        assert.equal(promise.stdout, expected, "Error with expected output!");
    });

    it('Should safe lua files into test map', async () => {
        testCommands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
        const promise = await testCommands.packLuaBackIntoMap(false).catch((error) => { assert.fail(`Error with CLI!\n${error}`); });
        const expected = `Adding file "./mpq/ExtractedFiles/war3map.lua" ...\n1 file(s) added.\n\n`;
        assert.equal(promise.stdout, expected, "Error with expected output!");
    });

    it('Should safe all files into test map', async () => {
        testCommands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
        const promise = await testCommands.packAllBackIntoMap(false).catch((error) => { assert.fail(`Error with CLI!\n${error}`); });
        const expected = `Adding file "./mpq/ExtractedFiles/war3map.doo" ...\nAdding file "./mpq/ExtractedFiles/war3map.lua" ...\nAdding file "./mpq/ExtractedFiles/war3map.mmp" ...\nAdding file "./mpq/ExtractedFiles/war3map.shd" ...\nAdding file "./mpq/ExtractedFiles/war3map.w3c" ...\nAdding file "./mpq/ExtractedFiles/war3map.w3e" ...\nAdding file "./mpq/ExtractedFiles/war3map.w3i" ...\nAdding file "./mpq/ExtractedFiles/war3map.w3r" ...\nAdding file "./mpq/ExtractedFiles/war3map.wct" ...\nAdding file "./mpq/ExtractedFiles/war3map.wpm" ...\nAdding file "./mpq/ExtractedFiles/war3map.wtg" ...\nAdding file "./mpq/ExtractedFiles/war3map.wts" ...\nAdding file "./mpq/ExtractedFiles/war3mapMap.blp" ...\nAdding file "./mpq/ExtractedFiles/war3mapUnits.doo" ...\n14 file(s) added.\n\n`;
        assert.equal(promise.stdout, expected, "Error with expected output!");
    });
});