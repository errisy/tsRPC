var ts;
(function (ts) {
    var OperationCanceledException = (function () {
        function OperationCanceledException() {
        }
        return OperationCanceledException;
    }());
    ts.OperationCanceledException = OperationCanceledException;
    /** Return code used by getEmitOutput function to indicate status of the function */
    (function (ExitStatus) {
        // Compiler ran successfully.  Either this was a simple do-nothing compilation (for example,
        // when -version or -help was provided, or this was a normal compilation, no diagnostics
        // were produced, and all outputs were generated successfully.
        ExitStatus[ExitStatus["Success"] = 0] = "Success";
        // Diagnostics were produced and because of them no code was generated.
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsSkipped"] = 1] = "DiagnosticsPresent_OutputsSkipped";
        // Diagnostics were produced and outputs were generated in spite of them.
        ExitStatus[ExitStatus["DiagnosticsPresent_OutputsGenerated"] = 2] = "DiagnosticsPresent_OutputsGenerated";
    })(ts.ExitStatus || (ts.ExitStatus = {}));
    var ExitStatus = ts.ExitStatus;
    /** Indicates how to serialize the name for a TypeReferenceNode when emitting decorator
      * metadata */
    (function (TypeReferenceSerializationKind) {
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["Unknown"] = 0] = "Unknown";
        // should be emitted using a safe fallback.
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["TypeWithConstructSignatureAndValue"] = 1] = "TypeWithConstructSignatureAndValue";
        // function that can be reached at runtime (e.g. a `class`
        // declaration or a `var` declaration for the static side
        // of a type, such as the global `Promise` type in lib.d.ts).
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["VoidType"] = 2] = "VoidType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["NumberLikeType"] = 3] = "NumberLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["StringLikeType"] = 4] = "StringLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["BooleanType"] = 5] = "BooleanType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ArrayLikeType"] = 6] = "ArrayLikeType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ESSymbolType"] = 7] = "ESSymbolType";
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["TypeWithCallSignature"] = 8] = "TypeWithCallSignature";
        // with call signatures.
        TypeReferenceSerializationKind[TypeReferenceSerializationKind["ObjectType"] = 9] = "ObjectType";
    })(ts.TypeReferenceSerializationKind || (ts.TypeReferenceSerializationKind = {}));
    var TypeReferenceSerializationKind = ts.TypeReferenceSerializationKind;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var DiagnosticCategory = ts.DiagnosticCategory;
    (function (ModuleResolutionKind) {
        ModuleResolutionKind[ModuleResolutionKind["Classic"] = 1] = "Classic";
        ModuleResolutionKind[ModuleResolutionKind["NodeJs"] = 2] = "NodeJs";
    })(ts.ModuleResolutionKind || (ts.ModuleResolutionKind = {}));
    var ModuleResolutionKind = ts.ModuleResolutionKind;
    (function (ModuleKind) {
        ModuleKind[ModuleKind["None"] = 0] = "None";
        ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
        ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
        ModuleKind[ModuleKind["UMD"] = 3] = "UMD";
        ModuleKind[ModuleKind["System"] = 4] = "System";
        ModuleKind[ModuleKind["ES6"] = 5] = "ES6";
        ModuleKind[ModuleKind["ES2015"] = 5] = "ES2015";
    })(ts.ModuleKind || (ts.ModuleKind = {}));
    var ModuleKind = ts.ModuleKind;
})(ts || (ts = {}));
