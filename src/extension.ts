'use strict';
import * as vscode from 'vscode';
import { MixTestRunner } from './MixTestRunner';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "mix-test-runner" is now active!');

    let mixTestAll = vscode.commands.registerCommand('extension.mixTestAll', () => {
        MixTestRunner.runAllTests();
    });

    let mixTestOne = vscode.commands.registerCommand('extension.mixTestOne', () => {
        const position = currentPosition();
        const file = currentDocument();

        if (!position || !file) { return vscode.window.showErrorMessage('No active file'); }

        MixTestRunner.runTest(file, position);
    });

    let mixTestFile = vscode.commands.registerCommand('extension.mixTestFile', () => {
        const file = currentDocument();

        if (!file) { return vscode.window.showErrorMessage('No active file'); }

        MixTestRunner.runTest(file);
    });

    context.subscriptions.push(mixTestAll);
    context.subscriptions.push(mixTestOne);
    context.subscriptions.push(mixTestFile);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function currentPosition(): vscode.Position | undefined {
    const editor = currentEditor();
    if (!editor) { return undefined; }

    return editor.selection.active;
}

function currentDocument() {
    const editor = currentEditor();
    if (!editor) { return undefined; }

    return editor.document;
}

function currentEditor(): vscode.TextEditor | undefined {
    return vscode.window.activeTextEditor;
}
