import * as vscode from 'vscode';

let activeTerminal: vscode.Terminal;

export class MixTestRunner {
  public static MIX_TEST_TERMINAL_NAME = 'mixTestTerminal';

  file: vscode.TextDocument;
  position?: vscode.Position;
  constructor(file: vscode.TextDocument, position?: vscode.Position) {
    this.file = file;
    this.position = position;
  }

  public static runAllTests() {
    executeInTerminal(MixTestRunner.baseCommand());
  }

  protected static baseCommand(): string {
    return 'mix test';
  }

  public static runTest(file: vscode.TextDocument, position?: vscode.Position) {
    new MixTestRunner(file, position).run();
  }

  run() {
    executeInTerminal(this.command());
  }

  command(): string {
    if (!this.position) { return this.fileCommand(); }

    const lineNumber: number = this.position.line;

    return `${this.fileCommand()}:${lineNumber}`;
  }

  fileCommand(): string {
    const filePath: string = this.file.fileName;

    return `${MixTestRunner.baseCommand()} ${filePath}`;
  }

}

function executeInTerminal(command:string): void {
    if (!activeTerminal) {
      activeTerminal = vscode.window.createTerminal(MixTestRunner.MIX_TEST_TERMINAL_NAME);
    }

    console.log(`Executing command: ${command}`);

    activeTerminal.show();
    activeTerminal.sendText(command);
  }
