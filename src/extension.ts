'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let copyswapper = vscode.commands.registerCommand("extension.copySwapper", () => {
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

    //get selected text range that will be copied to clipboard after pasting.
    let wordsToCopy = new vscode.Range(selection.start, selection.end);
    let textToBeCopied = editor.document.getText(wordsToCopy);
    
    //paste text that is currently copied to the clipboard.
    editor.edit(editInfo => {
        editInfo.replace(wordsToCopy, clipboardy.readSync());
    });
    
    //save the text that was previoulsy selected to the clipboard.
    clipboardy.write(textToBeCopied);
} 