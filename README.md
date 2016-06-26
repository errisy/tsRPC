# TypeScript Compiler for NodeJS Remote Procedure Call

## Background
### What problem to solve?
When you need AngularJS2 uses **service** to retreive data from NodeJS server. You normally have to write a **client.service.td** file to get data from NodeJS server. On the server side, similarly you need to handle the request. Therefore, an easy solution is a **Remote Procedure Call** system.
### Why modify Typescript Compiler?
Typescript Compiler provides the easiest way to hack into the .ts code file. 

TypeScript Compiler is a 

## How to solve?

### Find the entry point where javascript files are emitted

#### Where is each file emitted?
In utilities.ts, function onSingleFileEmit is where each of the source file is emitted as JavaScript codes. Similarly, if a *.rpc.ts file is detect, a *.service.ts file will be emitted. However, this is a bad idea. Because that would require TypeScript Compiler to compile it again.
```typescript
//utilities.ts
function onSingleFileEmit(host: EmitHost, sourceFile: SourceFile) {
    // the function where each file is emitted.
    ...
}
```

#### Before each file was loaded?
This seems to be a better solution.
##### Let's see how tsc runs in the commandline mode
```typescript
//tsc.ts at the end of the file:
ts.executeCommandLine(ts.sys.args); //this is the entry point
```
```typescript
//tsc.ts:
(1) function executeCommandLine{
  ... //loading config file, etc. no compilation done here;
  (2) function performCompilation{ //the function for parsing and compiling
    //this seems the place where additional files can be inserted!
    rpc.emitClient(rootFileNames, compilerOptions, compilerHost); // it is here now!!
    //
    const compileResult = (3)compile(rootFileNames, compilerOptions, compilerHost);
  }
}
(3) function compile{
  ...
  const program = createProgram(fileNames, compilerOptions, compilerHost); // parsing
  ...
  const exitStatus = compileProgram(); //compiling or so called emitting
  ...
}
```

#### Still Wrong with FileWatch
We need to do rpcCompile for both compile and recompile (triggered by filewatcher).
Each source file was watched individually. So the following to code was added before 
```typescript
//tsc.ts -> executeCommandLine:
...
        function rpcCompile() {// entry point
            if (!cachedProgram) {
                if (configFileName) {
                    const configParseResult = parseConfigFile();
                    rootFileNames = configParseResult.fileNames;
                    compilerOptions = configParseResult.options;
                }
                else {
                    rootFileNames = commandLine.fileNames;
                    compilerOptions = commandLine.options;
                }
                compilerHost = createCompilerHost(compilerOptions);
                hostGetSourceFile = compilerHost.getSourceFile;
                compilerHost.getSourceFile = getSourceFile;

                hostFileExists = compilerHost.fileExists;
                compilerHost.fileExists = cachedFileExists;
            }

            if (compilerOptions.pretty) {
                reportDiagnostic = reportDiagnosticWithColorAndContext;
            }

            // reset the cache of existing files
            cachedExistingFiles = {};
            rpc.emitClient(rootFileNames, compilerOptions, compilerHost);
        }
        rpcCompile(); // rpcCompile must be inserted before performCompilation.
        performCompilation(); 
...
        function recompile() {
            timerHandleForRecompilation = undefined;
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));
            rpcCompile(); // again, rpcCompile must be inserted before performCompilation.
            performCompilation();
        }
...
```
That made it work fine with file watcher.

#### Adding those code to other version tsc.js?
Not easy to get them working, because different version has different SyntaxKind enum, which is pretty hard to work out from js file. The version used in this project was obtained from (TypeScript)[https://github.com/Microsoft/TypeScript/tree/master/src/compiler] on April 26th, 2016.

## Results:
### It workds for node **Recommended**
Simply use node to run tsc.js as following to compile the ts files in folder obj.
```
node tsc2.js -w -p obj
```
when you use -p, you'd better use it from higher level of folder. use the same folder may cause **Error: watch  ENOENT**.

### This works for tsc.exe
You can normally find tsc at:
```
C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.8
```
To use it with tsc.exe, all console must be removed.

## Issues:
### Visual Studio is not using tsc.exe to compile TypeScript files.
It seems that Visual Studio is using LanguageService/typescriptService in the IDE to compile after file changed.
So it's becoming hard to hack into Visual Studio.
Alternative choice could be use a file watch system.
### TypeScript Compiler Versions are differenct
The tsc.js (1718K in size) of NodeJS is different from the the official v1.8 tsc.js (1748K). And even the SyntaxKind codes are different. The OpenSource version from GitHub usually come with some errors (probably because they are in the middle for the next version.

## Further Application:
### This approach can be used for writing interfaces for other languages.

