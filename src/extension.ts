'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let copyswapper = vscode.commands.registerCommand("extension.copySwapper", () => {
        vscode.window.showInformationMessage('Copy swap extension started.');
        insertCopiedText();
    });

    context.subscriptions.push(copyswapper);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function insertCopiedText () {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
        return vscode.window.showErrorMessage("Can't paste code because no document is open");
    }

    let selection = editor.selection;

    let wordsToCopy = new vscode.Range(selection.start, selection.end);
    var x = editor.document.getText(wordsToCopy);
    
    editor.edit(editInfo => {
        editInfo.replace(wordsToCopy, clipboardy.readSync());
    });
    
    clipboardy.write(x);

   

} 