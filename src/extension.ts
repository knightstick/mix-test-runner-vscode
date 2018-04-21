'use strict';
import * as vscode from 'vscode';
import { MixTestRunner } from './MixTestRunner';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "mix-test-runner" is now active!');

    let mixTestAll = vscode.commands.registerCommand('extension.mixTestAll', () => {
        MixTestRunner.runAllTests();
    });

    context.subscriptions.push(mixTestAll);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
