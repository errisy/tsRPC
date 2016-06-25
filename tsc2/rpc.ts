namespace rpc {
    export function emitClient(fileNames: string[], compilerOptions: ts.CompilerOptions, compilerHost: ts.CompilerHost) {
        const program = ts.createProgram(fileNames, compilerOptions, compilerHost);
        const sourceFiles = program.getSourceFiles();
        sourceFiles.forEach((sourceFile: ts.SourceFile) => {
            if (sourceFile.fileWatcher) {
                sourceFile.fileWatcher.close();
                sourceFile.fileWatcher = undefined;
            }
            if (/\.rpc\.ts$/ig.test(sourceFile.fileName)) {
                let serviceFileName = sourceFile.fileName.replace(/\.rpc\.ts$/ig, '.service.ts');
                console.log(sourceFile.fileName + ':');
                let serviceFile = presentSourceFile(sourceFile);
                //console.log(serviceFile);
                ts.sys.writeFile(serviceFileName, serviceFile);
                fileNames.push(serviceFileName);
            }
        });
        function presentSourceFile(sourceFile: ts.SourceFile): string {
            {
                let builder: string[] = [];
                sourceFile.statements.forEach(statement => sourceFileStatement(statement, builder, 0));
                return builder.join('');
            }
            function hasRpcServiceDecorator(_class: ts.ClassDeclaration): boolean {
                if (_class.decorators)
                    return _class.decorators.some(decorator => {
                        //console.log('hasRpcServiceDecorator');
                        //console.log(decorator);
                        return true;
                    })
                return false;
            }
            function hasRpcMemberDecorator(_member: ts.ClassElement): boolean {
                if (_member.decorators)
                    return _member.decorators.some(decorator => {
                        //console.log('hasRpcMemberDecorator');
                        //console.log(decorator);
                        return true;
                    })
                return false;
            }
            function sourceFileStatement(statement: ts.Statement, builder: string[], indent: number) {
                console.log(SyntaxKindTable[statement.kind]);
                switch (statement.kind) {
                    case ts.SyntaxKind.ClassDeclaration:
                        {
                            let _class: ts.ClassDeclaration = <any>statement;
                            console.log(bullentIndent(indent) + 'class ' + _class.name.text);
                            builder.push('export class {0} {\n'.format(_class.name.text));
                            _class.members.filter(hasRpcMemberDecorator)
                                .forEach(member => classMember(member, builder, indent + 1));
                            builder.push('}\n');
                        }
                        break;
                    case ts.SyntaxKind.ModuleDeclaration:
                        {
                            let _module: ts.ModuleDeclaration = <any>statement;
                            //console.log(bullentIndent(indent) + 'module ' + _module.name.text);
                            if (_module.name) {
                                builder.push('export module {0} {\n'.format(_module.name.text));
                                if (_module.body) if (_module.body.kind == ts.SyntaxKind.ModuleBlock) {
                                    let _moduleBlock: ts.ModuleBlock = <any>_module.body;
                                    _moduleBlock.statements
                                        .filter(blockStatement => blockStatement.kind == ts.SyntaxKind.ClassDeclaration)
                                        .forEach(blockStatement => {
                                            let _class: ts.ClassDeclaration = <any>blockStatement;
                                            builder.push('\texport class {0} {\n'.format(_class.name.text));
                                            //console.log(bullentIndent(indent + 1) + 'class ' + _class.name.text);
                                            _class.members.filter(hasRpcMemberDecorator).
                                                forEach(member => classMember(member, builder, indent + 2));
                                            builder.push('\t}\n');
                                        });
                                }
                                builder.push('}\n');
                            }
                        }
                        break;
                }
            }
            function classMember(member: ts.ClassElement, builder: string[], indent: number) {
                switch (member.kind) {
                    case ts.SyntaxKind.MethodDeclaration:
                        {
                            let _method: ts.MethodDeclaration = <any>member;
                            let _name: ts.Identifier = <any>_method.name;
                            let _type = memberType(_method.type);
                            if (_type) {
                                builder.push('{0}public {1}({2}): {3}{\n'.format(bullentIndent(indent), _name.text, memberParamenters(_method.parameters), _type));
                            }
                            else {
                                builder.push('{0}public {1}({2}){\n'.format(bullentIndent(indent), _name.text, memberParamenters(_method.parameters)));
                            }
                            
                            builder.push('{0}}\n'.format(bullentIndent(indent)));
                        }
                        break;
                    case ts.SyntaxKind.GetAccessor:
                        {
                            let _get: ts.GetAccessorDeclaration = <any>member;
                            let _name: ts.Identifier = <any>_get.name;
                            let _type = memberType(_get.type);
                            if (_type) {
                                builder.push('{0}public get {1}({2}): {3}{\n'.format(bullentIndent(indent), _name.text, memberParamenters(_get.parameters), _type));
                            }
                            else {
                                builder.push('{0}public get {1}({2}){\n'.format(bullentIndent(indent), _name.text, memberParamenters(_get.parameters)));
                            }
                            builder.push('{0}return \'\';\n'.format(bullentIndent(indent+1)));
                            builder.push('{0}}\n'.format(bullentIndent(indent)));
                        }
                        break;
                    case ts.SyntaxKind.SetAccessor:
                        {
                            let _set: ts.SetAccessorDeclaration = <any>member;
                            let _name: ts.Identifier = <any>_set.name;
                            //console.log(_name.text);
                            builder.push('{0}public set {1}({2}){\n'.format(bullentIndent(indent), _name.text, memberParamenters(_set.parameters)));
                            builder.push('{0}}\n'.format(bullentIndent(indent)));
                        }
                        break;
                }
            }
            function memberParamenters(parameters: ts.ParameterDeclaration[]) {
                return parameters.map((parameter) => ('{0}: {1}'.format(parameter.name['text'], memberType(parameter.type)))).join(', ');
            }
            function memberType(_type: ts.TypeNode): string {
                if(_type)
                    return sourceFile.text.substring(_type.pos, _type.end);
                return undefined;
            }

        }
    }

    function bullentIndent(count: number): string {
        let result = '';
        for (let i: number = 0; i < count; i++) {
            result += '\t';
        }
        return result;
    }
    var SyntaxKindTable = ['Unknown', 'EndOfFileToken', 'SingleLineCommentTrivia', 'MultiLineCommentTrivia', 'NewLineTrivia', 'WhitespaceTrivia', 'ShebangTrivia', 'ConflictMarkerTrivia', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'NoSubstitutionTemplateLiteral', 'TemplateHead', 'TemplateMiddle', 'TemplateTail', 'OpenBraceToken', 'CloseBraceToken', 'OpenParenToken', 'CloseParenToken', 'OpenBracketToken', 'CloseBracketToken', 'DotToken', 'DotDotDotToken', 'SemicolonToken', 'CommaToken', 'LessThanToken', 'LessThanSlashToken', 'GreaterThanToken', 'LessThanEqualsToken', 'GreaterThanEqualsToken', 'EqualsEqualsToken', 'ExclamationEqualsToken', 'EqualsEqualsEqualsToken', 'ExclamationEqualsEqualsToken', 'EqualsGreaterThanToken', 'PlusToken', 'MinusToken', 'AsteriskToken', 'AsteriskAsteriskToken', 'SlashToken', 'PercentToken', 'PlusPlusToken', 'MinusMinusToken', 'LessThanLessThanToken', 'GreaterThanGreaterThanToken', 'GreaterThanGreaterThanGreaterThanToken', 'AmpersandToken', 'BarToken', 'CaretToken', 'ExclamationToken', 'TildeToken', 'AmpersandAmpersandToken', 'BarBarToken', 'QuestionToken', 'ColonToken', 'AtToken', 'EqualsToken', 'PlusEqualsToken', 'MinusEqualsToken', 'AsteriskEqualsToken', 'AsteriskAsteriskEqualsToken', 'SlashEqualsToken', 'PercentEqualsToken', 'LessThanLessThanEqualsToken', 'GreaterThanGreaterThanEqualsToken', 'GreaterThanGreaterThanGreaterThanEqualsToken', 'AmpersandEqualsToken', 'BarEqualsToken', 'CaretEqualsToken', 'Identifier', 'BreakKeyword', 'CaseKeyword', 'CatchKeyword', 'ClassKeyword', 'ConstKeyword', 'ContinueKeyword', 'DebuggerKeyword', 'DefaultKeyword', 'DeleteKeyword', 'DoKeyword', 'ElseKeyword', 'EnumKeyword', 'ExportKeyword', 'ExtendsKeyword', 'FalseKeyword', 'FinallyKeyword', 'ForKeyword', 'FunctionKeyword', 'IfKeyword', 'ImportKeyword', 'InKeyword', 'InstanceOfKeyword', 'NewKeyword', 'NullKeyword', 'ReturnKeyword', 'SuperKeyword', 'SwitchKeyword', 'ThisKeyword', 'ThrowKeyword', 'TrueKeyword', 'TryKeyword', 'TypeOfKeyword', 'VarKeyword', 'VoidKeyword', 'WhileKeyword', 'WithKeyword', 'ImplementsKeyword', 'InterfaceKeyword', 'LetKeyword', 'PackageKeyword', 'PrivateKeyword', 'ProtectedKeyword', 'PublicKeyword', 'StaticKeyword', 'YieldKeyword', 'AbstractKeyword', 'AsKeyword', 'AnyKeyword', 'AsyncKeyword', 'AwaitKeyword', 'BooleanKeyword', 'ConstructorKeyword', 'DeclareKeyword', 'GetKeyword', 'IsKeyword', 'ModuleKeyword', 'NamespaceKeyword', 'ReadonlyKeyword', 'RequireKeyword', 'NumberKeyword', 'SetKeyword', 'StringKeyword', 'SymbolKeyword', 'TypeKeyword', 'UndefinedKeyword', 'FromKeyword', 'GlobalKeyword', 'OfKeyword', 'QualifiedName', 'ComputedPropertyName', 'TypeParameter', 'Parameter', 'Decorator', 'PropertySignature', 'PropertyDeclaration', 'MethodSignature', 'MethodDeclaration', 'Constructor', 'GetAccessor', 'SetAccessor', 'CallSignature', 'ConstructSignature', 'IndexSignature', 'TypePredicate', 'TypeReference', 'FunctionType', 'ConstructorType', 'TypeQuery', 'TypeLiteral', 'ArrayType', 'TupleType', 'UnionType', 'IntersectionType', 'ParenthesizedType', 'ThisType', 'StringLiteralType', 'ObjectBindingPattern', 'ArrayBindingPattern', 'BindingElement', 'ArrayLiteralExpression', 'ObjectLiteralExpression', 'PropertyAccessExpression', 'ElementAccessExpression', 'CallExpression', 'NewExpression', 'TaggedTemplateExpression', 'TypeAssertionExpression', 'ParenthesizedExpression', 'FunctionExpression', 'ArrowFunction', 'DeleteExpression', 'TypeOfExpression', 'VoidExpression', 'AwaitExpression', 'PrefixUnaryExpression', 'PostfixUnaryExpression', 'BinaryExpression', 'ConditionalExpression', 'TemplateExpression', 'YieldExpression', 'SpreadElementExpression', 'ClassExpression', 'OmittedExpression', 'ExpressionWithTypeArguments', 'AsExpression', 'NonNullExpression', 'TemplateSpan', 'SemicolonClassElement', 'Block', 'VariableStatement', 'EmptyStatement', 'ExpressionStatement', 'IfStatement', 'DoStatement', 'WhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement', 'ContinueStatement', 'BreakStatement', 'ReturnStatement', 'WithStatement', 'SwitchStatement', 'LabeledStatement', 'ThrowStatement', 'TryStatement', 'DebuggerStatement', 'VariableDeclaration', 'VariableDeclarationList', 'FunctionDeclaration', 'ClassDeclaration', 'InterfaceDeclaration', 'TypeAliasDeclaration', 'EnumDeclaration', 'ModuleDeclaration', 'ModuleBlock', 'CaseBlock', 'GlobalModuleExportDeclaration', 'ImportEqualsDeclaration', 'ImportDeclaration', 'ImportClause', 'NamespaceImport', 'NamedImports', 'ImportSpecifier', 'ExportAssignment', 'ExportDeclaration', 'NamedExports', 'ExportSpecifier', 'MissingDeclaration', 'ExternalModuleReference', 'JsxElement', 'JsxSelfClosingElement', 'JsxOpeningElement', 'JsxText', 'JsxClosingElement', 'JsxAttribute', 'JsxSpreadAttribute', 'JsxExpression', 'CaseClause', 'DefaultClause', 'HeritageClause', 'CatchClause', 'PropertyAssignment', 'ShorthandPropertyAssignment', 'EnumMember', 'SourceFile', 'JSDocTypeExpression', 'JSDocAllType', 'JSDocUnknownType', 'JSDocArrayType', 'JSDocUnionType', 'JSDocTupleType', 'JSDocNullableType', 'JSDocNonNullableType', 'JSDocRecordType', 'JSDocRecordMember', 'JSDocTypeReference', 'JSDocOptionalType', 'JSDocFunctionType', 'JSDocVariadicType', 'JSDocConstructorType', 'JSDocThisType', 'JSDocComment', 'JSDocTag', 'JSDocParameterTag', 'JSDocReturnTag', 'JSDocTypeTag', 'JSDocTemplateTag', 'SyntaxList', 'Count'];
}
interface String {
    format(...args: string[]): string;
}
String.prototype.format = (...args: string[]): string => {
    var that: string = <string>eval('this');
    return that.replace(/{\d+}/g, (char: string): string => {
        var index: number = Number(char.substr(1, char.length - 2));
        return args[index];
    });
}