# 1 What is here?
This is the directory where I store my MPQEditor that I currently use. As well As a test map.
* ./ExtractedFiles/ - Folder where I link my extract commands to (2. parameter)
* ./ListFiles/ - Currently not used but stored here I do not work with protection atm
* ./Maps/ - Test map (w3m reforged lua enabled) (1. parameter)
* ./MPQEditor.exe - I use this to call the MPQ2K CLI
```ts
const Commands = new commands('./mpq/Maps/lua.w3m', './mpq/ExtractedFiles', useConsole.useConsole);
```

# 2 
What is the content if this ReadMe?
Everything below are references I have found to MPQ files and how you can use the mpq2k CLI and also the MPQEditor CLI (which should be a super set of the former).

# 3. Commands of MPQEditor (short)
### Opening a single MPQ
```zsh
MPQEditor.exe MpqName [/listfile ListFileName]
```
> Opens a MPQ. If you enter a listfile name, this listfile
> will be used as external listfile to the MPQ. If the MPQ
> already has a listfile, then both those listfiles are combined.
---

### Opening a multiple MPQs in multi-document mode
```zsh
MPQEditor.exe /multi BaseMpq1 BaseMpq2 BaseMpq3 ... BaseMpqN [/patch PatchMpq1 PatchMpq2 ... PatchMpqN] [/listfile ListFileName]
```
> Opens multiple MPQs in multi-document mode. Additional listfile may be added.
---

### _Opening a multiple MPQs in merged mode_
```zsh
MPQEditor.exe /merged BaseMpq1 BaseMpq2 BaseMpq3 ... BaseMpqN [/patch PatchMpq1 PatchMpq2 ... PatchMpqN] [/listfile ListFileName]
```
> Opens multiple MPQs in merged mode. The user will only see one tree,
> where all the files will be combined. This is how the game sees
> all MPQs. 
---

### Opening a MPQ in patch mode
```zsh
MPQEditor.exe /base BaseMpq1 BaseMpq2 /patch PatchMpq1 PatchMpq2 ... PatchMpqN [/listfile ListFileName]
```
> Opens multiple MPQs in patch mode. You have to enter all patches
> that belong to a MPQ. When extracting a file in patch mode, then
> the extracted file will allways be the latest version, i.e. from base
> MPQ with all subsequent patches applied.
---

### Running MPQEditor in console mode
```zsh
MPQEditor.exe /console [ScriptName]
```
> Opens a MoPaq 2000 console. If a script name is entered, it is executed immediately.
---

# Using MoPaq 2000 commands from command line
MPQEditor supports executing MoPaq 2000 commands directly from command line.
They can be executed either with or without opening console window. The difference
is to use or not to use slash before the command.
##### This is an example to run a command without opening a console:  
```zsh
MPQEditor.exe extract war3.mpq * C:\Work /fp
```
##### This is an example to run a command with opening a console:  
```zsh
MPQEditor.exe /extract war3.mpq * C:\Work /fp
```
---

# 4. MoPaq 2000 (MPQ2K) manual examples
It allows you to add new files, overwrite existing ones, extract files, rename files, delete files, compact an MPQ, and list the files in it. 

```xml
MPQ2K <Command> <MPQFile> [SourceFile] [DestinationFile]
```
Parameters in <> are required, ones in [] are optional for some commands. For the exact syntax and use of individual commands, see sections 4.3-4.10; but first, some preliminary information about the command-line interface. `Commands and parameters are not case sensitive` *(This is not true for paths btw <rufreakde>)*. The MPQ and filenames can be either short filenames such as “blah.txt” or “squish~1.txt” or long filenames such as “squishy fat.txt”. But, if the filename is a long filename or has spaces or other strange characters, you MUST enclose the entire filename in quotes (either ‘ ’ or “ ”). Additionally, the quotes must be paired.

### 4.0 Filename Examples
```console
“this file.txt”
‘that file.txt’
“this.file-that.file.txt”
```
But the following examples will NOT work:
```console
bad file.txt
not.this-file.txt
“dont try this’
‘vice versa”
“or this for that matter
```
### 4.1 Wildecard `*` and `?`
Wildcard characters (* and ?) are used represent multiple files. MPQ2K uses them for all commands except those noted otherwise in this manual. Wildcards represent one or more unknown characters. The ? wildcard stands for a single unknown character, while * wildcards stand for any number of unknown characters. The following:
 ```js
*.txt // ‘flub.txt’, ‘shootme.txt’, and ‘deadcat.txt’ -> XXXXX...XXXXXX.txt  
*ub.t?t // ‘flub.txt’, ‘blub.txt’, ‘dub.txt’, and ‘nub.tnt’ -> XXXXXX...XXXXXub.tXt  
??ub.t?t // ‘flub.txt’ and ‘blub.txt’ -> XXub.tXt  
 ```
### 4.2 Recursion
Lastly is the concept of recursion. For most of MPQ2K’s commands (those that do not mention otherwise), there is a `/r` (recurse) option. This option **can only work when wildcards are used**, and specifies that all files in subdirectories should be included in the operation.
```js
*.txt // include all files of *.txt in the current directory
*.txt /r // include all files of *.txt in the current directory and all of its subdirectories
```

### 4.3	Adding Files - the A Command
Probably the most useful of all the commands of MPQ2K is the `add files` command. As I said earlier, the files in a MoPaQ can be either compressed or uncompressed. What this means is that you can have some files in an archive that are compressed, while others not. You can decide which files are which; however, there are some file types that **MUST NOT** be compressed in a MoPaQ. E.g. Smacker animations (.SMK).  
#### The syntax for adding files is:
```xml
MPQ2K a <MPQFile> <SourceFile> [DestinationFile] [/c] [/wav] [/r]
```
Parameters in `<>` are required, ones in `[]` are optional. MPQFile is the MoPaQ to add the file(s) to. SourceFile is the file(s) to add to the MoPaQ. If there is only a single file being added (no wildcards are used), DestinationFile is the name that the file will be stored as in the MoPaQ. But, if there are multiple files to add (wildcards are used), DestinationFile is the directory to put the files in. `/c` tells MPQ2K to compress the file(s). `/wav` tells MPQ2K to add the file with WAV compression, which is recommended for `.WAV` files (if both `/c` and ``/wav`` are used, `/c` will be ignored and ``/wav`` used). ``/r`` tells MPQ2K to recurse through subdirectories when searching for files to add. If no DestinationFile is given, the file will be added with the same name as SourceFile. 

> Add the file ``blah.txt`` to the MoPaQ ``icareformympq.mpq`` as ``dumbfile.txt``
```console
MPQ2K a icareformympq.mpq blah.txt dumbfile.txt
```
> Add the file ‘blah.txt’ without renaming it
```console
MPQ2K a whocares.mpq blah.txt
```

Wildcards may be used for adding files. But **remember that the DestinationFile parameter changes**. 
> This example would add the file ‘flub.txt’ as ‘temp\*.txt\flub.txt’, not ‘temp\flub.txt’ as it is meant to:
```console
MPQ2K a *.txt temp\*.txt // Don’t do this.
MPQ2K a *.txt temp // Do it this way instead
```

### 4.4	Extracting Files - the E Command
The general syntax for the extract command is:
```xml
MPQ2K e <MPQFile> <SourceFile> [DestinationDirectory] [/fp] [/r]`
```

The parameters in ``<>`` are required, ones in ``[]`` are optional. SourceFile is the **FULL** name of the file(s) to be extracted from the MoPaQ, and DestinationDirectory is the directory in which to put the extracted file(s). If DestinationDirectory is absent, the file will be placed in the current directory. *(this does not seem to work with our MPQ Editor an incorrect path will just result in an error with no extraction! Maybe a complete missing argument works?<rufreakde>)* The ``/r`` parameter tells MPQ2K to recurse through subdirectories when searching for files to extract. The ``/fp`` parameter specifies that MPQ2K should extract the files with the full path.

> The first command will extract the file `flub\temp.txt` as `temp.txt` in the current directory. The second will extract the file as `temp.txt` in the `flub` directory. Big difference.
```console
MPQ2K e this.mpq flub\temp.txt
MPQ2K e this.mpq C:\flub\temp.txt /fp (I corrected the second example you are welcome <rufreakde>)
```
NOTE: The ``/r`` parameter ONLY works in combination with the ``/fp`` parameter. Just use always ``/fp`` and you are safe.

### 4.5	Renaming Files - the R Command
On occasion it may be necessary to rename a file in a MoPaQ. That’s what the rename command is for.
> The syntax: 
```xml
MPQ2K r <MPQFile> <OldFileName> <NewFileName> 
```
All parameters are required. OldFileName is the full filename of the file to be renamed, and NewFileName is the new name for the file. **Wildcards may not by used with the rename command**.

### 4.6	Moving Files - the M Command
Complimenting the rename command is the move command. While the rename command only renames a single file in a MoPaQ, the move command moves one or more files from one virtual directory (technically MoPaQs don’t have directories like hard drives do) to another virtual directory. 
> The syntax: 
```xml
MPQ2K m <MPQFile> <SourceFile> <DestinationDirectory> [/r]
```
The parameters in ``<>`` are required, ones in ``[]`` are optional. SourceFile is the file(s) to be moved (wildcards allowed), DestinationDirectory is the virtual directory the file(s) to be moved will be placed in, and /r is the usual recurse switch.

### 4.7	Deleting Files - the D Command
One of the other useful commands in MPQ2K’s arsenal is the delete file command.  
> The syntax:
```xml
MPQ2K d <MPQFile> <FileToDelete> [/r]
```
The parameters in ``<>`` are required, ones in ``[]`` are optional. FileToDelete is just that, the file(s) to delete; and, as usual, ``/r`` tells MPQ2K to recurse through subdirectories.
The first time you use the delete command, you might be rather surprised to find that a deleted file rarely takes up less space in a MoPaQ than a file that hasn’t been deleted! This is due to the fact that the **delete command only marks a file as deleted**; it doesn’t actually remove the file from the archive (to preempt the next question, no, you can’t undelete a deleted file). **To actually remove the file from the MoPaQ, you must use the flush command**.

### 4.8	Flushing Out an Archive - the F Command
As mentioned above, the delete command does not actually remove a file, rather it only marks a file as deleted. Obviously, there must be some way to remove files from an archive, or else the delete command would be utterly useless. As a matter of fact, there is a way, and that is the flush command, using the following general syntax:
```xml
MPQ2K f <MPQFile>
```
All parameters are optional. MPQFile is the file to flush.
The flush command searches through a MoPaQ and purges the space deleted files occupy, shrinking the MoPaQ’s size if there are any deleted files in it.

### 4.9	Listing the Files in an Archive - the L Command
Often, it is necessary to view all the files in a MoPaQ. To do this, you must use the list files command. > The syntax:
```xml
MPQ2K l <MPQFile> [Filter] [Out_File] [/lf] [/p]
```
The parameters in ``<>`` are required, ones in ``[]`` are optional. This will list all the files in the MoPaQ to the screen. The ``[Filter]`` parameter is a wildcard filter that specifies what files to display. The ``[Out_File]`` parameter tells MPQ2K to write the listing to a file, rather than to the screen. When the ``/lf`` parameter is used with ``[Out_File]``, it tells MPQ2K to generate a listfile (with only each file’s name, useable as a listfile for MPQView or another MoPaQ utility), rather than a report file (which contains the name, size, and other information), like normal. And the ``/p`` parameter makes MPQ2K pause with each screen of files listed, and wait for a keypress.
```warning
NOTE: The list command will display files matching the filter spec in ALL subdirectories just as if the ``/r`` option for other commands had been used.
```
### 4.10	Running Scripts - the S Command
Perhaps the biggest reason that MPQ2K is superior to its predecessors is its scripting ability. MPQ2K allows you to run many commands much quicker and easier through scripts. The writing of scripts will be discussed in detail in section four. But here is how you run a script once it is written:
```xml
MPQ2K s <ScriptFile>
```
```warning
NOTE: You may not run multiple scripts using wildcards.
```

# 5.	Writing Scripts
### 5.1	Overview of Scripts
A script is basically a file that contains a lot of command lines for MPQ2K to process. This allows you to compile one or more entire MoPaQs in a single execution of MPQ2K. This allows for much faster execution, as well as avoiding some of the quirks that occur when a MoPaQ is changed after it is created.

### 5.2	Differences Between the Command Line and Scripts
For simplicity’s sake, the command-line and script-line syntax are almost identical. There are a couple major points of difference, though.

1.	MoPaQs **must be explicitly opened and closed in scripts**. See section 5.3-5.4 for info on this.
2.	Because of this, you don’t need to specify which MoPaQ you are working with on every single line, as you did on the command-line. For example, the following line is perfectly correct. It would add ``this.txt`` to the current archive as ``that.txt``. The ``current archive`` is the one you have already opened.

> /add command within script <rufreakde>
```console
a this.txt that.txt /c 
```

# 5.3	Opening Archives - the O Command
The very first thing you must do in scripts is to open the MoPaQ you want to work with. The general syntax for the ``open archive`` command is:
```
o <MPQFile> [FileLimit]
```
Parameters in ``<>`` are required, ones in ``[]`` are optional. MPQFile is the file to open. FileLimit only takes affect when the archive is being created from scratch. It is the maximum number of files that this archive can hold, and is ``1024`` by default. If the MoPaQ already exists, FileLimit will have no effect, but no warning will be indicated. The FileLimit parameter has a minimum value of ``16``, and a maximum value of ``262144``.
NOTE: Each file that a MoPaQ can hold (the FileLimit) takes up 16 bytes in the MoPaQ, regardless of whether or not it is used. This can add up. For example, an empty MoPaQ with a file limit of ``262144`` would be ``4 MB`` large!

### 5.4	Closing Archives - the C Command
Just like you must open a MoPaQ before using it, you must close the files after using them. Is it very simple to use the close command.
> The syntax:
```console
c
```
That’s all there is to it.

### 5.5	Pausing Scripts - the P Command
Occasionally, a script will behave different than you expected it to. And if the script is halfway large, it may scroll by too fast to see what went wrong. The solution to this common problem is the pause script command. The pause command is simple in function and usage, as shown here:
```console
p
```
When this command is executed, the following message will appear, and MPQ2K will pause until you hit a key on the keyboard. (I will try to include this command but still not sure how to handle this via node <rufreakde>)
```
Pause - Press any key to continue...
```

### 5.6	Script Comments - the Semicolon ;
On some occasions you may want to put **comments** in a script file for one reason or another. To do this, simply put a semicolon(``;``) as the first character on a line, and the line will be ignored, and no error will be signaled.

# 6 History of the MPQEditor that is used
* Version 3.6.0.835

 - Fixed live scanner to work with Warcraft III v 1.28.5

* Version 3.6.0.834

 - Rebuilt with StormLib v 9.22

* Version 3.6.0.833

 - Support for external listfiles in the UNICODE paths
 - Fixed bug with tilde (~) in the MPQ file name

* Version 3.6.0.830

 - Improved Deep file verification

* Version 3.6.0.828

 - Korean build

* Version 3.6.0.826

 - Recompiled - fixed patching bug in StormLib

* Version 3.6.0.825

 - Fixed crash in "Use Additional Listfile ..."

* Version 3.6.0.824

 - Support for any weird non-ASCII file names
 - Support for new Korean map protector
 - Removed NameBreaker

* Version 3.5.1.821

 - MPQ order is correct when "patch.MPQ", "patch-1.MPQ" and "patch-2.MPQ" are open 

* Version 3.5.1.820

 - When extracting file from MPQ, all special characters are now handled properly
   according to https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx

* Version 3.5.1.819

 - Ruleset editor now works as expected when MPQEditor_Ruleset.ini doesn't exist

* Version 3.5.1.816

 - DPI Awareness

* Version 3.5.1.812

 - Added manual live scan for multiplayer maps only

* Version 3.5.1.810

 - Warcraft III can be launched in windowed mode if enabled in the configuration

* Version 3.5.1.808

 - Overcoming protectors fiddling with block indexes like 0x40000000 or 0xF0000000

* Version 3.5.1.807

 - Warcraft III Live Scanner now supports Warcraft III version 1.27a

* Version 3.5.1.805

 - Support for an updated Somj2hM16 protection
 - Support for MPQs that have invalid (and ignored) flags in the block table
 - Support for MPQs that have malformed block indexes (0x8000xxxx or 0x4000xxxx)

* Version 3.5.1.801

 - Help in MoPaQ 2000 interpreter now works properly
 - Fixed heap corruption (crash) in New MPQ Wizard

* Version 3.5.1.796

 - Support for MPQs with table sizes line 0x80000###

* Version 3.5.1.793

 - Fixed work with names beginning with special characters

* Version 3.5.1.792

 - Fix for some Starcraft II patches being unable to be applied
 - Beta version of Live Scanner Warcraft III maps
 - Accepted issues from the W3xNameScanner contributors
 - Added button for merging the results with an existing listfile

* Version 3.5.1.773

 - Beta version of Name Scanner for Warcraft III maps

* Version 3.5.1.771

 - Support for MPQ.KangTooJee map protector

* Version 3.5.1.769

 - Adding files into MPQs that have BlockTableSize > HashTableSize is not allowed
 - Compacting MPQs that have BlockTableSize > HashTableSize is allowed and works
 - Comsole now shows MPQ Editor version

* Version 3.5.1.767

 - Optimized patching process
 - Fixed bug in opening Hearthstone MPQs in patched mode

* Version 3.5.1.766

 - Zero size files are now processed properly
 - Fixed bug in processing HET table

* Version 3.5.1.764
 - The MoPaQ 2000 command "open" now accepts listfile as an argument.
 - The MoPaQ 2000 command "open" no longer accepts useless "FileLimit" argument.
 - Starcraft II patching now works properly

* Version 3.5.1.763
 - Support for signing archives with weak signature

* Version 3.5.0.753
 - Recompiled with StormLib v 9.00
 - Support for Warcraft III maps protected by Spazzler protector
 - Support for Warcraft III maps protected by BOBA protector

* Version 3.5.0.751
 - Support for data files from War of the Immortals (*.scp)
 - Support for data files from Longwu online (*.mpk)

* Version 3.5.0.750
 - Opening read-only files now only requires FILE_READ_DATA + FILE_READ_ATTRIBUTES,
   which is the minimum in Windows

* Version 3.5.0.741
 - Added Polish localization

* Version 3.5.0.741
 - Recompiled with latest StormLib so it now comtains Heart of the Swarm decryption key

* Version 3.5.0.740
 - Fixed bug in merged mode

* Version 3.5.0.730
 - Fixed behavior of menus
 - The "Behavior of Open and OpenWith" is now gone
 - New feature "Edit File"

* Version 3.5.0.718

 - Added "Lock" and "Unlock MPQ"
 - Custom ruleset is back
 - Chinese version
 - Fixed bug in configuring (attributes)

* Version 3.5.0.710

 - Ribbon UI (optional)
 - MPQ rulesets reworked, custom rules editor removed
 - Bug fixes

* Version 3.2.2.xxx

 - MoPaq console can now open encrypted MPQs
 - Fixed bug that causes access to freed memory during opening MPQ

* Version 3.2.1.660

 - Table viewer now shows HET and BET tables more comfortably
 - User-friendly file size
 - File Properties Dialog now shows patch list, if available
 - Support for UNICODE file names
 - New MoPaq2000 command: mksvf
 - Partialy fixed deleting in MPQ archives v 4.0
 - Table viewer now shows HET and BET table

* Version 3.2.0.600

 - Fixed listing files when opened multiple MPQs in patch mode
 - Console window can now do "paste" using right mouse click
 - Write support for MPQs version 4
 - Newest patch files (wow-update-enUS-#####.MPQ) now work properly
 - Removed ability to convert listfile path and working directory to relative paths,
   as it's more annoying than anything else
 - Support for new map protectors
 - MPQ Editor now tries to suggest listfile automatically

* Version 3.2.0.537

 - Added "Search Files" icon
 - File mask can now have more fiel extensions
 - Built with StormLib 8.0 RELEASE CANDIDATE
 - Better UI for opening MPQs in multi, merged and patched mode
 - Added "op" command for script interpreter for opening MPQs in patch mode
 - Support for patch mode - patched version of a file is extracted
 - Fixed extracting patch files from WOTLK patches
 - Command line changed: Now can open more MPQs from command line,
   and listfile name must follow after "/listfile"
 - Added preliminary support for MPQs version 3.0 (WOW-Cataclysm BETA)
 - Added support for encrypted MPQs coming with Starcraft II digital download.
 - When extracting file that already exists, the dialog now has "no All" option
 - All message boxes generated by worker threads are now displayed by the main UI thread (fixed for WINE)

* Version 3.0.0.473

 - Added menu item "Tiles" for operating systems Windows XP or newer
 - It is now possible to have multiple MPQs open, while one is read-only and others are editable
 - Added configurable behavior of "Open" and "Open With"
 - Fixed bug in running scripts using /console command. Scripts
   with space in file name are now processed properly.
 - Added support for opening multiple MPQs, either in multi-document mode
   or in merged mode
 - Support for partial MPQs ("interface.MPQ.part")
 - Console command "extract": added flag "-lower" and "-lowercase"
   for extracting path as lowercase

* Version 3.0.0.420

 - Fixed problem with adding files with pseudo-names ("File00000001.ext")
 - Support for MPQs that have both block table and hash table zero size
 - Better looking toolbar
 - Added *.SC2Map and *.SC2Mod extensions from Starcraft II
 - "Open file" and "Save file" dialogs now have "places" bar, but are no longer
   centered.
 - Both "ListFile path" and "work directory" now recognize paths relative to the EXE
   and will be updated appropriately when the EXE is moved to different location
 - Fixed bug in "Merge Listfiles" dialog regarding to multiple file additions
 - Added "Delete All" button to "Merge Listfiles" 
 - Fixed few bugs in "Set File Associations" dialog
 - Buttons in "Set File Associations" dialog are now enabled or disabled based on items selected

* Version 3.0.0.405

 - Added feature for configuring (attributes) in MPQ
 - Fixed bug when (attributes) was sometimes saved improperly
 - Fixed bug recent file list
 - "Create New MPQ" Wizard now has better-looking bitmap instead of the ugly text
 - "..." button in "Create New MPQ" wizard now adds an extension,
   if any is selected in the "Save file" dialog.

* Version 3.0.0.404

 - Fixed repaint problem when resizing main window
 - When creating new MPQ, the "..." button now has "Save" title
 - MoPaQ script interpreter also supports Windows command line
 - The "File Associations" dialog was reworked.

* Version 3.0.0.402

 - "Properties" on root dir item is now allowed and shows archive properties
 - Improved file mask in toolbar

* Version 3.0.0.401

 - Improved MPQ Table Viewer
 - MPQ Editor no longer remover W3M protection from W3M Map Utilities
 - Set minimum tracking size for main window
 - Fixed minimum window size done by splitters